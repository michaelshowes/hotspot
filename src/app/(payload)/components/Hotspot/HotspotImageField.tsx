'use client';

import { useForm, useFormFields } from '@payloadcms/ui/forms/Form';
import { useField } from '@payloadcms/ui/forms/useField';
import Image from 'next/image';
import { Media } from 'payload-types';
import { useEffect, useState } from 'react';
import { HotspotProps } from '@/payload/types';
import HotspotMarker from './HotspotMarker';
import Draggable from '../Draggable';

export default function HotspotImageField() {
  const form = useForm();
  const formData = form.getData();
  const [image, setImage] = useState<Media | null>(null);
  const { value } = useField<string>({ path: 'hotspotImage' });
  const hotspots: HotspotProps[] = formData.hotspots;
  const field = useFormFields(([fields, dispatch]) => {
    return { fields, dispatch };
  });
  const rows = field.fields.hotspots.rows;

  useEffect(() => {
    const fetchImage = async () => {
      const res = await fetch(`http://localhost:3000/api/media`);
      const data = await res.json();
      const foundImage = data.docs.find((image: Media) => image.id === value);
      setImage(foundImage);
    };

    fetchImage();
  }, [value]);

  if (!image) return null;

  return (
    <div className={'relative max-w-[500px]'}>
      <div className={'pointer-events-none relative select-none'}>
        <Image
          src={image.url!}
          alt={image.alt || ''}
          width={image.width!}
          height={image.height!}
        />
      </div>
      {rows?.map((row, index) => {
        if (row) {
          return (
            <Draggable
              key={row.id}
              data={hotspots[index]}
              rowId={row.id}
              index={index}
            >
              <HotspotMarker
                hotspot={hotspots[index]}
                index={index}
                rowId={row.id}
              />
            </Draggable>
          );
        }
      })}
    </div>
  );
}
