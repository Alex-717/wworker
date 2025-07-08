importScripts('mathUtils.js');

onmessage = (e) => {
  console.log('SubWorker: Received message from main worker');
  try {
    // 子worker负责处理具体计算逻辑
    const result = self.mathUtils.double(e.data);
    if (isNaN(result)) {
      postMessage({ type: 'error', message: 'Invalid number received' });
    } else {
      postMessage({ type: 'result', data: result });
    }
  } catch (error) {
    postMessage({ type: 'error', message: `SubWorker error: ${error.message}` });
  }
};

onerror = (e) => {
  postMessage({ type: 'error', message: `SubWorker runtime error: ${e.message}` });
};