export default async function Page({searchParams} : {searchParams : Promise<{q : string}>}) {
  const {q} = await searchParams;
  return <div>검색 페이지: {q}</div>;
}
