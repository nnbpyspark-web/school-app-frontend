"use client";

import React from 'react';
import { signout } from '@/app/auth/actions';

interface TopBarProps {
    userEmail: string | undefined;
    schoolName?: string;
}

export function TopBar({ userEmail, schoolName = "School Dashboard" }: TopBarProps) {
    // Get initial of email for placeholder
    const initial = userEmail ? userEmail[0].toUpperCase() : 'U';

    return (
        <header className="topbar">
            <h1 className="topbar-title">{schoolName}</h1>

            <div className="topbar-actions">
                <div className="user-profile">
                    <span>{userEmail}</span>
                    <div className="avatar-placeholder">
                        {initial}
                    </div>
                </div>
                <button
                    onClick={() => signout()}
                    className="btn btn-ghost"
                    style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
                >
                    Sign Out
                </button>
            </div>
        </header>
    );
}
