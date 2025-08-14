# 🔮 오늘의 장사 운세

자영업자를 위한 매력적이고 실용적인 장사 운세 웹앱입니다.

## ✨ 주요 기능

- **업종별 맞춤 운세**: 음식점, 카페, 편의점, 미용실 등 8개 업종별 특화 운세
- **매일 다른 결과**: 날짜와 사용자 정보를 기반으로 일관성 있는 운세 생성
- **5가지 카테고리**: 매출, 손님, 이벤트, 주의사항, 럭키아이템 운세
- **SNS 공유 기능**: 카카오스토리, 클립보드 복사 등 다양한 공유 옵션
- **반응형 디자인**: 모바일 퍼스트로 설계된 사용자 친화적 UI

## 🛠️ 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📱 주요 화면

1. **사업자명 입력**: 개인화된 운세를 위한 이름 입력
2. **업종 선택**: 8개 업종 중 해당 사업 선택
3. **운세 확인**: 점수, 별점과 함께 상세한 운세 정보
4. **결과 공유**: 다양한 방법으로 운세 결과 공유

## 🚀 로컬 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 실행
npm start
```

## 🌐 배포 (Vercel)

1. **Vercel CLI 설치** (선택사항):
```bash
npm i -g vercel
```

2. **배포**:
```bash
vercel
```

3. **환경 변수 설정** (선택사항):
   - `NEXT_PUBLIC_BASE_URL`: 배포된 도메인 URL
   - `NEXT_PUBLIC_GA_ID`: Google Analytics ID
   - `GOOGLE_VERIFICATION_CODE`: Google Search Console 인증
   - `NAVER_VERIFICATION_CODE`: 네이버 웹마스터 도구 인증

## 📂 프로젝트 구조

```
business-fortune/
├── app/                    # Next.js App Router
│   ├── globals.css        # 전역 스타일
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx           # 메인 페이지
├── components/            # React 컴포넌트
│   ├── BusinessSelector.tsx
│   ├── FortuneCard.tsx
│   └── ShareButton.tsx
├── lib/                   # 유틸리티 함수
│   └── fortune-generator.ts
├── public/                # 정적 파일
│   └── manifest.json
└── package.json
```

## 🎨 디자인 컨셉

- **컬러**: 따뜻한 골드와 레드 포인트로 전통적이면서 현대적인 느낌
- **타이포그래피**: Noto Sans KR로 한국어 최적화
- **애니메이션**: 부드러운 페이드인, 슬라이드업 효과
- **반응형**: 모바일부터 데스크톱까지 완벽 지원

## 🔧 커스터마이징

### 새로운 업종 추가
`lib/fortune-generator.ts`의 `businessTypes` 배열과 `fortuneData` 객체를 수정하여 새로운 업종을 추가할 수 있습니다.

### 운세 내용 수정
각 업종별 운세 데이터는 `fortuneData` 객체에서 관리됩니다. 예측과 조언 내용을 자유롭게 수정할 수 있습니다.

### 스타일 커스터마이징
`tailwind.config.js`의 `fortune` 컬러 팔레트와 `app/globals.css`의 컴포넌트 스타일을 수정하여 디자인을 변경할 수 있습니다.

## 📈 SEO 최적화

- 메타데이터 최적화 (제목, 설명, 키워드)
- Open Graph 및 Twitter Card 설정
- 구조화된 데이터 (JSON-LD)
- 검색 엔진 인증 코드 지원
- 모바일 친화적 설계

## 🤝 기여하기

1. Fork 프로젝트
2. 새로운 기능 브랜치 생성 (`git checkout -b feature/AmazingFeature`)
3. 변경사항 커밋 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 Push (`git push origin feature/AmazingFeature`)
5. Pull Request 생성

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해 주세요.

---

✨ **좋은 하루 되세요!** ✨