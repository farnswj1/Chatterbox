# Chatterbox
This is a web that allows you to chat with an LLM provided by Ollama.

## Setup
### Backend
In the `backend_rs` directory, create an `.env` file with the following configurations:
```
CORS_ALLOWED_ORIGINS="http://localhost http://127.0.0.1"
OLLAMA_HOST=http://ollama:11434
```

### Frontend
In the `frontend` directory, create an `.env` file with the following configurations:
```
VITE_API_HOST=localhost
```

## Running the Application
To run the application, run `docker compose up -d --build`, then enter http://localhost in your broswer.

### Setting Up the LLM Model
To download the model, run `docker exec ollama ollama pull llama3`. It will be roughly 5GB in size and may take several minutes to download.
