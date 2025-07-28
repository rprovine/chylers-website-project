import Link from 'next/link'
import { Facebook, Instagram } from 'lucide-react'
import { NAVIGATION, BUSINESS_INFO, SITE_CONFIG } from '@/lib/constants'
import { Button } from '@/components/ui/button'

export function Footer() {
  return (
    <footer className="bg-gray-100 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Chyler's Hawaiian Beef Chips</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Premium Hawaiian beef chips made with Aloha since 2004. It's not jerky, it's like a chip!
            </p>
            <div className="flex space-x-4">
              <Link href={SITE_CONFIG.links.facebook} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                  <Facebook className="h-5 w-5" />
                </Button>
              </Link>
              <Link href={SITE_CONFIG.links.instagram} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                  <Instagram className="h-5 w-5" />
                </Button>
              </Link>
              <Link href={SITE_CONFIG.links.tiktok} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </Button>
              </Link>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              {NAVIGATION.shop.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-primary">
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={SITE_CONFIG.links.amazon} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary">
                  Shop on Amazon
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              {NAVIGATION.customer.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-primary">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{BUSINESS_INFO.phone}</li>
              <li>{BUSINESS_INFO.email}</li>
              <li>{BUSINESS_INFO.address}</li>
              <li className="pt-2">
                <strong>Hours:</strong><br />
                {BUSINESS_INFO.hours.weekdays}<br />
                {BUSINESS_INFO.hours.weekends}
              </li>
              <li className="pt-2">
                <strong>Will Call Pickup:</strong><br />
                {BUSINESS_INFO.willCall.location}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Chyler's Hawaiian Beef Chips. All rights reserved.
              </p>
              <div className="flex items-center gap-4 text-sm">
                {NAVIGATION.legal.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-muted-foreground hover:text-primary"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <span className="text-sm text-muted-foreground">Made in Hawaii with Aloha 🌺</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}