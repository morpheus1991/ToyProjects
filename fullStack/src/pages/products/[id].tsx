import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Detail from "../../components/product/ProductDetail";
import { fetcher, QueryKeys } from "../../queryClient";
import { Product } from "../../types";

const ProductDetail = () => {
  const { id } = useParams();
  const { data } = useQuery<Product>([QueryKeys.PRODUCTS, id], () =>
    fetcher({
      method: "GET",
      path: `/products/${id}`,
    })
  );
  console.log(data);

  if (!data) return null;

  const {
    category,
    title,
    description,
    image,
    price,
    rating: { rate },
  } = data;
  return (
    <div>
      <h2>상품 상세</h2>
      <Detail item={data} />
    </div>
  );
};

export default ProductDetail;
