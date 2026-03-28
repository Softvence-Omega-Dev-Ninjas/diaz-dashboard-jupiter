import { useGetSellerByIdQuery } from '@/redux/features/sellerManagement/sellerManagement';
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  CreditCard,
  Mail,
  MapPin,
  Phone,
  Shield,
  User,
  XCircle,
} from 'lucide-react';
import React from 'react';

interface SellerDetailsProps {
  sellerId: string;
  onBack: () => void;
}

export const SellerDetails: React.FC<SellerDetailsProps> = ({
  sellerId,
  onBack,
}) => {
  const { data: seller, isLoading, isError } = useGetSellerByIdQuery(sellerId);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getInitials = (name: string) => {
    const words = name.split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-cyan-500',
      'bg-orange-500',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      ACTIVE: 'bg-green-100 text-green-800',
      INACTIVE: 'bg-gray-100 text-gray-800',
      SUSPENDED: 'bg-red-100 text-red-800',
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Sellers</span>
        </button>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading seller details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !seller) {
    return (
      <div className="space-y-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Sellers</span>
        </button>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600 font-medium">
              Failed to load seller details
            </p>
            <p className="text-gray-600 mt-2">Please try again later</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back to Sellers</span>
      </button>

      {/* Header Card */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <div className="flex justify-center md:justify-start">
            {seller.avatarUrl ? (
              <img
                src={seller.avatarUrl}
                alt={seller.name}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div
                className={`${getAvatarColor(seller.name)} w-24 h-24 rounded-full flex items-center justify-center`}
              >
                <span className="text-white text-2xl font-semibold">
                  {getInitials(seller.name)}
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {seller.name}
                </h1>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(
                    seller.status,
                  )}`}
                >
                  {seller.status}
                </span>
                {seller.isVerified ? (
                  <span className="inline-flex items-center gap-1 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-xs font-medium">Verified</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-gray-500">
                    <XCircle className="w-4 h-4" />
                    <span className="text-xs font-medium">Not Verified</span>
                  </span>
                )}
              </div>
              <p className="text-gray-600 mt-1">@{seller.username}</p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-gray-700">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{seller.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="w-4 h-4" />
                <span className="text-sm">{seller.phone || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Shield className="w-4 h-4" />
                <span className="text-sm">{seller.role}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Plan Status */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Plan Status</p>
              <p className="text-xl font-bold text-gray-900">
                {seller.currentPlanStatus}
              </p>
            </div>
          </div>
        </div>

        {/* Login Status */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div
              className={`p-3 rounded-lg ${
                seller.isLoggedIn ? 'bg-green-100' : 'bg-gray-100'
              }`}
            >
              <User
                className={`w-6 h-6 ${
                  seller.isLoggedIn ? 'text-green-600' : 'text-gray-600'
                }`}
              />
            </div>
            <div>
              <p className="text-sm text-gray-600">Login Status</p>
              <p className="text-xl font-bold text-gray-900">
                {seller.isLoggedIn ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
        </div>

        {/* Stripe Customer */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Stripe Customer</p>
              <p className="text-sm font-medium text-gray-900 truncate">
                {seller.stripeCustomerId}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Full Name</p>
            <p className="text-base font-medium text-gray-900 mt-1">
              {seller.name}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Username</p>
            <p className="text-base font-medium text-gray-900 mt-1">
              @{seller.username}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email Address</p>
            <p className="text-base font-medium text-gray-900 mt-1">
              {seller.email}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Phone Number</p>
            <p className="text-base font-medium text-gray-900 mt-1">
              {seller.phone || 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Seller ID</p>
            <p className="text-base font-medium text-gray-900 mt-1">
              {seller.id}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Google ID</p>
            <p className="text-base font-medium text-gray-900 mt-1">
              {seller.googleId || 'Not Connected'}
            </p>
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Address Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Country</p>
            <p className="text-base font-medium text-gray-900 mt-1">
              {seller.country}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">State</p>
            <p className="text-base font-medium text-gray-900 mt-1">
              {seller.state}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">City</p>
            <p className="text-base font-medium text-gray-900 mt-1">
              {seller.city}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">ZIP Code</p>
            <p className="text-base font-medium text-gray-900 mt-1">
              {seller.zip}
            </p>
          </div>
        </div>
      </div>

      {/* Activity Information */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Activity Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Account Created</p>
            <p className="text-base font-medium text-gray-900 mt-1">
              {formatDate(seller.createdAt)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Last Updated</p>
            <p className="text-base font-medium text-gray-900 mt-1">
              {formatDate(seller.updatedAt)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Last Login</p>
            <p className="text-base font-medium text-gray-900 mt-1">
              {formatDate(seller.lastLoginAt)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Last Active</p>
            <p className="text-base font-medium text-gray-900 mt-1">
              {formatDate(seller.lastActiveAt)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Last Logout</p>
            <p className="text-base font-medium text-gray-900 mt-1">
              {formatDate(seller.lastLogoutAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
