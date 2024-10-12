const axios = require('axios');
const Station = require('../models/stationModel');

// 주어진 stationName에 대해 line 값을 조회
const getLinesByStationName = async (stationName) => {
    try {
        const stations = await Station.find({ name: stationName });

        // stationName과 일치하는 모든 line을 Set으로 저장하여 중복 제거
        const lines = new Set(stations.map(station => station.line));

        return Array.from(lines); // Set을 Array로 변환하여 반환
    } catch (error) {
        throw new Error('Error fetching lines by station name');
    }
};

const getStationCode = async (stationName, line) => {
    const station = await Station.findOne({ name: stationName, line: line });
    if (!station) throw new Error('Station not found');
    return station.number; // 역 코드 반환
};

const getTimeTable = async (stationCode, upDown) => {
    const url = `http://openAPI.seoul.go.kr:8088/534e51786a6b696b3634414c55584b/json/SearchSTNTimeTableByIDService/1/300/${stationCode}/1/${upDown}`;
    
    try {
      const response = await axios.get(url);
      const timeTable = response.data.SearchSTNTimeTableByIDService.row;

      // ARRIVETIME 기준으로 정렬
      timeTable.sort((a, b) => {
        const timeA = new Date(`1970-01-01T${a.ARRIVETIME}`);
        const timeB = new Date(`1970-01-01T${b.ARRIVETIME}`);
        return timeA - timeB;
      });

      // ARRIVETIME 값 중 "00:00:00"을 제외한 리스트 반환
      const arrivalTimes = timeTable
        .map(train => train.ARRIVETIME)
        .filter(time => time !== "00:00:00");

      return arrivalTimes;
    } catch (error) {
      throw new Error('Error fetching timetable');
    }
};

module.exports = {
    getLinesByStationName,
    getStationCode,
    getTimeTable
};