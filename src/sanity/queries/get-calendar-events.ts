import type { TypedObject } from "@portabletext/types";

import { queryOptions } from "@tanstack/react-query";

import { queryKeys } from "../../clients/react-query/query-keys.ts";
import {
  NO_DRAFTS,
  sterettSanityClient,
} from "../../clients/sanity/sanity-client.ts";

export type GetCalendarEventsReturn = {
  _id: string;
  description: TypedObject | TypedObject[];
  endsAt: string;
  startsAt: string;
  title: string;
}[];

export async function getCalendarEvents() {
  const eventQuery = `*[_type == "calendarEvent" && ${NO_DRAFTS}]{_id, title, startsAt, endsAt, description}`;

  return sterettSanityClient.fetch<GetCalendarEventsReturn>(eventQuery);
}

export function getCalendarEventsQueryOptions() {
  return queryOptions({
    queryFn: getCalendarEvents,
    queryKey: [queryKeys.sterett, queryKeys.getCalendarEvents],
  });
}
