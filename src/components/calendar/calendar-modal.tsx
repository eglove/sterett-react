import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";

import type { CalendarComponentEvent } from "../../routes/calendar.tsx";

import { CalendarModalContent } from "./calendar-modal-content.tsx";

type CalendarModalProperties = {
  readonly isOpen: boolean;
  readonly onOpenChange: () => void;
  readonly selectedEvent: CalendarComponentEvent;
};

export function CalendarModal({
  isOpen,
  onOpenChange,
  selectedEvent,
}: CalendarModalProperties) {
  return (
    <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => {
          return (
            <>
              <ModalHeader>{selectedEvent.title}</ModalHeader>
              <ModalBody>
                <CalendarModalContent selectedEvent={selectedEvent} />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          );
        }}
      </ModalContent>
    </Modal>
  );
}