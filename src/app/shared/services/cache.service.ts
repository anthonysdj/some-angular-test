import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService<T extends object> {
  private readonly DUARATION_MINUTES = .5;

  private cache: {
    [key: string]: { // the endpoint
      expires: number, // timestamp
      value: T[]
    }
  } | null = {};

  constructor() { }

  get<Key extends string>(key: Key): T[] | null {
    const cachedItem = this.cache?.[key];

    if (!cachedItem) {
      return null;
    }

    if (Date.now() > cachedItem.expires) {
      return null;
    }

    return cachedItem.value;
  }

  set(endPoint: string, value: T[]): void {    
    const expires = new Date().getTime() + this.DUARATION_MINUTES * 60000;

    if (this.cache) {
      this.cache[endPoint] = { expires, value }
    } else {
      this.cache = { [endPoint]: { expires, value } }
    }
  }

  clear(): void {
    this.cache = null;
  }
}
