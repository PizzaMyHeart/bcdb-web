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
        <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/">
                    Home
                </Link>
                    
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/article/all">
                      Articles
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/tag/all">
                      Tags
                  </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}