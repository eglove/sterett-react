import type { TypedObject } from "@portabletext/types";

import { queryOptions } from "@tanstack/react-query";

import { queryKeys } from "../../clients/react-query/query-keys.ts";
import { sterettSanityClient } from "../../clients/sanity/sanity-client.ts";

type GetPageReturn = {
  _id: string;
  content: TypedObject | TypedObject[];
  title: string;
}[];

export async function getPage(slug: string) {
  const pageQuery = `*[_type == "page" && slug.current == $slug]{
    _id, 
    title, 
    content[] {
      ...,
      asset-> {
        _id,
        url,
        hotspot,
        crop,
        metadata {
          lqip,
          dimensions {
            height,
            width,
          }
        }
      }
    }
  }`;

  const pages = await sterettSanityClient.fetch<GetPageReturn>(pageQuery, {
    slug,
  });

  return pages[0];
}

export function getPageQueryOptions(slug: string) {
  return queryOptions({
    queryFn: async () => {
      return getPage(slug);
    },
    queryKey: [queryKeys.sterett, queryKeys.getPage, slug],
  });
}
