> On-call refers to the team of engineers responsible for diagnosing and fixing errors encountered in a live or running application in real-time(24/7). They handle real-time issues and fixes errors as soon as they occur.

> We know that a server is essentially a computer — it has RAM, a processor, storage, and other hardware components like any regular system.

> There are two common architectures used in server-based application deployment:

  : 1. Monolithic Architecture: In this approach, all components of an application — including the frontend, backend, database, authentication, payment system, and static assets like images — are deployed together on a single server. This makes development and deployment easier initially but can become harder to scale and maintain as the application grows.
  
  : 2. Microservices: Here, the application is broken down into smaller, independent services. Each component — such as frontend, backend, database, authentication, and payment — runs on its own server or container. These services communicate with each other over the network. This architecture improves scalability and maintainability but adds complexity in terms of communication and deployment.

> Limitations of Monolithic Architecture
  1. Shared Resources:
    - All parts of the application (frontend, backend, database, image store) are running on the same machine. This means they share the same RAM, processor, and storage.
    - If the database needs more memory to process large queries, it may slow down the backend or frontend performance due to competition for RAM.
    - A spike in one service (e.g., high frontend traffic or heavy image uploads) can affect the entire system.
  2. Scaling Bottleneck:
    - Suppose our backend needs more RAM or our database needs a faster SSD.
    - We cannot upgrade just one component. Instead, we must move the entire application to a new server with more RAM or storage.
    - This results in downtime, deployment complexity, and wasted cost, especially if only one component needs more resources.
  3. Tight Coupling:
    - Because everything is bundled together, updating or restarting one part of the app (say, the backend) might require restarting the whole server.
    - This reduces agility and makes maintenance risky.
  4. Not Future-proof:
    - As our app grows, we can't dynamically scale just one part of the app.
    - We may hit the hardware limits of a single server, requiring costly migrations.


> Advantage in Microservices Architecture
  🔹 1. Independent Scaling:
    - If only the backend is under load, you can scale just the backend service (e.g., deploy more backend containers).
    - No need to touch the frontend, database, or image service.
  🔹 2. Efficient Resource Usage
    - You allocate more RAM/CPU only to the component that needs it.
    - Saves cost compared to scaling the whole monolith.
  🔹 3. Improved Performance
    - Each service can run on optimized hardware (e.g., DB on SSD-rich server, image service on storage-heavy server).
    - This leads to better performance and faster response times.
  🔹 4. Automatic Scaling with Orchestration Tools
    - Using tools like Kubernetes, services can auto-scale based on demand.
    - For example, if traffic spikes on the login service, Kubernetes can spin up more login containers instantly.
  🔹 5. Failure Isolation
    - If one service crashes, others keep running. In monolithic systems, one crash may bring down the whole app.

Note: In Microservices, components from different servers communicate through API (which serve as interfaces enabling communication between services over the network).

> Difference Between Monolithic and Microservices.
 _____________________________________________________________________________________________________
| Feature           | Monolithic Architecture                    | Microservice Architecture          |
| ----------------- | ------------------------------------------ | ---------------------------------- | 
| Structure         | Single unified codebase where all features | Application is divided into small, | 
|                   | are tightly integrated.                    | independent services               |
| ----------------- | ------------------------------------------ | ---------------------------------- | 
| Deployment        | Entire application is deployed together.   | Each service can be deployed       |
|                   |                                            | independently.                     |
| ----------------- | ------------------------------------------ | ---------------------------------- | 
| Scaling           | Entire app must be scaled, even if only    | Individual services can be scaled  |
|                   | one part needs it.                         | based on load.                     |
| ----------------- | ------------------------------------------ | ---------------------------------- | 
| Technology Stack  | Uses a single tech stack across the app.   | Each service can use its own tech  |
|                   |                                            | stack (e.g., Python for one, Node  | 
|                   |                                            | for another).                      |
| ----------------- | ------------------------------------------ | ---------------------------------- | 
| Resource Usage    | Shared resources (RAM, CPU, Storage) for   | Resources are isolated per service,|
|                   | all components.                            | can be optimized individually.     |
| ----------------- | ------------------------------------------ | ---------------------------------- | 
| Development Speed | Slower for large teams (codebase conflicts,| Faster for large teams (independent|
|                   | tight coupling).                           | development of services).          |
| ----------------- | ------------------------------------------ | ---------------------------------- | 
| Fault Isolation   | One bug can crash the entire system.       | Failures are isolated to individual| 
|                   |                                            | services                           |
| ----------------- | ------------------------------------------ | ---------------------------------- | 
| Maintenance       | Harder as the app grows; difficult to test,| Easier to maintain and test        |  
|                   | update, and debug.                         | individual services.               |
| ----------------- | ------------------------------------------ | ---------------------------------- | 
| Time to Deploy    | Slower — a small change requires rebuilding| Faster — only the changed service  |
|                   | and redeploying the whole app.             | is rebuilt and deployed            |
| ----------------- | ------------------------------------------ | ---------------------------------- | 
| Example Use Case  | Best for small apps or early-stage startups| Ideal for large-scale systems (e.g.|
|                   |                                            | Netflix, Amazon)                   |
-------------------------------------------------------------------------------------------------------
