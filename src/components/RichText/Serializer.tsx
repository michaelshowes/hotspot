import { Node } from '@/app/(payload)/types';
import Image from 'next/image';
import { ReactNode } from 'react';

export default function Serializer({ content }: { content: Node[] }) {
  return (
    <>
      {content.map((node, i) => {
        console.log(node);
        switch (node.type) {
          case 'paragraph':
            return <p key={i}>{node.children[0].text as ReactNode}</p>;
          case 'heading':
            const Heading = node.tag as keyof JSX.IntrinsicElements;
            return <Heading key={i}>{node.children[0].text}</Heading>;
          case 'upload':
            if (node.value.mimeType.includes('image')) {
              return (
                <Image
                  key={i}
                  src={node.value!.url}
                  alt={node.value!.alt}
                  width={node.value!.width}
                  height={node.value!.height}
                />
              );
            }
        }
      })}
    </>
  );
}
