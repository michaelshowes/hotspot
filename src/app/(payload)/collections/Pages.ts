import { CollectionConfig } from 'payload/types';
import slugify from 'slugify';

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title']
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true
    },
    {
      name: 'content',
      label: 'Content',
      type: 'richText',
      required: true
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      hooks: {
        beforeValidate: [
          ({ data, value }) => {
            if (!value || value === '') {
              return slugify(data?.title, {
                lower: true,
                remove: /[*+~\/\\.()'"!?#\.,:@]/g
              });
            }
          }
        ]
      },
      admin: {
        position: 'sidebar'
      }
    }
  ]
};
