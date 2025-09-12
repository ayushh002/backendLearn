🔁 React Routing vs Backend Routing (Express)
 
| React (Frontend) Routing                    | Express (Backend) Routing                     |
| ------------------------------------------- | --------------------------------------------- |
| Controls what the user sees in the browser. | Controls what data is sent to the frontend.   |
| Uses `react-router` to change pages without | Uses routes like `/api/users` to return JSON, |
| reloading.                                  | HTML, etc.                                    |
| Meant for UI navigation.                    | Meant for API endpoints and server logic.     |
| Runs in the browser (client-side).          | Runs on the server (server-side).             |

🧠 Why do we need routing in the backend if React handles it?
  -> Because React and Express do different things:
    ✅ React routes → for UI
      → Example: `<Route path="/about" element={<About />} />`
      → This shows the About component in the browser.
      → No server call is needed unless data is required.
    ✅ Express routes → for data and actions
      → Example: `app.get("/api/users", (req, res) => {
                    res.json([{ id: 1, name: "Ayush" }]);
                  });`
      → This returns data from the server (e.g., a list of users).
      → React might call this using fetch() or axios().
    ✅ React handles the page, Express handles the data

🧠 What if we try to use React for everything?
  -> React can’t access databases or write files — it runs in the browser. So, we must use backend routing (like Express) to handle:
  : Database access
  : Authentication
  : File uploads
  : Server-side logic
  : Sending data to and from frontend

🧠 Meaning of using `?`, `+` and `*` in the path.
  : Consider we are using all these signs after the letter `u` in the path `/about`
  -> `?` - Using this will make the keyword written before this mark as optional.
    : e.g., `/about or /abot` - here, u is optional - writing or omitting this will redirect on same page.
  -> `+` - Using this will make the keyword be written before this as many times it can be.
    : e.g., `/abouuuuut` - here, u can be written any number of times.
  -> `*` - Using this will let us write anything after that keyword which is before this sign.
    : e.g., `/abouerngfklt` - here, we can write anything between u and t.
  -> `params` - `/about/:id` here id is used as a dynamic parameter and using any id here will redirect to the about page only.