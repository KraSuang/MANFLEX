import { ChangeEvent, FocusEvent } from 'react';

interface TextfieldProps {
    type: 'text' | 'number';
    value: string | number;
    placeholder: string;
    onChange: (value: string | number) => void;
    onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
}

export const Textfield: React.FC<TextfieldProps> = ({ type, value, placeholder, onChange }) => {

    const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = type === 'number' ? parseFloat(e.target.value) : e.target.value;
        onChange(newValue);
    };

    return (
        <input
            className={`flex w-full h-fit bg-button border-border border-[2px] rounded-lg text-text text-base px-6 py-2 my-2 outline-none`}
            type={type}
            value={value}
            onChange={handleValueChange}
            placeholder={placeholder}
        />
    )
}
interface FocusfieldProps {
    type: 'text' | 'number';
    value: string | number;
    onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
    isFocus: boolean;
    label: string; // Add a label prop for better accessibility
}

export const FocusField: React.FC<FocusfieldProps> = ({ type, value, onFocus, isFocus, label }) => {
    return (
        <div className={`flex items-center border-[2px] rounded-lg text-sm my-2 mx-1 outline-none relative ${isFocus ? `bg-blue-900 border-blue-400` : `bg-button border-border`}`}>
            <label htmlFor={label} className={`text-gray-400 text-xs absolute mt-[1px] left-4`}>
                {label}
            </label>
            <input
                id={label}
                className={`flex w-full h-full bg-transparent px-4 py-2 text-transparent outline-none`}
                value={value}
                type={type}
                onFocus={onFocus} // Add placeholder for hinting
                aria-label={label} // Provide aria-label for screen readers
            />
            <p className={`text-text absolute right-4`}>{value || 0}</p>
        </div>
    );
}