import { Component } from "react";
import Toggle, { Answer } from "../Toggle/Toggle";
import shuffle from "lodash/shuffle";
import random from "lodash/random";

import "./Toggles.css";

export interface Question {
  id: string;
  answers: Array<Answer>;
  selectedAnswerId: string;
  correctAnswerId: string;
}

export interface TogglesPropsQuestion {
  id: string;
  answers: Array<Answer>;
  correctAnswerId: string;
}

export interface TogglesProps {
  id: string;
  title: string;
  questions: Array<TogglesPropsQuestion>;
}

export interface TogglesState {
  questions: Array<Question>;
}

export class Toggles extends Component<TogglesProps, TogglesState> {
  constructor(props: TogglesProps) {
    super(props);

    // Shuffle the questions, answers and set random current selected answer
    this.state = {
      questions: shuffle(
        this.props.questions.map((question: TogglesPropsQuestion) => ({
          ...question,
          answers: shuffle(question.answers),
          selectedAnswerId:
            question.answers[random(0, question.answers.length - 1)].id,
        }))
      ),
    };
  }

  handleChange(questionId: string, selectedAnswerId: string) {
    console.log(questionId, selectedAnswerId);
    this.setState((prevState: TogglesState) => ({
      questions: prevState.questions.map((question: Question) => ({
        ...question,
        selectedAnswerId:
          question.id === questionId
            ? selectedAnswerId
            : question.selectedAnswerId,
      })),
    }));
  }

  render() {
    const toggleItems = this.state.questions.map((question: Question) => (
      <Toggle
        id={`${this.props.id}-${question.id}`}
        key={question.id}
        answers={question.answers}
        selectedAnswerId={question.selectedAnswerId}
        correctAnswerId={question.correctAnswerId}
        onChange={(selectedAnswerId) =>
          this.handleChange(question.id, selectedAnswerId)
        }
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
