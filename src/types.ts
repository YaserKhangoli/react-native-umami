export interface UmamiInitial {
  hostUrl: string;
  hostname: string;
  website: string;
  title?: string;
  userAgent?: string;
}

export interface UmamiTrackPayload {
  referrer?: string;
  url?: string;
  name?: string;
  data?: {
    [key: string]: string;
  };
}

export interface UmamiVisitPayload {
  referrer?: string;
  url?: string;
  data?: {
    [key: string]: string;
  };
}

export interface UmamiIdentifyPayload {
  referrer?: string;
  url?: string;
  id?: string;
  data?: {
    [key: string]: string;
  };
}
