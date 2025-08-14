// 정확한 만세력 사주팔자 계산 (완전 수정본)

// 천간 (天干) - 10개
export const HEAVENLY_STEMS = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'] as const;

// 지지 (地支) - 12개  
export const EARTHLY_BRANCHES = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'] as const;

// 천간의 오행과 음양
export const STEM_PROPERTIES = {
  '갑': { element: '목', yin_yang: '양' },
  '을': { element: '목', yin_yang: '음' },
  '병': { element: '화', yin_yang: '양' },
  '정': { element: '화', yin_yang: '음' },
  '무': { element: '토', yin_yang: '양' },
  '기': { element: '토', yin_yang: '음' },
  '경': { element: '금', yin_yang: '양' },
  '신': { element: '금', yin_yang: '음' },
  '임': { element: '수', yin_yang: '양' },
  '계': { element: '수', yin_yang: '음' }
} as const;

// 지지의 오행과 음양
export const BRANCH_PROPERTIES = {
  '자': { element: '수', yin_yang: '양', animal: '쥐' },
  '축': { element: '토', yin_yang: '음', animal: '소' },
  '인': { element: '목', yin_yang: '양', animal: '호랑이' },
  '묘': { element: '목', yin_yang: '음', animal: '토끼' },
  '진': { element: '토', yin_yang: '양', animal: '용' },
  '사': { element: '화', yin_yang: '음', animal: '뱀' },
  '오': { element: '화', yin_yang: '양', animal: '말' },
  '미': { element: '토', yin_yang: '음', animal: '양' },
  '신': { element: '금', yin_yang: '양', animal: '원숭이' },
  '유': { element: '금', yin_yang: '음', animal: '닭' },
  '술': { element: '토', yin_yang: '양', animal: '개' },
  '해': { element: '수', yin_yang: '음', animal: '돼지' }
} as const;

// 사주 기둥 인터페이스
export interface SajuPillar {
  stem: string;
  branch: string;
  element_stem: string;
  element_branch: string;
  yin_yang_stem: string;
  yin_yang_branch: string;
}

export interface SajuChart {
  year: SajuPillar;
  month: SajuPillar;
  day: SajuPillar;
  time: SajuPillar;
  day_master: string;
  birth_info: {
    solar_date: Date;
    lunar_date?: string;
    time_period: string;
  };
}

// 업종 정보
export interface BusinessType {
  id: string;
  name: string;
  icon: string;
}

export const businessTypes: BusinessType[] = [
  { id: 'restaurant', name: '음식점', icon: '🍜' },
  { id: 'cafe', name: '카페', icon: '☕' },
  { id: 'convenience', name: '편의점', icon: '🏪' },
  { id: 'beauty', name: '미용실', icon: '💇' },
  { id: 'mart', name: '마트', icon: '🛒' },
  { id: 'clothing', name: '의류점', icon: '👕' },
  { id: 'pharmacy', name: '약국', icon: '💊' },
  { id: 'bookstore', name: '서점', icon: '📚' },
];

// 오행 (五行)
export const FIVE_ELEMENTS = ['목', '화', '토', '금', '수'] as const;

// 십성 (十星)
export const TEN_GODS = [
  '비견', '겁재', '식신', '상관', '편재', '정재', '편관', '정관', '편인', '정인'
] as const;

// 년주 계산 (입춘 기준)
function getYearStemBranch(year: number, month: number, day: number): { stem: string; branch: string } {
  // 입춘 이전이면 전년도로 계산
  let adjustedYear = year;
  if (month === 1 || (month === 2 && day < 4)) {
    adjustedYear--;
  }
  
  // 1984년 = 갑자년 기준
  const baseYear = 1984;
  const diff = adjustedYear - baseYear;
  
  let stemIndex = diff % 10;
  let branchIndex = diff % 12;
  
  // 음수 처리
  if (stemIndex < 0) stemIndex += 10;
  if (branchIndex < 0) branchIndex += 12;
  
  return {
    stem: HEAVENLY_STEMS[stemIndex],
    branch: EARTHLY_BRANCHES[branchIndex]
  };
}

// 월주 계산 (절기 기준) - 완전 수정
function getMonthStemBranch(year: number, month: number, day: number): { stem: string; branch: string } {
  // 24절기 기준 월지 결정
  // 중요: 절입일 이후부터 다음 지지로 넘어감
  let monthBranch = '자';
  
  // 절기별 월지 매핑 (정확한 날짜)
  if (month === 1) {
    if (day >= 6) monthBranch = '축';  // 소한(1/6) 이후 축월
    else monthBranch = '자';           // 소한 이전 자월
  } else if (month === 2) {
    if (day >= 4) monthBranch = '인';  // 입춘(2/4) 이후 인월
    else monthBranch = '축';           // 입춘 이전 축월
  } else if (month === 3) {
    if (day >= 6) monthBranch = '묘';  // 경칩(3/6) 이후 묘월
    else monthBranch = '인';           // 경칩 이전 인월
  } else if (month === 4) {
    if (day >= 5) monthBranch = '진';  // 청명(4/5) 이후 진월
    else monthBranch = '묘';           // 청명 이전 묘월
  } else if (month === 5) {
    if (day >= 6) monthBranch = '사';  // 입하(5/6) 이후 사월
    else monthBranch = '진';           // 입하 이전 진월
  } else if (month === 6) {
    if (day >= 6) monthBranch = '오';  // 망종(6/6) 이후 오월
    else monthBranch = '사';           // 망종 이전 사월
  } else if (month === 7) {
    if (day >= 7) monthBranch = '미';  // 소서(7/7) 이후 미월
    else monthBranch = '오';           // 소서 이전 오월
  } else if (month === 8) {
    if (day >= 8) monthBranch = '신';  // 입추(8/8) 이후 신월
    else monthBranch = '미';           // 입추 이전 미월
  } else if (month === 9) {
    if (day >= 8) monthBranch = '유';  // 백로(9/8) 이후 유월
    else monthBranch = '신';           // 백로 이전 신월
  } else if (month === 10) {
    if (day >= 8) monthBranch = '술';  // 한로(10/8) 이후 술월
    else monthBranch = '유';           // 한로 이전 유월
  } else if (month === 11) {
    if (day >= 7) monthBranch = '해';  // 입동(11/7) 이후 해월
    else monthBranch = '술';           // 입동 이전 술월
  } else if (month === 12) {
    if (day >= 7) monthBranch = '자';  // 대설(12/7) 이후 자월
    else monthBranch = '해';           // 대설 이전 해월
  }
  
  // 년간에 따른 월간 계산
  const yearPillar = getYearStemBranch(year, month, day);
  const yearStemIndex = HEAVENLY_STEMS.indexOf(yearPillar.stem as any);
  
  // 년간별 인월의 천간 (오행육십갑자표)
  // 갑/기년: 병인월
  // 을/경년: 무인월
  // 병/신년: 경인월
  // 정/임년: 임인월
  // 무/계년: 갑인월
  const monthStemStartForIn = [2, 4, 6, 8, 0, 2, 4, 6, 8, 0];
  const inStemStart = monthStemStartForIn[yearStemIndex];
  
  // 인월부터의 차이 계산
  const monthBranchIndex = EARTHLY_BRANCHES.indexOf(monthBranch as any);
  const inIndex = 2; // 인의 인덱스
  let monthDiff = (monthBranchIndex - inIndex + 12) % 12;
  
  // 월간 = (인월천간 + 월차이) % 10
  const monthStemIndex = (inStemStart + monthDiff) % 10;
  
  return {
    stem: HEAVENLY_STEMS[monthStemIndex],
    branch: monthBranch
  };
}

// 일주 계산 (60갑자 순환)
function getDayStemBranch(year: number, month: number, day: number): { stem: string; branch: string } {
  // Julian Day Number 계산
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  
  const jdn = day + Math.floor((153 * m + 2) / 5) + 365 * y + 
              Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  
  // 기준일: 2000년 1월 7일 = 갑자일 (JDN = 2451551)
  const baseJDN = 2451551;
  const diffDays = jdn - baseJDN;
  
  // 60갑자 순환
  let stemIndex = (diffDays % 10);
  let branchIndex = (diffDays % 12);
  
  // 음수 처리
  stemIndex = ((stemIndex % 10) + 10) % 10;
  branchIndex = ((branchIndex % 12) + 12) % 12;
  
  return {
    stem: HEAVENLY_STEMS[stemIndex],
    branch: EARTHLY_BRANCHES[branchIndex]
  };
}

// 시주 계산 (한국 동경시간 기준)
function getTimeStemBranch(year: number, month: number, day: number, hour: number, minute: number): { stem: string; branch: string } {
  // 한국 사주 시간 기준 (30분 단위)
  let timeBranch = '자';
  let timeBranchIndex = 0;
  
  // 시간을 분 단위로 변환
  const totalMinutes = hour * 60 + minute;
  
  // 시간별 지지 매핑
  if ((totalMinutes >= 23 * 60 + 30) || (totalMinutes < 1 * 60 + 30)) {
    timeBranch = '자';
    timeBranchIndex = 0;
  } else if (totalMinutes >= 1 * 60 + 30 && totalMinutes < 3 * 60 + 30) {
    timeBranch = '축';
    timeBranchIndex = 1;
  } else if (totalMinutes >= 3 * 60 + 30 && totalMinutes < 5 * 60 + 30) {
    timeBranch = '인';
    timeBranchIndex = 2;
  } else if (totalMinutes >= 5 * 60 + 30 && totalMinutes < 7 * 60 + 30) {
    timeBranch = '묘';
    timeBranchIndex = 3;
  } else if (totalMinutes >= 7 * 60 + 30 && totalMinutes < 9 * 60 + 30) {
    timeBranch = '진';
    timeBranchIndex = 4;
  } else if (totalMinutes >= 9 * 60 + 30 && totalMinutes < 11 * 60 + 30) {
    timeBranch = '사';
    timeBranchIndex = 5;
  } else if (totalMinutes >= 11 * 60 + 30 && totalMinutes < 13 * 60 + 30) {
    timeBranch = '오';
    timeBranchIndex = 6;
  } else if (totalMinutes >= 13 * 60 + 30 && totalMinutes < 15 * 60 + 30) {
    timeBranch = '미';
    timeBranchIndex = 7;
  } else if (totalMinutes >= 15 * 60 + 30 && totalMinutes < 17 * 60 + 30) {
    timeBranch = '신';
    timeBranchIndex = 8;
  } else if (totalMinutes >= 17 * 60 + 30 && totalMinutes < 19 * 60 + 30) {
    timeBranch = '유';
    timeBranchIndex = 9;
  } else if (totalMinutes >= 19 * 60 + 30 && totalMinutes < 21 * 60 + 30) {
    timeBranch = '술';
    timeBranchIndex = 10;
  } else if (totalMinutes >= 21 * 60 + 30 && totalMinutes < 23 * 60 + 30) {
    timeBranch = '해';
    timeBranchIndex = 11;
  }
  
  // 일간에 따른 시간 계산
  const dayPillar = getDayStemBranch(year, month, day);
  const dayStemIndex = HEAVENLY_STEMS.indexOf(dayPillar.stem as any);
  
  // 일간별 자시의 천간 (오자시표)
  // 갑/기일: 갑자시부터
  // 을/경일: 병자시부터
  // 병/신일: 무자시부터
  // 정/임일: 경자시부터
  // 무/계일: 임자시부터
  const timeStemStartMap = [0, 2, 4, 6, 8, 0, 2, 4, 6, 8];
  const timeStemStart = timeStemStartMap[dayStemIndex];
  
  // 시간 = (자시천간 + 시지인덱스) % 10
  const timeStemIndex = (timeStemStart + timeBranchIndex) % 10;
  
  return {
    stem: HEAVENLY_STEMS[timeStemIndex],
    branch: timeBranch
  };
}

// 메인 사주 계산 함수
export function calculateSaju(
  year: number, 
  month: number, 
  day: number, 
  hour: number,
  minute: number = 0
): SajuChart {
  const birthDate = new Date(year, month - 1, day, hour, minute);
  
  // 각 주 계산
  const yearPillar = getYearStemBranch(year, month, day);
  const monthPillar = getMonthStemBranch(year, month, day);
  const dayPillar = getDayStemBranch(year, month, day);
  const timePillar = getTimeStemBranch(year, month, day, hour, minute);
  
  // 각 기둥별 상세 정보 생성
  const createPillar = (stem: string, branch: string): SajuPillar => ({
    stem,
    branch,
    element_stem: STEM_PROPERTIES[stem as keyof typeof STEM_PROPERTIES].element,
    element_branch: BRANCH_PROPERTIES[branch as keyof typeof BRANCH_PROPERTIES].element,
    yin_yang_stem: STEM_PROPERTIES[stem as keyof typeof STEM_PROPERTIES].yin_yang,
    yin_yang_branch: BRANCH_PROPERTIES[branch as keyof typeof BRANCH_PROPERTIES].yin_yang
  });
  
  // 시간대 이름
  const timeNames = ['자시', '축시', '인시', '묘시', '진시', '사시', 
                     '오시', '미시', '신시', '유시', '술시', '해시'];
  const timeBranchIndex = EARTHLY_BRANCHES.indexOf(timePillar.branch as any);
  const timePeriodName = timeNames[timeBranchIndex] || '자시';
  
  return {
    year: createPillar(yearPillar.stem, yearPillar.branch),
    month: createPillar(monthPillar.stem, monthPillar.branch),
    day: createPillar(dayPillar.stem, dayPillar.branch),
    time: createPillar(timePillar.stem, timePillar.branch),
    day_master: dayPillar.stem,
    birth_info: {
      solar_date: birthDate,
      time_period: timePeriodName
    }
  };
}

// 오행 상생상극 관계
export const ELEMENT_RELATIONS = {
  생: {
    '목': '화', '화': '토', '토': '금', '금': '수', '수': '목'
  },
  극: {
    '목': '토', '화': '금', '토': '수', '금': '목', '수': '화'  
  }
} as const;

// 사주의 강약 판단
export function analyzeSajuStrength(saju: SajuChart): {
  day_master_strength: '강' | '약';
  supporting_elements: string[];
  opposing_elements: string[];
  analysis: string;
} {
  const dayMasterElement = STEM_PROPERTIES[saju.day_master as keyof typeof STEM_PROPERTIES].element;
  
  // 계절별 오행 강약
  const month = saju.birth_info.solar_date.getMonth() + 1;
  let season = '봄';
  if (month >= 6 && month <= 8) season = '여름';
  else if (month >= 9 && month <= 11) season = '가을';  
  else if (month >= 12 || month <= 2) season = '겨울';
  else season = '봄';
  
  const seasonStrength = {
    '봄': { '목': 3, '화': 2, '토': 1, '금': 0, '수': 1 },
    '여름': { '목': 1, '화': 3, '토': 2, '금': 0, '수': 1 },
    '가을': { '목': 0, '화': 1, '토': 1, '금': 3, '수': 2 },
    '겨울': { '목': 2, '화': 0, '토': 1, '금': 1, '수': 3 }
  };
  
  // 일간 강약 점수 계산
  let strengthScore = seasonStrength[season as keyof typeof seasonStrength][dayMasterElement as keyof typeof seasonStrength['봄']] || 1;
  
  // 사주 내 같은 오행 개수로 강약 보정
  const elements = [
    saju.year.element_stem, saju.year.element_branch,
    saju.month.element_stem, saju.month.element_branch,
    saju.day.element_stem, saju.day.element_branch,
    saju.time.element_stem, saju.time.element_branch
  ];
  
  const elementCount = elements.filter(e => e === dayMasterElement).length;
  strengthScore += elementCount * 0.5;
  
  const isStrong = strengthScore >= 4;
  
  // 용희신 판단
  let supporting: string[] = [];
  let opposing: string[] = [];
  
  if (isStrong) {
    supporting = [
      ELEMENT_RELATIONS.생[dayMasterElement as keyof typeof ELEMENT_RELATIONS.생],
      ELEMENT_RELATIONS.극[dayMasterElement as keyof typeof ELEMENT_RELATIONS.극]
    ];
    opposing = [dayMasterElement];
  } else {
    let generatingElement = '';
    for (const [key, value] of Object.entries(ELEMENT_RELATIONS.생)) {
      if (value === dayMasterElement) {
        generatingElement = key;
        break;
      }
    }
    supporting = [dayMasterElement, generatingElement].filter(e => e);
    opposing = [ELEMENT_RELATIONS.극[dayMasterElement as keyof typeof ELEMENT_RELATIONS.극]];
  }
  
  return {
    day_master_strength: isStrong ? '강' : '약',
    supporting_elements: supporting,
    opposing_elements: opposing,
    analysis: isStrong ? 
      `일간(${saju.day_master})이 강한 편이므로 ${supporting.join(', ')} 오행이 용신입니다.` : 
      `일간(${saju.day_master})이 약한 편이므로 ${supporting.join(', ')} 오행이 용신입니다.`
  };
}

// 테스트 함수
export function testSaju() {
  console.log('=== 정확한 만세력 사주 계산 테스트 ===\n');
  
  const testCases = [
    {
      date: '1998년 9월 4일 19시 16분',
      year: 1998, month: 9, day: 4, hour: 19, minute: 16,
      expected: '무인년 경신월 갑인일 계유시'
    },
    {
      date: '1999년 1월 3일 8시 20분',
      year: 1999, month: 1, day: 3, hour: 8, minute: 20,
      expected: '무인년 갑자월 을묘일 경진시'
    }
  ];
  
  let allPassed = true;
  
  testCases.forEach((test, index) => {
    const result = calculateSaju(test.year, test.month, test.day, test.hour, test.minute);
    const actual = `${result.year.stem}${result.year.branch}년 ${result.month.stem}${result.month.branch}월 ${result.day.stem}${result.day.branch}일 ${result.time.stem}${result.time.branch}시`;
    const passed = actual === test.expected;
    
    console.log(`테스트 ${index + 1}: ${test.date}`);
    console.log(`  예상: ${test.expected}`);
    console.log(`  결과: ${actual}`);
    console.log(`  상태: ${passed ? '✅ 성공' : '❌ 실패'}`);
    
    if (!passed) allPassed = false;
  });
  
  console.log(`\n전체 테스트 결과: ${allPassed ? '✅ 모두 성공!' : '❌ 일부 실패'}`);
  return allPassed;
}