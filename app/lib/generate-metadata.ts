import { Metadata } from "next";

type MetadataProps = {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    images?: string | string[];
    url?: string;
    siteName?: string;
    locale?: string;
    type?: string;
  };
  twitter?: {
    card?: "summary" | "summary_large_image" | "app" | "player";
    title?: string;
    description?: string;
    image?: string;
    site?: string;
    creator?: string;
  };
};

const baseMetadata: Metadata = {
  title: {
    template: "%s | MoodPlay",
    default: "MoodPlay - Turn Feelings into Playlists",
  } as { template: string; default: string },
  description: "Create emotionally-personalized Spotify playlists using AI",
  openGraph: {
    type: "website",
    siteName: "Your Site Name",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitter",
  },
};

export function generateMetadata(props?: MetadataProps): Metadata {
  return {
    ...baseMetadata,
    title: props?.title || baseMetadata.title,
    description: props?.description || baseMetadata.description,
    keywords: props?.keywords,

    // Canonical URL
    alternates: props?.canonical
      ? {
          canonical: props.canonical,
        }
      : undefined,

    // OpenGraph
    openGraph: {
      ...baseMetadata.openGraph,
      ...(props?.openGraph || {}),
      title:
        props?.openGraph?.title ||
        props?.title ||
        (baseMetadata.title as { default: string }).default,
      description:
        props?.openGraph?.description ??
        props?.description ??
        baseMetadata.description ??
        undefined,
      images: props?.openGraph?.images || props?.image || undefined,
    },

    // Twitter
    twitter: {
      ...baseMetadata.twitter,
      ...(props?.twitter || {}),
      title:
        props?.twitter?.title ||
        props?.title ||
        (baseMetadata.title as { default: string }).default,
      description:
        props?.twitter?.description ??
        props?.description ??
        baseMetadata.description ??
        undefined,
      images: props?.twitter?.image || props?.image || undefined,
    },
  };
}