# Inliner Diner

## Email CSS Inliner Tool.

Built on [Juice](https://github.com/Automattic/juice) to convert CSS to inline styles.
* Options
  * Remove `<style>` tag from head
  * Preserve `!important` tags
  * `XML/XHTML` mode - necessary for mso/Outlook 

## React scripts
#### `npm start`

Runs the app in development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.  
The page will automatically reload if you make changes to the code.  
You will see the build errors and lint warnings in the console.

#### `npm run build`

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.  
The build is minified and the filenames include the hashes.  
Your app is ready to be deployed.  

## Serve the build folder  

Serve the build folder to [http://localhost:8000](http://localhost:8000) on mac without installing React's suggested serve.  
cd into to the build folder then run `python -m SimpleHTTPServer`

<img src="https://i.imgur.com/xLeK8mH.jpg" alt="Seinfeld diner scene" width="400px" />

> Nothing's finer than being in your Inliner Diner  