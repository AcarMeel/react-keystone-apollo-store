import { useQuery } from "@apollo/client";
import DisplayError from "./ErrorMessage";
import Head from 'next/head'
import styled from "styled-components";
import { SINGLE_PRODUCT_QUERY } from '../graphql-queries/queries/singleProduct'


const ProductStyles = styled.div`
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    max-width: var(--maxWidth);
    justify-content: center;
    align-items: top;
    gap: 2rem;
    img {
        width: 100%;
        object-fit: contain;
    }

`;

export default function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { Product: product } = data;
  return (
    <ProductStyles>
        <Head>
            <title>Product | {product.name} </title>
        </Head>
      <img src={product.photo.image.publicUrlTransformed} alt={product.name} />
      <div className="details">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
      </div>
    </ProductStyles>
  );
}
