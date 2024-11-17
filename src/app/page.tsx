
import { Star } from 'lucide-react';
import Link from 'next/link';

export default async function Home() {

  return (
    <section className="max-w-lg mx-auto text-center mt-36">
      <div className="text-gray-600">
        <p className=' flex items-center justify-center gap-1'>
        <Star />
        <Star />
        <Star />
        <Star />
        <Star />
        </p>
        <p className="mt-2">Loved by 100,000+ creators</p>
      </div>
      <h1 className="text-6xl font-bold mt-4">
        Fund your<br/>
        creative work
      </h1>
      <h2 className="mt-4 mb-8">
        Accept support for your work.<br/>
        It is easier than you think.
      </h2>
      <Link href={`/bhagesh`} className="bg-yellow-300 px-8 py-4 font-bold rounded-full">
        Start my page
      </Link>
    </section>
  );
}