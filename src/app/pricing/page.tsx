import Link from "next/link";
import { Check } from "lucide-react";
import "../landing.css";

export default function PricingPage() {
    return (
        <>
            <section className="hero" style={{ padding: '6rem 0 4rem' }}>
                <div className="container text-center">
                    <h1>Simple, Transparent Pricing</h1>
                    <p className="section-title">Start for free, upgrade as you grow.</p>
                </div>
            </section>

            <section className="section-py">
                <div className="container">
                    <div className="features-grid" style={{ maxWidth: '900px', margin: '0 auto', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>

                        {/* Basic Plan */}
                        <div className="feature-card">
                            <h3 style={{ fontSize: '1.5rem' }}>Starter</h3>
                            <div style={{ fontSize: '2.5rem', fontWeight: 800, margin: '1rem 0' }}>Free</div>
                            <p style={{ marginBottom: '2rem' }}>Perfect for small coaching centers.</p>

                            <Link href="/auth/signup?plan=starter" className="btn btn-secondary" style={{ width: '100%' }}>
                                Get Started
                            </Link>

                            <hr style={{ margin: '2rem 0', borderColor: 'var(--border)' }} />

                            <ul style={{ listStyle: 'none' }}>
                                <li style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                                    <Check size={18} color="green" /> Up to 50 Students
                                </li>
                                <li style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                                    <Check size={18} color="green" /> Basic Attendance
                                </li>
                                <li style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                                    <Check size={18} color="green" /> 1 Admin User
                                </li>
                            </ul>
                        </div>

                        {/* Pro Plan */}
                        <div className="feature-card" style={{ border: '2px solid var(--primary)', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>
                                RECOMMENDED
                            </div>
                            <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>Growth</h3>
                            <div style={{ fontSize: '2.5rem', fontWeight: 800, margin: '1rem 0' }}>$29<span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--text-muted)' }}>/mo</span></div>
                            <p style={{ marginBottom: '2rem' }}>For growing schools and institutes.</p>

                            <Link href="/auth/signup?plan=growth" className="btn btn-primary" style={{ width: '100%' }}>
                                Choose Growth
                            </Link>

                            <hr style={{ margin: '2rem 0', borderColor: 'var(--border)' }} />

                            <ul style={{ listStyle: 'none' }}>
                                <li style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                                    <Check size={18} color="green" /> Unlimited Students
                                </li>
                                <li style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                                    <Check size={18} color="green" /> Advanced Reports
                                </li>
                                <li style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                                    <Check size={18} color="green" /> Email Support
                                </li>
                                <li style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                                    <Check size={18} color="green" /> Multiple Batches
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}
