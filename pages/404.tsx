import React from 'react';
import {Result, Button} from "antd";
import {useRouter} from 'next/router'
import Config from "../config";

export default function Custom404() {
    const router = useRouter()

    return (
        <Result
            status="404"
            title="404"
            subTitle="Xin lỗi, trang này không tồn tại"
            extra={
                <Button
                    type='primary'
                    onClick={() => router.push(Config.PATHNAME.USER_HOME)}
                >
                    Quay về trang chủ
                </Button>
            }
        />
    )
}
