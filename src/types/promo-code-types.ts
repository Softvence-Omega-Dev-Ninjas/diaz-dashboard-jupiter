export interface PromoCode {
  id: string;
  stripeCouponId: string | null;
  code: string;
  freeDays: number;
  maxRedemptions: number | null;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;
  _count?: {
    usedBy: number;
  };
}

export interface PromoCodeResponse {
  success: boolean;
  message: string;
  data: PromoCode[];
  metadata: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export interface SinglePromoCodeResponse {
  success: boolean;
  message: string;
  data: PromoCode;
}

export interface CreatePromoCodeRequest {
  code: string;
  freeDays: number;
  maxRedemptions?: number | null;
  expiresAt?: string | null;
}

export interface UpdatePromoCodeRequest {
  code?: string;
  freeDays?: number;
  maxRedemptions?: number | null;
  expiresAt?: string | null;
}
