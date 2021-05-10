import {Result, Button}       from "antd";
import Config from "../config";

export default function Custom404() {
    const backHome = () => {
        window.location.replace(`/#${Config.PATHNAME.HOME}`);
    };

    return (
        <Result
            status="404"
            title="404"
            subTitle="Xin lỗi, trang này không tồn tại"
            extra={
                <Button
                    type='primary'
                    onClick={backHome}
                >
                    Quay về trang chủ
                </Button>
            }
        />
    )
}
