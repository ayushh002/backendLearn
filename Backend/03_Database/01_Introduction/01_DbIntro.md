> What is a Database?
  : A database is an organized collection of data that allows for efficient storage, retrieval, updating, and deletion of information. 
  : Databases are managed by specialized software known as Database Management Systems (DBMS) such as MySQL, MongoDB, or libraries like Mongoose (which is used with MongoDB in Node.js applications).
  : These systems allow us to easily work with millions of records using simple queries, enabling fast and reliable data operations.


> Why Excel is not considered as a database management system?
  : In excel, there are limited number or rows and coloums and hence not compatible for large(million) set of data.
  : Excel is not designed for multiple users to perform simultaneous read/write operations. It lacks features like atomicity, consistency, and concurrency control that a DBMS provides.
  : No query management (although filters are there) and it lacks automation.
  : No Transaction Management: Excel doesn't support transaction features such as rollback, commit, or ACID properties that ensure data integrity in a DBMS.

Note: It can be used for storing small temporary data such as survey data collected from a group of people using google form.


> What is Structured and Unstructured Data?

  • Structured Data refers to data that is organized in a predefined format, such as rows and columns in a table. It is easily stored, accessed, and processed using traditional database systems like MySQL or PostgreSQL.
  - Example: Customer records, sales data, employee details.

  • Unstructured Data refers to data that does not have a specific format or structure, making it more difficult to store and analyze using traditional methods. It often requires specialized tools like NoSQL databases or Big Data platforms.
  - Example: Images, videos, audio files, social media posts, emails, documents (PDFs, Word files).
  - We cannot use queries for videos and images and hence they are considered as unstructured data. Also, these videos/images are larger in size which takes time and more resources to be fetched and stored. That's why we store link of any video/image in structured data not the original video content. These videos/images are stored in any file storage system.
  - The metadata(length, quality, creation date, etc.) of a video/image is structured data on which the queries can be performed. So, the metadata along with the video/image can be categorized as semi-structured data.

Note: MongoDb is a NoSQL database that stores semi-structured data, meaning the data has a flexible but readable structure — unlike fully structured (SQL tables) or completely unstructured (videos, images).


> ACID Properties: 

  - Atomicity: Atomicity ensures that a transaction is treated as a single unit of work, which either completes entirely or has no effect at all. For example, consider a money transfer between two bank accounts. If money is debited from sender's account but the receiver's bank is not responding due to downtime then the transaction must fail as a whole. In this case, the amount debited from the sender’s account should be rolled back, ensuring that no partial transaction takes place.

  - Consistency: Consistency ensures that a transaction transforms the database from one valid state to another, maintaining all predefined rules and constraints. For example, during a bank transaction, if the total amount across all accounts was consistent before the transaction, it should remain the same after the transaction as well. If any part of the transaction violates rules — such as failing to update all affected records — the entire operation must be rejected to keep the database in a consistent state. This prevents data corruption and maintains the integrity of the system.

  - Isolation: Isolation ensures that multiple transactions, occuring at the same time, don't interfere with each other and each transaction behaves as if it is the only one running. For example, if two users are transferring money at the same time, Isolation ensures that each transaction is processed independently, and the final state of the database is consistent — just like the transactions were executed one after the other. This prevents issues such as reading incomplete data or overwriting updates, and guarantees data correctness during concurrent access.

  - Durability: Durability ensures that once a transaction is successfully completed and committed, its effects are permanently saved in the database, even if the system crashes or loses power immediately afterward. This means the data will not be lost under any failure. To guarantee this, many systems use transaction logs and also create replicas of the database — stored on different machines or locations. These replicas help recover the data in case the original database gets corrupted or destroyed, ensuring that committed data remains intact and reliable at all times.


> When Do We Use MySQL and MongoDB?

  : The choice between MySQL and MongoDB depends entirely on the specific requirements of the application. For example, in banking systems, MySQL is commonly used because of its ACID properties, which ensure consistent transactions having the support for rollback and commit operations. However, in social media platforms like Instagram, NoSQL databases such as MongoDB are preferred.

  : Let’s understand this in details:

  - Suppose Instagram uses MySQL to store user data, and it introduces a new feature like a dislike button. In this case, a new column would need to be added to the SQL table, and every existing record would require a default value (e.g., 0) to be inserted. This becomes a major pain point when dealing with million of records.

  - Another scenario is when a user places multiple orders. In MySQL, each order would be stored as a separate row, repeating the same user details every time except for the order item and ID. This results in data redundancy and an unoptimized structure. To handle this, we need to perform normalization, which can make the schema more complex with different tables communicating through primary and foreign key.

  - In contrast, MongoDB allows multiple orders from the same user to be stored as a nested array within a single document, along with all user details. This eliminates the need for normalization or joins. MongoDB stores data in a JSON-like format, without traditional rows and columns.
   • Data is organized into collections (like tables in SQL).
   • Each record is called a document (similar to a row).
   • Each key-value pair in a document is known as a field.

  - MySQL primarily supports vertical scaling, whereas MongoDB supports both vertical and horizontal scaling, making it more suitable for applications requiring high scalability.
    : Vertical Scale: It refers to increasing the capacity of a single server by adding more CPU, RAM, or storage. There’s a physical limit to how much a single machine can be upgraded. Hence, infinite vertical scaling is not possible.
      • MySQL relies on vertical scaling to handle increased load, which becomes less efficient as data grows rapidly.
      • In MySQL, implementing horizontal scaling is challenging. For example, if two tables are stored in different databases (on different servers), using joins across them becomes inefficient and significantly increases query time. This makes horizontal scaling less feasible in traditional relational databases.
    : Horizontal Scaling: Horizontal scaling involves adding more servers or databases to distribute the load. MongoDB supports horizontal scaling using sharding.
     • Since MongoDB does not use joins, there's no overhead of cross-database communication, making it highly efficient in horizontally scaled systems.
     • Data is distributed across multiple servers without affecting performance, which is ideal for large-scale applications.


> Sharding is the process of splitting and storing data across multiple servers to ensure scalability and performance. It is a key concept in High-Level Design (HLD) and is typically discussed at the SDE-2 level and above during system design interviews or real-world architecture planning.


> A load balancer is used to distribute incoming requests evenly across multiple replicas (or instances) of a database or servers. This ensures high availability, fault tolerance, and prevents any single replica from becoming a bottleneck.


> Challanges in Distributed Database: One of the major challenges in a distributed database system is maintaining data synchronization across all nodes or replicas.

  1. Synchronization Across Replicas
   • For example, imagine a user posts a comment on a reel on Instagram.
   • If the load balancer routes this write request to the 1st replica, the comment is stored there.
   • Later, if another user requests to see that comment on the post and the load balancer routed that request to the 2nd replica, the comment should still be visible.
   • This means that when a write operation is performed on one replica, the change must be propagated to all other replicas to ensure consistency.

  2. Write on Master, Read from Replicas
   - To handle this, a common convention is followed:
    • All write operations are directed to a master (primary) database.
    • During the write, read operations may be blocked on all replicas to avoid inconsistent data views.
    • Once the write is completed, the updated data is replicated to all read-only replicas.
    • This model ensures strong consistency and is commonly used in MySQL-based systems.

  3. Eventual Consistency Model
   - Alternatively:
    • Read operations are not blocked during a write.
    • For instance, if someone posts a comment, it might take a brief moment before the updated comment count is reflected across all replicas.
    • This is acceptable in systems like Instagram, where slightly stale data is tolerable.
    • This model is generally used in MongoDB and systems that prefer availability over immediate consistency.


> CAP Theorem

  • The CAP theorem, also known as Brewer's theorem, is a principle that applies to distributed databases and systems. It states that a distributed system can simultaneously guarantee at most two out of the following three properties:
    - Consistency
    Definition: Every read receives the most recent write or an error. In other words, all nodes in the system reflect the same data at the same time. Implication: After an update, every client sees the update immediately. This is similar to the behavior of a single-node database.
    - Availability
    Definition: Every request (read or write) receives a response-regardless of whether the response contains the most recent data.
    Implication: The system is always operational and responsive. However, during certain failures, the data returned might not be up-to-date.
    - Partition Tolerance
    Definition: The system continues to operate even if network partitions(communication breakdowns between nodes) occur.
    Implication: Since network failures are inevitable in distributed systems, partition tolerance is generally non-negotiable.

  • Out of first two, consistency is preferred in banking systems where MySQL is generally used meaning either the correct updated data or error that the server is down is shown. Whereas availability is preferred in social media platforms like Instagram where MongoDb is used (MongoDb is very flexible and can follow ACID properties also (although it is complex to implement) as it is Not Only SQL Database).  