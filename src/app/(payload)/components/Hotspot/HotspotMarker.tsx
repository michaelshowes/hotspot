import { HotspotProps } from '../../types';

type Props = {
  hotspot: HotspotProps;
  index: number;
  rowId?: string;
};

export default function HotspotMarker({ hotspot, index, rowId }: Props) {
  return (
    <div
      id={rowId}
      className={
        'flex h-8 w-8 items-center justify-center rounded-full border-2 bg-black text-xl font-bold text-white'
      }
      style={{
        borderColor: hotspot?.isEditing || !hotspot ? 'red' : 'white',
        backgroundColor: hotspot?.isEditing || !hotspot ? 'red' : 'black'
      }}
    >
      {index + 1}
    </div>
  );
}
