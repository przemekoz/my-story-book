from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class PDFRequest(BaseModel):
    images: list[str]

@app.post("/generate-pdf")
def generate_pdf(req: PDFRequest):
    print(req.images)

    # create PDF here...

    return {
        "success": True
    }