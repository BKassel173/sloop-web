'use client'

import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <nav className="mx-auto max-w-6xl px-4 h-14 flex items-center">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-semibold">Sloop</Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/products" className="px-3 py-2 rounded-md hover:bg-gray-100">
                    Products
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/#how-it-works" className="px-3 py-2 rounded-md hover:bg-gray-100">
                    How it works
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/#pricing" className="px-3 py-2 rounded-md hover:bg-gray-100">
                    Pricing
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="ml-auto">
          <Link
            href="/products"
            className="inline-flex items-center rounded-md bg-sloop-purple text-white px-4 py-2 text-sm font-medium hover:opacity-90"
          >
            Start now
          </Link>
        </div>
      </nav>
    </header>
  )
}
