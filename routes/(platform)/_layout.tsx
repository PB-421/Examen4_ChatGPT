import { PageProps } from "$fresh/server.ts";
import Footer from "../../components/footer.tsx";
import Header from "../../components/header.tsx";

export default function Layout({ Component }: PageProps) {
  // do something with state here
  return (
    <div>
        <Header />
        <Component />
        <Footer />
    </div>
  );
}