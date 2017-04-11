# Pokemon Battling Application!

## App Description
The Pokemon Battling Application (PBA) is designed to be a social application, utilizing Facebook
login, to enable two users (or one user and our bot, "Gary Oak") to do battle with a team of Pokemon!

Logging in with Facebook allows users to become one of two Players, and get first choice between two
teams of Pokemon (Initial implementation)

### Initial Implementation
Users will be able to select a team of three Pokemon on the Battle Page from two options, where the three Pokemon
will be set to level 50 and know four battle-proficient moves available to them. When Player 2 connects, they will
be assigned the other team of three Pokemon.

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

Jason Fitzgerald - Chat log, Battle log, backend lumberjack (logs? heyo!)

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