# Pokemon Battling Application!

## App Description
The Pokemon Battling Application (PBA) is designed to be a social application, utilizing Facebook
login, to enable two users (or one user and our bot, "Gary Oak") to do battle with a team of Pokemon
that they've assembled! The Landing Page of the PBA will enable a user to login via Facebook and select
a team of six Pokemon.

### Initial Implementation
User will be able to select a team of six Pokemon before moving on to the Battle Page, where the six Pokemon
will be set to level 50 and know the four most recent moves according to their level-up move list. Only one user
will be implemented, and a basic bot will select six random Pokemon and fight using random moves or switching Pokemon.

### Advanced Implementation
User will be able to select a team of six Pokemon, and as each one is selected the Landing Page the user will be able
to select four moves that are accessible to that Pokemon. Once all six Pokemon are selected, the user will be moved to
the Battle Page where they can either wait for another user to battle against, or do battle against a more complex bot
(still named "Gary Oak") that will have some semblance of strategy.

## Contributors
Sean Carpenter - Team lead, battle algorithms, huge Pokemon nerd
Brandon Avery - Page layout, logic flow, coast-based imbibing extraordinaire
Will Czubiak - Backend development, sassy CSS eye-opener, master of potatoes
Jason Fitzgerald - Chat log, Battle log, backend lumberjack (logs? heyo!)

## Aspects Completed
### Handin -1
At this point, we've converted a React-based chatroom application to include other elements
we want present in the Battling page of our Pokemon Battling Application (PBA). These include
the Battle Log, Pokemon Status Frame, and Command Button Interface.

The Login/Team Creation page is still being designed and will be fully implemented for Handin-2.
This page will allow the user to login using Facebook, and will use their 

The added elements are currently placeholders, with Command Buttons simply printing to the
Battle Log, due to Spring Break taking up a great deal of the time in between the project
being assigned and Handin-1 being due.

## Known Problems
### Handin-1
It goes without saying that our application will not do very much as is, but we've built a skeletal
structure for the PBA at this point. No actual battling is occurring, and we do not have a bot or
any interaction with the API active. Since there will only be one user on the page, the Chat Log
will not have any real activity other than that which the single user may enter.

## Improvements Over Time
As detailed in the description, each "official" iteration of the PBA will integrate more complex
additions, be it more control over the team the user(s) create, a more strategic bot user, or even
allowing for another user to connect and do battle with you!

Other improvements (time allowing) will be to add Held Items for Pokemon, implementing Pokemon Abilities
into the combat calculations, adding Weather Conditions to combat calculations, etc.