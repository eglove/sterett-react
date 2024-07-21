import type { GetFilesSchema } from "../../sanity/queries/get-files.ts";

import { DocumentLink } from "../document-link.tsx";

type FileListProperties = {
  readonly covenants: GetFilesSchema[];
  readonly general: GetFilesSchema[];
};

export function FileList({ covenants, general }: FileListProperties) {
  return (
    <div>
      <h2 className="text-2xl font-bold">Files</h2>
      {covenants.map((covenant) => {
        return <DocumentLink document={covenant} key={covenant._id} />;
      })}
      {general.map((file) => {
        return <DocumentLink document={file} key={file._id} />;
      })}
    </div>
  );
}
