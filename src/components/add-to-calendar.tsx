import type { PortableTextBlock } from "@portabletext/types";
import type { CalendarEvent } from "calendar-link";

import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { toPlainText } from "@portabletext/react";
import { google, ics, office365, outlook, yahoo } from "calendar-link";
import isNil from "lodash/isNil";
import { useCallback } from "react";

import { openNewTab } from "../util/url.ts";

type AddToCalendarProperties = {
  readonly buttonProps?: Parameters<typeof Button>[0];
  readonly classNames?: { button?: string };
  readonly description?: PortableTextBlock;
} & Readonly<Omit<CalendarEvent, "description">>;

// eslint-disable-next-line max-lines-per-function
export function AddToCalendar({
  buttonProps,
  classNames,
  description,
  ...rest
}: AddToCalendarProperties) {
  const handlePress = useCallback(
    (type: "google" | "ics" | "office365" | "outlook" | "yahoo") => {
      const data = {
        ...rest,
        description: isNil(description)
          ? ""
          : toPlainText(description),
      };

      // eslint-disable-next-line max-statements
      return () => {
        switch (type) {
          case "google": {
            openNewTab(google(data));
            break;
          }
          case "outlook": {
            openNewTab(outlook(data));
            break;
          }
          case "office365": {
            openNewTab(office365(data));
            break;
          }
          case "yahoo": {
            openNewTab(yahoo(data));
            break;
          }
          case "ics": {
            openNewTab(ics(data));
            break;
          }
        }
      };
    },
    [description, rest],
  );

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button {...buttonProps}>
          Add To Calendar
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Calendar Options"
        selectionMode="single"
      >
        <DropdownItem
          key="ics"
          onPress={handlePress("ics")}
        >
          Apple / ICS
        </DropdownItem>
        <DropdownItem
          key="google"
          onPress={handlePress("google")}
        >
          Google
        </DropdownItem>
        <DropdownItem
          key="outlook"
          onPress={handlePress("outlook")}
        >
          Outlook
        </DropdownItem>
        <DropdownItem
          key="office365"
          onPress={handlePress("office365")}
        >
          Office 365
        </DropdownItem>
        <DropdownItem
          key="yahoo"
          onPress={handlePress("yahoo")}
        >
          Yahoo
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
