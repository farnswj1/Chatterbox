from ollama import AsyncClient
from config import settings


client = AsyncClient(host=settings.OLLAMA_HOST)
