'use client';

import { useState, useEffect } from 'react';
import { Sparkles, RefreshCcw, Star, Calendar } from 'lucide-react';
import BusinessSelector from '@/components/BusinessSelector';
import FortuneCard from '@/components/FortuneCard';
import ShareButton from '@/components/ShareButton';
import BirthInfoInput, { BirthInfo, createDefaultBirthInfo } from '@/components/BirthInfoInput';
import SajuChart from '@/components/SajuChart';
import { 
  generateSajuBasedFortune,
  generateSimpleFortune,
  getTodayDate, 
  businessTypes,
  type SajuBasedFortune
} from '@/lib/saju-fortune-generator';
import { calculateSaju } from '@/lib/final-saju-calculator';
import type { BusinessType } from '@/lib/final-saju-calculator';

type FortuneMode = 'simple' | 'detailed';

export default function Home() {
  const [mode, setMode] = useState<FortuneMode>('simple');
  const [ownerName, setOwnerName] = useState('');
  const [selectedBusiness, setSelectedBusiness] = useState('');
  const [birthInfo, setBirthInfo] = useState<BirthInfo>(createDefaultBirthInfo());
  const [fortune, setFortune] = useState<any>(null);
  const [sajuFortune, setSajuFortune] = useState<SajuBasedFortune | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showFortune, setShowFortune] = useState(false);
  const [currentStep, setCurrentStep] = useState<'info' | 'birth' | 'result'>('info');

  const selectedBusinessType = businessTypes.find(b => b.id === selectedBusiness);

  const handleSimpleFortune = async () => {
    if (!ownerName.trim() || !selectedBusiness) return;

    setIsLoading(true);
    setShowFortune(false);

    // 로딩 애니메이션을 위한 딜레이
    await new Promise(resolve => setTimeout(resolve, 1500));

    const todayFortune = generateSimpleFortune(
      selectedBusiness,
      ownerName.trim(),
      getTodayDate()
    );

    setFortune(todayFortune);
    setIsLoading(false);
    setShowFortune(true);
    setCurrentStep('result');
  };

  const handleDetailedFortune = async () => {
    if (!birthInfo.name.trim() || !selectedBusiness || !birthInfo.year || !birthInfo.month || !birthInfo.day) return;

    setIsLoading(true);
    setShowFortune(false);

    // 로딩 애니메이션을 위한 딜레이
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      const currentAge = new Date().getFullYear() - birthInfo.year;
      const sajuBasedFortune = generateSajuBasedFortune(
        birthInfo.name.trim(),
        selectedBusiness,
        birthInfo.year,
        birthInfo.month,
        birthInfo.day,
        birthInfo.hour,
        currentAge,
        getTodayDate()
      );

      setSajuFortune(sajuBasedFortune);
      setIsLoading(false);
      setShowFortune(true);
      setCurrentStep('result');
    } catch (error) {
      console.error('사주 계산 오류:', error);
      setIsLoading(false);
      alert('사주 계산 중 오류가 발생했습니다. 입력 정보를 확인해주세요.');
    }
  };

  const handleModeChange = (newMode: FortuneMode) => {
    setMode(newMode);
    setCurrentStep('info');
    setShowFortune(false);
    setFortune(null);
    setSajuFortune(null);
    
    if (newMode === 'detailed') {
      setBirthInfo({ ...birthInfo, name: ownerName });
    }
  };

  const handleNextStep = () => {
    if (currentStep === 'info') {
      setCurrentStep('birth');
    } else if (currentStep === 'birth') {
      handleDetailedFortune();
    }
  };

  const handlePrevStep = () => {
    if (currentStep === 'birth') {
      setCurrentStep('info');
    }
  };

  const handleRefresh = () => {
    setFortune(null);
    setShowFortune(false);
    setIsLoading(false);
  };

  const canGenerateSimple = ownerName.trim().length > 0 && selectedBusiness.length > 0;
  const canGenerateDetailed = mode === 'detailed' && 
    birthInfo.name.trim().length > 0 && 
    selectedBusiness.length > 0 && 
    birthInfo.year > 0 && 
    birthInfo.month > 0 && 
    birthInfo.day > 0;
  const canProceedToNext = currentStep === 'info' && canGenerateSimple;
  const canGenerateFinal = currentStep === 'birth' && canGenerateDetailed;

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* 헤더 */}
        <div className="text-center space-y-6 animate-fade-in">
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="text-fortune-gold animate-bounce-subtle" size={32} />
            <h1 className="text-3xl md:text-4xl font-bold text-fortune-deep">
              사주 기반 장사 운세
            </h1>
            <Sparkles className="text-fortune-gold animate-bounce-subtle" size={32} />
          </div>
          <p className="text-gray-600 leading-relaxed">
            정통 사주명리학에 기반한 자영업자 맞춤 운세!<br/>
            생년월일시로 정밀한 사주 분석과 함께 사업 운세를 확인하세요.
          </p>
          
          {/* 모드 선택 */}
          {!showFortune && (
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => handleModeChange('simple')}
                className={`px-6 py-3 rounded-lg border-2 transition-all duration-300 ${
                  mode === 'simple'
                    ? 'bg-fortune-gold text-fortune-deep border-fortune-gold shadow-md'
                    : 'bg-white/80 text-gray-700 border-fortune-gold/30 hover:border-fortune-gold/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Star size={16} />
                  <span className="font-medium">간단 운세</span>
                </div>
                <p className="text-xs mt-1 opacity-80">이름과 업종으로 빠르게</p>
              </button>
              
              <button
                onClick={() => handleModeChange('detailed')}
                className={`px-6 py-3 rounded-lg border-2 transition-all duration-300 ${
                  mode === 'detailed'
                    ? 'bg-fortune-gold text-fortune-deep border-fortune-gold shadow-md'
                    : 'bg-white/80 text-gray-700 border-fortune-gold/30 hover:border-fortune-gold/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span className="font-medium">정밀 사주</span>
                </div>
                <p className="text-xs mt-1 opacity-80">생년월일시로 상세하게</p>
              </button>
            </div>
          )}
        </div>

        {!showFortune && (
          <div className="space-y-6 animate-slide-up">
            {/* 간단 운세 모드 */}
            {mode === 'simple' && (
              <>
                {/* 사업자명 입력 */}
                <div className="fortune-card p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-center text-fortune-deep">
                    사업자명을 입력해주세요
                  </h3>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      placeholder="예: 김사장, 이대표, 박사장님"
                      className="w-full px-4 py-3 rounded-lg border border-fortune-gold/30
                               focus:ring-2 focus:ring-fortune-gold focus:border-fortune-gold
                               focus:outline-none transition-all bg-white/80 backdrop-blur-sm"
                      maxLength={20}
                      disabled={isLoading}
                    />
                    <p className="text-xs text-gray-500 text-center">
                      실명이 아니어도 괜찮아요! 평소 부르는 호칭을 입력하세요.
                    </p>
                  </div>
                </div>

                {/* 업종 선택 */}
                <div className="fortune-card p-6">
                  <BusinessSelector
                    businessTypes={businessTypes}
                    selectedBusiness={selectedBusiness}
                    onBusinessSelect={setSelectedBusiness}
                    disabled={isLoading}
                  />
                </div>

                {/* 간단 운세 보기 버튼 */}
                <div className="text-center">
                  <button
                    onClick={handleSimpleFortune}
                    disabled={!canGenerateSimple || isLoading}
                    className={`
                      fortune-button text-lg px-8 py-4 
                      disabled:opacity-50 disabled:cursor-not-allowed 
                      disabled:transform-none
                      ${canGenerateSimple ? 'animate-bounce-subtle' : ''}
                    `}
                  >
                    {isLoading ? (
                      <>
                        <div className="loading-spinner mr-2"></div>
                        운세를 확인하는 중...
                      </>
                    ) : (
                      <>
                        <Sparkles size={20} className="mr-2" />
                        간단 운세 보기
                      </>
                    )}
                  </button>
                  
                  {!canGenerateSimple && (
                    <p className="text-sm text-gray-500 mt-2">
                      사업자명과 업종을 모두 선택해주세요
                    </p>
                  )}
                </div>
              </>
            )}

            {/* 정밀 사주 모드 */}
            {mode === 'detailed' && (
              <>
                {currentStep === 'info' && (
                  <>
                    {/* 사업자명 입력 */}
                    <div className="fortune-card p-6 space-y-4">
                      <h3 className="text-lg font-semibold text-center text-fortune-deep">
                        사업자명을 입력해주세요
                      </h3>
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={ownerName}
                          onChange={(e) => {
                            setOwnerName(e.target.value);
                            setBirthInfo(prev => ({ ...prev, name: e.target.value }));
                          }}
                          placeholder="예: 김사장, 이대표, 박사장님"
                          className="w-full px-4 py-3 rounded-lg border border-fortune-gold/30
                                   focus:ring-2 focus:ring-fortune-gold focus:border-fortune-gold
                                   focus:outline-none transition-all bg-white/80 backdrop-blur-sm"
                          maxLength={20}
                          disabled={isLoading}
                        />
                        <p className="text-xs text-gray-500 text-center">
                          정밀한 사주 분석을 위해 정확한 정보를 입력해주세요.
                        </p>
                      </div>
                    </div>

                    {/* 업종 선택 */}
                    <div className="fortune-card p-6">
                      <BusinessSelector
                        businessTypes={businessTypes}
                        selectedBusiness={selectedBusiness}
                        onBusinessSelect={setSelectedBusiness}
                        disabled={isLoading}
                      />
                    </div>

                    {/* 다음 단계 버튼 */}
                    <div className="text-center">
                      <button
                        onClick={handleNextStep}
                        disabled={!canProceedToNext}
                        className={`
                          fortune-button text-lg px-8 py-4 
                          disabled:opacity-50 disabled:cursor-not-allowed 
                          disabled:transform-none
                          ${canProceedToNext ? 'animate-bounce-subtle' : ''}
                        `}
                      >
                        <Calendar size={20} className="mr-2" />
                        생년월일시 입력하기
                      </button>
                      
                      {!canProceedToNext && (
                        <p className="text-sm text-gray-500 mt-2">
                          사업자명과 업종을 모두 선택해주세요
                        </p>
                      )}
                    </div>
                  </>
                )}

                {currentStep === 'birth' && (
                  <>
                    {/* 생년월일시 입력 */}
                    <BirthInfoInput
                      birthInfo={birthInfo}
                      onBirthInfoChange={setBirthInfo}
                      disabled={isLoading}
                    />

                    {/* 사주 분석 버튼 */}
                    <div className="flex gap-3">
                      <button
                        onClick={handlePrevStep}
                        className="flex-1 bg-white/80 backdrop-blur-sm border border-fortune-gold/30
                                 px-4 py-3 rounded-lg transition-all duration-300
                                 hover:bg-fortune-warm text-fortune-deep
                                 flex items-center justify-center gap-2"
                      >
                        ← 이전으로
                      </button>
                      
                      <button
                        onClick={handleDetailedFortune}
                        disabled={!canGenerateFinal || isLoading}
                        className={`
                          flex-2 fortune-button text-lg px-8 py-4 
                          disabled:opacity-50 disabled:cursor-not-allowed 
                          disabled:transform-none
                          ${canGenerateFinal ? 'animate-bounce-subtle' : ''}
                        `}
                      >
                        {isLoading ? (
                          <>
                            <div className="loading-spinner mr-2"></div>
                            사주를 분석하는 중...
                          </>
                        ) : (
                          <>
                            <Sparkles size={20} className="mr-2" />
                            사주 운세 분석하기
                          </>
                        )}
                      </button>
                    </div>
                    
                    {!canGenerateFinal && (
                      <p className="text-sm text-gray-500 text-center mt-2">
                        필수 정보를 모두 입력해주세요
                      </p>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        )}

        {/* 로딩 상태 */}
        {isLoading && (
          <div className="fortune-card p-8 text-center animate-pulse">
            <div className="loading-spinner mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-fortune-deep mb-2">
              {mode === 'detailed' ? '사주팔자를 분석하고 있습니다...' : '운세를 확인하고 있습니다...'}
            </h3>
            <p className="text-sm text-gray-600">
              {mode === 'detailed' 
                ? '천간지지, 십성, 신살을 종합 분석 중입니다' 
                : '오늘의 운세를 준비하고 있습니다'
              }
            </p>
            <div className="mt-4 flex justify-center space-x-1">
              <div className="animate-bounce w-2 h-2 bg-fortune-gold rounded-full" style={{animationDelay: '0ms'}}></div>
              <div className="animate-bounce w-2 h-2 bg-fortune-gold rounded-full" style={{animationDelay: '150ms'}}></div>
              <div className="animate-bounce w-2 h-2 bg-fortune-gold rounded-full" style={{animationDelay: '300ms'}}></div>
            </div>
          </div>
        )}

        {/* 운세 결과 */}
        {showFortune && selectedBusinessType && (
          <div className="space-y-6">
            {/* 간단 운세 결과 */}
            {mode === 'simple' && fortune && (
              <>
                <FortuneCard
                  fortune={fortune}
                  businessName={selectedBusinessType.name}
                  ownerName={ownerName}
                />
                
                <div className="text-center bg-gradient-to-r from-fortune-gold/10 to-yellow-100/50 
                                rounded-lg p-4 border border-fortune-gold/30">
                  <p className="text-sm text-fortune-deep font-medium mb-2">
                    💡 더 정확한 운세가 궁금하시다면?
                  </p>
                  <button
                    onClick={() => handleModeChange('detailed')}
                    className="px-4 py-2 bg-fortune-gold text-fortune-deep rounded-lg 
                             hover:shadow-md transition-all duration-300"
                  >
                    생년월일시로 정밀 사주 보기
                  </button>
                </div>
              </>
            )}
            
            {/* 정밀 사주 결과 */}
            {mode === 'detailed' && sajuFortune && (
              <SajuChart
                saju={sajuFortune.saju_chart}
                currentAge={sajuFortune.personal_info.age}
                businessType={selectedBusiness}
                isLoading={false}
              />
            )}
            
            {/* 공통 액션 버튼들 */}
            <div className="space-y-3">
              {((mode === 'simple' && fortune) || (mode === 'detailed' && sajuFortune)) && (
                <ShareButton
                  fortune={mode === 'simple' ? fortune : {
                    score: sajuFortune!.score,
                    stars: sajuFortune!.stars,
                    sales: sajuFortune!.sales,
                    customers: sajuFortune!.customers,
                    events: sajuFortune!.events,
                    warnings: sajuFortune!.warnings,
                    luckyItem: sajuFortune!.luckyItem,
                    summary: sajuFortune!.summary
                  }}
                  ownerName={mode === 'simple' ? ownerName : sajuFortune!.personal_info.name}
                  businessName={selectedBusinessType.name}
                />
              )}
              
              <button
                onClick={handleRefresh}
                className="w-full bg-white/80 backdrop-blur-sm border border-fortune-gold/30
                         px-4 py-3 rounded-lg transition-all duration-300
                         hover:bg-fortune-warm text-fortune-deep
                         flex items-center justify-center gap-2"
              >
                <RefreshCcw size={16} />
                <span>새로운 운세 보기</span>
              </button>
            </div>
          </div>
        )}

        {/* 푸터 */}
        <footer className="text-center text-xs text-gray-500 py-4 border-t border-fortune-gold/20">
          <p>
            🔮 정통 사주명리학 기반의 사업 운세 서비스 🔮
          </p>
          <p className="mt-1">
            ✨ 운세는 참고사항일 뿐, 노력하는 자에게 운이 따릅니다 ✨
          </p>
          <p className="mt-1">
            매일 새로운 운세와 사주 분석으로 성공적인 사업을 이어가세요!
          </p>
        </footer>
      </div>
    </main>
  );
}