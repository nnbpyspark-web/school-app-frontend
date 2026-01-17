import Link from "next/link";
import { ArrowRight, CheckCircle2, Users, Layers, ShieldCheck } from "lucide-react";
import "./landing.css";
import { TestimonialsSection } from "@/components/blocks/testimonials-with-marquee";

const testimonials = [
    {
        author: {
            name: "Emma Thompson",
            handle: "@emmaai",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
        },
        text: "Using this AI platform has transformed how we handle data analysis. The speed and accuracy are unprecedented.",
        href: "https://twitter.com/emmaai"
    },
    {
        author: {
            name: "David Park",
            handle: "@davidtech",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        },
        text: "The API integration is flawless. We've reduced our development time by 60% since implementing this solution.",
        href: "https://twitter.com/davidtech"
    },
    {
        author: {
            name: "Sofia Rodriguez",
            handle: "@sofiaml",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
        },
        text: "Finally, an AI tool that actually understands context! The accuracy in natural language processing is impressive."
    },
    {
        author: {
            name: "James Wilson",
            handle: "@jwilson",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
        },
        text: "Our student engagement has increased by 40% since adopting this platform. The interface is intuitive and powerful."
    }
];

export default function Home() {
    return (
        <>
            {/* Hero Section */}
            <section className="hero">
                <div className="container hero-grid">
                    <div className="hero-content">
                        <span className="hero-tagline">Next-Gen Education Management</span>
                        <h1>Manage Your Institute with Absolute Clarity.</h1>
                        <p>
                            The all-in-one SaaS platform for schools, coaching centers, and modern educators.
                            Track attendance, manage batches, and grow your business.
                        </p>
                        <div className="hero-actions">
                            <Link href="/auth/signup" className="btn btn-primary">
                                Start for Free
                            </Link>
                            <Link href="/features" className="btn btn-secondary">
                                Explore Features
                            </Link>
                        </div>
                    </div>
                    <div className="hero-image">
                        {/* Placeholder for Dashboard Image - In real app, use next/image */}
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎓</div>
                            <p>Dashboard Preview</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <TestimonialsSection
                title="Trusted by educators worldwide"
                description="Join hundreds of schools who are already simplifying their management with EduSaaS"
                testimonials={testimonials}
            />

            {/* How it Works / Highlights */}
            <section className="section-py" style={{ background: 'white' }}>
                <div className="container">
                    <div className="section-title">
                        <h2>Everything you need to run a school</h2>
                        <p>We provide the tools so you can focus on teaching.</p>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <Users size={24} />
                            </div>
                            <h3>Student Management</h3>
                            <p>Effortlessly onboard students, assign them to batches, and track their academic journey.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <CheckCircle2 size={24} />
                            </div>
                            <h3>Smart Attendance</h3>
                            <p>Mark attendance in seconds. Get automated reports and insights on student regularity.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <Layers size={24} />
                            </div>
                            <h3>Batch Organization</h3>
                            <p>Create batches, assign subjects, and manage timetables with an intuitive interface.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust / Call to Action */}
            <section className="section-py" style={{ background: 'var(--primary)', color: 'white', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Ready to modernize your institute?</h2>
                    <p style={{ maxWidth: '600px', margin: '0 auto 2.5rem', opacity: 0.9 }}>
                        Join hundreds of schools moving towards a paperless future.
                        Get started today with our free trial.
                    </p>
                    <Link href="/auth/signup" className="btn" style={{ background: 'white', color: 'var(--primary)' }}>
                        Create Your Account <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                    </Link>
                </div>
            </section>
        </>
    );
}
