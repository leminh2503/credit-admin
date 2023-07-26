import {fetcher} from "@api/Fetcher";
import axios, {AxiosRequestConfig} from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("test fetcher", () => {
  it("fetch success", async () => {
    // TODO: Fix type error
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mockedAxios.create.mockImplementation(() => {
      return {
        request: jest.fn(() => {
          return Promise.resolve({
            data: {
              success: true,
              data: {
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
                meta: {},
              },
            },
          });
        }),
      };
    });

    const config: AxiosRequestConfig = {
      url: "/get/me",
    };

    const res = await fetcher(config);
    expect(res).toEqual({
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
      meta: {},
    });
  });
});
