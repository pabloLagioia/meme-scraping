# Meme scraping

This is a NodeJS program that downloads images from https://icanhas.cheezburger.com/ and stores them locally.

Some considerations:
- Only downloads images that are memes
- Does not download sponsored content.
- The program can be run on multiple threads to paralelize the download of images. Images per thread depends on amount, check [thread.test.js](./src/infrastructure/thread.test.js) to get an idea on how it works.
- The program expects a command line argument called threads that is a number between 1 and 5 to parallelize the download of pictures. Check out [argument-validation.test.js](./src/infrastructure/validation/argument-validation.test.js) to get an idea on how validation works
- The program expects a command line argument called amount that determines how many images should be downloaded. Check out [argument-validation.test.js](./src/infrastructure/validation/argument-validation.test.js) to get an idea on how validation works

# How to run
This piece of software was written with NodeJS so it requires NodeJS and npm.

## Download dependencies

`npm install`

## Run

`npm start -- --threads 3 --amount 10`

or 

`npm start -- -t 3 -a 10`

-t is a flag for number of threads
-a is a flag for amount of pictures to download

## Test

`npm run tests`
