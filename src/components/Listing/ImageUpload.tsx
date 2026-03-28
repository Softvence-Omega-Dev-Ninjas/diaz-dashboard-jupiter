import { Upload, X } from 'lucide-react';
import type { RefObject } from 'react';

interface ImageUploadProps {
  label: string;
  image: string | null;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  inputRef: RefObject<HTMLInputElement | null>;
  multiple?: boolean;
}

export function ImageUpload({
  label,
  image,
  onUpload,
  onRemove,
  inputRef,
  multiple = false,
}: ImageUploadProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      {image ? (
        <div className="relative w-full h-48 border border-gray-300 rounded-lg overflow-hidden">
          <img src={image} alt={label} className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={onRemove}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-cyan-500 transition-colors"
        >
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">
            Click to upload or drag & drop
          </p>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={onUpload}
        className="hidden"
      />
    </div>
  );
}
