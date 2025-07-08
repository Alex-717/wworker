// 通过importScripts引入其他功能模块，挂载到self上
importScripts('mathUtils.js');

// worker中也可以创建新的worker subWorker
const subWorker = new Worker('subworker.js');

onmessage = e => {
  try {
    console.log("Worker: Message received from main script");
    let [a, b] = e.data;
    a = +a
    b = +b
    const product = self.mathUtils.multiply(a, b);
    if (isNaN(product)) {
      postMessage({ type: 'error', message: "Please enter valid numbers" });
      return;
    }
    subWorker.postMessage(product);
  } catch (error) {
    postMessage({ type: 'error', message: `Worker error: ${error.message}` });
  }
}

// 监听worker内部错误
onerror = (e) => {
  console.log('Worker error 本身:', e);
};

subWorker.onmessage = (e) => {
  if (e.data.type === 'result') {
    postMessage({ type: 'result', data: `Final Result: ${e.data.data}` });
  } else if (e.data.type === 'error') {
    postMessage({ type: 'error', message: e.data.message });
  }
};

subWorker.onerror = (e) => {
  postMessage({ type: 'error', message: `SubWorker error: ${e.message}` });
};

