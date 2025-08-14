// 정확한 월간 계산 규칙
const HEAVENLY_STEMS = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];

// 오포국 법칙 (년간으로 월간 시작점 결정)
// 갑기년: 병인월부터 시작
// 을경년: 무인월부터 시작  
// 병신년: 경인월부터 시작
// 정임년: 임인월부터 시작
// 무계년: 갑인월부터 시작

console.log('=== 무인년(1998년)의 올바른 월간 ===');
console.log('무년은 무계년 규칙 적용: 갑인월부터 시작\n');

// 무인년의 월별 천간지지
const monthData = [
  { branch: '인', stem: '갑', month: '2월(입춘 후)' },
  { branch: '묘', stem: '을', month: '3월' },
  { branch: '진', stem: '병', month: '4월' },
  { branch: '사', stem: '정', month: '5월' },
  { branch: '오', stem: '무', month: '6월' },
  { branch: '미', stem: '기', month: '7월' },
  { branch: '신', stem: '경', month: '8월' },  // 경신월!
  { branch: '유', stem: '신', month: '9월(백로 후)' },
  { branch: '술', stem: '임', month: '10월' },
  { branch: '해', stem: '계', month: '11월' },
  { branch: '자', stem: '갑', month: '12월' },
  { branch: '축', stem: '을', month: '1월' }
];

monthData.forEach(m => {
  console.log(`${m.stem}${m.branch}월 - ${m.month}`);
});

console.log('\n9월 4일은 백로(9월 8일) 이전이므로 신월');
console.log('따라서 무인년 경신월이 정답!');