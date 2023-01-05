import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {

  private readonly isBrowser;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  public get(key: string) {
    return this.isBrowser
      ? window.localStorage.getItem(key)
      : null;
  }

  public set(key: string, value: any) {
    return this.isBrowser
      ? window.localStorage.setItem(key, value)
      : null;
  }

  public delete(key: string) {
    if(this.isBrowser) {
      window.localStorage.removeItem(key);
    }
  }
}
