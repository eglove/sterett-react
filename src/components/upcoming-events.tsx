import type { PortableTextBlock } from "@portabletext/types";

import { Accordion, AccordionItem } from "@nextui-org/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import isNil from "lodash/isNil";
import map from "lodash/map";

import { indexRouteQueries } from "../routes/home.tsx";
import { eventRangeFormat } from "../util/event-range-format.ts";
import { AddToCalendar } from "./add-to-calendar.tsx";
import { SanityContent } from "./sanity/sanity-content.tsx";

export function UpcomingEvents() {
  const { data: events } = useSuspenseQuery(indexRouteQueries.events);

  return (
    <Accordion
      className="grid place-items-center border-2"
    >
      {map(events, (event) => {
        return (
          <AccordionItem
            classNames={{
              content: "p-0",
              trigger: "px-2 py-0",
            }}
            title={
              <p>
                <strong>
                  {event.title}
                </strong>
                <br />
                <span>
                  {eventRangeFormat(event.startsAt, event.endsAt)}
                </span>
              </p>
            }
            aria-label={event.title}
            className="prose w-full"
            key={event._id}
          >
            <AddToCalendar
              buttonProps={{
                className: "bg-sky-600 text-white mb-4",
                size: "sm",
              }}
              description={event.description as unknown as PortableTextBlock}
              end={event.endsAt}
              start={event.startsAt}
              title={event.title}
            />
            {!isNil(event.description) &&
              <SanityContent
                styleNames="mb-2"
                value={event.description}
              />}
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
