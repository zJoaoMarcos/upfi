import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  const handleCloseModal = (): void => {
    onClose();
  };

  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered>
      <ModalOverlay />

      <ModalContent w="auto" maxW="900px" maxH="600px">
        <ModalBody m="0" p="0" background="pGray.900">
          <Image w="auto" h="35rem" m="0" objectFit="cover" src={imgUrl} />
        </ModalBody>

        <ModalFooter w="full" bgColor="pGray.800" borderBottomRadius="md">
          <Link href={imgUrl} color="pGray.50" target="_blank" mr="auto">
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
