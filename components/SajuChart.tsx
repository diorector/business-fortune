'use client';

import { SajuChart as ISajuChart } from '@/lib/final-saju-calculator';
import { 
  analyzeTenGods, 
  TEN_GODS_INFO, 
  getTenGodBusinessAdvice 
} from '@/lib/ten-gods-system';
import { analyzeSinsal, getTodaySinsalAdvice } from '@/lib/sinsal-system';
import { getComprehensiveFortune } from '@/lib/luck-cycles';
import { Star, Crown, Zap, Clock, TrendingUp, AlertTriangle } from 'lucide-react';

interface SajuChartProps {
  saju: ISajuChart;
  currentAge: number;
  businessType: string;
  isLoading?: boolean;
}

export default function SajuChart({ 
  saju, 
  currentAge, 
  businessType,
  isLoading = false 
}: SajuChartProps) {
  if (isLoading) {
    return (
      <div className="fortune-card p-6 text-center animate-pulse">
        <div className="loading-spinner mx-auto mb-4"></div>
        <p className="text-fortune-deep font-medium">
          사주팔자를 분석하고 있습니다...
        </p>
      </div>
    );
  }

  // 각종 분석 수행
  const tenGodsAnalysis = analyzeTenGods(saju);
  const sinsalAnalysis = analyzeSinsal(saju);
  const currentYear = new Date().getFullYear();
  const today = new Date();
  const comprehensiveFortune = getComprehensiveFortune(saju, currentAge, currentYear, today);
  
  // 십성 기반 사업 조언
  const dominantGod = tenGodsAnalysis.dominant_gods[0] || '비견';
  const businessAdvice = getTenGodBusinessAdvice(dominantGod, businessType);
  const sinsalAdvice = getTodaySinsalAdvice(sinsalAnalysis);

  const PillarCard = ({ 
    title, 
    stem, 
    branch, 
    elementStem, 
    elementBranch, 
    tenGod, 
    description 
  }: {
    title: string;
    stem: string;
    branch: string;
    elementStem: string;
    elementBranch: string;
    tenGod: string;
    description?: string;
  }) => (
    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-fortune-gold/20
                    hover:bg-white/80 transition-all duration-300">
      <div className="text-center space-y-2">
        <h4 className="text-sm font-semibold text-fortune-deep">{title}</h4>
        <div className="space-y-1">
          <div className="text-2xl font-bold text-fortune-red">
            {stem}
          </div>
          <div className="text-xl font-semibold text-fortune-deep">
            {branch}
          </div>
        </div>
        <div className="flex justify-center gap-2 text-xs">
          <span className="px-2 py-1 bg-fortune-warm/50 rounded-full">
            {elementStem}
          </span>
          <span className="px-2 py-1 bg-blue-100 rounded-full">
            {elementBranch}
          </span>
        </div>
        {tenGod !== '일주' && (
          <div className="text-xs font-medium text-purple-600">
            {tenGod}
          </div>
        )}
        {description && (
          <p className="text-xs text-gray-600 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );

  const FortuneSection = ({ 
    icon, 
    title, 
    content, 
    highlight = false 
  }: {
    icon: React.ReactNode;
    title: string;
    content: React.ReactNode;
    highlight?: boolean;
  }) => (
    <div className={`p-4 rounded-lg border transition-all duration-300 ${
      highlight 
        ? 'bg-gradient-to-r from-fortune-gold/20 to-yellow-200/30 border-fortune-gold/50' 
        : 'bg-white/50 border-fortune-gold/20 hover:bg-white/70'
    }`}>
      <div className="flex items-center gap-2 mb-3">
        <div className={highlight ? 'text-fortune-red' : 'text-fortune-deep'}>
          {icon}
        </div>
        <h4 className="font-semibold text-fortune-deep">{title}</h4>
      </div>
      <div className="space-y-2">
        {content}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-slide-up">
      {/* 사주팔자 표 */}
      <div className="fortune-card p-6">
        <h2 className="text-xl font-bold text-center text-fortune-deep mb-6">
          🔮 {saju.birth_info.solar_date.toLocaleDateString('ko-KR')} 사주팔자 🔮
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <PillarCard
            title="년주 (年柱)"
            stem={saju.year.stem}
            branch={saju.year.branch}
            elementStem={saju.year.element_stem}
            elementBranch={saju.year.element_branch}
            tenGod={tenGodsAnalysis.year_stem_god}
            description="조상, 부모, 어린 시절"
          />
          <PillarCard
            title="월주 (月柱)"
            stem={saju.month.stem}
            branch={saju.month.branch}
            elementStem={saju.month.element_stem}
            elementBranch={saju.month.element_branch}
            tenGod={tenGodsAnalysis.month_stem_god}
            description="사회생활, 직업, 인간관계"
          />
          <PillarCard
            title="일주 (日柱)"
            stem={saju.day.stem}
            branch={saju.day.branch}
            elementStem={saju.day.element_stem}
            elementBranch={saju.day.element_branch}
            tenGod="일주"
            description="본인, 배우자, 성격"
          />
          <PillarCard
            title="시주 (時柱)"
            stem={saju.time.stem}
            branch={saju.time.branch}
            elementStem={saju.time.element_stem}
            elementBranch={saju.time.element_branch}
            tenGod={tenGodsAnalysis.time_stem_god}
            description="자녀, 말년, 부하직원"
          />
        </div>

        <div className="text-center bg-fortune-warm/20 rounded-lg p-3 border border-fortune-gold/30">
          <p className="text-sm text-fortune-deep">
            <span className="font-semibold">일간</span> {saju.day_master} ({saju.day.element_stem}行) •{' '}
            <span className="font-semibold">태어난 시각</span> {saju.birth_info.time_period}
          </p>
        </div>
      </div>

      {/* 십성 분석 */}
      <FortuneSection
        icon={<Crown size={18} />}
        title="십성(十星) 분석"
        highlight={true}
        content={
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-medium text-fortune-deep mb-2">강한 십성</h5>
                <div className="flex flex-wrap gap-1">
                  {tenGodsAnalysis.dominant_gods.map((god, index) => (
                    <span key={index} className="px-2 py-1 bg-fortune-gold text-fortune-deep text-xs rounded-full font-medium">
                      {god}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="text-sm font-medium text-fortune-deep mb-2">약한 십성</h5>
                <div className="flex flex-wrap gap-1">
                  {tenGodsAnalysis.weak_gods.slice(0, 3).map((god, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">
                      {god}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white/50 rounded-lg p-3">
              <p className="text-sm leading-relaxed text-gray-700">
                {tenGodsAnalysis.overall_analysis}
              </p>
            </div>
            
            {/* 사업운 분석 */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-center">
              {Object.entries(tenGodsAnalysis.business_fortune).map(([key, value]) => (
                <div key={key} className="bg-white/60 rounded p-2">
                  <div className="text-xs text-gray-600 mb-1">
                    {key === 'money_luck' ? '재물운' :
                     key === 'authority_luck' ? '권위운' :
                     key === 'creativity_luck' ? '창조운' :
                     key === 'competition_luck' ? '경쟁운' : '학습운'}
                  </div>
                  <div className={`text-sm font-semibold ${
                    value === '강' ? 'text-green-600' :
                    value === '중' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {value === '강' ? '⭐⭐⭐' : value === '중' ? '⭐⭐' : '⭐'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
      />

      {/* 신살 분석 */}
      <FortuneSection
        icon={<Zap size={18} />}
        title="신살(神殺) 분석"
        content={
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {sinsalAnalysis.lucky_sinsal_count}
                </div>
                <div className="text-xs text-green-600">길신</div>
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-lg">
                vs
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {sinsalAnalysis.unlucky_sinsal_count}
                </div>
                <div className="text-xs text-red-600">흉신</div>
              </div>
            </div>

            <div className="text-center mb-4">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                sinsalAnalysis.overall_sinsal_luck === '대길' ? 'bg-green-100 text-green-800' :
                sinsalAnalysis.overall_sinsal_luck === '길' ? 'bg-blue-100 text-blue-800' :
                sinsalAnalysis.overall_sinsal_luck === '보통' ? 'bg-yellow-100 text-yellow-800' :
                sinsalAnalysis.overall_sinsal_luck === '흉' ? 'bg-orange-100 text-orange-800' :
                'bg-red-100 text-red-800'
              }`}>
                전체 신살운: {sinsalAnalysis.overall_sinsal_luck}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-medium text-green-600 mb-2">나타난 길신</h5>
                <div className="space-y-1">
                  {sinsalAnalysis.present_sinsal.filter(s => s.type === '길신').map((sinsal, index) => (
                    <div key={index} className="bg-green-50 p-2 rounded text-xs">
                      <span className="font-medium text-green-800">{sinsal.name}:</span>
                      <span className="text-green-700 ml-1">{sinsal.description}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h5 className="text-sm font-medium text-red-600 mb-2">나타난 흉신</h5>
                <div className="space-y-1">
                  {sinsalAnalysis.present_sinsal.filter(s => s.type === '흉신').map((sinsal, index) => (
                    <div key={index} className="bg-red-50 p-2 rounded text-xs">
                      <span className="font-medium text-red-800">{sinsal.name}:</span>
                      <span className="text-red-700 ml-1">{sinsal.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        }
      />

      {/* 오늘의 시간대별 운세 */}
      <FortuneSection
        icon={<Clock size={18} />}
        title="오늘의 시간대별 사업 조언"
        content={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-yellow-50 p-3 rounded-lg">
              <h5 className="text-sm font-semibold text-yellow-800 mb-2">🌅 오전 집중사항</h5>
              <p className="text-sm text-yellow-700 leading-relaxed">
                {businessAdvice.morning_advice}
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <h5 className="text-sm font-semibold text-orange-800 mb-2">☀️ 오후 주의사항</h5>
              <p className="text-sm text-orange-700 leading-relaxed">
                {businessAdvice.afternoon_advice}
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <h5 className="text-sm font-semibold text-blue-800 mb-2">🌙 저녁 준비사항</h5>
              <p className="text-sm text-blue-700 leading-relaxed">
                {businessAdvice.evening_advice}
              </p>
            </div>
          </div>
        }
      />

      {/* 대운/세운/일운 종합 */}
      <FortuneSection
        icon={<TrendingUp size={18} />}
        title="운세 주기별 분석"
        content={
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <h5 className="font-semibold text-purple-800">대운 (大運)</h5>
                <p className="text-sm text-purple-700 mt-1">
                  {comprehensiveFortune.daeun.current_daeun.period}
                </p>
                <p className="text-lg font-bold text-purple-600">
                  {comprehensiveFortune.daeun.current_daeun.stem}
                  {comprehensiveFortune.daeun.current_daeun.branch}
                </p>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  comprehensiveFortune.daeun.current_daeun.overall_luck === '대길' ? 'bg-green-100 text-green-800' :
                  comprehensiveFortune.daeun.current_daeun.overall_luck === '길' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {comprehensiveFortune.daeun.current_daeun.overall_luck}
                </span>
              </div>
              
              <div className="text-center p-3 bg-indigo-50 rounded-lg">
                <h5 className="font-semibold text-indigo-800">세운 (歲運)</h5>
                <p className="text-sm text-indigo-700 mt-1">{currentYear}년</p>
                <p className="text-lg font-bold text-indigo-600">
                  {comprehensiveFortune.saeun.stem}
                  {comprehensiveFortune.saeun.branch}
                </p>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  comprehensiveFortune.saeun.overall_luck === '대길' ? 'bg-green-100 text-green-800' :
                  comprehensiveFortune.saeun.overall_luck === '길' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {comprehensiveFortune.saeun.overall_luck}
                </span>
              </div>
              
              <div className="text-center p-3 bg-teal-50 rounded-lg">
                <h5 className="font-semibold text-teal-800">일운 (日運)</h5>
                <p className="text-sm text-teal-700 mt-1">오늘</p>
                <p className="text-lg font-bold text-teal-600">
                  {comprehensiveFortune.ilun.stem}
                  {comprehensiveFortune.ilun.branch}
                </p>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  comprehensiveFortune.ilun.overall_luck === '대길' ? 'bg-green-100 text-green-800' :
                  comprehensiveFortune.ilun.overall_luck === '길' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {comprehensiveFortune.ilun.overall_luck}
                </span>
              </div>
            </div>
            
            <div className="bg-white/60 rounded-lg p-4">
              <h5 className="font-semibold text-fortune-deep mb-2">종합 분석</h5>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                {comprehensiveFortune.overall_analysis}
              </p>
              <p className="text-sm text-fortune-deep font-medium">
                💡 사업 추천: {comprehensiveFortune.business_recommendation}
              </p>
            </div>
          </div>
        }
      />

      {/* 오늘의 특별 조언 */}
      <FortuneSection
        icon={<AlertTriangle size={18} />}
        title="오늘의 특별 조언"
        highlight={true}
        content={
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h5 className="font-semibold text-fortune-deep">🍀 럭키 타임 & 아이템</h5>
              <div className="bg-green-50 p-3 rounded">
                <p className="text-sm text-green-800">
                  <span className="font-medium">길한 시간:</span> {businessAdvice.lucky_time}
                </p>
                <p className="text-sm text-green-800 mt-1">
                  <span className="font-medium">럭키 아이템:</span> {businessAdvice.lucky_item}
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h5 className="font-semibold text-fortune-deep">⚠️ 주의 시간 & 마음가짐</h5>
              <div className="bg-red-50 p-3 rounded">
                <p className="text-sm text-red-800">
                  <span className="font-medium">주의 시간:</span> {businessAdvice.caution_time}
                </p>
                <p className="text-sm text-red-800 mt-1">
                  <span className="font-medium">마음가짐:</span> {sinsalAdvice.overall_mindset}
                </p>
              </div>
            </div>
          </div>
        }
      />

      {/* 사업 팁 */}
      <div className="bg-gradient-to-r from-fortune-gold/10 via-yellow-50 to-orange-50 
                      rounded-xl p-6 border border-fortune-gold/30">
        <h3 className="text-lg font-bold text-fortune-deep text-center mb-4">
          💼 맞춤 사업 조언
        </h3>
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 mb-4">
          <p className="text-sm leading-relaxed text-gray-700">
            {businessAdvice.business_tip}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-600 italic">
            ✨ 사주는 참고사항일 뿐, 노력하는 자에게 운이 따릅니다 ✨
          </p>
        </div>
      </div>
    </div>
  );
}