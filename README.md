# Pokemon Battling Application!

## App Description
The Pokemon Battling Application (PBA) is designed to be a social application utilizing Facebook
login to enable two users to do a battle with preset (for now) teams of Pokemon!

Logging in with Facebook allows users to connect to the Chat Window, located on the right side of
the webapp, ensuring that any abuse will have users' names attached. While this integration is not
necessary for battle functionality, it prevents direct communication without some level of accountability
on the part of a potentially toxic user.

### Initial Implementation
Users were be able to select a team of two Pokemon based on the order they connected, and utilize the Chat Window
on the right side of the webapp regardless of the state of their Facebook login. Buttons required double-clicking
to accurately select a move, and no super effective/not very effective/had no effect damage modification occurred
in the Battle Log.

### Current Implementation (5/4/2017)
Users are able to connect to the webapp and are presented with a carousel modal that displays information about the
game and its features, as well as about the webapp itself (creators, technology, backstory). When accessing the page,
users are given the choice to Spectate or Join the Game until two players are a part of the game logic. From there, any
number of users (in theory) can connect to watch the battle take place.

Each player controls a team of four predetermined Pokemon that they can switch between freely (with one current known bug)
as their turn instead of attacking. No secondary effects of moves (status infliction, critical hits, stat changes, etc) are
currently implemented but are definitely in the works for a future release. We do have Super Effective!, Not Very Effective...,
Had No Effect, and Same Type Attack Boost calculations implemented for more accurate (and fun/strategic!) battle logic.

The webapp includes links in the navigation bar that connect any users to additional information. One links to the PokeAPI 
for more details about the API we use to obtain the relevant information without storing a BOATLOAD of data on our little 
Heroku server. The other funnels to our GitHub page so that people can see behind the scenes (which clearly led you here!).

### Advanced Implementation [Stretch Goal/Post-Course Goal]
User will be able to select a team of three Pokemon, and as each one is selected the Landing Page the user will be able
to select four moves that are accessible to that Pokemon. Once all three Pokemon are selected, the user will be moved to
the Battle Page where they can either wait for another user to battle against, or do battle against a more complex bot
(still named "Gary Oak") that will have some semblance of strategy. [Due to issues along the way, this will be a stretch-
goal-esque list of features that may be added post-final-presentation]

## Contributors
Sean Carpenter - Team lead, battle algorithms, huge Pokemon nerd

Brandon Avery - Page layout, logic flow, coast-based imbibing extraordinaire

Will Czubiak - Backend development, socket poking, master of potatoes

Jason Fitzgerald - Chat log, Pokemon Pane, he'll log your pane!

## Aspects Completed
### Handin-1
At this point, we've converted a React-based chatroom application to include other elements
we want present in the Battling page of our Pokemon Battling Application (PBA). These include
the Battle Log, Pokemon Status Frame, and Command Button Interface.

The Login/Team Creation page is still being designed and will be fully implemented for Handin-2.
This page will allow the user to login using Facebook, and will use their decisions to create a team
of Pokemon to battle with on the Battle Page.

The added and modified elements are currently placeholders, as Babel is being difficult and not rendering components
as it should. This will be fixed in the future.

### Handin-2
We have out application looking nearly the way that we want to, with a functioning chat on the side and buttons for
Pokemon moves and switching working correctly. We also have HP bars functioning based on backend input, alongside 
sprites for the Pokemon the users have that are obtained from the PokeAPI.

As we've been working, we have scaled back our goal to be a pre-set team of three for each Player/User, with the possibility
of a random moveset for each of their Pokemon. Player 1 will always have Pokemon A, B, C and Player 2 will always have D, E, and F.
For this Handin, we have focused on implementing a single Pokemon for each user to then expand for Handin 3.

### Handin-3
HOUSTON, WE HAVE A BATTLE! We have the first two users to connect be assigned as Player 1 and Player 2, each assigned their own
team of two Pokemon! Damage is applied from attacks appropriately based on stats calculated from API calls. Our next feature
to implement will be adding in data for Super Effective/Not Very Effective/No Damage hits based on typing (not currently implemented).

Chat functionality is fully up and running, with a reset function to restart the app as there was no way to restart the Heroku application
remotely or through the web interface. This feature is hidden from the users, and will not be included in the App Info/About carousel.

## Known Problems
### Handin-1
It goes without saying that our application will not do very much as is, but we've built a skeletal
structure for the PBA at this point. No actual battling is occurring, and we do not have a bot or
any interaction with the API active. Even the Chat Log is currently a placeholder, as Babel is being
a jerk and not rendering components as of yet.

### Handin-2
Our application is much further along, with far more UI features and functionality implemented with the move to
Bootstrap, but we're still struggling to implement the Facebook login in a meaningful way to have two players able
to interact with their Pokemon specifically. A big roadblock has been getting all of our components working, to then
be able to implement the data we can call from the PokeAPI, alongside making the switch over to Bootstrap from basic
CSS.

### Handin-3
We know that it takes a double-click on attack buttons to appropriately register the new attack before confirming it
to be used in battle, and that there is an issue with Player 1 connecting and seeing the same Pokemon as both theirs
and their opponent's, but this is fixed as soon as Player 2 connects.

## Improvements Over Time
As detailed in the description, each "official" iteration of the PBA will integrate more complex
additions, be it more control over the team the user(s) create, a more strategic bot user, or even
allowing for another user to connect and do battle with you!

UPDATE: Intended Handin-3 features will be the ability for two Players to connect to the page, control their own
team of Pokemon, and be able to do battle in a timely fashion while also being able to chat via the small chatapp
built into the right-hand side of the page. There will also be a Professor Oak bot that can give them hints (and
include Easter Egg phrases from the games) present in the chatapp.

Other improvements (time allowing/after the class concludes) will be to add Held Items for Pokemon, implementing 
Pokemon Abilities into the combat calculations, adding Weather Conditions to combat calculations, etc.