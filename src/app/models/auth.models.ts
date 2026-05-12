export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  contactInfo: string;
  password: string;
  role: string;
  dob: string;
  gender: string;
  address: string;
  landSize: number;
  cropType: string;
}