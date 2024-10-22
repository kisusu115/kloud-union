const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const getDistance = async (startX, startY, endX, endY) => {
    const url = process.env.DISTANCE_API_URL; // 환경 변수에서 API URL 가져오기

    // 요청 본문 생성
    const body = {
        startX: startX,
        startY: startY,
        endX: endX,
        endY: endY,
        angle: 20,
        speed: 30,
        endPoiId: "10001",
        reqCoordType: "WGS84GEO",
        startName: "home",
        endName: "station",
        searchOption: "10",
        resCoordType: "WGS84GEO",
        sort: "index"
    };

    try {
        const response = await axios.post(url, body, {
            headers: {
                'Content-Type': 'application/json',
                'appKey': process.env.DISTANCE_API_APPKEY
            },
        });

        // 응답 처리
        const { data } = response;
        const totalDistance = data.features[0].properties.totalDistance;

        // 필요한 데이터 반환
        return totalDistance;

    } catch (error) {
        console.error('Error fetching distance:', error.message);
        throw new Error('Error fetching distance');
    }
};

const getMoveSeconds = async (startX, startY, endX, endY, speed) => {
    const url = process.env.DISTANCE_API_URL;

    // 요청 본문 생성
    const body = {
        startX: startX,
        startY: startY,
        endX: endX,
        endY: endY,
        angle: 20,
        speed: 30,
        endPoiId: "10001",
        reqCoordType: "WGS84GEO",
        startName: "home",
        endName: "station",
        searchOption: "10",
        resCoordType: "WGS84GEO",
        sort: "index"
    };

    try {
        const response = await axios.post(url, body, {
            headers: {
                'Content-Type': 'application/json', // 요청 헤더 설정
                'appKey': process.env.DISTANCE_API_APPKEY
            },
        });

        // 응답 처리
        const { data } = response;
        let totalSeconds = data.features[0].properties.totalTime;
        if (speed > 0) totalSeconds = Math.floor(totalSeconds * 30 / speed);

        // 필요한 데이터 반환
        return totalSeconds;

    } catch (error) {
        console.error('Error fetching distance:', error.message);
        throw new Error('Error fetching distance');
    }
};

module.exports = {
    getDistance,
    getMoveSeconds,
};
