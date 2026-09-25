'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  Users, 
  ArrowRight, 
  Coins, 
  BookOpen, 
  Sparkles,
  Layers
} from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { type Initiative, InitiativeCategory, InitiativeStatus } from '@/types';

const CATEGORIES: { label: string; value: string }[] = [
  { label: 'All Categories', value: 'ALL' },
  { label: 'Education', value: 'EDUCATION' },
  { label: 'Child Welfare', value: 'CHILD_WELFARE' },
  { label: 'Mental Well-being', value: 'MENTAL_WELLBEING' },
  { label: 'Awareness', value: 'AWARENESS' },
  { label: 'Donation Drives', value: 'DONATIONS' },
  { label: 'Recreational', value: 'RECREATIONAL' },
  { label: 'Community Outreach', value: 'COMMUNITY_OUTREACH' },
];

const STATUSES: { label: string; value: string }[] = [
  { label: 'All Statuses', value: 'ALL' },
  { label: 'Ongoing', value: 'ONGOING' },
  { label: 'Completed', value: 'COMPLETED' },
  { label: 'Upcoming', value: 'UPCOMING' },
];

export default function InitiativesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);

  useEffect(() => {
    const loadInitiatives = async () => {
      try {
        const res = await fetch('/api/initiatives');

        if (!res.ok) {
          throw new Error('Failed to fetch initiatives');
        }

        const data = await res.json();
        setInitiatives(data.data ?? []);
      } catch (error) {
        console.error('Failed to load initiatives:', error);
      }
    };

    loadInitiatives();
  }, []);

  const filteredInitiatives = useMemo(() => {
    return initiatives.filter((item) => {
      const matchCategory =
        selectedCategory === 'ALL' || item.category === selectedCategory;
      const matchStatus =
        selectedStatus === 'ALL' || item.status === selectedStatus;
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchStatus && matchSearch;
    });
  }, [initiatives, selectedCategory, selectedStatus, searchQuery]);

  return (
    <div className="space-y-12 py-12 pb-20">
      {/* Banner */}
      <section className="bg-brand-900 text-white py-14 border-b border-brand-800 -mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-400 bg-brand-800/80 px-3 py-1 rounded-full border border-brand-700">
              <Layers className="w-3.5 h-3.5" />
              <span>COMMUNITY ACTION PORTFOLIO</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Initiatives & Programs
            </h1>
            <p className="text-base sm:text-lg text-brand-200 leading-relaxed">
              Explore our active teaching centers, health checkups, mental wellness workshops, and community donation drives. Designed to be database-driven and fully verifiable.
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and Filters Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-lg border border-brand-200 shadow-sm space-y-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-brand-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search initiatives by keyword, location, or focus area..."
                className="w-full pl-10 pr-4 py-2.5 rounded-md border border-brand-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 text-brand-800 bg-white"
              />
            </div>

            {/* Category Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-2.5 px-3 rounded-md border border-brand-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 bg-white text-brand-800"
                aria-label="Filter by category"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full py-2.5 px-3 rounded-md border border-brand-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 bg-white text-brand-800"
                aria-label="Filter by status"
              >
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Active Filter Badges */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-brand-500 pt-2 border-t border-brand-100">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-brand-700">Displaying:</span>
              <span>{filteredInitiatives.length} initiatives found</span>
            </div>
            {(selectedCategory !== 'ALL' || selectedStatus !== 'ALL' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('ALL');
                  setSelectedStatus('ALL');
                  setSearchQuery('');
                }}
                className="text-gold-700 hover:text-gold-800 font-semibold underline"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>

        {/* Initiatives Grid */}
        {filteredInitiatives.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInitiatives.map((init) => (
              <Card key={init.id} className="flex flex-col h-full bg-white border-brand-200/80" hoverEffect>
                <div className="relative h-48 w-full bg-brand-100 overflow-hidden">
                  <img
                    src={init.coverImageUrl}
                    alt={init.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
                    <Badge
                      variant={
                        init.status === 'ONGOING'
                          ? 'brand'
                          : init.status === 'UPCOMING'
                          ? 'gold'
                          : 'slate'
                      }
                    >
                      {init.status}
                    </Badge>
                    <Badge variant="gold">{init.category.replace('_', ' ')}</Badge>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-brand-800 leading-snug">
                      <Link
                        href={`/initiatives/${init.slug}`}
                        className="hover:text-brand-600 transition-colors"
                      >
                        {init.title}
                      </Link>
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-700 line-clamp-3">
                      {init.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-brand-100 space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-xs text-brand-500">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                        <span>{init.beneficiariesCount} Beneficiaries</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                        <span>{init.volunteersCount} Volunteers</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Coins className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                        <span>₹{init.amountSpent.toLocaleString()} Spent</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                        <span className="truncate">{init.location}</span>
                      </div>
                    </div>

                    <Button
                      href={`/initiatives/${init.slug}`}
                      variant="outline"
                      size="sm"
                      fullWidth
                      icon={<ArrowRight className="w-4 h-4 text-gold-600" />}
                      iconPosition="right"
                    >
                      View Report & Ledger
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-lg border border-brand-200 space-y-3">
            <p className="text-base font-semibold text-brand-800">No initiatives match your criteria.</p>
            <p className="text-xs text-brand-500">
              Try adjusting your category, status, or search keywords.
            </p>
            <Button
              onClick={() => {
                setSelectedCategory('ALL');
                setSelectedStatus('ALL');
                setSearchQuery('');
              }}
              variant="secondary"
              size="sm"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
