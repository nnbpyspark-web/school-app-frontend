import Link from "next/link";
import { Check } from "lucide-react";
import "../landing.css";

export default function FeaturesPage() {
    const allFeatures = [
        "Student Profile Management",
        "Batch & Class Organization",
        "Daily Attendance Tracking",
        "Automated Reports",
        "Assignment Uploads",
        "Notice Board / Announcements",
        "Fee Management (Coming Soon)",
        "Parent Portal (Coming Soon)"
    ];

    return (
        <>
            <section className="hero" style={{ padding: '6rem 0 4rem' }}>
                <div className="container text-center">
                    <h1>Powerful Features for Modern Institutes</h1>
                    <p className="section-title">Designed to simplify administration and improve learning outcomes.</p>
                </div>
            </section>

            <section className="section-py">
                <div className="container">
                    <div className="features-grid">
                        {/* We can reuse the grid for a list of items */}
                        {allFeatures.map((f, i) => (
                            <div key={i} className="feature-card" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ background: '#DEF7EC', padding: '8px', borderRadius: '50%', color: '#03543F' }}>
                                    <Check size={20} />
                                </div>
                                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{f}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Detailed Feature Idea */}
            <section className="section-py" style={{ background: '#F8FAFC' }}>
                <div className="container hero-grid">
                    <div className="hero-content">
                        <h2>Student & Batch Management</h2>
                        <p style={{ margin: '1rem 0', color: 'var(--text-muted)' }}>
                            Organize your students into batches like &quot;Class 10 - Science&quot; or &quot;Batch A&quot;.
                            Keep track of their roll numbers, contact details, and academic progress in one secure place.
                        </p>
                    </div>
                    <div className="hero-image">
                        <p>Image: Student List Interface</p>
                    </div>
                </div>
            </section>
        </>
    );
}
