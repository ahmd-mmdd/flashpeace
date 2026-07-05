type InputProps = {
  type?: string;
  placeholder: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500"
    />
  );
}