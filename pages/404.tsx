import { useRouter } from "next/router";
import { useEffect } from "react";

const NotFoundPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathname = window.location.pathname;
      router.replace(`/${pathname}`);
    }
  }, []);

  return <p>Redirecting...</p>;
};

export default NotFoundPage;
