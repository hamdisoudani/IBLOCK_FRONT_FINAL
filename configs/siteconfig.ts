
import SiteConfigTypes from "@/lib/types/siteconfig.type";
import { Facebook, Github } from "lucide-react";

export const siteConfig: SiteConfigTypes = {
    siteName: "Next.js",
    siteDescription:
      "Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.",
    landingPage: [
      {
        title: "Home",
        href: "/",
      },
    ],
    socialMedia: [
        {
            name: 'facebook',
            link: 'https://facebook.com/intellect'
        }, {
            name: 'github',
            link: 'https://github.com/intellect'
        }
    ],
  }