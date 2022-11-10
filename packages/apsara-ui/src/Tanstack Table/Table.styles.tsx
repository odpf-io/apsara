import styled from "styled-components";
import { textStyles } from "../mixin";

export const StyledTable = styled.div`
    table {
        background: transparent;
        background-color: ${({ theme }) => theme?.table?.bg};

        width: 100%;
        text-align: left;
        border-radius: 2px 2px 0 0;
        border-collapse: separate;
        border-spacing: 0;
    }

    thead > tr > th:not(:last-child):not([colspan])::before {
        position: absolute;
        top: 50%;
        right: 0;
        width: 1px;
        height: 1.6em;
        background-color: rgba(0, 0, 0, 0.06);
        transform: translateY(-50%);
        transition: background-color 0.3s;
        content: "";
    }
    thead {
        font-size: 12px;
        color: #4b4b4b;
        text-indent: initial;
        border-spacing: 2px;
        border-color: rgb(245, 245, 245);

        font-weight: bold;
        color: rgb(179, 179, 179);
        text-transform: capitalize;
    }

    tr > td,
    tfoot > tr > th,
    tfoot > tr > td {
        position: relative;
        padding: 16px 16px;
        overflow-wrap: break-word;
    }

    tr > th,
    tr > td {
        --cell-padding-tb: 13px;
        --cell-padding-lr: 16px;

        min-width: 120px;
        padding: var(--cell-padding-tb) var(--cell-padding-lr);
        border-color: ${({ theme }) => theme?.table?.border};
        border-bottom: 1px solid ${({ theme }) => theme?.table?.border};

        a {
            display: block;
        }
    }
    tbody {
        border-bottom: 1px solid lightgray;

        tr:hover > td {
            background: ${({ theme }) => theme?.table?.highlight};
        }
    }

    th {
        // border-right: 1px solid lightgray;
        padding: 2px 4px;
        position: sticky;
        top: 0px;
        background: white;
        z-index: 999;
    }

    tfoot {
        color: gray;
    }

    tfoot th {
        font-weight: normal;
    }
`;

export const TableWrapper = styled.div`
    height: calc(100vh - 90px);
    overflow: auto;
`;

export const PaginationWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 16px 0;

    ul {
        list-style: none;
    }

    .rc-pagination {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    .rc-pagination-item,
    .rc-pagination-prev,
    .rc-pagination-jump-prev,
    .rc-pagination-jump-next {
        margin-right: 8px;
    }

    .rc-pagination-total-text {
        margin-right: 12px;
        cursor: initial;
    }

    .rc-pagination-jump-next,
    .rc-pagination-jump-prev,
    .rc-pagination-next,
    .rc-pagination-prev {
        display: inline-block;
        min-width: 28px;
        height: 28px;
        color: rgba(0, 0, 0, 0.85);
        font-family: Arial;
        line-height: 28px;
        text-align: center;
        vertical-align: middle;
        list-style: none;
        border-radius: 2px;
        cursor: pointer;
        transition: all 0.3s;
    }
    .rc-pagination-jump-next button,
    .rc-pagination-jump-prev button {
        background: transparent;
        border: none;
        cursor: pointer;
        color: #666;
    }
    .rc-pagination-jump-next button:after,
    .rc-pagination-jump-prev button:after {
        display: block;
        content: "•••";
    }
    .rc-pagination-jump-next button:hover::after {
        display: block;
        content: ">>";
        color: #1890ff;
    }
    .rc-pagination-jump-prev button:hover::after {
        display: block;
        content: "<<";
        color: #1890ff;
    }
    .rc-pagination-item,
    .rc-pagination-prev,
    .rc-pagination-next,
    .rc-pagination-total-text {
        min-width: initial;
        height: auto;
        line-height: initial;
        background-color: transparent;
        border: none;
        cursor: pointer;
        background-color: #fff;
        border: 1px solid #d9d9d9;
        border-radius: 2px;
        outline: none;
        min-width: 32px;
        margin-right: 8px;
        &:hover:not([aria-disabled="true"]) {
            border: 1px solid #1890ff;
        }
    }
    .rc-pagination-item a,
    .rc-pagination-item button,
    .rc-pagination-prev a,
    .rc-pagination-prev button,
    .rc-pagination-next a,
    .rc-pagination-next button,
    .rc-pagination-total-text a,
    .rc-pagination-total-text button {
        padding: 6px 8px;
        height: auto;
        min-width: 32px;
        min-height: 32px;
        border-radius: 8px;
        border: 1px solid transparent;
        background-color: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: 500;
        color: #656f84;
        transition: 0.3s;
        -webkit-transition: 0.3s;
        -moz-transition: 0.3s;
        -o-transition: 0.3s;
        &:hover:not([disabled]) {
            color: #1890ff !important;
        }
    }

    .rc-pagination-item-active {
        border: 1px solid #1890ff;
        color: #1890ff !important;
    }

    .rc-pagination-disabled {
        &:hover {
            cursor: not-allowed;
        }
        button {
            &:hover {
                cursor: not-allowed;
            }
        }
    }

    button.pagination-item {
        background-color: #fff;
        border: 1px solid #d9d9d9;
        border-radius: 2px;
        outline: none;
        min-width: 32px;
        min-height: 32px;
        margin-right: 8px;
        &:hover {
            color: #1890ff;
            border: 1px solid #1890ff;
        }

        &:disabled {
            .navIcon {
                color: rgba(0, 0, 0, 0.25);
            }
        }
    }

    .navIcon {
        display: inline-block;
        color: inherit;
        font-style: normal;
        line-height: 0;
        text-align: center;
        text-transform: none;
        vertical-align: -0.14em;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
    }

    .pageSizeSelector {
        padding: 0 11px;
        border: 1px solid #d9d9d9;
        height: 32px;
        &:hover {
            border: 1px solid #1890ff;
        }
    }
`;

export const StyledEmpty = styled.div`
    margin: 90px 8px;
    font-size: 14px;
    line-height: 1.5715;
    text-align: center;

    .rc-empty-footer {
        margin-top: 32px;
    }

    .rc-empty-image {
        height: 100%;
    }
`;

export const EmptyHeader = styled.p`
    ${({ theme }) => textStyles(theme?.fontSizes[2], theme?.table?.empty, "0.5px", "bold")}
    line-height: 16px;
`;

export const EmptyText = styled.p`
    ${({ theme }) => textStyles(theme?.fontSizes[0], theme?.table?.empty)}
    line-height: 16px;
`;
