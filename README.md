# everreal

4 endpoints : 

   / = Get the current status of the game - return the board
   
   /startNewGame = Create a new board, by default size 6 and 4 colors
       - params : size and colorsAmount
       
   /autoPlay = Automatically chose the next move to do and return the new board status and if the game is finished   
   
   /play = Play manually
       - params : color
       - if color is missing an error 500 is returned, if color is not correct, the board stay as it is.
       
The board is saved in a text file, not in a DB to avoid using too much time on the test. Obviously for a real game, it would be saved in a DB.       
       
       
Current tests status : 
---------------|---------|----------|---------|---------|-------------------
File           | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
---------------|---------|----------|---------|---------|-------------------
All files      |     100 |    90.32 |     100 |     100 |                   
 enums         |     100 |      100 |     100 |     100 |                   
  Colors.ts    |     100 |      100 |     100 |     100 |                   
 models        |     100 |    89.66 |     100 |     100 |                   
  BoardGame.ts |     100 |    89.66 |     100 |     100 | 91,136-143        
---------------|---------|----------|---------|---------|-------------------

       
