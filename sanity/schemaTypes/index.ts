import { type SchemaTypeDefinition } from "sanity";
import pressRelease from "./pressRelease";
import event from "./event";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [pressRelease, event],
};
