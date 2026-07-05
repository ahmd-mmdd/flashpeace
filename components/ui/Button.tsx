type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
};

export default function Button({
  children,
  variant = "primary",
  onClick,
}: ButtonProps) {
  const baseClass =
    "w-full rounded-xl py-3 font-semibold transition";

  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700",

    secondary:
      "border border-gray-300 hover:bg-gray-100",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClass} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}