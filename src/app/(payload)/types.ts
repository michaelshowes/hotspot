export type HotspotProps = {
  id: string;
  x?: number;
  y?: number;
  title: string;
  description: string;
  isEditing?: boolean;
};

export type Node = {
  type: string;
  value?: {
    url: string;
    alt: string;
  };
  children?: Node[];
  url?: string;
  [key: string]: unknown;
  newTab?: boolean;
};

export type ParagraphType = {
  children: {
    detail: number;
    format: number;
    mode: string;
    style: string;
    text: string;
    type: string;
    version: number;
  }[];
  direction: string;
  format: string;
  indent: number;
  type: string;
  version: number;
};
