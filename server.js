const express = require("express");
const Redis = require("ioredis");
const Bull = require("bull");
const fs = require("fs");
const path = require("path");


const app = express();
app.use(express.json());


const redis = new Redis();


const logFilePath = path.join(__dirname, "task_logs.txt");


async function task(user_id) {
  const logEntry = `${user_id} - task completed at - ${Date.now()}\n`;
  fs.appendFileSync(logFilePath, logEntry, "utf8");
  console.log(logEntry.trim());
}


const taskQueue = new Bull("taskQueue", {
  redis: { host: "127.0.0.1", port: 6379 },
});


taskQueue.process(async (job) => {
  const { user_id } = job.data;
  await task(user_id);
});


app.post("/api/v1/task", async (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).send({ error: "user_id is required" });
  }


  await taskQueue.add(
    { user_id },
    {
      attempts: 3, 
      backoff: { type: "fixed", delay: 1000 },
    }
  );

  res.status(200).send({ message: "Task queued successfully" });
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
