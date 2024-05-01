"use client"

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
  } from "@/components/ui/navigation-menu";
import NavItem from "./navitem";
  

export default function Navbar() {
    return (
        <NavigationMenu className="px-4">
            <NavigationMenuList>
                <NavItem href="/" innerText="Home"/>
                <NavItem href="/article/all" innerText="Articles"/>
                <NavItem href="/tag/all" innerText="Tags"/>
                <NavItem href="/about" innerText="About"/>
            </NavigationMenuList>
        </NavigationMenu>
    )
}