"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, BookOpen, Calendar, Settings, School, Bell, FileText, CreditCard } from 'lucide-react';
import Image from 'next/image';

export function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Students', href: '/dashboard/students', icon: Users },
        { name: 'Batches', href: '/dashboard/batches', icon: BookOpen },
        { name: 'Attendance', href: '/dashboard/attendance', icon: Calendar },
        { name: 'Academic', href: '/dashboard/academic', icon: FileText },
        { name: 'Announcements', href: '/dashboard/announcements', icon: Bell },
        { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
        { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <Link href="/dashboard" className="sidebar-logo">
                    {/* Using the logo image but ensuring it looks good on dark bg */}
                    <Image
                        src="/logo.png"
                        alt="EduSaaS"
                        width={30}
                        height={30}
                        style={{ width: 'auto', height: '24px', filter: 'brightness(0) invert(1)' }}
                    />
                    <span>EduSaaS</span>
                </Link>
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`nav-item ${isActive ? 'active' : ''}`}
                        >
                            <item.icon size={20} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
