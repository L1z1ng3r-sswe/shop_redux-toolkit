export enum ECategory {
  car = "car",
  home = "home",
  food = "food",
  garden = "garden",
}
export type TProduct = {
  id?: number;
  title?: string;
  img?: string;
  description?: string;
  price?: number;
  category?: ECategory;
  likes?: string[];
  user?: string | null;
  date?: string;
};
export enum EStatus {
  idle = "idle",
  loading = "loading",
  error = "error",
}
export type TEProduct = {
  title: string;
  img: string;
  description: string;
  price: number;
  category: ECategory;
};
export type TELikes = {
  likes: string[];
};
export type TInitialState = {
  products: TProduct[];
  status: EStatus;
  error: any;
  oneProduct: TProduct | null;
};

export type EditedProduct = {
  id: number;
  updatedProduct: TEProduct | TELikes;
};
