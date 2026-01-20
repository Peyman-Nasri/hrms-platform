"use client";

type LogoutConfirmModalProps = {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function LogoutConfirmModal({
  show,
  onConfirm,
  onCancel,
}: LogoutConfirmModalProps) {
  if (!show) return null;

  return (
    <>
      <div
        className="modal fade show"
        style={{ display: "block" }}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Logout</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onCancel}
              ></button>
            </div>

            <div className="modal-body">
              <p>Are you sure you want to log out?</p>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={onConfirm}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal-backdrop fade show"
        onClick={onCancel}
        style={{ cursor: "pointer" }}
      ></div>
    </>
  );
}
