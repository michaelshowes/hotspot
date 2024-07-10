import { Node } from '@/app/(payload)/types';
import RichText from '@/components/RichText';
import { getPageBySlug } from '@/data/pages';

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { docs } = await getPageBySlug(slug);
  const page = docs[0];
  const content = page.content.root.children;

  if (!content) return;

  return (
    <div>
      <h1>{page.title}</h1>
      <RichText content={content} />
      {/* {content.map((node, i) => (
        <div key={i}>
          {node.type === 'text' && <p>{node.text}</p>}
        </div>
      ))} */}
    </div>
  );
}
