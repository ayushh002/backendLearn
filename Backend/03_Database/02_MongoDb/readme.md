> There are two ways to install MongoDB:
  1. We can install MongoDB locally on our system and give some storage to the database from our own SSD.
  2. We can store the data online on the cloud platforms like AWS, Google cloud, etc., through MongoDB.

> So, we will follow the second approach as it is scalable and realistic and an actual application also follows the same. MongoDB gives some free storage and then if we further want to increase it then we have to pay on the basis of our requirements.

> Cluster in MongoDB
  : In MongoDB, a cluster refers to a group of servers (nodes) that work together to store our database data. MongoDB uses a distributed architecture where:
   - Data is distributed across multiple machines for scalability and fault tolerance
   - The cluster consists of at least one or more replica sets (for high availability)
   - In sharded clusters, data is partitioned across multiple servers (shards) for horizontal scaling (this facility is not available in MongoDB free plans).

> In the setup phase, we created a MongoDB cluster on AWS and installed Compass, the graphical user interface for managing MongoDB databases. To connect Compass to our cluster, we use the following connection string:
 - `mongodb+srv://ayushh002:userPassword@codingclub.4tygwex.mongodb.net/`.

> Once connected to the cluster, we created a new database named `backend` and a collection called `user`. We then proceed to insert documents into this collection.

> When a new document is inserted, MongoDB automatically adds a field named `_id` with the data type ObjectId. This unique identifier is used internally by MongoDB to map the document to its physical location using a B+ tree structure, enabling efficient retrieval, updates, and deletions based on queries.

> MongoDb gives us advantage as it doesn't strictly follow a particular schema as any number and kind of field can be present in each document, unlike SQL databases.

> Now, we will not insert documents one by one using MongoDB GUI, rather we will be using our backend to connect to our database and perform all of these operations from there. For that we need to install MongoDb driver: `npm i mongodb`. 


> The MongoDB drivers allow Node Js applications to connect to MongoDB. The driver features asynchronous API to interact with MongoDB using promises or via traditional callbacks.
