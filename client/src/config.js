const DEFAULT_API_BASE_URL = 'https://odop-brainnova-3iu9.onrender.com';

export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/+$/, '');

export const getAssetUrl = (assetPath) => {
    if (!assetPath) return '';
    if (/^https?:\/\//i.test(assetPath)) return assetPath;

    const normalizedPath = assetPath.replace(/^\/+/, '');
    return `${API_BASE_URL}/${normalizedPath}`;
};