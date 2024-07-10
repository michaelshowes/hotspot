import { CollectionConfig } from 'payload/types';
import HotspotImageField from '../components/Hotspot/HotspotImageField';
import HotspotsField from '../components/Hotspot/HotspotsField';

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'productName',
    defaultColumns: ['productName']
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Product Info',
          description: 'Product Information',
          fields: [
            {
              name: 'productName',
              label: 'Product Name',
              type: 'text',
              required: true
            },
            {
              name: 'description',
              label: 'Description',
              type: 'textarea'
            }
          ]
        },
        {
          label: 'Product Images',
          description: 'Product Images',
          fields: [
            {
              name: 'hotspotImage',
              label: 'Hotspot Image',
              type: 'upload',
              // hidden: true,
              relationTo: 'media',
              filterOptions: {
                mimeType: {
                  contains: 'image'
                }
              }
            },
            {
              name: 'images',
              label: 'Images',
              type: 'array',
              fields: [
                {
                  name: 'image',
                  label: 'Image',
                  type: 'upload',
                  relationTo: 'media'
                }
              ]
            }
          ]
        },
        {
          label: 'Hotspots',
          fields: [
            {
              name: 'hotspotImage',
              label: 'Hotspot Image',
              type: 'ui',
              admin: {
                components: {
                  Field: HotspotImageField
                }
              }
            },
            {
              name: 'hotspots',
              label: 'Hotspots',
              type: 'array',
              maxRows: 4,
              admin: {
                description: 'Add up to 4 hotspots to the image.',
                initCollapsed: true,
                components: {
                  Field: HotspotsField
                }
              },
              fields: [
                {
                  name: 'title',
                  label: 'Title',
                  type: 'text'
                },
                {
                  name: 'description',
                  label: 'Description',
                  type: 'text'
                },
                {
                  name: 'x',
                  type: 'number'
                },
                {
                  name: 'y',
                  type: 'number'
                },
                {
                  name: 'isEditing',
                  type: 'checkbox',
                  defaultValue: false
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
