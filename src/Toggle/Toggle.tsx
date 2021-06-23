import { Component } from "react";

import "./Toggle.css";

export interface ToggleAnswer {
  id: string;
  text: string;
}

export interface ToggleProps {
  id: string;
  answers: Array<ToggleAnswer>;
  selectedId: string;
  correctId: string;
}

export interface ToggleState {
  selectedIndex: number;
}

export class Toggle extends Component<ToggleProps, ToggleState> {
  constructor(props: ToggleProps) {
    super(props);
    this.state = {
      selectedIndex: this.props.answers.findIndex(
        (answer) => answer.id === this.props.selectedId
      ),
    };
  }

  selectAnswer(event: { target: { value: string } }) {
    this.setState({
      selectedIndex: this.props.answers.findIndex(
        (answer) => answer.id === event.target.value
      ),
    });
  }

  getSliderStyles() {
    return {
      left: `${(100 / this.props.answers.length) * this.state.selectedIndex}%`,
      width: `${100 / this.props.answers.length}%`,
    };
  }

  getAnswerStyles() {
    return {
      width: `${100 / this.props.answers.length}%`,
    };
  }

  render() {
    const listItems = this.props.answers.map(
      (answer: ToggleAnswer, index: number) => {
        const checked = this.state.selectedIndex === index;
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
              onChange={(e) => this.selectAnswer(e)}
              checked={checked}
            ></input>
            <label htmlFor={id} tabIndex={-1}>
              {answer.text}
            </label>
          </div>
        );
      }
    );

    return (
      <div className="Toggle">
        <div className="Toggle-slider" style={this.getSliderStyles()}></div>
        {listItems}
      </div>
    );
  }
}

export default Toggle;
