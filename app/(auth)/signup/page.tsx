"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { signUp, signIn } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড মিলছে না");
      return;
    }
    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    setLoading(true);
    try {
      const { error } = await signUp.email({ name, email, password });
      if (error) {
        toast.error(error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
        setLoading(false);
        return;
      }
      toast.success("সফলভাবে রেজিস্টার হয়েছে! সাইন ইন করুন।");
      router.push("/signin");
    } catch {
      toast.error("কিছু ভুল হয়েছে");
      setLoading(false);
    }
  };

  const handleSocial = async (provider: "google" | "github") => {
    try {
      await signIn.social({ provider, callbackURL: "/" });
    } catch {
      toast.error("সোশ্যাল লগইন ব্যর্থ হয়েছে");
    }
  };

  return (
    <div className="max-w-md mx-auto py-10 sm:py-14 px-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          নিচের তথ্য ব্যবহার করে নতুন অ্যাকাউন্ট তৈরি করুন
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              নাম
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার পূর্ণ নাম"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary/40 focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ইমেইল
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary/40 focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary/40 focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="পুনরায় লিখুন"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary/40 focus:border-primary focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-primary-dark transition disabled:opacity-50"
          >
            {loading ? "লোড হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
        </form>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-3 text-gray-400">অথবা</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={() => handleSocial("google")}
            className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            Google দিয়ে সাইন আপ করুন
          </button>
          <button
            type="button"
            onClick={() => handleSocial("github")}
            className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            GitHub দিয়ে সাইন আপ করুন
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="text-primary font-medium hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </div>
  );
}