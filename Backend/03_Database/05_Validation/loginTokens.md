> We will be learning about Login Tokens and Digital Signature

  1. Earlier, when a user logged in and then requested another page (e.g., chats), the server had to re-verify their credentials (e.g., by querying the database) for each request. This was inefficient in terms of both cost (database load) and performance (latency per request).
  
  2. In order to prevent these repetitive database calls, systems introduced sessions. A session ID is generated upon login, stored in the browser (e.g., as a cookie), and associated with the user’s data on the server. The server checks this ID instead of re-verifying credentials for each request. These Sessions expire after a set time (e.g., 30 minutes of inactivity).

  3. However, sessions also have drawbacks. If the session ID is stored in the database, frequent database calls are still needed. If it's stored in memory (e.g, RAM) on a server, it must be shared with other replica servers. This results in overhead and is referred to as a stateful approach. Although, sessions can use distributed caches (not just DB/memory).

  4. A better solution is to use tokens (like JWTs - often use symmetric HMAC - shared secret in many real-world apps) which are stateless and don’t require server-side session storage. With tokens, there is no need to maintain any session records because the server trusts the Digital Signature which are used within tokens to verify integrity and authenticity. Note: Tokens usually avoid DB calls but not always (e.g., revocation checks).

  5. The digital signature ensures that the page request or message is genuinely sent by the authenticated user. Here, we mostly use token signing with shared secrets or private keys.

  6. This process uses the concept of private and public keys, where a message or request is first converted into a hash. That hash is then encrypted using the user’s private key. Only the corresponding public key can decrypt it. Finally, the message is re-hashed and compared with the decrypted hash to verify authenticity. This prevents hacker attacks since hackers may access the message, hash, and public key—but not the private key.

  7. To sum up: hashing ensures the integrity of the message or request being sent over a network, and the digital signature applies encryption/decryption on the top of integrity. The encrypted hash code corresponding to the message is what we call a digital signature.