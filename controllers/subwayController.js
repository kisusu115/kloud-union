const { getLinesByStationName, getStationCode, getTimeTable } = require('../services/subwayService');

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

module.exports = {
    getStationChoices,
    getStationTimeTable,
};
