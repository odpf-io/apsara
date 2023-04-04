import React from "react";
import { TextField } from "~/components/textfield";

type Props = {
    onChangeValue: (value: any) => void;
};
export function TextInput({ onChangeValue }: Props) {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        onChangeValue(value);
    };
    return <TextField onChange={onChange} css={{ height: "20px", width: "80px" }} />;
}
