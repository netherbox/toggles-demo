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
  borderColor: string;
  answerColor: string;
  selectedAnswerColor: string;
  sliderColor: string;
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

  getContainerStyle(): React.CSSProperties {
    return {
      borderColor: this.props.borderColor,
    };
  }

  getSliderStyles() {
    const index = this.props.answers.findIndex(
      (answer) => answer.id === this.props.selectedAnswerId
    );

    return {
      left: `${(100 / this.props.answers.length) * index}%`,
      width: `${100 / this.props.answers.length}%`,
      backgroundColor: this.props.sliderColor,
      borderColor: this.props.sliderColor,
    };
  }

  getAnswerStyles() {
    return {
      width: `${100 / this.props.answers.length}%`,
    };
  }

  getAnswerLabelStyles(selected: boolean) {
    return {
      color: selected ? this.props.selectedAnswerColor : this.props.answerColor,
    };
  }

  render() {
    if (!this.props.answers.length) {
      return null;
    }

    const listItems = this.props.answers.map((answer: Answer) => {
      const selected = this.props.selectedAnswerId === answer.id;
      const id = `${this.props.id}-${answer.id}`;
      return (
        <div
          className={"Toggle-answer" + (selected ? " selected" : "")}
          style={this.getAnswerStyles()}
          key={answer.id}
        >
          <input
            type="radio"
            id={id}
            name={this.props.id}
            value={answer.id}
            onChange={this.handleChange}
            checked={selected}
            disabled={this.props.locked}
          ></input>
          <label
            htmlFor={id}
            tabIndex={-1}
            style={this.getAnswerLabelStyles(selected)}
          >
            {answer.text}
          </label>
        </div>
      );
    });

    return (
      <div
        className={"Toggle" + (this.props.locked ? " locked" : "")}
        style={this.getContainerStyle()}
      >
        <div
          className="Toggle-slider"
          style={this.getSliderStyles()}
          data-testid="slider"
        ></div>
        {listItems}
      </div>
    );
  }
}

export default Toggle;
