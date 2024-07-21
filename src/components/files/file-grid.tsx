import { useSuspenseQuery } from "@tanstack/react-query";

import { filesRouteQueries } from "../../routes/files.tsx";
import { FileList } from "./file-list.tsx";
import { MeetingMinuteList } from "./meeting-minute-list.tsx";

export function FileGrid() {
  const { data } = useSuspenseQuery(filesRouteQueries.files);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <FileList covenants={data.covenants} general={data.general} />
      <MeetingMinuteList meetingMinutes={data.meetingMinutes} />
    </div>
  );
}
