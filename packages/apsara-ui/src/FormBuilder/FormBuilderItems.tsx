import React, { useCallback } from "react";
import * as R from "ramda";
import PropTypes from "prop-types";
import FormItem from "./FormItem";
import type { FormInstance } from "rc-field-form";
import { ColProps, FormItemLabelProps, FormItemInputProps } from "./interface";
import type { ValidateStatus, LabelTooltipType } from "./interface";
import Tooltip from "../Tooltip";
import { evaluateExpression } from "./helper";
import FormBuilderField, { Widget } from "./FormBuilderField";
import { InternalNamePath, Rule } from "rc-field-form/lib/interface";
import { SelectProps } from "../Select/Select";
import { SwitchProps } from "../Switch/Switch";
import { RadioProps } from "../Radio/Radio";
import { SelectProps as ComboboxProps } from "rc-select";
import type { FieldProps } from "rc-field-form/lib/Field";

/*
Example:
const [form] = Form.useForm();
<Form form={form} onValueChange={() =>{}} />
*/

/**
 *
 * @param {object} form
 * @param {object} meta
 * form meta {fields=[{}], formItemLayout=[8,16], initialValues={}, readOnly}
 * field meta {
 *      key:
 *      name: ['name', 'first'] || string
 *      label:
 *      readOnly: False
 *      tooltip: string/ReactNode for tooltip
 *      widget,
 *      widgetType,
 *      fieldProps
 *      formItemLayout,
 *      initialValue
 *      disabled
 *      noStyle
 *      children
 *      required
 *      message
 *      placeholder,
 *      rules
 * }
 */

type RenderChildren<Values = any> = (form: FormInstance<Values>) => React.ReactNode;
type RcFieldProps<Values = any> = Omit<FieldProps<Values>, "children">;
type ChildrenType<Values = any> = RenderChildren<Values> | React.ReactNode;

export interface FormItemProps<Values = any> extends FormItemLabelProps, FormItemInputProps, RcFieldProps<Values> {
    prefixCls?: string;
    noStyle?: boolean;
    style?: React.CSSProperties;
    className?: string;
    children?: ChildrenType<Values>;
    id?: string;
    hasFeedback?: boolean;
    validateStatus?: ValidateStatus;
    required?: boolean;
    hidden?: boolean;
    initialValue?: any;
    messageVariables?: Record<string, string>;
    tooltip?: LabelTooltipType;
    /** @deprecated No need anymore */
    fieldKey?: React.Key | React.Key[];
}

const shouldShow = (config: any, dependenciesFieldValue: any) => {
    if (!config.dependencies || !config.depends) return true;
    return evaluateExpression(config.depends, dependenciesFieldValue?.toString());
};

type CommonProps = SelectProps | SwitchProps | RadioProps | ComboboxProps;

export interface FormMetaFields {
    formItemLayout?: {
        labelCol: ColProps;
        wrapperCol: ColProps;
    };
    readOnly?: boolean;
    rules?: Rule[];
    required?: boolean;
    message?: string;
    pattern?: RegExp;
    label?: string;
    patternMsg?: string;
    children?: React.ReactNode;
    className?: string;
    formItemProps?: FormItemProps;
    dependencies?: InternalNamePath[];
    disabled?: boolean;
    name: string | string[];
    widget: Widget;
    title?: string;
    fieldProps?: Record<string, unknown> | CommonProps;
    initialValue?: any;
    tooltip?: React.ReactNode | string;
    options?: Array<{ label: string; value: string }>;
    placeholder?: string;
    mode?: "multiple" | "tags";
    component?: React.ReactNode;
}

export interface FormBuilderItemsProps {
    form?: FormInstance;
    meta: {
        fields?: FormMetaFields[];
        readOnly?: boolean;
        formItemLayout?: {
            labelCol: ColProps;
            wrapperCol: ColProps;
        };
    };
}

const FormBuilderItems = (props: FormBuilderItemsProps) => {
    const { form = null, meta } = props;
    if (!meta) return null;

    const { fields = [] } = meta;

    const getInitialDependencyFieldValueByNamePath = useCallback(
        (namePath: any) => {
            // otherwise if not loaded in form then search within the fields map and return initialValue
            const dependentField = fields.find((field: any) => R.equals(field.name, namePath));
            return R.propOr(undefined, "initialValue", dependentField);
        },
        [fields],
    );

    const getDependencyFieldValueByNamePath = useCallback(
        (namePath: any) => {
            // if its already set in form then return
            if (form?.getFieldValue(namePath)) return form?.getFieldValue(namePath);

            // otherwise if not loaded in form then search within the fields map and return initialValue
            return getInitialDependencyFieldValueByNamePath(namePath);
        },
        [form, fields],
    );

    return (
        <React.Fragment>
            {fields.map((config: any) => {
                // TODO: utilize form formItemLayout for all form item
                let formItemLayout = config.formItemLayout || meta.formItemLayout;

                // custom:: Get styleing for form items
                if (Array.isArray(formItemLayout) && formItemLayout.length >= 2) {
                    const [labelCol, wrapperCol] = formItemLayout;
                    formItemLayout = {
                        labelCol: { span: labelCol },
                        wrapperCol: { span: wrapperCol },
                    };
                }

                // custom:: readOnly global has more precedence than local config
                const isReadOnly = meta.readOnly || config.readOnly;

                // custom:: handle required props
                const rules = [...(config.rules || [])];
                if (config.required) {
                    rules.unshift({ required: true, message: config.message });
                }
                if (config.pattern) {
                    rules.unshift({
                        pattern: config.pattern,
                        message: `${config.label} - ${config.patternMsg}`,
                    });
                }

                //
                // custom:: TODO: handle initialValue if needed

                // FOR FORM ITEM PROPS
                const formItemProps = {
                    children: config.children,
                    rules,
                    ...(formItemLayout !== null ? formItemLayout : {}),
                    ...R.pick(
                        [
                            "name",
                            "label",
                            "labelCol",
                            "wrapperCol",
                            "noStyle",
                            "hidden",
                            "validateStatus",
                            "hasFeedback",
                            "shouldUpdate",
                            "dependencies",
                            "initialValue",
                            "validateTrigger",
                            "help",
                            "extra",
                            "normalize",
                            "preserve",
                        ],
                        config,
                    ),
                    className: config.className,
                    ...config.formItemProps,
                };

                // ! dependent fields should either render before the current element or they should be part of the fields array of the current element
                const dependenciesFieldsValue = R.map(getDependencyFieldValueByNamePath, config.dependencies || []);

                const shouldDisabledByFieldsValue =
                    dependenciesFieldsValue.some(R.isEmpty) || dependenciesFieldsValue.some(R.isNil);
                const isDisabled = config.disabled || shouldDisabledByFieldsValue;

                // FOR FORM FIELD PROPS
                const formFieldProps = {
                    widget: config.widget,
                    ...R.pick(
                        [
                            "value",
                            "loading",
                            "placeholder",
                            "widgetType",
                            "component",
                            "min",
                            "max",
                            "options",
                            "tooltip",
                            "viewModifier",
                            "showSearch",
                            "tokenSeparators",
                            "enableTag",
                            "mode",
                            "checked",
                            "suffix",
                            "prefix",
                            "onChange",
                            "optionLabelProp",
                            "disabledDate",
                            "onSearch",
                            "tagRender",
                            "showArrow",
                        ],
                        config,
                    ),
                    disabled: isDisabled,
                    ...config.fieldProps,
                };
                const uniqeKey = Array.isArray(config.name) ? config.name.join(".") : config.name;

                // Don't create any form item if widget is React.Node
                // TODO: Ideally node type should be a FormBuilderItem rather than a FormBuilderField
                if (config.widget === "node") {
                    return <FormBuilderField key={uniqeKey} {...formFieldProps} />;
                }

                if (isReadOnly) {
                    return (
                        <FormItem name={config.name} label={config.label} key={uniqeKey} {...formItemProps}>
                            {form?.getFieldValue(config.name) || config.initialValue}
                        </FormItem>
                    );
                }

                const isTrue = (currentValue: boolean) => currentValue === true;
                const shouldShowField = R.map(
                    (dependency) => shouldShow(config, dependency),
                    dependenciesFieldsValue,
                ).every(isTrue);

                return shouldShowField ? (
                    <FormItem name={config.name} label={config.label} key={uniqeKey} {...formItemProps}>
                        <FormBuilderToolTip form={form} title={config.title} {...formFieldProps} />
                    </FormItem>
                ) : null;
            })}
        </React.Fragment>
    );
};

export const FormBuilderToolTip = ({ placement = "rightTop", tooltip, children, ...props }: any) => {
    const renderFormItem = (
        <div className="custom-form-field">
            <FormBuilderField {...props} />
            {children}
        </div>
    );

    return tooltip ? (
        <Tooltip title={tooltip} placement={placement}>
            {renderFormItem}
        </Tooltip>
    ) : (
        renderFormItem
    );
};

FormBuilderItems.defaultProps = {
    form: null,
};
FormBuilderItems.propTypes = {
    meta: PropTypes.shape({
        fields: PropTypes.arrayOf(
            PropTypes.shape({
                depends: PropTypes.shape({
                    operator: PropTypes.oneOf(["NotEq", "Eq", "In"]),
                }),
            }),
        ),
    }),
};
export default FormBuilderItems;
