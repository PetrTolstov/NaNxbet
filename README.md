# NaNxbet - https://nan-xbet.vercel.app
## Descriptions
This web application offers betting based on several events.
A React app built with Vite that makes building and running a site much faster than building on a regular react-create-app.
Bets are taken from a json file that emulates the response from the server.
Also, the second bet is not available, and if you select it, then in the basket, when you click on the Bet button, an error will pop up explaining that the bet is not available.

## Tools
As I wrote above, the application was generated on Vite. In the application, app also use mobx to store states and accesses them from different components, besides this application uses several small libraries like Toast and Confetti.

## Structure
The root folder contains the configuration and the html file as the entry point to the application.
The src folder contains the api folders (emulation of requests to the server), components, models (classes for various data used in the application), stores (store of event states and baskets), as well as the main tsx files of the project.

## Problems
In the stores, I originally planned to make a list of the Set type, making an add-on on the class and changing the add method so that the objects were unique in the Set. However, due to the use of mobx, the store itself did an add-on to the Set, erasing mine, thereby maintaining the default uniqueness configuration (only primitives). The IDE also did not see this add-on and showed that Set was my custom type, only instanceof showed that Set was of type ObservableSet. So I chose to go the easy way and replace Set with regular List.
