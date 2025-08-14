// 사주팔자 계산 핵심 라이브러리

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

// 절기 정보 (24절기)
export const SOLAR_TERMS = [
  { name: '소한', month: 1, day: 6 }, { name: '대한', month: 1, day: 20 },
  { name: '입춘', month: 2, day: 4 }, { name: '우수', month: 2, day: 19 },
  { name: '경칩', month: 3, day: 6 }, { name: '춘분', month: 3, day: 21 },
  { name: '청명', month: 4, day: 5 }, { name: '곡우', month: 4, day: 20 },
  { name: '입하', month: 5, day: 6 }, { name: '소만', month: 5, day: 21 },
  { name: '망종', month: 6, day: 6 }, { name: '하지', month: 6, day: 21 },
  { name: '소서', month: 7, day: 7 }, { name: '대서', month: 7, day: 23 },
  { name: '입추', month: 8, day: 8 }, { name: '처서', month: 8, day: 23 },
  { name: '백로', month: 9, day: 8 }, { name: '추분', month: 9, day: 23 },
  { name: '한로', month: 10, day: 8 }, { name: '상강', month: 10, day: 23 },
  { name: '입동', month: 11, day: 7 }, { name: '소설', month: 11, day: 22 },
  { name: '대설', month: 12, day: 7 }, { name: '동지', month: 12, day: 22 }
];

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

// 시간대별 지지 매핑
const TIME_BRANCHES = [
  { hours: [23, 0], branch: '자', name: '자시' },
  { hours: [1, 2], branch: '축', name: '축시' },
  { hours: [3, 4], branch: '인', name: '인시' },
  { hours: [5, 6], branch: '묘', name: '묘시' },
  { hours: [7, 8], branch: '진', name: '진시' },
  { hours: [9, 10], branch: '사', name: '사시' },
  { hours: [11, 12], branch: '오', name: '오시' },
  { hours: [13, 14], branch: '미', name: '미시' },
  { hours: [15, 16], branch: '신', name: '신시' },
  { hours: [17, 18], branch: '유', name: '유시' },
  { hours: [19, 20], branch: '술', name: '술시' },
  { hours: [21, 22], branch: '해', name: '해시' }
];

// 년주 천간 계산 (기준: 1984년=갑자년)
function getYearStem(year: number): string {
  const baseYear = 1984; // 갑자년 기준
  const stemIndex = (year - baseYear) % 10;
  return HEAVENLY_STEMS[stemIndex >= 0 ? stemIndex : stemIndex + 10];
}

// 년주 지지 계산
function getYearBranch(year: number): string {
  const baseYear = 1984; // 갑자년 기준  
  const branchIndex = (year - baseYear) % 12;
  return EARTHLY_BRANCHES[branchIndex >= 0 ? branchIndex : branchIndex + 12];
}

// 월주 계산 (년간에 따른 월간 결정)
function getMonthStem(yearStem: string, month: number): string {
  const yearStemIndex = HEAVENLY_STEMS.indexOf(yearStem as any);
  const monthStemTable = [
    [2, 4, 6, 8, 0, 2, 4, 6, 8, 0, 2, 4], // 갑기년
    [3, 5, 7, 9, 1, 3, 5, 7, 9, 1, 3, 5], // 을경년
    [4, 6, 8, 0, 2, 4, 6, 8, 0, 2, 4, 6], // 병신년
    [5, 7, 9, 1, 3, 5, 7, 9, 1, 3, 5, 7], // 정임년
    [6, 8, 0, 2, 4, 6, 8, 0, 2, 4, 6, 8], // 무계년
  ];
  
  const tableIndex = Math.floor(yearStemIndex / 2);
  return HEAVENLY_STEMS[monthStemTable[tableIndex][month - 1]];
}

// 월주 지지는 고정 (인월부터 시작)
function getMonthBranch(month: number): string {
  const monthBranches = ['인', '묘', '진', '사', '오', '미', '신', '유', '술', '해', '자', '축'];
  return monthBranches[month - 1];
}

// 일주 계산 (간지력 기준)
function getDayStemBranch(date: Date): { stem: string; branch: string } {
  // 1900년 1월 1일을 기준으로 한 간지력 계산
  const baseDate = new Date(1900, 0, 1); // 경자일
  const diffTime = date.getTime() - baseDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  const stemIndex = (diffDays + 6) % 10; // 경자일 기준 조정
  const branchIndex = (diffDays + 6) % 12;
  
  return {
    stem: HEAVENLY_STEMS[stemIndex >= 0 ? stemIndex : stemIndex + 10],
    branch: EARTHLY_BRANCHES[branchIndex >= 0 ? branchIndex : branchIndex + 12]
  };
}

// 시주 계산
function getTimeStem(dayStem: string, hour: number): string {
  const dayStemIndex = HEAVENLY_STEMS.indexOf(dayStem as any);
  const timeBranch = getTimeBranch(hour);
  const timeBranchIndex = EARTHLY_BRANCHES.indexOf(timeBranch as any);
  
  const timeStemTable = [
    [0, 2, 4, 6, 8, 0, 2, 4, 6, 8, 0, 2], // 갑기일
    [1, 3, 5, 7, 9, 1, 3, 5, 7, 9, 1, 3], // 을경일
    [2, 4, 6, 8, 0, 2, 4, 6, 8, 0, 2, 4], // 병신일
    [3, 5, 7, 9, 1, 3, 5, 7, 9, 1, 3, 5], // 정임일
    [4, 6, 8, 0, 2, 4, 6, 8, 0, 2, 4, 6], // 무계일
  ];
  
  const tableIndex = Math.floor(dayStemIndex / 2);
  return HEAVENLY_STEMS[timeStemTable[tableIndex][timeBranchIndex]];
}

function getTimeBranch(hour: number): string {
  // 시간을 24시간 형식으로 정규화
  const normalizedHour = hour % 24;
  
  for (const timeInfo of TIME_BRANCHES) {
    if (timeInfo.hours.length === 2) {
      const [start, end] = timeInfo.hours;
      if (start === 23 && (normalizedHour === 23 || normalizedHour === 0)) {
        return timeInfo.branch;
      } else if (normalizedHour >= start && normalizedHour <= end) {
        return timeInfo.branch;
      }
    }
  }
  
  return '자'; // 기본값
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
  const yearStem = getYearStem(year);
  const yearBranch = getYearBranch(year);
  
  // 월주 계산  
  const monthStem = getMonthStem(yearStem, month);
  const monthBranch = getMonthBranch(month);
  
  // 일주 계산
  const { stem: dayStem, branch: dayBranch } = getDayStemBranch(birthDate);
  
  // 시주 계산
  const timeStem = getTimeStem(dayStem, hour);
  const timeBranch = getTimeBranch(hour);
  
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
  const timeInfo = TIME_BRANCHES.find(t => 
    t.branch === timeBranch
  );
  
  return {
    year: createPillar(yearStem, yearBranch),
    month: createPillar(monthStem, monthBranch),
    day: createPillar(dayStem, dayBranch),
    time: createPillar(timeStem, timeBranch),
    day_master: dayStem, // 일간이 본인을 나타냄
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