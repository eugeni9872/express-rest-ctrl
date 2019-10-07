# Install

```
yarn add express-rest-ctrl
```
or
```
npm install express-rest-ctrl
```


# How to use

After install the express-rest-controller you need to create the `controllers` folder inside you root project

```
$ mkdir controllers
```

So, after create the controllers folder, lets create a controller thats called `User` for example.


```
class User{
    get(req,res,next){
            res.send({works: true})
    }

    post(req,res,next) {
            res.send('Welcome to post method')
    }
}

module.exports = User;
```

>Inside controllers folder we can create subfolders and inside all the controllers with this structure `ControllerName.controller.js`

How you see the class has two methods, `get` and `post`, so let's registry this class as a controller and let's see what happen.


Inside you server file, lets add this little code.
```
const Server = require('express-rest-ctrl') //get the pk;
const app = Server.create() // Let's create the server

app.addRoute('/users', 'User') //Add the route and they controller
app.run() // Run the server

```

That's it, as you see we have only four lines of code, all of rest is managed by express-rest-controller


### Response examples:
![Drag Racing](https://i.ibb.co/3MfbJ1c/server-Test-Resource.png)
