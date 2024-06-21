import { FC } from 'react';

const year = new Date().getFullYear();

const Footer: FC = () => (
  <footer className="w-full p-4 flex justify-center items-center">
    <span>&copy; {year} Justin Farnsworth</span>
  </footer>
);

export default Footer;
