"use client"
import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import { CreditCard, CheckCircle, AlertTriangle } from "lucide-react"

export default function BillingPage() {
    const supabase = createClient()
    const [subscription, setSubscription] = useState<any>(null)
    const [school, setSchool] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Load Razorpay script
        const script = document.createElement("script")
        script.src = "https://checkout.razorpay.com/v1/checkout.js"
        document.body.appendChild(script)

        fetchSubscription()

        return () => {
            document.body.removeChild(script)
        }
    }, [])

    async function fetchSubscription() {
        setLoading(true)
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        // 1. Get School
        const { data: profile } = await supabase.from('profiles').select('school_id').eq('id', user.id).single()
        if (profile?.school_id) {
            const { data: schoolData } = await supabase.from('schools').select('*').eq('id', profile.school_id).single()
            setSchool(schoolData)

            // 2. Get Subscription
            const { data: subData } = await supabase.from('subscriptions').select('*').eq('school_id', profile.school_id).single()
            setSubscription(subData)
        }
        setLoading(false)
    }

    async function handleSubscribe(planId: string) {
        if (!school) return alert("No school found")

        // 1. Map Plan to Amount (In Paise)
        // Basic: 2900 INR -> 290000 paise
        // Pro: 7900 INR -> 790000 paise
        const amount = planId === 'basic' ? 2900 * 100 : 7900 * 100

        try {
            // 2. Create Order
            const res = await fetch("http://localhost:8000/api/v1/payments/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: amount,
                    currency: "INR",
                    plan_id: planId,
                    school_id: school.id
                })
            })

            if (!res.ok) throw new Error("Failed to create order")

            const data = await res.json() // { order_id, key, ... }

            // 3. Open Razorpay Checkout
            const options = {
                key: data.key,
                amount: data.amount,
                currency: data.currency,
                name: "EduSaaS",
                description: `Subscription for ${planId} plan`,
                order_id: data.order_id,
                handler: async function (response: any) {
                    // 4. Verify Payment on Success
                    await verifyPayment({
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        school_id: school.id,
                        plan_id: planId
                    })
                },
                prefill: {
                    name: school.name,
                    email: "admin@school.com" // Ideally fetched from user profile
                },
                theme: {
                    color: "#3b82f6"
                }
            }

            const rzp1 = new (window as any).Razorpay(options)
            rzp1.open()

        } catch (error: any) {
            alert(error.message)
        }
    }

    async function verifyPayment(payload: any) {
        try {
            const res = await fetch("http://localhost:8000/api/v1/payments/verify-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })

            if (!res.ok) throw new Error("Payment verification failed")

            alert("Subscription Activated Successfully!")
            window.location.reload() // Reload to fetch new subscription status

        } catch (error: any) {
            alert("Payment successful but verification failed. Please contact support.")
            console.error(error)
        }
    }

    if (loading) return <div className="p-8 text-white">Loading billing info...</div>

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">Billing & Subscription</h1>
                {school?.subscription_status === 'active' && (
                    <span className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                        <CheckCircle size={14} /> Active
                    </span>
                )}
            </div>

            {/* Current Plan Card */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Current Subscription</h2>
                {subscription ? (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                            <div>
                                <p className="text-gray-400 text-sm">Plan</p>
                                <p className="text-white font-medium capitalize">{subscription.plan_id}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Status</p>
                                <p className={`font-medium capitalize ${subscription.status === 'active' ? 'text-green-400' : 'text-yellow-400'}`}>
                                    {subscription.status}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Cost</p>
                                <p className="text-white font-medium">
                                    {subscription.plan_id === 'basic' ? '₹2900' : '₹7900'}/mo
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-end pt-2">
                            <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">Manage Subscription &rarr;</button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-6">
                        <AlertTriangle className="mx-auto text-yellow-500 mb-2" size={32} />
                        <p className="text-white mb-4">You are on the free trial (or no active plan).</p>
                        <p className="text-gray-400 text-sm">Upgrade to unlock all features.</p>
                    </div>
                )}
            </div>

            {/* Pricing Options */}
            {!subscription && (
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Basic Plan */}
                    <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition-colors">
                        <h3 className="text-xl font-bold text-white mb-2">Basic</h3>
                        <p className="text-3xl font-bold text-white mb-4">₹2,900<span className="text-lg text-gray-500 font-normal">/mo</span></p>
                        <ul className="space-y-3 mb-8 text-gray-300">
                            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-blue-500" /> Up to 500 Students</li>
                            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-blue-500" /> Attendance Tracking</li>
                            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-blue-500" /> Basic Reports</li>
                        </ul>
                        <button onClick={() => handleSubscribe('basic')} className="w-full bg-white text-black hover:bg-gray-100 py-2 rounded-lg font-medium transition-colors">
                            Choose Basic
                        </button>
                    </div>

                    {/* Pro Plan */}
                    <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-xl p-6 hover:border-blue-500 transition-colors relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-3 py-1 rounded-bl-lg">Recommended</div>
                        <h3 className="text-xl font-bold text-white mb-2">Pro</h3>
                        <p className="text-3xl font-bold text-white mb-4">₹7,900<span className="text-lg text-gray-500 font-normal">/mo</span></p>
                        <ul className="space-y-3 mb-8 text-gray-300">
                            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-blue-400" /> Unlimited Students</li>
                            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-blue-400" /> Advanced Analytics</li>
                            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-blue-400" /> Media & Assignments</li>
                            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-blue-400" /> Priority Support</li>
                        </ul>
                        <button onClick={() => handleSubscribe('pro')} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors shadow-lg shadow-blue-900/20">
                            Choose Pro
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
