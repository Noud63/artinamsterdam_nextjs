"use client";

export default function ContinueButton({ url }) {
  return (
    <button
      type="button"
      onClick={() => window.location.assign(url)}
      className="rounded-full border border-yellow-200 bg-yellow-700 px-6 py-3 font-semibold text-white"
    >
      Continue signing in
    </button>
  );
}