
## HOW THE INTERNET WORKS

**Q**: What is the difference between the internet and the web?

**A**: The internet is a network of computers connected by wires and routers. The web is a collection of documents linked to each other by hyper-text.

Every connection to the internet has its own IP address which allows it to be located in the same way a postal address does for a house.

**_EXAMPLE_**
_There is a command called **ping** that lets us test a connection to another machine on the internet. Lets try it with google._

`ping www.google.com`

_As you can see one of the first things in the terminal is an IP address corresponding to the website we just pinged._
_We can use this IP address in the same way we did with google's web address because they both point to the same server on the internet_

`ping 216.58.206.100`

_And just to prove this lets try it in the browser_

`216.58.206.100`

Although IP addresses are the way that machines find each other on the internet they aren't very memorable or human friendly, so in place of these strings of numbers, servers use the DNS or **D**omain **N**ame **S**ystem. You can think of it as the yellowpages of the internet where web addresses are assigned to their corresponding IP addresses.

Your computer/device also has a MAC address. This is a unique identified for the device, which is important because a single IP address can be shared by multiple devices on the same network.


---

**WHAT IS A REQUEST?**

As web developers, we're primarily going to be dealing with HTTP and HTTPS requests. We'll be using CRUD operations to make our requests.

**CRUD**
There are quite a few different methods available for making requests on the internet. The most common ones are

* GET - used when asking for something back
* POST - used for adding something to a database. These requests have bodies which hold the bulk of the request and the text that we want to send
* PATCH / PUT - used to partially update something in a database.
* DELETE

Let's make a request. It's actually really easy to make a GET request, as it's the default request method our browsers send. So this is what happens when we do a GET request to www.google.com in our browser. 

However, all information over the internet is transmitted in plain text. So what is happening here? We're receiving a plaintext website, with HTML, CSS and JS, and our browser is building it into something useful. 

Using a tool called **POSTMAN** - which we're going to need to make all manner of requests - we can have a look at this plaintext how it is transmitted. 

**WHAT IS AN API**

So imagine I am interested in looking at a certain user's Tweets on Twitter. If I wanted to analyse them, or store them in a database, I could send off a get request for their literal twitter page, and write a program that sifted through that HTML and garbage plain text, in order to work out what a tweet was, and then save it into a DB. Deriving anything useful in a programmatic fashion from the UI of the average website would be a nightmare. It would involve reasonably complex pattern detection. You'd have to split up HTML strings, and pull out their contents.... Surely there must be an easier way? 

That's where APIs come in. API stands from Application Programming Interface, and many organisations, including Twitter, make their APIs freely, publicly available. Why would they do that? Well it encourages people to use their services for one, and the more supplementary services that devs build (for free) around their software, the more popular it becomes.

The APIs that we're going to be using (and making from tomorrow) will serve all their data up in JSON. What is JSON?

Javascript Object Notation is a way of transmitting stringified Javascript that conforms to a very particular rule set. It can be accessed with regular javascript, or parsed into proper JS, should we wish to. It's ideal for us. 

lets use github's API to demonstrate:

_**EXAMPLE**_

`api.github.com/`

When we go to github's api we're presented with this response, which looks something like an object. This is an object in the JSON format (Javascript Object Notation) and is a format used for sending http requests and responses. This particular object is giving us information on how to use github's API.

If we make a request to one of these urls:

`https://api.github.com/users/{user}`

we can see that github is giving us data according to the the url we used in our request.

`https://api.github.com/users/{user}`

As you can see, the data that we get back could actually be useful if we wanted to build something around it, or incorporate it into an app.

`https://api.github.com/search/repositories?q={search-query}`

#### THE ANATOMY OF A URL

* `http://` (protocol)
* api. (conventionally used to tell the user what type of server the URL points to)
* github (name)
* .com (top level domain)
* /search/repositories ()
* ?q=something (query)

**URL QUERIES**

In this last example you'll notice the unusual syntax at the end of the url. In a URL this is known as a query. A question mark followed by key value pairs where multiple queries are seperated by the `&` symbol.

_**EXAMPLE**_ - _**INTRODUCE POSTMAN & SHOW SIMILAR REQUEST**_

_**EXAMPLE**_ - _**REQUESTS IN JS**_

```js
//https allows us to send requests. No need to npm install.
const https = require('https');

const options = {
  hostname: 'api.github.com',
  path: '/users/northcoders',
  method: 'GET',
  headers: {
    'User-Agent': 'northcoders'
  }
};
```

**TALK ABOUT STATUS CODES**

All HTTP respones are transmitted with status codes. 

There are the following ranges: 
100s - these are informational
200s - these are STATUS OKAY
300s - these are redirects
400s - these are client errors, errors made on the side of the user
500s - these are server errors, mea culpa!

We can use the node HTTP/HTTPS modules, to send these requests. Obviously the responses come back asynchronously, as we need to deal with them. We also need to build up the packets as we collect them!

Here is an example of a simple request, and how to work with it when it comes back.

```js
const req = https.request(options, function (res) {
  console.log('res.statusCode:', res.statusCode);

  let body = '';

  res.on('data', function (data) {
    body += data.toString();
    // console.log('\nBODY:', body); ==> undefined
    // console.log('\nDATA:', data);
  });
  res.on('end', function () {
    // console.log('rawBody:', body);
    console.log('\nPARSED BODY:', JSON.parse(body));
  });
})

req.on('error', function (err) {
  console.error(err);
});

req.end();
```

Up until this point we've been writing code that runs on our own computers, so hopefully, now that we've touched on making basic http requests, you can see how this opens our code up to interacting with the rest of the world.

There are hundreds of interesting APIs that you can interact with but for today's sprint you'll be looking at the Twitter API and getting used to making requests like this.

A really cool series of videos on how the internet works : do check them out if you have time:
* https://www.youtube.com/watch?v=Dxcc6ycZ73M&list=PLzdnOPI1iJNfMRZm5DDxco3UdsFegvuB7

## ANY QUESTIONS?
