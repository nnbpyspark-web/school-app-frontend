"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function TestDBPage() {
    const [status, setStatus] = useState<string>('Testing connection...');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function checkConnection() {
            try {
                // We'll perform a simple check. getSession() is lightweight and doesn't require tables.
                // If the URL/Key are invalid, this usually throws or returns an error.
                const { data, error } = await supabase.auth.getSession();

                if (error) {
                    throw error;
                }

                // If we get here, the client could talk to Supabase Auth service
                setStatus(`Connection Successful! Supabase URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`);
            } catch (err: any) {
                setError(err.message || "Unknown error occurred");
                setStatus("Connection Failed");
            }
        }

        checkConnection();
    }, []);

    return (
        <div style={{ padding: '50px', fontFamily: 'sans-serif' }}>
            <h1>Supabase Connection Test</h1>
            <div style={{
                marginTop: '20px',
                padding: '15px',
                borderRadius: '8px',
                backgroundColor: error ? '#ffebee' : '#e8f5e9',
                color: error ? '#c62828' : '#2e7d32',
                border: `1px solid ${error ? '#ef9a9a' : '#a5d6a7'}`
            }}>
                <strong>Status:</strong> {status}
                {error && <p style={{ marginTop: '10px' }}><strong>Error Details:</strong> {error}</p>}
            </div>
            <p style={{ marginTop: '20px', color: '#666' }}>
                Note: This tests the connection to the Supabase Auth service using your provided URL and Anon Key.
            </p>
        </div>
    );
}
