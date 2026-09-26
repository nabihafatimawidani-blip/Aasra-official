import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Mail, 
  MapPin, 
  HeartHandshake, 
  FileText, 
  ExternalLink,
  Lock
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-900 text-brand-200 border-t-4 border-brand-700">
      {/* Upper Footer: Governance Banner */}
      <div className="border-b border-brand-800 bg-brand-950/70 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-800 rounded-lg text-gold-400 border border-brand-700">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                Student Welfare Governance Charter
              </h4>
              <p className="text-xs text-brand-300">
                100% Volunteer-driven. 0% Administrative overhead from public donations. Complete itemized public ledger.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/transparency"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-brand-800 hover:bg-brand-700 text-brand-100 text-xs font-semibold transition-colors border border-brand-700"
            >
              <FileText className="w-3.5 h-3.5 text-gold-400" />
              <span>Public Financial Ledger</span>
            </Link>
            <Link
              href="/get-involved"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-gold-500 hover:bg-gold-600 text-brand-950 text-xs font-semibold transition-colors shadow-sm"
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Volunteer with Us</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1: Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-800 text-white flex flex-col items-center justify-center border border-brand-700">
                <span className="text-sm font-black tracking-widest">आ</span>
                <span className="text-[8px] uppercase tracking-tighter text-gold-400 font-bold">AASRA</span>
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight">AASRA</span>
                <p className="text-xs text-gold-400/90 font-medium">Sreyas Institute of Engineering and Technology</p>
                <p className="text-xs text-brand-300">Student Social Welfare & Community Outreach</p>
              </div>
            </div>

            <p className="text-sm text-brand-200 leading-relaxed pr-4">
              AASRA is an officially recognized, student-led social welfare initiative at Sreyas Institute of Engineering and Technology, dedicated to uplifting underprivileged children and vulnerable communities through remedial education, emotional well-being, health awareness, and transparent community drives.
            </p>

            <div className="pt-2 text-xs text-brand-300 space-y-1">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-400/80 shrink-0 mt-0.5" />
                <span>Student Welfare Office, Room #204, Campus Activity Centre, Sreyas Institute of Engineering and Technology</span>
              </div>
              <div className="flex items-center gap-2">
  <Mail className="w-4 h-4 text-gold-400/80 shrink-0" />
  <span>Official correspondence details will be published after approval.</span>
</div>
            </div>
          </div>

          {/* Col 2: About AASRA */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider border-b border-brand-800 pb-2">
              About Organization
            </h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-brand-300 hover:text-gold-300 transition-colors">
                  Our Motive & Genesis
                </Link>
              </li>
              <li>
                <Link href="/about#story" className="text-brand-300 hover:text-gold-300 transition-colors">
                  Our Story & Milestones
                </Link>
              </li>
              <li>
                <Link href="/about#founders" className="text-brand-300 hover:text-gold-300 transition-colors">
                  Founders & Advisory
                </Link>
              </li>
              <li>
                <Link href="/about#vision" className="text-brand-300 hover:text-gold-300 transition-colors">
                  Vision, Mission & Values
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-brand-300 hover:text-gold-300 transition-colors">
                  Student Executive Council
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Programs & Impact */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider border-b border-brand-800 pb-2">
              Programs & Impact
            </h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/initiatives" className="text-brand-300 hover:text-gold-300 transition-colors">
                  All Initiatives & Drives
                </Link>
              </li>
              <li>
                <Link href="/initiatives/project-udaan-weekend-schooling" className="text-brand-300 hover:text-gold-300 transition-colors">
                  Project Udaan (Education)
                </Link>
              </li>
              <li>
                <Link href="/initiatives/muskaan-mental-wellbeing-and-art" className="text-brand-300 hover:text-gold-300 transition-colors">
                  Muskaan (Art & Wellness)
                </Link>
              </li>
              <li>
                <Link href="/impact" className="text-brand-300 hover:text-gold-300 transition-colors">
                  Verified Impact Metrics
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-brand-300 hover:text-gold-300 transition-colors">
                  Field Photo Archive
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Governance & Participation */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider border-b border-brand-800 pb-2">
              Integrity & Action
            </h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/transparency" className="text-brand-300 hover:text-gold-300 transition-colors flex items-center gap-1">
                  <span>Financial Transparency</span>
                  <span className="text-[10px] bg-brand-950 text-gold-400 px-1.5 py-0.5 rounded border border-gold-800/40">Public</span>
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-brand-300 hover:text-gold-300 transition-colors">
                  Partner NGOs & Shelters
                </Link>
              </li>
              <li>
                <Link href="/get-involved" className="text-brand-300 hover:text-gold-300 transition-colors">
                  Volunteer Application
                </Link>
              </li>
              <li>
                <Link href="/get-involved#donate" className="text-brand-300 hover:text-gold-300 transition-colors">
                  Donation Policy Notice
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Governance Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-brand-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-400">
          <div>
            © {new Date().getFullYear()} AASRA • Sreyas Institute of Engineering and Technology. Official campus institutional portal.
          </div>
          <div className="flex items-center gap-6">
            <span>Student Affairs Advisory Charter</span>
            <span>•</span>
            <span>Non-Commercial Student Entity</span>
            <span>•</span>
            <Link href="/transparency" className="hover:text-gold-300 transition-colors underline decoration-brand-700">
              Audit Disclosures
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
