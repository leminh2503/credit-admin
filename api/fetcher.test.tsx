import {fetcher, fetcherWithMetadata} from "@api/Fetcher";
import axios, {AxiosRequestConfig} from "axios";
import MockAdapter from "axios-mock-adapter";
import {Modal, notification} from "antd";
import store from "@app/redux/store";
import {loginUser} from "@slices/UserSlice";
import Config from "../config";

// Mock axios
const axiosMock = new MockAdapter(axios);

// Mock antd
jest.mock("antd", () => ({
  notification: {error: jest.fn()},
  Modal: {
    confirm: jest.fn(),
    destroyAll: jest.fn(),
  },
}));

// Mock window
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
delete window.location;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.location = {assign: jest.fn()};

// Mock config
jest.mock("../config", () => {
  // Grab original
  const originalModule = jest.requireActual("../config");

  // Return original but override some values
  return {
    ...originalModule,
    STORE_NAME: "state",
    NETWORK_CONFIG: {
      DISPLAY_ERROR: true,
      USE_TOKEN: true,
      WITH_METADATA: false,
    },
    PATHNAME: {
      HOME: "/",
      LOGIN: "/login",
    },
  };
});

describe("test fetcher", () => {
  beforeEach(() => {
    store.dispatch(
      loginUser({
        user: {
          fullName: "Nguyễn Ngọc Hưng",
          email: "hung.nn@tinasoft.vn",
        },
        accessToken: "access token",
        refreshToken: "refresh token",
      })
    );
  });

  it("should fetch resolve", async () => {
    axiosMock.onGet("/get/me").reply(200, {
      success: true,
      errorCode: "000000",
      message: "",
      data: {
        fullName: "Nguyễn Ngọc Hưng",
        username: null,
        email: "hung.nn@tinasoft.vn",
        isVerified: true,
        status: 1,
      },
    });

    const config: AxiosRequestConfig = {
      url: "/get/me",
    };

    const res = await fetcher(config);
    expect(res).toEqual({
      fullName: "Nguyễn Ngọc Hưng",
      username: null,
      email: "hung.nn@tinasoft.vn",
      isVerified: true,
      status: 1,
    });
  });

  it("should fetch resolve with metadata", async () => {
    axiosMock.onGet("/get/users").reply(200, {
      success: true,
      errorCode: "000000",
      message: "",
      data: [
        {
          fullName: "Nguyễn Ngọc Hưng",
          username: null,
          email: "hung.nn@tinasoft.vn",
          isVerified: true,
          status: 1,
        },
        {
          fullName: "Nguyễn Ngọc Hưng",
          username: null,
          email: "hung.nn@tinasoft.vn",
          isVerified: true,
          status: 1,
        },
        {
          fullName: "Nguyễn Ngọc Hưng",
          username: null,
          email: "hung.nn@tinasoft.vn",
          isVerified: true,
          status: 1,
        },
        {
          fullName: "Nguyễn Ngọc Hưng",
          username: null,
          email: "hung.nn@tinasoft.vn",
          isVerified: true,
          status: 1,
        },
      ],
      meta: {
        totalPage: 1,
        currentPage: 1,
        totalItem: 10,
      },
    });

    const config: AxiosRequestConfig = {
      url: "/get/users",
    };

    const res = await fetcherWithMetadata(config);
    expect(res).toEqual({
      data: [
        {
          fullName: "Nguyễn Ngọc Hưng",
          username: null,
          email: "hung.nn@tinasoft.vn",
          isVerified: true,
          status: 1,
        },
        {
          fullName: "Nguyễn Ngọc Hưng",
          username: null,
          email: "hung.nn@tinasoft.vn",
          isVerified: true,
          status: 1,
        },
        {
          fullName: "Nguyễn Ngọc Hưng",
          username: null,
          email: "hung.nn@tinasoft.vn",
          isVerified: true,
          status: 1,
        },
        {
          fullName: "Nguyễn Ngọc Hưng",
          username: null,
          email: "hung.nn@tinasoft.vn",
          isVerified: true,
          status: 1,
        },
      ],
      meta: {
        totalPage: 1,
        currentPage: 1,
        totalItem: 10,
      },
    });
  });

  it("should fetch reject with http status code 401", async () => {
    axiosMock.onGet("/get/me").reply(401, {
      success: false,
      errorCode: "AUTH3001.NotAuthenticated",
      message: "Not authenticated",
      data: null,
    });

    const config: AxiosRequestConfig = {
      url: "/get/me",
    };

    await expect(fetcher(config)).rejects.toEqual({
      errorCode: "AUTH3001.NotAuthenticated",
      errorMessage: "Not authenticated",
    });

    expect(store.getState().user).toEqual({});
    expect(window.location.assign).toBeCalledWith(Config.PATHNAME.LOGIN);
  });

  it("should fetch reject with empty response data", async () => {
    axiosMock.onGet("/get/me").reply(200, {
      success: true,
      errorCode: "000000",
    });

    const config: AxiosRequestConfig = {
      url: "/get/me",
    };

    await expect(fetcher(config)).rejects.toEqual({
      errorCode: "ERROR???",
      errorMessage: "Data is empty",
    });

    await expect(fetcherWithMetadata(config)).rejects.toEqual({
      errorCode: "ERROR???",
      errorMessage: "Data is empty",
    });
  });

  it("should fetch reject with http status code 404", async () => {
    axiosMock.onGet("/get/me").reply(404);

    const config: AxiosRequestConfig = {
      url: "/get/me",
    };

    await expect(fetcher(config)).rejects.toEqual({
      errorCode: "ERROR???",
      errorMessage: "Something is wrong",
    });
  });

  it("should fetch reject with http status code 500", async () => {
    axiosMock.onGet("/get/me").reply(500);

    const config: AxiosRequestConfig = {
      url: "/get/me",
    };

    await expect(fetcher(config)).rejects.toEqual({
      errorCode: "ERROR???",
      errorMessage: "Something is wrong",
    });
  });

  it("should fetch reject with native error", async () => {
    axiosMock.onGet("/get/me").reply(200, undefined);

    const config: AxiosRequestConfig = {
      url: "/get/me",
    };

    await expect(fetcher(config)).rejects.toEqual({
      errorCode: "NATIVE_ERROR",
      errorMessage: "Somethings is wrong",
    });
  });

  it("should fetch reject with response error code", async () => {
    axiosMock.onGet("/get/me").reply(200, {
      success: false,
      errorCode: "AUTH2000",
      message: "Server error",
      data: null,
    });

    const config: AxiosRequestConfig = {
      url: "/get/me",
    };

    await expect(fetcher(config)).rejects.toEqual({
      errorCode: "AUTH2000",
      errorMessage: "Server error",
    });

    await expect(fetcherWithMetadata(config)).rejects.toEqual({
      errorCode: "AUTH2000",
      errorMessage: "Server error",
    });
  });

  it("should fetch reject with network error", async () => {
    axiosMock.onGet("/get/me").networkError();

    const config: AxiosRequestConfig = {
      url: "/get/me",
    };

    await expect(fetcher(config)).rejects.toEqual({
      errorCode: "ERROR???",
      errorMessage: "Something is wrong",
    });

    await expect(fetcherWithMetadata(config)).rejects.toEqual({
      errorCode: "ERROR???",
      errorMessage: "Something is wrong",
    });
  });

  it("should fetch reject with timeout error", async () => {
    axiosMock.onGet("/get/me").timeout();

    const config: AxiosRequestConfig = {
      url: "/get/me",
    };

    await expect(fetcher(config)).rejects.toEqual({
      errorCode: "ERROR???",
      errorMessage: "Something is wrong",
    });

    await expect(fetcherWithMetadata(config)).rejects.toEqual({
      errorCode: "ERROR???",
      errorMessage: "Something is wrong",
    });
  });

  it("should fetch resolve with refresh token success and re-fetch API", async () => {
    let callRefresh = false;
    axiosMock.onGet("/get/me").reply(() => {
      if (callRefresh) {
        return [
          200,
          {
            success: true,
            errorCode: "",
            message: "",
            data: {
              fullName: "Nguyễn Ngọc Hưng",
              username: null,
              email: "hung.nn@tinasoft.vn",
              isVerified: true,
              status: 1,
            },
          },
        ];
      }
      return [200, {success: false, errorCode: "AUTH000221", message: ""}];
    });

    axiosMock.onPost("/auth/refresh-token").reply(() => {
      callRefresh = true;
      return [
        200,
        {
          success: true,
          errorCode: "000000",
          message: "",
          data: {
            user: {
              fullName: "Nguyễn Ngọc Hưng",
              email: "hung.nn@tinasoft.vn",
            },
            accessToken: "access token refreshed",
            refreshToken: "refresh token",
          },
        },
      ];
    });

    const config: AxiosRequestConfig = {
      url: "/get/me",
    };

    await expect(fetcher(config)).resolves.toEqual({
      fullName: "Nguyễn Ngọc Hưng",
      username: null,
      email: "hung.nn@tinasoft.vn",
      isVerified: true,
      status: 1,
    });

    expect(store.getState().user).toEqual({
      user: {
        fullName: "Nguyễn Ngọc Hưng",
        email: "hung.nn@tinasoft.vn",
      },
      accessToken: "access token refreshed",
      refreshToken: "refresh token",
    });
  });

  it("should fetch reject with refresh token fail", async () => {
    axiosMock.onGet("/get/me").reply(200, {
      success: false,
      errorCode: "AUTH000221",
      message: "Refresh token expired",
      data: null,
    });

    axiosMock.onPost("/auth/refresh-token").reply(200, {
      success: false,
      errorCode: "AUTH000222",
      message: "Refresh token invalid",
      data: null,
    });

    const config: AxiosRequestConfig = {
      url: "/get/me",
    };

    await expect(fetcher(config)).rejects.toEqual({
      errorCode: "AUTH000221",
      errorMessage: "Refresh token expired",
    });

    expect(Modal.confirm).toBeCalledWith({
      title: "Phiên đăng nhập hết hạn",
      content: "Vui lòng đăng nhập lại!",
      onOk: expect.any(Function),
    });
  });

  it("should fetch reject and force login", async () => {
    axiosMock.onGet("/get/me").reply(200, {
      success: false,
      errorCode: "AUTH000220",
      message: "Force login",
      data: null,
    });

    const config: AxiosRequestConfig = {
      url: "/get/me",
    };

    await expect(fetcher(config)).rejects.toEqual({
      errorCode: "AUTH000220",
      errorMessage: "Force login",
    });

    expect(Modal.confirm).toBeCalledWith({
      title: "Phiên đăng nhập hết hạn",
      content: "Vui lòng đăng nhập lại!",
      onOk: expect.any(Function),
      onCancel: expect.any(Function),
    });
  });

  it("should fetch reject and logout user", async () => {
    axiosMock.onGet("/get/me").reply(200, {
      success: false,
      errorCode: "JWT000201",
      message: "Require login to use this function",
      data: null,
    });

    const config: AxiosRequestConfig = {
      url: "/get/me",
    };

    await expect(fetcher(config)).rejects.toEqual({
      errorCode: "JWT000201",
      errorMessage: "Require login to use this function",
    });

    expect(Modal.confirm).toBeCalledWith({
      title: "Bạn chưa đăng nhập",
      content: "Vui lòng đăng nhập để sử dụng chức năng này!",
      onOk: expect.any(Function),
    });
  });

  it("should fetch reject and display error", async () => {
    axiosMock.onGet("/get/me").reply(200, {
      success: false,
      errorCode: "AUTH2000",
      message: "Server error",
      data: null,
    });

    const config: AxiosRequestConfig = {
      url: "/get/me",
    };

    await expect(
      fetcher(config, {
        displayError: true,
      })
    ).rejects.toEqual({
      errorCode: "AUTH2000",
      errorMessage: "Server error",
    });

    expect(notification.error).toBeCalledWith({
      message: "Something is wrong. Please try again",
      description: "Server error",
      duration: 3,
    });
  });

  it("should fetch reject and translate error message for notification", async () => {
    axiosMock.onGet("/get/me").reply(200, {
      success: false,
      errorCode: "unique.ValidatorInvalid",
      message: "Server error",
      data: null,
    });

    const config: AxiosRequestConfig = {
      url: "/get/me",
    };

    await expect(
      fetcher(config, {
        displayError: true,
      })
    ).rejects.toEqual({
      errorCode: "unique.ValidatorInvalid",
      errorMessage: "Server error",
    });

    expect(notification.error).toBeCalledWith({
      message: "Something is wrong. Please try again",
      description: "Lỗi validate",
      duration: 3,
    });
  });

  it("should fetch resolve using custom token", async () => {
    axiosMock.onGet("/get/me").reply((config) => {
      expect(config.headers?.Authorization).toEqual("Bearer custom token");
      return [
        200,
        {
          success: true,
          errorCode: "000000",
          message: "",
          data: {
            fullName: "Nguyễn Ngọc Hưng",
            username: null,
            email: "hung.nn@tinasoft.vn",
            isVerified: true,
            status: 1,
          },
        },
      ];
    });

    const config: AxiosRequestConfig = {
      url: "/get/me",
    };

    const res = await fetcher(config, {token: "custom token"});
    expect(res).toEqual({
      fullName: "Nguyễn Ngọc Hưng",
      username: null,
      email: "hung.nn@tinasoft.vn",
      isVerified: true,
      status: 1,
    });
  });
});
