const bcrypt = require('bcrypt');

const password = "Ayush@123";

// This function converts the plain text password into a hashed format,
// automatically adding a unique salt during the process.
async function hash(){
    console.time('hash');
    const hashPass = await bcrypt.hash(password,12); 
    console.timeEnd('hash');
    console.log("Hashed Password: "+hashPass);
}
hash(); // Each time this function runs, a different hash is generated
// because a new salt is used internally during hashing.

// The number 12 represents the number of salt rounds.
// It indicates how many times the hashing algorithm is applied.
// Increasing the number of rounds makes hashing slower.
// For example, 16 rounds mean the hash function runs 2^16 times, which can take
// around 2–3 seconds. This makes brute-force attacks computationally expensive,
// as the attacker must repeat this for every password attempt.

// Generally, 10 to 12 rounds are used in practice for a balance between security 
// and performance.


// We can also manually generate a salt and then pass it to the hash function.
async function salt(){
    const salt = await bcrypt.genSalt(12);
    const hashedPass = await bcrypt.hash(password,salt);
    console.log("Generated Salt: "+salt);
    console.log("Generated hash: "+hashedPass);

    // To verify the password during login, use bcrypt's compare function.
    const isValid = await bcrypt.compare(password,hashedPass);
    console.log(isValid);
}
salt();

// Notice that the generated salt is embedded in the final hashed password
// i.e., salt hash is subset of hashed password.
// For example: 
//  Salt:     `$2b$12$OQ89eq6DZo5V069dA3w8gu`
//  Password: `$2b$12$OQ89eq6DZo5V069dA3w8guaaLf8ClcbKL4xT4omjr0E.NfvjFq2vm`

// Breakdown of the hashed password:
// - `$2b$` indicates the bcrypt version used.
// - `12` represents the number of hashing rounds.
// - The next 22 characters are the salt.
// - The final 31 characters are the actual hashed password.

// This means we don’t need to store the salt separately — it's already part of the
// hash. Also, the hash includes information about the number of rounds used.

// Knowing rounds is essential during login so that bcrypt can hash the input password
// with the same parameters and compare it with the stored hash for validation.
