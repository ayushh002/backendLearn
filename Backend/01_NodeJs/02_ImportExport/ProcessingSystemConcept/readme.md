We will learn some concepts of Operating System.

-> Process
  : A process is an independent program in execution. It has its own memory space, code, data, and system resources.
  : Every app or program you open (like Chrome or VS Code) is a process.
  : Processes are managed by the Operating System (OS) using process scheduling, memory allocation, and input/output handling.

-> Single Threaded
  : A single-threaded process has only one thread of execution, meaning it performs one task at a time.
  : All instructions are executed sequentially.
  : For example, a program reading a file, then processing it, then displaying output — all step by step, not in parallel.
  : If the thread is blocked (e.g., waiting for I/O), the whole process is blocked.

-> Multi Threaded
  : A multi-threaded process can execute multiple threads simultaneously within the same process.
  : Threads share memory and resources of the parent process.
  : Improves responsiveness and resource utilization.
  : For example, a browser downloading a file in one thread, rendering UI in another, and playing video in another — all under the same process.

-> Single Core
  : A single-core CPU has one processing unit.
  : Can execute only one instruction at a time (one thread at a time).
  : It can still simulate multitasking via context switching, but it doesn’t perform true parallel processing.

->  Dual Core
  : A dual-core CPU has two processing units (cores).
  : Can execute two threads truly in parallel — each core handles one.
  : Better multitasking and performance compared to a single core.

-> Quad Core
  : A quad-core CPU has four cores.
  : It can handle four threads simultaneously, enabling smoother multitasking.
  : Beneficial for apps that can divide work into multiple threads (e.g., games, video editing software).

->  Octa Core
  : An octa-core CPU has eight cores.
  : It can run eight threads or processes in parallel (or more using hyper-threading).
  : Used in modern smartphones and high-performance computing.

-> Parallelism
  : Parallelism refers to executing multiple operations or tasks at the same time using multiple cores or processors.
  : True parallelism requires multiple cores.
  : For example, in a quad-core CPU, four threads from different processes can be executed at the same instant, each on a separate core.

->  Concurrent Processes
  : Concurrency means multiple processes (or threads) make progress over the same period of time, but not necessarily at the exact same instant.
  : can happen even on a single-core CPU using context switching.
  : For example, process A and B seem to run together, but in reality, the OS is rapidly switching between them — fast enough that it looks simultaneous.

-> Difference between Process and Thread: 

__________________________________________________________________________________________________________________
| Feature       | Process                                 |     Thread                                           | 
|---------------|-----------------------------------------|------------------------------------------------------|
| Definition    | Independent program in execution        | Smallest unit of execution inside a process (It is a |
|               |                                         | subset of process - a process can have many threads) |
|---------------|-----------------------------------------|------------------------------------------------------|
| Memory        | Has its own memory space                | Shares memory with other threads in the same process |
|---------------|-----------------------------------------|------------------------------------------------------|
| Communication | Requires Inter-Process Communication    | Can easily communicate through shared memory         |
|               | (IPC) — complex                         |                                                      |
|---------------|-----------------------------------------|------------------------------------------------------|
| Overhead      | Higher — switching between processes    | Lower — threads are lightweight and faster to switch |
|               | takes more time and resources           |                                                      |
|---------------|-----------------------------------------|------------------------------------------------------|
| Crash Impact  | One process crash doesn't affect others | A thread crash can affect the entire process         |
|---------------|-----------------------------------------|------------------------------------------------------|
| Creation      | Slower to create (more resource-heavy)  | Faster to create                                     |
|---------------|-----------------------------------------|------------------------------------------------------|
| Example       | Running Chrome and VS Code separately   | Opening two tabs in Chrome (same process, different  |
|               |                                         | threads)                                             |
|_______________|_________________________________________|______________________________________________________|

