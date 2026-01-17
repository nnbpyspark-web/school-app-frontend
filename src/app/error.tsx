"use client"

import { useEffect } from "react"
import { AlertCircle } from "lucide-react"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-950 text-white gap-4">
            <AlertCircle className="h-16 w-16 text-red-500" />
            <h2 className="text-2xl font-bold">Something went wrong!</h2>
            <p className="text-gray-400 max-w-md text-center">
                We encountered an error while processing your request.
            </p>
            <div className="flex gap-4">
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                    Reload Page
                </button>
                <button
                    onClick={() => reset()}
                    className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Try Again
                </button>
            </div>
        </div>
    )
}
