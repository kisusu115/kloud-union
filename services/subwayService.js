const Station = require('../models/stationModel'); // 경로는 실제 모델 위치에 맞게 수정하세요

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

module.exports = {
    getLinesByStationName,
};