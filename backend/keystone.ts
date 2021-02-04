import { ProductImage } from './schemas/ProductImage';
import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth'
import {withItemData, statelessSessions } from '@keystone-next/keystone/session'

import { Product } from './schemas/Product';
import { User } from './schemas/User';

const databaseURL = process.env.DATABASE_URL;

const sessionConfig = {
    maxAge: 60 * 60 * 24 * 360,
    secret: process.env.COOKIE_SECRET
}

const { withAuth } = createAuth({
    listKey: 'User',
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
        fields: ['name', 'email', 'password']
    }
})

export default withAuth(config({
    server: {
        cors: {
            origin: [process.env.FRONTEND_URL],
            credentials: true
        }
    },
    db: {
        adapter: 'mongoose',
        url: databaseURL,

    },
    lists: createSchema({
        User,
        Product,
        ProductImage
    }),
    ui: {
        isAccessAllowed: ({ session }) => {
            console.log(session)
            return session?.data
        }
    },
    session: withItemData(statelessSessions(sessionConfig), {
        User: `id`
    })
}));