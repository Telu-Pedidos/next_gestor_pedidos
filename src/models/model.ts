export interface ModelDTO {
  name: string;
  imageUrl?: string;
}

export interface ModelResponse extends ModelDTO {
  id: number;
}
