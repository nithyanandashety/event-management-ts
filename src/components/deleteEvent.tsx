import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Trash2Icon } from "lucide-react"
import { Button } from "./ui/button"

export const DeleteEvent = ({deleteEvent, id}:{deleteEvent:(id:string)=> void, id:string}) => {
    return (
        <Dialog>
            <DialogTrigger asChild><Button size={'icon'} variant="destructive">
                <Trash2Icon />
            </Button></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. Are you sure you want to permanently
                        delete this file from our servers?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="submit"  onClick={() => deleteEvent(id)}>Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}
