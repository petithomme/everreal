# everreal

## 4 endpoints : 

   - <em>/</em> <br>
      Get the current status of the game <br>
      - return the board
      - return is the board completed
   
   - <em>/startNewGame</em> <br>
      Create a new board, by default size 6 and 4 colors <br>
       - params : size and colorsAmount
       - return a new board
       
   - <em>/autoPlay</em> <br>
      Automatically chose the next move to do  <br>
       - return the new board status and if the game is finished   
   
   - <em>/play</em> <br>
      Play manually <br>
       - params : color
       - if color is missing an error 500 is returned, if color is not correct, the board stay as it is.
       - return the board and if the game is finished
       

>The board is saved in a text file, not in a DB to avoid using too much time on the test. Obviously for a real game, it would be saved in a DB.       
       
       
## Current tests status : 
<pre>
###### ---------------|---------|----------|---------|---------|-------------------
###### File           | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
###### ---------------|---------|----------|---------|---------|-------------------
###### All files      |     100 |    90.32 |     100 |     100 |                   
######  enums         |     100 |      100 |     100 |     100 |                   
######   Colors.ts    |     100 |      100 |     100 |     100 |                   
######  models        |     100 |    89.66 |     100 |     100 |                   
######   BoardGame.ts |     100 |    89.66 |     100 |     100 | 91,136-143        
###### ---------------|---------|----------|---------|---------|-------------------
</pre>
       
