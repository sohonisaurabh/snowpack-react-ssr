# snowpack-react-ssr

This project uses a mix of ESM and CommonJS to implement SSR using react.
It works as given below:

There are 2 versions of app:
1. ESM version where there is only transpile of some JSX to JS
2. CommonJS version where complete app is run through @babel/preset-env and @babel/preset-react

SSR works as below:

1. App bootstraps with CommonJS version of server and content is rendered using CommonJS versions
 of app source files
2. On reaching the client, the browser makes request to ESM version of the app
3. After first hydrate, the app loads different pages by fetching required ESM modules on the fly

This project was bootstrapped using Snowpack's @snowpack/app-template-react template.

# New Project

> ✨ Bootstrapped with Create Snowpack App (CSA).

## Available Scripts

### Running app in Client Side Rendered (CSR) mode

### npm start

Runs the app in the development mode.
Open http://localhost:8080 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### npm test

Launches the test runner in the interactive watch mode.
See the section about running tests for more information.

### npm run build

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!

**For the best production performance:** Add a build bundler plugin like "@snowpack/plugin-webpack" or "@snowpack/plugin-parcel" to your `snowpack.config.json` config file.


### Running app in Server Side Rendered (CSR) mode

1. `npm run build`

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!

2. `npm run build-src`

Builds (actually, transpiles) all source code using @babel/preset and @babel/preset-react

3. `npm run build-server`

Builds (actually, transpiles) all express server source using @babel/preset and @babel/preset-react

4. `npm run start-server`

Starts server on port 5000 and serves content via SSR to following routes:

a. /
b. /about
c. /users
