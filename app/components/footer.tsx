import Image from 'next/image';
import githubIcon from '@/public/github-icon.svg';
import pokeballIcon from '@/public/pokeball_icon.svg';
import nextJSIcon from '@/public/nextjs-icon.svg';
import vercelIcon from '@/public/vercel-icon.svg';
import { memo } from 'react';

const Footer = memo(function Footer() {
  return (
    <footer className="pokedex-footer">
      <div className="footer-content">
        <p className="footer-text">
          PokéDex creada usando Next.js y la PokéAPI
        </p>
        <div className="footer-links">
          <a href="https://github.com/Khondax/pokenext" target="_blank" rel="noopener noreferrer" className="footer-link">
            <Image src={githubIcon} alt="GitHub" className="github-icon" width={30} height={30} />
          </a>
          <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer" className="footer-link">
            <Image src={pokeballIcon} alt="PokeAPI" className="github-icon" width={30} height={30} />
          </a>
          <a href="https://nextjs.com" target="_blank" rel="noopener noreferrer" className="footer-link">
            <Image src={nextJSIcon} alt="NextJS" className="github-icon" width={30} height={30} />
          </a>
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="footer-link">
            <Image src={vercelIcon} alt="Vercel" className="github-icon" width={30} height={30} />
          </a>
        </div>
        <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '1rem' }}>
          © 2025 PokéDex - Todos los derechos reservados a The Pokémon Company
        </p>
      </div>
    </footer>
  );
});

export default Footer;