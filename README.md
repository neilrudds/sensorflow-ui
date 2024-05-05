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
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── index.html
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── robots.txt
└── 📁src \\ Main application code
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── App.js \\ Main React Application Component
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── 📁assets \\ Static items such as images, css, fonts etc.
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── 📁components \\ Individual components organised by type
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── 📁form \\ User form components for user input
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; └── 📁modal \\ Pop-Up modals
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── 📁ui \\ Small UI components common throughout the application
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; └── 📁context \\ React context files
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; └── 📁data \\ Static data files such as .json files
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; └── 📁hook \\ Custom global hooks used across our application
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; └── index.js \\ Initial application page
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── 📁pages \\ Individual page folders
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; └── 📁Dashboard \\ A grid containing a collection of widgets
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── 📁widgets \\ A collection of widgets suitable for dashboards
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── 📁Devices \\ Device management page
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── 📁Home \\ Default home page
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── 📁Login \\ Authorised user login page
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── 📁Signup \\ Tenant signup page
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── 📁utils \\ Custom application utilities used globally
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── 📁apiManager \\ Global API endpoint management utility
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── auth.js // Performs a login request and stored JWT in context
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; └── AuthProvider.js // Authentication callback provider
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── Constants.js // System constants such as API URIs
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── RequireAuth.js // Checks current login state
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── withClickOutside.js // Higher Order Component to close navbar
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── WorkspaceProvider.js // Manages user workspaces


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
