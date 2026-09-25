import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Coins, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  HeartHandshake, 
  Share2,
  BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

interface PageProps {
  params: Promise<{ id: string }>;
}
import { prisma } from '@/lib/prisma';
export default async function InitiativeDetailPage({ params }: PageProps) {
  const { id } = await params;

  const initiative = await prisma.initiative.findFirst({
  where: {
    OR: [
      { slug: id },
      { id: id },
    ],
  },
});

  if (!initiative) {
    notFound();
  }

  const coverImageUrl = initiative.coverImageUrl ?? 'https://placehold.co/1200x800/0f172a/f8fafc?text=AASRA+Initiative';

  const relatedTransactions: Array<{
    id: string;
    date: string;
    referenceId: string;
    description: string;
    category: string;
    type: 'INCOME' | 'EXPENSE';
    amount: number;
  }> = [];

  const relatedGallery: Array<{
    id: string;
    title: string;
    caption: string;
    eventDate: string;
    imageUrl: string;
  }> = [];

  const initiativeOutcomes = Array.isArray((initiative as any).keyOutcomes)
    ? ((initiative as any).keyOutcomes as string[])
    : [];

  const formatInitiativeDate = (value: Date | string | null) => {
    if (!value) return 'TBD';
    const date = value instanceof Date ? value : new Date(value);
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="space-y-12 py-10 pb-20">
      {/* Top Breadcrumbs / Back Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/initiatives"
          className="inline-flex items-center gap-2 text-xs font-semibold text-brand-600 hover:text-brand-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Initiatives</span>
        </Link>
      </div>

      {/* Header Banner */}
      <section className="bg-brand-900 text-white py-12 border-b border-brand-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant={
                    initiative.status === 'ONGOING'
                      ? 'brand'
                      : initiative.status === 'UPCOMING'
                      ? 'gold'
                      : 'slate'
                  }
                >
                  {initiative.status}
                </Badge>
                <Badge variant="gold">{initiative.category.replace('_', ' ')}</Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {initiative.title}
              </h1>

              <p className="text-base sm:text-lg text-brand-200 leading-relaxed max-w-2xl">
                {initiative.shortDescription}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-brand-800 text-xs">
                <div>
                  <span className="text-brand-300 block uppercase text-[10px] font-semibold">Beneficiaries</span>
                  <span className="text-base font-bold text-white">{initiative.beneficiariesCount} Children</span>
                </div>
                <div>
                  <span className="text-brand-300 block uppercase text-[10px] font-semibold">Volunteers Engaged</span>
                  <span className="text-base font-bold text-white">{initiative.volunteersCount} Students</span>
                </div>
                <div>
                  <span className="text-brand-300 block uppercase text-[10px] font-semibold">Budget Allocated</span>
                  <span className="text-base font-bold text-white">₹{initiative.budgetAllocated.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-brand-300 block uppercase text-[10px] font-semibold">Verified Spent</span>
                  <span className="text-base font-bold text-gold-400">₹{initiative.amountSpent.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-lg overflow-hidden border border-brand-700 shadow-md">
                <img
                  src={coverImageUrl}
                  alt={initiative.title}
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-10">
            {/* Detailed Description */}
            <Card className="p-6 sm:p-8 bg-white border-brand-200/80">
              <h2 className="text-xl font-bold text-brand-800 border-b border-brand-100 pb-3 mb-4">
                Operational Overview & Narrative
              </h2>
              <div className="prose text-brand-700 text-sm sm:text-base leading-relaxed space-y-4">
                <p>{initiative.fullDescription}</p>
                <p>
                  Ground volunteers operate under the direct oversight of AASRA's executive council and department leads. Structured lesson plans, attendance logs, and student safety checklists are verified prior to each field session.
                </p>
              </div>

              {/* Key Outcomes */}
              {initiativeOutcomes.length > 0 && (
                <div className="mt-8 pt-6 border-t border-brand-100">
                  <h3 className="text-base font-bold text-brand-800 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-gold-600" />
                    Key Milestones & Documented Outcomes
                  </h3>
                  <ul className="space-y-2.5">
                    {initiativeOutcomes.map((outcome, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-brand-700">
                        <span className="w-2 h-2 rounded-full bg-gold-600 mt-1.5 shrink-0" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>

            {/* Initiative Financial Transparency Log */}
            <Card className="p-6 sm:p-8 bg-white border-brand-200/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-brand-100 pb-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-brand-800">
                    Expenditure & Ledger Records
                  </h3>
                  <p className="text-xs text-brand-500">
                    Itemized transactions recorded specifically for {initiative.title}
                  </p>
                </div>
                <Link
                  href="/transparency"
                  className="text-xs font-semibold text-brand-800 hover:text-brand-900 flex items-center gap-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Full Public Ledger</span>
                </Link>
              </div>

              {relatedTransactions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-brand-700">
                    <thead className="bg-brand-50 text-brand-800 uppercase font-semibold border-b border-brand-200">
                      <tr>
                        <th className="py-2.5 px-3">Date</th>
                        <th className="py-2.5 px-3">Ref ID</th>
                        <th className="py-2.5 px-3">Description</th>
                        <th className="py-2.5 px-3">Category</th>
                        <th className="py-2.5 px-3 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-100">
                      {relatedTransactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-brand-50/50">
                          <td className="py-2.5 px-3 whitespace-nowrap text-brand-500">{tx.date}</td>
                          <td className="py-2.5 px-3 font-mono text-[11px] text-brand-800 font-semibold">{tx.referenceId}</td>
                          <td className="py-2.5 px-3 max-w-xs">{tx.description}</td>
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <span className="bg-brand-50 text-brand-700 px-2 py-0.5 rounded text-[10px] border border-brand-200">
                              {tx.category.replace(/_/g, ' ')}
                            </span>
                          </td>
                          <td className={`py-2.5 px-3 text-right font-semibold whitespace-nowrap ${
                            tx.type === 'INCOME' ? 'text-gold-700' : 'text-brand-800'
                          }`}>
                            {tx.type === 'INCOME' ? '+' : '-'}₹{tx.amount.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-6 text-xs text-brand-500 bg-brand-50 rounded border border-brand-200">
                  No individual line-item transactions currently linked to this initiative in the mock ledger.
                </div>
              )}
            </Card>

            {/* Related Field Gallery */}
            {relatedGallery.length > 0 && (
              <Card className="p-6 sm:p-8 bg-white border-brand-200/80">
                <h3 className="text-lg font-bold text-brand-800 mb-4">
                  Photographic Records & Activities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedGallery.map((item) => (
                    <div key={item.id} className="rounded-lg overflow-hidden border border-brand-200">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-44 object-cover"
                      />
                      <div className="p-3 bg-brand-50 text-xs">
                        <p className="font-bold text-brand-800">{item.title}</p>
                        <p className="text-brand-600 text-[11px] mt-0.5">{item.caption}</p>
                        <p className="text-brand-400 text-[10px] mt-1">{item.eventDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Details Card */}
            <Card className="p-6 bg-white border-brand-200/80 space-y-4">
              <h3 className="text-sm font-bold text-brand-800 uppercase tracking-wider border-b border-brand-100 pb-2">
                Initiative Logistics
              </h3>

              <div className="space-y-3 text-xs text-brand-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand-800 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-brand-800">Venue / Target Location</span>
                    <span>{initiative.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-brand-800 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-brand-800">Operational Dates</span>
                    <span>
                      {new Date(initiative.startDate).toLocaleDateString()}{" "}
{initiative.endDate
  ? `to ${new Date(initiative.endDate).toLocaleDateString()}`
  : "(Continuous)"}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-4 h-4 text-brand-800 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-brand-800">Student Volunteer Cohort</span>
                    <span>{initiative.volunteersCount} Active student mentors</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-brand-800">Governance Clearance</span>
                    <span>Student Welfare Council Approved</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-brand-100 space-y-2">
                <Button href="/get-involved" variant="gold" size="sm" fullWidth icon={<HeartHandshake className="w-4 h-4" />}>
                  Volunteer for This Program
                </Button>
                <Button href="/transparency" variant="outline" size="sm" fullWidth>
                  Inspect Full Financials
                </Button>
              </div>
            </Card>

            {/* Child Safety & Conduct Protocol */}
            <Card className="p-6 bg-brand-50/70 border-brand-200 text-xs text-brand-700 space-y-2">
              <h4 className="font-bold text-brand-800 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-gold-600" />
                Child Protection Charter
              </h4>
              <p>
                All AASRA activities adhere strictly to the Child Protection Code of Conduct. Volunteers undergo orientation on child privacy, respectful communication, and zero physical discipline.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
