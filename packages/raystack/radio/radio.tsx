import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import styles from "./radio.module.css";

const RedioRoot = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Root>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root ref={ref} style={{ display: "flex" }} {...props} />
));

const radioItem = cva(styles.radioitem, {
  variants: {
    size: {
      small: styles["radioitem-small"],
      medium: styles["radioitem-medium"],
    },
  },
  defaultVariants: {
    size: "small",
  },
});

export interface RadioItemProps
  extends ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof radioItem> {}

export const RadioItem = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioItemProps
>(({ className, size, ...props }, forwardedRef) => (
  <RadioGroupPrimitive.Item
    {...props}
    ref={forwardedRef}
    className={radioItem({ size, className })}
  >
    <Indicator />
  </RadioGroupPrimitive.Item>
));

const indicator = cva(styles.indicator);
export interface thumbProps
  extends ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Indicator>,
    VariantProps<typeof indicator> {}

const Indicator = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Indicator>,
  thumbProps
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Indicator
    ref={ref}
    className={indicator({ className })}
    {...props}
  />
));

Indicator.displayName = RadioGroupPrimitive.Indicator.displayName;

export const Radio = Object.assign(RedioRoot, {
  Indicator: Indicator,
  Item: RadioItem,
});
