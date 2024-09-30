mod config;
mod routes;
mod websockets;

use std::net::SocketAddr;

use axum::extract::connect_info::IntoMakeServiceWithConnectInfo;
use axum::http::HeaderValue;
use axum::{http::Method, routing::get, serve, Router};
use axum_client_ip::SecureClientIpSource;
use config::Config;
use dotenvy::dotenv;
use ollama_rs::Ollama;
use routes::{not_found, ws_handler};
use tokio::net::TcpListener;
use tower_http::cors::CorsLayer;
use tower_http::trace::TraceLayer;

fn get_router(config: &Config) -> IntoMakeServiceWithConnectInfo<Router, SocketAddr> {
    let origins = config.cors_allowed_origins
        .split(" ")
        .map(|origin| origin.parse().unwrap())
        .collect::<Vec<HeaderValue>>();

    // Set up middleware layers
    let cors = CorsLayer::new()
        .allow_origin(origins)
        .allow_methods([Method::GET]);

    // Create the Ollama client.
    let ollama = Ollama::try_new(config.ollama_host.clone()).unwrap();

    Router::new()
        .layer(SecureClientIpSource::RightmostXForwardedFor.into_extension())
        .layer(TraceLayer::new_for_http())
        .layer(cors)
        .route("/api/ws", get(ws_handler))
        .fallback(not_found)
        .with_state(ollama)
        .into_make_service_with_connect_info::<SocketAddr>()
}

#[tokio::main]
async fn main() {
    dotenv().ok();
    tracing_subscriber::fmt().with_max_level(tracing::Level::INFO).init();

    let config = envy::from_env::<Config>().unwrap();
    let router = get_router(&config);
    let listener = TcpListener::bind("0.0.0.0:8000").await.unwrap();

    println!("LISTENING on 0.0.0.0:8000");
    serve(listener, router).await.unwrap();
}
