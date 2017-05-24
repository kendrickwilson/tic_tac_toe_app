# Educational resources
https://da-bootcamp.firebaseapp.com/?course=start_programming_dart<br/>
https://dartpad.dartlang.org
 
# Install the development tools
  
## Install code editor
  VSCode (https://marketplace.visualstudio.com/items?itemName=DanTup.dart-code)
   
## Install native development tools
   * Android Studio
   * Java SDK
   * XCode

## Install/update node.js/npm
   NodeJS (https://nodejs.org/en/download/current/)

## Install cordova
   ```bash 
   npm install -g cordova
   ```

## Install bower
   ```bash 
   npm install -g bower
   ```

# Create cordova app 
   ```bash 
   cordova create tic_tac_toe_app org.mountnebochurch.ttt TicTacToe
   ```

## Install platform
   ```bash
   cd tic_tac_toe_app   
   cordova platform add ios   
   cordova platform add android
   ```

## Check development requirements
   ```bash 
   cordova requirements
   ```

## Build application
   ```bash
   cordova build
   ```
   
## Run app in emulator
   ```bash
   cordova emulate android
   ```

## Push app to phone **NOTE: put your android phone in developers mode **
   ```bash
   cordova run android
   ```
    
# Install onsen with bower
   ```bash
   cd wwww
   bower install onsen
   ```
# Add tic tac toe game assets
