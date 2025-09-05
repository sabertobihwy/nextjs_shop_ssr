import { LinkApi } from "@ss/services";
import { NextLinkAdapter } from "./link/NextLinkAdapter";

export const NextLinkImplApi: LinkApi = {
    Link: NextLinkAdapter
}