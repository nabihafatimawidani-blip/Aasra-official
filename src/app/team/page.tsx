import React from 'react';
import { Users, ShieldCheck } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { prisma } from '@/lib/prisma';

export const metadata = {
  title: 'Team | AASRA Official Platform',
  description:
    'Meet the student leaders responsible for guiding and coordinating AASRA initiatives.',
};

const leadershipPhotos: Record<string, string> = {
  President: '/team/president.jpeg',
  'Vice President': '/team/vp1.jpeg',
  'General Secretary': '/team/general sec.jpeg',
  'Joint Secretary': '/team/joint sec.jpeg',
  'Event & Planning Coordinator': '/team/event-managment.jpeg',
  'Welfare Coordinator': '/team/welfare sec.jpeg',
  'Volunteer Coordinator': '/team/volunteer.jpeg',
  'Media & Marketing': '/team/media-marketing.jpeg',
  'Media Secretary': '/team/media sec.jpeg',
  Treasurer: '/team/treasurer.jpeg',
};

type TeamMember = {
  id: string;
  name: string;
  role: string;
  department: string;
  tier: string;
  bio: string | null;
  photoUrl: string | null;
  linkedinUrl: string | null;
  joinedYear: string;
};

const FALLBACK_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-president',
    name: 'Miryala Pragnya',
    role: 'President',
    department: 'Executive Board',
    tier: 'GOVERNING_BODY',
    bio: 'Leads strategic initiatives, institutional partnerships, and college council coordination.',
    photoUrl: '/team/president.jpeg',
    linkedinUrl: null,
    joinedYear: '2025',
  },
  {
    id: 'team-vice-president',
    name: 'Nabiha Fatima',
    role: 'Vice President',
    department: 'Executive Board',
    tier: 'GOVERNING_BODY',
    bio: 'Supports the President and oversees major organizational operations and student activities.',
    photoUrl: '/team/vp1.jpeg',
    linkedinUrl: null,
    joinedYear: '2025',
  },
  {
    id: 'team-general-secretary',
    name: 'Yamini Mogullapally',
    role: 'General Secretary',
    department: 'Secretarial Team',
    tier: 'GOVERNING_BODY',
    bio: 'Coordinates documentation, communication, and organizational administration.',
    photoUrl: '/team/general sec.jpeg',
    linkedinUrl: null,
    joinedYear: '2025',
  },
  {
    id: 'team-joint-secretary',
    name: 'Anagha Gundamraju',
    role: 'Joint Secretary',
    department: 'Secretarial Team',
    tier: 'GOVERNING_BODY',
    bio: 'Supports the General Secretary and assists with organizational coordination.',
    photoUrl: '/team/joint sec.jpeg',
    linkedinUrl: null,
    joinedYear: '2025',
  },
  {
    id: 'team-welfare-coordinator',
    name: 'Khudsia',
    role: 'Welfare Coordinator',
    department: 'Welfare & Outreach',
    tier: 'GOVERNING_BODY',
    bio: 'Coordinates student welfare, outreach activities, and community support initiatives.',
    photoUrl: '/team/welfare sec.jpeg',
    linkedinUrl: null,
    joinedYear: '2025',
  },
  {
    id: 'team-event-planning',
    name: 'G. Meghana Sree',
    role: 'Event & Planning Coordinator',
    department: 'Events & Planning',
    tier: 'GOVERNING_BODY',
    bio: 'Plans and coordinates AASRA events, activities, and student engagement programs.',
    photoUrl: '/team/event-managment.jpeg',
    linkedinUrl: null,
    joinedYear: '2025',
  },
  {
    id: 'team-volunteer-coordinator',
    name: 'M. Jayanth',
    role: 'Volunteer Coordinator',
    department: 'Volunteer Management',
    tier: 'GOVERNING_BODY',
    bio: 'Coordinates volunteers and supports the execution of AASRA initiatives.',
    photoUrl: '/team/volunteer.jpeg',
    linkedinUrl: null,
    joinedYear: '2025',
  },
  {
    id: 'team-media-marketing',
    name: 'Kakani Naga Sai Haritha',
    role: 'Media & Marketing',
    department: 'Media & Communications',
    tier: 'GOVERNING_BODY',
    bio: 'Handles media communication, outreach, promotional activities, and AASRA’s public presence.',
    photoUrl: '/team/media-marketing.jpeg',
    linkedinUrl: null,
    joinedYear: '2025',
  },
  {
    id: 'team-media-secretary',
    name: 'Goli Yashwasin',
    role: 'Media Secretary',
    department: 'Media & Communications',
    tier: 'GOVERNING_BODY',
    bio: 'Supports media communication, outreach, promotional activities, and AASRA’s public presence.',
    photoUrl: '/team/media sec.jpeg',
    linkedinUrl: null,
    joinedYear: '2025',
  },
  {
    id: 'team-treasurer',
    name: 'Bondili Keerthana',
    role: 'Treasurer',
    department: 'Finance',
    tier: 'GOVERNING_BODY',
    bio: 'Supports financial coordination and transparent management of organizational funds.',
    photoUrl: '/team/treasurer.jpeg',
    linkedinUrl: null,
    joinedYear: '2025',
  },
];

function MemberCard({
  member,
}: {
  member: TeamMember;
}) {
  const rawPhoto =
    leadershipPhotos[member.role] ||
    member.photoUrl ||
    (member.role === 'Volunteer Coordinator' ? '/team/volunteer.jpeg' : null);

  const photo = rawPhoto ? encodeURI(rawPhoto) : null;

  return (
    <Card
      className="p-6 bg-white border-brand-200/80 flex flex-col justify-between"
      hoverEffect
    >
      <div className="space-y-4">
        {/* Profile Image */}
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-brand-100 border-2 border-brand-200">
          {photo ? (
            <img
              src={photo}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-brand-500 text-2xl font-bold">
              {member.name
                .split(' ')
                .map((name) => name[0])
                .slice(0, 2)
                .join('')}
            </div>
          )}
        </div>

        {/* Name + Role */}
        <div className="text-center">
          <h3 className="text-base font-bold text-brand-800">
            {member.name}
          </h3>

          <Badge variant="gold" size="sm" className="mt-2">
            {member.role}
          </Badge>

          <p className="text-[11px] text-brand-500 mt-2">
            {member.department}
          </p>
        </div>

        {/* Bio */}
        {member.bio && (
          <p className="text-xs text-brand-700 leading-relaxed text-center pt-3 border-t border-brand-100">
            {member.bio}
          </p>
        )}
      </div>

      {/* Member Status */}
      <div className="pt-4 mt-4 border-t border-brand-100 flex items-center justify-between text-[11px]">
        <span className="text-brand-400">
          Since {member.joinedYear}
        </span>

        <span className="text-gold-700 font-semibold">
          Active
        </span>
      </div>
    </Card>
  );
}

export default async function TeamPage() {
  let teamMembers: TeamMember[] = [];

  try {
    teamMembers = await prisma.teamMember.findMany({
      where: {
        active: true,
      },
      select: {
        id: true,
        name: true,
        role: true,
        department: true,
        tier: true,
        bio: true,
        photoUrl: true,
        linkedinUrl: true,
        joinedYear: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  } catch (error) {
    console.error('Error fetching team members from database:', error);
  }

  const members =
    teamMembers && teamMembers.length > 0
      ? teamMembers
      : FALLBACK_TEAM_MEMBERS;

  const president = members.find((member) => member.role === 'President');

  const vicePresidents = members.filter(
    (member) =>
      member.role === 'Vice President' ||
      member.role.toLowerCase().includes('vice president')
  );

  const secretaries = members.filter(
    (member) =>
      member.role === 'General Secretary' ||
      member.role === 'Joint Secretary'
  );

  const coordinators = members.filter(
    (member) =>
      member.role === 'Welfare Coordinator' ||
      member.role === 'Event & Planning Coordinator' ||
      member.role === 'Volunteer Coordinator'
  );

  const mediaMarketing = members.filter(
    (member) =>
      member.role === 'Media & Marketing' ||
      member.role === 'Media Secretary'
  );

  const treasurer = members.find((member) => member.role === 'Treasurer');

  return (
    <div className="space-y-16 py-12 pb-20">
      {/* Banner */}
      <section className="bg-brand-900 text-white py-14 border-b border-brand-800 -mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-400 bg-brand-800/80 px-3 py-1 rounded-full border border-brand-700">
              <Users className="w-3.5 h-3.5" />
              <span>STUDENT WELFARE LEADERSHIP</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Our Team
            </h1>

            <p className="text-base sm:text-lg text-brand-200 leading-relaxed">
              AASRA is a student-led welfare initiative committed to creating
              meaningful opportunities for education, well-being, and community
              support. Meet the student leaders guiding the initiative.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Notice */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 rounded-lg bg-brand-50/70 border border-brand-200 text-xs text-brand-700 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-gold-600 shrink-0" />

          <span>
            <strong>Student Leadership:</strong> AASRA is guided by its
            student leadership team, working together to coordinate its
            initiatives and community activities.
          </span>
        </div>
      </div>

      {/* PRESIDENT + VICE PRESIDENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          pretitle="AASRA LEADERSHIP"
          title="President & Vice President"
          description="The core leadership responsible for guiding AASRA and coordinating its major initiatives."
        />

        <div
          className={`grid grid-cols-1 gap-6 mx-auto mt-10 ${
            vicePresidents.length > 2
              ? 'sm:grid-cols-2 lg:grid-cols-4 max-w-6xl'
              : vicePresidents.length === 2
                ? 'sm:grid-cols-3 max-w-4xl'
                : 'sm:grid-cols-2 max-w-3xl'
          }`}
        >
          {president && <MemberCard member={president} />}
          {vicePresidents.map((vp) => (
            <MemberCard key={vp.id} member={vp} />
          ))}
        </div>
      </section>

      {/* SECRETARIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          pretitle="ADMINISTRATION"
          title="Secretaries"
          description="Responsible for coordination, documentation, communication, and administrative support."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto mt-10">
          {secretaries.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </section>

      {/* COORDINATORS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          pretitle="OPERATIONS"
          title="Coordinators"
          description="Supporting AASRA activities, student teams, outreach programs, and welfare initiatives."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {coordinators.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </section>

      {/* MEDIA & MARKETING */}
      <section className="py-16">
        <SectionHeader
          pretitle="MEDIA & COMMUNICATIONS"
          title="Media & Marketing"
          description="Responsible for media communication, outreach, promotional activities, and AASRA’s public presence."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto mt-10">
          {mediaMarketing.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </section>

      {/* TREASURER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          pretitle="FINANCE"
          title="Treasurer"
          description="Responsible for maintaining financial records and supporting transparent management of AASRA resources."
        />

        <div className="flex justify-center mt-10">
          {treasurer && (
            <div className="w-full max-w-sm">
              <MemberCard member={treasurer} />
            </div>
          )}
        </div>
      </section>

      {/* Leadership Statement */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg border border-brand-200/80 p-8 sm:p-10 text-center shadow-sm">
          <div className="w-12 h-12 rounded-full bg-brand-50 text-brand-800 flex items-center justify-center mx-auto border border-brand-200">
            <Users className="w-6 h-6 text-gold-600" />
          </div>

          <h3 className="text-xl font-bold text-brand-800 mt-4">
            Student-Led. Community-Focused.
          </h3>

          <p className="text-sm text-brand-700 max-w-2xl mx-auto leading-relaxed mt-3">
            AASRA is built on student initiative and collective responsibility.
            The leadership team works alongside volunteers and the wider
            student community to plan and carry out meaningful welfare
            activities.
          </p>
        </div>
      </section>
    </div>
  );
}
