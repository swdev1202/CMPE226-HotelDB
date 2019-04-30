# CMPE226-HotelDB
This is a hotel management database application for the CMPE226 project @ San Jose State University.  

## Stack
```
Frontend - React  
Backend - Node.js  
Database - MySQL
```
## Setup
1. clone the repo [swdev1202/CMPE226-HotelDB](https://github.com/swdev1202/CMPE226-HotelDB) into your local machine.  


2. Frontend Setup]
Pre-requisites (for Windows 10)
```
(must) node.js (https://nodejs.org/en/)
(optional) vscode (https://code.visualstudio.com/)
```
Assuming you installed both, let's install dependencies for our frontend.  
Open up the VSCode and open a folder `HotelApp/frontend`.  
Inside VSCode, we can open up a powershell commandline by pressing `Ctrl + `` (or go to View->Terminal)  
Make sure you are located inside frontend.  
Now, run
```
npm install
```
This command will install all the dependencies from `package.json`.
After you install all dependencies (you may see some warnings but ignore them for now), run
```
npm start
```
This will render the frontend page at the `localhost:3000`. 
You can navigate to different pages from here.  
For instance,
`localhost:3000/create` will navigate to user create page.  

3. Backend Setup
Pre-requisites
```
same as the front
```
Now, direct yourself into `HotelApp/backend`.  
Open this folder in VSCode and open up the terminal.
Now, run
```
npm install
```
This command also installs dependencies for the node.js from `package.json`  
After you install all dependencies, run
```
node index.js
```
This will now start our backend nodejs server.

4. Database Setup
Pre-requisites
```
(must) MySQL
```
Once you installed MySQL in your machine, create a user `root` and set a password `root` with the host being `localhost`. 
(This is only for the project purpose and we are not going to deploy this on the web.)  
Once you are logged into the `root` user, load `SQL/hotel.sql` first and `SQL/load-samples.sql`.  
This will create new database called `hotel` and load sample data to the tables.  
Once your database server is up and running, that's it!

