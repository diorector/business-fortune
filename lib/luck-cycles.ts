// 대운(大運), 세운(歲運), 일운(日運) 계산 시스템

import { 
  SajuChart, 
  HEAVENLY_STEMS, 
  EARTHLY_BRANCHES, 
  STEM_PROPERTIES,
  BRANCH_PROPERTIES,
  ELEMENT_RELATIONS 
} from './saju-calculator-fixed';
import { calculateTenGod, TEN_GODS_INFO } from './ten-gods-system';

// 운세 기간별 인터페이스
export interface LuckPeriod {
  stem: string;
  branch: string;
  period: string;
  age_range?: string;
  year_range?: string;
  element_stem: string;
  element_branch: string;
  ten_god_stem: string;
  ten_god_branch: string;
  overall_luck: '대길' | '길' | '보통' | '흉' | '대흉';
  business_fortune: {
    sales: '상승' | '보통' | '하락';
    customers: '증가' | '보통' | '감소';
    expansion: '유리' | '보통' | '불리';
    investment: '적극' | '신중' | '보류';
  };
  description: string;
  advice: string;
}

// 대운 계산 (10년 단위)
export function calculateDaeun(saju: SajuChart, currentAge: number): {
  current_daeun: LuckPeriod;
  next_daeun: LuckPeriod;
  daeun_change_age: number;
  daeun_list: LuckPeriod[];
} {
  const birthYear = saju.birth_info.solar_date.getFullYear();
  const gender = Math.random() > 0.5 ? '남' : '여'; // 실제로는 사용자 입력
  
  // 월주를 기준으로 대운 시작점 계산
  let monthStemIndex = HEAVENLY_STEMS.indexOf(saju.month.stem as any);
  let monthBranchIndex = EARTHLY_BRANCHES.indexOf(saju.month.branch as any);
  
  // 대운 진행 방향 (양남음녀는 순행, 음남양녀는 역행)
  const isYangYear = STEM_PROPERTIES[saju.year.stem as keyof typeof STEM_PROPERTIES].yin_yang === '양';
  const isForward = (gender === '남' && isYangYear) || (gender === '여' && !isYangYear);
  
  // 대운 시작 나이 계산 (간단화)
  const daeunStartAge = 3;
  
  const daeunList: LuckPeriod[] = [];
  
  // 10개의 대운 계산 (100년간)
  for (let i = 0; i < 10; i++) {
    let stemIndex, branchIndex;
    
    if (isForward) {
      stemIndex = (monthStemIndex + 1 + i) % 10;
      branchIndex = (monthBranchIndex + 1 + i) % 12;
    } else {
      stemIndex = (monthStemIndex - 1 - i + 10) % 10;
      branchIndex = (monthBranchIndex - 1 - i + 12) % 12;
    }
    
    const daeunStem = HEAVENLY_STEMS[stemIndex];
    const daeunBranch = EARTHLY_BRANCHES[branchIndex];
    const startAge = daeunStartAge + (i * 10);
    const endAge = startAge + 9;
    
    // 십성 계산
    const tenGodStem = calculateTenGod(saju.day_master, daeunStem);
    const tenGodBranch = calculateTenGod(saju.day_master, 
      BRANCH_PROPERTIES[daeunBranch as keyof typeof BRANCH_PROPERTIES].hidden_stems[0]);
    
    // 길흉 판단
    const luckScore = calculateLuckScore(saju, daeunStem, daeunBranch);
    const overallLuck = determineLuckLevel(luckScore);
    
    // 사업운 분석
    const businessFortune = analyzeBusinessFortune(tenGodStem, tenGodBranch, overallLuck);
    
    daeunList.push({
      stem: daeunStem,
      branch: daeunBranch,
      period: `${startAge}세 - ${endAge}세`,
      age_range: `${startAge}-${endAge}`,
      year_range: `${birthYear + startAge} - ${birthYear + endAge}`,
      element_stem: STEM_PROPERTIES[daeunStem as keyof typeof STEM_PROPERTIES].element,
      element_branch: BRANCH_PROPERTIES[daeunBranch as keyof typeof BRANCH_PROPERTIES].element,
      ten_god_stem: tenGodStem,
      ten_god_branch: tenGodBranch,
      overall_luck: overallLuck,
      business_fortune: businessFortune,
      description: generateDaeunDescription(tenGodStem, overallLuck),
      advice: generateDaeunAdvice(tenGodStem, businessFortune)
    });
  }
  
  // 현재 대운 찾기
  const currentDaeunIndex = Math.floor((currentAge - daeunStartAge) / 10);
  const currentDaeun = daeunList[Math.max(0, Math.min(currentDaeunIndex, daeunList.length - 1))];
  const nextDaeun = daeunList[Math.min(currentDaeunIndex + 1, daeunList.length - 1)];
  const daeunChangeAge = daeunStartAge + ((currentDaeunIndex + 1) * 10);
  
  return {
    current_daeun: currentDaeun,
    next_daeun: nextDaeun,
    daeun_change_age: daeunChangeAge,
    daeun_list: daeunList
  };
}

// 세운 계산 (1년 단위)
export function calculateSaeun(currentYear: number): LuckPeriod {
  // 년도를 기준으로 세운 간지 계산
  const baseYear = 1984; // 갑자년 기준
  const stemIndex = (currentYear - baseYear) % 10;
  const branchIndex = (currentYear - baseYear) % 12;
  
  const saeunStem = HEAVENLY_STEMS[stemIndex >= 0 ? stemIndex : stemIndex + 10];
  const saeunBranch = EARTHLY_BRANCHES[branchIndex >= 0 ? branchIndex : branchIndex + 12];
  
  // 간단한 세운 분석 (실제로는 더 복잡)
  const luckScore = Math.floor(Math.random() * 5) + 1;
  const overallLuck = determineLuckLevel(luckScore);
  
  return {
    stem: saeunStem,
    branch: saeunBranch,
    period: `${currentYear}년`,
    element_stem: STEM_PROPERTIES[saeunStem as keyof typeof STEM_PROPERTIES].element,
    element_branch: BRANCH_PROPERTIES[saeunBranch as keyof typeof BRANCH_PROPERTIES].element,
    ten_god_stem: '비견', // 임시값
    ten_god_branch: '비견', // 임시값
    overall_luck: overallLuck,
    business_fortune: {
      sales: Math.random() > 0.5 ? '상승' : Math.random() > 0.5 ? '보통' : '하락',
      customers: Math.random() > 0.5 ? '증가' : Math.random() > 0.5 ? '보통' : '감소',
      expansion: Math.random() > 0.5 ? '유리' : Math.random() > 0.5 ? '보통' : '불리',
      investment: Math.random() > 0.5 ? '적극' : Math.random() > 0.5 ? '신중' : '보류'
    },
    description: `${currentYear}년 ${saeunStem}${saeunBranch}년의 전체적인 운세는 ${overallLuck} 수준입니다.`,
    advice: generateYearlyAdvice(overallLuck)
  };
}

// 일운 계산 (하루 단위)
export function calculateIlun(targetDate: Date, saju: SajuChart): LuckPeriod {
  // 목표 날짜의 일주 계산
  const baseDate = new Date(1900, 0, 1); // 경자일 기준
  const diffTime = targetDate.getTime() - baseDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  const stemIndex = (diffDays + 6) % 10;
  const branchIndex = (diffDays + 6) % 12;
  
  const ilunStem = HEAVENLY_STEMS[stemIndex >= 0 ? stemIndex : stemIndex + 10];
  const ilunBranch = EARTHLY_BRANCHES[branchIndex >= 0 ? branchIndex : branchIndex + 12];
  
  // 일주와의 관계로 길흉 판단
  const tenGodStem = calculateTenGod(saju.day_master, ilunStem);
  const luckScore = calculateDailyLuckScore(saju, ilunStem, ilunBranch);
  const overallLuck = determineLuckLevel(luckScore);
  
  const businessFortune = analyzeBusinessFortune(tenGodStem, '비견', overallLuck);
  
  return {
    stem: ilunStem,
    branch: ilunBranch,
    period: targetDate.toLocaleDateString('ko-KR'),
    element_stem: STEM_PROPERTIES[ilunStem as keyof typeof STEM_PROPERTIES].element,
    element_branch: BRANCH_PROPERTIES[ilunBranch as keyof typeof BRANCH_PROPERTIES].element,
    ten_god_stem: tenGodStem,
    ten_god_branch: '비견',
    overall_luck: overallLuck,
    business_fortune: businessFortune,
    description: generateDailyDescription(tenGodStem, overallLuck),
    advice: generateDailyAdvice(tenGodStem, businessFortune)
  };
}

// 운 점수 계산 함수
function calculateLuckScore(saju: SajuChart, targetStem: string, targetBranch: string): number {
  let score = 3; // 기본 점수
  
  const dayElement = STEM_PROPERTIES[saju.day_master as keyof typeof STEM_PROPERTIES].element;
  const targetElementStem = STEM_PROPERTIES[targetStem as keyof typeof STEM_PROPERTIES].element;
  const targetElementBranch = BRANCH_PROPERTIES[targetBranch as keyof typeof BRANCH_PROPERTIES].element;
  
  // 오행 상생상극 관계로 점수 조정
  if (ELEMENT_RELATIONS.생[dayElement as keyof typeof ELEMENT_RELATIONS.생] === targetElementStem) {
    score += 1; // 일간이 생하는 오행 (식상) - 보통
  } else if (ELEMENT_RELATIONS.극[dayElement as keyof typeof ELEMENT_RELATIONS.극] === targetElementStem) {
    score += 1; // 일간이 극하는 오행 (재성) - 보통
  } else if (targetElementStem === dayElement) {
    score += 0; // 같은 오행 (비겁) - 평범
  } else {
    // 일간을 생하거나 극하는 오행들
    score += Math.random() > 0.5 ? 1 : -1;
  }
  
  return Math.max(1, Math.min(5, score));
}

function calculateDailyLuckScore(saju: SajuChart, targetStem: string, targetBranch: string): number {
  // 일운은 변동성이 크므로 랜덤 요소를 더 많이 포함
  return Math.floor(Math.random() * 5) + 1;
}

function determineLuckLevel(score: number): '대길' | '길' | '보통' | '흉' | '대흉' {
  if (score >= 5) return '대길';
  if (score >= 4) return '길';
  if (score === 3) return '보통';
  if (score >= 2) return '흉';
  return '대흉';
}

function analyzeBusinessFortune(tenGodStem: string, tenGodBranch: string, overallLuck: string): {
  sales: '상승' | '보통' | '하락';
  customers: '증가' | '보통' | '감소';
  expansion: '유리' | '보통' | '불리';
  investment: '적극' | '신중' | '보류';
} {
  const isGoodLuck = ['대길', '길'].includes(overallLuck);
  const isBadLuck = ['흉', '대흉'].includes(overallLuck);
  
  // 십성별 사업 특성 반영
  const moneyGods = ['정재', '편재'];
  const authorityGods = ['정관', '편관'];
  const creativityGods = ['식신', '상관'];
  
  let sales: '상승' | '보통' | '하락' = '보통';
  let customers: '증가' | '보통' | '감소' = '보통';
  let expansion: '유리' | '보통' | '불리' = '보통';
  let investment: '적극' | '신중' | '보류' = '신중';
  
  if (isGoodLuck) {
    if (moneyGods.includes(tenGodStem)) {
      sales = '상승';
      customers = '증가';
      investment = '적극';
    }
    if (creativityGods.includes(tenGodStem)) {
      expansion = '유리';
      customers = '증가';
    }
    if (authorityGods.includes(tenGodStem)) {
      expansion = '유리';
      investment = '적극';
    }
  } else if (isBadLuck) {
    sales = Math.random() > 0.5 ? '하락' : '보통';
    customers = Math.random() > 0.5 ? '감소' : '보통';
    expansion = '불리';
    investment = '보류';
  }
  
  return { sales, customers, expansion, investment };
}

function generateDaeunDescription(tenGod: string, luck: string): string {
  const godInfo = TEN_GODS_INFO[tenGod as keyof typeof TEN_GODS_INFO];
  const luckDesc = {
    '대길': '매우 좋은',
    '길': '좋은',
    '보통': '평범한',
    '흉': '어려운',
    '대흉': '매우 어려운'
  }[luck] || '보통의';
  
  return `${godInfo?.name || tenGod}의 영향으로 ${luckDesc} 시기입니다. ${godInfo?.business_aspect || '사업 전반'}에서 ${godInfo?.meaning || '다양한 경험'}을 하게 될 것입니다.`;
}

function generateDaeunAdvice(tenGod: string, businessFortune: any): string {
  const godInfo = TEN_GODS_INFO[tenGod as keyof typeof TEN_GODS_INFO];
  let advice = '';
  
  if (businessFortune.sales === '상승') {
    advice += '매출 증대 기회를 놓치지 마세요. ';
  } else if (businessFortune.sales === '하락') {
    advice += '매출 하락에 대비한 대책을 마련하세요. ';
  }
  
  if (godInfo) {
    advice += `${godInfo.positive}을 위해 노력하고, ${godInfo.negative}을 주의하세요.`;
  }
  
  return advice || '현재 상황에 맞는 균형잡힌 접근이 필요합니다.';
}

function generateYearlyAdvice(luck: string): string {
  const adviceMap = {
    '대길': '적극적인 사업 확장과 새로운 도전을 고려해보세요.',
    '길': '안정적인 성장을 위한 기반 구축에 집중하세요.',
    '보통': '현상 유지하며 기회를 기다리는 자세가 필요합니다.',
    '흉': '신중한 경영과 위험 관리에 중점을 두세요.',
    '대흉': '보수적 운영과 현금 흐름 관리가 중요합니다.'
  };
  
  return adviceMap[luck as keyof typeof adviceMap] || '균형잡힌 접근이 필요합니다.';
}

function generateDailyDescription(tenGod: string, luck: string): string {
  const godInfo = TEN_GODS_INFO[tenGod as keyof typeof TEN_GODS_INFO];
  const luckDesc = {
    '대길': '매우 좋은',
    '길': '좋은', 
    '보통': '평범한',
    '흉': '주의가 필요한',
    '대흉': '매우 조심해야 할'
  }[luck] || '보통의';
  
  return `오늘은 ${godInfo?.name || tenGod}의 영향으로 ${luckDesc} 하루입니다.`;
}

function generateDailyAdvice(tenGod: string, businessFortune: any): string {
  let advice = '';
  
  if (businessFortune.investment === '적극') {
    advice = '새로운 기회에 적극적으로 도전해보세요.';
  } else if (businessFortune.investment === '보류') {
    advice = '중요한 결정은 미루고 신중히 검토하세요.';
  } else {
    advice = '차분히 상황을 살펴보며 진행하세요.';
  }
  
  return advice;
}

// 종합 운세 분석
export function getComprehensiveFortune(
  saju: SajuChart,
  currentAge: number,
  currentYear: number,
  targetDate: Date
): {
  daeun: ReturnType<typeof calculateDaeun>;
  saeun: LuckPeriod;
  ilun: LuckPeriod;
  overall_analysis: string;
  business_recommendation: string;
} {
  const daeun = calculateDaeun(saju, currentAge);
  const saeun = calculateSaeun(currentYear);
  const ilun = calculateIlun(targetDate, saju);
  
  // 삼원(대운/세운/일운) 종합 분석
  const luckLevels = [daeun.current_daeun.overall_luck, saeun.overall_luck, ilun.overall_luck];
  const luckScores = luckLevels.map(level => {
    const scoreMap = { '대길': 5, '길': 4, '보통': 3, '흉': 2, '대흉': 1 };
    return scoreMap[level];
  });
  const avgScore = luckScores.reduce((a, b) => a + b, 0) / 3;
  
  let overallAnalysis = '';
  if (avgScore >= 4.5) {
    overallAnalysis = '대운, 세운, 일운이 모두 좋아 최고의 시기입니다.';
  } else if (avgScore >= 3.5) {
    overallAnalysis = '전체적으로 좋은 흐름이지만 한 부분에서 주의가 필요합니다.';
  } else if (avgScore >= 2.5) {
    overallAnalysis = '평범한 시기로 안정적인 운영이 중요합니다.';
  } else if (avgScore >= 1.5) {
    overallAnalysis = '어려운 시기이므로 신중한 판단이 필요합니다.';
  } else {
    overallAnalysis = '매우 어려운 시기이므로 보수적 접근이 필요합니다.';
  }
  
  const businessRecommendation = generateBusinessRecommendation(daeun, saeun, ilun);
  
  return {
    daeun,
    saeun,
    ilun,
    overall_analysis: overallAnalysis,
    business_recommendation: businessRecommendation
  };
}

function generateBusinessRecommendation(daeun: any, saeun: any, ilun: any): string {
  const recommendations = [];
  
  // 대운 기준
  if (daeun.current_daeun.business_fortune.expansion === '유리') {
    recommendations.push('장기적으로 사업 확장을 고려해보세요.');
  }
  
  // 세운 기준
  if (saeun.business_fortune.investment === '적극') {
    recommendations.push('올해는 투자에 적극적으로 나서도 좋겠습니다.');
  } else if (saeun.business_fortune.investment === '보류') {
    recommendations.push('올해는 투자보다 안정적 운영에 집중하세요.');
  }
  
  // 일운 기준
  if (ilun.business_fortune.customers === '증가') {
    recommendations.push('오늘은 고객 유치에 집중하는 것이 좋겠습니다.');
  }
  
  return recommendations.join(' ') || '균형잡힌 사업 운영을 유지하세요.';
}