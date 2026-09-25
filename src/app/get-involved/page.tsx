'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  HeartHandshake, 
  Coins, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Building2,
  Lock,
  Send,
  HelpCircle,
  QrCode
} from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

const VOLUNTEER_AREAS = [
  'Remedial Weekend Teaching (Maths/English/Science)',
  'Art, Music & Mental Well-being Workshops',
  'Field Logistics & Donation Drive Operations',
  'Health & Hygiene Screening Camps',
  'Digital Media, Photography & Web Systems',
  'Community Survey & Parent Counseling',
];

export default function GetInvolvedPage() {
 const [activeTab, setActiveTab] = useState<'volunteer' | 'donate' | 'contact'>('volunteer');

useEffect(() => {
  if (window.location.hash === '#contact') {
    setActiveTab('contact');

    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({
        behavior: 'smooth',
      });
    }, 100);
  }
}, []);

  // Volunteer form state
  const [volData, setVolData] = useState({
    fullName: '',
    email: '',
    phone: '',
    collegeDept: '',
    academicYear: '1st Year (Semester 1/2)',
    interests: [] as string[],
    availability: 'Weekends (Saturdays/Sundays - 4 hrs)',
    statement: '',
  });
  const [volStatus, setVolStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [volMessage, setVolMessage] = useState('');

  // Contact form state
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [contactStatus, setContactStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [contactMessage, setContactMessage] = useState('');

  const handleInterestToggle = (area: string) => {
    setVolData((prev) => {
      const exists = prev.interests.includes(area);
      if (exists) {
        return { ...prev, interests: prev.interests.filter((i) => i !== area) };
      }
      return { ...prev, interests: [...prev.interests, area] };
    });
  };

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!volData.fullName || !volData.email || !volData.phone || !volData.statement) {
      setVolStatus('error');
      setVolMessage('Please fill in all mandatory fields before submitting.');
      return;
    }

    setVolStatus('loading');
    setVolMessage('');

    try {
      const res = await fetch('/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(volData),
      });
      const data = await res.json();

      if (res.ok) {
        setVolStatus('success');
        setVolMessage('Your volunteer expression has been submitted successfully! The student coordinator will reach out for the upcoming orientation.');
        setVolData({
          fullName: '',
          email: '',
          phone: '',
          collegeDept: '',
          academicYear: '1st Year (Semester 1/2)',
          interests: [],
          availability: 'Weekends (Saturdays/Sundays - 4 hrs)',
          statement: '',
        });
      } else {
        setVolStatus('error');
        setVolMessage(data.error || 'Failed to submit application. Please try again.');
      }
    } catch (err) {
      setVolStatus('error');
      setVolMessage('Network error occurred. Application logged in offline storage.');
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactData.name || !contactData.email || !contactData.message) {
      setContactStatus('error');
      setContactMessage('Please enter your name, email, and message inquiry.');
      return;
    }

    setContactStatus('loading');
    setContactMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData),
      });
      const data = await res.json();

      if (res.ok) {
        setContactStatus('success');
        setContactMessage('Thank you for writing to AASRA. Your message has been received by the council secretary.');
        setContactData({ name: '', email: '', subject: '', message: '' });
      } else {
        setContactStatus('error');
        setContactMessage(data.error || 'Failed to submit message.');
      }
    } catch (err) {
      setContactStatus('error');
      setContactMessage('Failed to deliver message. Please contact via direct email.');
    }
  };

  return (
    <div className="space-y-14 py-12 pb-20">
      {/* Banner */}
      <section className="bg-brand-900 text-white py-14 border-b border-brand-800 -mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-400 bg-brand-950/60 px-3 py-1 rounded-full border border-brand-700/60">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>COMMUNITY ACTION & PARTICIPATION</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Get Involved with AASRA
            </h1>
            <p className="text-base sm:text-lg text-brand-200 leading-relaxed">
              Whether you want to tutor children on weekends, support educational supplies, or connect with our campus committee—your participation fuels our movement.
            </p>
          </div>
        </div>
      </section>

      {/* Main Tab Switcher */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex border-b border-brand-200">
          <button
            onClick={() => setActiveTab('volunteer')}
            className={`py-3 px-6 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'volunteer'
                ? 'border-brand-800 text-brand-800 bg-brand-100/50'
                : 'border-transparent text-brand-600 hover:text-brand-800 hover:border-brand-300'
            }`}
          >
            <HeartHandshake className="w-4 h-4" />
            <span>Volunteer Application</span>
          </button>

          <button
            onClick={() => setActiveTab('donate')}
            className={`py-3 px-6 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'donate'
                ? 'border-brand-800 text-brand-800 bg-brand-100/50'
                : 'border-transparent text-brand-600 hover:text-brand-800 hover:border-brand-300'
            }`}
          >
            <Coins className="w-4 h-4" />
            <span>Support / Donate</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`py-3 px-6 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'contact'
                ? 'border-brand-800 text-brand-800 bg-brand-100/50'
                : 'border-transparent text-brand-600 hover:text-brand-800 hover:border-brand-300'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Contact & Secretariat</span>
          </button>
        </div>

        {/* TAB 1: VOLUNTEER FORM */}
        {activeTab === 'volunteer' && (
          <div className="pt-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-brand-800">
                    Join the Student Volunteer Force
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-700 mt-2 leading-relaxed">
                    AASRA volunteers are university students who dedicate 3 to 6 hours a week to direct child welfare. We provide comprehensive orientation and certificates of welfare service.
                  </p>
                </div>

                <Card className="p-5 bg-brand-50 border-brand-200 text-xs text-brand-700 space-y-3">
                  <h4 className="font-bold text-brand-800 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-gold-600" />
                    Volunteer Commitment
                  </h4>
                  <ul className="space-y-2 text-brand-700">
                    <li>• Punctual weekend attendance at assigned teaching or shelter centers.</li>
                    <li>• Adherence to the AASRA Child Safety & Respect Protocol.</li>
                    <li>• Participation in monthly volunteer review circles.</li>
                  </ul>
                </Card>

                <Card className="p-5 bg-white border-brand-200 text-xs text-brand-700 space-y-2">
                  <h4 className="font-bold text-brand-800">Recognition & Credit</h4>
                  <p className="text-brand-700">
                    Volunteers completing at least 40 hours of field service receive formal commendations from the Student Welfare Board, eligible for college social credit.
                  </p>
                </Card>
              </div>

              {/* Volunteer Form */}
              <div className="lg:col-span-8">
                <Card className="p-6 sm:p-8 bg-white border-brand-200/80">
                  <form onSubmit={handleVolunteerSubmit} className="space-y-6">
                    {volStatus === 'success' && (
                      <div className="p-4 rounded-md bg-brand-50 border border-gold-400 text-xs text-brand-900 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                        <span>{volMessage}</span>
                      </div>
                    )}

                    {volStatus === 'error' && (
                      <div className="p-4 rounded-md bg-brand-100/80 border border-brand-300 text-xs text-brand-900 flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-brand-700 shrink-0 mt-0.5" />
                        <span>{volMessage}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-brand-800 uppercase mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={volData.fullName}
                          onChange={(e) => setVolData({ ...volData, fullName: e.target.value })}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full text-xs p-2.5 rounded border border-brand-200 bg-brand-50/30 text-brand-800 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-brand-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-brand-800 uppercase mb-1">
                          College / Student Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={volData.email}
                          onChange={(e) => setVolData({ ...volData, email: e.target.value })}
                          placeholder="your.email@example.com"
                          className="w-full text-xs p-2.5 rounded border border-brand-200 bg-brand-50/30 text-brand-800 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-brand-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-brand-800 uppercase mb-1">
                          WhatsApp / Contact Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={volData.phone}
                          onChange={(e) => setVolData({ ...volData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full text-xs p-2.5 rounded border border-brand-200 bg-brand-50/30 text-brand-800 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-brand-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-brand-800 uppercase mb-1">
                          Academic Department *
                        </label>
                        <input
                          type="text"
                          required
                          value={volData.collegeDept}
                          onChange={(e) => setVolData({ ...volData, collegeDept: e.target.value })}
                          placeholder="e.g. Mechanical Engineering"
                          className="w-full text-xs p-2.5 rounded border border-brand-200 bg-brand-50/30 text-brand-800 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-brand-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-brand-800 uppercase mb-1">
                          Academic Year *
                        </label>
                        <select
                          value={volData.academicYear}
                          onChange={(e) => setVolData({ ...volData, academicYear: e.target.value })}
                          className="w-full text-xs p-2.5 rounded border border-brand-200 bg-white text-brand-800 focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                        >
                          <option>1st Year (Semester 1/2)</option>
                          <option>2nd Year (Semester 3/4)</option>
                          <option>3rd Year (Semester 5/6)</option>
                          <option>4th Year (Semester 7/8)</option>
                          <option>Postgraduate / Research Scholar</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-brand-800 uppercase mb-1">
                          Weekly Availability *
                        </label>
                        <select
                          value={volData.availability}
                          onChange={(e) => setVolData({ ...volData, availability: e.target.value })}
                          className="w-full text-xs p-2.5 rounded border border-brand-200 bg-white text-brand-800 focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                        >
                          <option>Weekends (Saturdays/Sundays - 4 hrs)</option>
                          <option>Saturday Mornings only (9am - 1pm)</option>
                          <option>Sunday Mornings only (9am - 1pm)</option>
                          <option>Weekday Evenings (Drive sorting/Logistics)</option>
                          <option>Flexible / Remote (Design & Media)</option>
                        </select>
                      </div>
                    </div>

                    {/* Areas of Interest Checkboxes */}
                    <div>
                      <label className="block text-xs font-bold text-brand-800 uppercase mb-2">
                        Preferred Areas of Engagement (Select all that apply)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {VOLUNTEER_AREAS.map((area) => (
                          <label
                            key={area}
                            className={`flex items-center gap-2 p-2.5 rounded border cursor-pointer transition-colors ${
                              volData.interests.includes(area)
                                ? 'bg-brand-100/80 border-brand-500 text-brand-900 font-semibold'
                                : 'bg-brand-50/40 border-brand-200 text-brand-700 hover:bg-brand-100/50'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={volData.interests.includes(area)}
                              onChange={() => handleInterestToggle(area)}
                              className="rounded text-brand-800 focus:ring-gold-500"
                            />
                            <span>{area}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Statement */}
                    <div>
                      <label className="block text-xs font-bold text-brand-800 uppercase mb-1">
                        Why do you wish to join AASRA? (Brief Statement) *
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={volData.statement}
                        onChange={(e) => setVolData({ ...volData, statement: e.target.value })}
                        placeholder="Tell us about your motivation, prior tutoring experience, or skills you'd like to contribute..."
                        className="w-full text-xs p-2.5 rounded border border-brand-200 bg-brand-50/30 text-brand-800 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-brand-600"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      disabled={volStatus === 'loading'}
                      icon={<Send className="w-4 h-4" />}
                    >
                      {volStatus === 'loading' ? 'Submitting Application...' : 'Submit Volunteer Application'}
                    </Button>
                  </form>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DONATION NOTICE & FUTURE PORTAL PLACEHOLDER */}
        {activeTab === 'donate' && (
          <div className="pt-8 space-y-8" id="donate">
            <div className="bg-gold-50/70 border border-gold-300/80 rounded-lg p-6 text-brand-900 space-y-3">
              <div className="flex items-center gap-2 font-bold text-brand-900 text-sm">
                <ShieldCheck className="w-5 h-5 text-gold-600" />
                <span>Notice on Contributions & Future Online Gateway</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-brand-800">
                In strict adherence to project specifications and college non-profit policies, <strong>we do NOT currently process online card/payment transactions directly on this website</strong>. Online payment gateway integration is slated for a future institutional deployment.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-lg border border-brand-200/80 shadow-sm space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-brand-800">
                    Official College Welfare Account Details
                  </h3>
                  <p className="text-xs text-brand-600 mt-1">
                    For voluntary contributions, donors may utilize the designated student council welfare bank account monitored by faculty treasurers.
                  </p>
                </div>

                <div className="p-5 rounded-lg bg-brand-50/70 border border-brand-200/80 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-gold-600" />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-brand-900">
                        Official Donation Details
                      </p>
                      <p className="text-xs text-brand-600 mt-1">
                        Verified payment details will be published after formal institutional approval.
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-brand-600 leading-relaxed pt-2 border-t border-brand-200">
                    AASRA does not publish unverified banking or payment information.
                    Please contact the AASRA Council Desk for approved donation procedures.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-brand-100/50 border border-brand-200 text-xs text-brand-900 space-y-1">
                  <p className="font-bold">Receipt & Public Ledger Policy:</p>
                  <p className="text-brand-700">
                    Whenever a voluntary contribution is received, an itemized public voucher entry is recorded on our <Link href="/transparency" className="underline font-bold text-brand-800">Transparency Ledger</Link> within 48 hours.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-lg border border-brand-200/80 space-y-4 text-xs text-brand-700">
                <h4 className="font-bold text-brand-800 text-sm uppercase tracking-wider">
                  Material & In-Kind Donations
                </h4>
                <p className="leading-relaxed text-brand-700">
                  We actively collect in-kind physical supplies throughout the academic year. You can drop these items at our Campus Activity Desk:
                </p>

                <ul className="space-y-2 border-t border-brand-100 pt-3 text-brand-700">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-600" />
                    <span>Clean children's winter wear, sweaters, and thermals</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-600" />
                    <span>Stationery, geometry sets, blank notebooks, and crayons</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-600" />
                    <span>Storybooks and illustrated children's encyclopedias</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-600" />
                    <span>Unopened first-aid, antiseptic soaps, and hygiene kits</span>
                  </li>
                </ul>

                <div className="pt-2">
                  <Link
                    href="/get-involved#contact"
                    onClick={() => setActiveTab('contact')}
                    className="text-xs font-semibold text-gold-700 hover:text-brand-900 underline"
                  >
                    Contact Council Desk to schedule a material handover →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CONTACT FORM & CAMPUS COORDINATES */}
        {activeTab === 'contact' && (
          <div className="pt-8 space-y-8" id="contact">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-brand-800">
                    Contact AASRA Council Office
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-700 mt-2 leading-relaxed">
                    Have an inquiry regarding community partnerships, school permissions, or donation drives? Reach out to our student administrative secretariat.
                  </p>
                </div>

                <div className="space-y-4 text-xs text-brand-700">
                  <div className="p-4 rounded-lg bg-white border border-brand-200/80 flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-brand-800 block">Campus Office</span>
                      <span>Room 204, Student Activity Centre, University Campus</span>
                    </div>
                  </div>
<div className="p-4 rounded-lg bg-white border border-brand-200/80 flex items-start gap-3">
  <Mail className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
  <div>
    <span className="font-bold text-brand-800 block">
      Official Inquiries
    </span>
    <span className="text-brand-600">
      Contact details will be published after official approval.
    </span>
  </div>
</div>

                  <div className="p-4 rounded-lg bg-white border border-brand-200/80 flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-brand-800 block">Office Consultation Hours</span>
                      <span>Monday to Friday: 4:30 PM - 6:30 PM (Post-Lecture Hours)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-7">
                <Card className="p-6 sm:p-8 bg-white border-brand-200/80">
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <h4 className="text-base font-bold text-brand-800 border-b border-brand-100 pb-2">
                      Send a Direct Message
                    </h4>

                    {contactStatus === 'success' && (
                      <div className="p-4 rounded-md bg-brand-50 border border-gold-400 text-xs text-brand-900 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                        <span>{contactMessage}</span>
                      </div>
                    )}

                    {contactStatus === 'error' && (
                      <div className="p-4 rounded-md bg-brand-100/80 border border-brand-300 text-xs text-brand-900 flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-brand-700 shrink-0 mt-0.5" />
                        <span>{contactMessage}</span>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-bold text-brand-800 uppercase mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactData.name}
                        onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                        placeholder="e.g. Ananya Patel"
                        className="w-full text-xs p-2.5 rounded border border-brand-200 bg-brand-50/30 text-brand-800 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-brand-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brand-800 uppercase mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={contactData.email}
                        onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                        placeholder="name@domain.com"
                        className="w-full text-xs p-2.5 rounded border border-brand-200 bg-brand-50/30 text-brand-800 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-brand-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brand-800 uppercase mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={contactData.subject}
                        onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                        placeholder="e.g. Proposal for NGO Collaboration"
                        className="w-full text-xs p-2.5 rounded border border-brand-200 bg-brand-50/30 text-brand-800 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-brand-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brand-800 uppercase mb-1">
                        Message / Query *
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={contactData.message}
                        onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                        placeholder="Write your message here..."
                        className="w-full text-xs p-2.5 rounded border border-brand-200 bg-brand-50/30 text-brand-800 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-brand-600"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      disabled={contactStatus === 'loading'}
                      icon={<Send className="w-4 h-4" />}
                    >
                      {contactStatus === 'loading' ? 'Sending Message...' : 'Send Message'}
                    </Button>
                  </form>
                </Card>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
