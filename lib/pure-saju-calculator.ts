// 순수 알고리즘 기반 만세력 사주팔자 계산 (하드코딩 없음)

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

// 년주 계산 (입춘 기준)
function getYearStemBranch(year: number, month: number, day: number): { stem: string; branch: string } {
  // 입춘 이전이면 전년도로 계산
  let adjustedYear = year;
  if (month === 1 || (month === 2 && day < 4)) {
    adjustedYear--;
  }
  
  // 60갑자 순환
  // 기준: 1984년 = 갑자년 (천간 0, 지지 0)
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

// 월주 계산 (절기 기준)
function getMonthStemBranch(year: number, month: number, day: number): { stem: string; branch: string } {
  // 절입일 데이터
  const solarTermDates: { [key: number]: { day: number, branch: string } } = {
    1: { day: 6, branch: '축' },    // 소한
    2: { day: 4, branch: '인' },    // 입춘
    3: { day: 6, branch: '묘' },    // 경칩
    4: { day: 5, branch: '진' },    // 청명
    5: { day: 6, branch: '사' },    // 입하
    6: { day: 6, branch: '오' },    // 망종
    7: { day: 7, branch: '미' },    // 소서
    8: { day: 8, branch: '신' },    // 입추
    9: { day: 8, branch: '유' },    // 백로
    10: { day: 8, branch: '술' },   // 한로
    11: { day: 7, branch: '해' },   // 입동
    12: { day: 7, branch: '자' }    // 대설
  };
  
  // 월지 결정
  let monthBranch = '자';
  
  // 9월 4일은 백로(9월 8일) 이전이므로 8월 절기인 신월
  if (month === 9 && day < 8) {
    monthBranch = '신';
  } else if (month === 1 && day < 6) {
    // 1월 6일 소한 이전은 자월
    monthBranch = '자';
  } else {
    const termData = solarTermDates[month];
    if (termData) {
      if (day >= termData.day) {
        monthBranch = termData.branch;
      } else {
        // 절입일 이전이면 이전 달의 지지
        const prevMonth = month === 1 ? 12 : month - 1;
        const prevTermData = solarTermDates[prevMonth];
        monthBranch = prevTermData ? prevTermData.branch : '자';
      }
    }
  }
  
  // 년간에 따른 월간 계산
  const yearPillar = getYearStemBranch(year, month, day);
  const yearStemIndex = HEAVENLY_STEMS.indexOf(yearPillar.stem as any);
  
  // 년간별 인월의 천간 (오포국 법칙)
  // 갑/기년: 병인월
  // 을/경년: 무인월
  // 병/신년: 경인월
  // 정/임년: 임인월
  // 무/계년: 갑인월
  // 무년(index 4)의 경우 갑인월부터 시작
  const monthStemStartForIn = [2, 4, 6, 8, 0, 2, 4, 6, 8, 0];
  const inStemStart = monthStemStartForIn[yearStemIndex];
  
  // 인월부터의 차이 계산
  const monthBranchIndex = EARTHLY_BRANCHES.indexOf(monthBranch as any);
  const inIndex = 2; // 인의 인덱스
  let monthDiff = (monthBranchIndex - inIndex + 12) % 12;
  
  // 월간 = (인월천간 + 월차이) % 10
  // 천간은 순서대로 하나씩 증가
  const monthStemIndex = (inStemStart + monthDiff) % 10;
  
  return {
    stem: HEAVENLY_STEMS[monthStemIndex],
    branch: monthBranch
  };
}

// 일주 계산 (순수 알고리즘)
function getDayStemBranch(year: number, month: number, day: number): { stem: string; branch: string } {
  // Julian Day Number 계산
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  
  const jdn = day + Math.floor((153 * m + 2) / 5) + 365 * y + 
              Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  
  // 1998년 9월 4일의 JDN = 2451061, 이날이 갑인일
  // 이를 역산해서 기준일 찾기
  // 갑=0, 인=2이므로 갑자일(0,0)을 찾아야 함
  // 2451061 - 2(지지 차이) = 2451059가 갑자일이 되는 날
  // 실제로는 더 복잡한 계산이 필요하므로 다른 기준 사용
  
  // 더 정확한 기준: 2000년 1월 7일 = 갑자일 (검증됨)
  const baseJDN = 2451551; // 2000년 1월 7일의 JDN
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

// 시주 계산
function getTimeStemBranch(year: number, month: number, day: number, hour: number, minute: number): { stem: string; branch: string } {
  // 한국 사주 시간 기준 (30분 단위)
  let timeBranch = '자';
  let timeBranchIndex = 0;
  
  // 시간을 분 단위로 변환
  const totalMinutes = hour * 60 + minute;
  
  // 시간별 지지 매핑 (한국 동경 시간 기준)
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

// 검증 함수 (순수하게 테스트용)
export function verifySaju() {
  console.log('=== 순수 알고리즘 만세력 검증 ===\n');
  
  // 검증용 정답 데이터 (알고리즘과 분리)
  const validationData = [
    {
      date: '1998년 9월 4일 19시 16분',
      year: 1998, month: 9, day: 4, hour: 19, minute: 16,
      correct: '무인년 경신월 갑인일 계유시'
    },
    {
      date: '1999년 1월 3일 8시 20분',
      year: 1999, month: 1, day: 3, hour: 8, minute: 20,
      correct: '무인년 갑자월 을묘일 경진시'
    }
  ];
  
  console.log('알고리즘으로 계산한 값과 실제 만세력 비교:\n');
  
  let allCorrect = true;
  
  validationData.forEach((test, index) => {
    const result = calculateSaju(test.year, test.month, test.day, test.hour, test.minute);
    const calculated = `${result.year.stem}${result.year.branch}년 ${result.month.stem}${result.month.branch}월 ${result.day.stem}${result.day.branch}일 ${result.time.stem}${result.time.branch}시`;
    const isCorrect = calculated === test.correct;
    
    console.log(`검증 ${index + 1}: ${test.date}`);
    console.log(`  알고리즘 계산: ${calculated}`);
    console.log(`  실제 만세력값: ${test.correct}`);
    console.log(`  검증 결과: ${isCorrect ? '✅ 일치' : '❌ 불일치'}`);
    console.log('');
    
    if (!isCorrect) allCorrect = false;
  });
  
  console.log(`최종 검증 결과: ${allCorrect ? '✅ 알고리즘 정확!' : '❌ 알고리즘 수정 필요'}`);
  return allCorrect;
}