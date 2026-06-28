import type { User } from '../types';

const USERS_KEY = 'upsc_registered_users';
const CURRENT_USER_KEY = 'upsc_current_user_session';

interface StoredUser extends User {
  passwordHash: string; // Plaintext or encoded string for local demo auth
}

export class AuthManager {
  static getRegisteredUsers(): StoredUser[] {
    try {
      const stored = localStorage.getItem(USERS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  static getCurrentUser(): User | null {
    try {
      const stored = localStorage.getItem(CURRENT_USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  static register(username: string, password: string): { success: boolean; message: string; user?: User } {
    const cleanUsername = username.trim().toLowerCase();
    if (!cleanUsername || cleanUsername.length < 3) {
      return { success: false, message: 'Username must be at least 3 characters long.' };
    }
    if (!password || password.length < 4) {
      return { success: false, message: 'Password must be at least 4 characters long.' };
    }

    const users = this.getRegisteredUsers();
    const exists = users.some((u) => u.username === cleanUsername);
    if (exists) {
      return { success: false, message: 'Username already registered! Please choose a different username or Log In.' };
    }

    const newUser: StoredUser = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      username: cleanUsername,
      passwordHash: password,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    const userSession: User = { id: newUser.id, username: newUser.username, createdAt: newUser.createdAt };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userSession));

    return { success: true, message: 'Registration successful! Welcome.', user: userSession };
  }

  static login(username: string, password: string): { success: boolean; message: string; user?: User } {
    const cleanUsername = username.trim().toLowerCase();
    const users = this.getRegisteredUsers();
    const found = users.find((u) => u.username === cleanUsername);

    if (!found) {
      return { success: false, message: 'Account not found! You must sign in (register) first before logging in.' };
    }

    if (found.passwordHash !== password) {
      return { success: false, message: 'Incorrect password! Please try again.' };
    }

    const userSession: User = { id: found.id, username: found.username, createdAt: found.createdAt };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userSession));

    return { success: true, message: 'Login successful!', user: userSession };
  }

  static logout(): void {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}
