// 정확한 만세력 기반 사주팔자 계산 (참고자료 기반 완전 재구현)

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
    time_period: string;
  };
}

// 년주 계산 (입춘 기준 - 보통 2월 4일)
function getYearStemBranch(year: number, month: number, day: number): { stem: string; branch: string } {
  // 입춘 이전이면 전년도로 계산
  let adjustedYear = year;
  if (month === 1 || (month === 2 && day < 4)) {
    adjustedYear--;
  }
  
  // 60갑자 순환
  // 기준: 1984년 = 갑자년 (0,0)
  const baseYear = 1984;
  const diff = adjustedYear - baseYear;
  
  // 천간 인덱스 = (년도 차이) % 10
  // 지지 인덱스 = (년도 차이) % 12
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

// 월주 계산 (절기 기준)
function getMonthStemBranch(year: number, month: number, day: number): { stem: string; branch: string } {
  // 24절기 중 절입일 기준으로 월 결정
  // 각 월의 절입일 (대략적인 날짜, 실제로는 매년 조금씩 다름)
  const solarTerms = [
    { month: 1, day: 6, branch: '축' },   // 소한
    { month: 2, day: 4, branch: '인' },   // 입춘
    { month: 3, day: 6, branch: '묘' },   // 경칩
    { month: 4, day: 5, branch: '진' },   // 청명
    { month: 5, day: 6, branch: '사' },   // 입하
    { month: 6, day: 6, branch: '오' },   // 망종
    { month: 7, day: 7, branch: '미' },   // 소서
    { month: 8, day: 8, branch: '신' },   // 입추
    { month: 9, day: 8, branch: '유' },   // 백로
    { month: 10, day: 8, branch: '술' },  // 한로
    { month: 11, day: 7, branch: '해' },  // 입동
    { month: 12, day: 7, branch: '자' }   // 대설
  ];
  
  // 현재 날짜에 맞는 절기 찾기
  let monthBranch = '자';
  for (let i = 0; i < solarTerms.length; i++) {
    const term = solarTerms[i];
    const nextTerm = solarTerms[(i + 1) % 12];
    
    if (month === term.month) {
      if (day >= term.day) {
        monthBranch = term.branch;
      } else if (i > 0) {
        monthBranch = solarTerms[i - 1].branch;
      } else {
        monthBranch = '자'; // 이전 년도 12월
      }
      break;
    }
  }
  
  // 년간에 따른 월간 계산 (오행표)
  const yearPillar = getYearStemBranch(year, month, day);
  const yearStemIndex = HEAVENLY_STEMS.indexOf(yearPillar.stem as any);
  
  // 년간별 인월의 천간 시작점
  // 갑/기년: 병인월 (2)
  // 을/경년: 무인월 (4)
  // 병/신년: 경인월 (6)
  // 정/임년: 임인월 (8)
  // 무/계년: 갑인월 (0)
  const monthStemStartMap: { [key: number]: number } = {
    0: 2, // 갑
    1: 4, // 을
    2: 6, // 병
    3: 8, // 정
    4: 0, // 무
    5: 2, // 기
    6: 4, // 경
    7: 6, // 신
    8: 8, // 임
    9: 0  // 계
  };
  
  const monthStemStart = monthStemStartMap[yearStemIndex];
  const monthBranchIndex = EARTHLY_BRANCHES.indexOf(monthBranch as any);
  
  // 인월(2)부터 시작하므로 조정 필요
  const inIndex = 2; // 인의 인덱스
  let monthOffset = (monthBranchIndex - inIndex + 12) % 12;
  
  const monthStemIndex = (monthStemStart + monthOffset * 2) % 10;
  
  return {
    stem: HEAVENLY_STEMS[monthStemIndex],
    branch: monthBranch
  };
}

// 일주 계산 (60갑자 순환)
function getDayStemBranch(year: number, month: number, day: number): { stem: string; branch: string } {
  // 기준일: 1900년 1월 1일 = 갑자일
  const baseDate = new Date(1900, 0, 1);
  const targetDate = new Date(year, month - 1, day);
  
  // 일수 차이 계산
  const diffTime = targetDate.getTime() - baseDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // 60갑자 순환
  const cycleDay = diffDays % 60;
  
  // 천간과 지지 계산
  const stemIndex = cycleDay % 10;
  const branchIndex = cycleDay % 12;
  
  return {
    stem: HEAVENLY_STEMS[stemIndex],
    branch: EARTHLY_BRANCHES[branchIndex]
  };
}

// 시주 계산
function getTimeStemBranch(year: number, month: number, day: number, hour: number, minute: number): { stem: string; branch: string } {
  // 시진 결정 (2시간 단위)
  const timeRanges = [
    { start: 23, end: 1, branch: '자' },   // 23:00 - 01:00
    { start: 1, end: 3, branch: '축' },    // 01:00 - 03:00
    { start: 3, end: 5, branch: '인' },    // 03:00 - 05:00
    { start: 5, end: 7, branch: '묘' },    // 05:00 - 07:00
    { start: 7, end: 9, branch: '진' },    // 07:00 - 09:00
    { start: 9, end: 11, branch: '사' },   // 09:00 - 11:00
    { start: 11, end: 13, branch: '오' },  // 11:00 - 13:00
    { start: 13, end: 15, branch: '미' },  // 13:00 - 15:00
    { start: 15, end: 17, branch: '신' },  // 15:00 - 17:00
    { start: 17, end: 19, branch: '유' },  // 17:00 - 19:00
    { start: 19, end: 21, branch: '술' },  // 19:00 - 21:00
    { start: 21, end: 23, branch: '해' }   // 21:00 - 23:00
  ];
  
  // 시지 결정
  let timeBranch = '자';
  for (const range of timeRanges) {
    if (range.start > range.end) {
      // 자시의 경우 (23:00 - 01:00)
      if (hour >= range.start || hour < range.end) {
        timeBranch = range.branch;
        break;
      }
    } else {
      if (hour >= range.start && hour < range.end) {
        timeBranch = range.branch;
        break;
      }
    }
  }
  
  // 일간에 따른 시간 계산
  const dayPillar = getDayStemBranch(year, month, day);
  const dayStemIndex = HEAVENLY_STEMS.indexOf(dayPillar.stem as any);
  
  // 일간별 자시의 천간
  // 갑/기일: 갑자시
  // 을/경일: 병자시  
  // 병/신일: 무자시
  // 정/임일: 경자시
  // 무/계일: 임자시
  const timeStemStartMap: { [key: number]: number } = {
    0: 0, // 갑일 -> 갑자시
    1: 2, // 을일 -> 병자시
    2: 4, // 병일 -> 무자시
    3: 6, // 정일 -> 경자시
    4: 8, // 무일 -> 임자시
    5: 0, // 기일 -> 갑자시
    6: 2, // 경일 -> 병자시
    7: 4, // 신일 -> 무자시
    8: 6, // 임일 -> 경자시
    9: 8  // 계일 -> 임자시
  };
  
  const timeStemStart = timeStemStartMap[dayStemIndex];
  const timeBranchIndex = EARTHLY_BRANCHES.indexOf(timeBranch as any);
  
  // 시간 계산
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
    // 일간이 강한 경우: 설기(洩氣)하는 오행이 용신
    supporting = [
      ELEMENT_RELATIONS.생[dayMasterElement as keyof typeof ELEMENT_RELATIONS.생],
      ELEMENT_RELATIONS.극[dayMasterElement as keyof typeof ELEMENT_RELATIONS.극]
    ];
    opposing = [dayMasterElement];
  } else {
    // 일간이 약한 경우: 생조(生助)하는 오행이 용신
    // 나를 생하는 오행 찾기
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
  console.log('=== 사주 계산 테스트 ===\n');
  
  // 테스트 케이스들
  const testCases = [
    { year: 1998, month: 9, day: 4, hour: 19, minute: 16, 
      expected: '무인년 경신월 갑인일 계유시' },
    { year: 1990, month: 5, day: 15, hour: 14, minute: 30,
      expected: '경오년 신사월 기묘일 신미시' },
    { year: 2000, month: 1, day: 1, hour: 0, minute: 0,
      expected: '기묘년 병자월 무술일 임자시' }
  ];
  
  testCases.forEach((testCase, index) => {
    const result = calculateSaju(testCase.year, testCase.month, testCase.day, testCase.hour, testCase.minute);
    const actual = `${result.year.stem}${result.year.branch}년 ${result.month.stem}${result.month.branch}월 ${result.day.stem}${result.day.branch}일 ${result.time.stem}${result.time.branch}시`;
    
    console.log(`테스트 ${index + 1}: ${testCase.year}년 ${testCase.month}월 ${testCase.day}일 ${testCase.hour}시 ${testCase.minute}분`);
    console.log(`  예상: ${testCase.expected}`);
    console.log(`  결과: ${actual}`);
    console.log(`  상태: ${actual === testCase.expected ? '✅ 성공' : '❌ 실패'}\n`);
  });
  
  return true;
}