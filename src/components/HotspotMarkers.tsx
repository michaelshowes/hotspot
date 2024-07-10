import { Product } from 'payload-types';

export default function HotspotMarker({ product }: { product: Product }) {
  return (
    <>
      {product.hotspots?.map((hotspot, index) => (
        <div
          key={hotspot?.id}
          id={hotspot?.id!}
          className={
            'absolute flex h-8 w-8 select-none items-center justify-center rounded-full border-2 border-white bg-black text-xl font-bold text-white'
          }
          style={{
            left: `calc(${hotspot?.x}% - 13px)`,
            top: `calc(${hotspot?.y}% - 13px)`
          }}
        >
          {index + 1}
        </div>
      ))}
    </>
  );
}
