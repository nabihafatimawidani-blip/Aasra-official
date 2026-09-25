import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'AASRA | Official Student Social Welfare & Community Organization',
  description:
    'AASRA is an official student-led college social welfare initiative committed to empowering underprivileged children and communities through education, mental well-being, health awareness, donation drives, and transparent outreach.',
  keywords: [
    'AASRA',
    'College Social Welfare',
    'Student Welfare Organization',
    'Underprivileged Children Education',
    'Mental Well-being Outreach',
    'Donation Drives',
    'Community Welfare',
    'Student Volunteering',
    'Transparent NGO',
  ],
  authors: [{ name: 'AASRA Student Welfare Council' }],
  robots: 'index, follow',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-brand-50 text-brand-700 selection:bg-brand-800 selection:text-brand-50">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
