import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {

  getJsonAsync<T>(key: string): Promise<T | null> {
    return new Promise(resolve => {
      setTimeout(() => {
        try{
            const v = localStorage.getItem(key);
            resolve(v ? (JSON.parse(v)) as T : null);
        }
        catch{
            resolve(null);
        }
      }, 500);
    });
  }

  setJsonAsync(key: string, value: unknown): Promise<void> {
    return new Promise((resolve,reject) => {
      setTimeout(() => {
        try{
            localStorage.setItem(key, JSON.stringify(value));
            resolve();
        }
        catch(err){
            reject(err);
        }
      }, 1000);
    });
  }

  removeAsync(key: string): Promise<void> {
    return new Promise((resolve,reject)=> {
      setTimeout(() => {
        try{
            localStorage.removeItem(key);
            resolve();
        }catch(e){
            reject(e);
        }
      }, 500);
    });
  }
}