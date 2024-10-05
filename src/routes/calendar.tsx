import type { TypedObject } from "@portabletext/types";

import { useDisclosure } from "@nextui-org/use-disclosure";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createRoute } from "@tanstack/react-router";
import isNil from "lodash/isNil.js";
import map from "lodash/map";
import { DateTime } from "luxon";
// eslint-disable-next-line depend/ban-dependencies
import moment from "moment";
import { useCallback, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { CalendarModal } from "../components/calendar/calendar-modal.tsx";
import { EmptyContent } from "../components/empty-content.tsx";
import { MainLayout } from "../components/layouts/main-layout.tsx";
import { rootRoute } from "../router/router.ts";
import { getCalendarEventsQueryOptions } from "../sanity/queries/get-calendar-events.ts";
import { AMERICA_CHICAGO } from "../util/date.ts";
import { getRouteQueries } from "../util/get-route-queries.ts";
import { setMeta } from "../util/set-meta.ts";

export const calendarRouteQueries = {
  calendarEvents: getCalendarEventsQueryOptions(),
};

export type CalendarComponentEvent = {
  description?: TypedObject | TypedObject[];
  end: Date;
  start: Date;
  title: string;
};

const localizer = momentLocalizer(moment);

export const CalendarRoute = () => {
  const { data } = useSuspenseQuery(calendarRouteQueries.calendarEvents);
  const [selectedEvent, setSelectedEvent] = useState<CalendarComponentEvent>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const events = map(data, (item) => {
    return {
      description: item.description,
      end: DateTime.fromISO(item.endsAt, {
        zone: AMERICA_CHICAGO,
      }).toJSDate(),
      start: DateTime.fromISO(item.startsAt, {
        zone: AMERICA_CHICAGO,
      }).toJSDate(),
      title: item.title,
    } satisfies CalendarComponentEvent;
  });

  const handleSelectEvent = useCallback(
    (event: CalendarComponentEvent) => {
      setSelectedEvent(event);
      onOpen();
    },
    [onOpen],
  );

  return (
    <MainLayout>
      <div className="mx-auto my-4 max-w-7xl rounded-lg bg-gray-50 py-4 shadow-sm shadow-sky-50 md:p-4">
        <Calendar
          selectable
          className="min-h-screen w-full"
          defaultView="week"
          endAccessor="end"
          events={events}
          localizer={localizer}
          onSelectEvent={handleSelectEvent}
          startAccessor="start"
        />
        {!isNil(selectedEvent) &&
          <CalendarModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            selectedEvent={selectedEvent}
          />}
      </div>
    </MainLayout>
  );
};

export const calendarRoute = createRoute({
  beforeLoad() {
    setMeta({
      description: "Events calendar for Sterett Creek Village Trustee",
      title: "Sterett Creek Village Trustee | Calendar",
    });
  },
  component: CalendarRoute,
  errorComponent: EmptyContent,
  getParentRoute: () => {
    return rootRoute;
  },
  async loader() {
    return getRouteQueries(calendarRouteQueries);
  },
  path: "/calendar",
});
