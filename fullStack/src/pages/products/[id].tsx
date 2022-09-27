import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Detail from "../../components/product/ProductDetail";
import { GET_PRODUCT, Product } from "../../graphql/products";
import { graphqlFetcher, QueryKeys } from "../../queryClient";

const ProductDetail = () => {
  const { id } = useParams();
  const { data } = useQuery<Product>([QueryKeys.PRODUCTS, id], () =>
    graphqlFetcher(GET_PRODUCT)
  );
  console.log(data);

  if (!data) return null;

  return (
    <div>
      <h2>상품 상세</h2>
      <Detail item={data} />
    </div>
  );
};

export default ProductDetail;
