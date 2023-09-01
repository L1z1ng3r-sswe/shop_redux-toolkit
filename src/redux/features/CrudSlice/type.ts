export enum ECategory {
  todo = "todo",
  inProcess = "inProcess",
  done = "done",
}

export type TTodos = {
  id: number;
  text: string;
  category: ECategory;
  likes: string[];
  user: string;
};

export enum Estatus {
  idle = "idle",
  loading = "loading",
  error = "error",
}

export type TInitialState = {
  todos: TTodos[];
  status: Estatus;
  error: any;
};
export type TCategory = {
  category: ECategory;
  id: number;
};
