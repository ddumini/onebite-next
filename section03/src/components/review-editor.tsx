import styles from './review-editor.module.css';
import { createReviewAction } from '@/actions/create-review.action';

export default function ReviewEditor({ bookId }: { bookId: string }) {
  return (
    <section>
      <form className={styles.form_container} action={createReviewAction}>
        <input name='bookId' value={bookId} hidden readOnly />
        <textarea required name='content' placeholder='리뷰 내용' />
        <div className={styles.submit_container}>
          <input required type='text' name='author' placeholder='작성자' />
          <button type='submit'>작성하기</button>
        </div>
      </form>
    </section>
  );
}
