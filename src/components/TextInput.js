import React from 'react'
import { Textarea } from '@mantine/core';

const TextInput = ({value, onChange}) => {
  return (
      // Outer div for vertical & horizontal centering with padding for Material Design spacing
      <div className="flex items-center justify-center p-4 bg-gray-50">
      {/* Inner div for max-width & shadow for Material Design elevation */}
      <div className="w-full max-w-3xl px-3 py-2 bg-white rounded-lg shadow-md">
        <Textarea
          autosize
          resize="vertical"
          variant='unstyled'
          placeholder="Enter radiology transcript here..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          // Tailwind CSS for Material Design aesthetics
          className="w-full border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
        />
      </div>
    </div>
  )
}

export default TextInput