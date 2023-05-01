#Meme scraping

Write a NodeJS program that downloads images from https://icanhas.cheezburger.com/ and stores them locally.
Pay attention to the following considerations:
- Only download images that are memes
- Do not download sponsored content.
- Enable the program to run on multiple threads. 
- The program expects a command line argument called threads that is a number between 1 and 5, parallelize the process while continuing to support the amount flag.
- The program expects a command line argument called amount that determines how many images should be downloaded.