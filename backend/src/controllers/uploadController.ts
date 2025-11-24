import { Request, Response } from 'express';
import cloudinary from '../config/cloudinary';
import { Readable } from 'stream';

// Upload image to Cloudinary
export const uploadImage = async (req: Request, res: Response) => {
    console.log('Upload request received');
    
    try {
        // Check if file exists in request
        if (!req.file) {
            console.error('No file in request');
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        console.log('File received:', {
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size
        });

        // Validate file type
        if (!req.file.mimetype.startsWith('image/')) {
            console.error('Invalid file type:', req.file.mimetype);
            return res.status(400).json({
                success: false,
                message: 'Only image files are allowed'
            });
        }

        // Convert buffer to stream
        const stream = Readable.from(req.file.buffer);
        console.log('Converted file to stream');

        // Upload to Cloudinary
        const uploadPromise = new Promise((resolve, reject) => {
            console.log('Starting Cloudinary upload...');
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: 'restaurants',
                    resource_type: 'image',
                    timeout: 30000 // 30 seconds timeout
                },
                (error, result) => {
                    if (error) {
                        console.error('Cloudinary upload error:', error);
                        reject(error);
                    } else {
                        console.log('Upload successful:', result);
                        resolve(result);
                    }
                }
            );
            
            // Handle stream errors
            stream.on('error', (error) => {
                console.error('Stream error:', error);
                reject(error);
            });
            
            stream.pipe(uploadStream);
        });

        const result: any = await uploadPromise;

        if (!result || !result.secure_url) {
            throw new Error('Invalid response from Cloudinary');
        }

        console.log('Sending success response');
        return res.status(200).json({
            success: true,
            data: {
                url: result.secure_url,
                publicId: result.public_id
            }
        });

    } catch (error: any) {
        console.error('Error in uploadImage:', {
            message: error.message,
            stack: error.stack,
            name: error.name,
            code: error.code,
            http_code: error.http_code
        });
        
        // More specific error messages based on error type
        let errorMessage = 'Failed to upload image';
        let statusCode = 500;

        if (error.message.includes('File size too large')) {
            errorMessage = 'File size is too large. Maximum size is 5MB.';
            statusCode = 413;
        } else if (error.message.includes('Invalid image file')) {
            errorMessage = 'Invalid image file. Please upload a valid image.';
            statusCode = 400;
        } else if (error.message.includes('timeout')) {
            errorMessage = 'Upload timed out. Please try again.';
            statusCode = 504;
        }

        return res.status(statusCode).json({
            success: false,
            message: errorMessage,
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
