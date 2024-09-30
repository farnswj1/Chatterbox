use axum::extract::ws::{Message, WebSocket};
use futures::StreamExt;
use ollama_rs::{generation::completion::request::GenerationRequest, Ollama};
use serde::Serialize;
use tracing::{error, info};

const OLLAMA_MODEL: &'static str = "llama3";

#[derive(Serialize)]
struct ClientResponse {
    message: String,
    done: bool
}

pub async fn handle_socket(mut socket: WebSocket, ollama: Ollama, who: String) {
    info!("{who} connected.");

    loop {
        // Wait for a message from the client.
        let response = socket.recv().await;
        if let None = response {
            error!("{who} suddenly disconnected.");
            return;
        }

        // Handle a sudden disconnection.
        let message = response.unwrap();
        if let Err(error) = message {
            error!("{who} abruptly disconnected: {error}");
            return;
        }

        // Process the client's message.
        let msg = message.unwrap();
        if let Message::Text(text) = msg {
            // Send the message to Ollama.
            let request = GenerationRequest::new(OLLAMA_MODEL.to_string(), text);
            let mut stream = ollama.generate_stream(request).await.unwrap();

            // Steam the response back to the client.
            while let Some(response) = stream.next().await {
                for resp in response.unwrap() {
                    let content = ClientResponse { message: resp.response, done: resp.done };
                    let serialized = serde_json::to_string(&content).unwrap();

                    // Handle any errors while sending the response back to the client.
                    if let Err(error) = socket.send(Message::Text(serialized)).await {
                        error!("Failed to send message to {who}: {error}");
                        return;
                    }
                }
            }
        }
        else if let Message::Close(close) = msg {
            // Need to handle close frame edge case conditionally.
            if let Some(cf) = close {
                info!("{} sent close with code {} and reason: `{}`", who, cf.code, cf.reason);
            }
            else {
                info!("{who} somehow sent close message without CloseFrame");
            }
            return;
        }
        else {
            error!("{who} sent a message that is not accepted by the server.");
            return;
        }
    }
}
