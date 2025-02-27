import React, { useState, useEffect, useRef } from 'react';

const PayoutInputModal = ({ isOpen, onClose, onSubmit }) => {
    const [inputValue, setInputValue] = useState('');
    const textareaRef = useRef(null);

    useEffect(() => {
        if (isOpen && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [isOpen]);

    const handleSubmit = () => {
        onSubmit(inputValue);
        setInputValue('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Payouts</h2>
                <p>Please input each value on a new line.</p>
                <textarea
                    ref={textareaRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    rows="10"
                    style={{ width: '100%' }}
                />
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default PayoutInputModal;
