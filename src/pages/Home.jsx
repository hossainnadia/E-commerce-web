import React from 'react'
import LeadingPage from '../components/LeadingPage'
import Products from './Products'

const Home = () => {
    return (
        <>
            {/* স্লাইডার বা লিডিং পেজটি পুরোপুরি ফুল-উইডথ থাকবে */}
            <LeadingPage />

            {/* প্রোডাক্ট সেকশনটিকে কন্টেইনারের ভেতর এনে প্যাডিং দেওয়া হলো */}
            <div className="container mx-auto px-4 md:px-8 max-w-8xl mt-12">
                <Products />
            </div>
        </>
    )
}

export default Home