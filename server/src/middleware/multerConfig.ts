import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';

const storage = multer.memoryStorage();

const ALLOWED_MIMETYPES = [
  'application/pdf',
  'application/octet-stream',    
  'application/x-pdf',
  'binary/octet-stream',
];

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const isAllowedMime = ALLOWED_MIMETYPES.includes(file.mimetype);
    const isPDFExtension = file.originalname.toLowerCase().endsWith('.pdf');

    if (isAllowedMime || isPDFExtension) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});