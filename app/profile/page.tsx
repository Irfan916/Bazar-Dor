import { Suspense } from "react";
import ProfileClient from "@/components/ProfileClient";

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse">
          <div className="w-48 h-7 bg-gray-200 rounded mb-6" />
          <div className="h-24 bg-gray-200 rounded-xl mb-6" />
          <div className="h-40 bg-gray-200 rounded-xl" />
        </div>
      }
    >
      <ProfileClient />
    </Suspense>
  );
}