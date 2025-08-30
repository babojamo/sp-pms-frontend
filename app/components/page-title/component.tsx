/* eslint-disable @next/next/no-sync-scripts */
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import React from 'react';

interface PageTileProps {
  title?: string;
  url?: string;
  icon?: string;
}

const PageTile = ({ title = 'Page', url = '/', icon }: PageTileProps) => {
  const route = useRouter();

  const onClick = () => {
    route.push(url);
  };

  return (
    <h3>
      <Button size="small" outlined className="mr-2" severity="info" onClick={onClick} icon={icon} />
      {title}
    </h3>
  );
};

export default PageTile;
