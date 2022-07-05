import React from 'react';
import { HomeIcon, UserIcon } from '@heroicons/react/outline';
import SidebarRow from './SidebarRow';

function Sidebar() {
  return (
    <div className="col-span-2 flex flex-col items-center px-4 md:items-start">
      <img className="m-3 h-10 w-10" src="https://links.papareact.com/drq" />
      <SidebarRow Icon={HomeIcon} title="Home" />
      <SidebarRow Icon={UserIcon} title="Sign In" />
    </div>
  );
}

export default Sidebar;
