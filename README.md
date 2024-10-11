<h1 align="center">SPEED App – Software Practical Empirical Evidence Database</h1>
<div align="center">
  <i>A searchable
database of evidence of different claims about different SE practices.</i>
  <br/>
  <br/>
  <p>
    <b>Paper:</b> ENSE701 – CISE<br/>
    <b>Task:</b> Assignment 1B</br>
    <b>Group:</b> W207_02<br/><br/>
    <a href="https://github.com/Brad123ghost">Bradley Chung</a> | 
    <a href="https://github.com/jsn-nz">Jason Duong</a> |
    <a href="https://github.com/LetMeP1ay">Vadim Berezin</a> |
    <a href="https://github.com/jackdar">Jack Darlington</a>
  </p>
</div>
<br/>

### Contents
  - [Product Overview](#product-overview)
  - [Stack](#stack)
  - [Hosting](#hosting)
  - [Installation](#installation)
  - [Usage](#usage)
  - [License and Disclaimer](#license-and-disclaimer)

<br/>

## Product Overview
The SPEED application is designed to host a searchable database in the form of a web application. The platform hosts key findings and claims from many different articles and allows easy access to summaries of these articles.

<br />

## Stack
For our application stack we are using the following technologies:
 - **Frontend:** React, Next.js
 - **Backend:** Node.js, Nest.js
 - **Database:** MongoDB

Key packages and tools used include:
 - **Styling:** TailwindCSS, RadixUI, ShadcnUI
 - **Forms:** React Hook Form, Zod
 - **Tables:** React Table

<br />

## Hosting
The official production version of the SPEED app is hosted and available at [https://speed-app-nu.vercel.app](https://speed-app-nu.vercel.app)

The following infrastructure is being used:
 - **Vercel:** Ephemeral serverless hosting the Next.js frontend
 - **Railway:** Long-lived service hosting the Nest.js backend
 - **MongoDB Atlas:** MongoDB M0 cluster hosted on AWS

<br />

## Installation
To install and run SPEED on your local machine follow the steps listed below:

### Dependencies
Make sure the following dependencies have been installed:
 - [Node.js LTS or >=20.18.0](https://nodejs.org/en)
 - [npm (Node Package Manager)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
 - [MongoDB](https://www.mongodb.com/try/download/community)

### Steps
1. Clone the `speed-app` monolithic repository:
   
   ```
   git clone https://github.com/pink-cute-scotland-donkeys/speed-app.git
   ```

2. Move into the `frontend/` directory:

   ```
   cd frontend
   ```

3. Install the required packages for the Next.js frontend using your package manager of choice (here I used `npm`):

   ```
   npm install
   ```

4. A single environment variable must be setup for the frontend to be able to make requests to the backend:

   ```
   echo "NEXT_PUBLIC_API_URL=http://localhost:8787" >> .env
   ```

6. Congratulations! The Next.js frontend is now set up. Now for the backend.

7. Move into the `backend/` directory:

   ```
   cd ../backend
   ```

8. Install the required packages for the Nest.js backend, again using your favourite package manager:

   ```
   npm install
   ```

9. Again, the environment variables must be setup. This step requires you to already have an instance of MongoDB set up, simply replace `MONGODB_URI` with your connection string:

    ```
    echo "JWT_SECRET=YOUR_SECRET
    FRONTEND_URL=http://localhost:3000
    PORT=8787
    MONGODB_URI=YOUR_CONNECTION_STRING" >> .env
    ```


10. Thats it! Following these steps the SPEED app frontend and backend should be set up correctly.

<br />

## Usage

### Running the Next.js frontend
```
npm run dev
# or
next dev
```
The frontend is now running on [http://localhost:3000](http://localhost:3000) (port 3000 by default)

### Running the Nest.js backend
```
npm start:dev
# or
nest start --watch
```
The backend is now running on [http://localhost:8787](http://localhost:8787) (port 8787 by default)

<br />

## License and Disclaimer

The files contained in this repository is the sole work of group W207_02. It is not copied or derived from any other work.

This repository is for educational and academic purposes only and intended for our own submission of the deliverables required by Assignment 1B and is not intended to be copied or used by any unauthorised party.

Group W207_02 take no responsibility of any breaches of academic integrity or plagiarism in regard to this repository.
