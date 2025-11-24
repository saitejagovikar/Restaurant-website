import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Configure Cloudinary
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

// If we have the required credentials, configure Cloudinary
if (cloudName && apiKey && apiSecret) {
    cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret
    });

    console.log('Cloudinary configured with:');
    console.log('- Cloud Name:', cloudName);
    console.log('- API Key:', apiKey);
    console.log('- API Secret Length:', apiSecret.length); // Log length to verify it's loaded
} else {
    console.error('Missing Cloudinary credentials. Please check your .env file.');
    console.error('Required: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET');
    console.log('Current values:', {
        cloudName: cloudName || 'missing',
        apiKey: apiKey || 'missing',
        apiSecret: apiSecret ? 'present' : 'missing'
    });
}

export default cloudinary;
