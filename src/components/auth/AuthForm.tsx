"use client";

import React from 'react';
import './auth.css';

interface AuthFormProps {
    title: string;
    description: string;
    children: React.ReactNode;
    onSubmit: (e: React.FormEvent) => void;
    error?: string | null;
}

export function AuthForm({ title, description, children, onSubmit, error }: AuthFormProps) {
    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h2 className="auth-title">{title}</h2>
                    <p className="auth-desc">{description}</p>
                </div>

                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}

                <form onSubmit={onSubmit} className="auth-form-content">
                    {children}
                </form>
            </div>
        </div>
    );
}
