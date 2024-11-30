from fastapi import FastAPI, Form
from fastapi.responses import FileResponse
import os 
import yt_dlp
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Dir = "Downloads"

os.makedirs(Dir, exist_ok=True)

@app.post("/download")
async def download(url: str = Form(...), format_type:str = Form(...)):
    ydl_opts = {
        'format': "bestaudio/best" if format_type == "audio" else "best",
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }] if format_type == "audio" else [],
        'outtmpl': f'{Dir}/%(title)s.%(ext)s',
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info_dict = ydl.extract_info(url, download=True)
        file_path = ydl.prepare_filename(info_dict)
        if format_type == "audio":
            file_path = f"{os.path.splitext(fie_path)[0]}.mp3"
        
    return FileResponse(file_path, media_type='application/octet-stream', filename=os.path.basename(file_path))


