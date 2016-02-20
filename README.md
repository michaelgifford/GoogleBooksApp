# GoogleBooksApp
iOS app using the Google Books API built with React Native

#Usage

$ npm install

$ npm start

Open Xcode, select a iOS simulator, & click the play button or cmd + R

#Usage in iOS Device
Note: has not been tested on a device

1.) Check official React-Native doument at http://facebook.github.io/react-native/docs/running-on-device-ios.html#using-offline-bundle for updates, steps based on official document

2.) Comment console in lib/middleware/logger.js because the native environment doesn't support console.group

3.) Make js bundle with: $ react-native bundle --entry-file index.ios.js --platform ios --bundle-output ./main.jsbundle

4.) Add js bundle to your project: open Xcode then select Files -> Add Files to... -> choose main.jsbundle file just created

5.) In Xcode select the device and click the play button or cmd + R

#Screenshots
http://imgur.com/a/nQPyj

