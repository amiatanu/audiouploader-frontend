## client

cd ./client
npm i
npm start

## server

cd ./server
npm i
npm start

## Introduction

Audio File Upload and Management Website
This project is a web application that allows users to upload audio files, save them to a database, and view the list of uploaded files.

## Technologies Used

React
Node.js
Express.js
MongoDB (Assuming you're using MongoDB as the database)
HTML/CSS

## Prerequisites

Node.js (Make sure it's installed on your system)
MongoDB (Make sure it's installed and running)

## Installation

Clone the repository: git clone <repository_url>
Navigate to the client directory: cd ./client
Install client dependencies: npm install
Start the client: npm start
Open another terminal window/tab
Navigate to the server directory: cd ./server
Install server dependencies: npm install
Start the server: npm start

## Usage

Access the application by opening a web browser and navigating to http://localhost:3000 (assuming the React app is running on port 3000).
On the website, users can upload an audio file using the provided form.
After uploading, clicking the submit button will save the file to the database.
The list of uploaded audio files will be displayed at the bottom of the page.

## Configuration

Server configuration can be found in the ./server/config directory.
MongoDB connection string should be specified in the server configuration.

## limitation/restriction

## after selecting one file select another file then click upload button

## It does not show any alert if the duration of file>10mins
