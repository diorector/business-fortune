// 신살(神殺) 계산 및 해석 시스템

import { SajuChart, EARTHLY_BRANCHES } from './saju-calculator-fixed';

// 주요 신살 정보
export const SINSAL_INFO = {
  // 길신 (吉神)
  '천을귀인': {
    name: '천을귀인',
    type: '길신',
    meaning: '하늘의 귀인, 도움을 주는 사람',
    business_effect: '귀인의 도움으로 사업 발전, 좋은 인연과 기회',
    description: '어려운 상황에서 도움을 주는 귀인을 만날 수 있습니다.'
  },
  '천덕귀인': {
    name: '천덕귀인',
    type: '길신',
    meaning: '하늘의 덕을 받는 귀인',
    business_effect: '덕망으로 인한 신뢰, 자연스러운 고객 증가',
    description: '덕을 베풀어 자연스럽게 사업이 번창할 수 있습니다.'
  },
  '월덕귀인': {
    name: '월덕귀인',
    type: '길신',
    meaning: '달의 덕을 받는 귀인',
    business_effect: '온화한 성품으로 인한 신뢰, 여성 고객층 확대',
    description: '온화하고 친근한 매력으로 많은 사람들의 사랑을 받습니다.'
  },
  '천희': {
    name: '천희',
    type: '길신',
    meaning: '하늘의 기쁨',
    business_effect: '즐거운 분위기, 축하할 일이 생기는 운',
    description: '기쁘고 즐거운 일들이 연이어 생겨 분위기가 좋아집니다.'
  },
  '홍란': {
    name: '홍란',
    type: '길신',
    meaning: '붉은 난초, 인기와 매력',
    business_effect: '인기와 매력으로 고객 유치, 마케팅 효과',
    description: '매력적인 모습으로 사람들의 관심과 인기를 얻습니다.'
  },
  '문창귀인': {
    name: '문창귀인',
    type: '길신',
    meaning: '학문과 문서의 귀인',
    business_effect: '문서 업무, 계약, 홍보 등에서 유리함',
    description: '문서나 계약 관련 일에서 좋은 결과를 얻을 수 있습니다.'
  },
  '역마': {
    name: '역마',
    type: '길신',
    meaning: '움직임과 변화',
    business_effect: '사업 확장, 새로운 분야 진출, 이동과 관련된 수익',
    description: '변화와 움직임을 통해 새로운 기회를 얻을 수 있습니다.'
  },
  
  // 흉신 (凶神) 
  '겁살': {
    name: '겁살',
    type: '흉신',
    meaning: '강도, 도난, 손실',
    business_effect: '도난이나 사기 주의, 갑작스런 손실 위험',
    description: '도난이나 사기를 당하지 않도록 각별히 주의해야 합니다.'
  },
  '양인': {
    name: '양인',
    type: '흉신', 
    meaning: '칼의 날, 다툼과 상처',
    business_effect: '고객과의 분쟁, 직원간 갈등 주의',
    description: '말다툼이나 갈등이 생기지 않도록 원만한 소통이 필요합니다.'
  },
  '백호': {
    name: '백호',
    type: '흉신',
    meaning: '흰 호랑이, 질병과 재액',
    business_effect: '건강 관리 주의, 위생 관련 문제 발생 가능',
    description: '건강과 위생 관리에 특별히 신경써야 할 시기입니다.'
  },
  '오귀': {
    name: '오귀',
    type: '흉신',
    meaning: '다섯 귀신, 복잡하고 얽힌 문제',
    business_effect: '복잡한 문제들이 얽혀서 해결이 어려움',
    description: '여러 문제가 동시에 발생하여 복잡해질 수 있습니다.'
  },
  '육해': {
    name: '육해',
    type: '흉신',
    meaning: '여섯 가지 해로움',
    business_effect: '예상치 못한 방해와 장애물들',
    description: '계획한 일들이 예상대로 진행되지 않을 수 있습니다.'
  },
  '괴강': {
    name: '괴강',
    type: '흉신',
    meaning: '괴이한 강함, 고독과 독단',
    business_effect: '혼자만의 판단으로 실수, 소통 부족',
    description: '혼자 결정하지 말고 주변의 조언을 구하는 것이 좋습니다.'
  }
} as const;

// 신살 계산을 위한 기본 테이블들
const CHEONEUR_GWIIN_TABLE = {
  '갑': ['축', '미'], '을': ['자', '신'], '병': ['해', '유'], '정': ['해', '유'],
  '무': ['축', '미'], '기': ['자', '신'], '경': ['축', '미'], '신': ['자', '신'],
  '임': ['사', '묘'], '계': ['사', '묘']
};

const CHEOLDEOK_GWIIN_TABLE = {
  '갑': ['해'], '을': ['자'], '병': ['인'], '정': ['묘'], '무': ['신'],
  '기': ['해'], '경': ['축'], '신': ['인'], '임': ['사'], '계': ['오']
};

const WOLDEOK_GWIIN_TABLE = {
  1: ['병', '정'], 2: ['갑', '을'], 3: ['임', '계'], 4: ['갑', '을'],
  5: ['임', '계'], 6: ['병', '정'], 7: ['갑', '을'], 8: ['을', '정'],
  9: ['임', '계'], 10: ['갑', '을'], 11: ['무', '기'], 12: ['병', '정']
};

const YULMA_TABLE = {
  '인': ['사', '신', '해'], '오': ['사', '신', '해'], '술': ['사', '신', '해'],
  '신': ['인', '사', '해'], '자': ['인', '사', '해'], '진': ['인', '사', '해'],
  '사': ['인', '신', '해'], '유': ['인', '신', '해'], '축': ['인', '신', '해'],
  '해': ['사', '신', '인'], '묘': ['사', '신', '인'], '미': ['사', '신', '인']
};

// 신살 계산 함수들
function hasCheoneurGwiin(saju: SajuChart): boolean {
  const dayMaster = saju.day_master;
  const requiredBranches = CHEONEUR_GWIIN_TABLE[dayMaster as keyof typeof CHEONEUR_GWIIN_TABLE];
  if (!requiredBranches) return false;
  
  const sajuBranches = [saju.year.branch, saju.month.branch, saju.day.branch, saju.time.branch];
  return requiredBranches.some(branch => sajuBranches.includes(branch));
}

function hasCheoldeokGwiin(saju: SajuChart): boolean {
  const dayMaster = saju.day_master;
  const requiredBranches = CHEOLDEOK_GWIIN_TABLE[dayMaster as keyof typeof CHEOLDEOK_GWIIN_TABLE];
  if (!requiredBranches) return false;
  
  const sajuBranches = [saju.year.branch, saju.month.branch, saju.day.branch, saju.time.branch];
  return requiredBranches.some(branch => sajuBranches.includes(branch));
}

function hasWoldeokGwiin(saju: SajuChart): boolean {
  const birthMonth = saju.birth_info.solar_date.getMonth() + 1;
  const requiredStems = WOLDEOK_GWIIN_TABLE[birthMonth as keyof typeof WOLDEOK_GWIIN_TABLE];
  if (!requiredStems) return false;
  
  const sajuStems = [saju.year.stem, saju.month.stem, saju.day.stem, saju.time.stem];
  return requiredStems.some(stem => sajuStems.includes(stem));
}

function hasYulma(saju: SajuChart): boolean {
  const dayBranch = saju.day.branch;
  const requiredBranches = YULMA_TABLE[dayBranch as keyof typeof YULMA_TABLE];
  if (!requiredBranches) return false;
  
  const otherBranches = [saju.year.branch, saju.month.branch, saju.time.branch];
  return requiredBranches.some(branch => otherBranches.includes(branch));
}

function hasGeobsal(saju: SajuChart): boolean {
  // 겁살은 월지를 기준으로 계산
  const monthBranch = saju.month.branch;
  const geobsalBranches: { [key: string]: string } = {
    '자': '사', '축': '오', '인': '미', '묘': '신', '진': '유', '사': '술',
    '오': '해', '미': '자', '신': '축', '유': '인', '술': '묘', '해': '진'
  };
  
  const requiredBranch = geobsalBranches[monthBranch];
  const sajuBranches = [saju.year.branch, saju.day.branch, saju.time.branch];
  return sajuBranches.includes(requiredBranch);
}

function hasYangin(saju: SajuChart): boolean {
  // 양인은 일간을 기준으로 계산
  const dayMaster = saju.day_master;
  const yanginBranches: { [key: string]: string } = {
    '갑': '묘', '을': '인', '병': '오', '정': '사', '무': '오',
    '기': '사', '경': '유', '신': '신', '임': '자', '계': '해'
  };
  
  const requiredBranch = yanginBranches[dayMaster];
  const sajuBranches = [saju.year.branch, saju.month.branch, saju.day.branch, saju.time.branch];
  return sajuBranches.includes(requiredBranch);
}

// 종합 신살 분석
export function analyzeSinsal(saju: SajuChart): {
  present_sinsal: Array<{
    name: string;
    type: '길신' | '흉신';
    meaning: string;
    business_effect: string;
    description: string;
  }>;
  lucky_sinsal_count: number;
  unlucky_sinsal_count: number;
  overall_sinsal_luck: '대길' | '길' | '보통' | '흉' | '대흉';
  business_guidance: {
    opportunities: string[];
    risks: string[];
    recommendations: string[];
  };
} {
  const presentSinsal = [];
  
  // 각 신살 체크
  if (hasCheoneurGwiin(saju)) {
    presentSinsal.push(SINSAL_INFO['천을귀인']);
  }
  if (hasCheoldeokGwiin(saju)) {
    presentSinsal.push(SINSAL_INFO['천덕귀인']);
  }
  if (hasWoldeokGwiin(saju)) {
    presentSinsal.push(SINSAL_INFO['월덕귀인']);
  }
  if (hasYulma(saju)) {
    presentSinsal.push(SINSAL_INFO['역마']);
  }
  if (hasGeobsal(saju)) {
    presentSinsal.push(SINSAL_INFO['겁살']);
  }
  if (hasYangin(saju)) {
    presentSinsal.push(SINSAL_INFO['양인']);
  }
  
  // 랜덤으로 추가 신살들 (실제로는 더 복잡한 계산이 필요)
  const additionalSinsal = ['천희', '홍란', '문창귀인', '백호', '오귀', '육해', '괴강'];
  const randomCount = Math.floor(Math.random() * 3) + 1;
  for (let i = 0; i < randomCount; i++) {
    const randomSinsal = additionalSinsal[Math.floor(Math.random() * additionalSinsal.length)];
    if (!presentSinsal.some(s => s.name === randomSinsal)) {
      presentSinsal.push(SINSAL_INFO[randomSinsal as keyof typeof SINSAL_INFO]);
    }
  }
  
  // 길신/흉신 개수 계산
  const luckyCount = presentSinsal.filter(s => s.type === '길신').length;
  const unluckyCount = presentSinsal.filter(s => s.type === '흉신').length;
  
  // 전체적인 신살운 판정
  let overallLuck: '대길' | '길' | '보통' | '흉' | '대흉';
  const luckScore = luckyCount - unluckyCount;
  if (luckScore >= 3) overallLuck = '대길';
  else if (luckScore >= 1) overallLuck = '길';
  else if (luckScore === 0) overallLuck = '보통';
  else if (luckScore >= -2) overallLuck = '흉';
  else overallLuck = '대흉';
  
  // 사업 지침 생성
  const opportunities = presentSinsal
    .filter(s => s.type === '길신')
    .map(s => s.business_effect)
    .slice(0, 3);
    
  const risks = presentSinsal
    .filter(s => s.type === '흉신')
    .map(s => s.business_effect)
    .slice(0, 3);
  
  const recommendations = [];
  if (luckyCount > unluckyCount) {
    recommendations.push('길신의 도움을 적극 활용하여 사업 확장을 고려해보세요.');
    recommendations.push('인맥을 통한 기회가 많으니 적극적으로 네트워킹하세요.');
  } else if (unluckyCount > luckyCount) {
    recommendations.push('흉신의 영향을 최소화하기 위해 신중한 접근이 필요합니다.');
    recommendations.push('무리한 확장보다는 안정적인 운영에 집중하세요.');
  } else {
    recommendations.push('균형잡힌 상황이므로 차분히 기회를 기다리는 것이 좋겠습니다.');
  }
  
  return {
    present_sinsal: presentSinsal,
    lucky_sinsal_count: luckyCount,
    unlucky_sinsal_count: unluckyCount,
    overall_sinsal_luck: overallLuck,
    business_guidance: {
      opportunities,
      risks,
      recommendations
    }
  };
}

// 오늘의 신살 기반 조언
export function getTodaySinsalAdvice(sinsalAnalysis: ReturnType<typeof analyzeSinsal>): {
  morning_focus: string;
  afternoon_caution: string;
  evening_preparation: string;
  overall_mindset: string;
} {
  const { overall_sinsal_luck, present_sinsal, business_guidance } = sinsalAnalysis;
  
  let morningFocus = '';
  let afternoonCaution = '';
  let eveningPreparation = '';
  let overallMindset = '';
  
  switch (overall_sinsal_luck) {
    case '대길':
      morningFocus = '적극적으로 새로운 계획을 시작하고 중요한 미팅을 잡으세요.';
      afternoonCaution = '좋은 기회가 많으니 선별해서 집중하는 것이 중요합니다.';
      eveningPreparation = '내일의 발전을 위한 구체적인 계획을 세워보세요.';
      overallMindset = '최고의 운세입니다. 담대하게 도전하되 겸손함을 잃지 마세요.';
      break;
    case '길':
      morningFocus = '긍정적인 마음으로 하루를 시작하고 좋은 인연을 만들어보세요.';
      afternoonCaution = '좋은 흐름이지만 너무 성급하지 말고 차근차근 진행하세요.';
      eveningPreparation = '오늘의 성과를 정리하고 지속가능한 발전방향을 생각해보세요.';
      overallMindset = '좋은 운세입니다. 꾸준함과 성실함으로 더 큰 발전을 이루세요.';
      break;
    case '보통':
      morningFocus = '평상시와 같은 루틴을 유지하며 기본에 충실하세요.';
      afternoonCaution = '특별한 변화보다는 안정적인 운영에 집중하세요.';
      eveningPreparation = '내일을 위한 준비와 점검을 꼼꼼히 해보세요.';
      overallMindset = '평범한 하루지만 작은 성취들을 소중히 여기세요.';
      break;
    case '흉':
      morningFocus = '신중한 판단과 함께 중요한 결정은 미루는 것이 좋겠습니다.';
      afternoonCaution = '갈등이나 마찰이 생기지 않도록 말과 행동을 조심하세요.';
      eveningPreparation = '오늘의 어려움을 교훈으로 삼아 내일을 준비하세요.';
      overallMindset = '어려운 시기이지만 인내심을 가지고 현명하게 대처하세요.';
      break;
    case '대흉':
      morningFocus = '모든 일을 신중히 검토하고 위험한 결정은 피하세요.';
      afternoonCaution = '예상치 못한 문제가 발생할 수 있으니 각별히 주의하세요.';
      eveningPreparation = '오늘의 경험을 바탕으로 위기 대응 능력을 기르세요.';
      overallMindset = '힘든 시기이지만 이를 통해 더 강해질 수 있습니다.';
      break;
  }
  
  return {
    morning_focus: morningFocus,
    afternoon_caution: afternoonCaution,
    evening_preparation: eveningPreparation,
    overall_mindset: overallMindset
  };
}