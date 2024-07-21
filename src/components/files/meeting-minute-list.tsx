import type { GetFilesSchema } from "../../sanity/queries/get-files.ts";

import { DocumentLink } from "../document-link.tsx";

type MeetingMinuteListProperties = {
  readonly meetingMinutes: GetFilesSchema[];
};

export function MeetingMinuteList({
  meetingMinutes,
}: MeetingMinuteListProperties) {
  return (
    <div>
      <h2 className="text-2xl font-bold">Meeting Minutes</h2>
      {meetingMinutes.map((meetingMinute) => {
        return (
          <DocumentLink document={meetingMinute} key={meetingMinute._id} />
        );
      })}
    </div>
  );
}
