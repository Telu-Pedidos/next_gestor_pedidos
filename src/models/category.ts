export interface CategoryDTO {
  name: string;
  slug?: string;
}

export interface CategoryResponse extends CategoryDTO {
  id: number;
}
