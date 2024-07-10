import { useFormFields } from '@payloadcms/ui/forms/Form';
import { useEffect, useRef } from 'react';

/**
 * Hook for dragging elements within Payload UI
 * @param id - id of the element to drag
 * @param index - index of the element in the array
 * @returns void
 */
export function useDrag(id: string, index: number): void {
  const isClicked = useRef<boolean>(false);
  const field = useFormFields(([fields, dispatch]) => {
    return { fields, dispatch };
  });

  useEffect(() => {
    const target = document.getElementById(id);
    if (!target) throw new Error('Element with given id does not exist');

    const container = target.parentElement;
    if (!container) throw new Error('Container element does not exist');

    const setCoords = (e: MouseEvent) => {
      const containerRect = container.getBoundingClientRect();
      const x = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      const y = ((e.clientY - containerRect.top) / containerRect.height) * 100;
      return { x, y };
    };

    const onMouseDown = () => {
      isClicked.current = true;
    };

    const onMouseUp = (e: MouseEvent) => {
      const { x, y } = setCoords(e);

      field.dispatch({
        type: 'UPDATE',
        value: x,
        path: `hotspots.${index}.x`
      });

      field.dispatch({
        type: 'UPDATE',
        value: y,
        path: `hotspots.${index}.y`
      });

      isClicked.current = false;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isClicked.current) return;

      const { x, y } = setCoords(e);
      const dragItemRect = target.getBoundingClientRect();
      const dragItemCenterX = dragItemRect.width / 2;
      const dragItemCenterY = dragItemRect.height / 2;

      if (x < 0 || x > 100 || y < 0 || y > 100) return;

      target.style.left = `calc(${x}% - ${dragItemCenterX}px)`;
      target.style.top = `calc(${y}% - ${dragItemCenterY}px)`;
    };

    target.addEventListener('mousedown', onMouseDown);
    target.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mousemove', onMouseMove);

    const cleanup = () => {
      target.removeEventListener('mousedown', onMouseDown);
      target.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseUp);
    };

    return cleanup;
  }, [id, field, index]);
}
