import { useQuery } from "@apollo/client";
import styled from "styled-components";
import Product from "./Product";
import { ALL_PRODUCTS_QUERY } from '../graphql-queries/queries/allProducts';


const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Products({ page }) {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY);

  return (
    <ProductsListStyles>
      {data?.allProducts.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </ProductsListStyles>
  );
}
