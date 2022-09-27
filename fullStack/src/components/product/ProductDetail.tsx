import React, { FC } from "react";
import { Product } from "../../types";

interface Props {
  item: Product;
}
const ProductDetail: FC<Props> = ({ item }) => {
  const {
    category,
    title,
    description,
    image,
    price,
    rating: { rate },
  } = item;
  return (
    <div className="product-detail">
      <p className="product-detail__category">{category}</p>
      <p className="product-detail__title">{title}</p>
      <img className="product-detail__image" src={image} alt="" />
      <p className="product-detail__description">{description}</p>
      <span className="product-detail__price">{price}</span>
      <span className="product-detail__rating">{rate}</span>
    </div>
  );
};

export default ProductDetail;
