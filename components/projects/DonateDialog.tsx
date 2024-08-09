import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormDonation from "./FormDonation";

interface DonateDialogProps {
  campaignId: number;
  title: string;
}

export function DonateDialog({ campaignId, title }: DonateDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex w-full flex-row space-x-3 text-neutral-base z-10 bg-primary-100 border border-brand-base rounded-lg p-2">
          <p className="m-body-base">Donate Now</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-sm bg-primary-100 border border-primary-90 rounded-2xl">
        <DialogHeader className="flex flex-col items-start justify-start text-neutral-base">
          <DialogTitle>Donate to</DialogTitle>
          <DialogDescription>{title}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <FormDonation campaignId={campaignId} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
