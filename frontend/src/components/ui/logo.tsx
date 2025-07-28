import Link from 'next/link'
import Image from 'next/image'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <Image
        src="/chylers-logo.avif"
        alt="Chyler's Hawaiian Beef Chips"
        width={140}
        height={50}
        className="h-12 w-auto"
        priority
      />
    </Link>
  )
}