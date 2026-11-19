import ImageGalleryItem from './ImageGalleryItem.jsx';

export default function ImageGallery({ images, onImageClick }) {
  if (images.length === 0) return null;

  return (
    <ul className="gallery">
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          onClick={() => onImageClick(image)}
        />
      ))}
    </ul>
  );
}
