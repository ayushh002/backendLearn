> We will explore how passwords are actually stored in a database. Instead of saving passwords in plain text, we use techniques that transform the password string into an encrypted format, making it unreadable in its original form.

> This transformation is crucial for security purposes. In case the database is compromised and all its data is exposed, the user's credentials still remain protected because the passwords are stored in an encrypted form, not in plain text.

> If passwords were stored as plain strings, a breach wouldn't just affect that specific application (like Instagram in this case), but could also lead to security threats across other platforms where users might have reused the same password.

> One might consider storing passwords using encryption with a secret key, which can work to some extent. However, this approach has a flaw — if the key gets exposed, the encrypted passwords can easily be decrypted, defeating the purpose of encryption.

> When the same key is used for both encryption and decryption, it is called symmetric cryptography. In contrast, when different keys are used for encryption and decryption, it is known as asymmetric cryptography.

> What we truly need is a method where decryption isn't even an option — meaning that the encrypted password cannot be reversed to its original form by any key. This is achieved through password hashing, a process that makes reversing the hash computationally infeasible due to the absence of any discernible pattern in the hash output.

> That leaves only one possible method to guess the password: trying every combination of characters until one matches the hash. However, this brute-force approach is practically impossible due to the immense number of combinations involved.

> Various hashing algorithms are used in password hashing, such as SHA-256, which produces a 256-bit hash regardless of the input string's length. But even SHA-256 isn’t ideal for production use because hackers have developed rainbow tables — collections of common passwords and their corresponding hashes — to crack these hashes quickly.

> To tackle this vulnerability, we can add a salt to the password — a random string appended to the user's password before hashing. The combined string (password + salt) is then hashed and stored in the database.

  : There are two common approaches of using salt:

   1. Using the same salt for every user 
    - Disadvantages:
     a. Many users may have the same password, and using the same salt would generate identical hash codes, making it easier for attackers to target that specific hash.
     b. If an attacker learns the single salt value, they can add it to each guess in a brute-force attack and compare it with the leaked hashes, potentially cracking user passwords in bulk.

   2. Using a different salt for each user
    - Advantages:
     a. Although it requires storing a unique salt for every user, this approach prevents attackers from compromising multiple accounts with a single cracked hash.
     b. Even if several users have the same password, the use of unique salts ensures their hashes remain different, providing stronger security.

> Now, let’s see how we can hash passwords using bcrypt, a popular password-hashing library. To get started, we need to install it with the command: `npm i bcrypt`.