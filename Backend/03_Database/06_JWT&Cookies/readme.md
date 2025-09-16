In this lecture we will learn about JWT (Json Web Token) and Cookies.

> JWT - Json Web Token - `jwt.io`
  - JWT tokens are stateless, meaning the server does not need to store them in a database or memory for validation — all the necessary information is contained within the token itself.
  - In web applications, JWTs can be stored in different ways, one common method is to store them inside browser cookies.
  - To demonstrate this, we can use the `Cookie-Editor` browser extension.
   • First, pin this extension while accessing the Rohit Negi Web Dev course.
   • Export the cookie in JSON format using the extension.
   • Then, log in on another Google account (one that hasn’t subscribed to the course). 
   • Install the same extension there, and import the copied cookies.
   • Since the cookies contain session information, the site will treat us as logged in without asking for email or password.
   • However, in many cases, the site may still require re-verification via Gmail login, password, or OTP 😁 — this is an additional security measure.


> When visiting `jwt.io`, we can see an encoded token - 
   
   - `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30`. 

   - It has three parts in the format Header.Payload.DigitalSignature

    A. Header: Contains metadata such as the algorithm used for hashing — "alg": "HS256" — and the type — "typ": "JWT".
    B. Payload: Contains user-related information, such as username or email or unique id. Sensitive data like passwords, PINs, or credit card numbers are not stored here because they are confidential.
    C. Digital Signature: The Header and Payload are combined, converted into a hash during login or registration, and then encrypted on the server using a private key. 
     • This prevents attackers from compromising it, as they do not have access to that private key. The encrypted hash, along with the Header and Payload, is sent to the client during login/registration. 
     • When the user makes another request after login, the server re-generates the hash from the Header and Payload using the same key and compares it with the received digital signature to authenticate the request.
     • Note: The Header and Payload are not hashed actually — they are simply Base64 encoded, which can be easily decoded.


> A JWT token can have an expiration time (like on GeeksforGeeks or LeetCode - which automatically logs out users after a few days and generates a new token upon re-login). Alternatively, it can be issued without an expiration time, allowing users to remain logged in until they manually log out (like Instagram or Flipkart mobile apps).

> When we send a response after a successful login, we also send a JWT in the form of a cookie, which is handled by the web browser (client-side) automatically. We can see the token set in the cookie in Postman. 
If the user requests to view their profile or perform any action after logging in, the request will contain the cookie, which the server can access and authenticate the rightful user.
We have implemented the login and subsequent request process in 05_Validation/src/index.js inside the /login and /getuser route handlers.

> To install JWT: `npm i jsonwebtoken`

> If we want to access cookies from incoming requests after successful login, we can use: `request.cookies`. However, to parse and print cookies, we need the cookie-parser package. To install: `npm i cookie-parser`.