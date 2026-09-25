import React from 'react';
import {
  ShieldCheck,
  Handshake,
  CheckCircle2,
} from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';


export const metadata = {
  title: 'Partners & Collaborations | AASRA Official Platform',
  description:
    'Institutional alliances, certified NGO collaborators, adopted municipal schools, and community shelters partnering with AASRA.',
};

export default function PartnersPage() {
  return (
    <div className="space-y-16 py-12 pb-20">
      {/* Banner */}
      <section className="bg-brand-900 text-white py-14 border-b border-brand-800 -mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-400 bg-brand-800/80 px-3 py-1 rounded-full border border-brand-700">
              <Handshake className="w-3.5 h-3.5" />
              <span>COMMUNITY ALLIANCES & INSTITUTIONS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Institutional Partners & Collaborators
            </h1>
            <p className="text-base sm:text-lg text-brand-200 leading-relaxed">
              Meaningful social impact requires collective synergy. We collaborate with grassroots NGOs, municipal primary schools, and healthcare centers to ensure sustainable on-ground support.
            </p>
          </div>
        </div>
      </section>

      {/* Structured Placeholder Notice */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 rounded-lg bg-brand-50/70 border border-brand-200 text-xs text-brand-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gold-600 shrink-0" />
            <span>
              <strong>Partnership Verification:</strong> AASRA publishes partner information only after formal confirmation and institutional approval. Verified collaborations will be added to this page as they are established.
            </span>
          </div>
          <span className="font-semibold text-brand-800 hidden sm:inline">Institutional Framework</span>
        </div>
      </div>

      {/* Partners Grid */}
     <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <SectionHeader
    pretitle="ALLIED ENTITIES"
    title="Active Collaborative Network"
    description="Verified organizations and institutions collaborating with AASRA will be listed here."
  />

  <div className="max-w-3xl mx-auto mt-10">
    <Card className="p-8 sm:p-10 bg-white border-brand-200/80 text-center">
      <div className="w-14 h-14 mx-auto rounded-full bg-brand-50 border border-brand-200 flex items-center justify-center">
        <Handshake className="w-7 h-7 text-gold-600" />
      </div>

      <h3 className="text-lg font-bold text-brand-800 mt-5">
        Partnerships Under Development
      </h3>

      <p className="text-sm text-brand-600 leading-relaxed mt-3 max-w-xl mx-auto">
        AASRA is currently establishing institutional collaborations with
        verified child welfare organizations, educational institutions,
        healthcare providers, and community partners.
      </p>

      <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-brand-700 bg-brand-50 border border-brand-200 px-4 py-2 rounded-full">
        <ShieldCheck className="w-4 h-4 text-gold-600" />
        Verified partnerships will be published after formal approval.
      </div>
    </Card>
  </div>
</section>

      {/* Partnering Criteria Charter */}
      <section className="bg-brand-100/60 py-16 border-y border-brand-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-6 text-center">
            <SectionHeader
              pretitle="COLLABORATION CHARTER"
              title="Interested in Partnering with AASRA?"
              description="We welcome collaboration with certified non-governmental organizations, municipal primary schools, shelter homes, and corporate CSR entities committed to transparent child welfare."
              centered
            />

            <div className="text-left bg-white p-6 sm:p-8 rounded-lg border border-brand-200 shadow-sm space-y-4 text-xs sm:text-sm text-brand-700">
              <h4 className="font-bold text-brand-800 text-base">Our Due-Diligence Criteria:</h4>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                  <span>Verified registration under recognized non-profit / society / institutional trusts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                  <span>Adherence to mandatory child protection policies and transparent financial record keeping.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                  <span>Mutual commitment to zero religious, political, or discriminatory promotion during welfare activities.</span>
                </li>
              </ul>

              <div className="pt-4 text-center">
                <Button href="/get-involved#contact" variant="primary" icon={<Handshake className="w-4 h-4" />}>
                  Initiate Partnership Inquiry
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
