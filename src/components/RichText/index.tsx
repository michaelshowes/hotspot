import { Node } from '@/app/(payload)/types';
import Serializer from './Serializer';

export default function RichText({
  content,
  className
}: {
  content: Node[];
  className?: string;
}) {
  return (
    <div className={'first:mt-0 last:mb-0'}>
      <Serializer content={content} />
    </div>
  );
}
