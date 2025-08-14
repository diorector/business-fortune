'use client';

import { BusinessType } from '@/lib/fortune-generator';

interface BusinessSelectorProps {
  businessTypes: BusinessType[];
  selectedBusiness: string;
  onBusinessSelect: (businessId: string) => void;
  disabled?: boolean;
}

export default function BusinessSelector({
  businessTypes,
  selectedBusiness,
  onBusinessSelect,
  disabled = false
}: BusinessSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center text-fortune-deep">
        어떤 업종을 운영하고 계신가요?
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {businessTypes.map((business) => (
          <button
            key={business.id}
            onClick={() => onBusinessSelect(business.id)}
            disabled={disabled}
            className={`
              business-button text-sm font-medium
              ${selectedBusiness === business.id ? 'active' : ''}
              disabled:opacity-50 disabled:cursor-not-allowed
              flex flex-col items-center justify-center gap-2 h-20
            `}
            aria-label={`${business.name} 선택`}
          >
            <span className="text-2xl" role="img" aria-hidden="true">
              {business.icon}
            </span>
            <span className="text-xs leading-tight">
              {business.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}