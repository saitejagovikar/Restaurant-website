import express from 'express';
import multer from 'multer';
import { uploadImage } from '../controllers/uploadController';

const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        // Accept images only
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed'));
        }
        cb(null, true);
    }
});

// @route   POST /api/upload
// @desc    Upload image to Cloudinary
// @access  Public (should be protected in production)
router.post('/', upload.single('image'), uploadImage);

export default router;
