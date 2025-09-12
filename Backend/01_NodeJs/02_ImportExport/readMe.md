> Difference between CommonJs and ESModule(MJS).
|                          CJS                        |                MJS
| a.             Older Method (still used)            | a.         Latest Method 
| b.             Modules.export, require              | b.         import/export
| c.  Synchronous: If multiple require statements are | c.  Asynchronous: It loads the next import 
|     used then first require is loaded fully then    |     if the first one is taking time to load.
|     it loads the next require statement i.e, it is  |    i.e, is doesn't wait or block the program.
|     blocking in nature.                             |
| d.  Runs on non-strict mode (i.e, c=10 is okay)     | d. Runs on strict mode (i.e, we have to write
|                                                     |    let, var or const : let c=10)


> Imagine a server that handles incoming user requests synchronously — meaning one request is processed at a time. This increases the waiting or response time for users.

> Think of it like a food shop where preparing a pizza takes 10 minutes and a burger takes 5 minutes. If the seller handles one order at a time, even if they are different tasks, customers have to wait unnecessarily. This would frustrate users, and no one would want to revisit that restaurant.

> Similarly, JavaScript is single-threaded and synchronous by design. However, Node.js uses an event-driven, non-blocking architecture that allows it to handle operations asynchronously. This is made possible by the Event Loop, along with libuv.

> So, although Node.js runs JavaScript on a single thread, it offloads time-consuming tasks (e.g., I/O, timers) to the libuv-managed thread pool, allowing other code to continue executing without waiting. This is similar to the frontend (browser) environment, where asynchronous behavior is enabled by Web APIs (like setTimeout, fetch, etc.) provided by the browser.

> Event Loop: It manages the execution of callbacks after asynchronous tasks complete by moving them from the callback queue to the call stack when the stack is empty.

  -> Explanation of the Event Loop:
    : The main JS code runs (this is called the call stack).
    : When an async task (like setTimeout, file reading, or API call) is triggered:
      - It gets offloaded to a background thread (like Web APIs in browser or libuv in Node).
    : Once that task completes:
      - Its callback (or .then() in promises) is added to the callback queue (also called task queue).
    : The Event Loop keeps checking:
      - “Is the call stack empty?”
      - If yes, it pushes the callback from the queue to the call stack and executes it.



| Concept          | Explanation                                                                   |
| ---------------- | ----------------------------------------------------------------------------- |
| JavaScript       | Single-threaded & synchronous                                                 |
| Node.js          | Still single-threaded for JS code, but uses libuv + event loop for async I/O  |
| Event Loop       | Manages the execution of callbacks after async tasks complete                 |
| libuv            | A C/C++ library in Node.js that handles non-blocking I/O using a thread pool  |
| Browser Web APIs | Provide similar async support in frontend (timers, AJAX, DOM events)          |
