import {render} from "@testing-library/react";
import {ButtonSubmit} from "@components/ButtonSubmit/index";

describe("Button submit", () => {
  // mock text button
  const labelProps = "test button";

  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      value: jest.fn(() => {
        return {
          matches: true,
          addListener: jest.fn(),
          removeListener: jest.fn(),
        };
      }),
    });
  });
  const setup = () =>
    render(<ButtonSubmit isSubmitting={false} label={labelProps} />);

  it("render text button correctly", () => {
    const {getByText} = setup();
    expect(getByText("test button")).toBeTruthy();
  });
});
