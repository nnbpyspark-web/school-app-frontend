"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { createSchool } from './actions';
import '@/components/auth/auth.css'; // Reusing auth styles for consistency

export default function OnboardingPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);

        try {
            const result = await createSchool(formData);
            if (result && result.error) {
                setError(result.error);
                setIsLoading(false);
            }
        } catch (e) {
            console.error(e);
            setError("An unexpected error occurred.");
            setIsLoading(false);
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h2 className="auth-title">Setup Your School</h2>
                    <p className="auth-desc">Tell us the name of your institute to get started.</p>
                </div>

                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form-content">
                    <div className="form-group">
                        <label className="form-label" htmlFor="schoolName">School / Institute Name</label>
                        <input
                            className="form-input"
                            id="schoolName"
                            name="schoolName"
                            type="text"
                            required
                            placeholder="e.g. Springfield High School"
                            minLength={3}
                        />
                    </div>

                    <Button type="submit" className="w-full" style={{ width: '100%' }} isLoading={isLoading}>
                        Create Dashboard
                    </Button>
                </form>
            </div>
        </div>
    );
}
