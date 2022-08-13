import * as React from 'react';
import { useRouter } from 'next/router';

export default function Feed() {
  const router = useRouter();
  const title =
    'Omicron may not be more dangerous than other variants, early hospital report suggests';
  const publisher = 'Popular Science';
  const image =
    'https://www.popsci.com/uploads/2020/03/25/Y5VQ2BU4WBGYJHKS3SNFWEBBKA.jpg?auto=webp';
  const url = 'https://www.popsci.com/science/omicron-coronavirus-variant';
  return (
    <div
      className="flex h-48 max-w-[220px] cursor-pointer flex-col space-y-1.5 rounded-2xl bg-gray-100 p-3 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-700"
      onClick={() => router.push(`/search?q=${url}`)}
    >
      <div className="text-sm text-gray-500 dark:text-gray-300">{title}</div>
      <div className="hidden text-xs text-gray-500 dark:text-gray-300 lg:block">
        {publisher}
      </div>
      <div className="min-h-0 grow">
        <img
          className="h-full w-full rounded-lg object-cover"
          src={image}
          alt=""
        />
      </div>
    </div>
  );
}
