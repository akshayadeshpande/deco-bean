# Team Accordion - MeMa

![MeMa Welcome](./assets/images/welcomeMEMA.png | width=300)

This is a DECO3801 Studio Project created by:
* Akshay Deshpande
* Andrew Shaw
* Chloe Tan
* Danny Tong
* David Riddell
* Jameson Nguyen

# MeMa

![MeMa Logo](./assets/images/MEMALOGO.png =300x)

Team Accordion presents MeMa!

MeMa is a language learning platform which aims to tackle cognitive decline among older adults in a fun and engaging manner!

# How to run MeMa!
## Requirements
* [NodeJS](https://nodejs.org/en/) (LTS should be fine)
* [Expo](https://docs.expo.io/get-started/installation/) - Quick install `npm install --global expo-cli`
* Expo App on [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_AU&gl=US) or [iOS](https://apps.apple.com/au/app/expo-client/id982107779) - You will need this to run the demo app!

## Installing MeMa
1. Clone this repo
2. In the root with a command line tool, type `expo install` to install all required packages
3. Once installed, type `expo start` to start the expo browser client (see image below)

![Expo Browser](./assets/images/readme/expo-browser.PNG =1000x)

4. On the bottom left, select **Tunnel** or **LAN** if you are on a local network with your phone.

![Expo Tunnel Mode](./assets/images/readme/expo-tunnel.PNG =300x)

5. A QR Code will generate. Now open up the Expo app on your phone or tablet.

6. Select Scan QR Code and scan the QR Code from your browser. The app will now start transferring to your phone!

![Expo App](./assets/images/readme/expo-app.jpg =300x) ![Expo App](./assets/images/readme/expo-loading.jpg =300x)

7. Once the app has completed transfer you should see MeMa's sign on screen!

![Expo App](./assets/images/readme/mema-start.jpg =300x)

# Code and Backend

## Frontend Architecture
The main folders React Native app is contained in the following:

```
assets
    fonts
    -- Holds our custom fonts, with the exception of SpaceMono
    images
    -- Holds images and graphics used throughout the app
components
    -- Holds components which are isolated reusable pieces of functionality for the App. For example, the Audio Player handles the functionality around playing sounds.
constants
    -- Global constants that can be imported and used across the app
functions
    -- API functions for our 'Backend as a Service' through Firebase.
hooks
    -- React hooks used throughout the app
navigation
    -- Navigation functionality for the app
screens
    -- Where the magic happens with screen rendering. Screens typically are composed of components found in the components folder.
App.tsx
    -- This file is the main entry point for the app.

...
```
![ReactNativeLogo](https://reactnative.dev/img/header_logo.svg =150x)

Build with React Native.

The main idea behind React Native apps is that there should be an abstraction between what is rendered, and functionality for 
components that exist on a screen. Hence typically, our key functionality are indeed components - such as custom navigation buttons. 

The screens themselves should handle states shared by children, as the a screen acts as a parent in the React state hierarchy, as well as
finally rendering of the screen and all components within the screen. Any internal rendering of components is pulled from the component itself and rendered by the parent screen in the order they are called by the parent.


![FirebaseLogo](https://firebase.google.com/images/brand-guidelines/logo-built_white.png =150x)

## Database

We utilise Cloud Firestore (NoSQL) and Firebase Storage for cloud services, reliability, and scalability on demand.

Database diagram and some database discussion here.

## Backend

The backend is entirely handled in the cloud by Firebase. We build firebase functions for certain api calls and backend tasks 
that you would typically find a full stack application. Firebase hosts the functions and scales on demand.

