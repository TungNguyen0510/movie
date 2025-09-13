import Header from "./header";
import Footer from "./footer";
import BackToTopButton from "./back-to-top-btn";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen items-center w-full">
      <Header />
      <main className="flex-1 w-full mt-16">{children}</main>
      <Footer />
      <BackToTopButton />
    </div>
  );
}
