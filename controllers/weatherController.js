const { getWeatherForecast, getWeatherResponseList } = require('../services/weatherService');
const { convertToXY } = require("../utils/gridConverter");

const getHourlyPrecipitation = async (req, res) => {
    const { nx, ny } = req.query;

    if (!nx || !ny) {
        return res.status(400).json({ error: 'nx, ny 값이 필요합니다.' });
    }

    const currentDate = new Date();
    const baseDate = currentDate.toISOString().slice(0, 10).replace(/-/g, '');  // 오늘 날짜 (YYYYMMDD)
    const baseTime = '0500';  // 기준 시간 (05시)

    try {
        const precipitationList = await getWeatherForecast(baseDate, baseTime, nx, ny);

        res.json({ precipitationList });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};

const sendWeatherInfo = async (req, res) => {
    const { longitude, latitude } = req.query;

    if (!longitude || !latitude) {
        return res.status(400).json({ error: 'longitude, latitude 값이 필요합니다.' });
    }

    const currentDate = new Date();
    const nowDate = currentDate.toISOString().slice(0, 10).replace(/-/g, ''); // 오늘 날짜 (YYYYMMDD)
    const defaultTime = '0500'; // 기준 시간 (05시), 다른 걸로 주면 응답이 안옴

    // 현재 시각과 가장 가까운 정시 문자열 도출 EX)0800
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    hours = (minutes >= 30) ? (hours + 1) % 24 : hours;
    const timeString = `${hours.toString().padStart(2, '0')}00`;

    const gridValue = convertToXY(latitude, longitude);
    const gridX = gridValue['x'];
    const gridY = gridValue['y'];

    try {
        const weatherList = await getWeatherResponseList(nowDate, defaultTime, gridX, gridY);

        let skyStatus = null;
        const tmpList = {};
        const popList = {};

        weatherList.forEach((item) => {
            const { category, fcstTime, fcstValue, fcstDate } = item;

            if (nowDate === fcstDate) {
                if (category === 'TMP') {
                    tmpList[fcstTime] = parseFloat(fcstValue);
                } else if (category === 'POP') {
                    popList[fcstTime] = parseInt(fcstValue, 10);
                } else if (category === 'SKY' && skyStatus === null && fcstTime === timeString) {
                    // 맑음(1), 구름많음(3), 흐림(4)
                    skyStatus = parseInt(fcstValue, 10);
                }
            }
        });

        return res.status(200).json({
            skyStatus,
            tmpList,
            popList,
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Internal Server Error',
            message: error.message,
        });
    }
};


module.exports = {
    getHourlyPrecipitation,
    sendWeatherInfo,
};