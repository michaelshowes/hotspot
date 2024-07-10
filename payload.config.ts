import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor } from '@payloadcms/richtext-lexical'; // editor-import
import path from 'path';
import { buildConfig } from 'payload/config';
// import sharp from 'sharp';
import { fileURLToPath } from 'url';

import { Media } from '@/app/(payload)/collections/Media';
import { Pages } from '@/app/(payload)/collections/Pages';
import { Products } from '@/app/(payload)/collections/Products';
import { Users } from '@/app/(payload)/collections/Users';
import '@/styles/globals.scss';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug
  },
  collections: [Pages, Products, Media, Users],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts')
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI as string
  }),
  async onInit(payload) {
    const existingUsers = await payload.find({
      collection: 'users',
      limit: 1
    });

    if (existingUsers.docs.length === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email: 'michael.showes@gmail.com',
          password: 'admin'
        }
      });
    }
  }
  // Sharp is now an optional dependency -
  // if you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.

  // This is temporary - we may make an adapter pattern
  // for this before reaching 3.0 stable

  // sharp
});
