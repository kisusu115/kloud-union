const { getDistance, getMoveSeconds } = require('../services/distanceService');

const calculateDistance = async (req, res) => {
    const { startLongitude, startLatitude, endLongitude, endLatitude } = req.body;
    try {
        const calculatedDistance = await getDistance(startLongitude, startLatitude, endLongitude, endLatitude);

        res.json({ distance: calculatedDistance });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};

const calculateTime = async (req, res) => {
    const { startLongitude, startLatitude, endLongitude, endLatitude, speed } = req.body;
    try {
        const calculatedTime = await getMoveSeconds(startLongitude, startLatitude, endLongitude, endLatitude, speed);

        res.json({ moveTime: calculatedTime });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', message: error.message }); // 에러 메시지 포함
    }
};
  
module.exports = {
    calculateDistance,
    calculateTime,
};
