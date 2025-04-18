const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export interface User {
  name: string;
  location: string;
  email: string;
  phone: string;
  age: number;
  cell: string;
  picture: string[];
}

export interface UserResponse {
  data: User[];
  total: number;
}

export const fetchUsers = async (
  page: number = 1,
  results: number = 10
): Promise<User[]> => {
  const response = await fetch(
    `${API_URL}/users?page=${page}&results=${results}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  const data = await response.json();
  return data;
};
