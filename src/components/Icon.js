import React from 'react';

const ICONS = {
  'chevron-right': 'M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z',
};

export default function Icon({ name, color = 'inherit', size = 24, ...props }) {
  if (!name) {
    throw new Error('`name` prop is required for Icon');
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill={color}
      {...props}>
      <path d={ICONS[name]} />
    </svg>
  );
}
