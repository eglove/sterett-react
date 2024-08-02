import type { PortableTextBlock } from "@portabletext/types";

import attempt from "lodash/attempt";
import isError from "lodash/isError";

export function toPlainText(blocks: PortableTextBlock[] = []) {
  const result = attempt(() => {
    return blocks
      .map((block) => {
        if ("block" !== block._type || !block.children) {
          return "";
        }
        return block.children
          .map((child) => {
            return child.text;
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
