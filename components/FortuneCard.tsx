'use client';

import { Fortune } from '@/lib/fortune-generator';
import { Star, DollarSign, Users, Zap, AlertTriangle, Sparkles } from 'lucide-react';

interface FortuneCardProps {
  fortune: Fortune;
  businessName: string;
  ownerName: string;
  isLoading?: boolean;
}

export default function FortuneCard({ 
  fortune, 
  businessName, 
  ownerName, 
  isLoading = false 
}: FortuneCardProps) {
  if (isLoading) {
    return (
      <div className="fortune-card p-6 text-center animate-pulse">
        <div className="loading-spinner mx-auto mb-4"></div>
        <p className="text-fortune-deep font-medium">
          {ownerName} 사장님의 운세를 확인하고 있습니다...
        </p>
      </div>
    );
  }

  const renderStars = (count: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={20}
        className={`${
          index < count
            ? 'fill-fortune-gold text-fortune-gold'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const FortuneSection = ({ 
    icon, 
    title, 
    prediction, 
    advice, 
    iconColor = 'text-fortune-deep' 
  }: {
    icon: React.ReactNode;
    title: string;
    prediction: string;
    advice: string;
    iconColor?: string;
  }) => (
    <div className="bg-white/50 rounded-lg p-4 space-y-3">
      <div className="flex items-center gap-2">
        <div className={iconColor}>{icon}</div>
        <h4 className="font-semibold text-fortune-deep">{title}</h4>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-gray-700 leading-relaxed">{prediction}</p>
        <div className="border-l-3 border-fortune-gold/30 pl-3">
          <p className="text-xs text-fortune-deep italic leading-relaxed">
            💡 {advice}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fortune-card p-6 space-y-6 animate-slide-up">
      {/* 헤더 */}
      <div className="text-center space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-fortune-deep">
            {ownerName} 사장님의 오늘 운세
          </h2>
          <p className="text-sm text-gray-600">
            {businessName} · {new Date().toLocaleDateString('ko-KR')}
          </p>
        </div>
        
        {/* 점수 및 별점 */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-fortune-red mb-1">
                {fortune.score}
              </div>
              <div className="text-xs text-gray-600 font-medium">점</div>
            </div>
            <div className="flex gap-1">
              {renderStars(fortune.stars)}
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-fortune-warm to-yellow-100 
                          rounded-lg p-3 max-w-md mx-auto">
            <p className="text-sm text-fortune-deep leading-relaxed text-center">
              {fortune.summary}
            </p>
          </div>
        </div>
      </div>

      {/* 운세 카테고리들 */}
      <div className="grid gap-4">
        <FortuneSection
          icon={<DollarSign size={18} />}
          title="매출 운세"
          prediction={fortune.sales.prediction}
          advice={fortune.sales.advice}
          iconColor="text-green-600"
        />
        
        <FortuneSection
          icon={<Users size={18} />}
          title="손님 운세"
          prediction={fortune.customers.prediction}
          advice={fortune.customers.advice}
          iconColor="text-blue-600"
        />
        
        <FortuneSection
          icon={<Zap size={18} />}
          title="이벤트 운세"
          prediction={fortune.events.prediction}
          advice={fortune.events.advice}
          iconColor="text-purple-600"
        />
        
        <FortuneSection
          icon={<AlertTriangle size={18} />}
          title="주의사항"
          prediction={fortune.warnings.prediction}
          advice={fortune.warnings.advice}
          iconColor="text-orange-600"
        />
        
        {/* 럭키 아이템 */}
        <div className="bg-gradient-to-r from-fortune-gold/20 to-yellow-200/30 
                        rounded-lg p-4 border border-fortune-gold/30">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={18} className="text-fortune-gold" />
            <h4 className="font-semibold text-fortune-deep">오늘의 럭키 아이템</h4>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-fortune-gold text-fortune-deep px-2 py-1 
                             rounded-full text-xs font-medium">
                {fortune.luckyItem.item}
              </span>
            </div>
            <p className="text-sm text-fortune-deep leading-relaxed">
              {fortune.luckyItem.description}
            </p>
          </div>
        </div>
      </div>

      {/* 푸터 메시지 */}
      <div className="text-center pt-4 border-t border-fortune-gold/20">
        <p className="text-sm text-gray-600 italic">
          ✨ 좋은 하루 되세요, {ownerName} 사장님! ✨
        </p>
      </div>
    </div>
  );
}