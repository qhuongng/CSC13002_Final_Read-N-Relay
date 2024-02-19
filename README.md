# Read & Relay - Online Trading Platform for Old Physical Books

This is a group project assignment from the course **CSC13002 – Introduction to Software Engineering (21CLC01)** at VNU-HCM, University of Science.

## Project contributors
1. Nguyễn Quỳnh Hương ([qhuongng](https://github.com/qhuongng))
2. Đinh Công Huy Hoàng ([QuiQuang](https://github.com/QuiQuang))
3. Lê Mỹ Khánh Quỳnh ([lmkq](https://github.com/lmkq))
4. Nguyễn Ngọc Vũ ([ngocvu9412](https://github.com/ngocvu9412))

## General information
Read & Relay was developed using React, with JSON Server simulating a RESTful API to access and manipulate data on a JSON file.

Features of the website include:
- Browse and search for books on sale, as well as view each book's detailed information and reviews
- Write reviews for books and add them to the user's Favorites
- Purchase old books posted for sale by other users
- Post books for sale

## Demo
The demo for the website can be viewed on [YouTube](https://www.youtube.com/watch?v=lGvSohW1WOs).

## Build & run the website locally
***Note:** Due to time restrictions and the website's lack of a real, proper back-end, the **Post book for sale** function utilizes SerpApi's Google Image Search API to automatically fetch an appropriate book cover based on the title provided by the user, instead of allowing the user to upload a custom cover image. The API key is not included in the source files of this repository. Therefore, unless you substitute with your own API key, this function will not work. Other functions should still work normally.*

[Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) are required to build and run Read & Relay.

1. Clone this repository.
2. Run `npm i` to install necessary packages.
3. Run `json-server --watch db.json --port 3030` to start JSON Server and enable Read & Relay to interact with the database.
4. Open a new terminal and run `node src/utils/cors` to run a CORS proxy server and enable external API calls (necessary for SerpApi integration). If you do not have an API key or do not wish to use this function, feel free to skip this step.
5. Open a new terminal and run `npm start`. Read & Relay should now be available at **http:<i></i>//localhost:3000**.

If you wish to substitute the SerpApi's API key with your own, create a **.env** file in the same directory as **package.json** and add your key as `REACT_APP_IMAGE_API_KEY`.
