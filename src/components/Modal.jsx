import { useEffect } from 'react';

export default function Modal({ image, onClose }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label="Перегляд зображення"
        onClick={event => event.stopPropagation()}
      >
        <img src={image.largeImageURL} alt={image.tags || ''} />
      </div>
    </div>
  );
}
