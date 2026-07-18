import React from 'react';

interface ToggleSwitchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

const ToggleSwitch = React.forwardRef<HTMLButtonElement, ToggleSwitchProps>(
  ({ checked, onCheckedChange, disabled = false, ...props }, ref) => (
    <button
      ref={ref}
      onClick={() => !disabled && onCheckedChange(!checked)}
      className={`w-12 h-6 rounded-full transition-colors flex items-center ${
        checked ? 'bg-sky-600' : 'bg-slate-300'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      {...props}
    >
      <div
        className={`w-5 h-5 bg-white rounded-full transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-0.5'
        }`}
      />
    </button>
  )
);

ToggleSwitch.displayName = 'ToggleSwitch';

export default ToggleSwitch;
