const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const teamMembers = [
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
    photoUrl: '/team/general sec.jpeg',
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
    photoUrl: '/team/joint sec.jpeg',
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
    photoUrl: '/team/welfare sec.jpeg',
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
    photoUrl: '/team/event-managment.jpeg',
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
    photoUrl: '/team/volunteer.jpeg',
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
    photoUrl: '/team/treasurer.jpeg',
    joinedYear: '2025',
    active: true,
  },
];

const initiatives = [
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
  for (const member of teamMembers) {
    await prisma.teamMember.upsert({
      where: { id: member.id },
      update: member,
      create: member,
    });
  }
  console.log('✅ Seeded team members');

  for (const initiative of initiatives) {
    await prisma.initiative.upsert({
      where: { id: initiative.id },
      update: initiative,
      create: initiative,
    });
  }
  console.log('✅ Seeded initiatives');

  // =========================
  // ADMIN USER
  // =========================
  const adminEmail = (process.env.ADMIN_EMAIL || 'aasrasreyas@gmail.com').toLowerCase();
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    let passwordHash = "$2b$12$CzI2C7MVMxOFqZ8I4mgFTuU/mVZwueC8mW6nZ66iBSqCilXpZDB1e";
    if (process.env.ADMIN_PASSWORD) {
      const bcrypt = require('bcryptjs');
      passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
    }
    await prisma.user.create({
      data: {
        id: "f180e58e-f607-464b-87db-a341f10b1b40",
        name: "Nabiha Fatima",
        email: adminEmail,
        role: 'SUPER_ADMIN',
        passwordHash,
      },
    });
    console.log('✅ Seeded super admin user');
  } else {
    console.log('ℹ️ Admin user already exists, keeping existing credentials');
  }

}

main()
  .catch((err) => {
    console.error('Seed error:', err.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
