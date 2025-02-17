import React, { ElementType, forwardRef, Fragment } from 'react';

import { Image } from './Image';
import { Props } from './types';
import { Video } from './Video';

const Media = forwardRef<
  HTMLDivElement | HTMLImageElement | HTMLVideoElement,
  Props
>(function MediaComponent(props, ref) {
  const { className, resource, htmlElement = 'div' } = props;

  const isVideo =
    typeof resource !== 'string' && resource?.mimeType?.includes('video');
  const Tag = (htmlElement as ElementType) || Fragment;

  return (
    <Tag
      ref={ref}
      {...(htmlElement !== null ? { className } : {})}
    >
      {isVideo ? (
        <Video {...props} />
      ) : (
        <Image {...props} /> // eslint-disable-line
      )}
    </Tag>
  );
});

Media.displayName = 'Media';

export { Media };
