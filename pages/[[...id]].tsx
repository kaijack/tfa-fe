import { useRouter } from "next/router";
import Layout from "@/components/layout/Layout";

const CatchAllPage = () => {
  const router = useRouter();
  return (
    <Layout menu={[]} loading={false} menuName="404" onMenuClick={() => {}}>
      <h1>Page Not Found</h1>
      <p>Redirecting...</p>
    </Layout>
  );
};

export default CatchAllPage;
