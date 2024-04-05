# Web organizer project (frontend)
Disclaimer!  
That project was designed to be a private knowledge base and activity tracker, used by mostly a single person. That's why database and authentication methods were coded the way they are)  
Multiple users refeactor is in production.
  
  
## Installation
- Install nodejs LTS version from your OS and [PNPM package manager](https://pnpm.io/).
- Install serve package to run the built bundle ```pnpm install -g serve```
- Clone repository and run ```pnpm install``` inside the root folder
- Make and ``.env``` file in the root of the project (see ```.env file``` topic for details).
- You can run a dev server with ```pnpm run start``` command (not recommended) or build a bundle by ```pnpm run build``` command and serve the bundle from (for example) the root of the project by command ```serve -s ./build/ -l 4001```.
The frontend will be available on http://localhost:4001

## .env file
In order to check login info and communicate with backend - you need to create an ```.env``` file with the following structure. Note that keys names should not be changed. 


#### .env file content
```
REACT_APP_BASE_URL=http://192.168.1.60:9999
REACT_APP_LOGIN=user
REACT_APP_PASSWORD="pass\$2"
REACT_APP_ACCESS_TOKEN="BzWvp7Ruqnw7DWExxMk2bPvg"
REACT_APP_NODEENV="production"
```

REACT_APP_BASE_URL - net address of backend server (localhost or net ip address)  
REACT_APP_LOGIN - your login  
REACT_APP_PASSWORD - your password, note that special symbols in pass f.e. should be escaped with ```\``` (```pass\$2```)  
REACT_APP_ACCESS_TOKEN - this is a feature in development - a token to secure communication with backend server.  
REACT_APP_NODEENV - if set to 'production' then devtools for rtk is disables in production build.