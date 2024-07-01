import "./index.scss";
import {Button, Row} from "antd";

interface ButtonSubmitProps {
  isSubmitting?: boolean;
  label: string;
  classRow?: string;
  handleClick?: () => void;
}

export function ButtonSubmit({
  isSubmitting,
  label,
  classRow,
  handleClick,
}: ButtonSubmitProps): JSX.Element {
  return (
    <Row className={`button-container ${classRow}`}>
      <Button
        className="button"
        type="primary"
        htmlType="submit"
        loading={isSubmitting}
        onClick={handleClick}
      >
        {label}
      </Button>
    </Row>
  );
}
