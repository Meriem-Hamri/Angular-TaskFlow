import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { findUserByEmail } from './database';
import type { User } from './user.model';

const SESSION_KEY = 'taskflow_session';

export interface Session {
  userId: number;
  name: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private storage: StorageService) {}

  // Simulated login: checks the in-memory DB and stores a session in storage
  async login(email: string, password: string): Promise<Session> {
    // simulate database lookup latency
    await new Promise(r => setTimeout(r, 800));

    const user = findUserByEmail(email);
    if (!user || user.password !== password) {
      throw new Error('Email or password invalid');
    }

    const session: Session = {
      userId: user.id,
      name: user.name,
      createdAt: new Date().toISOString()
    };

    await this.storage.setJsonAsync(SESSION_KEY, session);

    return session;
  }

  async logout(): Promise<void> {
    await this.storage.removeAsync(SESSION_KEY);
  }

  async isAuthenticated(): Promise<boolean> {
    const s = await this.storage.getJsonAsync<Session>(SESSION_KEY);
    return !!s;
  }

  async getSession(): Promise<Session | null> {
    return this.storage.getJsonAsync<Session>(SESSION_KEY);
  }
}
