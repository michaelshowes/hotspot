'use client';

import { Button } from '@payloadcms/ui/elements';
import { FieldDescription } from '@payloadcms/ui/forms/FieldDescription';
import { FieldLabel } from '@payloadcms/ui/forms/FieldLabel';
import { useForm, useFormFields } from '@payloadcms/ui/forms/Form';
import HotspotItem from './HotspotItem';
import { HotspotProps } from '@/payload/types';

type Props = {
  path: string;
  label: string;
  descriptionProps: {
    description: string;
  };
};

export default function HotspotsField({ label, descriptionProps }: Props) {
  const form = useForm();
  const formData = form.getData();
  const hotspots: HotspotProps[] = formData.hotspots;
  const field = useFormFields(([fields, dispatch]) => {
    return { fields, dispatch };
  });
  const rows = field.fields.hotspots.rows;

  /**
   * Adds a row to the form state.
   * @returns void
   */
  function addRow() {
    if (rows?.length! >= 4) return;
    field.dispatch({
      type: 'ADD_ROW',
      path: 'hotspots'
    });
  }

  return (
    <div>
      <FieldLabel label={label} />
      <FieldDescription description={descriptionProps.description} />
      {rows?.map((row, index) => (
        <HotspotItem
          key={row.id}
          hotspot={hotspots[index]}
          index={index}
          rowId={row.id}
        />
      ))}
      {rows?.length! < 4 && (
        <Button
          size={'small'}
          onClick={addRow}
        >
          Add Hotspot
        </Button>
      )}
    </div>
  );
}
