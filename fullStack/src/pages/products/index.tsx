import React from "react";
import { useQuery } from "react-query";
import ProductItem from "../../components/product/ProductItem";
import { fetcher, QueryKeys } from "../../queryClient";
import { Product } from "../../types";

const ProductList = () => {
  const { data } = useQuery<Product[]>(QueryKeys.PRODUCTS, () =>
    fetcher({
      method: "GET",
      path: "/products",
    })
  );
  console.log(data);
  return (
    <div>
      <h2>상품 목록</h2>
      <ul className="products">
        {data?.map((product) => (
          <ProductItem {...product} key={product.id} />
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
