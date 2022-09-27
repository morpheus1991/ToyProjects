import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../types";

const ProductItem = ({
  category,
  description,
  id,
  image,
  price,
  rating,
  title,
}: Product) => {
  return (
    <li className="product-item">
      <Link to={`/products/${id}`}>
        <p className="product-item__category">{category}</p>
        <p className="product-item__title">{title}</p>
        <p className="product-item__description"> {description}</p>
        <img src={image} className="product-item__image" />
        <span className="product-item_price">${price}</span>
        <span className="product-item_rating">{rating.rate}</span>
      </Link>
    </li>
  );
};

export default ProductItem;
