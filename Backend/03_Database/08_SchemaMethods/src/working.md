> Why does app.use("/", authRouter) still allow requests to reach opRouter?

  • This is because of how Express middleware flow works - when we write: `app.use("/", authRouter);` and `app.use(opRouter);` :
   - `app.use("/", authRouter)` will match every request (because every path starts with `/`).
   - If none of the routes inside authRouter send a response, Express calls next() internally and moves to the next middleware/route in the stack → in our case, `app.use(opRouter)`.
   - opRouter then gets a chance to handle the request.
   - The request continues down the chain until : 
     a. A route sends a response (res.send(), res.json(), etc.), OR
     b. There are no more middlewares/routers left.

> Flow
   • Request → authRouter (if matches, try to handle it)
     ↓
     If not handled → opRouter (try to handle it)
     ↓
     If still not handled → 404 Not Found


