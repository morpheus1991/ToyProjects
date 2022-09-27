import { setupWorker } from "msw";
import { hanlders } from "./handlers";

export const worker = setupWorker(...hanlders);
