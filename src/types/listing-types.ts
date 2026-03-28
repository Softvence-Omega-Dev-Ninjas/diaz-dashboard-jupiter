export interface Seller {
  id: string;
  name: string;
  email: string;
}

export interface Listing {
  id: string;
  listingId: string;
  name: string;
  make: string;
  model: string;
  year: number;
  price: number;
  status:
    | 'ONBOARDING_PENDING'
    | 'DRAFT'
    | 'PENDING'
    | 'ACTIVE'
    | 'INACTIVE'
    | 'SOLD';
  views: number;
  createdAt: string;
  seller: Seller;
}

export interface ListingResponse {
  page: number;
  limit: number;
  total: number;
  items: Listing[];
}

export interface ListingFilters {
  search: string;
  status: string;
  seller: string;
  priceRange: string;
}
