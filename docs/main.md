# express-rest-ctrl *1.0.0*



### package/index.js


#### new Main() 

Class that is responsible for creating the application, registering routes with their controllers.






##### Returns


- `Void`



#### Main.addRoute(path, Controller) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| path | `String`  | The route path | &nbsp; |
| Controller | `Class`  | The class that control this router | &nbsp; |




##### Returns


-  Main



#### Main.setupApp(app) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| app | `Express`  | - Express instance | &nbsp; |




##### Returns


-  Main



#### Main.runServer(port) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| port | `Number`  | The port for listen requests | &nbsp; |




##### Returns


- `Void`



#### Main.create() 

Create the main app.






##### Returns


- `Void`




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
