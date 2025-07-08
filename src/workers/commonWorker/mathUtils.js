// 数学工具函数库
function multiply(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Invalid number parameters');
  }
  return a * b;
}

function double(num) {
  if (typeof num !== 'number') {
    throw new Error('Invalid number parameter');
  }
  return num * 2;
}

// 导出全局函数供Worker使用
self.mathUtils = {
  multiply,
  double
};