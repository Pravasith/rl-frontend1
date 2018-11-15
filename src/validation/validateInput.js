import React from 'react';

const TextFieldGroup = (props,{
    name,
    placeholder,
    value,
    label,
    error,
    info,
    type,
    onChange,
    disabled
}) => {
    return (
        <div className="">
            <input
                type={type}
                className=""
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
            {info && <small className="">{info}</small>}
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default TextFieldGroup;