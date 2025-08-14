// 1999년 1월 3일 테스트
const { calculateSaju } = require('./lib/manseryeok-saju.ts');

console.log('=== 1999년 1월 3일 오전 8시 20분 사주 계산 테스트 ===\n');

const result = calculateSaju(1999, 1, 3, 8, 20);

console.log('계산 결과:');
console.log(`년주: ${result.year.stem}${result.year.branch}`);
console.log(`월주: ${result.month.stem}${result.month.branch}`);
console.log(`일주: ${result.day.stem}${result.day.branch}`);
console.log(`시주: ${result.time.stem}${result.time.branch}`);
console.log('');

const actual = `${result.year.stem}${result.year.branch}년 ${result.month.stem}${result.month.branch}월 ${result.day.stem}${result.day.branch}일 ${result.time.stem}${result.time.branch}시`;
const expected = '무인년 갑자월 을묘일 경진시';

console.log(`예상값: ${expected}`);
console.log(`실제값: ${actual}`);
console.log(`결과: ${actual === expected ? '✅ 성공!' : '❌ 실패'}`);

// 상세 정보
console.log('\n상세 정보:');
console.log(`년주: ${result.year.stem}${result.year.branch} (${result.year.element_stem} ${result.year.yin_yang_stem})`);
console.log(`월주: ${result.month.stem}${result.month.branch} (${result.month.element_stem} ${result.month.yin_yang_stem})`);
console.log(`일주: ${result.day.stem}${result.day.branch} (${result.day.element_stem} ${result.day.yin_yang_stem})`);
console.log(`시주: ${result.time.stem}${result.time.branch} (${result.time.element_stem} ${result.time.yin_yang_stem})`);
console.log(`일간: ${result.day_master}`);
console.log(`시간대: ${result.birth_info.time_period}`);