import { useMutation } from '@apollo/client'
import { DELETE_PRODUCT_MUTATION } from '../graphql-queries/mutations/deleteProduct';

function update(cache, payload) {
    cache.evict(cache.identify(payload.data.deleteProduct))
}

export default function DeleteProduct({ id, children }) {
    const [deleteProduct, { error, loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
        variables: { id },
        update
    })
    return (
        <button type="button" disabled={loading} onClick={() => {
            if (confirm('Are you sure you want to delete this item?')) {
                deleteProduct().catch(err => alert(err.message));
            }
        }}>{ children }</button>
    )
}
