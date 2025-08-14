// 수정된 사주 계산 테스트
const { calculateSaju, testSaju } = require('./lib/corrected-saju-calculator.ts');

console.log('=== 사주팔자 계산 테스트 ===\n');

// 1. 기본 테스트 케이스
console.log('1. 1998년 9월 4일 19시 16분 테스트');
const result1 = calculateSaju(1998, 9, 4, 19, 16);
console.log(`년주: ${result1.year.stem}${result1.year.branch}`);
console.log(`월주: ${result1.month.stem}${result1.month.branch}`);
console.log(`일주: ${result1.day.stem}${result1.day.branch}`);
console.log(`시주: ${result1.time.stem}${result1.time.branch}`);
console.log(`예상: 무인년 경신월 갑인일 계유시`);
console.log('');

// 2. 추가 테스트 케이스
console.log('2. 2024년 1월 1일 0시 0분 테스트');
const result2 = calculateSaju(2024, 1, 1, 0, 0);
console.log(`년주: ${result2.year.stem}${result2.year.branch}`);
console.log(`월주: ${result2.month.stem}${result2.month.branch}`);
console.log(`일주: ${result2.day.stem}${result2.day.branch}`);
console.log(`시주: ${result2.time.stem}${result2.time.branch}`);
console.log('');

// 3. 입춘 전후 테스트
console.log('3. 입춘 전후 테스트');
console.log('2024년 2월 3일 (입춘 전):');
const result3 = calculateSaju(2024, 2, 3, 12, 0);
console.log(`년주: ${result3.year.stem}${result3.year.branch} (2023년으로 계산되어야 함)`);

console.log('2024년 2월 4일 (입춘 후):');
const result4 = calculateSaju(2024, 2, 4, 12, 0);
console.log(`년주: ${result4.year.stem}${result4.year.branch} (2024년으로 계산되어야 함)`);
console.log('');

// 4. 시간대별 테스트
console.log('4. 시간대별 시주 테스트 (2024년 1월 1일 기준)');
const hours = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 23];
hours.forEach(hour => {
  const result = calculateSaju(2024, 1, 1, hour, 0);
  console.log(`${hour.toString().padStart(2, '0')}시: ${result.time.stem}${result.time.branch}시 (${result.birth_info.time_period})`);
});

// 5. 종합 테스트 실행
console.log('\n=== 종합 테스트 실행 ===');
testSaju();