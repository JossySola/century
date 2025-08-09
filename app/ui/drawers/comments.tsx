import { Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, useDisclosure } from "@heroui/react";

export default function Comments({ num_comments }: {
    num_comments: number,
}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <>
        <Button onPress={onOpen} isDisabled={ num_comments === 0 } size="lg" className="w-full" color="danger"><span className="text-lg">Read comments</span></Button>
        <Drawer isOpen={isOpen} onOpenChange={onOpenChange} placement="bottom" size="lg">
            <DrawerContent>
                {
                    onClose => (
                        <>
                        <DrawerHeader></DrawerHeader>
                        <DrawerBody></DrawerBody>
                        <DrawerFooter></DrawerFooter>
                        </>
                    )
                }
            </DrawerContent>
        </Drawer>
        </>
    )
}