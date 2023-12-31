import { Request } from 'express'
import {
    ref,
    getDownloadURL,
    uploadBytesResumable,
    FirebaseStorage,
    deleteObject
} from 'firebase/storage'
import { getCurrentDate } from './utils';

export const uploadToFirebase = async (req: Request, storage: FirebaseStorage, dir: string): Promise<string> => {
    const currentDate = getCurrentDate();

    const storageRef = ref(storage, `images/${dir}/${req.file!.originalname}  ${currentDate}`);

    const metadata = {
        contentType: req.file!.mimetype
    }

    const snapshot = await uploadBytesResumable(storageRef, req.file!.buffer, metadata);

    const downloadUrl = await getDownloadURL(snapshot.ref);

    return downloadUrl;
}

export const deleteFile = async (storage: FirebaseStorage, url: string) => {
    const fileRef = ref(storage, url);

    await deleteObject(fileRef);
}