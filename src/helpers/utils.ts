import path from "path";
import { Request } from "express";

export const getCurrentDate = (): string => {
    const date = new Date();

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`
}

export const fileVerified = (req: Request): boolean => {
    const ext = path.extname(req.file!.originalname).toLowerCase();

    if (ext === '.jpg' || ext === 'jpeg' || ext === 'png') {
        return true;
    }

    return false;
}