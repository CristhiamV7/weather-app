import Header from '@/components/header/header';
import Search from '@/components/search/search';
import dynamic from 'next/dynamic';

const Weather = dynamic(() => import('@/components/weather/weather'));

export default async function Home(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';

  return (
    <>
      <Header />
      <main className="flex flex-col items-center px-16 py-5">
        <Search placeholder="Enter the city here" />
        <Weather query={query} />
      </main>
    </>
  );
}