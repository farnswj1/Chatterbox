import { FC, FormEvent, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { MessageBlock } from 'components';
import { ChatMessage, FromMessage } from 'types';

const URL = import.meta.env.VITE_API_URL + '/api/ws';

const Home: FC = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [response, setResponse] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(false);
  const { sendMessage } = useWebSocket<FromMessage>(
    URL,
    {
      onMessage: (event: MessageEvent<string>) => {
        const { message, done } = JSON.parse(event.data) as FromMessage;

        if (done) {
          const newChatLog: ChatMessage = { author: 'Ollama', message: response };
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
  };

  return (
    <main className="px-4 container mx-auto h-full max-w-3xl flex flex-col justify-between">
      <div>
        {
          chatMessages.map((chatMessage, index) => (
            <MessageBlock key={index} {...chatMessage} />
          ))
        }
        {
          response.length > 0 && (
            <MessageBlock author="Ollama" message={response} />
          )
        }
      </div>
      <form className="flex gap-4" onSubmit={handleSubmit}>
        <textarea
          name="message"
          placeholder="Send a message."
          className="rounded p-2"
          rows={1}
          cols={80}
          disabled={disabled}
          required
        />
        <button
          className="border rounded p-2"
          type="submit"
          disabled={disabled}
        >
          Submit
        </button>
      </form>
    </main>
  );
};

export default Home;
