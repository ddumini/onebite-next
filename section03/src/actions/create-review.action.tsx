'use server';

// import { revalidatePath, revalidateTag } from "next/cache";
import { revalidateTag } from 'next/cache';

export async function createReviewAction(formData: FormData) {
  const bookId = formData.get('bookId')?.toString();
  const content = formData.get('content')?.toString();
  const author = formData.get('author')?.toString();

  if (!bookId || !content || !author) {
    return;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`, {
      method: 'POST',
      body: JSON.stringify({ bookId, content, author }),
    });
    console.log(response);
    // 1. 특정 주소의 해당하는 페이지만 재검증
    // revalidatePath(`/book/${bookId}`);
    // 2. 특정 경로의 모든 동적 페이직를 재검증
    // revalidatePath('/book/[id]', 'page');
    // 3. 특정 레이아웃을 갖는 모든 페이지 재검증
    // revalidatePath('/(with-searchbar)', 'layout');
    // 4. 모든 페이지 재검증
    // revalidatePath('/', 'layout');
    // 5. 태그 기준, 데이터 캐시 재검증 (이 태그를 가진 데이터 캐시가 재검증됨) - 권장
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`, {
    //   next: { tags: [`review-${bookId}`] },
    // });
    revalidateTag(`review-${bookId}`);
  } catch (err) {
    console.error(err);
    return;
  }
}
