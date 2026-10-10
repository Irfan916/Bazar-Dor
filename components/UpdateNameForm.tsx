"use client";

import { startTransition, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateNameForm({ initialName }: { initialName: string }) {
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    startTransition(() => setName(initialName));
  }, [initialName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("নাম খালি রাখা যাবে না");
      return;
    }

    setLoading(true);
    try {
      const { error } = await authClient.updateUser({ name: name.trim() });
      if (error) {
        toast.error(error.message || "আপডেট ব্যর্থ হয়েছে");
        setLoading(false);
        return;
      }
      toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
      setLoading(false);
    } catch {
      toast.error("কিছু ভুল হয়েছে");
      setLoading(false);
    }
  };

  return (
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
          placeholder="আপনার নাম"
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary/40 focus:border-primary focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-primary-dark transition disabled:opacity-50"
      >
        {loading ? "সংরক্ষণ হচ্ছে..." : "সাম্পাদনা করুন"}
      </button>
    </form>
  );
}