export const SenderType = {
  USER: 1,
  BOT: 2,
} as const;
export type senderType = (typeof SenderType)[keyof typeof SenderType];

export interface Message {
  sender: senderType;
  message: string;
  date: Date;
}
