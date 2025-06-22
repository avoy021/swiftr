"use client";

import React from "react";
import Link from "next/link";
import { FaRocket, FaComments } from "react-icons/fa";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans flex flex-col">
      {/* Header */}
      <header className="w-full px-8 py-4 flex justify-between items-center border-b border-gray-200 bg-white">
        <h1 className="text-2xl font-extrabold tracking-tight">Swiftr</h1>
        <div className="space-x-3">
          <Link href="/login">
            <button className="px-4 py-2 rounded-md bg-white border border-gray-300 text-sm font-medium hover:bg-gray-50">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="px-4 py-2 rounded-md bg-[#5b6570] text-white text-sm font-medium hover:bg-[#4a535c]">
              Sign Up
            </button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-br from-[#edf2f7] to-[#e2e8f0]">
        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Connect. Chat. Swiftr.</h2>
        <p className="text-lg text-gray-600 max-w-2xl mb-8">
          A modern chat platform built for real-time conversations that feel effortless, intuitive, and instant.
        </p>
        <Link href="/signup">
          <button className="mt-2 px-6 py-3 bg-[#5b6570] text-white font-semibold rounded-md text-base hover:bg-[#4a535c]">
            Start Chatting
          </button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8 bg-white grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="flex items-start gap-4">
          <FaComments className="text-[#5b6570] text-3xl" />
          <div>
            <h3 className="text-lg font-bold mb-1">Seamless Messaging</h3>
            <p className="text-sm text-gray-600">
              Send and receive messages in real-time with clean, responsive UI and minimal latency.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <FaRocket className="text-[#5b6570] text-3xl" />
          <div>
            <h3 className="text-lg font-bold mb-1">Lightning Fast Sync</h3>
            <p className="text-sm text-gray-600">
              Your chats update instantly across devices — so you're never left behind.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500 border-t border-gray-200">
        © 2024 Swiftr. All rights reserved.
      </footer>
    </div>
  );
}
