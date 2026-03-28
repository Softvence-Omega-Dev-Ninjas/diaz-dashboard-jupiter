import type { CreatePromoCodeRequest, PromoCode } from '@/types';
import React, { useEffect, useState } from 'react';

interface PromoCodeFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreatePromoCodeRequest) => void;
  promoCode?: PromoCode | null;
  isLoading?: boolean;
}

export const PromoCodeForm: React.FC<PromoCodeFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  promoCode,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<CreatePromoCodeRequest>({
    code: '',
    freeDays: 30,
    maxRedemptions: null,
    expiresAt: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (promoCode) {
      setFormData({
        code: promoCode.code,
        freeDays: promoCode.freeDays,
        maxRedemptions: promoCode.maxRedemptions,
        expiresAt: promoCode.expiresAt
          ? new Date(promoCode.expiresAt).toISOString().slice(0, 16)
          : null,
      });
    } else {
      setFormData({
        code: '',
        freeDays: 30,
        maxRedemptions: null,
        expiresAt: null,
      });
    }
    setErrors({});
  }, [promoCode, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.code.trim()) {
      newErrors.code = 'Promo code is required';
    } else if (formData.code.length < 3) {
      newErrors.code = 'Promo code must be at least 3 characters';
    } else if (!/^[A-Z0-9]+$/.test(formData.code)) {
      newErrors.code =
        'Promo code must contain only uppercase letters and numbers';
    }

    if (!formData.freeDays || formData.freeDays <= 0) {
      newErrors.freeDays = 'Free days must be greater than 0';
    }

    if (
      formData.maxRedemptions !== null &&
      formData.maxRedemptions !== undefined &&
      formData.maxRedemptions < 0
    ) {
      newErrors.maxRedemptions = 'Max redemptions cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const submitData: CreatePromoCodeRequest = {
      code: formData.code.toUpperCase(),
      freeDays: formData.freeDays,
      maxRedemptions: formData.maxRedemptions || null,
      expiresAt: formData.expiresAt
        ? new Date(formData.expiresAt).toISOString()
        : null,
    };

    onSubmit(submitData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'freeDays' || name === 'maxRedemptions'
          ? value === ''
            ? null
            : Number(value)
          : value,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold leading-6 text-gray-900 pr-8">
              {promoCode ? 'Edit Promo Code' : 'Create New Promo Code'}
            </h3>
          </div>

          {/* Form Body */}
          <div className="p-6">
            <div className="space-y-4">
              {/* Code */}
              <div>
                <label
                  htmlFor="code"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Promo Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="e.g., FREE30"
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.code ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.code && (
                  <p className="mt-1 text-sm text-red-600">{errors.code}</p>
                )}
              </div>

              {/* Free Days */}
              <div>
                <label
                  htmlFor="freeDays"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Free Days <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="freeDays"
                  name="freeDays"
                  value={formData.freeDays}
                  onChange={handleChange}
                  min="1"
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.freeDays ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.freeDays && (
                  <p className="mt-1 text-sm text-red-600">{errors.freeDays}</p>
                )}
              </div>

              {/* Max Redemptions */}
              <div>
                <label
                  htmlFor="maxRedemptions"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Max Redemptions (Optional)
                </label>
                <input
                  type="number"
                  id="maxRedemptions"
                  name="maxRedemptions"
                  value={formData.maxRedemptions ?? ''}
                  onChange={handleChange}
                  min="0"
                  placeholder="Leave empty for unlimited"
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.maxRedemptions ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.maxRedemptions && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.maxRedemptions}
                  </p>
                )}
              </div>

              {/* Expires At */}
              <div>
                <label
                  htmlFor="expiresAt"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Expires At (Optional)
                </label>
                <input
                  type="datetime-local"
                  id="expiresAt"
                  name="expiresAt"
                  value={formData.expiresAt ?? ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Leave empty for no expiration
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : promoCode ? (
                'Update'
              ) : (
                'Create'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
