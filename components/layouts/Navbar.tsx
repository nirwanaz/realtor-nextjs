"use client";

import { useEffect, useState } from 'react'
import { Dialog, Disclosure, Popover } from '@headlessui/react'
import {
  Bars3Icon,
  HomeIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { UserAttributes } from '@/interfaces';
import { useAuth } from '@/context';
import { useSession } from 'next-auth/react';

const menus = [
    { name: 'Home', url: '/', icon: <HomeIcon /> },
    { name: 'Search', url: '/search', icon: <MagnifyingGlassIcon /> },
    { name: 'Buy Property', url: '/search?purpose=for-sale', icon: '' },
    { name: 'Rent Property', url: '/search?purpose=for-rent', icon: '' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, setUser } = useAuth();
  const { data } = useSession();

  useEffect(() => {
    if (data) {
      const userData = data.user as UserAttributes
      setUser(userData);
    }
  })

  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <div className="text-2xl font-bold text-gray-900">Realtor</div>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
            { menus.map((menu, index) => (
                <Link key={index} href={menu.url} className="text-sm font-semibold leading-6 text-gray-900">
                {menu.name}
              </Link>
            )) }
          
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {!user ? (
            <Link href="/auth/login" className="text-sm font-semibold leading-6 text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          ) : (
            <Link
              href="/me"
            >
              <div className="flex items-center mb-4 space-x-3 mt-4 cursor-pointer">
                {/* Image */}
                <div className="space-y-1">
                  <p className="text-gray-700">
                    {user?.fullname}
                    <time className="block text-sm text-gray-500 dark:text-gray-400">
                      {user?.email}
                    </time>
                  </p>
                </div>
              </div>
            </Link>
          )}
        </div>
      </nav>

      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <div className="text-2xl font-bold text-gray-900">Realtor</div>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {menus.map((menu, index) => (
                    <Link
                        key={index}
                        href={menu.url}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                        { menu.name }
                  </Link>
                ))}
                
              </div>
              <div className="py-6">
                {!user? (
                  <Link
                    href="/auth/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </Link>

                ) : (
                  <Link
                    href="/auth/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
