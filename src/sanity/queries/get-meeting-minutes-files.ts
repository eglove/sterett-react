import { queryOptions } from "@tanstack/react-query";

import type { GetFilesSchema } from "./get-files.ts";

import { queryKeys } from "../../clients/react-query/query-keys.ts";
import {
  NO_DRAFTS,
  sterettSanityClient,
} from "../../clients/sanity/sanity-client.ts";

export async function getMeetingMinutesFiles() {
  const filesQuery = `*[_type == "documentUpload" && category == "Meeting Minute" && ${NO_DRAFTS}] | order(date desc){_id, title, category, date, file{asset->{url}}}`;

  return sterettSanityClient.fetch<GetFilesSchema[]>(filesQuery);
}

export function getMeetingMinutesFilesQueryOptions() {
  return queryOptions({
    queryFn: getMeetingMinutesFiles,
    queryKey: [queryKeys.sterett, queryKeys.getMeetingMinutesFiles],
  });
}
