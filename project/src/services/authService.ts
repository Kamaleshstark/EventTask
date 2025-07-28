import { User } from '../contexts/AuthContext';

const USERS_KEY = 'task_app_users';
const CURRENT_USER_KEY = 'task_app_current_user';

// Mock users for demo
const defaultUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@test.com',
    password: 'admin123',
    role: 'admin' as const,
  },
  {
    id: '2',
    name: 'Manager User',
    email: 'manager@test.com',
    password: 'manager123',
    role: 'manager' as const,
  },
  {
    id: '3',
    name: 'Regular User',
    email: 'user@test.com',
    password: 'user123',
    role: 'user' as const,
  },
];

const initializeUsers = () => {
  const existingUsers = localStorage.getItem(USERS_KEY);
  if (!existingUsers) {
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  }
};

const getUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

const saveUsers = (users: any[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const generateToken = (user: User): string => {
  return btoa(JSON.stringify({ id: user.id, email: user.email, role: user.role }));
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    await delay(500); // Simulate API delay
    
    initializeUsers();
    const users = getUsers();
    const user = users.find((u: any) => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const { password: _, ...userWithoutPassword } = user;
    const token = generateToken(userWithoutPassword);
    
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    
    return { user: userWithoutPassword, token };
  },

  async register(name: string, email: string, password: string, role = 'user'): Promise<{ user: User; token: string }> {
    await delay(500);
    
    initializeUsers();
    const users = getUsers();
    
    if (users.find((u: any) => u.email === email)) {
      throw new Error('User with this email already exists');
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role: role as 'admin' | 'manager' | 'user',
    };

    users.push(newUser);
    saveUsers(users);

    const { password: _, ...userWithoutPassword } = newUser;
    const token = generateToken(userWithoutPassword);
    
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    
    return { user: userWithoutPassword, token };
  },

  async getCurrentUser(): Promise<User> {
    await delay(200);
    
    const user = localStorage.getItem(CURRENT_USER_KEY);
    if (!user) {
      throw new Error('No current user');
    }
    
    return JSON.parse(user);
  },

  async getAllUsers(): Promise<User[]> {
    await delay(300);
    
    const users = getUsers();
    return users.map(({ password, ...user }: any) => user);
  },

  async updateUserRole(userId: string, role: 'admin' | 'manager' | 'user'): Promise<User> {
    await delay(300);
    
    const users = getUsers();
    const userIndex = users.findIndex((u: any) => u.id === userId);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    users[userIndex].role = role;
    saveUsers(users);

    const { password: _, ...updatedUser } = users[userIndex];
    return updatedUser;
  },

  logout(): void {
    localStorage.removeItem(CURRENT_USER_KEY);
  },
};