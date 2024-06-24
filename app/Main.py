from fastapi import FastAPI

from app.controller.UserController import UserController

app = FastAPI()

item_controller = UserController()

app.include_router(item_controller.router)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="localhost", port=8000)
