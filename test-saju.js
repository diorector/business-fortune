// Test the Saju calculation
const { calculateSaju } = require('./lib/manseryeok-saju.ts');

function testSaju() {
  const result = calculateSaju(1998, 9, 4, 19, 16);
  
  console.log('Testing: 1998년 9월 4일 19시 16분');
  console.log('Expected: 무인년 경신월 갑인일 계유시');
  console.log('');
  console.log('Result:');
  console.log(`년주: ${result.year.stem}${result.year.branch}`);
  console.log(`월주: ${result.month.stem}${result.month.branch}`);
  console.log(`일주: ${result.day.stem}${result.day.branch}`);
  console.log(`시주: ${result.time.stem}${result.time.branch}`);
  console.log('');
  
  const isCorrect = 
    result.year.stem === '무' && result.year.branch === '인' &&
    result.month.stem === '경' && result.month.branch === '신' &&
    result.day.stem === '갑' && result.day.branch === '인' &&
    result.time.stem === '계' && result.time.branch === '유';
    
  if (isCorrect) {
    console.log('✅ TEST PASSED! All calculations are correct!');
  } else {
    console.log('❌ TEST FAILED! Calculations need fixing.');
    console.log('');
    console.log('Differences:');
    if (result.year.stem !== '무' || result.year.branch !== '인') {
      console.log(`  Year: Got ${result.year.stem}${result.year.branch}, expected 무인`);
    }
    if (result.month.stem !== '경' || result.month.branch !== '신') {
      console.log(`  Month: Got ${result.month.stem}${result.month.branch}, expected 경신`);
    }
    if (result.day.stem !== '갑' || result.day.branch !== '인') {
      console.log(`  Day: Got ${result.day.stem}${result.day.branch}, expected 갑인`);
    }
    if (result.time.stem !== '계' || result.time.branch !== '유') {
      console.log(`  Time: Got ${result.time.stem}${result.time.branch}, expected 계유`);
    }
  }
}

testSaju();