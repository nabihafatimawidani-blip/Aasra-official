import React from 'react';
import Link from 'next/link';

import {
  ShieldCheck,
  HeartHandshake,
  BookOpen,
  Smile,
  Heart,
  PackageOpen,
  Users,
  ArrowRight,
  Calendar,
  MapPin,
  FileText,
  CheckCircle2,
  Coins,
  Building2,
  PhoneCall,
  Eye,
} from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { StatCard } from '@/components/ui/StatCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { prisma } from '@/lib/prisma';
  const featuredInitiatives = await prisma.initiative.findMany({
    where: {
      featured: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 3,
    select: {
      id: true,
      title: true,
    },
  });
export default async function HomePage() {
    const galleryItems = await prisma.galleryItem.findMany({
    orderBy: {
      eventDate: 'desc',
    },
    take: 4,
    select: {
      id: true,
      title: true,
      imageUrl: true,
    },
  });
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">

      {/* HERO */}
      <section
        id="home"
        className="relative w-full min-h-[680px] overflow-hidden bg-brand-950"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat hero-image"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=2070&q=85')",
          }}
        />

        <div className="absolute inset-0 bg-brand-950/65" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[680px] flex items-center">
          <div className="max-w-4xl py-24 sm:py-28">

            <span className="text-xs font-semibold tracking-[0.22em] text-gold-300 uppercase">
              Official Student Welfare Initiative
            </span>

            <h1 className="mt-6 text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white">
              Reaching Children.
              <br />
              <span className="text-brand-100">
                Empowering Lives.
              </span>
              <br />
              <span className="text-gold-400">
                Restoring Hope.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base sm:text-lg text-brand-200 leading-relaxed">
              <strong className="text-white">AASRA</strong> is a student-led
              welfare initiative creating meaningful change through education,
              well-being, community outreach, and direct action.
            </p>

            <div className="flex flex-wrap gap-4 pt-8">
              <Button
                href="/get-involved"
                variant="gold"
                size="lg"
                icon={<HeartHandshake className="w-5 h-5" />}
              >
                Volunteer / Join Us
              </Button>

              <Button
                href="/initiatives"
                variant="outline"
                size="lg"
              >
                Explore Initiatives
              </Button>
            </div>

          </div>
        </div>
      </section>
{/* ABOUT AASRA */}
<section
  id="about"
  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
>
  <div className="grid lg:grid-cols-2 gap-12 items-center">

    <div>
      <Badge>AASRA</Badge>

      <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-brand-950">
        AASRA is about turning hope into action.
      </h2>

      <p className="mt-6 text-brand-700 leading-relaxed">
        We are a student-led welfare initiative working towards creating
        meaningful opportunities and support for children and communities
        that need it most.
      </p>

      <p className="mt-4 text-brand-700 leading-relaxed">
        Through education, well-being, activities and community outreach,
        AASRA aims to make a real and lasting difference.
      </p>
    </div>

    <Card>
      <div className="p-8">
        <HeartHandshake className="w-10 h-10 text-gold-500" />

        <h3 className="mt-5 text-2xl font-bold text-brand-950">
          Our Mission
        </h3>

        <p className="mt-3 text-brand-700 leading-relaxed">
          To create a supportive environment where children can learn,
          grow, express themselves and feel cared for.
        </p>
      </div>
    </Card>

  </div>
</section>
{/* WHAT WE DO */}
<section
  id="what-we-do"
  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
>
  <SectionHeader
    title="What We Do"
    description="Our work focuses on creating meaningful opportunities and support for children."
  />

  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

    <Card>
      <div className="p-6">
        <BookOpen className="w-9 h-9 text-gold-500" />
        <h3 className="mt-4 text-xl font-bold text-brand-950">
          Education
        </h3>
        <p className="mt-2 text-brand-700">
          Supporting children through learning and educational activities.
        </p>
      </div>
    </Card>

    <Card>
      <div className="p-6">
        <Heart className="w-9 h-9 text-gold-500" />
        <h3 className="mt-4 text-xl font-bold text-brand-950">
          Well-being
        </h3>
        <p className="mt-2 text-brand-700">
          Creating spaces where children feel supported and cared for.
        </p>
      </div>
    </Card>

    <Card>
      <div className="p-6">
        <Smile className="w-9 h-9 text-gold-500" />
        <h3 className="mt-4 text-xl font-bold text-brand-950">
          Activities
        </h3>
        <p className="mt-2 text-brand-700">
          Organising creative, recreational and engaging activities.
        </p>
      </div>
    </Card>

    <Card>
      <div className="p-6">
        <Users className="w-9 h-9 text-gold-500" />
        <h3 className="mt-4 text-xl font-bold text-brand-950">
          Community
        </h3>
        <p className="mt-2 text-brand-700">
          Bringing students and communities together to create change.
        </p>
      </div>
    </Card>

  </div>
</section>
{/* IMPACT & STATISTICS */}
<section
  id="impact"
  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
>
  <SectionHeader
    title="Our Impact"
    description="Every action creates a small step towards meaningful change."
  />

  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

    <StatCard
  label="Children Reached"
  value="—"
/>

    <StatCard
      label="Impact"
      value="Growing"
    />


  </div>
</section>
{/* FEATURED INITIATIVES */}
<section
  id="initiatives"
  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
>
  <SectionHeader
    title="Featured Initiatives"
    description="Programs and activities through which AASRA turns its mission into action."
  />

  <div className="grid md:grid-cols-3 gap-6 mt-10">
    {featuredInitiatives.map((initiative) => (
      <Card key={initiative.id}>
        <div className="p-6">
          <div className="w-12 h-12 rounded-xl bg-gold-100 flex items-center justify-center">
            <HeartHandshake className="w-6 h-6 text-gold-600" />
          </div>

          <h3 className="mt-5 text-xl font-bold text-brand-950">
            {initiative.title}
          </h3>

          <p className="mt-3 text-brand-700 leading-relaxed">
            Supporting children through meaningful education, activities, and community outreach.
          </p>

          <div className="mt-5 flex items-center gap-2 text-sm text-brand-600">
            <ArrowRight className="w-4 h-4" />
            Learn more
          </div>
        </div>
      </Card>
    ))}
  </div>
</section>
{/* TRANSPARENCY */}
<section
  id="transparency"
  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
>
  <SectionHeader
    title="Transparency"
    description="We believe our work should always be open, clear, and accountable."
  />

  <div className="grid md:grid-cols-3 gap-6 mt-10">

    <Card>
      <div className="p-6">
        <Coins className="w-9 h-9 text-gold-500" />

        <h3 className="mt-4 text-xl font-bold text-brand-950">
          Funds & Contributions
        </h3>

        <p className="mt-3 text-brand-700 leading-relaxed">
          Contributions and their use are documented to maintain
          transparency in our work.
        </p>
      </div>
    </Card>

    <Card>
      <div className="p-6">
        <FileText className="w-9 h-9 text-gold-500" />

        <h3 className="mt-4 text-xl font-bold text-brand-950">
          Activity Records
        </h3>

        <p className="mt-3 text-brand-700 leading-relaxed">
          Our initiatives and activities are recorded so our progress
          remains clear and accountable.
        </p>
      </div>
    </Card>

    <Card>
      <div className="p-6">
        <Eye className="w-9 h-9 text-gold-500" />

        <h3 className="mt-4 text-xl font-bold text-brand-950">
          Open Reporting
        </h3>

        <p className="mt-3 text-brand-700 leading-relaxed">
          We aim to keep our community informed about where our efforts
          are going and the impact they create.
        </p>
      </div>
    </Card>

  </div>
</section>
{/* GALLERY */}
<section
  id="gallery"
  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
>
  <SectionHeader
    title="Our Gallery"
    description="A glimpse into the people, moments, and activities behind AASRA."
  />

  <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
    {galleryItems.map((item) => (
      <Card key={item.id}>
        <div className="p-6">
          <div className="w-full h-40 bg-brand-100 rounded-xl flex items-center justify-center">
            <span className="text-brand-700 font-medium">
  {item.title}
</span>
          </div>
        </div>
      </Card>
    ))}
  </div>
</section>
{/* GET INVOLVED */}
<section
  id="get-involved"
  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
>
  <div className="rounded-3xl bg-brand-950 p-8 sm:p-12 lg:p-16 text-center">

    <Badge>Get Involved</Badge>

    <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-white">
      Be a part of the change.
    </h2>

    <p className="mt-5 max-w-2xl mx-auto text-brand-200 leading-relaxed">
      Whether you volunteer your time, support an initiative, or simply
      spread the word, every contribution can help create a better future.
    </p>

    <div className="mt-8 flex flex-wrap justify-center gap-4">
      <Button
        href="/get-involved"
        variant="gold"
        size="lg"
        icon={<HeartHandshake className="w-5 h-5" />}
      >
        Join AASRA
      </Button>

      <Button
  href="/get-involved#contact"
  variant="outline"
  size="lg"
>
        Contact Us
      </Button>
    </div>

  </div>
</section>
    </div>
  );
}