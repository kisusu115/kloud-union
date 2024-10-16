const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
const Station = require('./models/stationModel');
const dotenv = require('dotenv');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const uploadCSV = (filePath) => {
  const stations = [];

  // Ensure proper encoding for Korean characters
  fs.createReadStream(filePath)
    .pipe(csv({
      headers: ['line', 'number', 'name', 'latitude', 'longitude'],
      skipEmptyLines: true,
      encoding: 'utf-8'  // Adjust encoding as needed
    }))
    .on('data', (row) => {
      // Convert and validate fields
      const parsedLine = Number(row.line);
      const parsedLatitude = Number(row.latitude);
      const parsedLongitude = Number(row.longitude);

      // Ensure 'number' is stored as a string and padded with 0 if it's 3 digits
      const stationNumber = row.number.length === 3 ? `0${row.number}` : row.number;

      // Validate if line, latitude, and longitude are valid numbers
      if (!isNaN(parsedLine) && !isNaN(parsedLatitude) && !isNaN(parsedLongitude)) {
        const station = {
          line: parsedLine,
          number: stationNumber,  // Save as string
          name: row.name,  // Handle Korean characters properly
          latitude: parsedLatitude,
          longitude: parsedLongitude,
        };
        stations.push(station);
      } else {
        console.error(`Invalid data in row: ${JSON.stringify(row)}`);
      }
    })
    .on('end', () => {
      if (stations.length > 0) {
        // Insert data into MongoDB
        Station.insertMany(stations)
          .then(() => {
            console.log('Data successfully uploaded!');
            mongoose.connection.close();
          })
          .catch((error) => {
            console.error('Error uploading data: ', error);
          });
      } else {
        console.error('No valid data to upload.');
        mongoose.connection.close();
      }
    });
};

// Call the function with the CSV file path
try {
  if (!process.env.S3_STATION_CSV) {
    throw new Error('S3_STATION_CSV 환경 변수가 정의되지 않았습니다. .env 파일을 확인해 주세요.');
  }
  
  // 환경 변수에서 가져온 S3 저장소 경로로 파일을 처리
  uploadCSV(process.env.S3_STATION_CSV);

} catch (error) {
  console.error('환경 변수에서 파일 경로를 가져오지 못했습니다. 로컬 파일을 사용합니다.', error.message);

  // 오류 발생 시 로컬 파일로 대체
  uploadCSV('./station.csv');
}
