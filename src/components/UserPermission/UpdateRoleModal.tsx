import type { UpdateRoleRequest } from '@/types/permission-types';
import { X } from 'lucide-react';
import React, { useState } from 'react';

interface UpdateRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UpdateRoleRequest) => void;
  currentRole: 'SUPER_ADMIN' | 'ADMIN';
  userName: string;
  isLoading?: boolean;
}

export const UpdateRoleModal: React.FC<UpdateRoleModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  currentRole,
  userName,
  isLoading = false,
}) => {
  const [selectedRole, setSelectedRole] = useState<'SUPER_ADMIN' | 'ADMIN'>(
    currentRole,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ role: selectedRole });
  };

  const handleClose = () => {
    setSelectedRole(currentRole);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/10">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Update User Role
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isLoading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-4">
              Update role for <span className="font-semibold">{userName}</span>
            </p>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Role
            </label>
            <select
              id="role"
              value={selectedRole}
              onChange={(e) =>
                setSelectedRole(e.target.value as 'SUPER_ADMIN' | 'ADMIN')
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              <option value="ADMIN">Admin</option>
              <option value="SUPER_ADMIN">Super Admin</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update Role'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
