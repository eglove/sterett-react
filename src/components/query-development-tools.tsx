import { lazy } from "react";

export const QueryDevelopmentTools =
  "production" === import.meta.env.MODE
    ? () => {
        return null;
      }
    : lazy(async () => {
        return import("@tanstack/react-query-devtools").then((result) => {
          return {
            default: result.ReactQueryDevtools,
          };
        });
      });
