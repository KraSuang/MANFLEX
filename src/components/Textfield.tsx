import React, { ChangeEvent } from 'react';

interface TextfieldProps {
    type: 'text' | 'number';
    value: string | number;
    placeholder: string;
    onChange: (value: string | number) => void;
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