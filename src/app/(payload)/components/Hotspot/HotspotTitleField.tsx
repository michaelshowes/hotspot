'use client';

import { TextInput } from '@payloadcms/ui/fields/Text';
import { useFormFields } from '@payloadcms/ui/forms/Form';
import { SetStateAction, useState } from 'react';
import { HotspotProps } from '@/payload/types';

type Props = {
  hotspot?: HotspotProps;
  index?: number;
};

export default function HotspotTitleField({ hotspot, index }: Props) {
  const { title, isEditing } = hotspot || {};
  const [value, setValue] = useState(title);
  const field = useFormFields(([fields, dispatch]) => {
    return { fields, dispatch };
  });

  /**
   * Updates the title in the form state and the local state.
   * @param e - The new title value.
   * @returns void
   */
  function updateTitle(e: SetStateAction<string | undefined>) {
    // updates the local state
    setValue(e);

    // updates the title in the form state
    field.dispatch({
      type: 'UPDATE',
      value: e,
      path: `hotspots.${index}.title`
    });

    field.dispatch({
      type: 'UPDATE',
      value: true,
      path: `hotspots.${index}.isEditing`
    });
  }

  // if there is no title or the field is being edited, show the input field
  if (!title || isEditing) {
    return (
      <div className={'flex flex-col'}>
        <TextInput
          onChange={(e) => updateTitle(e.target.value)}
          value={value}
          placeholder={'Place the item title here.'}
        />
      </div>
    );
  }

  // if there is a title and the field is not being edited, show the title
  return <div>{title}</div>;
}
