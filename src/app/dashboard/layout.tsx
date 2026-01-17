import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import './dashboard.css';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = createClient();

    // 1. Verify User
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
        redirect('/auth/login');
    }

    // 2. Fetch Profile to get School ID
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    // 3. Fetch School Details if linked
    let schoolName = "My School";
    if (profile?.school_id) {
        const { data: school } = await supabase
            .from('schools')
            .select('name')
            .eq('id', profile.school_id)
            .single();
        if (school) {
            schoolName = school.name;
        }
    } else {
        // If no school is linked, we should technically redirect to onboarding
        // But we'll let the page or specific logic handle that, or do it here.
        redirect('/onboarding');
    }

    return (
        <div className="dashboard-container">
            <Sidebar />
            <main className="main-content">
                <TopBar userEmail={user.email} schoolName={schoolName} />
                <div className="dashboard-page">
                    {children}
                </div>
            </main>
        </div>
    );
}
