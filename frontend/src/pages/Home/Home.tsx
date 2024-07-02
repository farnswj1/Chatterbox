import { FC, FormEvent, useRef, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { MessageBlock } from 'components';
import { ChatMessage, FromMessage } from 'types';

const URL = `ws://${import.meta.env.VITE_API_HOST}/api/ws`;

const Home: FC = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [response, setResponse] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(false);
  const ref = useRef<HTMLTextAreaElement>(null);
  const { sendMessage } = useWebSocket<FromMessage>(
    URL,
    {
      onMessage: (event: MessageEvent<string>) => {
        const { message, done } = JSON.parse(event.data) as FromMessage;

        if (done) {
          const newChatLog: ChatMessage = { author: 'Chatterbox', message: response };
          setChatMessages(chatMessages => [...chatMessages, newChatLog]);
          setResponse('');
          setDisabled(false);
        } else {
          setResponse(response => response + message);
        }
      }
    }
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDisabled(true);
    const data = new FormData(event.currentTarget);
    const userMessage = data.get('message') as string;
    const newChatMessage: ChatMessage = { author: 'You', message: userMessage };
    setChatMessages(chatMessages => [...chatMessages, newChatMessage]);
    sendMessage(userMessage);

    if (ref.current) {
      ref.current.value = '';
    }
  };

  return (
    <main className="px-4">
      <div className="container mx-auto min-h-[calc(100vh-128px)] max-w-3xl flex flex-col justify-between">
        <div>
          {
            chatMessages.map((chatMessage, index) => (
              <MessageBlock key={index} {...chatMessage} />
            ))
          }
          {
            response.length > 0 && (
              <MessageBlock author="Chatterbox" message={response} />
            )
          }
        </div>
        <form className="flex gap-4" onSubmit={handleSubmit}>
          <textarea
            name="message"
            placeholder="Send a message."
            className="border rounded p-2 dark:bg-inherit"
            rows={1}
            cols={80}
            disabled={disabled}
            required
            ref={ref}
          />
          <div>
            <button
              className="border rounded p-2 dark:bg-inherit"
              type="submit"
              disabled={disabled}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Home;
