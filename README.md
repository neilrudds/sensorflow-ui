# Welcome to SensorFlow!

A project developed in partial fulfilment of the requirement for the degree of MASTER OF SCIENCE in Software Development in The Queens University of Belfast.

**Neil Rutherford - 40351466**

This is the frontend solution for the SensorFlow IoT Platform.

This application provides the frontend user interface for the application and has been developed in **React** and hosted on **NodeJS**.

The application is a bespoke IoT platform enabling users to create there own dynamic, configurable and bespoke set of workspaces and dashboard through a dynamic grid and widget style layout.

## The application contains the following components:

- React v13.4.0
- Node.js v19.6.0-alpine
- NGINX latest

## IDE

VS Code

Visual Studio Code is recommended for opening the main solution directory for this project - `\sensorflow`.

## Solution Project Structure
The solution consists of the following directories and sub-directories:

└── 📁public – \\ Public root div element where all content is to be rendered
	└── index.html
    └── robots.txt
└── 📁src \\ Main application code
└── App.js \\ Main React Application Component
    └── 📁assets \\ Static items such as images, css, fonts etc.
    └── 📁components \\ Individual components organised by type
        └── 📁form \\ User form components for user input
        └── 📁modal \\ Pop-Up modals
        └── 📁ui \\ Small UI components common throughout the application
    └── 📁context \\ React context files
    └── 📁data \\ Static data files such as .json files
    └── 📁hook \\ Custom global hooks used across our application
    └── index.js \\ Initial application page
    └── 📁pages \\ Individual page folders
        └── 📁Dashboard \\ A grid containing a collection of widgets
            └── 📁widgets \\ A collection of widgets suitable for dashboards
        └── 📁Devices \\ Device management page
        └── 📁Home \\ Default home page
      └── 📁Login \\ Authorised user login page
        └── 📁Signup \\ Tenant signup page
   └── 📁utils \\ Custom application utilities used globally
        └── 📁apiManager \\ Global API endpoint management utility
        └── auth.js // Performs a login request and stored JWT in context
       └── AuthProvider.js // Authentication callback provider
        └── Constants.js // System constants such as API URIs
        └── RequireAuth.js // Checks current login state
        └── withClickOutside.js // Higher Order Component to close navbar
        └── WorkspaceProvider.js // Manages user workspaces


## Packages
The following packages are used across the solution:
- apexcharts v3.47.0 - Modern & Interactive Open-source Charts.
- mqtt v5.5.0 - MQTT Websockets Client for React.
- nanoid v5.0.7 - A tiny, secure, URL-friendly, unique string ID generator for JavaScript.
- react v18.2.0 - React is the library for web and native user interfaces.
- react-apexcharts v1.4.1 - A wrapper component for ApexCharts for integrating into your react.js application 
- react-dom v18.2.0 - DOM-specific methods that can be used at the top level of your app and as an escape hatch to get outside the React model.
- react-grid-layout v1.4.4 - React-Grid-Layout is a grid layout system much like Packery or Gridster, for React.
- react-icons v4.11.0 - Popular icons for your React projects .
- react-router-dom v6.17.0 - The React Router.
- react-sizeme v3.0.2 - Make your React Components aware of their width and/or height.
- react-tabs v6.0.2 - An accessible and easy tab component for ReactJS.

## Available Scripts

### `npm start`

[](https://github.com/neilrudds/sensorflow-ui#npm-start)

Runs the app in the development mode.  
Open  [http://localhost:3000](http://localhost:3000/)  to view it in your browser.

The page will reload when you make changes.

## Docker
Docker is used to build and deploy the code for this project.

## Docker Desktop
Docker Desktop is recommended for running Docker if you are using a Windows development machine.

## CI/CD
GitHub Actions is used to run deployments to Amazon EC2 instances running the docker engine.
