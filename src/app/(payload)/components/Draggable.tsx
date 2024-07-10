import React from 'react';

import { useState } from 'react';
import { useDrag } from '../hooks/useDrag';
import { HotspotProps } from '@/payload/types';

type DraggableProps = {
  data?: HotspotProps;
  children: React.ReactNode;
  rowId: string;
  index: number;
};

export default function Draggable({
  children,
  data,
  rowId,
  index
}: DraggableProps) {
  const [isClicked, setIsClicked] = useState(false);
  useDrag(rowId, index);

  return (
    <div
      id={rowId}
      className={'absolute left-[50%] top-[50%] select-none'}
      style={{
        pointerEvents: data?.isEditing || !data ? 'auto' : 'none',
        cursor: isClicked ? 'grabbing' : 'grab',
        left: `calc(${data?.x}% - 13px)`,
        top: `calc(${data?.y}% - 13px)`
      }}
      onMouseDown={() => setIsClicked(true)}
      onMouseUp={() => setIsClicked(false)}
    >
      {children}
    </div>
  );
}
