import { Component } from "react";

import "./Toggle.css";

export interface Answer {
  id: string;
  text: string;
}

export interface ToggleProps {
  id: string;
  answers: Array<Answer>;
  selectedAnswerId: string;
  correctAnswerId: string;
  locked: boolean;
  onChange: (answerId: string) => void;
}

export class Toggle extends Component<ToggleProps> {
  constructor(props: ToggleProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: { target: { value: string } }) {
    this.props.onChange(event.target.value);
  }

  getSliderStyles() {
    const index = this.props.answers.findIndex(
      (answer) => answer.id === this.props.selectedAnswerId
    );

    return {
      left: `${(100 / this.props.answers.length) * index}%`,
      width: `${100 / this.props.answers.length}%`,
    };
  }

  getAnswerStyles() {
    return {
      width: `${100 / this.props.answers.length}%`,
    };
  }

  render() {
    if (!this.props.answers.length) {
      return null;
    }

    const listItems = this.props.answers.map((answer: Answer) => {
      const checked = this.props.selectedAnswerId === answer.id;
      const id = `${this.props.id}-${answer.id}`;
      return (
        <div
          className={"Toggle-answer" + (checked ? " selected" : "")}
          style={this.getAnswerStyles()}
          key={answer.id}
        >
          <input
            type="radio"
            id={id}
            name={this.props.id}
            value={answer.id}
            onChange={this.handleChange}
            checked={checked}
            disabled={this.props.locked}
          ></input>
          <label htmlFor={id} tabIndex={-1}>
            {answer.text}
          </label>
        </div>
      );
    });

    return (
      <div className={"Toggle" + (this.props.locked ? ' locked' : '')}>
        <div className="Toggle-slider" style={this.getSliderStyles()} data-testid="slider"></div>
        {listItems}
      </div>
    );
  }
}

export default Toggle;
