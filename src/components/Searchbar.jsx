import { useState } from 'react';

export default function Searchbar({ onSubmit }) {
  const [inputValue, setInputValue] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const query = inputValue.trim();

    if (query) {
      onSubmit(query);
    }
  }

  return (
    <header className="searchbar">
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={event => setInputValue(event.target.value)}
          aria-label="Search images and photos"
        />
        <button
          type="submit"
          className="search-button"
          aria-label="Пошук"
          style={{ fontSize: '12px', padding: '2px 6px' }}
        >
          Search
        </button>
      </form>
    </header>
  );
}
