/**
 * DynamicFormSelect Component
 * Select field with API data fetching, search, pagination, and custom input fallback
 */

import { useGetSpecifications } from '@/hooks/useGetSpecifications';
import { Loader2, Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface DynamicFormSelectProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type: string; // MAKE, MODEL, CLASS, etc.
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  register: UseFormRegister<T>;
  value?: string;
  onChange?: (value: string) => void;
}

export function DynamicFormSelect<T extends FieldValues>({
  name,
  label,
  type,
  placeholder = 'Select or type custom value',
  required = false,
  disabled = false,
  className = '',
  register,
  value,
  onChange,
}: DynamicFormSelectProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [limit, setLimit] = useState(20);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customValue, setCustomValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch specifications from API
  const {
    data,
    loading,
    error: apiError,
    setParams,
  } = useGetSpecifications({
    enabled: true,
    initialParams: { type, search: '', limit: 20 },
  });

  // Debug logging
  useEffect(() => {
    console.log(`🔍 DynamicFormSelect [${type}]:`, {
      data,
      loading,
      error: apiError,
      searchQuery,
      limit,
    });
  }, [data, loading, apiError, type, searchQuery, limit]);

  // Update params when search or limit changes
  useEffect(() => {
    setParams({ type, search: searchQuery, limit });
  }, [searchQuery, limit, type, setParams]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectChange = (newValue: string) => {
    if (newValue === '__custom__') {
      setShowCustomInput(true);
      setIsOpen(false);
      return;
    }
    setSelectedValue(newValue);
    onChange?.(newValue);
    setIsOpen(false);
    setShowCustomInput(false);
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setCustomValue(newValue);
    setSelectedValue(newValue);
    onChange?.(newValue);
  };

  const handleLoadMore = () => {
    setLimit((prev) => prev + 20);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setLimit(20);
  };

  const clearSelection = () => {
    setSelectedValue('');
    setCustomValue('');
    onChange?.('');
  };

  // Check if current value is custom (not in options)
  useEffect(() => {
    if (selectedValue && data) {
      const isInOptions = data.some((item) => item === selectedValue);
      if (!isInOptions && selectedValue) {
        setShowCustomInput(true);
        setCustomValue(selectedValue);
      }
    }
  }, [selectedValue, data]);

  const baseInputClass =
    'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-white';
  const selectClass =
    'w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent cursor-pointer';

  if (showCustomInput) {
    return (
      <div className={className}>
        <label className="block text-sm font-medium mb-2">
          {label} {required && <span className="text-red-500"> *</span>}
        </label>
        <div className="space-y-2">
          <div className="relative">
            <input
              {...register(name)}
              value={customValue}
              onChange={handleCustomInputChange}
              placeholder={`Enter custom ${label.toLowerCase()}`}
              disabled={disabled}
              className={baseInputClass}
            />
            {customValue && (
              <button
                type="button"
                onClick={clearSelection}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              setShowCustomInput(false);
              setCustomValue('');
              setSelectedValue('');
            }}
            className="text-xs text-cyan-600 hover:text-cyan-700"
          >
            Choose from list instead
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={className} ref={dropdownRef}>
      <label className="block text-sm font-medium mb-2">
        {label} {required && <span className="text-red-500"> *</span>}
      </label>
      <div className="relative">
        <input {...register(name)} type="hidden" value={selectedValue} />
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={selectClass}
        >
          <span className={selectedValue ? 'text-gray-900' : 'text-gray-400'}>
            {selectedValue || placeholder}
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-[300px] overflow-hidden">
            {/* Search Input */}
            <div className="p-2 border-b sticky top-0 bg-white">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Search ${label.toLowerCase()}...`}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>

            {/* Options Container */}
            <div className="max-h-[200px] overflow-y-auto">
              {/* Loading State */}
              {loading && (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                  <span className="ml-2 text-sm text-gray-500">Loading...</span>
                </div>
              )}

              {/* Error State - Only show if no data is available */}
              {!loading && apiError && (!data || data.length === 0) && (
                <div className="px-2 py-4 text-center text-sm text-red-500">
                  <p>Failed to load options</p>
                  <p className="text-xs mt-1">
                    {apiError?.message || 'Network error'}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      setParams({ type, search: searchQuery, limit })
                    }
                    className="text-xs text-blue-600 hover:underline mt-2"
                  >
                    Retry
                  </button>
                </div>
              )}

              {/* Options - Show if data exists regardless of error */}
              {!loading && data && data.length > 0 && (
                <>
                  {data.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleSelectChange(option)}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
                    >
                      {option}
                    </button>
                  ))}

                  {/* Load More Button */}
                  {data.length >= limit && (
                    <div className="p-2 border-t sticky bottom-0 bg-white">
                      <button
                        type="button"
                        onClick={handleLoadMore}
                        className="w-full py-2 text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50 text-sm rounded"
                      >
                        Load 20 More
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* No Results */}
              {!loading && !apiError && data && data.length === 0 && (
                <div className="px-2 py-4 text-center text-sm text-gray-500">
                  No results found
                </div>
              )}
            </div>

            {/* Custom Input Option */}
            <div className="p-2 border-t sticky bottom-0 bg-white">
              <button
                type="button"
                onClick={() => handleSelectChange('__custom__')}
                className="w-full text-left px-3 py-2 text-cyan-600 font-medium hover:bg-cyan-50 rounded text-sm"
              >
                + Enter custom {label.toLowerCase()}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
