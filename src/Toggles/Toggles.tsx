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
  disableShuffle?: boolean;
}

export interface TogglesState {
  questions: Array<Question>;
  isCorrect: boolean;
}

export class Toggles extends Component<TogglesProps, TogglesState> {
  constructor(props: TogglesProps) {
    super(props);

    let questions: Array<Question>;

    if (this.props.disableShuffle) {
      questions = this.props.questions.map(
        (question: TogglesPropsQuestion) => ({
          ...question,
          answers: question.answers,
          selectedAnswerId: question.answers[0].id,
        })
      );
    } else {
      // Shuffle the questions, answers and set random current selected answer
      questions = shuffle(
        this.props.questions.map((question: TogglesPropsQuestion) => ({
          ...question,
          answers: shuffle(question.answers),
          selectedAnswerId:
            question.answers[random(0, question.answers.length - 1)].id,
        }))
      );
    }

    this.state = {
      questions,
      isCorrect: this.isCorrect(questions),
    };
  }

  isCorrect(questions: Array<Question>): boolean {
    return questions.reduce(
      (accumulator: boolean, question: Question) =>
        accumulator && question.correctAnswerId === question.selectedAnswerId,
      true
    );
  }

  handleChange(questionId: string, selectedAnswerId: string) {
    this.setState((prevState: TogglesState) => {
      const questions = prevState.questions.map((question: Question) => ({
        ...question,
        selectedAnswerId:
          question.id === questionId
            ? selectedAnswerId
            : question.selectedAnswerId,
      }));

      return {
        questions,
        isCorrect: this.isCorrect(questions),
      };
    });
  }

  render() {
    const toggleItems = this.state.questions.map((question: Question) => (
      <Toggle
        id={`${this.props.id}-${question.id}`}
        key={question.id}
        answers={question.answers}
        selectedAnswerId={question.selectedAnswerId}
        correctAnswerId={question.correctAnswerId}
        locked={this.state.isCorrect}
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
          <div className="Toggles-result">
            {this.state.isCorrect
              ? "The answer is correct!"
              : "The answer is incorrect"}
          </div>
        </div>
      </div>
    );
  }
}

export default Toggles;
