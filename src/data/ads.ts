export interface IAd {
  id: string;
  title: string;
  price: string;
  category: string;
  postedAt: string;
  location: string;
  seller: {
    name: string;
    isCompany: boolean;
    avatar?: string;
    overallScore: number;
    receivedCount: number;
  };
  images: string[];
  characteristics: { label: string; value: string[] | string }[];
  description: string;
  similarAds: ISimilarAd[];
  partnerAds: ISimilarAd[];
  kufarUrl: string;
}

export interface ISimilarAd {
  id: string;
  image?: string;
  title: string;
  price: number | string;
  postedAt: string;
}
