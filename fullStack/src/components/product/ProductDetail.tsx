import React, { FC } from "react";
import { Product } from "../../graphql/products";

interface Props {
  item: Product;
}
const ProductDetail = ({
  item: { title, imageUrl, description, price },
}: {
  item: Product;
}) => (
  <div className="product-detail">
    <p className="product-detail__title">{title}</p>
    <img className="product-detail__image" src={imageUrl} alt="" />
    <p className="product-detail__description">{description}</p>
    <span className="product-detail__price">{price}</span>
  </div>
);

export default ProductDetail;
