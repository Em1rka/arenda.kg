export type UserRole = "renter" | "owner" | "admin";

export interface LoginRequest { email: string; password: string }
export interface LoginResponse { access: string; refresh?: string }

export interface RegisterRequest {
  email: string; password: string; name: string; role: UserRole;
  phone?: string; company?: string;
}
export interface RegisterResponse { id: number; email: string }

export interface MeResponse {
  id: number; email: string; name: string; role: UserRole;
  phone?: string; company?: string; is_verified: boolean; date_joined: string;
}
