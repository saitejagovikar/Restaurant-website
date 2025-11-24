// @ts-nocheck
import express from 'express';
import multer from 'multer';
import { uploadImage } from '../controllers/uploadController';

const router = express.Router();

// Configure multer for disk storage
const storage = multer.diskStorage({
	destination: function (req: any, file: any, cb: any) {
		cb(null, 'uploads/');
	},
	filename: function (req: any, file: any, cb: any) {
		// ensure we preserve the original extension and avoid empty filenames
		const originalName = file && file.originalname ? file.originalname : 'file';
		cb(null, `${Date.now()}-${originalName}`);
	}
});

const fileFilter = (req: any, file: any, cb: any) => {
	// Accept images only
	if (!file || !file.mimetype || !file.mimetype.startsWith('image/')) {
		return cb(new Error('Only image files are allowed'));
	}
	cb(null, true);
};

const upload = multer({ storage, fileFilter });

// @route   POST /api/upload
// @desc    Upload image to Cloudinary
// @access  Public (should be protected in production)
router.post('/', upload.single('image'), uploadImage);

export default router;
