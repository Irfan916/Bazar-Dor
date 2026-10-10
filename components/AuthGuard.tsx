"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const redirectedRef = useRef(false);

  useEffect(() => {
    if (!isPending && !session && !redirectedRef.current) {
      redirectedRef.current = true;
      toast.error("এই পেজ দেখতে অনুগ্রহ করে লগইন করুন");
      router.replace("/signin");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 animate-pulse">
        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col md:flex-row gap-6">
          <div className="w-20 h-20 bg-gray-200 rounded-full" />
          <div className="flex-1 space-y-3">
            <div className="w-48 h-6 bg-gray-200 rounded" />
            <div className="w-32 h-4 bg-gray-200 rounded" />
            <div className="w-24 h-4 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 rounded-xl" />
          ))}
        </div>
        <div className="mt-8 h-64 bg-gray-200 rounded-xl" />
      </div>
    );
  }

  if (!session) return null;

  return <>{children}</>;
}