# Ways of working

Main branch: `master`

1. Create a branch for the ticket you are working on.
    * Before creating branch make sure you have the latest code on `master`.
    * Make sure you are standing on branch `master`when creating the new branch.
    * Branch should have the same name as the ticket, including the ticket ID.
2. When you think a feature is finished make sure it is working as intended.
3. Before pushing your code run the linter with `npm run checkcode`.
4. Push your code and create pull reqeust for master.
5. Check if there are merge confilsts and resolve them by pulling master into your branch.

## Commit message convention
Prefix commit message with ticket ID they belong to.
## CSS class naming convention
In order to give unique CSS classes use the following naming convention.

*component-name*__*specific-function-of-element*

# Tech Stack

## Common

### Jest
Test framework.

https://jestjs.io/

### Eslint

For enforcing a unified code style across the application.

https://eslint.org/

### dotenv

For loading environmental variables from a .env file into `process.env`.

https://www.npmjs.com/package/dotenv

### Prettier

Automatically corrects stylistic mistakes in the code like placing missing semicolons at the end of lines.

https://prettier.io/

### Typescript

A strongly typed version of Javascript.

https://www.typescriptlang.org/
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

### Eslint
For enforcing code stylings. The ruleset is a combination of the default Create React App ones, the Airbnb typescript ruleset and some rule defined in package.json.

https://eslint.org/

https://typescript-eslint.io/

https://github.com/iamturns/eslint-config-airbnb-typescript

### React Bootstrap

For some predefined React components like buttons, modals and toast notifications.

https://react-bootstrap.github.io/

## Backend

### Express

Web framework for receiving HTTP calls and responding to them. Also provides the general framework of the application.

https://expressjs.com/

### TypeORM

An Object–relational mapping library with strong Typescript support. It is used for modelling the database entities and their relationships in code, so querying and manipulation of the database is made easier.

https://typeorm.io/

https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping

### ts-node

A CLI tool that can run Typescript files directly.

### Nodemon

Listens to changes in the files of the project and automatically runs a given command when it notices a file has changed.

https://www.npmjs.com/package/nodemon
