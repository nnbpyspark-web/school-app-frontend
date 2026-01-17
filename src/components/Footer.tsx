import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './layout.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container footer-grid">
                <div className="footer-col">
                    <Link href="/">
                        <Image
                            src="/logo.png"
                            alt="EduSaaS"
                            width={150}
                            height={40}
                            style={{ height: '40px', width: 'auto', marginBottom: '1rem' }}
                        />
                    </Link>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '250px' }}>
                        Empowering schools and coaching centers with modern digital tools.
                    </p>
                </div>

                <div className="footer-col">
                    <h3>Product</h3>
                    <ul>
                        <li><Link href="/features">Features</Link></li>
                        <li><Link href="/pricing">Pricing</Link></li>
                        <li><Link href="/auth/signup">Get Started</Link></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h3>Company</h3>
                    <ul>
                        <li><Link href="#">About Us</Link></li>
                        <li><Link href="#">Contact</Link></li>
                        <li><Link href="#">Privacy Policy</Link></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h3>Contact</h3>
                    <ul>
                        <li><a href="mailto:hello@edusaas.com">hello@edusaas.com</a></li>
                        <li><a href="tel:+1234567890">+91 98765 43210</a></li>
                    </ul>
                </div>
            </div>

            <div className="container footer-bootom">
                &copy; {new Date().getFullYear()} EduSaaS. All rights reserved.
            </div>
        </footer>
    );
}
