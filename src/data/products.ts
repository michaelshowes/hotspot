import { getPayload } from 'payload';
import configPromise from '@payload-config';

export const getProducts = async () => {
  const payload = await getPayload({ config: configPromise });

  const data = await payload.find({
    collection: 'products'
  });

  return data;
};

export const getProductById = async (id: string) => {
  const payload = await getPayload({ config: configPromise });

  const data = await payload.find({
    collection: 'products',
    where: {
      id: {
        equals: id
      }
    }
  });

  return data;
};
