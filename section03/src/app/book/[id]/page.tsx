import style from "./page.module.css";
import { BookData, ReviewData } from "@/types";
import NotFound from "@/app/not-found";
import ReviewItem from '@/components/review-item';
import ReviewEditor from '@/components/review-editor';

// export const dynamicParams = false;
// 아래 명시된 파라미터 값만 생성되고 나머지는 404 처리됨

export function generateStaticParams() {
  return [{id: '1'}, {id: '2'}, {id: '3'}];
}

async function BookDetail({ bookId }: { bookId: string }) {
const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`);
if (!response.ok) {
  if (response.status === 404) {
    return <NotFound />;
  }
  return <div>오류가 발생했습니다...</div>;
}
const book: BookData = await response.json();
const { title, subTitle, description, author, publisher, coverImgUrl } = book;

return (
  <section>
    <div className={style.cover_img_container} style={{ backgroundImage: `url('${coverImgUrl}')` }}>
      <img src={coverImgUrl} />
    </div>
    <div className={style.title}>{title}</div>
    <div className={style.subTitle}>{subTitle}</div>
    <div className={style.author}>
      {author} | {publisher}
    </div>
    <div className={style.description}>{description}</div>
  </section>
);
}

async function ReviewList({bookId}: {bookId: string}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`);
  if (!response.ok) {
    throw new Error(`Review fetch failed: ${response.statusText}`);
  }
  const reviews: ReviewData[] = await response.json();
  return <section>
    {reviews.map((review: ReviewData) => (
      <ReviewItem key={`review-item-${review.id}`} {...review} />
    ))}
  </section>
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  return (
    <div className={style.container}>
      <BookDetail bookId={id} />
      <ReviewEditor bookId={id} />
      <ReviewList bookId={id} />
    </div>
  );
}
