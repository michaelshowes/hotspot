import Hotspot from '@/components/Hotspot';
import { getPages } from '@/data/pages';
import { getProducts } from '@/data/products';
import Link from 'next/link';

export default async function HomePage() {
  const { docs: pages } = await getPages();
  const products = await getProducts();
  const product = products.docs[0];

  console.log(pages);

  return (
    <div>
      {/* <Hotspot product={product} /> */}
      {pages.map((page) => (
        <div key={page.id}>
          <Link href={`/${page.slug}`}>{page.title}</Link>
        </div>
      ))}
    </div>
  );
}
