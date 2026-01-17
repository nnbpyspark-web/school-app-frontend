"use client";

import React, { useState } from 'react';
import { AuthForm } from '@/components/auth/AuthForm';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { signup } from '../actions';

export default function SignupPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget as HTMLFormElement);

        try {
            const result = await signup(formData);
            if (result && result.error) {
                setError(result.error);
                setIsLoading(false);
            }
        } catch (e: any) {
            if (e.message !== 'NEXT_REDIRECT') {
                console.error(e);
                setError("An unexpected error occurred.");
                setIsLoading(false);
            }
        }
    }

    return (
        <AuthForm
            title="Get Started"
            description="Create your school account"
            onSubmit={handleSubmit}
            error={error}
        >
            <div className="form-group">
                <label className="form-label" htmlFor="fullName">Full Name</label>
                <input
                    className="form-input"
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    placeholder="John Doe"
                />
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="email">Email</label>
                <input
                    className="form-input"
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@school.com"
                />
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="password">Password</label>
                <input
                    className="form-input"
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    minLength={6}
                />
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="instituteName">Institute Name</label>
                <input
                    className="form-input"
                    id="instituteName"
                    name="instituteName"
                    type="text"
                    required
                    placeholder="Springfield High"
                />
            </div>

            <Button type="submit" className="w-full" style={{ width: '100%' }} isLoading={isLoading}>
                Sign Up
            </Button>

            <div className="auth-footer">
                Already have an account? <Link href="/auth/login" className="auth-link">Sign in</Link>
            </div>
        </AuthForm>
    );
}
