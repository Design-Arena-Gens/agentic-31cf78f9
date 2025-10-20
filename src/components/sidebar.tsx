"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Mic, Book, Settings, History } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/voices", label: "Voices", icon: Mic },
  { href: "/audiobook", label: "Audiobook", icon: Book },
  { href: "/podcast", label: "Podcast", icon: Mic },
  { href: "/history", label: "History", icon: History },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 p-4 space-y-4 bg-secondary text-secondary-foreground">
      <div className="text-2xl font-serif font-bold text-accent">Edge-TTS</div>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center p-2 rounded-md hover:bg-accent/10",
                  pathname === item.href && "bg-accent/20"
                )}
              >
                <item.icon className="w-5 h-5 mr-2" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
