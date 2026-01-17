"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { School, Menu, X } from 'lucide-react';
import './layout.css';

import { signout } from '@/app/auth/actions';

interface NavbarProps {
    user?: any;
}

export default function Navbar({ user }: NavbarProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                {/* Logo */}
                <Link href="/" className="navbar-logo">
                    <Image
                        src="/logo.png"
                        alt="EduSaaS"
                        width={150}
                        height={40}
                        className="object-contain" // Tailwind might not be fully set up or we are using vanilla css, so I will stick to inline styles or plain classes if 'object-contain' corresponds to standard CSS. Actually the user instructions say 'Vanilla CSS' is core foundtion.
                        style={{ height: '40px', width: 'auto' }}
                    />
                </Link>

                {/* Desktop Links */}
                <div className="navbar-links">
                    <Link href="/" className="nav-link">Home</Link>
                    <Link href="/features" className="nav-link">Features</Link>
                    <Link href="/pricing" className="nav-link">Pricing</Link>
                </div>

                {/* CTA Actions */}
                <div className="navbar-actions">
                    {user ? (
                        <>
                            <span className="nav-link" style={{ fontSize: '0.9rem' }}>{user.email}</span>
                            <button onClick={() => signout()} className="btn btn-ghost">
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/auth/login" className="btn btn-ghost">
                                Login
                            </Link>
                            <Link href="/auth/signup" className="btn btn-primary">
                                Get Started
                            </Link>
                        </>
                    )}

                    {/* Mobile Toggle */}
                    <button className="btn btn-ghost mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown (Simple implementation) */}
            {isMobileMenuOpen && (
                <div style={{ position: 'absolute', top: '64px', left: 0, right: 0, background: 'white', padding: '20px', borderBottom: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: 'var(--shadow-md)' }}>
                    <Link href="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                    <Link href="/features" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Features</Link>
                    <Link href="/pricing" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>
                    {user ? (
                        <button onClick={() => { signout(); setIsMobileMenuOpen(false); }} className="btn btn-ghost" style={{ justifyContent: 'flex-start' }}>
                            Sign Out
                        </button>
                    ) : (
                        <>
                            <Link href="/auth/login" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                            <Link href="/auth/signup" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Get Started</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
