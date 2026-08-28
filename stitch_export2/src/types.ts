export type ScreenType =
  | 'consent'
  | 'login'
  | 'dashboard'
  | 'checkin'
  | 'checkin-success'
  | 'selfcare'
  | 'booking'
  | 'session'
  | 'health';

export type NavTab = 'home' | 'checkin' | 'health' | 'selfcare';

export interface UserProfile {
  matricula: string;
  setor: string;
  turno: string;
  gotas: number;
  score: number;
  termAccepted: boolean;
}

export interface ImageAssetInfo {
  id: string;
  name: string;
  category: string;
  url: string;
  alt: string;
  previewDescription: string;
}

export interface CheckinQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: { label: string; value: number }[];
}

export interface BookingSlot {
  date: string;
  dayName: string;
  dayNum: string;
  month: string;
  time: string;
  psychologist: {
    name: string;
    crp: string;
    specialty: string;
    avatarUrl: string;
  };
}
