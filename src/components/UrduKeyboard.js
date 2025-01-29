// src/components/UrduKeyboard.js
'use client';

import { useState } from 'react';

const UrduKeyboard = ({ value, onChange, label }) => {
  const [input, setInput] = useState(value);

  const urduChars = [
    'ا', 'ب', 'پ', 'ت', 'ٹ', 'ث', 'ج', 'چ', 'ح', 'خ',
    'د', 'ڈ', 'ذ', 'ر', 'ڑ', 'ز', 'ژ', 'س', 'ش', 'ص',
    'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ک', 'گ', 'ل',
    'م', 'ن', 'ں', 'و', 'ہ', 'ھ', 'ء', 'ی', 'ے'
  ];

  const handleKeyClick = (char) => {
    const newValue = input + char;
    setInput(newValue);
    onChange({ target: { name: 'extraDetails', value: newValue } });
  };

  const handleBackspace = () => {
    const newValue = input.slice(0, -1);
    setInput(newValue);
    onChange({ target: { name: 'extraDetails', value: newValue } });
  };

  const handleClear = () => {
    setInput('');
    onChange({ target: { name: 'extraDetails', value: '' } });
  };

  return (
    <div className="mt-2">
      <p className="mb-1 font-semibold">{label}</p>
      <div className="grid grid-cols-9 gap-2">
        {urduChars.map((char, index) => (
          <button
            type="button"
            key={index}
            onClick={() => handleKeyClick(char)}
            className="px-2 py-1 text-lg bg-gray-200 rounded hover:bg-gray-300"
          >
            {char}
          </button>
        ))}
        {/* Backspace Button */}
        <button
          type="button"
          onClick={handleBackspace}
          className="col-span-3 px-2 py-1 text-lg bg-red-500 text-white rounded hover:bg-red-600"
        >
          ←
        </button>
        {/* Clear Button */}
        <button
          type="button"
          onClick={handleClear}
          className="col-span-3 px-2 py-1 text-lg bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default UrduKeyboard;