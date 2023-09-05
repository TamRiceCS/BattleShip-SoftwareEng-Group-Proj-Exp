# Software-Engineering-Group-Project-Example

### Release 1 (Agile Methodology: Scrum)
Our first release should be thought of as a proof of concept release meaning that all primitive functionality was developed during this release. The design is also very primitive and is further developed later. In this version, only single player is functional. 
From a front end perspective, there is a multi-screen system going from start screen to game options then finally to the game. The game has two boards, one for the enemy and the other for the player. The player can click on both boards. After loading in the graphics of the games. The player can place ships via clicking buttons on the left hand side and hovering over a desired location; basic collision detection prevents players from stacking ships on top of eachother. Once the user has placed all their ships the attack phase can begin. 
The backend compliments the details of the front end with functions. Since a lot of the backend can be explained via what the GUI does when interacted with. We will discuss hidden aspects of the backend. One such hidden aspect is the virtual board for our game. This board is populated with carefully selected characters to represent the board for backend processing. 

### Second Release (Agile Methodology: XP)
Our second release was meant to further develop the game with quality of life updates. From this point below will be a list of these updates and what they bring to the game.
#### Fog of War
Once all ships are placed and the attack phase begins a fog envelops the enemy board. This fog represents unknowns of the board. Once the player attacks, the fog at that space is lifted.
#### Feedback for Attacking (Hit/Miss)
The user is directly notified of a Hit or Miss on the enemy board via a notification window and visual feedback from the board. 
#### Enemy Attack Capabilities
The enemy now attacks the user after the user attacks. A true turn based system has been implemented
#### Graphical Updates
The game has gone through a lot of beautification. We now have background images for every screen the user sees. The buttons are no longer generic buttons and give feedback when clicked. The first 2 game screens light up when hovered over. The game screens ship buttons change color as well. Blue buttons have been selected, Green buttons have been successfully placed and white buttons have not been interacted with.

### Thrid Release (Agile Methodology: Lean)
In our third release, we focused on co-op functionality as well as feedback for the user. We updated nearly every part of our UI, including additional feedback for the user on gameplay elements like turn status, and scores. We fixed several hidden bugs that were revealed in our unit testing, and did a final pass on gameplay sprites for additional clarity, such as colored ships for the different players.
Our UI updates mostly came from the user feedback we got when testing. Testers commented on not knowing how to play, so we added an instructions panel to the game directing them. There was also a lack of visual feedback on game progression, so we added a prominent turn indicator and message box at the top of the screen indicating the enemy’s move and whose turn it was. We colorized the player ships to distinguish between player one and player two in cooperative mode.
Our unit tests revealed some hidden bugs that could have deeply affected gameplay. The enemy was able to guess the same tile to attack more than once, which could stop them from ever finding a ship. We also had to perform some refactoring to get the enemy to choose which player to attack, and also tested the two separate player boards thoroughly. We were able to achieve a 100% pass rate on our test suites.
