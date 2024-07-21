import { queryOptions } from "@tanstack/react-query";

import { queryKeys } from "../../clients/react-query/query-keys.ts";
import {
  NO_DRAFTS,
  sterettSanityClient,
} from "../../clients/sanity/sanity-client.ts";

export type GetTrusteesReturn = {
  _id: string;
  duties: string;
  image: {
    asset: {
      metadata: {
        dimensions: {
          height: number;
          width: number;
        };
      };
      url: string;
    };
  };
  name: string;
  phoneNumber: string;
}[];

export async function getTrustees() {
  const trusteesQuery = `*[_type == "trustee" && ${NO_DRAFTS}] | order(orderRank asc) {_id, order, orderRank, duties, name, phoneNumber, image{asset->{url, metadata{dimensions{height, width}}}}}`;

  return sterettSanityClient.fetch<GetTrusteesReturn>(trusteesQuery);
}

export function getTrusteesQueryOptions() {
  return queryOptions({
    queryFn: getTrustees,
    queryKey: [queryKeys.sterett, queryKeys.getTrustees],
  });
}
