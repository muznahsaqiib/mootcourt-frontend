import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "primereact/toast";
import { hideToast } from "../store/slices/toastSlice";

export default function AppToast() {
    const toast = useRef(null);
    const {
        severity,
        summary,
        detail,
        visible
    } = useSelector((state) => state.toast);
    const dispatch = useDispatch();

    useEffect(() => {
        if (visible) {
            show();
            setTimeout(() => dispatch(hideToast()), 5000);
        }
    }, [dispatch, visible])

    const show = () => {
        toast.current.show({
            severity: severity,
            summary: summary,
            detail: detail
        });
    };

    return (
        <div className="card flex justify-content-center">
            <Toast ref={toast} />
        </div>
    )
}