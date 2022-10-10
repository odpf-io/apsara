import rcWarning, { resetWarned } from "rc-util/lib/warning";

export { resetWarned };
export function noop() {} // eslint-disable-line

type Warning = (valid: boolean, component: string, message?: string) => void;

let warning: Warning = noop;
if (process.env.NODE_ENV !== "production") {
    warning = (valid, component, message) => {
        rcWarning(valid, `[custom: ${component}] ${message}`);

        // StrictMode will inject console which will not throw warning in React 17.
        if (process.env.NODE_ENV === "test") {
            resetWarned();
        }
    };
}

export default warning;
