// 문제 분석 - 현재 알고리즘이 뭘 계산하고 있는지 확인
const HEAVENLY_STEMS = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
const EARTHLY_BRANCHES = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];

console.log('=== 1999년 1월 3일 8시 20분 계산 분석 ===\n');

// 1. 년주 계산
console.log('1. 년주 계산:');
let year = 1999;
let month = 1;
let day = 3;

// 입춘 체크
if (month === 1 || (month === 2 && day < 4)) {
  year = year - 1;  // 1998년
}
console.log(`  입춘 전이므로: ${year}년으로 계산`);

// 1984년 = 갑자년 기준
const baseYear = 1984;
const diff = year - baseYear;  // 1998 - 1984 = 14
console.log(`  ${year} - ${baseYear} = ${diff}`);

const yearStemIndex = ((diff % 10) + 10) % 10;  // 14 % 10 = 4 (무)
const yearBranchIndex = ((diff % 12) + 12) % 12;  // 14 % 12 = 2 (인)
console.log(`  천간: ${HEAVENLY_STEMS[yearStemIndex]} (index ${yearStemIndex})`);
console.log(`  지지: ${EARTHLY_BRANCHES[yearBranchIndex]} (index ${yearBranchIndex})`);
console.log(`  년주: ${HEAVENLY_STEMS[yearStemIndex]}${EARTHLY_BRANCHES[yearBranchIndex]}`);

// 2. 월주 계산
console.log('\n2. 월주 계산:');
console.log(`  1월 3일은 소한(1월 6일) 전이므로...`);

// 현재 코드의 월지 결정 로직
let monthBranch = '자';
if (month === 1 && day < 6) {
  monthBranch = '자';
  console.log(`  월지: ${monthBranch} (자월)`);
} else {
  console.log('  다른 로직 적용');
}

// 월간 계산
const yearStem = HEAVENLY_STEMS[yearStemIndex];  // 무
console.log(`  년간: ${yearStem}`);

// 무년의 인월 시작 천간 = 갑 (index 0)
const monthStemStartForIn = [2, 4, 6, 8, 0, 2, 4, 6, 8, 0];
const inStemStart = monthStemStartForIn[yearStemIndex];  // 0 (갑)
console.log(`  무년의 인월 천간: ${HEAVENLY_STEMS[inStemStart]}`);

// 자월은 인월에서 10개월 후
const monthBranchIdx = EARTHLY_BRANCHES.indexOf(monthBranch);  // 0 (자)
const inIndex = 2;  // 인의 인덱스
let monthDiff = (monthBranchIdx - inIndex + 12) % 12;  // (0 - 2 + 12) = 10
console.log(`  인월부터 자월까지 차이: ${monthDiff}`);

const monthStemIdx = (inStemStart + monthDiff) % 10;  // (0 + 10) % 10 = 0
console.log(`  월간 계산: (${inStemStart} + ${monthDiff}) % 10 = ${monthStemIdx}`);
console.log(`  월간: ${HEAVENLY_STEMS[monthStemIdx]}`);
console.log(`  월주: ${HEAVENLY_STEMS[monthStemIdx]}${monthBranch}`);

// 3. 실제 정답과 비교
console.log('\n=== 정답과 비교 ===');
console.log('계산: 무인년 갑자월');
console.log('정답: 무인년 갑자월 ✅');
console.log('\n그런데 웹사이트에서는 갑인월로 나온다?');
console.log('이것은 월지 결정 로직에 문제가 있을 가능성이 높음');

// 4. 일주 계산 검증
console.log('\n=== 일주 계산 ===');
const a = Math.floor((14 - 1) / 12);  // 1
const y = 1999 + 4800 - a;  // 6798
const m = 1 + 12 * a - 3;  // 10

const jdn = 3 + Math.floor((153 * m + 2) / 5) + 365 * y + 
            Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
console.log(`  JDN: ${jdn}`);

const baseJDN = 2451551;  // 2000년 1월 7일 = 갑자일
const diffDays = jdn - baseJDN;
console.log(`  기준일과 차이: ${diffDays}일`);

const dayStemIndex = ((diffDays % 10) + 10) % 10;
const dayBranchIndex = ((diffDays % 12) + 12) % 12;
console.log(`  일간: ${HEAVENLY_STEMS[dayStemIndex]}`);
console.log(`  일지: ${EARTHLY_BRANCHES[dayBranchIndex]}`);
console.log(`  일주: ${HEAVENLY_STEMS[dayStemIndex]}${EARTHLY_BRANCHES[dayBranchIndex]}`);
console.log(`  정답: 을묘일`);