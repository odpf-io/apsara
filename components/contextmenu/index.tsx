import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { CheckIcon } from "@radix-ui/react-icons";
import React from "react";
import { CSS, styled } from "../../stitches.config";
import { Box } from "../box";
import { Flex } from "../flex";
import { itemCss, labelCss, menuCss, separatorCss } from "../menu";
import { panelStyles } from "../panel";

const StyledContent = styled(ContextMenuPrimitive.Content, menuCss, panelStyles);

type ContextMenuContentPrimitiveProps = React.ComponentProps<typeof ContextMenuPrimitive.Content>;
type ContextMenuContentProps = ContextMenuContentPrimitiveProps & { css?: CSS };

const ContextMenuContent = React.forwardRef<React.ElementRef<typeof StyledContent>, ContextMenuContentProps>(
    (props, forwardedRef) => (
        <ContextMenuPrimitive.Portal>
            <StyledContent {...props} ref={forwardedRef} />
        </ContextMenuPrimitive.Portal>
    ),
);

const ContextMenuItem = styled(ContextMenuPrimitive.Item, itemCss);
const ContextMenuGroup = styled(ContextMenuPrimitive.Group, {});
const ContextMenuLabel = styled(ContextMenuPrimitive.Label, labelCss);
const ContextMenuSeparator = styled(ContextMenuPrimitive.Separator, separatorCss);

const StyledContextMenuCheckboxItem = styled(ContextMenuPrimitive.CheckboxItem, itemCss);

type ContextMenuCheckboxItemPrimitiveProps = React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>;
type ContextMenuCheckboxItemProps = ContextMenuCheckboxItemPrimitiveProps & { css?: CSS };

const ContextMenuCheckboxItem = React.forwardRef<
    React.ElementRef<typeof StyledContextMenuCheckboxItem>,
    ContextMenuCheckboxItemProps
>(({ children, ...props }, forwardedRef) => (
    <StyledContextMenuCheckboxItem {...props} ref={forwardedRef}>
        <Box as="span" css={{ position: "absolute", left: "$1" }}>
            <ContextMenuPrimitive.ItemIndicator>
                <CheckIcon />
            </ContextMenuPrimitive.ItemIndicator>
        </Box>
        {children}
    </StyledContextMenuCheckboxItem>
));

const ContextMenuRadioGroup = styled(ContextMenuPrimitive.RadioGroup, {});
const StyledContextMenuRadioItem = styled(ContextMenuPrimitive.RadioItem, itemCss);

type ContextMenuRadioItemPrimitiveProps = React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>;
type ContextMenuRadioItemProps = ContextMenuRadioItemPrimitiveProps & { css?: CSS };

const ContextMenuRadioItem = React.forwardRef<
    React.ElementRef<typeof StyledContextMenuRadioItem>,
    ContextMenuRadioItemProps
>(({ children, ...props }, forwardedRef) => (
    <StyledContextMenuRadioItem {...props} ref={forwardedRef}>
        <Box as="span" css={{ position: "absolute", left: "$1" }}>
            <ContextMenuPrimitive.ItemIndicator>
                <Flex css={{ width: "$3", height: "$3", alignItems: "center", justifyContent: "center" }}>
                    <Box
                        css={{
                            width: "$1",
                            height: "$1",
                            backgroundColor: "currentColor",
                            borderRadius: "$round",
                        }}
                    />
                </Flex>
            </ContextMenuPrimitive.ItemIndicator>
        </Box>
        {children}
    </StyledContextMenuRadioItem>
));

export const ContextMenu = Object.assign(ContextMenuPrimitive.Root, {
    Trigger: ContextMenuPrimitive.Trigger,
    Content: ContextMenuContent,
    Item: ContextMenuItem,
    Group: ContextMenuGroup,
    Label: ContextMenuLabel,
    Separator: ContextMenuSeparator,
    CheckboxItem: ContextMenuCheckboxItem,
    RadioGroup: ContextMenuRadioGroup,
    RadioItem: ContextMenuRadioItem,
});
