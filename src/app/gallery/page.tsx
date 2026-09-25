'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Camera,
  Calendar,
  MapPin,
  Maximize2,
  ShieldCheck,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';

type GalleryItem = {
  id: string;
  title: string;
  caption: string | null;
  imageUrl: string;
  category: string;
  eventDate: string;
  location: string | null;
  initiativeId: string | null;
  initiativeName: string | null;
};

const GALLERY_CATEGORIES: { label: string; value: string }[] = [
  { label: 'All Photos', value: 'ALL' },
  { label: 'Education & Classes', value: 'EDUCATION' },
  { label: 'Mental Well-being & Art', value: 'MENTAL_WELLBEING' },
  { label: 'Child Welfare & Health', value: 'CHILD_WELFARE' },
  { label: 'Donation Drives', value: 'DONATIONS' },
  { label: 'Sports & Recreation', value: 'RECREATIONAL' },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGallery() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/public/gallery');

        if (!response.ok) {
          throw new Error('Failed to fetch gallery');
        }

        const result = await response.json();
        setGalleryItems(result.data ?? []);
      } catch (err) {
        console.error('Gallery fetch error:', err);
        setError('Unable to load gallery records right now.');
      } finally {
        setLoading(false);
      }
    }

    fetchGallery();
  }, []);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'ALL') return galleryItems;

    return galleryItems.filter(
      (item) => item.category === activeCategory
    );
  }, [activeCategory, galleryItems]);

  return (
    <div className="space-y-12 py-12 pb-20">
      {/* Banner */}
      <section className="bg-brand-900 text-white py-14 border-b border-brand-800 -mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-400 bg-brand-950/60 px-3 py-1 rounded-full border border-brand-700/60">
              <Camera className="w-3.5 h-3.5" />
              <span>FIELD ARCHIVE & MEDIA RECORDS</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Photographic Records & Gallery
            </h1>

            <p className="text-base sm:text-lg text-brand-200 leading-relaxed">
              Photographic documentation of our teaching circles, health
              camps, warmth drives, and children's sports events. All media
              adheres to our strict child protection charter.
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Child Dignity Disclaimer */}
        <div className="mb-8 p-3.5 rounded-lg bg-brand-100/60 border border-brand-200 text-xs text-brand-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gold-600 shrink-0" />
            <span>
              <strong>Child Privacy & Protection Compliance:</strong> All
              images are captured with express guardian and shelter
              permissions, ensuring dignity, respectful representation, and
              safe media practices.
            </span>
          </div>

          <span className="font-semibold text-brand-600 hidden md:inline">
            Audited Media
          </span>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-brand-200 pb-4 mb-8">
          {GALLERY_CATEGORIES.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveCategory(tab.value)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeCategory === tab.value
                  ? 'bg-brand-800 text-white shadow-sm'
                  : 'bg-white text-brand-700 hover:bg-brand-100 border border-brand-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-16 text-center text-sm text-brand-600">
            Loading gallery records...
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="py-16 text-center text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filteredItems.length === 0 && (
          <div className="py-16 text-center">
            <Camera className="w-10 h-10 mx-auto text-brand-300 mb-3" />
            <p className="text-sm font-medium text-brand-700">
              No gallery records available yet.
            </p>
            <p className="text-xs text-brand-500 mt-1">
              Verified media will appear here once published.
            </p>
          </div>
        )}

        {/* Gallery Grid */}
        {!loading && !error && filteredItems.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedPhoto(item)}
                className="group relative bg-white rounded-lg overflow-hidden border border-brand-200/80 shadow-sm cursor-pointer hover:shadow-md transition-all flex flex-col"
              >
                <div className="relative h-60 w-full overflow-hidden bg-brand-100/40">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  <div className="absolute top-2.5 left-2.5">
                    <Badge variant="brand" size="sm">
                      {item.category.replaceAll('_', ' ')}
                    </Badge>
                  </div>

                  <div className="absolute inset-0 bg-brand-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="p-4 flex flex-col justify-between flex-grow space-y-2">
                  <div>
                    <h3 className="text-sm font-bold text-brand-800 line-clamp-1 group-hover:text-gold-700 transition-colors">
                      {item.title}
                    </h3>

                    {item.caption && (
                      <p className="text-xs text-brand-600 line-clamp-2 mt-1">
                        {item.caption}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-brand-100 flex items-center justify-between text-[11px] text-brand-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(item.eventDate).toLocaleDateString()}
                    </span>

                    {item.location && (
                      <span className="flex items-center gap-1 truncate max-w-[150px]">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <Modal
          isOpen={!!selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          title={selectedPhoto.title}
          maxWidth="2xl"
        >
          <div className="space-y-4">
            <div className="rounded-lg overflow-hidden max-h-[60vh] bg-brand-950 flex items-center justify-center">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                className="max-h-[60vh] w-auto object-contain"
              />
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-brand-800">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Badge variant="brand">
                  {selectedPhoto.category.replaceAll('_', ' ')}
                </Badge>

                <span className="text-brand-600 font-medium">
                  Recorded Date:{' '}
                  {new Date(selectedPhoto.eventDate).toLocaleDateString()}
                </span>
              </div>

              {selectedPhoto.caption && (
                <p className="text-brand-700 leading-relaxed pt-2">
                  {selectedPhoto.caption}
                </p>
              )}

              {selectedPhoto.location && (
                <p className="text-xs text-brand-600 flex items-center gap-1 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-gold-600" />
                  <span>Venue: {selectedPhoto.location}</span>
                </p>
              )}

              {selectedPhoto.initiativeName && (
                <p className="text-xs text-brand-600 pt-1">
                  Initiative: {selectedPhoto.initiativeName}
                </p>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}