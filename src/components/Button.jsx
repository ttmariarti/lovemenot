export default function Button({ onClick, disabled }) {
  return (
    <button className="load-more" type="button" onClick={onClick} disabled={disabled}>
      Load more
    </button>
  );
}
