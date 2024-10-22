function convertSeconds(seconds) {
  const hours = Math.floor(seconds / 3600); // 1시간 = 3600초
  const minutes = Math.floor((seconds % 3600) / 60); // 나머지를 분으로 변환
  const remainingSeconds = seconds % 60; // 남은 초

  let result = '';

  if (hours > 0) {
    result += `${hours}시간 `;
  }

  if (minutes > 0 || hours > 0) { // 시간 또는 분이 0이 아닐 때만 분 출력
    result += `${minutes}분 `;
  }

  // 시간과 분이 모두 없을 때는 0초 출력
  if (result === '' && remainingSeconds === 0) {
    return '0초';
  }

  // 0초가 아닐 경우에만 초 출력
  if (remainingSeconds > 0) {
    result += `${remainingSeconds}초`;
  }

  return result.trim(); // 앞뒤 공백 제거
}