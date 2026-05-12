export interface SystemUser {
  userId: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: string;
}

export interface FarmerDocument {
  documentId: number;
  docType: string;
  fileURI: string;
  uploadedDate: string;
  verificationStatus: string;
  farmerId: number;
}