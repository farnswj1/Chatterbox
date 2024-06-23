/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChatMessage } from 'types';

type MessageBlockProps = ChatMessage;

const MessageBlock: FC<MessageBlockProps> = ({ author, message }) => (
  <div className="mb-8">
    <p><span className="font-bold text-xl">{author}</span>:</p>
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        'div': ({ node, ...props }) => <div className="mb-4" {...props} />,
        'p': ({ node, ...props }) => <p className="mb-4" {...props} />,
        'ul': ({ node, ...props }) => <ul className="mb-4" {...props} />,
        'ol': ({ node, ...props }) => <ol className="mb-4" {...props} />,
        'li': ({ node, ...props }) => <li className="mb-4" {...props} />
      }}
    >
      {message}
    </ReactMarkdown>
  </div>
);

export default MessageBlock;
