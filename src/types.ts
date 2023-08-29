export interface AuthContextType {
  login(inputs: LoginInputs): void;
  logout(): void;
  currentUser: User | null;
}

export interface AuthContextProviderProps {
  children: React.ReactNode;
}

export interface LoginInputs {
  email: string;
  password: string;
}

export interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  instrument: string;
  code: string;
  type: number;
}

export interface Lesson {
  post_id: number;
  post: string;
  date: string;
}
