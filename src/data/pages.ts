import { getPayload } from 'payload';
import configPromise from '@payload-config';

export const getPages = async () => {
  const payload = await getPayload({ config: configPromise });

  const data = await payload.find({
    collection: 'pages'
  });

  return data;
};

export const getPageBySlug = async (slug: string) => {
  const payload = await getPayload({ config: configPromise });

  const data = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug
      }
    }
  });

  return data;
};
