# Inliner Diner

## Email CSS Inliner Tool.

Built on [Juice](https://github.com/Automattic/juice) to convert CSS to inline styles.

- Options
  - Remove `<style>` tag from head
  - Preserve `!important` tags
  - `XML/XHTML` mode - necessary for mso/Outlook
- Edit the source file directly to add link's href or img's src/alt on the `App.js` method `addLinksOrImg()`.
- Button to open a new tab/window with a new instance of the Inliner. Does not work with the `python SimpleHTTPServer`. Please follow instructions for serving the build folder for SPA capability.
- Button to copy the converted text to clipboard.

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

React suggests to use `serve` for to serve the build folder with a static server:  
`npm install -g serve`  
`serve -s build`

If you do not have admin access to install `serve` globally you can serve the build folder to [http://localhost:8000](http://localhost:8000) on mac with python.  
cd into to the `build` folder then run `python -m SimpleHTTPServer`. This does not allow for any route besides `/` due to the app being a SPA. Copy the provided `http-server.py` file into the build folder and cd into `build` then run `python http-server.py`.

<img src="https://i.imgur.com/xLeK8mH.jpg" alt="Seinfeld diner scene" width="400px" />

> Nothing's finer than being in your Inliner Diner
