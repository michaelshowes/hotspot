import Hotspot from '@/components/Hotspot';
import { getPages } from '@/data/pages';
import { getProductById, getProducts } from '@/data/products';

export default async function ProductPage({
  params
}: {
  params: { id: string };
}) {
  const product = await getProductById(params.id);
  console.log(product);

  return <Hotspot product={product.docs[0]} />;
}
