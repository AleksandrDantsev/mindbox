import stl from "./InfoTaskDrawer.module.scss";
import { Drawer } from 'antd';

interface IInfoTaskDrawer {
    isOpend: boolean;
    onClose: () => void;
    children: React.ReactNode;
    extra?: React.ReactNode;
    size?: "default" | "large";
};

const InfoTaskDrawer: React.FC<IInfoTaskDrawer> = ({ size, isOpend, onClose, children, extra }) => {

    return (
        <div className={stl.drawer_info_task}>
            <Drawer
                title={`${size} Drawer`}
                placement="right"
                size={size}
                onClose={onClose}
                open={isOpend}
                extra={extra || <></>}
            >
                {children}
            </Drawer>
        </div>
    )
}

export default InfoTaskDrawer;
