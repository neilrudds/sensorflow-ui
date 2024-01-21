export function Modal({children}) {
    return (
        <div className="relative z-50">
            <div className="fixed inset-0 bg-black/10" aria-hidden="true"/>

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <div className="flex min-h-full items-center justify-center">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default function CustomModal({children, visible, onClose}) {
    if (!visible) return null;

    const handleOnBackDropClick = (e) => {
        if (e.target.id === "backdrop") onClose && onClose();
    };

    return (
      <div
        id="backdrop"
        onClick={handleOnBackDropClick}
        className="z-50 bg-black bg-opacity-50 backdrop-blur-sm fixed inset-0 flex items-center justify-center"
      >
        {children}
      </div>
    );
  }