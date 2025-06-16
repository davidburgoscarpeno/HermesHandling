// src/components/Spinner.jsx
export default function Spinner() {
    return (
        <div className="spinner">
            <svg width="40" height="40" viewBox="0 0 40 40">
                <circle
                    cx="20"
                    cy="20"
                    r="18"
                    stroke="#1976d2"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="90"
                    strokeDashoffset="60"
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 20 20"
                        to="360 20 20"
                        dur="1s"
                        repeatCount="indefinite"
                    />
                </circle>
            </svg>
        </div>
    );
}
