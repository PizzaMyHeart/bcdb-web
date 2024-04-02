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
                  <NavigationMenuLink>
                    Home
                  </NavigationMenuLink>
                </Link>
                    
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/article/all">
                    <NavigationMenuLink>
                      Articles
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/tag/all">
                    <NavigationMenuLink>
                      Tags
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}