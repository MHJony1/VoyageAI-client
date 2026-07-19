import axios from 'axios';

// ImgBB public key (NEXT_PUBLIC_*). ImgBB's model uses per-key rate limits and
// exposes no secret operations, so a client-visible key is acceptable here.
const IMGBB_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
const IMGBB_URL = 'https://api.imgbb.com/1/upload';

export interface UploadResult {
  url: string;
}

/**
 * Upload a single image file to ImgBB and return the hosted URL.
 */
export async function uploadImage(file: File): Promise<string> {
  if (!IMGBB_KEY) {
    throw new Error('Image upload is not configured (missing NEXT_PUBLIC_IMGBB_API_KEY).');
  }

  const formData = new FormData();
  formData.append('image', file);

  const response = await axios.post(`${IMGBB_URL}?key=${IMGBB_KEY}`, formData);

  const url = response?.data?.data?.url;
  if (!url) {
    throw new Error('Image upload failed. Please try again.');
  }
  return url as string;
}

/**
 * Upload multiple images sequentially, returning all hosted URLs.
 */
export async function uploadImages(files: File[]): Promise<string[]> {
  const urls: string[] = [];
  for (const file of files) {
    urls.push(await uploadImage(file));
  }
  return urls;
}

export const uploadService = { uploadImage, uploadImages };
export default uploadService;
