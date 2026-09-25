import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const teamMembers: Prisma.TeamMemberCreateInput[] = [
  {
    id: 'team-president',
    name: 'Miryala Pragnya',
    role: 'President',
    department: 'Executive Board',
    tier: 'GOVERNING_BODY',
    bio: 'Leads strategic initiatives, institutional partnerships, and college council coordination.',
    photoUrl: '/team/president.jpeg',
    joinedYear: '2025',
    active: true,
  },
  {
    id: 'team-vice-president',
    name: 'Nabiha Fatima',
    role: 'Vice President',
    department: 'Executive Board',
    tier: 'GOVERNING_BODY',
    bio: 'Supports the President and oversees major organizational operations and student activities.',
    photoUrl: '/team/vp1.jpeg',
    joinedYear: '2025',
    active: true,
  },
  {
    id: 'team-general-secretary',
    name: 'Yamini Mogullapally',
    role: 'General Secretary',
    department: 'Secretarial Team',
    tier: 'GOVERNING_BODY',
    bio: 'Coordinates documentation, communication, and organizational administration.',
    photoUrl: null,
    joinedYear: '2025',
    active: true,
  },
  {
    id: 'team-joint-secretary',
    name: 'Anagha Gundamraju',
    role: 'Joint Secretary',
    department: 'Secretarial Team',
    tier: 'GOVERNING_BODY',
    bio: 'Supports the General Secretary and assists with organizational coordination.',
    photoUrl: '/team/joint-secretary.jpeg',
    joinedYear: '2025',
    active: true,
  },
  {
    id: 'team-welfare-coordinator',
    name: 'Khudsia',
    role: 'Welfare Coordinator',
    department: 'Welfare & Outreach',
    tier: 'GOVERNING_BODY',
    bio: 'Coordinates student welfare, outreach activities, and community support initiatives.',
    photoUrl: '/team/welfare-coordinator.jpeg',
    joinedYear: '2025',
    active: true,
  },
  {
    id: 'team-event-planning',
    name: 'G. Meghana Sree',
    role: 'Event & Planning Coordinator',
    department: 'Events & Planning',
    tier: 'GOVERNING_BODY',
    bio: 'Plans and coordinates AASRA events, activities, and student engagement programs.',
    photoUrl: null,
    joinedYear: '2025',
    active: true,
  },
  {
    id: 'team-volunteer-coordinator',
    name: 'M. Jayanth',
    role: 'Volunteer Coordinator',
    department: 'Volunteer Management',
    tier: 'GOVERNING_BODY',
    bio: 'Coordinates volunteers and supports the execution of AASRA initiatives.',
    photoUrl: null,
    joinedYear: '2025',
    active: true,
  },
  {
    id: 'team-media-marketing',
    name: 'Kakani Naga Sai Haritha',
    role: 'Media & Marketing',
    department: 'Media & Communications',
    tier: 'GOVERNING_BODY',
    bio: 'Handles media communication, outreach, promotional activities, and AASRA’s public presence.',
    photoUrl: '/team/media-marketing.jpeg',
    joinedYear: '2025',
    active: true,
  },
    {
    id: 'team-media-secretary',
    name: 'Goli Yashwasin',
    role: 'Media Secretary',
    department: 'Media & Communications',
    tier: 'GOVERNING_BODY',
    bio: 'Supports media communication, outreach, promotional activities, and AASRA’s public presence.',
    photoUrl: '/team/media sec.jpeg',
    joinedYear: '2025',
    active: true,
  },
  {
    id: 'team-treasurer',
    name: 'Bondili Keerthana',
    role: 'Treasurer',
    department: 'Finance',
    tier: 'GOVERNING_BODY',
    bio: 'Supports financial coordination and transparent management of organizational funds.',
    photoUrl: null,
    joinedYear: '2025',
    active: true,
  },
];

const initiatives: Prisma.InitiativeCreateInput[] = [
  {
    id: 'init-1',
    slug: 'project-udaan',
    title: 'Project Udaan: Weekend Learning Camps',
    category: 'EDUCATION',
    status: 'ONGOING',
    shortDescription: 'Weekend learning support for children.',
    fullDescription:
      'Regular educational sessions focused on foundational learning and academic support.',
    location: 'Hyderabad',
    startDate: new Date('2026-01-01'),
    beneficiariesCount: 50,
    volunteersCount: 10,
    budgetAllocated: 50000,
    amountSpent: 0,
    featured: true,
  },
  {
    id: 'init-2',
    slug: 'muskaan',
    title: 'Muskaan',
    category: 'MENTAL_WELLBEING',
    status: 'ONGOING',
    shortDescription: "Supporting children's emotional wellbeing.",
    fullDescription:
      'Activities and support sessions focused on emotional wellbeing and confidence.',
    location: 'Hyderabad',
    startDate: new Date('2026-01-01'),
    beneficiariesCount: 40,
    volunteersCount: 8,
    budgetAllocated: 30000,
    amountSpent: 0,
    featured: true,
  },
  {
    id: 'init-3',
    slug: 'aanchal',
    title: 'Aanchal',
    category: 'CHILD_WELFARE',
    status: 'ONGOING',
    shortDescription:
      'Creating a safe and supportive environment for children.',
    fullDescription:
      'Community outreach and welfare activities for children in need.',
    location: 'Hyderabad',
    startDate: new Date('2026-01-01'),
    beneficiariesCount: 35,
    volunteersCount: 7,
    budgetAllocated: 25000,
    amountSpent: 0,
    featured: false,
  },
  {
    id: 'init-4',
    slug: 'swasthya',
    title: 'Swasthya',
    category: 'HEALTHCARE',
    status: 'ONGOING',
    shortDescription: 'Health and hygiene awareness initiatives.',
    fullDescription:
      'Health, hygiene and basic wellness activities for children and communities.',
    location: 'Hyderabad',
    startDate: new Date('2026-01-01'),
    beneficiariesCount: 60,
    volunteersCount: 12,
    budgetAllocated: 40000,
    amountSpent: 0,
    featured: true,
  },
  {
    id: 'init-5',
    slug: 'khel-utsav',
    title: 'Khel Utsav',
    category: 'RECREATIONAL',
    status: 'ONGOING',
    shortDescription:
      'Sports and recreational activities for children.',
    fullDescription:
      'Encouraging physical activity, teamwork and confidence through sports.',
    location: 'Hyderabad',
    startDate: new Date('2026-01-01'),
    beneficiariesCount: 45,
    volunteersCount: 9,
    budgetAllocated: 30000,
    amountSpent: 0,
    featured: false,
  },
  {
    id: 'init-6',
    slug: 'bal-adhikar',
    title: 'Bal Adhikar',
    category: 'CHILD_WELFARE',
    status: 'ONGOING',
    shortDescription:
      "Promoting awareness of children's rights.",
    fullDescription:
      'Outreach activities focused on child rights, safety and dignity.',
    location: 'Hyderabad',
    startDate: new Date('2026-01-01'),
    beneficiariesCount: 50,
    volunteersCount: 10,
    budgetAllocated: 35000,
    amountSpent: 0,
    featured: false,
  },
];

async function main() {
  // =========================
  // TEAM MEMBERS
  // =========================

  for (const member of teamMembers) {
    await prisma.teamMember.upsert({
      where: {
        id: member.id,
      },
      update: member,
      create: member,
    });
  }

  console.log('✅ AASRA team members seeded successfully.');

  // =========================
  // INITIATIVES
  // =========================

  for (const initiative of initiatives) {
    await prisma.initiative.upsert({
      where: {
        id: initiative.id,
      },
      update: initiative,
      create: initiative,
    });
  }

  console.log('✅ AASRA initiatives seeded successfully.');
}

main()
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });