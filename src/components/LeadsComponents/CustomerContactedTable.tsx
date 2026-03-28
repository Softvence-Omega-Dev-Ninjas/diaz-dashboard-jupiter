import type { CustomerContacted } from '@/types/customer-contacted-types';
import { Mail, Phone } from 'lucide-react';
import React from 'react';

interface CustomerContactedTableProps {
  contacts: CustomerContacted[];
  currentPage: number;
  limit: number;
}

export const CustomerContactedTable: React.FC<CustomerContactedTableProps> = ({
  contacts,
  currentPage,
  limit,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px]">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Serial
            </th>
            <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Full Name
            </th>
            <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Boat Information
            </th>
            <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Comments
            </th>
            <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="text-center px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {contacts.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="px-4 md:px-6 py-8 text-center text-sm text-gray-500"
              >
                No contacts found
              </td>
            </tr>
          ) : (
            contacts.map((contact, index) => (
              <tr
                key={contact.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 md:px-6 py-4">
                  <span className="text-sm font-medium text-gray-900">
                    {(currentPage - 1) * limit + index + 1}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4">
                  <span className="text-sm font-medium text-gray-900">
                    {contact.fullName}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-900">
                      {contact.email}
                    </span>
                    <span className="text-sm text-gray-600">
                      {contact.phone}
                    </span>
                  </div>
                </td>
                <td className="px-4 md:px-6 py-4">
                  <span className="text-sm text-gray-900">
                    {contact.boatInformation}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4">
                  <span className="text-sm text-gray-600">
                    {contact.comments}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4">
                  <span className="text-sm text-gray-600">
                    {formatDate(contact.createdAt)}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleEmail(contact.email)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Send Email"
                    >
                      <Mail className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleCall(contact.phone)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Call"
                    >
                      <Phone className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
