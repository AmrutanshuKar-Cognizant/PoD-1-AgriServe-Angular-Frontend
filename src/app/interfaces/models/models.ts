export interface Farmer {
  farmerId: number;      // Matches Long
  name: string;
  dob: string;           // Matches String
  gender: string;
  address: string;
  contactInfo: string;
  landSize: number;      // Matches Double
  cropType: string;      // Matches cropType
  status: string;
}
 
export interface Workshop {
  workshopId: number;
  programId: number;
  programTitle: string;
  location: string;
  date: any;
  status: string;
  description: string; 
}
 
export interface Document {
  documentId: number;    // Matches Long
  docType: string;
  fileURI: string;       // Matched to Java's fileURI field name
  uploadedDate: string | Date; 
  verificationStatus: 'Accepted' | 'Pending' | 'Rejected';
  farmerId: number;      // Added to match the DTO
}
 
export interface TrainingProgram {
  programId: number;
  title: string;
  description: string;
  startDate: any; // Using 'any' fixes the "Argument not assignable" error
  endDate: any;
  status: string;
  managerId: number;
  category: string;
  instructor: string;
  location: string;
  time: string;
  seatsTotal: number;
  seatsFilled: number;
}
 
export interface AdvisoryContent {
  contentId: number;
  title: string;
  category: string;
  description: string;
  fileUri: string;
  status: string;
  pages: number;           
  publishedDate: any;     
}