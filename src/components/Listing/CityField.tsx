/**
 * City Field Component with Static Data
 * Uses local US cities data based on selected state with custom input fallback
 */

import { US_CITIES_BY_STATE, US_STATES } from '@/lib/data/us-states-cities';
import { useEffect, useState } from 'react';
import type {
  FieldValues,
  Path,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { FormField } from './FormField';

interface CityFieldProps<T extends FieldValues> {
  name?: Path<T>;
  stateName?: Path<T>;
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  required?: boolean;
}

export function CityField<T extends FieldValues>({
  name = 'city' as Path<T>,
  stateName = 'state' as Path<T>,
  register,
  setValue,
  watch,
  required = true,
}: CityFieldProps<T>) {
  const formValues = watch();
  const cityValue = formValues[name];
  const stateValue = formValues[stateName];

  const [cityOptions, setCityOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [showCustomCity, setShowCustomCity] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (!stateValue) {
      setCityOptions([]);
      setIsDisabled(true);
      return;
    }

    // Find state code
    const state = US_STATES.find((s) => s.name === stateValue);
    if (!state) {
      setCityOptions([]);
      setIsDisabled(true);
      return;
    }

    // Get cities for this state
    const cities = US_CITIES_BY_STATE[state.code] || [];
    const opts = cities.map((city) => ({
      value: city.name,
      label: city.name,
    }));

    setCityOptions(opts);
    setIsDisabled(opts.length === 0);
  }, [stateValue]);

  // Check if current value is custom (not in options)
  useEffect(() => {
    if (cityValue && cityOptions.length > 0) {
      const isInOptions = cityOptions.some((opt) => opt.value === cityValue);
      if (!isInOptions) {
        setShowCustomCity(true);
      }
    }
  }, [cityValue, cityOptions]);

  // Reset custom input when state changes
  useEffect(() => {
    if (showCustomCity && stateValue) {
      setShowCustomCity(false);
    }
  }, [stateValue]);

  if (!stateValue) {
    return (
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-400">
          City: {required && <span className="text-red-500"> *</span>}
        </label>
        <select
          disabled
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-100 cursor-not-allowed"
        >
          <option>Select state first</option>
        </select>
      </div>
    );
  }

  if (showCustomCity) {
    return (
      <div>
        <label className="block text-sm font-medium mb-2">
          City: {required && <span className="text-red-500"> *</span>}
        </label>
        <input
          {...register(name)}
          value={cityValue || ''}
          onChange={(e) => {
            setValue(name, e.target.value as T[typeof name]);
          }}
          placeholder="Enter city"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-white"
        />
        <button
          type="button"
          onClick={() => {
            setShowCustomCity(false);
            setValue(name, '' as T[typeof name]);
          }}
          className="text-xs text-cyan-600 hover:text-cyan-700 mt-1"
        >
          Choose from list instead
        </button>
      </div>
    );
  }

  if (isDisabled || cityOptions.length === 0) {
    return (
      <div>
        <label className="block text-sm font-medium mb-2">
          City: {required && <span className="text-red-500"> *</span>}
        </label>
        <input
          {...register(name)}
          value={cityValue || ''}
          onChange={(e) => {
            setValue(name, e.target.value as T[typeof name]);
          }}
          placeholder="Enter city"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-white"
        />
        <p className="text-xs text-gray-500 mt-1">
          No cities available for {stateValue}
        </p>
      </div>
    );
  }

  return (
    <div>
      <FormField
        label="City:"
        name={name}
        register={register}
        type="select"
        options={cityOptions}
        required={required}
      />
      <button
        type="button"
        onClick={() => setShowCustomCity(true)}
        className="text-xs text-cyan-600 hover:text-cyan-700 mt-1"
      >
        Enter custom city
      </button>
    </div>
  );
}
