# iogame





There are 2 main components of this game.
1. Client: 
  Runs in the browser. 
  Separate for each user.
  Renders the game state. 
  Records user input and sends it to the server.

2. Server: 
  Simulates the game. 
  Calcuates game state and sends it to all the clients. 

When you go to a website, your browser automatically sends a request to the address. 
The server at that address sends back code for that browser to run. 
This code is in JavaScript as its the only language integrated into browsers. 

This code
- renders the website
- handles user input recorded by the browser
- sends more requests to the server (or other servers)
- updates the website

This project uses Webpack. Because the client code is run the browser, all the dependencies - any libraries, etc must be sent over with your code. Webpack is a tool that goes through your code and its dependencies and sends over only the minimum amount of code that is needed to run your program. 

The server code is run in Node, a JavaScript environment you'll have to install on your OS.

Package.json is the configuration file for node projects. It's a json that contains:
1. packages used by the program
2. scripts

After installing node run:

npm install

NPM stands for Node package manager. This will install all the packages contained in the package.json file. NPM automatically installs them in the directory /node_modules.

Now you can run:

npm run build

Note "npm run" runs scripts from package.json. You'll see that the "build" script runs "webpack" with a number of flags. This will bundle the client code so it is ready to be sent to the browser. 

Now you can run: 

node src/server/server.js

This will have Node run the server. 

However, typically, you'd want to run

npm run develop

This runs the "develop" script from package.json. It sets some flags noting that this is a development environment and runs "nodemon" instead of "node". "Nodemon" is a module that automatically restarts your server whenever it sees any changes in your files. 

Currently, the server and client are able to send each other 4 types of messages. These are listed in /shared/constants along with other information that might be useful to both the server and client. 

The client can send:
JOIN_GAME,
INPUT


The server can send: 
GAME_STATE
END_GAME,


On startup, the server makes a Game. The Game object is responsible for manipulating the gameState found in state.js. 
Notably, the game state includes: 
players
hitboxes
platforms

The Game object has methods for adding/removing players from the game. It also contains the engine of the game: updateState. 
setInterval tells node to run a function every interval of x miliseconds. 

updateState 









