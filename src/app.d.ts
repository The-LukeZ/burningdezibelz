// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    interface Error {
      message: string;
      status: number;
    }

    interface Locals {
      loggedIn: boolean;
      year: number;
    }

    interface PageData {
      date?: Date;
    }

    // interface PageState {}

    // interface Platform {}
  }

  namespace DBModels {
    interface Location {
      _id: string;
      name: string;
      address: string;
      city: string;
      postalCode: string;
      province: string;
      country: string;
    }

    interface Concert {
      _id: string;
      name: string;
      date: Date;
      link?: string;
      location?: Location;
      /**
       * The tickets link or a string with the tickets information
       */
      tickets?: string;
      abendkasse?: boolean;
      price?: number;
      notes?: string[];
    }

    interface LoginSession {
      ipHash: string;
      iv: string;
      valid: boolean;
      createdAt: NativeDate;
      updatedAt: NativeDate;
    }
  }
}

export {};
