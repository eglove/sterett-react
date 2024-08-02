import type { PortableTextBlock } from "@portabletext/types";

import attempt from "lodash/attempt";
import isError from "lodash/isError";

export function toPlainText(blocks: PortableTextBlock[] = []) {
  const result = attempt(() => {
    return blocks
      .map((block) => {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition,@typescript-eslint/strict-boolean-expressions
        if ("block" !== block._type || !block.children) {
          return "";
        }
        return block.children
          .map((child) => {
            return child.text as string;
          })
          .join("");
      })
      .join("\n\n");
  });

  if (isError(result)) {
    return "";
  }

  return result;
}
