export default function ImageGalleryItem({ image, onClick }) {
  return (
    <li className="gallery-item">
      <button className="image-button" type="button" onClick={onClick}>
        <img src={image.webformatURL} alt={image.tags || ''} loading="lazy" />
      </button>
    </li>
  );
}
