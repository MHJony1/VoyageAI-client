import React from 'react';

interface MultiSelectProps {
  label?: string;
  options: { value: string; label: string }[];
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
}

const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  ({ label, options, value, onChange, error }, ref) => {
    const handleToggle = (optionValue: string) => {
      const newValue = value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue];
      onChange(newValue);
    };

    return (
      <div ref={ref} className="w-full">
        {label && (
          <label className="block text-sm font-medium text-slate-900 mb-3">
            {label}
            <span className="text-red-500">*</span>
          </label>
        )}
        <div className="grid grid-cols-2 gap-3">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 p-3 border-2 border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors"
              style={{
                borderColor: value.includes(option.value) ? '#0284c7' : undefined,
                backgroundColor: value.includes(option.value) ? '#f0f9ff' : undefined,
              }}
            >
              <input
                type="checkbox"
                checked={value.includes(option.value)}
                onChange={() => handleToggle(option.value)}
                className="w-4 h-4 rounded border-2 border-slate-300 cursor-pointer"
              />
              <span className="text-sm font-medium text-slate-700">{option.label}</span>
            </label>
          ))}
        </div>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

MultiSelect.displayName = 'MultiSelect';

export default MultiSelect;
