import fetchOneBook from '@/lib/fetch-one-book';
import styles from './[id].module.css';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';

export const getStaticPaths = () => {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }, { params: { id: '3' } }],
    fallback: 'blocking',
    // fallback: 대체, 대비책, 보험 path값이 존재하지 않을 때 대비책으로 사용.
    // false : 404 페이지 반환
    // 'blocking' : 즉시 생성 (ssr처럼) 새로 신규 데이터가 계속 추가되는 경우
    // true : Props 없는 페이지 반환, props 계산 후 Props만 따로 반환
  };
}

export const getStaticProps = async (context : GetStaticPropsContext) => {

  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));
  return {
    props: {
      book,
    },
  }
}

export default function Page({book} : InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  if (!book) {
    return <div>문제가 발생했습니다 다시 시도하세요</div>;
  }
  const { title, subTitle, description, author, publisher, coverImgUrl } = book;
  return (
    <div className={styles.container}>
      <div className={styles.cover_img_container} style={{ backgroundImage: `url(${coverImgUrl})` }}>
        <img src={coverImgUrl} />
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.subTitle}>{subTitle}</div>
      <div className={styles.author}>{author} | {publisher}</div>
      <div className={styles.description}>{description}</div>
    </div>
  );
}
