export type Role = 'SUPER_ADMIN' | 'FINANCE_ADMIN' | 'CONTENT_ADMIN' | 'OUTREACH_ADMIN' | 'MEMBER';

export type InitiativeCategory =
  | 'EDUCATION'
  | 'CHILD_WELFARE'
  | 'MENTAL_WELLBEING'
  | 'AWARENESS'
  | 'DONATIONS'
  | 'RECREATIONAL'
  | 'COMMUNITY_OUTREACH'
  | 'HEALTHCARE'
  | 'OTHER';

export type InitiativeStatus = 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'PLANNED';

export type TransactionType = 'INCOME' | 'EXPENSE';

export type TransactionCategory =
  | 'INDIVIDUAL_DONATION'
  | 'COMMUNITY_COLLECTION'
  | 'INSTITUTIONAL_GRANT'
  | 'EDUCATION_SUPPLIES'
  | 'NUTRITION_AND_FOOD'
  | 'HEALTHCARE_AND_HYGIENE'
  | 'LOGISTICS_AND_TRANSPORT'
  | 'EVENT_ORGANIZATION'
  | 'PRINTING_AND_MATERIALS'
  | 'MISCELLANEOUS';

export type TransactionStatus = 'VERIFIED' | 'PENDING_AUDIT' | 'FLAGGED';

export type VolunteerStatus = 'PENDING' | 'UNDER_REVIEW' | 'INTERVIEW_SCHEDULED' | 'ACCEPTED' | 'REJECTED';

export type MessageStatus = 'UNREAD' | 'READ' | 'IN_PROGRESS' | 'RESOLVED';

export type PartnerType = 'NGO' | 'ORPHANAGE' | 'GOVERNMENT_SCHOOL' | 'COMMUNITY_SHELTER' | 'CORPORATE_SPONSOR' | 'COLLEGE_DEPARTMENT';

export interface Founder {
  id: string;
  name: string;
  position: string;
  bio: string;
  academicYear: string;
  department: string;
  photoUrl?: string;
  linkedinUrl?: string;
  email?: string;
  displayOrder: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  tier: 'GOVERNING_BODY' | 'EXECUTIVE' | 'DEPARTMENT_LEAD' | 'CORE_VOLUNTEER';
  bio?: string;
  photoUrl?: string;
  linkedinUrl?: string;
  email?: string;
  active: boolean;
  joinedYear: string;
}

export interface Initiative {
  id: string;
  slug: string;
  title: string;
  category: InitiativeCategory;
  status: InitiativeStatus;
  shortDescription: string;
  fullDescription: string;
  location: string;
  startDate: string;
  endDate?: string;
  coverImageUrl: string;
  beneficiariesCount: number;
  volunteersCount: number;
  budgetAllocated: number;
  amountSpent: number;
  featured: boolean;
  keyOutcomes?: string[];
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  initiativeId?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption?: string;
  imageUrl: string;
  category: InitiativeCategory;
  eventDate: string;
  initiativeId?: string;
  location?: string;
}

export interface Partner {
  id: string;
  name: string;
  type: PartnerType;
  logoUrl?: string;
  description: string;
  websiteUrl?: string;
  collaborationScope: string;
  active: boolean;
}

export interface Transaction {
  id: string;
  referenceId: string;
  date: string;
  type: TransactionType;
  category: TransactionCategory;
  description: string;
  amount: number;
  paymentMethod: string;
  status: TransactionStatus;
  initiativeId?: string;
  initiativeName?: string;
  voucherUrl?: string;
}

export interface VolunteerApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  collegeDept: string;
  academicYear: string;
  interests: string[];
  availability: string;
  statement: string;
  status: VolunteerStatus;
  createdAt: string;
  internalNotes?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: MessageStatus;
  createdAt: string;
}

export interface FinancialSummary {
  totalCollected: number;
  totalUtilized: number;
  currentBalance: number;
  lastAuditedDate: string;
  categoryBreakdown: {
    category: string;
    amount: number;
    percentage: number;
  }[];
}

export interface ImpactStats {
  childrenReached: number;
  communitiesReached: number;
  eventsConducted: number;
  activeVolunteers: number;
  donationsCollected: number;
  fundsUtilized: number;
  partnerOrganizations: number;
  learningHoursDelivered: number;
}
