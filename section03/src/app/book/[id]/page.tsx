export default async function Page({params} : {params : Promise<{id : string}>}) {
  const {id} = await params;
  return <div>도서 상세 페이지: {id}</div>;
}

