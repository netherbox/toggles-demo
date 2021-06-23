import { Component } from 'react';
import Toggle, { ToggleProps } from '../Toggle/Toggle';

import './Toggles.css';

export interface TogglesProps {
  id: string;
  title: string;
  questions: Array<ToggleProps>;
}

export class Toggles extends Component<TogglesProps> {
  render() {
    const toggleItems = this.props.questions.map((toggle: ToggleProps) => (
      <Toggle
        id={`${this.props.id}-${toggle.id}`}
        answers={toggle.answers}
        selectedId={toggle.selectedId}
        correctId={toggle.correctId}
      ></Toggle>
    ));

    return (
      <div className="Toggles">
        <div className="Toggles-container">
          <div className="Toggles-title">{this.props.title}</div>
          <div className="Toggles-answers">{toggleItems}</div>
          <div className="Toggles-result">The answer is incorrect</div>
        </div>
      </div>
    );
  }
}

export default Toggles;
