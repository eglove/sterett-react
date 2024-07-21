import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import isNil from "lodash/isNil";

import type { NewsUpdateReturn } from "../sanity/queries/get-news-and-events.ts";

import { SanityContent } from "./sanity/sanity-content.tsx";

type NewsUpdateProperties = {
  readonly data: NewsUpdateReturn;
};

export function NewsUpdate({ data }: NewsUpdateProperties) {
  return (
    <Card className="h-max w-full" id={data._id}>
      <CardHeader className="block">
        <div className="font-semibold">{data.title}</div>
      </CardHeader>
      {!isNil(data.description) && (
        <>
          <Divider />
          <CardBody>
            <SanityContent value={data.description} />
          </CardBody>
        </>
      )}
    </Card>
  );
}
