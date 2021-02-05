import useForm from "../lib/useForm";
import Form from "./styles/Form";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import DisplayError from "./ErrorMessage";
import { ALL_PRODUCTS_QUERY } from './Products';
import Router from 'next/router';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      name
      description
      price
    }
  }
`;

export default function CreateProduct() {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    image: "",
    name: "",
    price: 0,
    description: "",
  });

  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{
          query: ALL_PRODUCTS_QUERY
      }]
    }
  );

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await createProduct();
        clearForm();
        Router.push({
            pathname: `/product/${res.data.createProduct.id}`
        })
      }}
    >
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">Image</label>
        <input
          required
          type="file"
          id="image"
          name="image"
          onChange={handleChange}
        />
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
        <button type="submit">+ Add Product</button>
      </fieldset>
    </Form>
  );
}
