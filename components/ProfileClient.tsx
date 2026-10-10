"use client";

import Image from "next/image";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import UpdateNameForm from "./UpdateNameForm";

export default function ProfileClient() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("সাইন আউট হয়েছে");
      router.push("/");
    } catch {
      toast.error("সাইন আউট ব্যর্থ");
    }
  };

  if (isPending || !session) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse">
        <div className="w-48 h-7 bg-gray-200 rounded mb-6" />
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="w-32 h-5 bg-gray-200 rounded" />
            <div className="w-48 h-4 bg-gray-200 rounded" />
          </div>
          <div className="w-28 h-9 bg-gray-200 rounded-lg" />
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6">
          <div className="w-32 h-5 bg-gray-200 rounded mb-4" />
          <div className="w-full h-10 bg-gray-200 rounded-lg mb-4" />
          <div className="w-full h-10 bg-gray-200 rounded-lg" />
        </div>
      </div>
    );
  }

  const user = session.user;
  const initial = (user.name || user.email || "U").charAt(0).toUpperCase();

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-10">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          আমার প্রোফাইল
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          আপনার অ্যাকাউন্টের তথ্য প্রদর্শন করুন
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || "User"}
              width={64}
              height={64}
              unoptimized
              className="w-16 h-16 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold shrink-0">
              {initial}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <p className="text-lg font-semibold text-gray-900 truncate">
              {user.name || "নাম নেই"}
            </p>
            <p className="text-sm text-gray-500 truncate mt-0.5">
              {user.email}
            </p>
          </div>

          {/* Sign out button */}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 border border-red-300 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 transition w-full sm:w-auto justify-center"
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
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6 mt-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">তথ্য</h2>
        <UpdateNameForm initialName={user.name || ""} />
      </div>
    </div>
  );
}