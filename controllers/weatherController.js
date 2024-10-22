const { getWeatherForecast } = require('../services/weatherService');

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

module.exports = {
    getHourlyPrecipitation
};