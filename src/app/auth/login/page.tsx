"use client";

import React, { useState } from 'react';
import { AuthForm } from '@/components/auth/AuthForm';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { login } from '../actions';

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget as HTMLFormElement);

        try {
            const result = await login(formData);
            if (result && result.error) {
                setError(result.error);
                setIsLoading(false);
            }
        } catch (e: any) {
            // Redirect errors are sometimes caught here
            if (e.message !== 'NEXT_REDIRECT') {
                console.error(e);
                setError("An unexpected error occurred.");
                setIsLoading(false);
            }
        }
    }

    return (
        <AuthForm
            title="Welcome Back"
            description="Sign in to your account"
            onSubmit={handleSubmit}
            error={error}
        >
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
                />
            </div>

            <Button type="submit" className="w-full" style={{ width: '100%' }} isLoading={isLoading}>
                Sign In
            </Button>

            <div className="auth-footer">
                Don't have an account? <Link href="/auth/signup" className="auth-link">Sign up</Link>
            </div>
        </AuthForm>
    );
}
