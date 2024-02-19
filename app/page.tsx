import { Card, CardContent } from "@/components/ui/card";
import { simpleBlogCard } from "./lib/interface";
import { client, urlFor } from "./lib/sanity";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getData() {
  const query = `*[_type == 'blog']
  {
    title,
    smallDescription,
    'currentSlug' : slug.current ,  
    titleImage,
  }`;

  const data = await client.fetch(query);

  return data;
}

export default async function Home() {
  const data: simpleBlogCard[] = await getData();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 mt-5 gap-5">
      {data.map((post, id) => (
        <Card key={id}>
          <Image
            src={urlFor(post.titleImage).url()}
            alt="image"
            width={500}
            height={500}
            className="rounded-t-lg h-[230px] object-cover"
          />
          <CardContent>
            <h3 className="text-xl pt-3 line-clamp-2 font-bold">
              {post.title}
            </h3>
            <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-400">
              {post.smallDescription}
            </p>
            <Button asChild className="w-full mt-7 font-black">
              <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
