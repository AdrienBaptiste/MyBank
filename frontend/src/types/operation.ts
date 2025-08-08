export interface Operation {
  id: number;
  label: string;
  amount: number;
  date: string;
  category?: Category;
  user: User;
}

export interface Category {
  id: number;
  title: string;
  user: User;
}

export interface User {
  id: number;
  email: string;
  name: string;
}
