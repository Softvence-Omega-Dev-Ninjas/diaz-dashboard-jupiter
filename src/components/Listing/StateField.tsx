/**
 * State Field Component with Static Data
 * Uses local US states data with custom input fallback
 */

import { US_STATES } from '@/lib/data/us-states-cities';
import { useEffect, useState } from 'react';
import type {
  FieldValues,
  Path,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { FormField } from './FormField';

interface StateFieldProps<T extends FieldValues> {
  name?: Path<T>;
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  required?: boolean;
}

export function StateField<T extends FieldValues>({
  name = 'state' as Path<T>,
  register,
  setValue,
  watch,
  required = true,
}: StateFieldProps<T>) {
  const formValues = watch();
  const stateValue = formValues[name];

  const [stateOptions, setStateOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [showCustomState, setShowCustomState] = useState(false);

  useEffect(() => {
    const opts = US_STATES.map((s) => ({
      value: s.name,
      label: s.name,
    }));
    setStateOptions(opts);
  }, []);

  // Check if current value is custom (not in options)
  useEffect(() => {
    if (stateValue && stateOptions.length > 0) {
      const isInOptions = stateOptions.some((opt) => opt.value === stateValue);
      if (!isInOptions) {
        setShowCustomState(true);
      }
    }
  }, [stateValue, stateOptions]);

  if (showCustomState) {
    return (
      <div>
        <label className="block text-sm font-medium mb-2">
          State: {required && <span className="text-red-500"> *</span>}
        </label>
        <input
          {...register(name)}
          value={stateValue || ''}
          onChange={(e) => {
            setValue(name, e.target.value as T[typeof name]);
          }}
          placeholder="Enter state"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-white"
        />
        <button
          type="button"
          onClick={() => {
            setShowCustomState(false);
            setValue(name, '' as T[typeof name]);
            // Clear city when state changes
            setValue('city' as Path<T>, '' as T[Path<T>]);
          }}
          className="text-xs text-cyan-600 hover:text-cyan-700 mt-1"
        >
          Choose from list instead
        </button>
      </div>
    );
  }

  return (
    <div>
      <FormField
        label="State:"
        name={name}
        register={register}
        type="select"
        options={stateOptions}
        required={required}
      />
      <button
        type="button"
        onClick={() => setShowCustomState(true)}
        className="text-xs text-cyan-600 hover:text-cyan-700 mt-1"
      >
        Enter custom state
      </button>
    </div>
  );
}
