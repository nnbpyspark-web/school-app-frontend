"use client"

import Link from "next/link"
import { AlertOctagon } from "lucide-react"

export default function NotFound() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-950 text-white gap-4">
            <AlertOctagon className="h-20 w-20 text-blue-500 animate-pulse" />
            <h2 className="text-4xl font-bold">404</h2>
            <p className="text-lg text-gray-400">Page Not Found</p>
            <Link href="/dashboard" className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                Return to Dashboard
            </Link>
        </div>
    )
}
