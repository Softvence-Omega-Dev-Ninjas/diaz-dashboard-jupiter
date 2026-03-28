/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useCreateBannerMutation,
  useGetSingleBannerQuery,
  useUpdateBannerMutation,
} from '@/redux/features/adminBannerApi/adminBannerApi';
import { ChevronDown, ChevronUp, Save, Upload, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

interface BannerFormData {
  id?: string;
  bannerTitle: string;
  subtitle: string;
  backgroundFile: File | null;
  existingBackground: string | null;
  isVideo: boolean;
}

interface HomeBannersSectionProps {
  website: 'FLORIDA' | 'JUPITER';
}

const PAGES = [
  { id: 'HOME', title: 'Homepage Hero Banner' },
  { id: 'BLOG', title: 'Blogs' },
  { id: 'CONTACT', title: 'Contact' },
  { id: 'SEARCH', title: 'Search' },
  { id: 'PRIVACY_POLICY', title: 'Privacy Policy' },
  { id: 'TERMS_AND_CONDITION', title: 'Terms of Service' },
] as const;

const HomeBannersSection: React.FC<HomeBannersSectionProps> = ({ website }) => {
  const [openSection, setOpenSection] = useState<string>('HOME');
  const [formDataMap, setFormDataMap] = useState<
    Record<string, BannerFormData>
  >({});

  // Fetch all banners
  const queries = {
    HOME: useGetSingleBannerQuery(
      { page: 'HOME', site: website },
      { refetchOnMountOrArgChange: true },
    ),
    BLOG: useGetSingleBannerQuery(
      { page: 'BLOG', site: website },
      { refetchOnMountOrArgChange: true },
    ),
    CONTACT: useGetSingleBannerQuery(
      { page: 'CONTACT', site: website },
      { refetchOnMountOrArgChange: true },
    ),
    SEARCH: useGetSingleBannerQuery(
      { page: 'SEARCH', site: website },
      { refetchOnMountOrArgChange: true },
    ),
    PRIVACY_POLICY: useGetSingleBannerQuery(
      { page: 'PRIVACY_POLICY', site: website },
      { refetchOnMountOrArgChange: true },
    ),
    TERMS_AND_CONDITION: useGetSingleBannerQuery(
      { page: 'TERMS_AND_CONDITION', site: website },
      { refetchOnMountOrArgChange: true },
    ),
  };

  const [createBanner] = useCreateBannerMutation();
  const [updateBanner] = useUpdateBannerMutation();
  const [savingSection, setSavingSection] = useState<string | null>(null);

  // Load data into form when queries complete
  useEffect(() => {
    const newFormDataMap: Record<string, BannerFormData> = {};

    PAGES.forEach(({ id }) => {
      const query = queries[id as keyof typeof queries];
      const data = query.data;

      if (data) {
        newFormDataMap[id] = {
          id: data.id,
          bannerTitle: data.bannerTitle || '',
          subtitle: data.subtitle || '',
          backgroundFile: null,
          existingBackground: data.background?.url || null,
          isVideo:
            data.background?.fileType === 'video' ||
            data.background?.mimeType?.startsWith('video') ||
            false,
        };
      } else {
        newFormDataMap[id] = {
          bannerTitle: '',
          subtitle: '',
          backgroundFile: null,
          existingBackground: null,
          isVideo: false,
        };
      }
    });

    setFormDataMap(newFormDataMap);
  }, [
    queries.HOME.data,
    queries.BLOG.data,
    queries.CONTACT.data,
    queries.SEARCH.data,
    queries.PRIVACY_POLICY.data,
    queries.TERMS_AND_CONDITION.data,
    website,
  ]);

  const handleInputChange = (
    page: string,
    field: 'bannerTitle' | 'subtitle',
    value: string,
  ) => {
    setFormDataMap((prev) => ({
      ...prev,
      [page]: {
        ...prev[page],
        [field]: value,
      },
    }));
  };

  const handleFileChange = (page: string, file: File | null) => {
    setFormDataMap((prev) => ({
      ...prev,
      [page]: {
        ...prev[page],
        backgroundFile: file,
        isVideo: file
          ? file.type.startsWith('video')
          : prev[page]?.isVideo || false,
        ...(file === null && { existingBackground: null }),
      },
    }));
  };

  const getBackgroundPreview = (page: string): string | null => {
    const formData = formDataMap[page];

    if (!formData) return null;

    if (formData.backgroundFile) {
      return URL.createObjectURL(formData.backgroundFile);
    }
    return formData.existingBackground;
  };

  const handleSave = async (page: string) => {
    const formData = formDataMap[page];
    if (!formData) return;

    console.log('🔵 Save clicked for:', page);
    console.log('🔵 Form data:', formData);

    if (!formData.bannerTitle.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Banner title is required',
      });
      return;
    }

    setSavingSection(page);

    try {
      const payload: any = {
        page,
        site: website,
        bannerTitle: formData.bannerTitle,
      };

      if (formData.subtitle) {
        payload.subtitle = formData.subtitle;
      }

      if (formData.backgroundFile) {
        payload.background = formData.backgroundFile;
      }

      console.log('🔵 Payload:', {
        ...payload,
        background: payload.background ? 'FILE' : 'NONE',
      });

      if (formData.id) {
        // Update
        payload.id = formData.id;
        console.log('🟡 Updating banner with ID:', formData.id);
        const result = await updateBanner(payload).unwrap();
        console.log('✅ Update response:', result);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: `${page} banner updated successfully`,
          timer: 2000,
          showConfirmButton: false,
        });

        // Update form state
        setFormDataMap((prev) => ({
          ...prev,
          [page]: {
            ...prev[page],
            backgroundFile: null,
            existingBackground:
              result.background?.url || prev[page].existingBackground,
          },
        }));
      } else {
        // Create
        console.log('🟢 Creating new banner');
        const result = await createBanner(payload).unwrap();
        console.log('✅ Create response:', result);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: `${page} banner created successfully`,
          timer: 2000,
          showConfirmButton: false,
        });

        // Update form with new ID
        setFormDataMap((prev) => ({
          ...prev,
          [page]: {
            ...prev[page],
            id: result.id,
            backgroundFile: null,
            existingBackground:
              result.background?.url || prev[page].existingBackground,
          },
        }));
      }
    } catch (error: any) {
      console.error('❌ Save error:', error);
      const msg =
        error?.data?.message || error?.message || 'Failed to save banner';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: msg,
      });
    } finally {
      setSavingSection(null);
    }
  };

  const renderBannerSection = (page: { id: string; title: string }) => {
    const formData = formDataMap[page.id];
    const query = queries[page.id as keyof typeof queries];
    const isOpen = openSection === page.id;
    const preview = getBackgroundPreview(page.id);

    console.log('Main Data : ', formData);

    if (!formData) return null;

    return (
      <div
        key={page.id}
        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
      >
        <button
          onClick={() => setOpenSection(isOpen ? '' : page.id)}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
        >
          <span className="text-sm font-medium text-gray-900">
            {page.title}
          </span>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>

        {isOpen && (
          <div className="p-6 border-t border-gray-100 space-y-6">
            {query.isLoading ? (
              <div className="text-center py-4 text-gray-500">Loading...</div>
            ) : (
              <>
                {/* Banner Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Banner Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.bannerTitle}
                    onChange={(e) =>
                      handleInputChange(page.id, 'bannerTitle', e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter banner title"
                  />
                </div>

                {/* Subtitle */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) =>
                      handleInputChange(page.id, 'subtitle', e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter subtitle"
                  />
                </div>

                {/* Background Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Image/Video
                  </label>
                  {preview ? (
                    <div className="relative border-2 border-gray-300 rounded-lg p-4">
                      <button
                        type="button"
                        onClick={() => handleFileChange(page.id, null)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-10"
                        aria-label="Remove background image"
                        title="Remove background image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      {formData.isVideo ? (
                        <video
                          src={preview}
                          className="w-full h-48 object-cover rounded"
                          controls
                        />
                      ) : (
                        <img
                          src={preview}
                          alt="Background"
                          className="w-full h-48 object-cover rounded"
                        />
                      )}
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-400 transition-colors cursor-pointer flex flex-col items-center">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">
                        Click to upload image or video
                      </span>
                      <span className="text-xs text-gray-400 mt-1">
                        PNG, JPG, MP4 up to 50MB
                      </span>
                      <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={(e) =>
                          handleFileChange(page.id, e.target.files?.[0] || null)
                        }
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      console.log('🔴 BUTTON CLICKED!');
                      console.log('🔴 Page ID:', page.id);
                      console.log('🔴 Saving section:', savingSection);
                      handleSave(page.id);
                    }}
                    disabled={savingSection === page.id}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    {savingSection === page.id
                      ? 'Saving...'
                      : formData.id
                        ? 'Update'
                        : 'Create'}
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {PAGES.map((page) => renderBannerSection(page))}
    </div>
  );
};

export default HomeBannersSection;
