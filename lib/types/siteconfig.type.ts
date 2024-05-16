import { ReactComponentElement, ReactElement, ReactNode } from "react";

type Links = {
    title: string,
    href: string
} 


type SocialMediaName = 'twitter' | 'facebook' | 'tiktok' | 'github';

type SocialMedia = {
  name: SocialMediaName;
  link: string;
};


type SiteConfigTypes = {
    siteName: string,
    siteDescription: string,
    landingPage: Links[],
    socialMedia: SocialMedia[]
}

export default SiteConfigTypes