const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const getWeatherForecast = async (baseDate, baseTime, nx, ny) => {
    const url = process.env.WEATHER_FORECAST_API_URL;

    const params = {
        serviceKey: process.env.WEATHER_FORECAST_API_KEY,  // API 키
        pageNo: 1,
        numOfRows: 10,
        dataType: 'JSON',
        base_date: baseDate,  // YYYYMMDD 형식의 날짜
        base_time: baseTime,  // HHMM 형식의 시간
        nx: nx,  // X 좌표, gridX 형태
        ny: ny   // Y 좌표, gridY 형태
    };

    try {
        const response = await axios.get(url, { params });
        const items = response.data.response.body.items.item;

        // 강수량 추출 (RN1: 1시간 강수량)
        const precipitation = items.find(item => item.category === 'RN1').fcstValue;

        return precipitation || 'No precipitation data';

    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        throw new Error('Error fetching weather data');
    }
};

module.exports = {
    getWeatherForecast
};