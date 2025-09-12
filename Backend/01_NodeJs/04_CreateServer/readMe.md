> Server are of two types: 
  : Hardware Server: A physical machine (like a powerful computer) that provides computational resources, storage, or services to other computers or clients over a network.
  : Software Server: A program or application that runs on hardware and provides specific services, such as a web server, database server, or file server.

> Why we need server ?
 : Suppose I provide an image delivery service to users. I have thousands of images stored on my local machine.
 : If I try to manually send each requested image to users through WhatsApp, it becomes impractical and unscalable.
 : Instead, I can build an automated system that receives requests and sends back the correct images automatically.
 : This is where a server comes in — it acts as an intermediary that listens for user requests, processes them, and delivers the appropriate response (in this case, images).

> We can create our own server but we don't use our own computer hardware to host a server because a server is needed to be kept online 24/7 and a stable and fast internet connection is needed throughout. Also, the system should be compatible to handle too many users requests. If we need to update or reboot the system, the server would go offline, disrupting service.

> That's why, instead of using our own hardware, we host our server on cloud platforms that are built for this purpose. Companies like AWS (Amazon Web Services), Google Cloud Platform (GCP), and Microsoft Azure provide cloud infrastructure where they have powerful and scalable hardware (data centers) installed within.
> So, we just have to think about building the software logic and the hardware part is handled by these platforms.

> How Do Clients and Servers Communicate?

  : The communication between a client and a server typically happens over the TCP/IP protocol suite (Transmission Control Protocol / Internet Protocol).
  : When a client wants to send data (like a message), it targets a specific IP address (identifying the device) and a port number (identifying the application or service on that device).
  : For example:
   - Let's say WhatsApp's backend service is running on port 3001
   - Instagram's backend might be on port 2001
   - Even if both services run on the same server (i.e., same IP address), they are distinguished by their port numbers.
  : So, when a user sends a message through WhatsApp, the client sends the request to the server’s IP address at port 3001, ensuring that the request reaches the correct application (WhatsApp) and not another service like Instagram (which might be listening on a different port but have the same IP).
  : When a client connects to a server, a socket is created on both sides to establish the communication channel.
  : A socket is a combination of an IP address and a port number — together, they uniquely identify a network endpoint. Sockets ensure that data goes to the correct program on the server. Once the entire communication for that channel is over then that particular Socket is closed and new sockets are created for future requests.
  : But mostly the server doesn't close the socket immediately and keep it active for sometime, so that the same channel can be used when user requests any other service in future.

> Now if we request access to any website with its url the DNS maps that url with the desired IP address and the port number is taken as the default port used for the http which is port no. 80 and for https it is 443.

> For a real-time chat application, WebSockets are used. A WebSocket is a communication protocol that provides full-duplex, bidirectional communication between a client (like a web browser) and a server over a single, long-lived connection.

> In a traditional client-server connection using regular sockets (or HTTP), the server responds only when the client sends a request. However, in chat applications, either party can send a message at any time. This means the server must be able to push messages to the client without waiting for a request — which is exactly what WebSockets enable. Here, there is no need to repeatedly open and close connections (like HTTP), so communication is faster and more efficient.

> Node Js already have a http module which we can use to make a server. 