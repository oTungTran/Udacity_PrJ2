import { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { getUser } from "../../plugins/store";
import { Navigate } from "react-router-dom";

export default function Auth({ children }: PropsWithChildren<{}>) {
    const user = useSelector(getUser);

    if (!Object.keys(user).length) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}