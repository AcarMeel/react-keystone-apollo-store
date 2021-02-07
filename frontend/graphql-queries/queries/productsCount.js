import gql from 'graphql-tag'

export const PRODUCTS_COUNT_QUERY = gql`
    query PRODUCTS_COUNT_QUERY {
        _allProductsMeta {
            count
        }
    }
`;