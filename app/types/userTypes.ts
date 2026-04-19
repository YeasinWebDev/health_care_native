export interface User {
  createdAt: string; 
  email: string;
  id: string;
  name: string;
  needPasswordChange: boolean;
  role: "PATIENT" | "DOCTOR" | "ADMIN";
  status: "ACTIVE" | "INACTIVE" | "BLOCKED"; 
  updatedAt: string; 
}