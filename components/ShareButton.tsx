'use client';

import { Share2, MessageCircle, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Fortune } from '@/lib/fortune-generator';

interface ShareButtonProps {
  fortune: Fortune;
  ownerName: string;
  businessName: string;
}

export default function ShareButton({ fortune, ownerName, businessName }: ShareButtonProps) {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareText = `🔮 ${ownerName} 사장님의 오늘 운세 🔮

📊 운세 점수: ${fortune.score}점 (⭐${fortune.stars}개)
🏪 업종: ${businessName}

✨ 오늘의 한마디: ${fortune.summary}

💰 매출 전망: ${fortune.sales.prediction}
👥 손님 운세: ${fortune.customers.prediction}
🍀 럭키 아이템: ${fortune.luckyItem.item}

#오늘의장사운세 #사업운세 #자영업 #운세`;

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('클립보드 복사 실패:', err);
    }
  };

  const handleKakaoShare = () => {
    const encodedText = encodeURIComponent(shareText);
    const kakaoUrl = `https://story.kakao.com/share?url=${encodeURIComponent(window.location.href)}&text=${encodedText}`;
    window.open(kakaoUrl, '_blank', 'width=600,height=400');
  };

  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${ownerName} 사장님의 오늘 장사 운세`,
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('공유 실패:', err);
          handleCopyToClipboard();
        }
      }
    } else {
      setShowShareOptions(!showShareOptions);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleWebShare}
        className="fortune-button w-full flex items-center justify-center gap-2"
        aria-label="운세 결과 공유하기"
      >
        <Share2 size={18} />
        <span>운세 공유하기</span>
      </button>

      {showShareOptions && (
        <div className="absolute top-full left-0 right-0 mt-2 
                        bg-white/95 backdrop-blur-sm rounded-lg shadow-lg 
                        border border-fortune-gold/20 p-3 space-y-2 z-10
                        animate-slide-up">
          
          <button
            onClick={handleCopyToClipboard}
            className="w-full flex items-center gap-3 p-3 rounded-lg
                       hover:bg-fortune-warm transition-colors
                       text-left text-sm text-gray-700"
            aria-label="텍스트 복사하기"
          >
            {copied ? (
              <>
                <Check size={16} className="text-green-600" />
                <span className="text-green-600">복사되었습니다!</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span>텍스트 복사</span>
              </>
            )}
          </button>

          <button
            onClick={handleKakaoShare}
            className="w-full flex items-center gap-3 p-3 rounded-lg
                       hover:bg-fortune-warm transition-colors
                       text-left text-sm text-gray-700"
            aria-label="카카오스토리에 공유하기"
          >
            <MessageCircle size={16} />
            <span>카카오스토리 공유</span>
          </button>

          <div className="pt-2 border-t border-gray-200">
            <button
              onClick={() => setShowShareOptions(false)}
              className="w-full text-center text-xs text-gray-500 py-1
                         hover:text-gray-700 transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {showShareOptions && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setShowShareOptions(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}