// 기존 호환성을 위한 Fortune 인터페이스 유지
export interface Fortune {
  score: number;
  stars: number;
  sales: {
    prediction: string;
    advice: string;
  };
  customers: {
    prediction: string;
    advice: string;
  };
  events: {
    prediction: string;
    advice: string;
  };
  warnings: {
    prediction: string;
    advice: string;
  };
  luckyItem: {
    item: string;
    description: string;
  };
  summary: string;
}

// 사주 시스템에서 타입과 데이터를 가져옴
export type { BusinessType } from './saju-calculator-fixed';
export { businessTypes } from './saju-calculator-fixed';

const fortuneData = {
  restaurant: {
    sales: {
      high: [
        { prediction: '오늘은 특별한 손님들이 많이 찾아올 예정이에요', advice: '메뉴판을 깔끔하게 정리하고 추천 메뉴를 강조해보세요' },
        { prediction: '점심시간대에 예상보다 많은 주문이 들어올 것 같아요', advice: '재료 준비를 넉넉히 하시고, 직원분들과 미리 소통해두세요' },
        { prediction: '새로운 단골손님이 생기는 좋은 하루가 될 거예요', advice: '친근한 서비스와 맛있는 음식으로 좋은 인상을 남기세요' },
      ],
      medium: [
        { prediction: '평소와 비슷한 매출을 기대할 수 있어요', advice: '기본에 충실하며 꾸준한 서비스 품질을 유지해보세요' },
        { prediction: '오후 시간대에 손님이 몰릴 수 있어요', advice: '테이블 정리를 미리 해두시고, 웨이팅 관리에 신경써주세요' },
      ],
      low: [
        { prediction: '평소보다 조용한 하루가 될 수 있어요', advice: '이런 날은 청소나 정리정돈에 시간을 투자해보세요' },
        { prediction: '손님이 적은 대신 단골분들이 오실 것 같아요', advice: '단골손님들께 더욱 정성스러운 서비스로 보답해드리세요' },
      ]
    },
    customers: {
      high: ['젊은 손님들이 많이 찾아올 예정', '가족 단위 손님들의 방문 증가', '직장인들의 회식 문의가 들어올 수 있음'],
      medium: ['평소와 비슷한 연령대의 손님들', '단골손님들 위주의 방문'],
      low: ['조용한 분위기를 선호하는 손님들', '혼밥하시는 분들이 주로 방문']
    },
    events: {
      positive: ['근처 행사로 인한 유동인구 증가', '맛집 블로거의 방문 가능성', '음식 배달 주문 증가'],
      neutral: ['평범하지만 안정적인 하루', '특별한 이벤트는 없지만 꾸준한 운영'],
      negative: ['날씨나 교통 상황으로 인한 약간의 영향', '경쟁업체의 할인 이벤트 주의']
    },
    warnings: [
      '재료 관리에 특히 신경써주세요',
      '음식 온도 관리를 철저히 해주세요',
      '위생 관리에 평소보다 더 주의하세요',
      '카드 결제 시스템 점검을 미리 해두세요',
      '직원분들과의 원활한 소통이 중요해요'
    ],
    luckyItems: [
      { item: '빨간 앞치마', description: '오늘은 빨간색 앞치마를 착용하면 손님들에게 더욱 친근하게 다가갈 수 있어요' },
      { item: '새 메뉴판', description: '메뉴판을 새롭게 정리하면 주문량이 늘어날 수 있어요' },
      { item: '향긋한 허브', description: '바질이나 로즈마리 같은 허브를 활용한 요리로 특별함을 더해보세요' },
      { item: '웃는 얼굴', description: '밝은 미소는 가장 강력한 매출 상승 아이템이에요' },
    ]
  },
  cafe: {
    sales: {
      high: [
        { prediction: '오늘은 디저트와 음료 주문이 많이 들어올 것 같아요', advice: '인기 디저트와 시그니처 음료 재료를 충분히 준비해두세요' },
        { prediction: '오후 시간대에 스터디 카페 손님들이 많이 올 예정이에요', advice: '콘센트와 Wi-Fi 상태를 미리 점검해주세요' },
        { prediction: '새로운 단골이 될 수 있는 손님이 방문할 거예요', advice: '친절한 서비스와 카페 분위기 조성에 신경써주세요' },
      ],
      medium: [
        { prediction: '평소와 비슷한 매출을 예상할 수 있어요', advice: '기본 메뉴의 품질 관리에 집중해보세요' },
        { prediction: '테이크아웃 주문이 늘어날 것 같아요', advice: '포장 용기와 홀더를 넉넉히 준비해두세요' },
      ],
      low: [
        { prediction: '여유로운 하루가 될 수 있어요', advice: '이런 날은 원두 정리나 머신 관리에 시간을 투자해보세요' },
        { prediction: '단골손님들 위주로 방문하실 것 같아요', advice: '단골분들과 더 많은 대화를 나누며 관계를 돈독히 해보세요' },
      ]
    },
    customers: {
      high: ['20-30대 젊은층 손님들', '학생들과 직장인들', '카페 데이트하는 커플들'],
      medium: ['평소 단골손님들', '동네 주민분들'],
      low: ['조용히 책 읽는 손님들', '혼자 시간을 보내는 분들']
    },
    events: {
      positive: ['인스타 맛집으로 소개될 가능성', '근처 학교나 회사의 주문 증가', '카페 이벤트 참여도 증가'],
      neutral: ['평범하지만 안정적인 카페 운영', '단골손님들의 꾸준한 방문'],
      negative: ['날씨로 인한 매출 영향 가능성', '배달앱 수수료 부담 증가']
    },
    warnings: [
      '원두 보관 상태를 점검해주세요',
      '머신 청소를 철저히 해주세요',
      '유통기한 관리에 신경써주세요',
      'Wi-Fi와 음향 시설을 점검해보세요',
      '테이블 정리정돈을 자주 해주세요'
    ],
    luckyItems: [
      { item: '새로운 원두', description: '특별한 원두로 시그니처 음료를 만들어보세요' },
      { item: '예쁜 라떼아트', description: '정성스러운 라떼아트로 손님들의 마음을 사로잡아보세요' },
      { item: '향긋한 디저트', description: '갓 구운 디저트의 향으로 더 많은 손님을 유치할 수 있어요' },
      { item: '따뜻한 조명', description: '아늑한 조명으로 카페 분위기를 한층 업그레이드해보세요' },
    ]
  }
};

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function getRandomElement<T>(arr: T[], seed: number, index: number): T {
  const randomIndex = (seed + index * 7) % arr.length;
  return arr[randomIndex];
}

function generateFortuneScore(seed: number): number {
  const baseScore = 30 + (seed % 71);
  return Math.min(100, Math.max(10, baseScore));
}

function generateStars(score: number): number {
  if (score >= 90) return 5;
  if (score >= 75) return 4;
  if (score >= 60) return 3;
  if (score >= 45) return 2;
  return 1;
}

export function generateFortune(businessType: string, ownerName: string, date: string): Fortune {
  const seedString = `${businessType}-${ownerName}-${date}`;
  const seed = simpleHash(seedString);
  
  const score = generateFortuneScore(seed);
  const stars = generateStars(score);
  
  const businessData = fortuneData[businessType as keyof typeof fortuneData] || fortuneData.restaurant;
  
  let salesLevel: 'high' | 'medium' | 'low';
  if (score >= 75) salesLevel = 'high';
  else if (score >= 50) salesLevel = 'medium';
  else salesLevel = 'low';
  
  const sales = getRandomElement(businessData.sales[salesLevel], seed, 1);
  const customersData = businessData.customers[salesLevel];
  const customerPrediction = getRandomElement(customersData, seed, 2);
  
  let eventLevel: 'positive' | 'neutral' | 'negative';
  if (score >= 70) eventLevel = 'positive';
  else if (score >= 40) eventLevel = 'neutral';
  else eventLevel = 'negative';
  
  const eventPrediction = getRandomElement(businessData.events[eventLevel], seed, 3);
  const warning = getRandomElement(businessData.warnings, seed, 4);
  const luckyItem = getRandomElement(businessData.luckyItems, seed, 5);
  
  const summaries = [
    `${ownerName} 사장님, 오늘은 ${score}점의 운세로 ${stars}개의 별을 받으셨어요! 긍정적인 마음가짐으로 하루를 시작해보세요.`,
    `오늘 ${ownerName} 사장님의 운세는 ${score}점이네요! ${stars === 5 ? '최고의' : stars >= 3 ? '좋은' : '평범한'} 하루가 될 것 같아요.`,
    `${score}점의 운세와 함께 ${stars}개의 별이 ${ownerName} 사장님을 응원하고 있어요! 오늘도 화이팅하세요!`,
  ];
  
  const summary = getRandomElement(summaries, seed, 6);
  
  return {
    score,
    stars,
    sales: {
      prediction: sales.prediction,
      advice: sales.advice,
    },
    customers: {
      prediction: customerPrediction,
      advice: '손님들과의 소통을 늘리고 친근한 서비스로 좋은 인상을 남겨보세요.',
    },
    events: {
      prediction: eventPrediction,
      advice: '기회가 오면 놓치지 말고, 어려움이 있어도 긍정적으로 대처해보세요.',
    },
    warnings: {
      prediction: warning,
      advice: '미리 준비하고 체크하면 더 원활한 하루를 보낼 수 있어요.',
    },
    luckyItem,
    summary,
  };
}

export function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}