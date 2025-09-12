export default function Footer() {
  return (
    <div className="flex justify-center items-center w-full h-16">
      <p className="text-sm text-gray-500">
        Bản quyền © {new Date().getFullYear()} thuộc về TN Movie.
      </p>
    </div>
  );
}
