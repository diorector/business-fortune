'use client';

import { useState } from 'react';
import { Calendar, Clock, User, MapPin } from 'lucide-react';

export interface BirthInfo {
  name: string;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  gender: '남' | '여';
  calendar_type: '양력' | '음력';
  timezone: string;
}

interface BirthInfoInputProps {
  birthInfo: BirthInfo;
  onBirthInfoChange: (info: BirthInfo) => void;
  disabled?: boolean;
}

export default function BirthInfoInput({
  birthInfo,
  onBirthInfoChange,
  disabled = false
}: BirthInfoInputProps) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateField = (field: keyof BirthInfo, value: any): string => {
    switch (field) {
      case 'name':
        return !value || value.trim().length === 0 ? '이름을 입력해주세요.' : '';
      case 'year':
        if (!value || value < 1900 || value > new Date().getFullYear()) {
          return '올바른 년도를 입력해주세요 (1900년 이후).';
        }
        return '';
      case 'month':
        if (!value || value < 1 || value > 12) {
          return '올바른 월을 선택해주세요 (1-12).';
        }
        return '';
      case 'day':
        if (!value || value < 1 || value > 31) {
          return '올바른 일을 입력해주세요 (1-31).';
        }
        // 월별 일수 체크
        const daysInMonth = new Date(birthInfo.year, birthInfo.month, 0).getDate();
        if (value > daysInMonth) {
          return `${birthInfo.month}월은 ${daysInMonth}일까지만 있습니다.`;
        }
        return '';
      case 'hour':
        if (value < 0 || value > 23) {
          return '올바른 시간을 입력해주세요 (0-23).';
        }
        return '';
      case 'minute':
        if (value < 0 || value > 59) {
          return '올바른 분을 입력해주세요 (0-59).';
        }
        return '';
      default:
        return '';
    }
  };

  const handleChange = (field: keyof BirthInfo, value: any) => {
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));

    onBirthInfoChange({
      ...birthInfo,
      [field]: value
    });
  };

  const isValidBirthInfo = (): boolean => {
    const requiredFields: (keyof BirthInfo)[] = ['name', 'year', 'month', 'day', 'hour', 'minute'];
    return requiredFields.every(field => {
      const error = validateField(field, birthInfo[field]);
      return !error;
    }) && Object.values(errors).every(error => !error);
  };

  return (
    <div className="fortune-card p-6 space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-fortune-deep mb-2">
          정확한 사주 분석을 위한 정보 입력
        </h3>
        <p className="text-sm text-gray-600">
          생년월일시가 정확할수록 더 정밀한 사주 분석이 가능합니다
        </p>
      </div>

      <div className="grid gap-4">
        {/* 이름 및 성별 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <User size={16} />
              이름 (상호명)
            </label>
            <input
              type="text"
              value={birthInfo.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="김사장, 이대표 등"
              disabled={disabled}
              className="w-full px-3 py-2 border border-fortune-gold/30 rounded-lg
                         focus:ring-2 focus:ring-fortune-gold focus:border-fortune-gold
                         focus:outline-none transition-all bg-white/80 backdrop-blur-sm"
              maxLength={20}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <User size={16} />
              성별
            </label>
            <select
              value={birthInfo.gender}
              onChange={(e) => handleChange('gender', e.target.value as '남' | '여')}
              disabled={disabled}
              className="w-full px-3 py-2 border border-fortune-gold/30 rounded-lg
                         focus:ring-2 focus:ring-fortune-gold focus:border-fortune-gold
                         focus:outline-none transition-all bg-white/80 backdrop-blur-sm"
            >
              <option value="남">남성</option>
              <option value="여">여성</option>
            </select>
          </div>
        </div>

        {/* 생년월일 */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Calendar size={16} />
            생년월일
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <select
              value={birthInfo.calendar_type}
              onChange={(e) => handleChange('calendar_type', e.target.value as '양력' | '음력')}
              disabled={disabled}
              className="px-3 py-2 border border-fortune-gold/30 rounded-lg
                         focus:ring-2 focus:ring-fortune-gold focus:border-fortune-gold
                         focus:outline-none transition-all bg-white/80 backdrop-blur-sm"
            >
              <option value="양력">양력</option>
              <option value="음력">음력</option>
            </select>

            <input
              type="number"
              value={birthInfo.year || ''}
              onChange={(e) => handleChange('year', parseInt(e.target.value) || 0)}
              placeholder="년 (예: 1990)"
              disabled={disabled}
              min="1900"
              max={new Date().getFullYear()}
              className="px-3 py-2 border border-fortune-gold/30 rounded-lg
                         focus:ring-2 focus:ring-fortune-gold focus:border-fortune-gold
                         focus:outline-none transition-all bg-white/80 backdrop-blur-sm"
            />

            <select
              value={birthInfo.month || ''}
              onChange={(e) => handleChange('month', parseInt(e.target.value) || 0)}
              disabled={disabled}
              className="px-3 py-2 border border-fortune-gold/30 rounded-lg
                         focus:ring-2 focus:ring-fortune-gold focus:border-fortune-gold
                         focus:outline-none transition-all bg-white/80 backdrop-blur-sm"
            >
              <option value="">월</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                <option key={month} value={month}>{month}월</option>
              ))}
            </select>

            <input
              type="number"
              value={birthInfo.day || ''}
              onChange={(e) => handleChange('day', parseInt(e.target.value) || 0)}
              placeholder="일"
              disabled={disabled}
              min="1"
              max="31"
              className="px-3 py-2 border border-fortune-gold/30 rounded-lg
                         focus:ring-2 focus:ring-fortune-gold focus:border-fortune-gold
                         focus:outline-none transition-all bg-white/80 backdrop-blur-sm"
            />
          </div>
          <div className="flex flex-wrap gap-1 mt-1">
            {errors.year && <p className="text-red-500 text-xs">{errors.year}</p>}
            {errors.month && <p className="text-red-500 text-xs">{errors.month}</p>}
            {errors.day && <p className="text-red-500 text-xs">{errors.day}</p>}
          </div>
        </div>

        {/* 시간 */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Clock size={16} />
            태어난 시간 (24시간 형식)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <input
                type="number"
                value={birthInfo.hour}
                onChange={(e) => handleChange('hour', parseInt(e.target.value) || 0)}
                placeholder="시 (0-23)"
                disabled={disabled}
                min="0"
                max="23"
                className="w-full px-3 py-2 border border-fortune-gold/30 rounded-lg
                           focus:ring-2 focus:ring-fortune-gold focus:border-fortune-gold
                           focus:outline-none transition-all bg-white/80 backdrop-blur-sm"
              />
              {errors.hour && <p className="text-red-500 text-xs mt-1">{errors.hour}</p>}
            </div>

            <div>
              <input
                type="number"
                value={birthInfo.minute}
                onChange={(e) => handleChange('minute', parseInt(e.target.value) || 0)}
                placeholder="분 (0-59)"
                disabled={disabled}
                min="0"
                max="59"
                className="w-full px-3 py-2 border border-fortune-gold/30 rounded-lg
                           focus:ring-2 focus:ring-fortune-gold focus:border-fortune-gold
                           focus:outline-none transition-all bg-white/80 backdrop-blur-sm"
              />
              {errors.minute && <p className="text-red-500 text-xs mt-1">{errors.minute}</p>}
            </div>
          </div>
        </div>

        {/* 시간대 */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <MapPin size={16} />
            시간대
          </label>
          <select
            value={birthInfo.timezone}
            onChange={(e) => handleChange('timezone', e.target.value)}
            disabled={disabled}
            className="w-full px-3 py-2 border border-fortune-gold/30 rounded-lg
                       focus:ring-2 focus:ring-fortune-gold focus:border-fortune-gold
                       focus:outline-none transition-all bg-white/80 backdrop-blur-sm"
          >
            <option value="Asia/Seoul">한국 표준시 (KST)</option>
            <option value="Asia/Tokyo">일본 표준시 (JST)</option>
            <option value="Asia/Shanghai">중국 표준시 (CST)</option>
            <option value="America/New_York">미국 동부 (EST)</option>
            <option value="America/Los_Angeles">미국 서부 (PST)</option>
          </select>
        </div>

        {/* 안내 메시지 */}
        <div className="bg-fortune-warm/30 rounded-lg p-4 border border-fortune-gold/20">
          <h4 className="text-sm font-semibold text-fortune-deep mb-2">
            🔍 정확한 시간을 모르시나요?
          </h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• 대략적인 시간대만 알아도 충분합니다 (오전, 오후, 저녁 등)</li>
            <li>• 자시(23-01시), 축시(01-03시), 인시(03-05시) 등으로 구분됩니다</li>
            <li>• 정확한 시간을 모르면 12시(정오)를 입력하셔도 됩니다</li>
          </ul>
        </div>
      </div>

      {/* 유효성 검사 결과 */}
      <div className="text-center">
        {isValidBirthInfo() ? (
          <div className="flex items-center justify-center gap-2 text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium">입력 정보가 완성되었습니다</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 text-orange-600">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-sm">필수 정보를 모두 입력해주세요</span>
          </div>
        )}
      </div>
    </div>
  );
}

// 시간대 변환 유틸리티 함수들
export function getTimePeriodName(hour: number): string {
  const timePeriods = [
    { start: 23, end: 1, name: '자시', period: '밤 11시 - 새벽 1시' },
    { start: 1, end: 3, name: '축시', period: '새벽 1시 - 3시' },
    { start: 3, end: 5, name: '인시', period: '새벽 3시 - 5시' },
    { start: 5, end: 7, name: '묘시', period: '새벽 5시 - 아침 7시' },
    { start: 7, end: 9, name: '진시', period: '아침 7시 - 9시' },
    { start: 9, end: 11, name: '사시', period: '오전 9시 - 11시' },
    { start: 11, end: 13, name: '오시', period: '오전 11시 - 오후 1시' },
    { start: 13, end: 15, name: '미시', period: '오후 1시 - 3시' },
    { start: 15, end: 17, name: '신시', period: '오후 3시 - 5시' },
    { start: 17, end: 19, name: '유시', period: '오후 5시 - 7시' },
    { start: 19, end: 21, name: '술시', period: '저녁 7시 - 9시' },
    { start: 21, end: 23, name: '해시', period: '밤 9시 - 11시' }
  ];

  for (const period of timePeriods) {
    if (period.start === 23) { // 자시의 특별 케이스
      if (hour === 23 || hour === 0) {
        return `${period.name} (${period.period})`;
      }
    } else if (hour >= period.start && hour < period.end) {
      return `${period.name} (${period.period})`;
    }
  }

  return '자시 (밤 11시 - 새벽 1시)'; // 기본값
}

// 기본 생년월일시 정보 생성
export function createDefaultBirthInfo(): BirthInfo {
  const now = new Date();
  return {
    name: '',
    year: now.getFullYear() - 30, // 기본 30세
    month: 1,
    day: 1,
    hour: 12,
    minute: 0,
    gender: '남',
    calendar_type: '양력',
    timezone: 'Asia/Seoul'
  };
}