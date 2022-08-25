# ballsy - an HTML Canvas game 🎮

### Try it out
1) Download the project from gitHub
2) Open a terminal and cd (change dir) into the root folder
3) Type in "npm install" to install the required packages
4) Type in "npm run dev" to run the project in dev mode
5) Open the link which should've appeared in your terminal
(most likely localhost:3000)

### About this project
This project was done using the HTML5 canvas API ,vanilla javascript and scss.
The main file "ballsy.js" contains the setup and gameloop.
Everything else is split into fitting files, like menu logic in one file and sound logic in another.

### How the game works
You control a ball (circle) which you have to navigate along a generated path.
The further you get, the faster you'll be. If you collide with a wall, the game is over.

### What I've learned
When building your own game engine it is important to come up with a good structure for all the files and classes
and also a good way for communicating between those.
In that regard I've learned how valuable events are, because you can simply subscribe to that event from whereever you want.
Also, if you ever build your own Canvas game, try to seperate UI logic from game logic as strictly as possible..
