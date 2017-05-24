## Getting started
  
### Install code editor
* VSCode (https://marketplace.visualstudio.com/items?itemName=DanTup.dart-code)
   
### Install native development tools
* Java SDK (http://www.oracle.com/technetwork/java/javase/downloads/index.html)
* Android Studio (https://developer.android.com/studio/install.html)
* XCode (see mac app store)

### Install/update node.js/npm
* NodeJS (https://nodejs.org/en/download/current/)

### Install cordova
```bash 
npm install -g cordova
```

### Install bower
```bash 
npm install -g bower
```

## Download and build this app 
Download Zip Here. (https://github.com/kendrickwilson/tic_tac_toe_app/archive/master.zip)
```bash 
git clone https://github.com/kendrickwilson/tic_tac_toe_app.git
cd tic_tac_toe_app
cordova clean   
```

### Check development requirements
```bash 
cordova requirements
```

### Build application
```bash
cordova build
```
   
### Run app in emulator
```bash
cordova emulate android
```

### Push app to phone 
```bash
cordova run android
```
