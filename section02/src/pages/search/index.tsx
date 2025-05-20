import { useRouter } from "next/router";
export default function Page() {
  const router = useRouter();
  const { q } = router.query;

  console.log(router)
  return <h1>{q}</h1>;
}
