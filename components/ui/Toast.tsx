import { useEffect } from "react";

type ToastProps = {
  isOpen: boolean;
  message: string;
  type?: "success" | "error";
  onClose: () => void;
};

export default function Toast({
  isOpen,
  message,
  type = "success",
  onClose,
}: ToastProps) {
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed right-6 top-6 z-50">
      <div
        className={`rounded-xl px-5 py-3 shadow-xl text-white font-medium transition-all
        ${
          type === "success"
            ? "bg-green-600"
            : "bg-red-600"
        }`}
      >
        {message}
      </div>
    </div>
  );
}