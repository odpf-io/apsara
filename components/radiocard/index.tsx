import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import React from "react";
import { CSS, styled } from "~/stitches.config";

const RadioGroupRoot = styled(RadioGroupPrimitive.Root, {
    display: "block",
});

const StyledRadioButton = styled("div", {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "$round",
    width: 25,
    height: 25,
    boxShadow: "inset 0 0 0 1px $colors$slate7",
    flexShrink: 0,
    marginRight: "$3",
});

const StyledRadioIndicator = styled("div", {
    borderRadius: "$round",
    width: 15,
    height: 15,
    backgroundColor: "$violet9",
    transform: "scale(0)",
});

const StyledRadio = styled(RadioGroupPrimitive.Item, {
    all: "unset",
    boxSizing: "border-box",
    userSelect: "none",
    "&::before": {
        boxSizing: "border-box",
    },
    "&::after": {
        boxSizing: "border-box",
    },
    display: "flex",
    alignItems: "center",
    borderRadius: "$2",
    boxShadow: "inset 0 0 0 1px $colors$slate7",
    padding: "$3",
    "@hover": {
        "&:hover": {
            boxShadow: "inset 0 0 0 1px $colors$slate8",
        },
    },
    '&[data-state="checked"]': {
        boxShadow: "inset 0 0 0 1px $colors$violet8, 0 0 0 1px $colors$violet8 !important",
        [`& ${StyledRadioIndicator}`]: {
            transform: "scale(1)",
        },
    },
});

type RadioGroupItemPrimitiveProps = React.ComponentProps<typeof RadioGroupPrimitive.Item>;
type RadioCardProps = RadioGroupItemPrimitiveProps & { css?: CSS };

export const RadioCard = React.forwardRef<React.ElementRef<typeof StyledRadio>, RadioCardProps>(
    (props, forwardedRef) => (
        <StyledRadio {...props} ref={forwardedRef}>
            <StyledRadioButton>
                <StyledRadioIndicator />
            </StyledRadioButton>
            {props.children}
        </StyledRadio>
    ),
);

export const RadioGroup = Object.assign(RadioGroupRoot, {
    Card: RadioCard,
});
