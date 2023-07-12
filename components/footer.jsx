import Link from "next/link";
import { ImFacebook,ImTwitter, ImYoutube } from "react-icons/im";
import { Newsletter } from "./_child/Newsletter";



const Footer = () => {
  return (
    <footer className="gb-gray-50">
      <Newsletter />
      <div className="container mx-auto flex justify-center py-12">
        <div className="py-5">
          <div className="flex gap-6 justify-center">
            <Link href="/facebook"><ImFacebook color="#888888" /></Link>
            <Link href="/twitter"><ImTwitter color="#888888" /></Link>
            <Link href="/youtube"><ImYoutube color="#888888" /></Link>
          </div>
          <p className="py-5 text-gray-400">Copyright 2022 All rights reserved | This Template is made by M Ahmad</p>
          <p className="text-gray-400 text-center">Terms & Conditions</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;