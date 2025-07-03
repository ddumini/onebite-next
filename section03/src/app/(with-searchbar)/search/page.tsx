import BookItem from '@/components/book-item';
import BookListSkeleton from '@/components/skeleton/book-list-skeleton';
import { BookData } from '@/types';
import { delay } from '@/util/delay';
import { Suspense } from 'react';

async function SearchResult({ q }: { q: string }) {
  await delay(1500);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`, {
    cache: 'force-cache',
  });

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default function Page({
  searchParams,
}: {
  searchParams: {
    q?: string;
  };
}) {
  return (
    <Suspense key={searchParams.q || ""} fallback={<>
      <BookListSkeleton count={3} />
    </>}>
      {/* streaming 하도록 설정, 비동기 처리 중 대기 중일 때 보여줄 컴포넌트 */}
      {/* 키 값을 주면 쿼리스트링 값만 변경될 때에도 로딩 상태로 돌아가게 설정(searchParams.q 값이 변경될 때마다) */}
      <SearchResult q={searchParams.q || ""} />
    </Suspense>
  );
}
