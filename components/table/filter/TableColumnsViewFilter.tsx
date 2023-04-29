import React from "react";
import { Flex } from "~/components/flex";
import { Label } from "~/components/label";
import { Popover } from "~/components/popover";
import { Separator } from "~/components/separator";
import { useTable } from "../hooks/useTable";

export default function TableColumnsFilter({ children }: any) {
    const { table } = useTable();
    return (
        <Popover modal>
            <Popover.Trigger asChild>{children}</Popover.Trigger>
            <Popover.Content css={{ padding: "$4" }}>
                <Flex direction="column" css={labelContainer}>
                    <Label css={labelStyle}>
                        <input
                            {...{
                                type: "checkbox",
                                checked: table.getIsAllColumnsVisible(),
                                onChange: table.getToggleAllColumnsVisibilityHandler(),
                            }}
                        />{" "}
                        Toggle All
                    </Label>
                    <Separator></Separator>
                    {table.getAllLeafColumns().map((column) => {
                        return (
                            <Label css={labelStyle} key={column.id}>
                                <input
                                    {...{
                                        type: "checkbox",
                                        checked: column.getIsVisible(),
                                        onChange: column.getToggleVisibilityHandler(),
                                    }}
                                />{" "}
                                {column.id}
                            </Label>
                        );
                    })}
                </Flex>
            </Popover.Content>
        </Popover>
    );
}

const labelContainer = {
    padding: "$2",
    maxHeight: "16rem",
    overflow: "scroll",

    input: {
        marginRight: "$2",
    },
};
const labelStyle = {
    display: "flex",
    align: "center",
    padding: "$1 $2",
};
