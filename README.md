# Treasury Auction System

## Business background

Marketable securities can be bought, sold or transferred after they were originally issued. The U.S.Treasury uses an auction process to sell these securities and determine their rate.


## Main functionality

Admin creates an Auction Announcement based on which securities are issued and sold. After an Auction has ended, admin is able to trigger automatic Auction resolution based on the predefined Auction rules.

Registered users can see Auction Announcements, place bids for currently running Auctions, view placed bids, view public Auction resolution and view purchases they were granted after the resolution.

# Team & Timeframe

3 developers + senior dev supervision -> 6 weeks

# Tech Stack

### Typescript
A strongly typed version of Javascript.
https://www.typescriptlang.org/

### Jest
Test framework.
https://jestjs.io/

### dotenv
For loading environmental variables from a .env file into `process.env`.
https://www.npmjs.com/package/dotenv

### Eslint
For enforcing a unified code style across the application.
https://eslint.org/

### Prettier
Automatically corrects stylistic mistakes in the code like placing missing semicolons at the end of lines.
https://prettier.io/


## Backend

### Node.js + ts-node + nodemon
Server side runtime environment built on Chrome's V8 JavaScript engine.
ts-node - a CLI tool that can run Typescript files directly
nodemon - automated listening to file changes
https://nodejs.org/

### Express.js
Web framework for receiving HTTP calls and responding to them. 
https://expressjs.com/

### MySQL + TypeORM
An Object–relational mapping library with strong Typescript support.
https://typeorm.io/


## Frontend

### React
The UI framework.
https://reactjs.org/

### Redux
Used for global state management.
https://redux.js.org/

### Sass
For defining custom CSS styles and themes.
https://sass-lang.com/