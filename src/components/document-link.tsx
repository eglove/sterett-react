import { Link } from "@nextui-org/link";

import type { GetFilesSchema } from "../sanity/queries/get-files.ts";

type DocumentLinkProperties = {
  readonly document: GetFilesSchema;
};

export function DocumentLink({ document }: DocumentLinkProperties) {
  return (
    <div className="flex flex-wrap items-center gap-1 py-2">
      <Link
        isExternal
        showAnchorIcon
        className="text-black underline"
        href={document.file.asset.url}
      >
        {document.title}
      </Link>
    </div>
  );
}