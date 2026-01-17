"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { School, Users, CreditCard, Activity } from "lucide-react"

export function SuperAdminWidgets({
    schoolCount,
    totalUsers,
    activeSubscriptions,
    recentSchools
}: {
    schoolCount: number,
    totalUsers: number,
    activeSubscriptions: number,
    recentSchools: any[]
}) {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    }

    return (
        <div className="space-y-6">
            {/* Stats Row */}
            <div className="grid gap-4 md:grid-cols-3">
                <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-400">Total Schools</CardTitle>
                            <School className="h-4 w-4 text-purple-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">{schoolCount}</div>
                            <p className="text-xs text-gray-500">Registered Platform-wide</p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-400">Active Subscriptions</CardTitle>
                            <CreditCard className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">{activeSubscriptions}</div>
                            <p className="text-xs text-gray-500">Paying Customers (Pro/Basic)</p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-400">Total Users</CardTitle>
                            <Users className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">{totalUsers}</div>
                            <p className="text-xs text-gray-500">Across all organizations</p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* School List */}
            <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
                <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                        <CardTitle className="text-white">Recently Registered Schools</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentSchools.length === 0 ? (
                                <p className="text-muted-foreground">No schools found.</p>
                            ) : (
                                recentSchools.map((school) => (
                                    <div key={school.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 bg-purple-500/10 rounded-full flex items-center justify-center text-purple-400">
                                                <School size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-white">{school.name}</h4>
                                                <p className="text-sm text-gray-400">ID: {school.id}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={`px-2 py-1 rounded text-xs ${school.subscription_status === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                                                {school.subscription_status || 'Trial'}
                                            </span>
                                            <span className="text-sm text-gray-500">{new Date(school.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}
