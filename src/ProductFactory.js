import uniqid from "uniqid";

export const createProduct = ({
  id = uniqid(),
  productName,
  productPic,
  productPrice = 2,
}) => {
  return {
    id,
    name: productName,
    pic: productPic,
    price: productPrice,
  };
};
