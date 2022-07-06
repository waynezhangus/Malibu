import React from 'react';
import { HomeIcon, UserIcon } from '@heroicons/react/outline';
import SidebarRow from './SidebarRow';
import { useSession, signIn, signOut } from 'next-auth/react';

function Sidebar() {
  const { data: session } = useSession();
  return (
    <div className="col-span-2 flex flex-col items-center px-4 md:items-start">
      <img className="m-3 h-10 w-10" src="https://links.papareact.com/drq" />
      <SidebarRow Icon={HomeIcon} title="Home" />
      <SidebarRow
        onClick={session ? signOut : signIn}
        Icon={UserIcon}
        title={session ? 'Sign out' : 'Sign in'}
      />
    </div>
  );
}

export default Sidebar;
