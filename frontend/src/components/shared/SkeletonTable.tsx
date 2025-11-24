import React from 'react';

const SkeletonTable: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left">
              <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
            </th>
            <th className="px-6 py-3 text-left">
              <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
            </th>
            <th className="px-6 py-3 text-left">
              <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
            </th>
            <th className="px-6 py-3 text-left">
              <div className="h-4 bg-gray-300 rounded w-12 animate-pulse"></div>
            </th>
            <th className="px-6 py-3 text-left">
              <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
            </th>
            <th className="px-6 py-3 text-left">
              <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
            </th>
            <th className="px-6 py-3 text-left">
              <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
            </th>
            <th className="px-6 py-3 text-left">
              <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {[...Array(5)].map((_, index) => (
            <tr key={index}>
              <td className="px-6 py-4">
                <div className="h-4 bg-gray-300 rounded w-32 animate-pulse"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 bg-gray-300 rounded w-12 animate-pulse"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 bg-gray-300 rounded w-28 animate-pulse"></div>
              </td>
              <td className="px-6 py-4">
                <div className="flex space-x-2">
                  <div className="h-8 bg-gray-300 rounded w-16 animate-pulse"></div>
                  <div className="h-8 bg-gray-300 rounded w-16 animate-pulse"></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkeletonTable;
