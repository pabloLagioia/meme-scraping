const { validateThreads, validateAmount } = require('./validation')
const { getMemeUrlsFromUrl } = require('../memes')
const { arrayOf } = require('../utils')
const { Worker } = require('worker_threads');
const { downloadFromUrl } = require('./download');

const getDownloadsPerThread = (threads, amount) => {
  
  const amountPerThread = amount / threads

  if (amount % threads === 0) {
    return arrayOf(threads, Math.floor(amountPerThread))
  }

  if (amountPerThread < 1) {
    if (amount > 1) {
      return arrayOf(amount, 1)
    }
    return [amount]
  }

  const allThreadsButLast = Math.floor(amountPerThread)
  const lastThread = amount - allThreadsButLast * (threads -1)

  const allThreads = arrayOf(threads, allThreadsButLast)

  allThreads[allThreads.length - 1] = lastThread

  return allThreads

}

const splitUrls = (downloadsPerThread, downloadUrls) => {
  const result = [];

  let urlsIndex = 0;

  for (let i = 0; i < downloadsPerThread.length; i++) {
    const urlsForThread = [];

    for (let j = 0; j < downloadsPerThread[i]; j++) {
      urlsForThread.push(downloadUrls[urlsIndex]);
      urlsIndex++;
    }

    result.push(urlsForThread);
  }

  return result;
}

const mainThread = async (url, threads, amount) => {
  
  validateThreads(threads)
  validateAmount(amount)

  const downloadUrls = await getMemeUrlsFromUrl(url)
  const downloadsPerThread = getDownloadsPerThread(threads, amount)
  const downloadUrlsPerThread = splitUrls(downloadsPerThread, downloadUrls)

  console.log('Downloading', downloadUrls)

  return Promise.all(downloadUrlsPerThread.map((downloadUrls, index) => new Promise((resolve, reject) => {
    
    console.log('Thread worker', index, 'will download', downloadUrls)

    const worker = new Worker('./main.js', {
      workerData: {
        downloadUrls
      }
    });

    worker.on('message', resolve);
    
    worker.on('error', reject);
    
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });

  })))

}

const workerThread = ({ downloadUrls }) => Promise.all(downloadUrls.map(url => downloadFromUrl(url)))

module.exports = {
  mainThread,
  workerThread,
  getDownloadsPerThread
}