import * as React from "react";
import "./Button.css";

interface IProps {
  buttonLabel?: string;
  disabled: boolean;
  onClick: () => void;
}

class Button extends React.Component<IProps> {
  public static defaultProps = {
    buttonLabel: "Do it"
  };
  public render() {
    return (
      <div className="buttons-container">
        <button
          className="button"
          onClick={this.handleClick}
          disabled={this.props.disabled}
        >
          {this.props.buttonLabel}
        </button>
      </div>
    );
  }

  private handleClick = () => {
    this.props.onClick();
  };
}

export default Button;
