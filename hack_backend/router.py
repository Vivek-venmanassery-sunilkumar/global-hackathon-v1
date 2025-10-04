from fastapi import APIRouter 


router = APIRouter(prefix='/', tags=['upload'])

@router.get('/')
async def root():
    return {"Message": "Doodle Sketch API is running"}


@router.post('/upload-photo')
async def upload_photo():
    pass