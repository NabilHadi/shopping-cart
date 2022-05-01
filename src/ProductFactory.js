import uniqid from "uniqid";

export const createProduct = ({ id = uniqid(), productName, productPic }) => {
  return {
    id,
    name: productName,
    pic: productPic,
  };
};
