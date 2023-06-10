# iogame


There are 2 main components of this game.
1. Client: 
  Operates in browser. 
  Separate for each user.
  Renders the game state. 
  Records user input and sends it to the server.

2. Server: 
  Simulates the game. 
  Calcuates game state and sends it to all the clients. 

On startup, the client
1. Notifies the server that the user has connected. 
2. Downloads all the assets from the server.
3. Renders the Ready Menu. 





