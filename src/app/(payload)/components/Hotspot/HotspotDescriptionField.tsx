'use client';

import { TextInput } from '@payloadcms/ui/fields/Text';
import { useFormFields } from '@payloadcms/ui/forms/Form';
import { SetStateAction, useState } from 'react';
import { HotspotProps } from '@/payload/types';

type Props = {
  hotspot?: HotspotProps;
  index?: number;
};

export default function HotspotDescriptionField({ hotspot, index }: Props) {
  const { description, isEditing } = hotspot || {};
  const [value, setValue] = useState(description);
  const field = useFormFields(([fields, dispatch]) => {
    return { fields, dispatch };
  });

  /**
   * Updates the description in the form state and the local state.
   * @param e - The new description value.
   * @returns void
   */
  function updateDescription(e: SetStateAction<string | undefined>) {
    // updates the local state
    setValue(e);

    // updates the description in the form state
    field.dispatch({
      type: 'UPDATE',
      value: e,
      path: `hotspots.${index}.description`
    });

    field.dispatch({
      type: 'UPDATE',
      value: true,
      path: `hotspots.${index}.isEditing`
    });
  }

  // if there is no description or the field is being edited, show the input field
  if (!description || isEditing) {
    return (
      <div className={'flex flex-col'}>
        <TextInput
          onChange={(e) => updateDescription(e.target.value)}
          value={value}
          placeholder={'Place the item description here.'}
        />
      </div>
    );
  }

  // if there is a description and the field is not being edited, show the description
  return <div>{description}</div>;
}
