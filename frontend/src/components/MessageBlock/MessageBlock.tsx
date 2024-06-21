import { FC } from 'react';
import { ChatMessage } from 'types';

type MessageBlockProps = ChatMessage;

const MessageBlock: FC<MessageBlockProps> = ({ author, message }) => (
  <div className="mb-4">
    <p><span className="font-bold">{author}</span>: {message}</p>
  </div>
);

export default MessageBlock;
