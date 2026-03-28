export interface ImageData {
  id?: string;
  url?: string;
  file?: File;
  preview?: string;
}

export interface WhyUsFormData {
  title: string;
  description: string;
  excellence: string;
  boatsSoldPerYear: string;
  listingViewed: string;
  buttonText: string;
  buttonLink: string;
  image1: ImageData | null;
  image2: ImageData | null;
  image3: ImageData | null;
  site: 'FLORIDA' | 'JUPITER';
}

export interface WhyUsApiResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    site: string;
    title: string;
    description: string;
    excellence: string;
    boatsSoldPerYear: string;
    listingViewed: string;
    buttonText: string;
    buttonLink: string;
    image1Id: string;
    image2Id: string;
    image3Id: string;
    createdAt: string;
    updatedAt: string;
    image1: {
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
    };
    image2: {
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
    };
    image3: {
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
    };
  };
}
