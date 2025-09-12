const express = require('express');
const app = express();

// MiddleWare to parse json string into js object
app.use(express.json());

const BookStoreArr = [
    {id:1, name:"Harry Potter", author: "Harry"},
    {id:2, name:"Darwin Theory", author: "Charles Darwin"},
    {id:3, name:"Dracula", author: "Bram Stoker"},
    {id:4, name:"Dawn in the Dusk", author: "Harry"}
];


// Route to send the book details when the user accesses /books
// In real frontend applications, this endpoint would be accessed using 
// fetch() or axios 
// Sending all the books' details
app.get("/books",(request,response)=>{
    // Test with: GET request to http://localhost:3000/books via Postman
    response.send(BookStoreArr);
})

// Sending a particular book details using id as params
app.get("/books/:id",(request, response)=>{
    // Test with: GET request to http://localhost:3000/books/1 via Postman
    const id = parseInt(request.params.id);
    const book = BookStoreArr.find(book => book.id === id);
    response.send(book);
})

// Sending filtered book detail based on query parameter (key=value inside url)
// from params of Postman (generally recommended for get method)
// The url is always of string type
app.get('/getbook',(request, response)=>{
    const {author} = request.query;
    const authorBooks = BookStoreArr.filter(book=> book.author === author)
    if(authorBooks)
        response.send(authorBooks);
})

// Adding books to book store array using post method by passing values through
// request.body (recommended as body is not exposed)
app.post("/add-book",(request, response)=>{
    const book = request.body;
    BookStoreArr.push(book);
    // Notifying the user that the operation is successfull
    response.send("Book Added Successfully");
    console.log(book);
})
// The book added to the BookStoreArr array will not be saved permanently. This
// is because the data is stored only in memory (RAM). If we stop and restart 
// the server, the data will be lost. To make data changes permanent, we would 
// either:
// a. Save data to a file manually or programmatically using Node's fs module.
// b. Or better, use a database (like MongoDB, MySQL, PostgreSQL, etc.).
 

// Updating the author name using the patch operation based on id as params
app.patch("/update/:id/:author",(request, response)=>{
    const {id,author} = request.params;
    const book = BookStoreArr.find(book=>book.id === Number(id));
    if(book){
        book.author = author;
        response.send("Author Name Of Id "+id+" Updated Successfully.");
        console.log(book);
    }
})

// Updating all the details of a book using put from request.body(recommended 
// for updating a data)
app.put("/update-book",(request, response)=>{
    const {id,name,author} = request.body;
    const book = BookStoreArr.find(book=>book.id === Number(id));
    if(book){
        book.author = author;
        book.name = name;
        response.send("Details Of Book Having Id "+id+" Is Updated Successfully.");
        console.log(book);
    }
})

// Deleting a book based on id as params(recommended for delete operations)
app.delete("/remove/:id",(request, response)=>{
    const id = parseInt(request.params.id);
    const bookIdx = BookStoreArr.findIndex(book=>book.id === id);
    if(bookIdx != -1){
        const deletedBook = BookStoreArr.splice(bookIdx,1);
        response.send("Book With Id "+id+" Has Been Removed Successfully.");
        console.log(deletedBook);
    }

})



app.listen(3000,()=>{
    console.log("Server is on at port: 3000");
})