import { createProduct } from "./ProductFactory";
import {
  mdiAbacus,
  mdiAbjadArabic,
  mdiAbjadHebrew,
  mdiAbTesting,
  mdiAccessPoint,
  mdiCabinAFrame,
  mdiCactus,
  mdiFaceAgent,
  mdiPackage,
  mdiSafe,
  mdiWalk,
  mdiWall,
} from "@mdi/js";
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
  createProduct({
    productName: "CabinAFrame",
    productPic: <Icon role="img" title="CabinAFrame" path={mdiCabinAFrame} />,
  }),
  createProduct({
    productName: "FaceAgent",
    productPic: <Icon role="img" title="FaceAgent" path={mdiFaceAgent} />,
  }),
  createProduct({
    productName: "Cactus",
    productPic: <Icon role="img" title="Cactus" path={mdiCactus} />,
  }),
  createProduct({
    productName: "Safe",
    productPic: <Icon role="img" title="Safe" path={mdiSafe} />,
  }),
  createProduct({
    productName: "AbjadArabic",
    productPic: <Icon role="img" title="AbjadArabic" path={mdiAbjadArabic} />,
  }),
  createProduct({
    productName: "AbjadHebrew",
    productPic: <Icon role="img" title="AbjadHebrew" path={mdiAbjadHebrew} />,
  }),
  createProduct({
    productName: "Walk",
    productPic: <Icon role="img" title="Walk" path={mdiWalk} />,
  }),
  createProduct({
    productName: "Package",
    productPic: <Icon role="img" title="Package" path={mdiPackage} />,
  }),
  createProduct({
    productName: "Wall",
    productPic: <Icon role="img" title="Wall" path={mdiWall} />,
  }),
];

export default function getProducts() {
  return products;
}
