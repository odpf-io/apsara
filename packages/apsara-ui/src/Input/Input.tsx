import { Input as AntdInput } from "antd";
import styled from "styled-components";

const Input = styled(AntdInput)`
    && {
        color: ${({ theme }) => theme?.input?.text};
        background-color: ${({ theme }) => theme?.input?.bg};
        border: 1px solid ${({ theme }) => theme?.input?.border};

        ::placeholder {
            color: ${({ theme }) => theme?.input?.placeholder};
        }

        :hover {
            border-color: ${({ theme }) => theme?.input?.hover};
        }

        :focus {
            border-color: ${({ theme }) => theme?.input?.hover};
            box-shadow: none;
        }

        &[disabled] {
            color: ${({ theme }) => theme?.input?.placeholder};
            background-color: ${({ theme }) => theme?.input?.disabled};
            border-color: ${({ theme }) => theme?.input?.border};

            :hover {
                border-color: ${({ theme }) => theme?.input?.border};
            }
        }
    }
`;

export default Input;
