"use client";

import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
  

export default function Navbar() {
    return (
        <NavigationMenu className="px-8">
            <NavigationMenuList>
              <NavigationMenuItem className="p-4 hover:underline">
                <Link href="/">
                    Home
                </Link>
                    
                </NavigationMenuItem>
                <NavigationMenuItem className="p-4 hover:underline">
                  <Link href="/article/all">
                      Articles
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="p-4 hover:underline">
                  <Link href="/tag/all">
                      Tags
                  </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}