import Image from 'next/image';
import { Media, Product } from 'payload-types';
import HotspotMarkers from './HotspotMarkers';

export default function Hotspot({ product }: { product: Product }) {
  const image = product.hotspotImage as Media;

  return (
    <section className={'flex'}>
      <div className={'flex flex-col gap-4'}>
        {product.hotspots?.map((hotspot, index) => (
          <div key={hotspot.id}>
            <h3>{hotspot.title}</h3>
            <p>{hotspot.description}</p>
          </div>
        ))}
      </div>
      <div className={'relative w-max'}>
        <div className={'max-w-[600px]'}>
          <Image
            src={image?.url!}
            alt={image?.alt || ''}
            width={image?.width!}
            height={image?.height!}
          />
        </div>
        <HotspotMarkers product={product} />
      </div>
    </section>
  );
}
