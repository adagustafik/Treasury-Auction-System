# Treasury Auction System

## Business background
Marketable securities can be bought, sold or transferred after they were originally issued. The U.S.Treasury uses an auction process to sell these issued securities and determine their rate.


## Main functionality
Auctioning software with multiple views for bidders & admins.

Admin creates an Auction announcement based on which securities are issued & sold. 

Registered users view Auction announcements & can place bids for currently running Auctions:
1. Competitive bids are limited to 35% of the security offering amount. User is here able to specify Auction rate based on which the final Auction rate is calculated.  
2. Non-competitive bids are limited to $5 million per auction. 
All bids are considered cumulatively. Registered users can view placed bids as well as the purchases after auction resolution.

After an Auction has ended, admin is able to trigger automated auction resolution as follows:
1. Final rate is calculated based on the highest competitive bid rate submitted
2. Bids are awarded in pre-defined order until the quantity of awarded bids reaches the offering amount
3. Non-competitive bids are awarded first based on the bidding time 
4. Competitive bids are awarded afterwards based on their proposed rate in descending order
All registered users can see public Auction resolutions, so that fair treatment & trust is ensured.


## Run app
* Copy data from .env.example to .env file + adjust you db username & password
* Open 2 terminals -> navigate in each to BE & FE folders
* Type "npm run dev" command to run the scripts


## Tech Stack
**Typescript**

**Eslint + Prettier**
enforcing a unified code style across the app

**Jest + supertest**
test framework + library simulate HTTP calls for integration tests

**dotenv**
loading environmental variables from a .env file into `process.env`.

**Node.js + ts-node + nodemon**
- server side runtime environment built on Chrome's V8 JavaScript engine
- a CLI tool that can run Typescript files directly
- automated listening to file changes

**MySQL + TypeORM**

**Express.js**
web framework for HTTP communication

**React + Redux**
frontend UI + state managment

**Sass**
css extension


## Architecture
### DB Entities
**Auction**\
    @OneToMany -> Bid\
    @OneToMany -> Purchase (to display Auction resolution to users)

**User**\
    @OneToMany -> Bid\
    @OneToMany -> Purchase

**Bid**\
    @ManyToOne -> User\
    @ManyToOne -> Auction

**Purchase**\
    @OneToOne -> Bid (Purchase -> Bid -> User connection used here)\
    @ManyToOne -> Auction

### Basic data flow
FE -> components/AppRouter -> pages/LoginPage -> LoginFormComponent -> api/fetchLogin

BE -> routes/rootRouter -> authRouter -> utilities/validation (class-validator library)\
BE -> services/authService/loginUser -> generateToken -> jwt added to cookies + response .json/.txt (success/error)

FE -> toast notification from BE\
FE [on success] -> store/slices/user/setupUserDataAction -> redirect to dashboard


## Lessons learned / Tasks covered 
* [BE] Authentication / Authorization
    - generating & validating jsonwebtoken
    - handling registration / login / logout
    - retrieving jwt from cookies
    - writing own middleware functions

* [BE] TypeORM
    - basic CRUD operations
    - writing async functions
    - using multiple relational calls to the DB (getPurchases)
    - leveraging Transactional Entity Manager for data atomicity

* [BE] Express router & Jest
    - create REST api endpoints
    - using req / res objects
    - sending back success -> json object / error -> txt
    - integration test simulating HTTP calls

* [BE] Validation workflow 
    - usage of DTOs & decorators from class-validator 
    - building general utility with validate function
    - validation is triggered directly from Router endpoints & service is accessed afterwards    

* [BE] Placing bids & Auction resolution
    - leveraging SQL ordering and filtering capacity to optimize the app (bidsPerUser, resolveAuctions)
    - abstracting complex logic into separate functions
    - thinking about business logic & "edge cases" (max rate calculation -> min rate has to be defined!)

* [FE] API & Redux
    - fetching data from BE & storing them in the Redux store
    - setting up Redux Actions, Reducers & Selectors
    - FE data flow - updating the Redux store state (Login/Logout, profile update)

* [FE] Register & Profile
    - TopBarComponent with ReactNode as prop (Login / Register link / username from Redux store)
    - RegisterFormComponent 
        - reactive input fields + FE validation after submit
        - React Bootstrap FormControl + native HTML5 form validation
        - implementing Toasts for user notification
        - component reused on Profile page for resetting email &/ password (with preset email value - UX)

* [FE] Dashboard
    - selective dispatch of data fetch based on the user role
    - selective display of SideBarComponent & content for logged-in user
    - limiting display to top 5 via props for both Auctions/ Bids tables

* [FE] Bids & Auctions
    - date & time conversions & comparisons - utilities
    - filtering display to current / history via props
    - usage of React fragments & key mapping
    - Accordion for Auction resolution table display
    - Modal for placing Bids directly on the page       
    - AuctionsTable has different rendering based on user role (admin cannot place bids) & based on page (dashboard - auctions extended)
    - selective input fields display (competitive / non-competitive)

* [devops] setup initial CI via GitHub Actions
    - handling setup for 2 apps in 1 repo
    - setup env vars for MySQL