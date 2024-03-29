import { fullBlog } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "@portabletext/react";
import { url } from "inspector";
import Image from "next/image";

export const revalidate = 30; // revalidate at most every 30 sec

async function getData(slug: string) {
  const quary = `*[_type == "blog" && slug.current == '${slug}']{'currentSlug' : slug.current,title,content,titleImage,}[0]`;

  const data = await client.fetch(quary);
  return data;
}

export default async function BlogArtical({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullBlog = await getData(params.slug);
  return (
    <div className="mt-8">
      <h1>
        <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
          Samsher Khan - Blog
        </span>
        <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-normal sm:text-4xl">
          {data.title}
        </span>
      </h1>
      <Image
        src={urlFor(data.titleImage).url()}
        alt="image"
        priority
        width={800}
        height={800}
        className="rounded-lg mt-8 mx-auto"
      />
      <div className="mt-16 prose prose-blue prose-lg dark:prose-invert  prose-li:marker:text-primary prose-li:text-gray-600">
        <PortableText value={data.content} />
      </div>
    </div>
  );
}
