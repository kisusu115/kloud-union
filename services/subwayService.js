const axios = require('axios');
const Station = require('../models/stationModel');
const dotenv = require('dotenv');
dotenv.config();

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
    return station.number; // 역 코드 반환 EX) 마들 -> 2714
};

const getTimeTable = async (stationCode, upDown) => {
    // 하단 url의 1도 사실 설정 값이고, 평일/토요일/일요일(휴일) 따라 1,2,3으로 조정
    const url = process.env.TIME_TABLE_API_URL + `/${stationCode}/1/${upDown}`; 
    
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

// 실시간 도착 정보를 가져오기
const getRealTimeArrivals = async (stationName) => {
  const apiUrl = process.env.REAL_TIME_API_URL + `/${stationName}`;
  const response = await axios.get(apiUrl);
  return response.data.realtimeArrivalList; // realtimeArrivalList 반환
};


// 도착 정보에서 first와 second 값 추출
const extractFirstAndSecondTime = (arrivalList, line, upDown) => {
  const filteredArrivals = arrivalList
      .filter(item => {
          const isLineMatch = parseInt(item.subwayId) - 1000 === line;
          const isUpDownMatch = (upDown === 1 && (item.updnLine === "상행" || item.updnLine === "내선")) ||
                                (upDown === 2 && (item.updnLine === "하행" || item.updnLine === "외선"));
          return isLineMatch && isUpDownMatch;
      })
      .map(item => parseInt(item.barvlDt))
      .sort((a, b) => a - b); // 오름차순 정렬
  
  if (filteredArrivals.length === 0) {
      throw new Error('해당 조건에 맞는 도착 정보가 없습니다.');
  } else if (filteredArrivals.length === 1) {
      return { first: filteredArrivals[0] }; // 첫 번째만 반환
  } else {
      return { first: filteredArrivals[0], second: filteredArrivals[1] }; // 둘 다 반환
  }
};

// getRealTimeArrivals에서 응답 리스트 반환 후 first와 second 시간 추출
const get2RealTimes = async (stationName, line, upDown) => {
  const arrivalList = await getRealTimeArrivals(stationName); // 실시간 도착 정보를 가져옴
  return extractFirstAndSecondTime(arrivalList, line, upDown); // 도착 시간을 처리하여 first와 second 반환
};

// 지하철 역 이름과 노선 번호로 좌표를 조회하는 서비스 함수
const getStationCoordinates = async (stationName, line) => {
  try {
      const station = await Station.findOne({ name: stationName, line });

      if (!station) {
          return null; // 역을 찾지 못하면 null 반환
      }

      // 위도와 경도를 반환
      return {
          latitude: station.latitude,
          longitude: station.longitude,
      };
  } catch (error) {
      throw new Error('Error fetching station coordinates');
  }
};


module.exports = {
    getLinesByStationName,
    getStationCode,
    getTimeTable,
    get2RealTimes,
    getStationCoordinates
};