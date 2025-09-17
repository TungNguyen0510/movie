import Header from "./header";
import Footer from "./footer";
import BackToTopButton from "./back-to-top-btn";
import MoviePopup from "./movie-popup";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen items-center w-full">
      <Header />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
      <BackToTopButton />
      <MoviePopup />
    </div>
  );
}
