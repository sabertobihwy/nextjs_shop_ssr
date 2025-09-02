import React from "react";
import type { ImageComponent } from "./ImageType";
import { NextImageAdapter } from "./NextImageAdapter";

// template-system / ImageProvider.tsx
const ImageCtx = React.createContext<ImageComponent>(NextImageAdapter);
export const ImageProvider = ImageCtx.Provider;
export const useImage = () => React.useContext(ImageCtx);
