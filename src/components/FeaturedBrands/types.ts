export interface FeaturedBrandLogo {
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

export interface FeaturedBrandItem {
  id: string;
  featuredbrandId: string;
  site: 'FLORIDA' | 'JUPITER';
  createdAt: string;
  updatedAt: string;
  featuredbrandLogo: FeaturedBrandLogo;
}

export interface FeaturedBrandFormData {
  logo: File | null;
  logoPreview: string | null;
  site: 'FLORIDA' | 'JUPITER';
}

export interface FeaturedBrandApiResponse {
  success: boolean;
  message: string;
  data: FeaturedBrandItem[];
}
