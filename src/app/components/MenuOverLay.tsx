import React from 'react'
import NavLink from './NavLink';

type Link = {
  href: string;
  label: string;
};
type MenuOverLayProps = {
  links: Link[];
};

const MenuOverLay = ({links }: MenuOverLayProps) => {
  return (
    <ul className='flex flex-col py-4 items-center'>
        {
            links.map((link) => (
                <NavLink key={link.href} href={link.href}>
                    {link.label}
                </NavLink>
            ))
        }
    </ul>
  )
}

export default MenuOverLay