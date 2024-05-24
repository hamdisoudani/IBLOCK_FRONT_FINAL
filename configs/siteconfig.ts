
import SiteConfigTypes from "@/lib/types/siteconfig.type";

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
    WS_PROJECT_EVENTS: "https://iblock-back-test.onrender.com/",
    WS_ROBOT_EVENTS: "https://iblock-back-test.onrender.com/robot"
  }