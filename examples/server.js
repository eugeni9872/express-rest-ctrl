const Erc = require('express-rest-ctrl')

let app = new Erc();
app.enableJSON() //For access to the body
app.addRoute({path:'/users', controller: 'User::Index', method: app.METHODS.GET })
.addRoute({path:'/users/update/:id', controller: 'User::Update', method: app.METHODS.PUT })
.addRoute({path:'/users/:id', controller: 'User::Delete', method: app.METHODS.DELETE })


app.run()