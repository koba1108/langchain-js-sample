import { ExpressoConfig, Pattern } from "@expressots/core";

export const config: ExpressoConfig = {
  sourceRoot: "api",
  scaffoldPattern: Pattern.KEBAB_CASE,
  opinionated: false,
};
