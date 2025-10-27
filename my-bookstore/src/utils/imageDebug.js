// Utility to debug image loading issues

export const debugImageLoading = (imageName, actualSrc) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Image Debug:', {
      originalName: imageName,
      resolvedSrc: actualSrc,
      isUrl: imageName?.startsWith('http'),
      isLocal: !imageName?.startsWith('http'),
      timestamp: new Date().toISOString()
    });
  }
};

export const validateImageExists = async (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
};

export const preloadImages = async (imageList) => {
  const results = await Promise.allSettled(
    imageList.map(async (src) => {
      const exists = await validateImageExists(src);
      return { src, exists };
    })
  );
  
  return results.map(result => 
    result.status === 'fulfilled' ? result.value : { src: 'unknown', exists: false }
  );
};