# Server

It is the main class that takes care of all the logic of the package like adding route, middleware and running the server

### package/lib/Server.js


#### class Server

Class that is responsible for creating the application, registering routes with their controllers.


##### Returns


- `void`



#### Server.constructor(ExpressApp) 

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| ExpressApp | `Express`  |




##### Returns


- `void`



#### Server.addRoute(path, ControllerName)

Add a new route, with its controller and configuration




##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| path | `String`  | The route path |
| ControllerName | `String`  | The name of controller class |




##### Returns


-  Server



#### Server.run([port&#x3D;3001]) 






##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| port&#x3D;3001 | `number`  | The port for running the application | *Optional* |




##### Returns


- `void`



#### Server.enableJSON() 

Enable body json parser






##### Returns


-  Server



#### Server.enableFORM() 

Enable body form parser






##### Returns


-  Server



#### Server.setMiddleware([path&#x3D;null], middleware) 






##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| path&#x3D;null | `String`  | The path where apply the middleware(if path is null will apply to all routes) | *Optional* |
| middleware | `Function`  | The middleware function. |




##### Returns


-  Server



#### Server.create() 

Create the main app.






##### Returns


- `void`




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
