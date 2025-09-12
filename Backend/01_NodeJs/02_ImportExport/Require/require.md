Consider if we have 100s of seperate functions, each of them have different functionalities, then requiring them individually in the main file would clutter the top of the file with multiple require statements.
> To organize better, we can create a folder (e.g., calculator) and an index.js file inside it. In index.js, we import all individual functions and export them as an object. 
> Then, in our main.js file, we can import everything from calculator/index.js using a single require, and access individual functions via destructuring.
> This approach improves modularity and keeps the code clean.

> This is exactly what we've implemented in the `main.js` file within the require folder.
> We organized the sum, sub, and mul functions—each defined in separate files—by importing them into the index.js file inside the calculator folder. From there, we exported them together as an object. In main.js, we then imported these functions from index.js using destructuring.