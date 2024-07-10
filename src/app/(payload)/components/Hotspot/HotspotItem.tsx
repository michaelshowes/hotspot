'use client';

import { Button } from '@payloadcms/ui/elements';
import { useFormFields } from '@payloadcms/ui/forms/Form';
import HotspotDescriptionField from './HotspotDescriptionField';
import { HotspotProps } from '@/payload/types';
import HotspotMarker from './HotspotMarker';
import HotspotTitleField from './HotspotTitleField';

type Props = {
  hotspot?: HotspotProps;
  index?: number;
  rowId: string;
};

export default function HotspotItem({ hotspot, index, rowId }: Props) {
  const field = useFormFields(([fields, dispatch]) => {
    return { fields, dispatch };
  });

  /**
   * Saves the hotspot to the form state.
   * @returns void
   */
  function saveHotspot() {
    field.dispatch({
      type: 'UPDATE',
      value: false,
      path: `hotspots.${index}.isEditing`
    });
  }

  /**
   * Sets the hotspot to editing mode.
   * @returns void
   */
  function editHotspot() {
    field.dispatch({
      type: 'UPDATE',
      value: true,
      path: `hotspots.${index}.isEditing`
    });
  }

  /**
   * Removes the row from the form state.
   * @returns void
   */
  function removeRow() {
    if (!index) return;

    field.dispatch({
      type: 'REMOVE_ROW',
      path: `hotspots`,
      rowIndex: index
    });
  }

  return (
    <div>
      <div className={'flex items-center gap-3'}>
        <HotspotMarker
          hotspot={hotspot!}
          index={index!}
          rowId={rowId}
        />
        <div
          className={'flex flex-col gap-3'}
          style={{
            flexDirection: hotspot?.isEditing || !hotspot ? 'row' : 'column'
          }}
        >
          <HotspotTitleField
            hotspot={hotspot}
            index={index}
          />
          <HotspotDescriptionField
            hotspot={hotspot}
            index={index}
          />
        </div>
        {!hotspot || hotspot.isEditing ? (
          <Button
            size={'small'}
            onClick={saveHotspot}
          >
            Save
          </Button>
        ) : (
          <Button
            size={'small'}
            onClick={editHotspot}
          >
            Edit
          </Button>
        )}

        <Button
          size={'small'}
          onClick={removeRow}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
