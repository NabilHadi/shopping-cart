import { createProduct } from "./ProductFactory";
import { mdiAbacus, mdiAbTesting, mdiAccessPoint } from "@mdi/js";
import Icon from "@mdi/react";

const products = [
  createProduct({
    productName: "Abacus",
    productPic: <Icon role="img" title="Abacus" path={mdiAbacus} />,
    productPrice: 13,
  }),
  createProduct({
    productName: "Testing",
    productPic: <Icon role="img" title="Testing" path={mdiAbTesting} />,
    productPrice: 10,
  }),
  createProduct({
    productName: "AccessPoint",
    productPic: <Icon role="img" title="AccessPoint" path={mdiAccessPoint} />,
  }),
];

export default function getProducts() {
  return products;
}
