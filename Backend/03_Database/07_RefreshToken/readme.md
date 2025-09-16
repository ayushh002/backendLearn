> There are some limitations of JWT (Access Token) that Refresh Tokens can overcome. Although most real-world applications don’t use Refresh Tokens, their usage entirely depends on the requirements.

> If the JWT is set without an expiry date, meaning it has infinite validity, then a token generated once will remain valid indefinitely — even if the password is changed, this happens because the token is not generated using the password. So, changing the password will generate a new token upon re-login, but the old token will still remain valid. Since an infinite-expiry token cannot be invalidated in any way, it poses a security risk — if the token leaks, anyone can access our data simply by sending that token in the cookies and we won't be able to stop it in anyway.

> Therefore, we should never set a JWT token without an expiry time. If we set the expiry time to, say, 30 minutes, any request made after 30 minutes would require the user to log in again, which leads to poor user experience. Some low-risk applications, consider GeeksforGeeks and LeetCode, set the expiry time to a few days to address this issue.

> Alternatively, we can use Refresh Tokens, which are issued along with an Access Token. The Access Token has a shorter validity period (15 to 30 minutes), while the Refresh Token has a longer validity (a few days). When the Access Token expires, the client sends the Refresh Token. The server, upon validating the Refresh Token, issues a new Access Token to the client for further requests. This process continues until the Refresh Token itself expires.

> When the Refresh Token is about to expire, the server generates a new Refresh Token and sends it to the client. This cycle continues until the user logs out manually, as seen in applications like Instagram and Facebook. This approach prevents users from logging in frequently.

> If the Refresh Token is leaked and a hacker gains access to our account, we can change the password to invalidate the Refresh Token. This is a powerful property of the Refresh Token — it can be invalidated through a password change. In contrast, once an Access Token is generated, it cannot be invalidated before its expiry.

> The Refresh Token has a different architecture from the Access Token. It is similar to a session ID — a random string is generated and stored in the database along with other details like its expiration time and the corresponding username. These details are used to validate the refresh token and issue a new access token to the client. For added security, this random string can be stored in a hashed form, just as we do with passwords.

> During a password update, the previously generated Refresh Token is removed from the database and replaced with a new one. Hence, Refresh Tokens are stateful meaning it need to be stored on the server.

> In general, many lower-risk applications like Gfg, LeetCode may choose not to follow the stateful refresh token architecture. Instead, they often rely on simpler setups by keeping access tokens valid for a longer period, such as a day or two. 

> On the other hand, applications where a user’s identity could be exploited for fraud or sensitive actions — such as Instagram, Facebook — typically use the stateful refresh token architecture. Banks use session based authentication as the sessions are valid for a 15 or 30 minutes window and after that the user needs to login again which is needed in banking and finance for the security purposes.

> Although, maintaining Refresh Tokens in the database does require occasional database calls, these calls are not frequent — generally only during Access Token expiry or password change — not for every request, making it efficient in practice.

> Now we know that after a user logs in, they must be authenticated using a JWT (stateless token) for every subsequent request. Therefore, the verification logic should be applied to every route handler except the login and register routes. To keep the code clearer and more modular, we can use middleware for this purpose. The token verification logic can be placed in a separate file as a middleware function, which uses next() to pass control to the next handler. This middleware can then be applied to any route before the actual response handler.

> We implemented this in 05_Validation by keeping the token verification code in a separate middleware folder.