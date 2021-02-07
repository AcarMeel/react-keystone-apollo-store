import { useMutation, useQuery } from "@apollo/client";
import DisplayError from "./ErrorMessage";
import useForm from "../lib/useForm";
import Form from "./styles/Form";
import Router from "next/router";
import { SINGLE_PRODUCT_QUERY } from '../graphql-queries/queries/singleProduct'
import { UPDATE_PRODUCT_MUTATION  } from '../graphql-queries/mutations/updateProduct'


export default function UpdateProduct({ id }) {
  // Get Single Product
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });

  // Mutation
  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);
  // form hook
  const { inputs, handleChange } = useForm({
    name: data?.Product?.name,
    description: data?.Product?.description,
    price: data?.Product?.price,
  });
  if (loading) return <p>Loading Product Information...</p>;
  if (error) return <DisplayError error={error} />;
  if (data?.Product) {
    return (
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await updateProduct({
            variables: {
              id,
              ...inputs,
            },
          });
          Router.push({
            pathname: `/product/${res.data.updateProduct.id}`,
          });
        }}
      >
        <DisplayError error={updateError} />
        <fieldset disabled={updateLoading} aria-busy={updateLoading}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
          />
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={inputs.description}
            onChange={handleChange}
          ></textarea>
          <button type="submit">✏️ Update Product</button>
        </fieldset>
      </Form>
    );
  }
}
