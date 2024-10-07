const productDefaultUrl =
  "https://ik.imagekit.io/hijykdr24/telupedidos/product-default?updatedAt=1728346533526";

export function transformPhotoProduct(imageUrl: string | undefined) {
  if (imageUrl === undefined) return productDefaultUrl;
  return imageUrl?.length > 30 ? imageUrl : productDefaultUrl;
}
