import React from 'react';
import { RichTextEditor } from '../Editor';
import type { AboutUsFormProps } from './types';

export const AboutUsForm: React.FC<AboutUsFormProps> = ({
  formData,
  onInputChange,
  onDescriptionChange,
}) => {
  return (
    <div className="lg:col-span-2 space-y-6">
      {/* About Title */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <label
          htmlFor="aboutTitle"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          About Title *
        </label>
        <input
          type="text"
          id="aboutTitle"
          name="aboutTitle"
          value={formData.aboutTitle}
          onChange={onInputChange}
          placeholder="Enter about title"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      {/* About Description (Rich Text Editor) */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <label className="block text-sm font-medium text-gray-700 mb-4">
          About Description *
        </label>
        <RichTextEditor
          value={formData.aboutDescription}
          onChange={onDescriptionChange}
          placeholder="Write your about description here..."
          minHeight="400px"
        />
      </div>

      {/* Mission & Vision — handled separately in MissionVisionSection */}
    </div>
  );
};
