from fastapi import APIRouter
from routes.chat import router as chat_router


router = APIRouter(prefix='/api')
router.include_router(chat_router)
