export interface GiftMessage {
  title: string;
  message: string;
  emoji: string;
}

export enum AppState {
  IDLE = 'IDLE',
  WISHING = 'WISHING',
  OPENING = 'OPENING',
}

export type Language = 'en' | 'zh';
