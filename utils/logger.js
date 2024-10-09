const fs = require('fs');
const path = require('path');

// 로그 파일 경로 설정
const logFilePath = path.join(__dirname, '../logs/app.log');

// 로그 메시지를 파일에 기록하는 함수
const logToFile = (message) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Failed to write log to file:', err);
    }
  });
};

// 일반 로그
const log = (message) => {
  console.log(message);
  logToFile(message);
};

// 에러 로그
const error = (message) => {
  console.error(message);
  logToFile(`ERROR: ${message}`);
};

// 경고 로그
const warn = (message) => {
  console.warn(message);
  logToFile(`WARN: ${message}`);
};

module.exports = {
  log,
  error,
  warn,
};
