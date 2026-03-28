import type {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';

interface FormFieldWithErrorProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  type?: 'text' | 'email' | 'select';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  className?: string;
}

export function FormFieldWithError<T extends FieldValues>({
  label,
  name,
  register,
  errors,
  type = 'text',
  placeholder = 'Type here',
  required = false,
  options = [],
  className = '',
}: FormFieldWithErrorProps<T>) {
  const baseInputClass =
    'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-white';
  const selectClass =
    'w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent';
  const error = errors[name];

  return (
    <div className={className}>
      <label className="block text-sm font-medium mb-2">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      {type === 'select' ? (
        <select {...register(name)} className={selectClass}>
          <option value="">Select</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          {...register(name)}
          type={type}
          placeholder={placeholder}
          className={baseInputClass}
        />
      )}

      {error && (
        <p className="text-red-500 text-xs mt-1">{error.message as string}</p>
      )}
    </div>
  );
}
