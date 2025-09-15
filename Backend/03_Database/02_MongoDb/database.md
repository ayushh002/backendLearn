1. 
> Now run this `node database.js` - Gives error due to password because we used @ in our password.
> It needs to be URL-encoded since it's a special character in connection strings. 
> In a MongoDB connection string, any special characters in the password need to be replaced with their URL-encoded equivalents (@ should be %40).
> This happens because the url consists of three things: username, password, and cluster. The username and password together gets seperated from the cluster with @ symbol so when we use @ in our own password it thinks that the cluster starts from there but that is wrong as it is a part of password.
> % used inside `%40` means that the next two characters after % is a special characters and 40 is hexadecimal value corresponding to decimal equivalent of @.


2. 
> When we insert documents in a collection, it automatically creates the database/collection if none of them exist while inserting the values.

> When update is performed and the collection/database doesn't exist then it creates them. If no document matches the query: If upsert: true is given → MongoDB inserts a new document. Else, no database/collection is created. Nothing happens, but no error is thrown.

> When delete operation is performed. If the collection doesn’t exist, MongoDB just does nothing. No error is thrown and result object will show that 0 documents were deleted.


3. 
> `const result = await collection.find({}).toArray();`- In this line `.toArray()` actually does the network call and without using it we get the response in the form of a cursor. This is very bad implementation, consider if the response is of 5GB and it is returned in the form of an array so the system will crash when working upon such a large array inside the RAM. For Example if we are adding a balance field and inserting records in each document we need to traverse whole array and to do so it should be present inside RAM and the system will crash.
> So, in place of this we can use cursor to send the response one by one (one document at a time) using await inside for loop like: 
  : const result = collection.find({});
    for await (const doc of result)
        console.log(doc);
  : - View all documents from the collection.
    - During this operation it is checked that the database/collections exists
    - If the collection doesn't exist, MongoDB won’t throw an error.
    - The cursor (result) will be empty, so the loop won't execute.
    - Note: This does not create the collection.


> But we will not be using MongoDb rather we will use Mongoose. But Why?
  : Refer 05_Mongoose - introduction.md