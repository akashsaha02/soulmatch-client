import type { User as FirebaseUser } from "firebase/auth";

export interface Biodata {
  _id?: string;
  biodataId?: number;
  userEmail?: string;
  /** @deprecated use userEmail */
  email?: string;
  name: string;
  biodataType: "Male" | "Female";
  profileImage?: string;
  photos?: string[];
  mobileNumber?: string;
  dob: string;
  isPremium?: boolean;
  isVerified?: boolean;
  education?: string;
  occupation?: string;
  height?: number;
  weight?: number;
  religion?: string;
  caste?: string;
  subCaste?: string;
  maritalStatus?: string;
  familyType?: string;
  familyValues?: string;
  diet?: string;
  smoke?: string;
  drink?: string;
  city?: string;
  state?: string;
  country?: string;
  /** @deprecated use city/state/country */
  permanentDivision?: string;
  /** @deprecated use city/state/country */
  presentDivision?: string;
  annualIncome?: string;
  expectPartnerDetails?: string;
  aboutMe?: string;
  fatherOccupation?: string;
  motherOccupation?: string;
  siblings?: string;
  [key: string]: unknown;
}

export interface BiodatasResponse {
  biodatas: Biodata[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export interface BiodataSearchParams {
  biodataType?: string;
  ageMin?: number;
  ageMax?: number;
  religion?: string;
  maritalStatus?: string;
  city?: string;
  state?: string;
  country?: string;
  education?: string;
  occupation?: string;
  page?: number;
  limit?: number;
  sortBy?: "recent" | "premium";
}

export interface User extends FirebaseUser {}

export interface AppUser {
  _id?: string;
  email: string;
  name?: string;
  role?: "admin" | "premium" | "normal";
}

export interface ContactRequest {
  _id?: string;
  biodataId: string;
  requesterEmail: string;
  status?: string;
  [key: string]: unknown;
}

export interface Favourite {
  _id?: string;
  favouriteId?: string;
  favouriteBiodataId: string;
  email: string;
  favouriteName?: string;
  favouriteProfileImage?: string;
  favouriteEmail?: string;
}

export interface Interest {
  _id: string;
  fromEmail: string;
  toBiodataId: string | number;
  status: "pending" | "accepted" | "declined";
  createdAt: string;
}

export interface InterestsResponse {
  interests: Interest[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export interface Message {
  _id: string;
  senderEmail: string;
  receiverEmail: string;
  content: string;
  read: boolean;
  createdAt: string;
}

export interface InboxItem {
  otherEmail: string;
  lastMessage: string;
  unreadCount: number;
}

export interface Notification {
  _id: string;
  userId: string;
  type:
    | "interest_received"
    | "interest_accepted"
    | "message_received"
    | "profile_viewed"
    | "contact_approved";
  title: string;
  body: string;
  link: string;
  read: boolean;
  createdAt: string;
}

export interface NotificationsResponse {
  notifications: Notification[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export interface Block {
  _id?: string;
  biodataId: string;
}

export interface Report {
  _id?: string;
  biodataId: string;
  reason: string;
  description?: string;
}

export interface PremiumRequest {
  _id?: string;
  biodataId: string;
  userEmail?: string;
  status?: string;
  [key: string]: unknown;
}

export interface AdminStats {
  users: number;
  biodatas: number;
  contactRequests: number;
  premiumRequests: number;
  successStories: number;
  maleBiodataCount: number;
  femaleBiodataCount: number;
  premiumBiodatas: number;
  totalRevenue: number;
}

export interface SuccessStory {
  _id?: string;
  selfBiodataId: string;
  partnerBiodataId: string;
  coupleImage: string;
  successStory: string;
  marriageDate: string;
  rating: number;
}

export interface UsersResponse {
  users: AppUser[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}
