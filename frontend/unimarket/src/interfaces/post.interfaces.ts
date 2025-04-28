export interface PublicationType {
  code: string;
  label: string;
}

export interface CurrencyType {
  code: string;
  label: string;
  symbol: string;
}

export interface BadgeType {
  code: string;
  label: string;
}

export interface NewProductType {
  title: string;
  overview: string;
  publication_type: string;
  currency: string;
  price: number;
  old_price: number;
  stock: number;
  images: Array<string>;
  product_description: {
    paragraphs: Array<{ type: string; text?: string; items?: Array<string> }>;
    sections: Array<{
      title: string;
      list: Array<{
        type: string;
        icon: string;
        content: { key?: string; value?: string };
      }>;
    }>;
  };
}
