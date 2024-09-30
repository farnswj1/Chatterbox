from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from uvicorn.middleware.proxy_headers import ProxyHeadersMiddleware
from routes import router
from config import settings


app = FastAPI(
    title='Chatterbox',
    description='This is the Chatterbox API.',
    contact={
        'name': 'Justin Farnsworth',
        'email': 'fjj12697@gmail.com'
    },
    version='1.0.0',
    docs_url='/api/docs',
    redoc_url='/api/redoc',
    openapi_url='/api/openapi.json'
)
app.add_middleware(
    ProxyHeadersMiddleware,
    trusted_hosts=settings.ALLOWED_HOSTS
)
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=settings.ALLOWED_HOSTS
)
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=settings.CORS_ALLOW_ORIGIN_REGEX,
    allow_methods=('GET', 'POST')
)
app.include_router(router)
