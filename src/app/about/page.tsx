import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Target,
  Eye,
  Heart,
  Award,
  Compass,
  Clock,
  Building,
  Mail,
  GraduationCap,
  ArrowRight,
  BookOpen,
  Users
} from 'lucide-react';

import { Linkedin } from '@/components/ui/LinkedinIcon';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const metadata = {
  title: 'About AASRA | Sreyas Institute of Engineering and Technology',
  description:
    'Learn about AASRA, an official student-led social welfare organization at Sreyas Institute of Engineering and Technology: our motive, founding story, student founders, vision, mission, and core values.',
};

export default function AboutPage() {
  return (
    <div className="space-y-16 sm:space-y-24 py-12 pb-20">
      {/* 1. Page Header Banner */}
      <section className="bg-brand-900 text-white py-14 border-b border-brand-800 -mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-400 bg-brand-800/80 px-3 py-1 rounded-full border border-brand-700">
              <Building className="w-3.5 h-3.5" />
              <span>Sreyas Institute of Engineering and Technology • Official Profile</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              About AASRA
            </h1>
            <p className="text-base sm:text-lg text-brand-200 leading-relaxed">
              An organized student social welfare initiative rooted in institutional accountability, compassionate grassroots action, and educational equity for underprivileged children.
            </p>
          </div>
        </div>
      </section>

      {/* 2. OUR MOTIVE */}
      <section id="motive" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-4">
            <SectionHeader
              pretitle="THE CORE REASON"
              title="Our Motive"
              description="Why AASRA was conceptualized and the critical structural challenges our student body addresses daily."
            />
            <div className="p-5 rounded-lg bg-gold-50 border border-gold-200 text-brand-900 text-xs sm:text-sm leading-relaxed space-y-2">
              <p className="font-bold flex items-center gap-1.5 text-gold-900">
                <Compass className="w-4 h-4 text-gold-700" />
                The Guiding Principle:
              </p>
              <p>
                "Access to foundational literacy, emotional safety, and basic health is a fundamental right of every child, not a luxury dictated by socio-economic privilege."
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-brand-700 text-sm sm:text-base leading-relaxed">
            <p>
              While elite higher education institutions foster groundbreaking research and technical knowledge, the physical neighborhoods surrounding many college campuses present a contrasting reality: temporary settlements, daily-wage laborer communities, and municipal shelter homes where children lack even basic educational continuity.
            </p>
            <p>
              AASRA was conceived to dismantle this divide. Rather than viewing community welfare as an occasional, passive charitable donation, we approach social support through <strong>continuous, disciplined, and institutional engagement</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-lg bg-brand-50/60 border border-brand-200 space-y-1.5">
                <h4 className="font-bold text-brand-800 flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-brand-700"></span>
                  Addressing Learning Gaps
                </h4>
                <p className="text-xs text-brand-600">
                  Many children enrolled in schools cannot read basic regional text or perform simple subtraction due to overcrowded municipal classrooms.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-brand-50/60 border border-brand-200 space-y-1.5">
                <h4 className="font-bold text-brand-800 flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-gold-600"></span>
                  Psycho-Social Support
                </h4>
                <p className="text-xs text-brand-600">
                  Children in precarious environments frequently navigate chronic distress, requiring safe spaces, artistic expression, and supportive mentor figures.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-brand-50/60 border border-brand-200 space-y-1.5">
                <h4 className="font-bold text-brand-800 flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-gold-500"></span>
                  Health & Nutrition Relief
                </h4>
                <p className="text-xs text-brand-600">
                  Preventative healthcare, seasonal clothing, and essential hygiene supplies are essential prerequisites for effective cognitive learning.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-brand-50/60 border border-brand-200 space-y-1.5">
                <h4 className="font-bold text-brand-800 flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-brand-800"></span>
                  Preventing Child Labor
                </h4>
                <p className="text-xs text-brand-600">
                  Counseling families on the long-term socio-economic returns of education and assisting in formal government school enrollments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR STORY / GENESIS */}
      <section id="story" className="bg-brand-100/60 py-16 border-y border-brand-200/80 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            pretitle="HOW IT BEGAN"
            title="Our Story & Organizational Evolution"
            description="From an informal weekend teaching circle under a campus tree to an officially recognized student welfare body."
            centered
          />

          <div className="max-w-4xl mx-auto space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:w-0.5 before:bg-brand-300 before:pointer-events-none">
            {/* Timeline Item 1 */}
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="sm:w-1/2 sm:text-right sm:pr-8 pl-10 sm:pl-0">
                <span className="text-xs font-bold text-gold-800 bg-gold-100 px-2 py-0.5 rounded">Phase 1: Genesis</span>
                <h4 className="text-base font-bold text-brand-800 mt-1">The First Weekend Circle</h4>
                <p className="text-xs text-brand-600 mt-1">
                  A small group of undergraduate engineering students noticed children from nearby construction sites spending mornings unattended. They gathered basic slates, notebooks, and spent 2 hours every Sunday teaching the alphabet.
                </p>
              </div>
              <div className="absolute left-2.5 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-brand-900 border-4 border-white shadow"></div>
              <div className="sm:w-1/2 sm:pl-8 pl-10 sm:pl-0 text-xs text-brand-500 font-medium">
                Initial Pilot Initiative
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="sm:w-1/2 sm:text-right sm:pr-8 pl-10 sm:pl-0 text-xs text-brand-500 font-medium order-2 sm:order-1">
                Campus Mobilization
              </div>
              <div className="absolute left-2.5 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gold-600 border-4 border-white shadow order-1 sm:order-2"></div>
              <div className="sm:w-1/2 sm:pl-8 pl-10 sm:pl-0 order-3">
                <span className="text-xs font-bold text-brand-800 bg-brand-100 px-2 py-0.5 rounded">Phase 2: Formalization</span>
                <h4 className="text-base font-bold text-brand-800 mt-1">Founding Charter & Name 'AASRA'</h4>
                <p className="text-xs text-brand-600 mt-1">
                  As volunteer participation grew beyond 40 students, the founders drafted an official charter under the name <strong>AASRA</strong> (meaning Shelter & Hope). Standardized teaching curriculums and attendance tracking were instituted.
                </p>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="sm:w-1/2 sm:text-right sm:pr-8 pl-10 sm:pl-0">
                <span className="text-xs font-bold text-gold-800 bg-gold-100 px-2 py-0.5 rounded">Phase 3: Institutional Approval</span>
                <h4 className="text-base font-bold text-brand-800 mt-1">College Recognition & NGO Partnerships</h4>
                <p className="text-xs text-brand-600 mt-1">
                  The student welfare board at Sreyas Institute of Engineering and Technology formally ratified AASRA as an official student body, granting access to activity hall spaces and providing formal affiliation with local child care centers.
                </p>
              </div>
              <div className="absolute left-2.5 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gold-600 border-4 border-white shadow"></div>
              <div className="sm:w-1/2 sm:pl-8 pl-10 sm:pl-0 text-xs text-brand-500 font-medium">
                Official Charter Recognition
              </div>
            </div>

            {/* Timeline Item 4 */}
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="sm:w-1/2 sm:text-right sm:pr-8 pl-10 sm:pl-0 text-xs text-brand-500 font-medium order-2 sm:order-1">
                Present & Beyond
              </div>
              <div className="absolute left-2.5 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-brand-900 border-4 border-white shadow order-1 sm:order-2"></div>
              <div className="sm:w-1/2 sm:pl-8 pl-10 sm:pl-0 order-3">
                <span className="text-xs font-bold text-brand-800 bg-brand-100 px-2 py-0.5 rounded">Phase 4: Full Transparency</span>
                <h4 className="text-base font-bold text-brand-800 mt-1">Digital Transparency & Structured Operations</h4>
                <p className="text-xs text-brand-600 mt-1">
                  Today, AASRA operates 6 active programs, oversees 100+ active student volunteers, publishes open itemized financial ledgers, and reaches over 1,200 children annually.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
              
      {/* 5. VISION, MISSION, OBJECTIVES & VALUES */}
      <section id="vision" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <SectionHeader
          pretitle="GUIDING FRAMEWORK"
          title="Vision, Mission, Objectives & Values"
          description="Clear distinctions defining our long-term aspiration, immediate operational mandate, and ethical conduct."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision */}
          <Card className="p-8 bg-white border-brand-200/80" borderAccent="brand">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-brand-900 text-white rounded-lg">
                <Eye className="w-6 h-6 text-gold-400" />
              </div>
              <div>
                <span className="text-xs font-bold text-brand-700 uppercase tracking-wider">Our Long-term Aspiration</span>
                <h3 className="text-xl font-bold text-brand-800">Vision Statement</h3>
              </div>
            </div>
            <p className="text-sm text-brand-700 leading-relaxed">
              We envision a compassionate and equitable society wherein every underprivileged child—regardless of their family background, socioeconomic vulnerability, or geography—is provided the quality education, emotional nurturing, and dignity essential to unlock their boundless human potential.
            </p>
          </Card>

          {/* Mission */}
          <Card className="p-8 bg-white border-brand-200/80" borderAccent="gold">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-gold-600 text-white rounded-lg">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-gold-800 uppercase tracking-wider">Our Daily Commitment</span>
                <h3 className="text-xl font-bold text-brand-800">Mission Statement</h3>
              </div>
            </div>
            <p className="text-sm text-brand-700 leading-relaxed">
              To channel the intellect, empathy, and organizing power of university students into continuous, structured welfare interventions: delivering remedial literacy camps, psychological resilience workshops, health checkups, and transparent relief drives with zero administrative cost.
            </p>
          </Card>
        </div>

        {/* Core Objectives & Values */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Objectives */}
          <Card className="p-8 bg-brand-50/70 border-brand-200">
            <h4 className="text-base font-bold text-brand-800 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-brand-800" />
              Core Strategic Objectives
            </h4>
            <ul className="space-y-3 text-sm text-brand-700">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-600 mt-2 shrink-0"></span>
                <span><strong>Holistic Literacy:</strong> Strengthen foundational reading and arithmetic skills among 1,000+ primary-age children every academic term.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-600 mt-2 shrink-0"></span>
                <span><strong>Formal Mainstreaming:</strong> Assist un-enrolled or dropout children into certified government primary and secondary schools.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-600 mt-2 shrink-0"></span>
                <span><strong>Child Mental Health:</strong> Integrate art therapy, expression circles, and counselor-guided emotional safety in all centers.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-600 mt-2 shrink-0"></span>
                <span><strong>Accountable Leadership:</strong> Foster civic responsibility and ethical public governance among university students.</span>
              </li>
            </ul>
          </Card>

          {/* Ethical Values */}
          <Card className="p-8 bg-brand-50/70 border-brand-200">
            <h4 className="text-base font-bold text-brand-800 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-gold-600" />
              Ethical & Governance Values
            </h4>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-white rounded border border-brand-200 space-y-1">
                <p className="font-bold text-brand-800">Total Transparency</p>
                <p className="text-brand-600">Open ledgers, public vouchers, zero concealed finances.</p>
              </div>
              <div className="p-3 bg-white rounded border border-brand-200 space-y-1">
                <p className="font-bold text-brand-800">Child Dignity First</p>
                <p className="text-brand-600">Strict child safety protocols and respectful photography practices.</p>
              </div>
              <div className="p-3 bg-white rounded border border-brand-200 space-y-1">
                <p className="font-bold text-brand-800">Consistency</p>
                <p className="text-brand-600">Commitment to weekly year-round presence, not one-time token gestures.</p>
              </div>
              <div className="p-3 bg-white rounded border border-brand-200 space-y-1">
                <p className="font-bold text-brand-800">Inclusivity</p>
                <p className="text-brand-600">Equal shelter for every child irrespective of caste, religion, or gender.</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Navigation Footer CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <div className="inline-flex flex-wrap items-center justify-center gap-4">
          <Button href="/initiatives" variant="secondary">
            Explore AASRA Initiatives
          </Button>
          <Button href="/transparency" variant="outline">
            Review Financial Records
          </Button>
          <Button href="/team" variant="primary">
            Meet the Executive Team
          </Button>
        </div>
      </div>
    </div>
  );
}
