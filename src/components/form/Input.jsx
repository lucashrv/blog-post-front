import React from 'react';

function Input({ placeholder, value, onKeyDown, onChange }) {
    return (
        <>
            <div className="input-group flex-nowrap">
                <input
                    type="text"
                    class="form-control"
                    placeholder={placeholder}
                    onKeyDown={onKeyDown}
                    onChange={onChange}
                    value={value}
                />
            </div>
        </>
  )
}

export default Input