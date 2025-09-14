import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";
import { useCategory } from "@/lib/queries/useCategory";
import { useNation } from "@/lib/queries/useNation";
import { LIST_CATEGORY } from "@/constants";
import { useState } from "react";

export default function HeaderNavigationDialog() {
  const router = useRouter();

  const { data: categories } = useCategory();

  const { data: nations } = useNation();

  const currentYear = new Date().getFullYear() + 1;
  const yearOptions = Array.from(
    { length: currentYear - 2002 },
    (_, i) => currentYear - i
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer block lg:hidden">
          <Menu className="size-5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-screen overflow-y-auto max-w-screen rounded-none">
        <DialogTitle></DialogTitle>

        <div className="space-y-4">
          <Label className="text-base font-semibold">Thể loại</Label>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
            {categories?.map((category) => (
              <Button
                key={category._id}
                variant="outline"
                size="sm"
                onClick={() => {
                  router.push(`/the-loai/${category.slug}?page=1`);
                  setIsDialogOpen(false);
                }}
                className="text-xs"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <Label className="text-base font-semibold">Quốc gia</Label>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 xl:grid-cols-8 gap-2">
            {nations?.map((nation) => (
              <Button
                key={nation._id}
                variant="outline"
                size="sm"
                onClick={() => {
                  router.push(`/quoc-gia/${nation.slug}?page=1`);
                  setIsDialogOpen(false);
                }}
                className="text-xs"
              >
                {nation.name}
              </Button>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <Label className="text-base font-semibold">Danh sách</Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-2">
            {LIST_CATEGORY?.map((category) => (
              <Button
                key={category._id}
                variant="outline"
                size="sm"
                onClick={() => {
                  router.push(`/danh-sach/${category.slug}?page=1`);
                  setIsDialogOpen(false);
                }}
                className="text-xs"
              >
                {category.name}
              </Button>
            ))}
          </div>
          <div className="space-y-4">
            <Label className="text-base font-semibold">Năm phát hành</Label>
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-2">
              {yearOptions.map((year) => (
                <Button
                  key={year}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    router.push(`/nam-phat-hanh/${year}?page=1`);
                    setIsDialogOpen(false);
                  }}
                  className="text-xs"
                >
                  {year}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
