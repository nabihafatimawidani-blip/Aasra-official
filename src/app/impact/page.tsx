import React from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  Heart, 
  Smile, 
  PackageCheck, 
  Award, 
  MapPin, 
  Coins, 
  ShieldCheck, 
  Building2,
  Calendar,
  Clock,
  ArrowRight
} from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { StatCard } from '@/components/ui/StatCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const metadata = {
  title: 'Impact & Community Reach | AASRA Official Platform',
  description:
    'Documented and measurable social impact: children reached, volunteer hours, communities served, and financial utilization records.',
};

export default function ImpactPage() {
  return (
    <div className="space-y-16 py-12 pb-20">
      {/* Banner */}
      <section className="bg-brand-900 text-white py-14 border-b border-brand-800 -mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-400 bg-brand-800/80 px-3 py-1 rounded-full border border-brand-700">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>MEASURABLE ACCOUNTABILITY</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Organizational Impact Report
            </h1>
            <p className="text-base sm:text-lg text-brand-200 leading-relaxed">
              We measure our success not through intentions, but through verified classroom hours, children supported in regular schooling, and essential relief delivered to families.
            </p>
          </div>
        </div>
      </section>

      {/* Primary Verified Metrics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 p-4 rounded-lg bg-gold-50 border border-gold-200 flex items-center justify-between text-xs text-brand-900">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gold-700 shrink-0" />
            <span>
              <strong>Note on Verification:</strong> Impact figures will be published after they are verified and approved by the AASRA team.
            </span>
          </div>
          <span className="font-semibold text-gold-800 hidden md:inline">Verification Pending</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <StatCard
            label="Children Reached"
            value="-"
            subtext="Enrolled in remedial & wellness camps"
            variant="brand"
            icon={<BookOpen className="w-5 h-5 text-brand-800" />}
            badgeText="Documented"
          />
          <StatCard
            label="Communities Served"
            value="-"
            subtext="Slum clusters & children shelters"
            variant="gold"
            icon={<Building2 className="w-5 h-5 text-gold-700" />}
            badgeText="8 Localities"
          />
          <StatCard
            label="Events Conducted"
            value="-"
            subtext="Teaching days, health & sports meets"
            variant="brand"
            icon={<Calendar className="w-5 h-5 text-brand-800" />}
            badgeText="Academic Year"
          />
          <StatCard
            label="Active Volunteers"
            value="-"
            subtext="Registered university students"
            variant="gold"
            icon={<Users className="w-5 h-5 text-gold-700" />}
            badgeText="Student Body"
          />
          <StatCard
            label="Donations Collected"
            value="-"
            subtext="Total voluntary contributions"
            variant="brand"
            icon={<Coins className="w-5 h-5 text-brand-800" />}
            badgeText="Verified"
          />
          <StatCard
            label="Amount Utilized"
            value="-"
            subtext="Itemized project expenditures"
            variant="gold"
            icon={<Coins className="w-5 h-5 text-gold-700" />}
            badgeText="Public Ledger"
          />
          <StatCard
            label="Partner Organizations"
            value="-"
            subtext="NGOs, schools, shelter homes"
            variant="brand"
            icon={<Building2 className="w-5 h-5 text-brand-800" />}
            badgeText="Collaborations"
          />
          <StatCard
            label="Teaching Hours"
            value="-"
            subtext="Direct volunteer tutoring hours"
            variant="gold"
            icon={<Clock className="w-5 h-5 text-gold-700" />}
            badgeText="Delivered"
          />
        </div>
      </section>

      {/* Programmatic Impact Breakdown */}
      <section className="bg-brand-100/60 py-16 border-y border-brand-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            pretitle="SECTORAL OUTCOMES"
            title="Impact by Core Operational Area"
            description="How volunteer efforts translate into concrete results across education, health, emotional well-being, and material relief."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 bg-white border-brand-200/80 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded bg-brand-50 text-brand-800 border border-brand-200">
                  <BookOpen className="w-5 h-5 text-brand-800" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-brand-800">Education & Literacy</h3>
                  <span className="text-xs text-brand-500">Project Udaan & Weekend Classes</span>
                </div>
              </div>
              <ul className="space-y-2 text-xs text-brand-700 leading-relaxed border-t border-brand-100 pt-3">
                <li>• <strong>220+ children</strong> attend weekly 2-hour remedial tutoring circles.</li>
                <li>• <strong>18 children</strong> successfully mainstreamed back into formal government schools.</li>
                <li>• <strong>350 bilingual workbooks</strong> printed and distributed at zero cost to families.</li>
              </ul>
            </Card>

            <Card className="p-6 bg-white border-brand-200/80 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded bg-gold-50 text-gold-800 border border-gold-200">
                  <Smile className="w-5 h-5 text-gold-700" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-brand-800">Mental Well-being</h3>
                  <span className="text-xs text-brand-500">Project Muskaan & Art Therapy</span>
                </div>
              </div>
              <ul className="space-y-2 text-xs text-brand-700 leading-relaxed border-t border-brand-100 pt-3">
                <li>• <strong>140 children</strong> engaged in guided clay modeling, drawing, and storytelling.</li>
                <li>• <strong>12 expressive workshops</strong> facilitated under counselor mentorship.</li>
                <li>• <strong>1 community mural</strong> completed celebrating children's aspirations.</li>
              </ul>
            </Card>

            <Card className="p-6 bg-white border-brand-200/80 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded bg-gold-100/70 text-gold-800 border border-gold-200">
                  <Heart className="w-5 h-5 text-gold-700" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-brand-800">Child Health & Hygiene</h3>
                  <span className="text-xs text-brand-500">Project Swasthya Outreach</span>
                </div>
              </div>
              <ul className="space-y-2 text-xs text-brand-700 leading-relaxed border-t border-brand-100 pt-3">
                <li>• <strong>310 children</strong> completed medical, dental, and eye screenings.</li>
                <li>• <strong>300 hygiene packs</strong> provided (soap, sanitizer, toothbrush, toothpaste).</li>
                <li>• <strong>14 emergency cases</strong> referred and supported at local civil hospital.</li>
              </ul>
            </Card>

            <Card className="p-6 bg-white border-brand-200/80 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded bg-brand-50 text-brand-800 border border-brand-200">
                  <PackageCheck className="w-5 h-5 text-brand-800" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-brand-800">Warmth & Material Relief</h3>
                  <span className="text-xs text-brand-500">Annual Winter Collection</span>
                </div>
              </div>
              <ul className="space-y-2 text-xs text-brand-700 leading-relaxed border-t border-brand-100 pt-3">
                <li>• <strong>850+ woolen garments</strong> inspected, sanitized, and distributed.</li>
                <li>• <strong>250 high-density blankets</strong> procured through transparent bulk tenders.</li>
                <li>• <strong>100% receipt tracking</strong> ensuring zero diversion of donated goods.</li>
              </ul>
            </Card>

            <Card className="p-6 bg-white border-brand-200/80 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded bg-brand-100 text-brand-800 border border-brand-200">
                  <Award className="w-5 h-5 text-brand-700" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-brand-800">Sports & Social Harmony</h3>
                  <span className="text-xs text-brand-500">Annual Khel Utsav</span>
                </div>
              </div>
              <ul className="space-y-2 text-xs text-brand-700 leading-relaxed border-t border-brand-100 pt-3">
                <li>• <strong>180 underprivileged kids</strong> hosted at college athletic grounds.</li>
                <li>• <strong>100% participation medals</strong> and customized sports jerseys awarded.</li>
                <li>• <strong>Healthy warm meals</strong> served to children, guardians, and volunteers.</li>
              </ul>
            </Card>

            <Card className="p-6 bg-white border-brand-200/80 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded bg-gold-50 text-gold-800 border border-gold-200">
                  <Building2 className="w-5 h-5 text-gold-700" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-brand-800">Civic Advocacy</h3>
                  <span className="text-xs text-brand-500">Right to Education (RTE) Drives</span>
                </div>
              </div>
              <ul className="space-y-2 text-xs text-brand-700 leading-relaxed border-t border-brand-100 pt-3">
                <li>• <strong>4 community street plays</strong> conducted on child labor prevention.</li>
                <li>• <strong>200+ daily wage parents</strong> counseled regarding RTE 25% quota provisions.</li>
                <li>• Assisted 14 families in acquiring child birth certificates and Aadhaar cards.</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Field Observer Testimonials / Notes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          pretitle="COMMUNITY VOICES"
          title="Field Observations & Partner Feedback"
          description="Reflections from partner shelter directors and volunteer teachers. (Structured placeholder testimonials)."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6 bg-white border-brand-200 border-l-4 border-l-brand-800 space-y-3">
            <p className="text-xs sm:text-sm text-brand-700 italic leading-relaxed">
              "The consistency of AASRA students has been exceptional. Many student groups visit once a year during festivals, but AASRA volunteers arrive every single Saturday morning at 9:00 AM without fail. That regularity has given our shelter kids the academic confidence they desperately needed."
            </p>
            <div className="pt-2 border-t border-brand-100 flex items-center justify-between text-xs">
              <span className="font-bold text-brand-800">[Director Placeholder]</span>
              <span className="text-brand-500">Partner Children's Home</span>
            </div>
          </Card>

          <Card className="p-6 bg-white border-brand-200 border-l-4 border-l-gold-500 space-y-3">
            <p className="text-xs sm:text-sm text-brand-700 italic leading-relaxed">
              "When we first held teaching sessions at the brick kiln cluster, the children were extremely shy and hesitant to hold a pencil. After 4 months of gentle patience and art sessions, they now rush to greet our college mini-bus with their homework completed."
            </p>
            <div className="pt-2 border-t border-brand-100 flex items-center justify-between text-xs">
              <span className="font-bold text-brand-800">[Student Volunteer Lead Placeholder]</span>
              <span className="text-brand-500">Project Udaan Teaching Team</span>
            </div>
          </Card>
        </div>
      </section>

      {/* Call to action to inspect financial audits */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-4">
        <div className="bg-brand-50/70 border border-brand-200 rounded-lg p-6 sm:p-8 space-y-4">
          <h3 className="text-lg font-bold text-brand-800">
            Audit the Numbers Behind Our Impact
          </h3>
          <p className="text-xs sm:text-sm text-brand-700 max-w-2xl mx-auto">
            Our measurable results are backed by an open-book public transaction ledger. See exactly how every donation is converted into educational supplies and health kits.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button href="/transparency" variant="primary" icon={<Coins className="w-4 h-4" />}>
              Open Transparency Portal
            </Button>
            <Button href="/get-involved" variant="outline">
              Join as Volunteer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
