import * as TogglePrimitive from "@radix-ui/react-toggle";
import { styled } from "../../stitches.config";

export const Toggle = styled(TogglePrimitive.Root, {
  // Reset
  alignItems: "center",
  appearance: "none",
  borderWidth: "0",
  boxSizing: "border-box",
  display: "inline-flex",
  flexShrink: 0,
  fontFamily: "inherit",
  fontSize: "$3",
  justifyContent: "center",
  lineHeight: "1",
  outline: "none",
  padding: "0",
  textDecoration: "none",
  userSelect: "none",
  WebkitTapHighlightColor: "transparent",
  color: "$fgBase",
  "&::before": {
    boxSizing: "border-box",
  },
  "&::after": {
    boxSizing: "border-box",
  },
  height: "$5",
  width: "$5",
  backgroundColor: "transparent",
  "@hover": {
    "&:hover": {
      backgroundColor: "$bgBase",
    },
  },
  "&:active": {
    backgroundColor: "$bgBase",
  },
  "&:focus": {
    boxShadow: "inset 0 0 0 1px $bgBase, 0 0 0 1px $bgBase",
    zIndex: 1,
  },

  '&[data-state="on"]': {
    backgroundColor: "$bgBaseHover",
    "@hover": {
      "&:hover": {
        backgroundColor: "$bgBaseHover",
      },
    },
    "&:active": {
      backgroundColor: "$bgBaseHover",
    },
  },

  variants: {
    shape: {
      circle: {
        borderRadius: "$round",
      },
      square: {
        borderRadius: "$1",
      },
    },
  },
});
