"use client";

import React from 'react';
import './toggle.css';

interface ToggleSwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    id?: string;
}

export function ToggleSwitch({ checked, onChange, disabled = false, id }: ToggleSwitchProps) {
    return (
        <div className="toggle-switch">
            <input
                type="checkbox"
                className="toggle-input"
                id={id}
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                disabled={disabled}
            />
            <label className="toggle-label" htmlFor={id}></label>
        </div>
    );
}
