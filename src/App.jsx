import { useRef, useState } from 'react';
import Searchbar from './components/Searchbar.jsx';
import ImageGallery from './components/ImageGallery.jsx';
import Loader from './components/Loader.jsx';
import Button from './components/Button.jsx';
import Modal from './components/Modal.jsx';

const API_URL = 'https://pixabay.com/api/';
const API_KEY = '58725511-446e7a36642aff0cbe64850b9';
const PER_PAGE = 12;

async function fetchImages(query, page, signal) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    page: String(page),
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: String(PER_PAGE),
  });
  const response = await fetch(`${API_URL}?${params}`, { signal });

  if (!response.ok) {
    throw new Error(`Помилка запиту: ${response.status}`);
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
}

export default function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasMore, setHasMore] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const queryRef = useRef('');
  const pageRef = useRef(1);
  const controllerRef = useRef(null);
  const requestIdRef = useRef(0);

  async function loadImages(query, page, append) {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    const requestId = ++requestIdRef.current;
    setIsLoading(true);
    setError('');

    try {
      const data = await fetchImages(query, page, controller.signal);
      if (requestId !== requestIdRef.current) return;

      setImages(current => (append ? [...current, ...data.hits] : data.hits));
      setHasMore(page * PER_PAGE < data.totalHits);
      pageRef.current = page;
    } catch (requestError) {
      if (requestError.name !== 'AbortError' && requestId === requestIdRef.current) {
        setError(requestError.message || 'Не вдалося завантажити зображення.');
      }
    } finally {
      if (requestId === requestIdRef.current) {
        setIsLoading(false);
      }
    }
  }

  function handleSearch(query) {
    queryRef.current = query;
    pageRef.current = 1;
    setImages([]);
    setHasMore(false);
    setSelectedImage(null);
    loadImages(query, 1, false);
  }

  function handleLoadMore() {
    loadImages(queryRef.current, pageRef.current + 1, true);
  }

  return (
    <>
      <Searchbar onSubmit={handleSearch} />
      <main>
        {error && <p className="error-message" role="alert">{error}</p>}
        <ImageGallery images={images} onImageClick={setSelectedImage} />
        {isLoading && <Loader />}
        {images.length > 0 && hasMore && (
          <Button onClick={handleLoadMore} disabled={isLoading} />
        )}
      </main>
      {selectedImage && (
        <Modal image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </>
  );
}
