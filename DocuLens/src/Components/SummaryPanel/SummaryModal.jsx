import './SummaryModal.css'

const SummaryModal = ({ show, onExit, title, message }) => {
  if (!show) {
    return null; // Don't render if not visible
  }

  return (
    <div className="modal-overlay"> {/* Styling for overlay */}
      <div className="modal-content"> {/* Styling for modal box */}
        <h3 className='font-bold font-m:'>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onExit}>Exit</button>
        </div>
      </div>
    </div>
  );
}

export default SummaryModal