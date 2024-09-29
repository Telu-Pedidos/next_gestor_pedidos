const productDefaultUrl =
  "https://res.cloudinary.com/dwhm5cotm/image/upload/v1727620986/br-11134207-7r98o-ltj7hr73hull0e_resize_w900_nl_1_fbmvmb.jpg";

export function transformPhotoProduct(imageUrl: string | undefined) {
  if (imageUrl === undefined) return productDefaultUrl;
  return imageUrl?.length > 30 ? imageUrl : productDefaultUrl;
}
