import { Request } from "express";
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';


const uploadDir = 'uploads';

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`;
    cb(null, fileName);
  },
});

const CSV_MIME_TYPES = [
  "text/csv",
  "application/vnd.ms-excel",
];

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const isCsvExt = ext === ".csv";
  const isCsvMime = CSV_MIME_TYPES.includes(file.mimetype);
  
  if (!isCsvExt && !isCsvMime) {
    cb(new Error("Only CSV files are allowed"));
    return;
  }

  cb(null, true);
};

export const upload = multer({ 
  storage, 
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } 
});

