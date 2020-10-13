# snowpack-react-ssr

## Background:

Building for the "Modern web" (Chrome 61+, Edge 16+, Firefox 60+, Opera 48+ and Safari 10+... yes, IE isn't a modern browser) has become relatively simpler, with built in support for [EcmaScript Modules](https://exploringjs.com/es6/ch_modules.html#sec_basics-of-es6-modules) or ES6 modules or Modern JavaScript Modules. One can resort to writing a single script file with type as 'module', and all of the imports for subsequent JS file will be taken care by the browser natively. Multiple round trips to the server can be avoided by use multiplexing techniques introduced in HTTP 2, 2.1 and 3 specifications, which is also actively supported, or at least going to be supported in near future. We can now safely say that we no longer need a code bundler like Webpack or Rollup and get rid of all the complexity involved in bundling of code.

That being said, some things are still stopping us from taking this route. Few of them listed below:

 1.  Support for legacy browsers - Not all of your consumers are tech savvy and more often lucky enough to work with a modern browser. To continue supporting them, one can decide on either transpiling and bundling things the way its done currently (Babel + Webpack/Rollup), or serving HTML only (server rendered) code all the time.
 
 2. Library support for ESM - That brings us to the second problem - ESM support (searching for ESM builds) for all the libraries used in the project currently. At the point of writing this article, [ReactJS doesn't have](https://github.com/facebook/react/issues/11503) an official ESM build. There are few community maintained versions, but not all of them are actively supported. One of the community versions being [pika/react](https://github.com/pikapkg/react) (see next section), which in spite of being actively supported lacks support for `renderToString()` method used for rendering ReactJS components on server side.
 
 3. Support for transpile and bundle of non JavaScript files such as CSS, JSX, etc.
 
 
 This project aims at building a proof of concept application using standard ReactJS template. It presents workarounds and solutions available at this point of time to help you kick start your next project ground up with ESMs.
 
 ## Approach

This project uses a mix of ESM and CommonJS to implement Server Side Rendering (SSR) using ReactJS.
It works as below:

There are 2 versions of app:
1. ESM version where there is only transpile of some JSX to JS and CSS to `<style>`. All other code is loaded natively in the browser

2. CommonJS version where complete app is run through @babel/preset-env and @babel/preset-react and served to the browser for the first render. This bundle is served along with the ESM build of project files via a script tag; so the browser can then make use of ESMs to process further client side updates.

SSR flow works as below:

1. App bootstraps with CommonJS version of server and content is rendered using CommonJS versions of source files of the app
2. On reaching the client, the browser makes request to ESM version of the app
3. After first hydrate, the app loads different pages by fetching required ESM modules on the fly

## Role of Snowpack and pika packages

As stated above, [pika/react](https://github.com/pikapkg/react) is an actively maintained ESM version of React and ReactDOM. Actually, you can find versions of a lot of other packages on their [Skypack](https://www.skypack.dev/) CDN. [Snowpack](https://www.snowpack.dev/) fits right in place in our strategy of using unbundled code in both development and production environments. It also supports transpile and dynamic loading of CSS and JSX files, so that our regular development cycle isn't impacted.


This project was bootstrapped using Snowpack's @snowpack/app-template-react template.

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
