// 십성(十星) 계산 및 분석 시스템

import { 
  SajuChart, 
  STEM_PROPERTIES, 
  BRANCH_PROPERTIES,
  ELEMENT_RELATIONS,
  TEN_GODS 
} from './saju-calculator-fixed';

// 십성 상세 정보
export const TEN_GODS_INFO = {
  '비견': {
    name: '비견',
    meaning: '형제자매, 동료, 경쟁자',
    personality: ['독립적', '자주적', '경쟁심', '고집'],
    business_aspect: '동업, 파트너십, 경쟁업체',
    positive: '협력과 화합을 통한 성공',
    negative: '과도한 경쟁과 분열'
  },
  '겁재': {
    name: '겁재',
    meaning: '친구, 동료, 투자자',
    personality: ['사교적', '외향적', '변화추구', '투기성'],
    business_aspect: '투자, 확장, 새로운 사업',
    positive: '과감한 투자로 큰 성공',
    negative: '무모한 투자로 인한 손실'
  },
  '식신': {
    name: '식신',
    meaning: '창조력, 표현력, 자유로움',
    personality: ['창의적', '낙관적', '자유분방', '예술적'],
    business_aspect: '창작업, 서비스업, 엔터테인먼트',
    positive: '창의적 아이디어로 새로운 수익창출',
    negative: '계획성 부족으로 인한 실패'
  },
  '상관': {
    name: '상관',
    meaning: '재능, 기술, 변화',
    personality: ['재능있는', '비판적', '변화무쌍', '개혁적'],
    business_aspect: '기술업, 전문직, 혁신업종',
    positive: '뛰어난 실력으로 인정받음',
    negative: '지나친 비판으로 갈등 야기'
  },
  '편재': {
    name: '편재',
    meaning: '활동적 재물, 유동자산',
    personality: ['활동적', '사교적', '기회주의', '현실적'],
    business_aspect: '유통업, 서비스업, 단기투자',
    positive: '활발한 거래로 매출 증대',
    negative: '유동적 손실 위험'
  },
  '정재': {
    name: '정재',
    meaning: '안정적 재물, 고정자산',
    personality: ['신중한', '보수적', '계획적', '근면한'],
    business_aspect: '제조업, 부동산, 장기투자',
    positive: '꾸준한 노력으로 안정적 수입',
    negative: '보수적 사고로 기회 상실'
  },
  '편관': {
    name: '편관',
    meaning: '경쟁, 압박, 도전',
    personality: ['강인한', '도전적', '급진적', '압박감'],
    business_aspect: '경쟁업종, 체인업, 프랜차이즈',
    positive: '강한 추진력으로 시장 개척',
    negative: '과도한 압박으로 스트레스'
  },
  '정관': {
    name: '정관',
    meaning: '질서, 책임, 명예',
    personality: ['책임감', '도덕적', '질서정연', '보수적'],
    business_aspect: '전문직, 공인업종, 브랜드업',
    positive: '신뢰받는 브랜드로 성장',
    negative: '경직된 사고로 혁신 부족'
  },
  '편인': {
    name: '편인',
    meaning: '지식, 연구, 독창성',
    personality: ['학구적', '독창적', '내성적', '신비적'],
    business_aspect: '연구개발, 교육업, 컨설팅',
    positive: '전문지식으로 차별화 성공',
    negative: '현실감각 부족으로 실패'
  },
  '정인': {
    name: '정인',
    meaning: '학습, 보호, 전통',
    personality: ['학습능력', '보호본능', '전통적', '인내심'],
    business_aspect: '전통업종, 교육, 의료',
    positive: '전통과 신뢰를 바탕으로 성장',
    negative: '변화 적응력 부족'
  }
} as const;

// 십성 계산 함수
export function calculateTenGod(dayMaster: string, target: string): string {
  const dayElement = STEM_PROPERTIES[dayMaster as keyof typeof STEM_PROPERTIES].element;
  const targetElement = STEM_PROPERTIES[target as keyof typeof STEM_PROPERTIES].element;
  const dayYinYang = STEM_PROPERTIES[dayMaster as keyof typeof STEM_PROPERTIES].yin_yang;
  const targetYinYang = STEM_PROPERTIES[target as keyof typeof STEM_PROPERTIES].yin_yang;
  
  // 같은 오행인 경우
  if (dayElement === targetElement) {
    return dayYinYang === targetYinYang ? '비견' : '겫재';
  }
  
  // 일간이 생하는 오행 (식상)
  if (ELEMENT_RELATIONS.생[dayElement as keyof typeof ELEMENT_RELATIONS.생] === targetElement) {
    return dayYinYang === targetYinYang ? '식신' : '상관';
  }
  
  // 일간이 극하는 오행 (재성)  
  if (ELEMENT_RELATIONS.극[dayElement as keyof typeof ELEMENT_RELATIONS.극] === targetElement) {
    return dayYinYang === targetYinYang ? '정재' : '편재';
  }
  
  // 일간을 극하는 오행 (관살)
  const elementThatAttackDay = Object.entries(ELEMENT_RELATIONS.극).find(
    ([_, target]) => target === dayElement
  )?.[0];
  if (targetElement === elementThatAttackDay) {
    return dayYinYang === targetYinYang ? '정관' : '편관';
  }
  
  // 일간을 생하는 오행 (인성)
  const elementThatSupportsDay = Object.entries(ELEMENT_RELATIONS.생).find(
    ([_, target]) => target === dayElement  
  )?.[0];
  if (targetElement === elementThatSupportsDay) {
    return dayYinYang === targetYinYang ? '정인' : '편인';
  }
  
  return '비견'; // 기본값
}

// 사주 전체의 십성 분석
export function analyzeTenGods(saju: SajuChart): {
  year_stem_god: string;
  month_stem_god: string;
  day_stem_god: string;
  time_stem_god: string;
  dominant_gods: string[];
  weak_gods: string[];
  business_fortune: {
    money_luck: '강' | '중' | '약';
    authority_luck: '강' | '중' | '약';
    creativity_luck: '강' | '중' | '약';
    competition_luck: '강' | '중' | '약';
    learning_luck: '강' | '중' | '약';
  };
  overall_analysis: string;
} {
  const dayMaster = saju.day_master;
  
  // 각 기둥의 천간에 대한 십성 계산
  const yearGod = calculateTenGod(dayMaster, saju.year.stem);
  const monthGod = calculateTenGod(dayMaster, saju.month.stem);
  const dayGod = '일주'; // 일간은 자신이므로 표시만
  const timeGod = calculateTenGod(dayMaster, saju.time.stem);
  
  // 십성 분포 계산
  const gods = [yearGod, monthGod, timeGod].filter(god => god !== '일주');
  const godCounts: { [key: string]: number } = {};
  
  TEN_GODS.forEach(god => {
    godCounts[god] = gods.filter(g => g === god).length;
  });
  
  // 강한 십성과 약한 십성 찾기
  const maxCount = Math.max(...Object.values(godCounts));
  const dominant = Object.entries(godCounts)
    .filter(([_, count]) => count === maxCount && count > 0)
    .map(([god, _]) => god);
    
  const weak = Object.entries(godCounts)
    .filter(([_, count]) => count === 0)
    .map(([god, _]) => god)
    .slice(0, 3); // 상위 3개만
  
  // 사업운 분석
  const moneyGods = ['정재', '편재'];
  const authorityGods = ['정관', '편관'];  
  const creativityGods = ['식신', '상관'];
  const competitionGods = ['비견', '겫재'];
  const learningGods = ['정인', '편인'];
  
  const calculateLuck = (targetGods: string[]): '강' | '중' | '약' => {
    const count = targetGods.reduce((sum, god) => sum + (godCounts[god] || 0), 0);
    if (count >= 2) return '강';
    if (count === 1) return '중';
    return '약';
  };
  
  // 전체 분석 메시지 생성
  const dominantGodInfo = dominant.length > 0 ? 
    TEN_GODS_INFO[dominant[0] as keyof typeof TEN_GODS_INFO] : null;
    
  const overallAnalysis = dominantGodInfo ? 
    `${dominantGodInfo.name}이 강하게 나타나 ${dominantGodInfo.business_aspect} 방면이 유리합니다. ${dominantGodInfo.positive}하는 성향을 보이며, ${dominantGodInfo.negative}을 주의해야 합니다.` :
    '균형잡힌 사주로 다양한 분야에서 안정적인 발전이 가능합니다.';
  
  return {
    year_stem_god: yearGod,
    month_stem_god: monthGod, 
    day_stem_god: dayGod,
    time_stem_god: timeGod,
    dominant_gods: dominant,
    weak_gods: weak,
    business_fortune: {
      money_luck: calculateLuck(moneyGods),
      authority_luck: calculateLuck(authorityGods),
      creativity_luck: calculateLuck(creativityGods),
      competition_luck: calculateLuck(competitionGods),
      learning_luck: calculateLuck(learningGods)
    },
    overall_analysis: overallAnalysis
  };
}

// 십성별 오늘의 사업 조언
export function getTenGodBusinessAdvice(dominantGod: string, businessType: string): {
  morning_advice: string;
  afternoon_advice: string;
  evening_advice: string;
  lucky_time: string;
  caution_time: string;
  lucky_item: string;
  business_tip: string;
} {
  const godInfo = TEN_GODS_INFO[dominantGod as keyof typeof TEN_GODS_INFO];
  
  // 업종별 맞춤 조언
  const businessAdvice = {
    restaurant: {
      morning: '메뉴 준비와 재료 점검에 집중하세요',
      afternoon: '손님 응대와 서비스 품질에 신경쓰세요', 
      evening: '매출 정리와 내일 준비를 차근차근 하세요',
      tip: '음식의 맛과 서비스로 단골을 만드는 것이 중요합니다'
    },
    cafe: {
      morning: '원두와 디저트 준비, 매장 분위기 조성에 집중하세요',
      afternoon: '고객과의 소통과 SNS 활용에 신경쓰세요',
      evening: '재고 정리와 새로운 메뉴 아이디어를 생각해보세요',
      tip: '분위기와 인스타그램 감성으로 젊은 고객을 유치하세요'
    },
    default: {
      morning: '하루 계획과 목표 설정에 집중하세요',
      afternoon: '고객 응대와 업무 효율성에 신경쓰세요',
      evening: '하루 성과 점검과 내일 계획을 세워보세요',  
      tip: '꾸준함과 신뢰로 고객의 마음을 얻는 것이 중요합니다'
    }
  };
  
  const advice = businessAdvice[businessType as keyof typeof businessAdvice] || businessAdvice.default;
  
  // 십성별 특화 조언
  const godSpecificAdvice = {
    '비견': { lucky_time: '오전 9-11시', caution_time: '오후 3-5시', lucky_item: '파란색 소품' },
    '겫재': { lucky_time: '오후 1-3시', caution_time: '저녁 7-9시', lucky_item: '동전이나 금속 장신구' },
    '식신': { lucky_time: '오전 11시-오후 1시', caution_time: '오후 5-7시', lucky_item: '밝은 색 꽃이나 식물' },
    '상관': { lucky_time: '오후 3-5시', caution_time: '오전 7-9시', lucky_item: '빨간색 아이템' },
    '편재': { lucky_time: '오전 7-9시', caution_time: '저녁 9-11시', lucky_item: '움직이는 장식품' },
    '정재': { lucky_time: '저녁 5-7시', caution_time: '오후 1-3시', lucky_item: '네모난 모양의 물건' },
    '편관': { lucky_time: '저녁 7-9시', caution_time: '오전 9-11시', lucky_item: '검은색 또는 진한 색 아이템' },
    '정관': { lucky_time: '저녁 9-11시', caution_time: '오전 11시-오후 1시', lucky_item: '격식있는 장식품' },
    '편인': { lucky_time: '밤 11시-새벽 1시', caution_time: '오후 3-5시', lucky_item: '책이나 문구용품' },
    '정인': { lucky_time: '새벽 1-3시', caution_time: '저녁 5-7시', lucky_item: '전통적인 소품' }
  };
  
  const timeAdvice = godSpecificAdvice[dominantGod as keyof typeof godSpecificAdvice] || 
                   godSpecificAdvice['비견'];
  
  return {
    morning_advice: advice.morning + (godInfo ? `. ${godInfo.personality[0]} 성향을 살려보세요.` : ''),
    afternoon_advice: advice.afternoon + (godInfo ? `. ${godInfo.positive}에 집중하세요.` : ''),
    evening_advice: advice.evening + (godInfo ? `. ${godInfo.negative}을 피하도록 주의하세요.` : ''),
    lucky_time: timeAdvice.lucky_time,
    caution_time: timeAdvice.caution_time,
    lucky_item: timeAdvice.lucky_item,
    business_tip: advice.tip + (godInfo ? ` ${godInfo.business_aspect} 특성을 살려보세요.` : '')
  };
}