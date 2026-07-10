import Image from 'next/image';
import Link from 'next/link';

export function PublicNav() {
  return (
    <header className="public-nav">
      <Link href="/" className="brand" aria-label="ADAT inicio">
        <Image src="/assets/adat-logo.png" alt="ADAT" width={146} height={76} priority />
        <span>ADAT</span>
      </Link>
      <nav>
        <Link href="/#programas">Programas</Link>
        <Link href="/#objetivos">Objetivos</Link>
        <Link href="/registro" className="nav-cta">Registro</Link>
        <Link href="/login">Admin</Link>
      </nav>
    </header>
  );
}
