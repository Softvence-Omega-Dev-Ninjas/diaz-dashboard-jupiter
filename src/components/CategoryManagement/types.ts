export interface CategoryImage {
  id: string;
  filename: string;
  originalFilename: string;
  path: string;
  url: string;
  fileType: string;
  mimeType: string;
  size: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  title: string;
  imageId: string;
  createdAt: string;
  updatedAt: string;
  image: CategoryImage;
}

export interface CategoryFormData {
  id?: string;
  title: string;
  imageFile?: File;
  imagePreview?: string;
}

export interface CategoryManagementState {
  categories: CategoryFormData[];
  isEditing: boolean;
  editingId: string | null;
}
