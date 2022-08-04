import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 text-sm text-gray-500 dark:bg-transparent dark:text-gray-100">
      <div className="px-8 py-3">
        <p className="text-center ">
          {'Copyright © '}
          <a href="https://hci.ucla.edu/#team">UCLA HCI </a>
          {new Date().getFullYear()}
          {'.'}
        </p>
      </div>
    </footer>
  );
}
