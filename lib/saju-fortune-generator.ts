// 사주 기반 장사 운세 생성 시스템

import { 
  calculateSaju, 
  analyzeSajuStrength, 
  SajuChart,
  BusinessType,
  businessTypes 
} from './final-saju-calculator';
import { 
  analyzeTenGods, 
  getTenGodBusinessAdvice 
} from './ten-gods-system';
import { 
  analyzeSinsal, 
  getTodaySinsalAdvice 
} from './sinsal-system';
import { 
  getComprehensiveFortune,
  LuckPeriod 
} from './luck-cycles';

// 사주 기반 운세 정보
export interface SajuBasedFortune {
  // 기본 정보
  personal_info: {
    name: string;
    business_type: string;
    birth_date: string;
    age: number;
  };
  
  // 사주 기본
  saju_chart: SajuChart;
  
  // 종합 점수 (기존 호환성 유지)
  score: number;
  stars: number;
  
  // 사주 기반 상세 분석
  saju_analysis: {
    day_master_element: string;
    strength: '강' | '약';
    supporting_elements: string[];
    dominant_ten_gods: string[];
    major_sinsal: string[];
    luck_level: '대길' | '길' | '보통' | '흉' | '대흉';
  };
  
  // 시간대별 길흉 (12시간대)
  hourly_fortune: Array<{
    time_period: string;
    branch: string;
    luck: '길' | '보통' | '흉';
    business_advice: string;
    lucky_activity: string;
  }>;
  
  // 기존 포맷과 호환 (업그레이드된 내용)
  sales: {
    prediction: string;
    advice: string;
    trend: '상승' | '보통' | '하락';
  };
  
  customers: {
    prediction: string;
    advice: string;
    target_type: string;
  };
  
  events: {
    prediction: string;
    advice: string;
    opportunities: string[];
  };
  
  warnings: {
    prediction: string;
    advice: string;
    risk_factors: string[];
  };
  
  luckyItem: {
    item: string;
    description: string;
    usage_time: string;
  };
  
  // 운세 주기별 정보
  luck_cycles: {
    daeun: LuckPeriod;
    saeun: LuckPeriod;
    ilun: LuckPeriod;
    overall_trend: string;
    business_recommendation: string;
  };
  
  // 월간 트렌드 (간단 버전)
  monthly_trend: {
    current_month_luck: '상승' | '안정' | '주의';
    next_month_preview: string;
    quarterly_outlook: string;
  };
  
  summary: string;
}

// 시간대별 길흉 분석
function analyzeHourlyFortune(saju: SajuChart, businessType: string): Array<{
  time_period: string;
  branch: string;
  luck: '길' | '보통' | '흉';
  business_advice: string;
  lucky_activity: string;
}> {
  const timeBranches = [
    { period: '23:00-01:00', branch: '자', name: '자시' },
    { period: '01:00-03:00', branch: '축', name: '축시' },
    { period: '03:00-05:00', branch: '인', name: '인시' },
    { period: '05:00-07:00', branch: '묘', name: '묘시' },
    { period: '07:00-09:00', branch: '진', name: '진시' },
    { period: '09:00-11:00', branch: '사', name: '사시' },
    { period: '11:00-13:00', branch: '오', name: '오시' },
    { period: '13:00-15:00', branch: '미', name: '미시' },
    { period: '15:00-17:00', branch: '신', name: '신시' },
    { period: '17:00-19:00', branch: '유', name: '유시' },
    { period: '19:00-21:00', branch: '술', name: '술시' },
    { period: '21:00-23:00', branch: '해', name: '해시' }
  ];

  const businessAdviceMap = {
    restaurant: {
      길: '맛있는 음식으로 고객의 마음을 사로잡으세요',
      보통: '기본에 충실한 서비스를 제공하세요',
      흉: '위생과 안전에 특별히 주의하세요'
    },
    cafe: {
      길: '분위기 좋은 공간으로 고객을 맞이하세요',
      보통: '꾸준한 품질의 음료를 제공하세요',
      흉: '원두 관리와 청결에 신경쓰세요'
    },
    default: {
      길: '적극적인 영업으로 기회를 잡으세요',
      보통: '차분하게 업무에 집중하세요',
      흉: '신중한 판단으로 실수를 방지하세요'
    }
  };

  const activities = {
    길: ['중요한 거래', '신메뉴 출시', '마케팅 활동', '고객 상담', '계약 체결'],
    보통: ['일반 업무', '재고 정리', '직원 교육', '매장 점검', '회계 정리'],
    흉: ['휴식 시간', '청소 및 정비', '계획 수립', '학습 시간', '명상 및 성찰']
  };

  return timeBranches.map(time => {
    // 간단한 길흉 계산 (실제로는 더 복잡한 사주 계산 필요)
    const dayMasterElement = saju.day.element_stem;
    const timeElement = saju.time.element_branch;
    
    let luck: '길' | '보통' | '흉' = '보통';
    if (dayMasterElement === timeElement) {
      luck = '길';
    } else if (Math.random() > 0.7) {
      luck = '흉';
    } else if (Math.random() > 0.4) {
      luck = '길';
    }

    const businessAdvices = businessAdviceMap[businessType as keyof typeof businessAdviceMap] || businessAdviceMap.default;
    const activityList = activities[luck];
    
    return {
      time_period: `${time.name} (${time.period})`,
      branch: time.branch,
      luck,
      business_advice: businessAdvices[luck],
      lucky_activity: activityList[Math.floor(Math.random() * activityList.length)]
    };
  });
}

// 점수 계산 (기존 호환성)
function calculateFortuneScore(
  tenGodsAnalysis: ReturnType<typeof analyzeTenGods>,
  sinsalAnalysis: ReturnType<typeof analyzeSinsal>,
  comprehensiveFortune: ReturnType<typeof getComprehensiveFortune>
): number {
  let baseScore = 50;
  
  // 십성 운 반영
  const businessLucks = Object.values(tenGodsAnalysis.business_fortune);
  const strongLucks = businessLucks.filter(luck => luck === '강').length;
  const weakLucks = businessLucks.filter(luck => luck === '약').length;
  baseScore += (strongLucks * 10) - (weakLucks * 5);
  
  // 신살 운 반영
  baseScore += (sinsalAnalysis.lucky_sinsal_count * 8) - (sinsalAnalysis.unlucky_sinsal_count * 6);
  
  // 대운/세운/일운 반영
  const luckLevels = [
    comprehensiveFortune.daeun.current_daeun.overall_luck,
    comprehensiveFortune.saeun.overall_luck,
    comprehensiveFortune.ilun.overall_luck
  ];
  
  luckLevels.forEach(level => {
    if (level === '대길') baseScore += 15;
    else if (level === '길') baseScore += 8;
    else if (level === '흉') baseScore -= 8;
    else if (level === '대흉') baseScore -= 15;
  });
  
  return Math.max(10, Math.min(100, baseScore));
}

// 메인 사주 기반 운세 생성 함수
export function generateSajuBasedFortune(
  ownerName: string,
  businessType: string,
  birthYear: number,
  birthMonth: number,
  birthDay: number,
  birthHour: number,
  currentAge: number,
  targetDate: string = new Date().toISOString().split('T')[0]
): SajuBasedFortune {
  // 사주 계산
  const saju = calculateSaju(birthYear, birthMonth, birthDay, birthHour);
  const sajuStrength = analyzeSajuStrength(saju);
  
  // 각종 분석
  const tenGodsAnalysis = analyzeTenGods(saju);
  const sinsalAnalysis = analyzeSinsal(saju);
  const currentYear = new Date().getFullYear();
  const today = new Date();
  const comprehensiveFortune = getComprehensiveFortune(saju, currentAge, currentYear, today);
  
  // 십성 기반 사업 조언
  const dominantGod = tenGodsAnalysis.dominant_gods[0] || '비견';
  const businessAdvice = getTenGodBusinessAdvice(dominantGod, businessType);
  const sinsalAdvice = getTodaySinsalAdvice(sinsalAnalysis);
  
  // 시간대별 분석
  const hourlyFortune = analyzeHourlyFortune(saju, businessType);
  
  // 점수 및 별점 계산
  const score = calculateFortuneScore(tenGodsAnalysis, sinsalAnalysis, comprehensiveFortune);
  const stars = Math.ceil(score / 20);
  
  // 월간 트렌드 (간단 분석)
  const monthlyTrend = {
    current_month_luck: score >= 70 ? '상승' as const : score >= 50 ? '안정' as const : '주의' as const,
    next_month_preview: score >= 60 ? '긍정적인 변화가 예상됩니다' : '꾸준한 노력이 필요한 시기입니다',
    quarterly_outlook: comprehensiveFortune.business_recommendation
  };
  
  // 업종별 맞춤 예측 생성
  const businessTypeInfo = businessTypes.find(bt => bt.id === businessType);
  const businessName = businessTypeInfo?.name || '사업';
  
  // 매출 예측
  const salesTrend = comprehensiveFortune.daeun.current_daeun.business_fortune.sales;
  const salesPredictions = {
    상승: `${businessName}에서 매출 증가가 기대됩니다. 신규 고객 유입이 활발해질 것 같아요.`,
    보통: `${businessName} 매출이 평소 수준을 유지할 것으로 보입니다.`,
    하락: `${businessName} 매출에 다소 주의가 필요한 시기입니다.`
  };
  
  // 고객 예측  
  const customerTrend = comprehensiveFortune.daeun.current_daeun.business_fortune.customers;
  const customerPredictions = {
    증가: `새로운 고객층의 관심을 받을 가능성이 높습니다.`,
    보통: `기존 단골고객들의 꾸준한 방문이 예상됩니다.`,
    감소: `고객 관리에 더욱 신경써야 할 때입니다.`
  };
  
  return {
    personal_info: {
      name: ownerName,
      business_type: businessName,
      birth_date: saju.birth_info.solar_date.toLocaleDateString('ko-KR'),
      age: currentAge
    },
    
    saju_chart: saju,
    
    score,
    stars,
    
    saju_analysis: {
      day_master_element: saju.day.element_stem,
      strength: sajuStrength.day_master_strength,
      supporting_elements: sajuStrength.supporting_elements,
      dominant_ten_gods: tenGodsAnalysis.dominant_gods,
      major_sinsal: sinsalAnalysis.present_sinsal.slice(0, 3).map(s => s.name),
      luck_level: comprehensiveFortune.ilun.overall_luck
    },
    
    hourly_fortune: hourlyFortune,
    
    sales: {
      prediction: salesPredictions[salesTrend],
      advice: businessAdvice.business_tip,
      trend: salesTrend
    },
    
    customers: {
      prediction: customerPredictions[customerTrend],
      advice: '고객과의 소통을 늘리고 친근한 서비스로 좋은 인상을 남겨보세요.',
      target_type: dominantGod === '식신' || dominantGod === '상관' ? '젊은층' : 
                   dominantGod === '정인' || dominantGod === '편인' ? '중장년층' : '전 연령층'
    },
    
    events: {
      prediction: sinsalAnalysis.lucky_sinsal_count > sinsalAnalysis.unlucky_sinsal_count ? 
        '좋은 기회와 인연이 찾아올 수 있습니다.' : '평범하지만 안정적인 하루가 될 것 같습니다.',
      advice: sinsalAdvice.morning_focus,
      opportunities: sinsalAnalysis.business_guidance.opportunities.slice(0, 2)
    },
    
    warnings: {
      prediction: sinsalAnalysis.unlucky_sinsal_count > 0 ? 
        '몇 가지 주의사항이 있어 보입니다.' : '특별히 조심할 점은 없어 보입니다.',
      advice: businessAdvice.afternoon_advice,
      risk_factors: sinsalAnalysis.business_guidance.risks.slice(0, 2)
    },
    
    luckyItem: {
      item: businessAdvice.lucky_item,
      description: `오늘은 ${businessAdvice.lucky_item}를 활용하면 사업에 도움이 될 것 같아요.`,
      usage_time: businessAdvice.lucky_time
    },
    
    luck_cycles: {
      daeun: comprehensiveFortune.daeun.current_daeun,
      saeun: comprehensiveFortune.saeun,
      ilun: comprehensiveFortune.ilun,
      overall_trend: comprehensiveFortune.overall_analysis,
      business_recommendation: comprehensiveFortune.business_recommendation
    },
    
    monthly_trend: monthlyTrend,
    
    summary: `${ownerName} 사장님, 오늘은 ${score}점의 운세로 ${stars}개의 별을 받으셨어요! ${saju.day_master}(${saju.day.element_stem}行)의 ${sajuStrength.day_master_strength}한 일간을 바탕으로, ${dominantGod}의 기운이 사업에 도움을 줄 것 같습니다. ${comprehensiveFortune.overall_analysis}`
  };
}

// 간단 버전 (기존 호환성 유지)
export function generateSimpleFortune(
  businessType: string,
  ownerName: string,
  date: string
): {
  score: number;
  stars: number;
  sales: { prediction: string; advice: string };
  customers: { prediction: string; advice: string };
  events: { prediction: string; advice: string };
  warnings: { prediction: string; advice: string };
  luckyItem: { item: string; description: string };
  summary: string;
} {
  // 기본값으로 간단한 사주 생성 (실제로는 사용자 입력 필요)
  const defaultYear = 1985;
  const defaultMonth = 6;
  const defaultDay = 15;
  const defaultHour = 12;
  const defaultAge = new Date().getFullYear() - defaultYear;
  
  const fullFortune = generateSajuBasedFortune(
    ownerName,
    businessType,
    defaultYear,
    defaultMonth,
    defaultDay,
    defaultHour,
    defaultAge,
    date
  );
  
  return {
    score: fullFortune.score,
    stars: fullFortune.stars,
    sales: fullFortune.sales,
    customers: fullFortune.customers,
    events: fullFortune.events,
    warnings: fullFortune.warnings,
    luckyItem: fullFortune.luckyItem,
    summary: fullFortune.summary
  };
}

// 기존 함수들과 호환성 유지
export { businessTypes };
export function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}