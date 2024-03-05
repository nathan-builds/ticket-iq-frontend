/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com','s1.ticketm.net']
    },
    logging:{
        fetches:{
            fullUrl:true
        }
    },
    reactStrictMode:false
}

module.exports = nextConfig
