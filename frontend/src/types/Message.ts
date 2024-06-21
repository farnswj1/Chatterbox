export interface BaseMessage {
  message: string;
}

export interface FromMessage  extends BaseMessage {
  done: boolean;
}

export interface ChatMessage extends BaseMessage {
  author: string;
}
