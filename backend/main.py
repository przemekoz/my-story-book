from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader

import requests
import tempfile
import os
import uuid


app = FastAPI()


class PDFRequest(BaseModel):
    images: list[str]


@app.get("/")
def home():
    return {"status": "Backend is running!"}


@app.post("/generate-pdf")
def generate_pdf(request: PDFRequest):

    if not request.images:
        raise HTTPException(
            status_code=400,
            detail="No images provided"
        )

    # Create a temporary PDF filename
    pdf_filename = f"{uuid.uuid4()}.pdf"
    pdf_path = os.path.join(tempfile.gettempdir(), pdf_filename)

    downloaded_files = []

    try:
        # ------------------------------------------------
        # Create PDF
        # ------------------------------------------------

        pdf = canvas.Canvas(pdf_path)

        for index, image_url in enumerate(request.images):

            print(f"Downloading image {index + 1}: {image_url}")

            # --------------------------------------------
            # Download image
            # --------------------------------------------

            response = requests.get(
                image_url,
                timeout=60
            )

            response.raise_for_status()

            # Temporary image file
            image_filename = f"{uuid.uuid4()}.img"
            image_path = os.path.join(
                tempfile.gettempdir(),
                image_filename
            )

            with open(image_path, "wb") as f:
                f.write(response.content)

            downloaded_files.append(image_path)

            # --------------------------------------------
            # Read image dimensions
            # --------------------------------------------

            image = Image.open(image_path)

            width, height = image.size

            print(
                f"Image {index + 1}: "
                f"{width}x{height}"
            )

            # --------------------------------------------
            # Create page same size as image
            # --------------------------------------------

            pdf.setPageSize((width, height))

            # --------------------------------------------
            # Draw image
            # --------------------------------------------

            pdf.drawImage(
                ImageReader(image_path),
                0,
                0,
                width=width,
                height=height,
                preserveAspectRatio=True,
                anchor="c"
            )

            # Finish this page
            pdf.showPage()

        # Finish PDF
        pdf.save()

        # --------------------------------------------
        # Return PDF
        # --------------------------------------------

        return FileResponse(
            pdf_path,
            media_type="application/pdf",
            filename="generated.pdf"
        )

    except requests.RequestException as e:

        raise HTTPException(
            status_code=400,
            detail=f"Could not download image: {str(e)}"
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"PDF generation failed: {str(e)}"
        )

    finally:

        # Delete downloaded images
        for file_path in downloaded_files:

            try:
                os.remove(file_path)
            except:
                pass