How Json and Javascript Object is different?

| Aspect                   | JavaScript Object | JSON (text based - string )              |
| ------------------------ | ----------------- | ---------------------------------------- |
| Quotes for keys          | Optional          | Required (must be double quotes `"key"`) |
| Quotes for string values | Optional          | Required (must be double quotes)         |
| Can be an array          | No                | Yes                                      |
| Can include functions    | Yes               | No                                       |
| Can include `undefined`  | Yes               | No                                       |
| Can include comments     | Yes               | No                                       |

>  If the backend is written in a different language (such as Java, Python, PHP, etc.), it won’t understand raw JavaScript objects directly sent from the frontend. That's because JavaScript objects exist only in the JavaScript runtime (browser) and are not natively recognized by other programming languages.

> Therefore, we need a common data format that both the frontend and backend (regardless of language) can understand and parse. These formats can work across different languages.

> The most common such formats are:
  : JSON (JavaScript Object Notation) – lightweight, widely supported, easy to use (it is in string format).
  : XML (eXtensible Markup Language) – older, more verbose, used in enterprise APIs  

> JSON: It is a text based data exchange format in which the key must be a string type.

>  JSON.stringify converts js objects - `{name: "Ayush", age: 20}` into json string - `'{"name": "Ayush", "age": 20}'`. This string can be understandable and parsed by any language and it can be transferred through the physical layer by converting the string into bits which is easier than converting the object into bits.

> If we are displaying any data on the UI by fetching it from a backend server using the GET/USE method, we can see a GET request appear in the Network tab when we inspect the page in the browser. 

> Although HTML forms can submit POST requests, we don't need to rely only on frontend like forms to make POST requests. We can directly make POST requests using JavaScript in frontend — for example, using the fetch() API with method set to 'POST'.

> fetch('https://example.com/api/data', {
    method: 'POST',
    headers: { // information about the format of data
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: "Ayush", age: 25 })
  })
> If we don't attach this method here, then by default `GET` is attached to it.
> However, to trigger this request, we typically need some frontend UI element (like a button or form submission) and attach an event listener (e.g., onClick) to perform the fetch operation.

> Rather we can use `POSTMAN` which helps us to test API requests/responses

> Now let's make a BOOK STORE MANAGEMENT PROJECT which has all the CRUD operations.