import { useEffect, useState } from "react";

export const useImagePreloader = (imageUrls: any) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    let loadedImagesCount = 0;

    const handleImageLoad = () => {
      loadedImagesCount += 1;
      if (loadedImagesCount === imageUrls.length) {
        setImagesLoaded(true);
      }
    };

    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;

      img.onload = handleImageLoad;
    });
  }, [imageUrls]);

  return imagesLoaded;
};
