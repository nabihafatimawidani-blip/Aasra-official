'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  ShieldCheck,
  Search,
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle2,
  Lock,
  Printer,
} from 'lucide-react';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { type Initiative } from '@/types';

const CATEGORY_OPTIONS = [
  { label: 'All Categories', value: 'ALL' },
  { label: 'Individual Donation', value: 'INDIVIDUAL_DONATION' },
  { label: 'Community Collection', value: 'COMMUNITY_COLLECTION' },
  { label: 'Institutional Grant', value: 'INSTITUTIONAL_GRANT' },
  { label: 'Education Supplies', value: 'EDUCATION_SUPPLIES' },
  { label: 'Nutrition & Food', value: 'NUTRITION_AND_FOOD' },
  { label: 'Healthcare & Hygiene', value: 'HEALTHCARE_AND_HYGIENE' },
  { label: 'Logistics & Transport', value: 'LOGISTICS_AND_TRANSPORT' },
  { label: 'Event Organization', value: 'EVENT_ORGANIZATION' },
  { label: 'Printing & Materials', value: 'PRINTING_AND_MATERIALS' },
];

type PublicTransaction = {
  id: string;
  referenceId: string;
  date: string;
  type: string;
  category: string;
  description: string;
  amount: number;
  paymentMethod: string;
  status: string;
  initiativeId: string | null;
  initiativeName: string | null;
};

export default function TransparencyPage() {
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedInitiative, setSelectedInitiative] =
    useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [transactions, setTransactions] = useState<PublicTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [initiativesRes, transactionsRes] = await Promise.all([
          fetch('/api/initiatives'),
          fetch('/api/public/transactions'),
        ]);

        if (!initiativesRes.ok) {
          throw new Error('Failed to fetch initiatives');
        }

        if (!transactionsRes.ok) {
          throw new Error('Failed to fetch transactions');
        }

        const initiativesData = await initiativesRes.json();
        const transactionsData = await transactionsRes.json();

        setInitiatives(initiativesData.data ?? []);
        setTransactions(transactionsData.data ?? []);
      } catch (error) {
        console.error('Failed to load transparency data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchType =
        selectedType === 'ALL' || tx.type === selectedType;

      const matchCategory =
        selectedCategory === 'ALL' ||
        tx.category === selectedCategory;

      const matchInitiative =
        selectedInitiative === 'ALL' ||
        tx.initiativeId === selectedInitiative ||
        (selectedInitiative === 'GENERAL' && !tx.initiativeId);

      const query = searchQuery.toLowerCase().trim();

      const matchSearch =
        tx.referenceId.toLowerCase().includes(query) ||
        tx.description.toLowerCase().includes(query) ||
        tx.paymentMethod.toLowerCase().includes(query) ||
        (tx.initiativeName
          ? tx.initiativeName.toLowerCase().includes(query)
          : false);

      return (
        matchType &&
        matchCategory &&
        matchInitiative &&
        matchSearch
      );
    });
  }, [
    transactions,
    selectedType,
    selectedCategory,
    selectedInitiative,
    searchQuery,
  ]);

  return (
    <div className="space-y-14 py-12 pb-20">

      {/* Official Banner */}
      <section className="bg-brand-900 text-white py-14 border-b border-brand-800 -mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">

            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-400 bg-brand-800/80 px-3 py-1 rounded-full border border-brand-700">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>PUBLIC AUDIT & OPEN-BOOK REPOSITORY</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Financial Transparency Portal
            </h1>

            <p className="text-base sm:text-lg text-brand-200 leading-relaxed">
              We believe trust is built on openness. Financial records and
              transaction information will be published after verification
              and audit.
            </p>

          </div>
        </div>
      </section>

      {/* Key Financial KPIs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

          <Card className="p-6 bg-white border-brand-200 border-t-4 border-t-brand-700">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-semibold text-brand-500">
                  Total Funds Collected
                </span>

                <p className="text-3xl font-extrabold text-brand-800 mt-1">
                  —
                </p>
              </div>

              <div className="p-3 bg-brand-50 text-brand-800 rounded-lg border border-brand-200">
                <ArrowDownLeft className="w-6 h-6 text-brand-800" />
              </div>
            </div>

            <p className="text-xs text-brand-500 mt-3 pt-3 border-t border-brand-100">
              Financial figures will be published after verification.
            </p>
          </Card>

          <Card className="p-6 bg-white border-brand-200 border-t-4 border-t-gold-500">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-semibold text-brand-500">
                  Total Funds Disbursed
                </span>

                <p className="text-3xl font-extrabold text-gold-700 mt-1">
                  —
                </p>
              </div>

              <div className="p-3 bg-gold-50 text-gold-700 rounded-lg border border-gold-200">
                <ArrowUpRight className="w-6 h-6 text-gold-700" />
              </div>
            </div>

            <p className="text-xs text-brand-500 mt-3 pt-3 border-t border-brand-100">
              Verified expenditure records will be published here.
            </p>
          </Card>

          <Card className="p-6 bg-white border-brand-200 border-t-4 border-t-brand-800">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-semibold text-brand-500">
                  In Trust Current Balance
                </span>

                <p className="text-3xl font-extrabold text-brand-800 mt-1">
                  —
                </p>
              </div>

              <div className="p-3 bg-brand-50 text-brand-800 rounded-lg border border-brand-200">
                <ShieldCheck className="w-6 h-6 text-gold-600" />
              </div>
            </div>

            <p className="text-xs text-brand-500 mt-3 pt-3 border-t border-brand-100">
              Financial records will be published after verification and audit.
            </p>
          </Card>

        </div>
      </section>

      {/* Category Breakdown & Governance */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-lg border border-brand-200 shadow-sm space-y-6">

            <div>
              <h3 className="text-lg font-bold text-brand-800">
                Category-Wise Expenditure Breakdown
              </h3>

              <p className="text-xs text-brand-500 mt-0.5">
                Distribution of disbursed funds across primary intervention categories
              </p>
            </div>

            <div className="rounded-lg border border-brand-100 bg-brand-50 p-4">
              <p className="text-sm font-medium text-brand-800">
                Financial category breakdown will be published after records
                are verified.
              </p>
            </div>

          </div>

          <div className="lg:col-span-5 bg-brand-50/70 p-6 sm:p-8 rounded-lg border border-brand-200 space-y-4 text-xs text-brand-700">

            <div className="flex items-center gap-2 text-brand-800 font-bold uppercase tracking-wider text-xs">
              <ShieldCheck className="w-4 h-4 text-gold-600" />
              <span>Financial Governance Charter</span>
            </div>

            <h4 className="text-base font-bold text-brand-800">
              Financial Accountability
            </h4>

            <p className="leading-relaxed">
              AASRA maintains financial records for organizational
              accountability. Public financial information will be displayed
              after the relevant records have been verified and approved.
            </p>

            <ul className="space-y-2 pt-2 border-t border-brand-200 text-brand-600">

              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 mt-0.5 shrink-0" />
                <span>
                  Student members do not receive administrative salaries from
                  AASRA activities.
                </span>
              </li>

              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 mt-0.5 shrink-0" />
                <span>
                  Purchases and expenditures are subject to organizational
                  review.
                </span>
              </li>

              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 mt-0.5 shrink-0" />
                <span>
                  Personal donor banking information is not publicly exposed.
                </span>
              </li>

            </ul>

            <div className="pt-2">
              <div className="p-3 bg-white rounded border border-brand-200 text-[11px] text-brand-500">
                <strong>Audit Schedule:</strong> Financial records will be
                presented for organizational review according to the approved
                AASRA governance process.
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Public Transaction Ledger */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <Card className="p-6 sm:p-8 bg-white border-brand-200 space-y-6">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-100 pb-4">

            <div>
              <h3 className="text-xl font-bold text-brand-800">
                Public Transaction Ledger
              </h3>

              <p className="text-xs text-brand-500 mt-0.5">
                Verified public transaction records.
              </p>
            </div>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 rounded border border-brand-200 transition-colors"
              title="Print this ledger"
            >
              <Printer className="w-3.5 h-3.5 text-brand-600" />
              <span>Print Ledger</span>
            </button>

          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">

            {/* Search */}
            <div className="lg:col-span-4 relative">

              <Search className="w-4 h-4 text-brand-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Ref ID, description, payment method..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded border border-brand-200 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-white"
              />

            </div>

            {/* Type */}
            <div className="lg:col-span-2">

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full py-2 px-2.5 text-xs rounded border border-brand-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold-500 text-brand-800"
                aria-label="Filter by transaction type"
              >
                <option value="ALL">
                  All Types (Income & Expense)
                </option>

                <option value="INCOME">
                  Income Only
                </option>

                <option value="EXPENSE">
                  Expense Only
                </option>
              </select>

            </div>

            {/* Category */}
            <div className="lg:col-span-3">

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-2 px-2.5 text-xs rounded border border-brand-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold-500 text-brand-800"
                aria-label="Filter by category"
              >
                {CATEGORY_OPTIONS.map((category) => (
                  <option
                    key={category.value}
                    value={category.value}
                  >
                    {category.label}
                  </option>
                ))}
              </select>

            </div>

            {/* Initiative */}
            <div className="lg:col-span-3">

              <select
                value={selectedInitiative}
                onChange={(e) => setSelectedInitiative(e.target.value)}
                className="w-full py-2 px-2.5 text-xs rounded border border-brand-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold-500 text-brand-800"
                aria-label="Filter by initiative"
              >
                <option value="ALL">
                  All Initiatives & General Fund
                </option>

                <option value="GENERAL">
                  General Welfare (Unlinked)
                </option>

                {initiatives.map((initiative) => (
                  <option
                    key={initiative.id}
                    value={initiative.id}
                  >
                    {initiative.title}
                  </option>
                ))}
              </select>

            </div>

          </div>

          {/* Filter Status */}
          <div className="flex items-center justify-between text-xs text-brand-500">

            <span>
              {loading
                ? 'Loading transaction records...'
                : `Showing ${filteredTransactions.length} of ${transactions.length} transaction entries`}
            </span>

            {(selectedType !== 'ALL' ||
              selectedCategory !== 'ALL' ||
              selectedInitiative !== 'ALL' ||
              searchQuery) && (

              <button
                onClick={() => {
                  setSelectedType('ALL');
                  setSelectedCategory('ALL');
                  setSelectedInitiative('ALL');
                  setSearchQuery('');
                }}
                className="text-gold-700 hover:text-gold-800 font-semibold underline"
              >
                Reset Ledger Filters
              </button>

            )}

          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-brand-200">

            <table className="w-full text-left text-xs text-brand-700">

              <thead className="bg-brand-50 text-brand-800 uppercase font-semibold border-b border-brand-200">

                <tr>
                  <th className="py-3 px-3.5">Ref ID</th>
                  <th className="py-3 px-3.5">Date</th>
                  <th className="py-3 px-3.5">Type</th>
                  <th className="py-3 px-3.5">Category</th>
                  <th className="py-3 px-3.5">Description</th>
                  <th className="py-3 px-3.5">Linked Initiative</th>
                  <th className="py-3 px-3.5">Payment Method</th>
                  <th className="py-3 px-3.5 text-right">
                    Amount (₹)
                  </th>
                  <th className="py-3 px-3.5 text-center">
                    Status
                  </th>
                </tr>

              </thead>

              <tbody className="divide-y divide-brand-100 bg-white">

                {loading ? (

                  <tr>
                    <td
                      colSpan={9}
                      className="py-10 text-center text-brand-500"
                    >
                      Loading verified transactions...
                    </td>
                  </tr>

                ) : filteredTransactions.length > 0 ? (

                  filteredTransactions.map((tx) => (

                    <tr
                      key={tx.id}
                      className="hover:bg-brand-50/50 transition-colors"
                    >

                      <td className="py-3 px-3.5 font-mono font-bold text-brand-800 whitespace-nowrap">
                        {tx.referenceId}
                      </td>

                      <td className="py-3 px-3.5 whitespace-nowrap text-brand-500">
                        {new Date(tx.date).toLocaleDateString()}
                      </td>

                      <td className="py-3 px-3.5 whitespace-nowrap">

                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                            tx.type === 'INCOME'
                              ? 'bg-gold-50 text-gold-800 border border-gold-200'
                              : 'bg-brand-50 text-brand-800 border border-brand-200'
                          }`}
                        >
                          {tx.type}
                        </span>

                      </td>

                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <span className="text-brand-600 font-medium">
                          {tx.category.replace(/_/g, ' ')}
                        </span>
                      </td>

                      <td className="py-3 px-3.5 max-w-xs text-brand-800">
                        {tx.description}
                      </td>

                      <td className="py-3 px-3.5 whitespace-nowrap text-brand-600">

                        {tx.initiativeName ? (
                          <span className="text-brand-800 font-medium">
                            {tx.initiativeName}
                          </span>
                        ) : (
                          <span className="text-brand-400 italic">
                            General Fund
                          </span>
                        )}

                      </td>

                      <td className="py-3 px-3.5 whitespace-nowrap text-brand-500">
                        {tx.paymentMethod}
                      </td>

                      <td
                        className={`py-3 px-3.5 text-right font-bold whitespace-nowrap ${
                          tx.type === 'INCOME'
                            ? 'text-gold-700'
                            : 'text-brand-800'
                        }`}
                      >
                        {tx.type === 'INCOME' ? '+' : '-'}₹
                        {tx.amount.toLocaleString()}
                      </td>

                      <td className="py-3 px-3.5 text-center whitespace-nowrap">

                        <Badge variant="brand" size="sm">
                          <CheckCircle2 className="w-3 h-3 text-gold-600 inline" />
                          <span>{tx.status}</span>
                        </Badge>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>
                    <td
                      colSpan={9}
                      className="py-8 text-center text-brand-500"
                    >
                      No verified transactions found.
                    </td>
                  </tr>

                )}

              </tbody>

            </table>

          </div>

          {/* Privacy Notice */}
          <div className="p-3 bg-brand-50/70 rounded border border-brand-200 text-[11px] text-brand-500 flex items-start gap-2">

            <Lock className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />

            <span>
              <strong>Privacy Protection Notice:</strong> In compliance with
              organizational privacy policies and banking ethics, personal
              account numbers, donor addresses, and student roll numbers are
              redacted from the public ledger. Verified vouchers and bank
              statements are preserved in the Council Archives.
            </span>

          </div>

        </Card>

      </section>

    </div>
  );
}