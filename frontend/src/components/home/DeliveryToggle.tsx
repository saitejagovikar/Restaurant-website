import React from 'react';

interface DeliveryDineToggleProps {
    mode: 'DELIVERY' | 'DINE_IN';
    onToggle: (mode: 'DELIVERY' | 'DINE_IN') => void;
    className?: string;
}

const DeliveryToggle: React.FC<DeliveryDineToggleProps> = ({ mode, onToggle, className = '' }) => {
    return (
        <div className={`inline-flex bg-gray-100 p-1 rounded-full relative ${className}`}>
            <div
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full shadow-sm transition-all duration-300 ease-in-out ${mode === 'DELIVERY' ? 'left-1' : 'left-[calc(50%+2px)]'
                    }`}
            />

            <button
                onClick={() => onToggle('DELIVERY')}
                className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 min-w-[120px] ${mode === 'DELIVERY' ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700'
                    }`}
            >
                Delivery
            </button>

            <button
                onClick={() => onToggle('DINE_IN')}
                className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 min-w-[120px] ${mode === 'DINE_IN' ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700'
                    }`}
            >
                Dine Out
            </button>
        </div>
    );
};

export default DeliveryToggle;
