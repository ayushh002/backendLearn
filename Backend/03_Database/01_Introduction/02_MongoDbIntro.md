> The topics discussed here are relevant in the context of High-Level Design (HLD), especially for SDE-2 and SDE-3 roles, where architectural decisions significantly impact system performance and scalability.


> Why Binary Search Cannot Be Applied Directly in MongoDB Collections?
  : Although documents in a MongoDB collection can be logically sorted, binary search cannot be applied directly due to the variable-length nature of BSON documents. Each document can contain deeply nested structures and different field sizes, which prevents us from computing a fixed offset between any two documents. As a result, there's no direct way to jump to the middle element in O(1) time, and searching requires O(n) time complexity even on sorted collections.


> Time Complexity of Operations in MongoDB Collections.

  • Insertion:
   - In an unsorted collection, inserting a new document is O(1).
   - In a sorted collection, maintaining the order requires shifting or re-indexing, resulting in O(n) time.

  • Update/Delete:
   - Both operations require scanning the collection or index to locate the target document, which takes O(n) time in the worst case.

  • Due to these overheads, sorting documents in a collection doesn't provide much benefit in terms of performance unless paired with a proper indexing mechanism.


> Solution: Using Indexes for Efficient Access.

  : To enable efficient search and updates we can store the addresses of each document in an array using indexing where the actual address of each document will be associated to its index based on its position. For example, The address of 3rd document will be associated with index 2.
  
  : We can now apply binary search on an index array, the actual documents can be stored anywhere on the SSD, and their addresses are mapped in the array in a sorted manner. This allows the documents to be inserted or deleted in O(1) time at the storage level. However, maintaining the index array in a sorted manner still requires O(n) time for insertion or deletion of entries within the array.

> Improving the Indexing Mechanism.

  - Although binary search becomes feasible on the index array, maintaining this array in sorted order still incurs O(n) insertion/deletion cost.

  - Alternatively, we can use a Tree-based indexing structure - Instead of an array, we can use a Binary Search Tree (BST) to store the document pointers (addresses) sorted by some unique key.

    : The average time complexity for searching, insertion and deletion is O(log n) but can degrade to O(n) in unbalanced BST where the tree grows infinitely only in one direction.

  - So rather than using BST, we can use Avl tree which is a self-balanced binary tree where the maximum height difference between left and right node is 1 and it guarantees O(log n) in worst case also.

  - Trees are not only used as a replacement for arrays to achieve better time complexity, but also offer greater flexibility in indexing. Unlike arrays, which rely on numeric indices, trees can handle keys such as user_name, phone_number, registration_id, or any other unique identifier that cannot serve as direct array indices. This makes trees particularly useful for mapping and organizing documents based on non-numeric, uniquely identifiable fields.


> How the data will actually be stored inside Tree?
  : Each address will be presented by a node which will have 4 fields - left pointer, right pointer, index or unique key, and a pointer to the acutal address corresponding to the key.

> Why B+ Tree is used for indexing ?

  1. Block-based I/O: When reading from a hard disk to RAM, data is transferred in blocks (typically 4KB or 8KB). Reading or writing a single byte isn't supported (operations occur block-wise).
  2. Storage inefficiency with traditional trees: In databases like MongoDB, tree nodes are small (around 40–50 bytes). So even when we need just one node, an entire block is loaded into RAM, causing I/O inefficiency and memory wastage.
  3. Optimization via B+ Tree: To reduce this overhead, we can pack more addresses per node, which is exactly what the B+ Tree structure allows.
  4. Disk-optimized structure: A B+ Tree is a self-balancing tree designed for efficient disk storage and fast data access—ideal for large databases and file systems.
  5. Internal node design: Internal and root nodes in a B+ Tree store multiple keys and pointers (to smaller, larger, and middle-value subtrees), allowing higher branching and reducing tree height.
  6. Data location in leaf nodes: The actual address linked to a unique ID (used as an index) is stored only in the leaf nodes. Internal nodes may repeat IDs for routing purposes, but only the leaf holds the corresponding data.
  7. Linked leaf nodes for range queries: In B+ Trees, leaf nodes are linked to each other. The pointer that normally directs to larger elements in internal nodes now connects to the next leaf (sibling). This design enhances range query efficiency, such as: `SELECT user_name FROM users WHERE id BETWEEN 20 AND 30;`.

> MongoDB stores data in BSON (Binary JSON) format, which is similar to JSON but offers support for extended data types such as dates, binary data, and all standard JSON types. This makes BSON more versatile and efficient for representing and transmitting complex, structured data.