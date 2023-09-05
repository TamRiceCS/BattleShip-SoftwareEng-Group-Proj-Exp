# Software-Engineering-Group-Project-Example

### Release 1 (Agile Methodology: Scrum)
Our first release should be thought of as a proof of concept release meaning that all primitive functionality was developed during this release. The design is also very primitive and is further developed later. In this version, only single player is functional. 
From a front end perspective, there is a multi-screen system going from start screen to game options then finally to the game. The game has two boards, one for the enemy and the other for the player. The player can click on both boards. After loading in the graphics of the games. The player can place ships via clicking buttons on the left hand side and hovering over a desired location; basic collision detection prevents players from stacking ships on top of eachother. Once the user has placed all their ships the attack phase can begin. 
The backend compliments the details of the front end with functions. Since a lot of the backend can be explained via what the GUI does when interacted with. We will discuss hidden aspects of the backend. One such hidden aspect is the virtual board for our game. This board is populated with carefully selected characters to represent the board for backend processing. 

![alt text](https://user-images.githubusercontent.com/79335546/265827092-7378ed8b-efcf-4c3c-b11f-70f0c198a2a0.jpg "1a")
##### Figure 1.A (The above sketch depicts grid boards stacked on top of each other. The y axis and x axis are labeled to show game board dimensions. Ships are placed on the board, gray X’s next to ships indicate missed attacks while red dots on ships depict hits. A window appears to confirm an attack.) 
![alt text](https://user-images.githubusercontent.com/79335546/265827094-23db062a-116d-40ad-b6a9-906dd395c73b.jpg "1b")
#####  Figure 1.B (The above image depicts what was delivered for this release. Ships are placeable and a cursor icon has been created. Rudimentary attacking has been implemented but no iconography to display attacks to users has been developed yet)

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

![alt text](https://user-images.githubusercontent.com/79335546/265827096-647547a3-d102-47ee-90b3-0311180eb1b1.jpg "1a")
##### Figure 2.A (The two leftmost figures depict a plan to transfer our ship icon from a generic icon to a segmented ship. The two right figures show fog of war in the game and how it will dynamically cover the board)
![alt text](https://user-images.githubusercontent.com/79335546/265827084-48e7f97f-c0f4-4e80-9132-54fd230573b6.jpg "")
##### Figure 2.B (The above figure shows a UI/UX improvement from release 1 to release 2. The game start screen now has a button that reacts on hover and a background image has been placed on the page.)
![alt text](https://user-images.githubusercontent.com/79335546/265827086-ac15abdd-43d6-48f6-a08e-43e0fc47873c.jpg "")
##### Figure 2.C (Depicts the new segmented board and also the back-end dynamics of fog of war functionality. Ships have also been upgraded to distinguish between extremities and the center segments of the ship.)


### Thrid Release (Agile Methodology: Lean)
In our third release, we focused on co-op functionality as well as feedback for the user. We updated nearly every part of our UI, including additional feedback for the user on gameplay elements like turn status, and scores. We fixed several hidden bugs that were revealed in our unit testing, and did a final pass on gameplay sprites for additional clarity, such as colored ships for the different players.
Our UI updates mostly came from the user feedback we got when testing. Testers commented on not knowing how to play, so we added an instructions panel to the game directing them. There was also a lack of visual feedback on game progression, so we added a prominent turn indicator and message box at the top of the screen indicating the enemy’s move and whose turn it was. We colorized the player ships to distinguish between player one and player two in cooperative mode.
Our unit tests revealed some hidden bugs that could have deeply affected gameplay. The enemy was able to guess the same tile to attack more than once, which could stop them from ever finding a ship. We also had to perform some refactoring to get the enemy to choose which player to attack, and also tested the two separate player boards thoroughly. We were able to achieve a 100% pass rate on our test suites.

![alt text](https://user-images.githubusercontent.com/79335546/265827089-5adb6122-3a3c-4b83-bbde-07fb3fc7ace3.jpg "")
##### Figure 3.a (Instructions of how to play the game were added below the stats. Stats are the same for both players and update accordingly as the game progresses.)
![alt text](https://user-images.githubusercontent.com/79335546/265827090-c71a1117-3e27-47ec-a21a-1edce7e72f9d.jpg "")
##### Figure 3.b (Above shows the two player boards when co-op is selected. The left board depicts one of the players as red ships and the right depicts the other player as blue. Each miss is a water splash. Fog is where other player would guess revealing a broken piece of ship or water splash)

