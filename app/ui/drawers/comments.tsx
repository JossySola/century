import { Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, useDisclosure } from "@heroui/react";
import type { Listing, Thing } from "~/utils/types";

export default function Comments({ num_comments, comments }: {
    num_comments: number,
    comments?: Listing,
}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    return (
        <>
        <Button onPress={onOpen} isDisabled={ num_comments === 0 } size="lg" className="w-full p-2" color="danger"><span className="text-lg">Read comments</span></Button>
        <Drawer isOpen={isOpen} onOpenChange={onOpenChange} placement="bottom" size="lg">
            <DrawerContent>
                {
                    onClose => (
                        <>
                        <DrawerHeader></DrawerHeader>
                        <DrawerBody>
                            <section>

                            </section>
                        </DrawerBody>
                        <DrawerFooter>
                            <Button onPress={onClose}><span>Close</span></Button>
                        </DrawerFooter>
                        </>
                    )
                }
            </DrawerContent>
        </Drawer>
        </>
    )
}