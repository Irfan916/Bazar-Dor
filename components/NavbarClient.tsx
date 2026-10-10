"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { getCategories } from "@/lib/api";
import { Category } from "@/types";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import PriceTicker from "./PriceTicker";
import NavbarDate from "./NavbarDate";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";

interface NavbarClientProps {
    initialCategories: Category[];
}

export default function NavbarClient({ initialCategories }: NavbarClientProps) {
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        let active = true;
        getCategories()
            .then((data) => {
                if (active) setCategories(data);
            })
            .catch(console.error);
        return () => {
            active = false;
        };
    }, []);
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setUserMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const closeMenu = () => setMobileMenuOpen(false);
    const handleSignOut = async () => {
        try {
            await signOut();
            toast.success("সাইন আউট হয়েছে");
            setUserMenuOpen(false);
            closeMenu();
            router.push("/");
        } catch {
            toast.error("সাইন আউট ব্যর্থ");
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm">
            <div className="max-w-6xl mx-auto px-3 sm:px-4">
                <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
                    <Link
                        href="/"
                        className="flex items-center gap-2 shrink-0"
                        onClick={closeMenu}
                    >
                        <Image
                            src="/logo.svg"
                            alt="বাজার দর লোগো"
                            width={36}
                            height={36}
                            className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                            priority
                        />
                        <div className="flex flex-col">
                            <span className="text-base sm:text-xl font-bold text-primary leading-tight">
                                বাজার দর
                            </span>
                            <NavbarDate />
                        </div>
                    </Link>

                    <div className="hidden sm:flex items-center gap-3">
                        {session ? (
                            <div className="relative" ref={menuRef}>
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-50 transition"
                                >
                                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                                        {(session.user.name || "U").charAt(0).toUpperCase()}
                                    </span>
                                    <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                                        {session.user.name || "প্রোফাইল"}
                                    </span>
                                    <svg
                                        className={cn(
                                            "w-4 h-4 text-gray-400 transition-transform",
                                            userMenuOpen && "rotate-180"
                                        )}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>

                                {userMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <p className="font-semibold text-sm text-gray-900">
                                                {session.user.name}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-0.5 truncate">
                                                {session.user.email}
                                            </p>
                                        </div>
                                        <Link
                                            href="/profile"
                                            onClick={() => setUserMenuOpen(false)}
                                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                                        >
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                />
                                            </svg>
                                            আমার প্রোফাইল
                                        </Link>
                                        <button
                                            onClick={handleSignOut}
                                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition text-left"
                                        >
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                />
                                            </svg>
                                            সাইন আউট
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link
                                    href="/signin"
                                    className="text-sm font-medium text-gray-700 hover:text-primary whitespace-nowrap"
                                >
                                    সাইন ইন
                                </Link>
                                <Link
                                    href="/signup"
                                    className="text-sm font-medium bg-primary text-white px-3 py-1.5 rounded-md hover:bg-primary-dark transition whitespace-nowrap"
                                >
                                    সাইন আপ
                                </Link>
                            </>
                        )}
                    </div>

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="sm:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {mobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {mobileMenuOpen && (
                    <div className="sm:hidden pb-3 border-t border-gray-100">
                        <div className="flex flex-col gap-1 pt-2">
                            {session ? (
                                <>
                                    <div className="px-3 py-2 border-b border-gray-100 mb-1">
                                        <p className="font-semibold text-sm text-gray-900">
                                            {session.user.name}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {session.user.email}
                                        </p>
                                    </div>
                                    <Link
                                        href="/profile"
                                        onClick={closeMenu}
                                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                        আমার প্রোফাইল
                                    </Link>
                                    <button
                                        onClick={handleSignOut}
                                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md text-left"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                            />
                                        </svg>
                                        সাইন আউট
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/signin"
                                        onClick={closeMenu}
                                        className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                                    >
                                        সাইন ইন
                                    </Link>
                                    <Link
                                        href="/signup"
                                        onClick={closeMenu}
                                        className="px-3 py-2 text-sm font-medium bg-primary text-white rounded-md text-center"
                                    >
                                        সাইন আপ
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
                
                <nav className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-3 sm:-mx-4 px-3 sm:px-4">
                    <Link
                        href="/"
                        onClick={closeMenu}
                        className={cn(
                            "text-xs sm:text-sm font-medium whitespace-nowrap px-2 py-1 rounded-md transition shrink-0",
                            pathname === "/" ? "bg-primary/10 text-primary" : "text-gray-600 hover:text-primary"
                        )}
                    >
                        সব
                    </Link>
                    {categories.map((cat) => (
                        <Link
                            key={cat.slug}
                            href={`/category/${cat.slug}`}
                            onClick={closeMenu}
                            className={cn(
                                "text-xs sm:text-sm font-medium whitespace-nowrap px-2 py-1 rounded-md transition flex items-center gap-1 shrink-0",
                                pathname === `/category/${cat.slug}` ? "bg-primary/10 text-primary" : "text-gray-600 hover:text-primary"
                            )}
                        >
                            <span>{cat.icon}</span> {cat.nameBn}
                        </Link>
                    ))}
                </nav>
            </div>
            <PriceTicker />
        </header>
    );
}