// template-system/LinkProvider.tsx
import React from "react"
import type { LinkComponent } from "./LinkType"
import { NextLinkAdapter } from "./NextLinkAdapter"

const LinkCtx = React.createContext<LinkComponent>(NextLinkAdapter)

export const LinkProvider = LinkCtx.Provider
export const useLink = () => React.useContext(LinkCtx)
