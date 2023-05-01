const { isMainThread, workerData } = require('worker_threads');
const program = require('commander');
const { mainThread, workerThread } = require('./src/infrastructure/thread');
const MEME_URL = 'https://icanhas.cheezburger.com/';

if (isMainThread) {
  
  program
  .requiredOption('-t, --threads <number>', 'Number of threads to use', parseInt)
  .requiredOption('-a, --amount <number>', 'Number of images to download', parseInt)
  .parse();
  
  const { threads, amount } = program.opts();
  
  mainThread(MEME_URL, threads, amount)
} else {
  workerThread(workerData)
}