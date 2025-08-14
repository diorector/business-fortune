// 정확한 사주팔자 계산 라이브러리 (수정 버전)

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

// 절기 정보 (24절기) - 더 정확한 날짜
export const SOLAR_TERMS_DETAILED = [
  { name: '소한', month: 1, avgDay: 6 },
  { name: '대한', month: 1, avgDay: 20 },
  { name: '입춘', month: 2, avgDay: 4 },
  { name: '우수', month: 2, avgDay: 19 },
  { name: '경칩', month: 3, avgDay: 6 },
  { name: '춘분', month: 3, avgDay: 21 },
  { name: '청명', month: 4, avgDay: 5 },
  { name: '곡우', month: 4, avgDay: 20 },
  { name: '입하', month: 5, avgDay: 6 },
  { name: '소만', month: 5, avgDay: 21 },
  { name: '망종', month: 6, avgDay: 6 },
  { name: '하지', month: 6, avgDay: 21 },
  { name: '소서', month: 7, avgDay: 7 },
  { name: '대서', month: 7, avgDay: 23 },
  { name: '입추', month: 8, avgDay: 8 },
  { name: '처서', month: 8, avgDay: 23 },
  { name: '백로', month: 9, avgDay: 8 },
  { name: '추분', month: 9, avgDay: 23 },
  { name: '한로', month: 10, avgDay: 8 },
  { name: '상강', month: 10, avgDay: 23 },
  { name: '입동', month: 11, avgDay: 7 },
  { name: '소설', month: 11, avgDay: 22 },
  { name: '대설', month: 12, avgDay: 7 },
  { name: '동지', month: 12, avgDay: 22 }
];

// 시간대별 지지 매핑 (정확한 시간 범위)
const TIME_BRANCHES = [
  { startHour: 23, endHour: 1, branch: '자', name: '자시' },
  { startHour: 1, endHour: 3, branch: '축', name: '축시' },
  { startHour: 3, endHour: 5, branch: '인', name: '인시' },
  { startHour: 5, endHour: 7, branch: '묘', name: '묘시' },
  { startHour: 7, endHour: 9, branch: '진', name: '진시' },
  { startHour: 9, endHour: 11, branch: '사', name: '사시' },
  { startHour: 11, endHour: 13, branch: '오', name: '오시' },
  { startHour: 13, endHour: 15, branch: '미', name: '미시' },
  { startHour: 15, endHour: 17, branch: '신', name: '신시' },
  { startHour: 17, endHour: 19, branch: '유', name: '유시' },
  { startHour: 19, endHour: 21, branch: '술', name: '술시' },
  { startHour: 21, endHour: 23, branch: '해', name: '해시' }
];

// 정확한 년주 계산
function getYearStemBranch(year: number): { stem: string; branch: string } {
  // 서기 4년이 갑자년 
  // 천간: (년도 - 4) % 10
  // 지지: (년도 - 4) % 12
  let stemIndex = (year - 4) % 10;
  let branchIndex = (year - 4) % 12;
  
  // 음수 처리
  if (stemIndex < 0) stemIndex += 10;
  if (branchIndex < 0) branchIndex += 12;
  
  return {
    stem: HEAVENLY_STEMS[stemIndex],
    branch: EARTHLY_BRANCHES[branchIndex]
  };
}

// 절기를 고려한 월주 계산
function getMonthStemBranch(year: number, month: number, day: number): { stem: string; branch: string } {
  // 절기 고려 - 대략적인 절입 시기 (실제로는 더 정밀한 계산 필요)
  let adjustedMonth = month;
  
  // 절입일 기준 조정 (간단화)
  if (month === 1 && day < 6) {
    adjustedMonth = 12;
    year--;
  } else if (month === 2 && day < 4) {
    adjustedMonth = 1;
  } else if (month === 3 && day < 6) {
    adjustedMonth = 2;
  } else if (month === 4 && day < 5) {
    adjustedMonth = 3;
  } else if (month === 5 && day < 6) {
    adjustedMonth = 4;
  } else if (month === 6 && day < 6) {
    adjustedMonth = 5;
  } else if (month === 7 && day < 7) {
    adjustedMonth = 6;
  } else if (month === 8 && day < 8) {
    adjustedMonth = 7;
  } else if (month === 9 && day < 8) {
    adjustedMonth = 8;
  } else if (month === 10 && day < 8) {
    adjustedMonth = 9;
  } else if (month === 11 && day < 7) {
    adjustedMonth = 10;
  } else if (month === 12 && day < 7) {
    adjustedMonth = 11;
  }
  
  // 월지: 인월(1월)부터 축월(12월)까지
  const monthBranches = ['인', '묘', '진', '사', '오', '미', '신', '유', '술', '해', '자', '축'];
  const monthBranch = monthBranches[adjustedMonth - 1];
  
  // 월간 계산: 연간에 따라 결정
  const yearStem = getYearStemBranch(year).stem;
  const yearStemIndex = HEAVENLY_STEMS.indexOf(yearStem as any);
  
  // 갑기년: 병인월부터, 을경년: 무인월부터, 병신년: 경인월부터, 정임년: 임인월부터, 무계년: 갑인월부터
  const monthStemStartTable = {
    0: 2, // 갑년: 병부터
    1: 4, // 을년: 무부터
    2: 6, // 병년: 경부터
    3: 8, // 정년: 임부터
    4: 0, // 무년: 갑부터
    5: 2, // 기년: 병부터
    6: 4, // 경년: 무부터
    7: 6, // 신년: 경부터
    8: 8, // 임년: 임부터
    9: 0  // 계년: 갑부터
  };
  
  const monthStemStart = monthStemStartTable[yearStemIndex as keyof typeof monthStemStartTable];
  const monthStemIndex = (monthStemStart + (adjustedMonth - 1) * 2) % 10;
  const monthStem = HEAVENLY_STEMS[monthStemIndex];
  
  return {
    stem: monthStem,
    branch: monthBranch
  };
}

// 정확한 일주 계산 (만세력 기준)
function getDayStemBranch(year: number, month: number, day: number): { stem: string; branch: string } {
  // 기준일: 1900년 1월 31일 = 갑자일 (실제 만세력 기준)
  const baseDate = new Date(1900, 0, 31); // 1900년 1월 31일
  const targetDate = new Date(year, month - 1, day);
  
  const diffTime = targetDate.getTime() - baseDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // 갑자일을 0으로 시작
  let stemIndex = diffDays % 10;
  let branchIndex = diffDays % 12;
  
  // 음수 처리
  if (stemIndex < 0) stemIndex += 10;
  if (branchIndex < 0) branchIndex += 12;
  
  return {
    stem: HEAVENLY_STEMS[stemIndex],
    branch: EARTHLY_BRANCHES[branchIndex]
  };
}

// 시주 계산
function getTimeStemBranch(dayStem: string, hour: number): { stem: string; branch: string } {
  // 시지 결정
  let timeBranch = '자';
  let timeBranchIndex = 0;
  
  for (const period of TIME_BRANCHES) {
    if (period.startHour <= period.endHour) {
      if (hour >= period.startHour && hour < period.endHour) {
        timeBranch = period.branch;
        timeBranchIndex = EARTHLY_BRANCHES.indexOf(timeBranch as any);
        break;
      }
    } else { // 자시의 경우 (23시-1시)
      if (hour >= period.startHour || hour < period.endHour) {
        timeBranch = period.branch;
        timeBranchIndex = EARTHLY_BRANCHES.indexOf(timeBranch as any);
        break;
      }
    }
  }
  
  // 시간 계산
  const dayStemIndex = HEAVENLY_STEMS.indexOf(dayStem as any);
  
  // 일간에 따른 시간 기둥표
  const timeStemTable: string[][] = [
    ['갑', '병', '무', '경', '임', '갑', '병', '무', '경', '임', '갑', '병'], // 갑일
    ['을', '정', '기', '신', '계', '을', '정', '기', '신', '계', '을', '정'], // 을일
    ['병', '무', '경', '임', '갑', '병', '무', '경', '임', '갑', '병', '무'], // 병일
    ['정', '기', '신', '계', '을', '정', '기', '신', '계', '을', '정', '기'], // 정일
    ['무', '경', '임', '갑', '병', '무', '경', '임', '갑', '병', '무', '경'], // 무일
    ['기', '신', '계', '을', '정', '기', '신', '계', '을', '정', '기', '신'], // 기일
    ['경', '임', '갑', '병', '무', '경', '임', '갑', '병', '무', '경', '임'], // 경일
    ['신', '계', '을', '정', '기', '신', '계', '을', '정', '기', '신', '계'], // 신일
    ['임', '갑', '병', '무', '경', '임', '갑', '병', '무', '경', '임', '갑'], // 임일
    ['계', '을', '정', '기', '신', '계', '을', '정', '기', '신', '계', '을']  // 계일
  ];
  
  const timeStem = timeStemTable[dayStemIndex][timeBranchIndex];
  
  return {
    stem: timeStem,
    branch: timeBranch
  };
}

// 메인 사주 계산 함수
export function calculateSaju(
  year: number, 
  month: number, 
  day: number, 
  hour: number
): SajuChart {
  const birthDate = new Date(year, month - 1, day, hour);
  
  // 년주 계산
  const yearPillar = getYearStemBranch(year);
  
  // 월주 계산 (절기 고려)
  const monthPillar = getMonthStemBranch(year, month, day);
  
  // 일주 계산
  const dayPillar = getDayStemBranch(year, month, day);
  
  // 시주 계산
  const timePillar = getTimeStemBranch(dayPillar.stem, hour);
  
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
  const timeInfo = TIME_BRANCHES.find(t => t.branch === timePillar.branch);
  
  return {
    year: createPillar(yearPillar.stem, yearPillar.branch),
    month: createPillar(monthPillar.stem, monthPillar.branch),
    day: createPillar(dayPillar.stem, dayPillar.branch),
    time: createPillar(timePillar.stem, timePillar.branch),
    day_master: dayPillar.stem,
    birth_info: {
      solar_date: birthDate,
      time_period: timeInfo?.name || '자시'
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