import { Plus, X } from 'lucide-react';
import type { RefObject } from 'react';

interface GalleryUploadProps {
  photos: string[];
  onRemove: (index: number) => void;
  inputRef: RefObject<HTMLInputElement | null>;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function GalleryUpload({
  photos,
  onRemove,
  inputRef,
  onUpload,
}: GalleryUploadProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Upload Media Gallery
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="relative aspect-square border border-gray-300 rounded-lg overflow-hidden group"
          >
            <img
              src={photo}
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3 h-3" />
            </button>
            {index === photos.length - 1 && (
              <button
                type="button"
                className="absolute bottom-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded"
              >
                See All {photos.length} photo
              </button>
            )}
          </div>
        ))}

        <div
          onClick={() => inputRef.current?.click()}
          className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-cyan-500 transition-colors"
        >
          <Plus className="w-8 h-8 text-gray-400 mb-1" />
          <p className="text-xs text-gray-500">Add Photo</p>
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={onUpload}
        className="hidden"
      />
    </div>
  );
}
