<h1>Node.js Task Queuing with Rate Limiting</h1>

A scalable Node.js API for managing user-based task queuing with rate limiting.<br> The application ensures that tasks are processed at a rate of 1 task per second and 20 tasks per minute per user, with no requests dropped.<br> It uses Redis for task queueing and Bull to manage job processing.<br>
<h2>Features</h2>

User-based rate limiting: 1 task/sec, 20 tasks/min per user.<br>
Task queueing to preserve and process requests exceeding the rate limit.<br>
Logs each task completion with a user ID and timestamp to a file.<br>
Scalable architecture using Redis and Bull.<br>
Fault tolerance with retries and task preservation.<br>
<h2>Technologies Used</h2>

Node.js: Backend server and API development.<br>
Redis: In-memory data store for task queueing.<br>
Bull: Task management and job queueing.<br>
PM2: For scaling the application across multiple instances.<br>

