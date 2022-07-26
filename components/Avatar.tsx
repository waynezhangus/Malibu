import React from 'react';

interface Props {
  url: string;
  className?: string;
}

export default function Avatar({ url, className }: Props) {
  return (
    <img
      loading="lazy"
      className={`h-8 cursor-pointer rounded-full transition-transform duration-150 hover:scale-110 ${className}`}
      src={url}
      alt="profile pic"
    />
  );
}
