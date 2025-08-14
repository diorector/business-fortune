// 알고리즘 디버깅 - 각 함수별 테스트
const { calculateSaju } = require('./lib/manseryeok-saju.ts');

console.log('=== 만세력 알고리즘 전체 검증 ===\n');

// 여러 날짜 테스트
const testDates = [
  { year: 1999, month: 1, day: 3, hour: 8, minute: 20, 
    expected: '무인년 갑자월 을묘일 경진시' },
  { year: 1998, month: 9, day: 4, hour: 19, minute: 16,
    expected: '무인년 경신월 갑인일 계유시' },
  { year: 2000, month: 1, day: 1, hour: 0, minute: 0,
    expected: '기묘년 병자월 무술일 임자시' },
  { year: 2024, month: 1, day: 1, hour: 12, minute: 0,
    expected: '계묘년 갑자월 계축일 무오시' }
];

testDates.forEach(test => {
  console.log(`\n테스트: ${test.year}년 ${test.month}월 ${test.day}일 ${test.hour}시 ${test.minute}분`);
  
  const result = calculateSaju(test.year, test.month, test.day, test.hour, test.minute);
  const actual = `${result.year.stem}${result.year.branch}년 ${result.month.stem}${result.month.branch}월 ${result.day.stem}${result.day.branch}일 ${result.time.stem}${result.time.branch}시`;
  
  console.log(`  계산: ${actual}`);
  console.log(`  정답: ${test.expected}`);
  console.log(`  결과: ${actual === test.expected ? '✅' : '❌'}`);
  
  if (actual !== test.expected) {
    // 어느 부분이 틀렸는지 상세 분석
    const expectedParts = test.expected.split(' ');
    const actualParts = actual.split(' ');
    
    if (expectedParts[0] !== actualParts[0]) {
      console.log(`  ❌ 년주 오류: ${actualParts[0]} (정답: ${expectedParts[0]})`);
    }
    if (expectedParts[1] !== actualParts[1]) {
      console.log(`  ❌ 월주 오류: ${actualParts[1]} (정답: ${expectedParts[1]})`);
    }
    if (expectedParts[2] !== actualParts[2]) {
      console.log(`  ❌ 일주 오류: ${actualParts[2]} (정답: ${expectedParts[2]})`);
    }
    if (expectedParts[3] !== actualParts[3]) {
      console.log(`  ❌ 시주 오류: ${actualParts[3]} (정답: ${expectedParts[3]})`);
    }
  }
});

// 월주 계산 로직 상세 테스트
console.log('\n\n=== 월주 계산 로직 상세 테스트 ===');
console.log('1999년 1월 3일의 경우:');
console.log('  - 입춘 전이므로 년주는 1998년(무인년)으로 계산');
console.log('  - 소한(1월 6일) 전이므로 자월');
console.log('  - 무인년의 자월 = 갑자월');

// 일주 계산 검증
console.log('\n=== 일주 계산 기준일 검증 ===');
console.log('기준일 검증이 필요합니다.');
console.log('1999년 1월 3일이 을묘일이 맞는지 확인 필요');