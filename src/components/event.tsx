/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useEffect } from "react";

import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import isNil from "lodash/isNil";
import { DateTime } from "luxon";
import { useState } from "react";
import { Fragment } from "react";
import { twMerge } from "tailwind-merge";

import type { CalendarEventReturn } from "../sanity/queries/get-news-and-events.ts";

import { getRelativeDate } from "../util/date.ts";
import { eventRangeFormat } from "../util/event-range-format.ts";
import { SanityContent } from "./sanity/sanity-content.tsx";

type EventProperties = {
  readonly colors?: {
    eventBackground?: string;
    eventText?: string;
  };
  readonly data: CalendarEventReturn;
  readonly iconMeta?: {
    alt: string;
    src: string;
  };
  readonly setUsedDates?: Dispatch<SetStateAction<Set<unknown>>>;
  readonly usedDates?: Set<unknown>;
};

const happeningNow = "Happening Now!";

function dateIsInRange(start: string, end: string) {
  const now = DateTime.now();
  const startDate = DateTime.fromISO(start);
  const endDate = DateTime.fromISO(end);

  return now >= startDate && now <= endDate;
}

export function Event({
  colors,
  data,
  iconMeta,
  setUsedDates,
  usedDates,
}: EventProperties) {
  const isInRange = dateIsInRange(data.startsAt, data.endsAt);
  const relativeDate = getRelativeDate(data.startsAt);
  const [isDateShowing, setIsDateShowing] = useState(false);

  const backgroundColor = isNil(colors?.eventBackground)
      ? "bg-sky-200"
      : `bg-${colors.eventBackground}`;
  const textColor = isNil(colors?.eventText)
      ? "text-foreground"
      : colors.eventText;

  useEffect(() => {
    if (!usedDates?.has(relativeDate) && !isInRange) {
      setIsDateShowing(true);
      setUsedDates?.((previousState) => {
        return new Set(previousState).add(relativeDate);
      });
    }

    if (!usedDates?.has(happeningNow) && isInRange) {
      setIsDateShowing(true);
      setUsedDates?.((previousState) => {
        return new Set(previousState).add(happeningNow);
      });
    }
  }, [usedDates, happeningNow, relativeDate, isInRange]);


  return (
    <Fragment key={data._id}>
      {isDateShowing ? (
        <Card
          className={twMerge("text-lg font-bold", backgroundColor, textColor)}
        >
          <CardBody>
            {isInRange ? happeningNow : getRelativeDate(data.startsAt)}
          </CardBody>
        </Card>
      ) : null}
      <Card
        className={twMerge("my-4 h-max w-full", backgroundColor)}
        id={data._id}
      >
        <CardHeader className={twMerge("block", textColor)}>
          <strong className="flex flex-wrap gap-2">
            {isNil(iconMeta) ? (
              <CalendarDaysIcon height={24} width={24} />
            ) : (
              <img
                alt={iconMeta.alt}
                height={20}
                src={iconMeta.src}
                width={20}
              />
            )}
            <span>{eventRangeFormat(data.startsAt, data.endsAt)}</span>
          </strong>
          <br />
          <div className="font-semibold">{data.title}</div>
        </CardHeader>
        {!isNil(data.description) && (
          <>
            <Divider />
            <CardBody>
              <SanityContent styleNames={textColor} value={data.description} />
            </CardBody>
          </>
        )}
      </Card>
    </Fragment>
  );
}
