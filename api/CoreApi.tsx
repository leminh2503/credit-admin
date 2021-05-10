import axios from 'axios';
import {notification} from "antd";
import _ from 'lodash';
import Config from '../config';
import store, {persistor} from "../redux/store";
import ListErrorMessage from "./ErrorMessage/ListErrorMessage";
import {UserState} from "../types/common";

function displayError(dataError) {
    try {
        let errorCode = dataError.errorCode;
        let errorMessage;

        let error = ListErrorMessage.find(dt => dt.error_code === errorCode);
        if (error) {
            errorMessage = error.description;
        } else {
            errorMessage = dataError.errorMessageDesc;
        }

        notification.error({
            message: 'Có lỗi xảy ra',
            description: errorMessage
        });
    } catch (e) {
        notification.error({
            message: 'Có lỗi xảy ra (Frontend)',
            description: _.toString(e)
        });
    }
}

const somethingsWrong = {
    error_code: "ERROR???",
    error_message: "Somethings Wrong"
};

export default function coreApi(config, options = {}) {

    const _defaultOptions = {
        withToken: true,
        displayError: true,
        returnHeader: false,
        ...options
    };

    const _root = axios.create({
        headers: {
            'Content-Type': 'application/json',
        },
        baseURL: Config.NETWORK_CONFIG.API_BASE_URL
    });

    //Access Token
    if (_defaultOptions.withToken) {
        const state = store.getState() as UserState;
        const token = state.user?.token;
        if (token) {
            _root.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }

    return new Promise((resolve, reject) => {
        _root.request(config)
            .then(r => {
                if (_defaultOptions.returnHeader) {
                    resolve({headers: r.headers, data: r.data})
                } else {
                    resolve(r.data)
                }
            })
            .catch(error => {
                const dataError = error?.response?.data ?? somethingsWrong;

                if (dataError?.error_code === "AUTH3001.NotAuthenticated") {
                    persistor.purge().then(() => {
                        window.location.reload();
                    }).catch(() => {
                        window.alert("Trình duyệt bị lỗi. Xóa Cookie trình duyệt và thử lại");
                    });
                } else {
                    if (_defaultOptions.displayError) {
                        displayError(error.response.data);
                    }
                }
                return reject(error);
            })
    })
}
