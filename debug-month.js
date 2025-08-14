// 월주 계산 디버깅
const HEAVENLY_STEMS = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
const EARTHLY_BRANCHES = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];

// 1998년 9월 4일의 경우
const year = 1998;
const month = 9;
const day = 4;

// 년주: 무인년
const yearStem = '무';
const yearStemIndex = HEAVENLY_STEMS.indexOf(yearStem); // 4

// 월지: 신월 (9월 4일은 백로 전이므로)
const monthBranch = '신';
const monthBranchIndex = EARTHLY_BRANCHES.indexOf(monthBranch); // 8

// 인월부터 신월까지의 차이
const inIndex = 2; // 인의 인덱스
const monthDiff = (monthBranchIndex - inIndex + 12) % 12; // (8 - 2) = 6

console.log('년간:', yearStem, '(index:', yearStemIndex + ')');
console.log('월지:', monthBranch, '(index:', monthBranchIndex + ')');
console.log('인월부터 차이:', monthDiff);

// 무년의 인월 천간: 갑 (index 0)
const inStemStart = 0;
console.log('무년의 인월 천간: 갑 (index:', inStemStart + ')');

// 월간 계산: (인월천간 + 월차이 * 2) % 10
const monthStemIndex = (inStemStart + monthDiff * 2) % 10;
console.log('월간 계산: (', inStemStart, '+', monthDiff * 2, ') % 10 =', monthStemIndex);

const monthStem = HEAVENLY_STEMS[monthStemIndex];
console.log('계산된 월간:', monthStem);
console.log('정답 월간: 경');

// 검증: 무인년의 각 월 천간
console.log('\n무인년 각 월의 천간:');
const months = ['인', '묘', '진', '사', '오', '미', '신', '유', '술', '해', '자', '축'];
months.forEach((m, i) => {
  const stemIdx = (0 + i * 2) % 10;
  console.log(`  ${m}월: ${HEAVENLY_STEMS[stemIdx]}`);
});