const { getLinesByStationName, getStationCode, getTimeTable, get2RealTimes, getStationCoordinates } = require('../services/subwayService');

// 지하철 역 선택 조회
const getStationChoices = async (req, res) => {
    const { stationName } = req.query; // 쿼리에서 stationName 값을 가져옵니다.

    if (!stationName) {
        return res.status(400).json({ error: 'stationName is required' });
    }

    try {
        // 서비스에서 line 값을 가져옵니다.
        const lines = await getLinesByStationName(stationName);

        if (lines.length === 0) {
            return res.status(404).json({ error: 'No lines found for the given station name' });
        }

        // 각 line에 대해 upDown 값을 1과 2로 설정하여 결과 배열 생성
        const results = [];
        lines.forEach(line => {
            results.push(
                { stationName, line, upDown: 1 },
                { stationName, line, upDown: 2 }
            );
        });

        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// 지하철 역명, 라인, 상하행 정보를 받아 시간표 리스트 클라이언트에게 전달
const getStationTimeTable = async (req, res) => {
    const { stationName, line, upDown } = req.body;

    try {
        const stationCode = await getStationCode(stationName, line); // 역 코드 조회
        const timeTable = await getTimeTable(stationCode, upDown); // 시간표 조회 및 정렬

        res.json(timeTable); // 시간표 반환
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 시간표 리스트에서 클라이언트가 지정한 시각 직전의 시각 찾아서 반환
const getProperTime = async (req, res) => {
    const { stationName, line, upDown, timeToLeave } = req.body;
  
    try {
        const stationCode = await getStationCode(stationName, line); // 역 코드 조회
        const timeTable = await getTimeTable(stationCode, upDown); // 시간표 조회 및 정렬
  
        const selectedTime = findLatestTimeBeforeLeave(timeTable, timeToLeave); // 시간표에서 적절한 시간 반환
  
        res.json({ properTime: selectedTime });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// timeTable에서 timeToLeave보다 앞서면서 가장 늦은 시간을 찾는 함수
// 적절한 값이 없으면 null 뱉음
const findLatestTimeBeforeLeave = (timeTable, timeToLeave) => {
    const targetTime = new Date(`1970-01-01T${timeToLeave}Z`);
  
    let selectedTime = null;
    for (let time of timeTable) {
        const currentTime = new Date(`1970-01-01T${time}Z`);
  
        selectedTime = (currentTime < targetTime) ? time : selectedTime;
        if (currentTime >= targetTime) break;
    }
  
    return selectedTime;
};

const getRealTimes = async (req, res) => {
    const { stationName, line, upDown } = req.body;

    try {
        const realTimes = await get2RealTimes(stationName, line, upDown); // Service에서 처리된 데이터를 받음
        res.json(realTimes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCoordinate = async (req, res) => {
    const { stationName, line } = req.body;

    if (!stationName || !line) {
        return res.status(400).json({ error: 'stationName and line are required' });
    }

    try {
        const coordinates = await getStationCoordinates(stationName, line);

        if (!coordinates) {
            return res.status(404).json({ error: 'Station not found' });
        }
        res.status(200).json(coordinates);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}


module.exports = {
    getStationChoices,
    getStationTimeTable,
    getProperTime,
    getRealTimes,
    getCoordinate,
};
