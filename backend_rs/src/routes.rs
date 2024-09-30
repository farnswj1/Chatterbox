use axum::{extract::{State, WebSocketUpgrade}, response::IntoResponse, Json};
use axum_client_ip::InsecureClientIp;
use ollama_rs::Ollama;

use crate::websockets::handle_socket;

pub async fn not_found() -> Json<&'static str> {
    Json("Page not found")
}

pub async fn ws_handler(
    ws: WebSocketUpgrade,
    State(ollama): State<Ollama>,
    InsecureClientIp(ip): InsecureClientIp,
) -> impl IntoResponse {
    ws.on_upgrade(move |socket| handle_socket(socket, ollama, ip.to_string()))
}
