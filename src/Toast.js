export default function Toast({ msg, showToast }) {
    if (!showToast) {
        return null;
    }
    
    return (
        <div
            className={`toast align-items-center text-bg-success border-0 position-fixed bottom-0 end-0 m-3 show`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
        >
            <div className="d-flex">
                <div className="toast-body">
                    {msg}
                </div>
                <button
                    type="button"
                    className="btn-close btn-close-white me-2 m-auto"
                    onClick={(e) => {
                        e.target.closest(".toast").classList.remove("show");
                    }}
                ></button>
            </div>
        </div>

    );
}