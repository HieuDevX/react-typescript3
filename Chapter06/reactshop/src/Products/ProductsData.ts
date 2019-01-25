export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  reviews: IReview[];
}

export interface IReview {
  comment: string;
  reviewer: string;
}

export const products: IProduct[] = [
  {
    description:
      "A collection of navigational components that compose declaratively with your app",
    id: 1,
    name: "React Router",
    price: 8,
    reviews: [
      {
        comment: "Excellent! This does everything I want",
        reviewer: "Billy"
      },
      {
        comment: "The best router I've ever worked with",
        reviewer: "Sally"
      }
    ]
  },
  {
    description: "A library that helps manage state across your app",
    id: 2,
    name: "React Redux",
    price: 12,
    reviews: [
      {
        comment: "Excellent! This does everything I want",
        reviewer: "Hieu"
      },
      {
        comment: "The best router I've ever worked with",
        reviewer: "Nghia"
      }
    ]
  },
  {
    description: "A library that helps you interact with a GraphQL backend",
    id: 3,
    name: "React Apollo",
    price: 12,
    reviews: [
      {
        comment: "Excellent! This does everything I want",
        reviewer: "Chien"
      },
      {
        comment: "The best router I've ever worked with",
        reviewer: "Truong"
      }
    ]
  }
];
