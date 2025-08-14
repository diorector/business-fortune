// 정확한 만세력 기반 사주팔자 계산 라이브러리
// 1998년 9월 4일 19시 16분 = 무인년 경신월 갑인일 계유시

// 천간 (天干)
export const HEAVENLY_STEMS = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'] as const;

// 지지 (地支)  
export const EARTHLY_BRANCHES = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'] as const;

// 오행 (五行)
export const FIVE_ELEMENTS = ['목', '화', '토', '금', '수'] as const;

// 십성 (十星)
export const TEN_GODS = [
  '비견', '겁재', '식신', '상관', '편재', '정재', '편관', '정관', '편인', '정인'
] as const;

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
  '자': { element: '수', yin_yang: '양', animal: '쥐', hidden_stems: ['계'] },
  '축': { element: '토', yin_yang: '음', animal: '소', hidden_stems: ['기', '계', '신'] },
  '인': { element: '목', yin_yang: '양', animal: '호랑이', hidden_stems: ['갑', '병', '무'] },
  '묘': { element: '목', yin_yang: '음', animal: '토끼', hidden_stems: ['을'] },
  '진': { element: '토', yin_yang: '양', animal: '용', hidden_stems: ['무', '을', '계'] },
  '사': { element: '화', yin_yang: '음', animal: '뱀', hidden_stems: ['병', '경', '무'] },
  '오': { element: '화', yin_yang: '양', animal: '말', hidden_stems: ['정', '기'] },
  '미': { element: '토', yin_yang: '음', animal: '양', hidden_stems: ['기', '정', '을'] },
  '신': { element: '금', yin_yang: '양', animal: '원숭이', hidden_stems: ['경', '임', '무'] },
  '유': { element: '금', yin_yang: '음', animal: '닭', hidden_stems: ['신'] },
  '술': { element: '토', yin_yang: '양', animal: '개', hidden_stems: ['무', '신', '정'] },
  '해': { element: '수', yin_yang: '음', animal: '돼지', hidden_stems: ['임', '갑'] }
} as const;

// 사주팔자 인터페이스
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
  day_master: string; // 일주 천간 (본인의 오행)
  birth_info: {
    solar_date: Date;
    lunar_date?: string;
    time_period: string;
  };
}

// 24절기 정확한 날짜 (평균값, 실제로는 년도별로 조금씩 다름)
const SOLAR_TERMS = [
  { name: '소한', month: 1, day: 6 },
  { name: '대한', month: 1, day: 20 },
  { name: '입춘', month: 2, day: 4 },  // 년의 시작
  { name: '우수', month: 2, day: 19 },
  { name: '경칩', month: 3, day: 6 },   // 인월의 시작
  { name: '춘분', month: 3, day: 21 },
  { name: '청명', month: 4, day: 5 },   // 묘월의 시작
  { name: '곡우', month: 4, day: 20 },
  { name: '입하', month: 5, day: 6 },   // 진월의 시작
  { name: '소만', month: 5, day: 21 },
  { name: '망종', month: 6, day: 6 },   // 사월의 시작
  { name: '하지', month: 6, day: 21 },
  { name: '소서', month: 7, day: 7 },   // 오월의 시작
  { name: '대서', month: 7, day: 23 },
  { name: '입추', month: 8, day: 8 },   // 미월의 시작
  { name: '처서', month: 8, day: 23 },
  { name: '백로', month: 9, day: 8 },   // 신월의 시작
  { name: '추분', month: 9, day: 23 },
  { name: '한로', month: 10, day: 8 },  // 유월의 시작
  { name: '상강', month: 10, day: 23 },
  { name: '입동', month: 11, day: 7 },  // 술월의 시작
  { name: '소설', month: 11, day: 22 },
  { name: '대설', month: 12, day: 7 },  // 해월의 시작
  { name: '동지', month: 12, day: 22 }
];

// 년주 계산 (입춘 기준)
function getYearStemBranch(year: number, month: number, day: number): { stem: string; branch: string } {
  // 입춘(2월 4일경) 이전이면 전년도로 계산
  let adjustedYear = year;
  if (month === 1 || (month === 2 && day < 4)) {
    adjustedYear--;
  }
  
  // 천간: (년도 - 4) % 10
  // 지지: (년도 - 4) % 12
  let stemIndex = (adjustedYear - 4) % 10;
  let branchIndex = (adjustedYear - 4) % 12;
  
  if (stemIndex < 0) stemIndex += 10;
  if (branchIndex < 0) branchIndex += 12;
  
  return {
    stem: HEAVENLY_STEMS[stemIndex],
    branch: EARTHLY_BRANCHES[branchIndex]
  };
}

// 월주 계산 (절기 기준)
function getMonthStemBranch(year: number, month: number, day: number): { stem: string; branch: string } {
  // 절기를 고려한 월 결정
  let solarMonth = 0;
  
  // 절입일 기준으로 월 결정
  if (month === 1) {
    solarMonth = day < 6 ? 11 : 12; // 대설 or 소한
  } else if (month === 2) {
    solarMonth = day < 4 ? 12 : 1;  // 소한 or 입춘
  } else if (month === 3) {
    solarMonth = day < 6 ? 1 : 2;   // 입춘 or 경칩
  } else if (month === 4) {
    solarMonth = day < 5 ? 2 : 3;   // 경칩 or 청명
  } else if (month === 5) {
    solarMonth = day < 6 ? 3 : 4;   // 청명 or 입하
  } else if (month === 6) {
    solarMonth = day < 6 ? 4 : 5;   // 입하 or 망종
  } else if (month === 7) {
    solarMonth = day < 7 ? 5 : 6;   // 망종 or 소서
  } else if (month === 8) {
    solarMonth = day < 8 ? 6 : 7;   // 소서 or 입추
  } else if (month === 9) {
    solarMonth = day < 8 ? 7 : 8;   // 입추 or 백로
  } else if (month === 10) {
    solarMonth = day < 8 ? 8 : 9;   // 백로 or 한로
  } else if (month === 11) {
    solarMonth = day < 7 ? 9 : 10;  // 한로 or 입동
  } else if (month === 12) {
    solarMonth = day < 7 ? 10 : 11; // 입동 or 대설
  }
  
  // 월지: 인월(1)부터 축월(12)까지
  const monthBranches = ['인', '묘', '진', '사', '오', '미', '신', '유', '술', '해', '자', '축'];
  const monthBranch = monthBranches[solarMonth - 1];
  
  // 년간에 따른 월간 계산
  const yearPillar = getYearStemBranch(year, month, day);
  const yearStemIndex = HEAVENLY_STEMS.indexOf(yearPillar.stem as any);
  
  // 오행국표에 의한 월간 계산
  // 갑기년: 병인월부터 시작 (병=2)
  // 을경년: 무인월부터 시작 (무=4)
  // 병신년: 경인월부터 시작 (경=6)
  // 정임년: 임인월부터 시작 (임=8)
  // 무계년: 갑인월부터 시작 (갑=0)
  const monthStemStartIndex = [2, 4, 6, 8, 0][yearStemIndex % 5];
  const monthStemIndex = (monthStemStartIndex + (solarMonth - 1) * 2) % 10;
  
  return {
    stem: HEAVENLY_STEMS[monthStemIndex],
    branch: monthBranch
  };
}

// 일주 계산 (만세력 기준 - 더 정확한 계산 필요)
function getDayStemBranch(year: number, month: number, day: number): { stem: string; branch: string } {
  // Julian Day Number 계산
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  
  const jdn = day + Math.floor((153 * m + 2) / 5) + 365 * y + 
              Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  
  // 기준일: 1998년 9월 4일 = 갑인일로 설정 (실제 만세력 기준)
  const baseJDN = 2451061; // 1998년 9월 4일의 Julian Day Number
  const baseStemIndex = 0; // 갑
  const baseBranchIndex = 2; // 인
  
  const diffDays = jdn - baseJDN;
  
  const stemIndex = (baseStemIndex + diffDays) % 10;
  const branchIndex = (baseBranchIndex + diffDays) % 12;
  
  // 음수 처리
  const finalStemIndex = stemIndex >= 0 ? stemIndex : stemIndex + 10;
  const finalBranchIndex = branchIndex >= 0 ? branchIndex : branchIndex + 12;
  
  return {
    stem: HEAVENLY_STEMS[finalStemIndex],
    branch: EARTHLY_BRANCHES[finalBranchIndex]
  };
}

// 시주 계산
function getTimeStemBranch(year: number, month: number, day: number, hour: number): { stem: string; branch: string } {
  // 시지 결정 (한국 표준시 기준, 태양시 보정 필요시 -30분)
  const timeBranches = [
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
  
  // 19:16은 유시 (17:00-19:00)
  let timeBranch = '자';
  let timeBranchIndex = 0;
  
  for (let i = 0; i < timeBranches.length; i++) {
    const period = timeBranches[i];
    if (period.start <= period.end) {
      if (hour >= period.start && hour < period.end) {
        timeBranch = period.branch;
        timeBranchIndex = EARTHLY_BRANCHES.indexOf(timeBranch as any);
        break;
      }
    } else { // 자시의 경우
      if (hour >= period.start || hour < period.end) {
        timeBranch = period.branch;
        timeBranchIndex = EARTHLY_BRANCHES.indexOf(timeBranch as any);
        break;
      }
    }
  }
  
  // 일간에 따른 시간 계산
  const dayPillar = getDayStemBranch(year, month, day);
  const dayStemIndex = HEAVENLY_STEMS.indexOf(dayPillar.stem as any);
  
  // 오행국법: 갑기일=갑자시부터, 을경일=병자시부터, 병신일=무자시부터, 정임일=경자시부터, 무계일=임자시부터
  const timeStemStartIndex = [0, 2, 4, 6, 8][dayStemIndex % 5];
  const timeStemIndex = (timeStemStartIndex + timeBranchIndex) % 10;
  
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
  const timePillar = getTimeStemBranch(year, month, day, hour);
  
  // 각 기둥별 상세 정보 생성
  const createPillar = (stem: string, branch: string): SajuPillar => ({
    stem,
    branch,
    element_stem: STEM_PROPERTIES[stem as keyof typeof STEM_PROPERTIES].element,
    element_branch: BRANCH_PROPERTIES[branch as keyof typeof BRANCH_PROPERTIES].element,
    yin_yang_stem: STEM_PROPERTIES[stem as keyof typeof STEM_PROPERTIES].yin_yang,
    yin_yang_branch: BRANCH_PROPERTIES[branch as keyof typeof BRANCH_PROPERTIES].yin_yang
  });
  
  // 시간대 이름 찾기
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
  생: { // 상생
    '목': '화', '화': '토', '토': '금', '금': '수', '수': '목'
  },
  극: { // 상극
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
  
  // 월령 계산 (계절별 오행 강약)
  const monthElement = saju.month.element_branch;
  const seasonStrength = {
    '봄': { '목': 3, '화': 2, '토': 0, '금': 1, '수': 1 },
    '여름': { '목': 1, '화': 3, '토': 2, '금': 0, '수': 1 },
    '가을': { '목': 0, '화': 1, '토': 1, '금': 3, '수': 2 },
    '겨울': { '목': 1, '화': 0, '토': 1, '금': 2, '수': 3 }
  };
  
  // 계절 판단 (간단히 월로 계산)
  const month = saju.birth_info.solar_date.getMonth() + 1;
  let season = '봄';
  if (month >= 6 && month <= 8) season = '여름';
  else if (month >= 9 && month <= 11) season = '가을';  
  else if (month >= 12 || month <= 2) season = '겨울';
  
  // 일간 강약 점수 계산
  let strengthScore = seasonStrength[season as keyof typeof seasonStrength][dayMasterElement as keyof typeof seasonStrength['봄']] || 1;
  
  // 사주 내 같은 오행 개수로 강약 보정
  const elements = [
    saju.year.element_stem, saju.month.element_stem, 
    saju.day.element_stem, saju.time.element_stem
  ];
  const sameElementCount = elements.filter(e => e === dayMasterElement).length;
  strengthScore += sameElementCount - 1;
  
  const isStrong = strengthScore >= 3;
  
  return {
    day_master_strength: isStrong ? '강' : '약',
    supporting_elements: isStrong ? 
      [ELEMENT_RELATIONS.극[dayMasterElement as keyof typeof ELEMENT_RELATIONS.극], 
       dayMasterElement === '목' ? '금' : dayMasterElement === '화' ? '수' : 
       dayMasterElement === '토' ? '목' : dayMasterElement === '금' ? '화' : '토'] :
      [ELEMENT_RELATIONS.생[dayMasterElement as keyof typeof ELEMENT_RELATIONS.생], dayMasterElement],
    opposing_elements: isStrong ?
      [ELEMENT_RELATIONS.생[dayMasterElement as keyof typeof ELEMENT_RELATIONS.생], dayMasterElement] :
      [ELEMENT_RELATIONS.극[dayMasterElement as keyof typeof ELEMENT_RELATIONS.극]],
    analysis: isStrong ? 
      '일간이 강한 편이므로 설기하는 오행이 필요합니다.' : 
      '일간이 약한 편이므로 도와주는 오행이 필요합니다.'
  };
}

// 테스트 함수
export function testSaju() {
  const result = calculateSaju(1998, 9, 4, 19, 16);
  console.log('1998년 9월 4일 19시 16분 사주:');
  console.log(`년주: ${result.year.stem}${result.year.branch}`);
  console.log(`월주: ${result.month.stem}${result.month.branch}`);
  console.log(`일주: ${result.day.stem}${result.day.branch}`);
  console.log(`시주: ${result.time.stem}${result.time.branch}`);
  
  // 정답: 무인년 경신월 갑인일 계유시
  const isCorrect = 
    result.year.stem === '무' && result.year.branch === '인' &&
    result.month.stem === '경' && result.month.branch === '신' &&
    result.day.stem === '갑' && result.day.branch === '인' &&
    result.time.stem === '계' && result.time.branch === '유';
    
  console.log(`결과: ${isCorrect ? '✅ 정확함!' : '❌ 틀림'}`);
  return result;
}