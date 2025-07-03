# PCR Web Application

## [Changelogs](Documentation/ChangeLogs.md)

Welcome! This repository contains the Vixxo PCR Angular front-end web application and API proxy server, which is built inside a Docker container. If you follow the below instructions, you should be up and running in no time.

## Technologies Used

This application is built upon the following technologies and versions:
- Front-end Framework:
    [Angular v8.2.0](https://angular.io)
- Front-end UI Kit:
    [Kendo UI for Angular](https://www.telerik.com/kendo-angular-ui)
- Server, Development and Build Tools:
    [Node v10.15.1](https://nodejs.org/)

## Getting Started

To begin development work on the Vixxo Angular Web app, you will need to stop any other web servers running locally, especially if you are on an Apple computer running an Apache Web server on port 80. Follow the steps below to begin development on this web application.

1. **Clone this repository** onto your local machine and then navigate to the project root directory.
1. **Start API proxy server** start the node server with the command `npm run start` or via a process manager such as PM2 (https://www.npmjs.com/package/pm2) and the command `pm2 start vixxo_api.config.js`
1. **Server the Angular app** with the comman `ng serve`
1. **That's it!** now you can navivgate to [http://localhost:4200] and view the app

## Angular CLI Commands

This project uses [Angular CLI](https://github.com/angular/angular-cli) version 8.2.0.
The following commands are intended to be run INSIDE of the container for development porposes.

- `npm run start:dev` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
- `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
- `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
- `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io). Before running the tests manually make sure you are operating INSIDE of the testing container.
- `npm run regression-local` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/). Tests will run against your locally running application.
- `npm run regression-validation` to execute the end-to-end tests against the hosted application in the validation environment.
- `npm run regression-staging` to execute the end-to-end tests against the hosted application in the staging environment.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Environment Variables

You may pass additional environment variables to your application by including them in your `environment.ts` file located in `./src/app/environments`. There are individual environment files for each environment that the app is deployed to.

## Node.js API Proxy Server

The front-end application communicates to the Vixxo API via a thin proxy layer. This proxy is built on Node.js. Some of the benefits to proxying requests include, robust support for cross-origin requests, an ability to issue requests to other third-party APIs, as well as handle reaunthenticating with Auth0 using Silent Authentication. Let's take a closer look at these.

### CORs

CORS or [Cross-Origin Resource Sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) is an important part of web-page security. In this application, without the added proxy layer, the web front-end would require the Vixxo API to build in support for cross-origin resources requested in development and production instances. This work includes building in support for all pre-flighted OPTIONS requests as well. In an effort to reduce complexity, the proxy layer enables support for cross-origin requests using the [cors package](https://github.com/expressjs/cors). For implementation details, please refer to `./server.js`.

### Protoform Vixxo library 

This is a library of shared pre-configured and pre-styled Angular components. You should consider to clone the protoform library on the root at the same level of Vixxo Angular Web Application before you compile this repository.

### Third-party APIs

In addition to providing access to the Vixxo API, the Node.js proxy layer provides access to thwo other third-party APIs: the [Google Maps/Places API](https://developers.google.com/maps/documentation/javascript/places) as well as the Amazon S3 File API. These APIs are given thier own routers and their routes are namespaced `/maps` and `/aws` respectively. For implementation details please refer to `./server.js` and `./routers/`. API keys are defined as environment variables in the `environment.ts` file.

### Auth0 Silent Reauthentication

In an effort to improve the user experience we've implemented Auth0 Silent Reauthentication. This type of reauthentication is handled in way that is transparent to the end-user. The Node.js proxy layer serves the necessary assets for silent reauthentication support. For implementation details, please refer to `./server.js` route `silent` and the [Auth0 documentaton](https://auth0.com/docs/api-auth/tutorials/silent-authentication)

### Deployment and Code Promotion

This application is deployed by a Jenkins pipeline that builds a Docker container, sends it to cloud hosting and runs it. 

A test container can be spun up by commenting `Test` on a Pull Request. A comment of `Clean` on a Pull Request will destroy the container. If a Pull Request is closed or merged, any associated test containers will be automatically destroyed.

When a Pull Request is merged to the Dev branch, a build will automatically be triggered and will build a container and deploy it to the Validation environment. The manual promotion of code happens via a Jenkins pipelien and takes the container that was built for the Validation environment and deploys it to the Preview environment. Another manual promotion of code via a Jenkins pipeline takes the container that was deployed to the Preview envionrment and deploys it to both the Staging and Production environments.

## Troubleshooting

The section below is to document "gotchas" and common build errors.

- `Abort trap 6` and other Javascript heap errors may requrie you to start the web app with the command `NODE_OPTIONS="--max-old-space-size=4096" ng serve`
- `Error starting userland proxy: Bind for 0.0.0.0:80: unexpected error (Failure EADDRINUSE).`
  This is due to a conflict on port 80. Are you running a local web server?
  *On Mac:*
  `sudo apachectl stop`
- If your build fails at webpack compilation, there could be an issue with SCSS modules.
  Try running `npm rebuild node-sass --force` to resolve.
- If you get an error while running regression test that indicates the version of Chrome is not compatible:
 `This version of ChromeDriver only supports Chrome version`. Then just open Chrome on your computer and update it
- If you fail to resolve .git error then check for git.ts file under environments folder.
