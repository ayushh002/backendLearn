> When we send a request, the server responds with an universal status code to indicate whether the request was successful or if an error occurred on the client or server side.  
> This helps the frontend display appropriate feedback based on the response code.

Status Code  | Meaning                | When to Use                               |
    200      | OK                     | Successful GET/PUT/PATCH                  |
    201      | Created                | Resource Created (POST)                   |
    400      | Bad Request            | Invalid client input                      |
    401      | Unauthorized           | Authentication is required or invalid     |
    403      | Forbidden              | Authenticated but lacks permission        |
    404      | Not Found              | Requested resource does not exist         |
    409      | Conflict               | trying to create a user who already exist |
    500      | Internal Server Error  | Server encountered an unexpected error    |