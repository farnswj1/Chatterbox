from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from ollama import RequestError, ResponseError
from libs.ollama import client as ollama_client
import logging


router = APIRouter(tags=['Chat'])


@router.websocket('/ws')
async def session(websocket: WebSocket) -> None:
    """Create a chat session with the LLM."""
    await websocket.accept()
    user_client = tuple(websocket.client)
    logging.info(f'{user_client} connected.')

    try:
        while True:
            user_response = await websocket.receive_text()
            messages = [{'role': 'user', 'content': user_response}]
            response = ollama_client.chat(model='llama3', messages=messages, stream=True)

            async for chunk in await response:
                content = chunk['message']['content']
                done = chunk['done']
                data = {'message': content, 'done': done}
                await websocket.send_json(data)
    except WebSocketDisconnect:
        logging.info(f'{user_client} disconnected.')
    except (RequestError, ResponseError) as e:
        logging.error(str(e))
