import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormDonation from "./FormDonation";

export function DonateDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-sm bg-primary-100 border border-primary-90 rounded-2xl">
        <DialogHeader className="flex flex-col items-start justify-start text-neutral-base">
          <DialogTitle>Donate to</DialogTitle>
          <DialogDescription>This is campaign title</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <FormDonation />
        </div>
      </DialogContent>
    </Dialog>
  );
}
