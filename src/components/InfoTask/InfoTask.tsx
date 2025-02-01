import { memo } from "react";
import { Drawer } from 'antd';
import stl from "./InfoTaskDrawer.module.scss";

interface IInfoTaskDrawer {
    title: string;
    isOpened: boolean;
    children: React.ReactNode;
    extra?: React.ReactNode;
    onClose?: () => void;
    size?: "default" | "large";
    placement?: 'left' | 'right' | 'top' | 'bottom';
};

const InfoTaskDrawer: React.FC<IInfoTaskDrawer> = (
    { title, size, isOpened, onClose, children, extra, placement }
    ) => {

    return (
        <div className={stl.drawer_info_task}>
            <Drawer
                title={title}
                placement={placement || "right"}
                size={size}
                onClose={onClose}
                open={isOpened}
                extra={extra || <></>}
            >
                {children}
            </Drawer>
        </div>
    )
}

export default memo(InfoTaskDrawer);
