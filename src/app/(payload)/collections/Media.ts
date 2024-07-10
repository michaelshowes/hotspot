import { CollectionConfig } from 'payload/types';

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 100,
        height: 100
      },
      {
        name: 'small',
        width: 320,
        height: 320
      },
      {
        name: 'medium',
        width: 640,
        height: 640
      },
      {
        name: 'large',
        width: 1024,
        height: 1024
      }
    ],
    mimeTypes: ['image/*']
  },
  fields: [
    {
      name: 'alt',
      type: 'text'
    }
  ]
};
