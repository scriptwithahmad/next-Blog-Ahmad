/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    DB_URI:"mongodb+srv://ahmed:ahmed@edify.9anuaq1.mongodb.net/blog?retryWrites=true&w=majority",
    NEXTAUTH_SECRET: "criccode",
  },
};

module.exports = nextConfig;







// vercel deploy process fail url
// next-blog-ahmad-qv2n0gfku-scriptwithahmad.vercel.app