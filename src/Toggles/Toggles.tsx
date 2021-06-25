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
  gradientTopColor: string;
  gradientBottomColor: string;
  borderColor: string;
  answerColor: string;
  selectedAnswerColor: string;
  sliderColor: string;
}

export class Toggles extends Component<TogglesProps, TogglesState> {
  // Color steps order from incorreect -> correct
  theme = {
    gradientTopColor: ["#F1B496", "#F6B868", "#76E0C2"],
    gradientBottomColor: ["#EA806A", "#EE6B2D", "#59CADA"],
    textColor: ["#FFFFFF", "#FFFFFF", "#FFFFFF"],
    borderColor: ["#FBFBFB", "#F9D29F", "#FBFBFB"],
    answerColor: ["#FFFFFF", "#FFFFFF", "#FFFFFF"],
    selectedAnswerColor: ["#E47958", "#9F938B", "#4CAD94"],
    sliderColor: ["#F2CBBD", "#F8CAA3", "#A5E7E2"],
  };

  getClosestColor(colors: Array<string>, position: number) {
    return colors[Math.floor((colors.length - 1) * position)];
  }

  constructor(props: TogglesProps) {
    super(props);

    let questions: Array<Question>;

    if (this.props.disableShuffle) {
      // If shuffle is disabled set the selected answer to the first one
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
      ...this.getCorrectnessTheme(questions),
    };
  }

  isCorrect(questions: Array<Question>): boolean {
    return questions.reduce(
      (accumulator: boolean, question: Question) =>
        accumulator && question.correctAnswerId === question.selectedAnswerId,
      true
    );
  }

  getCorrectness(questions: Array<Question>): number {
    return (
      questions.reduce(
        (accumulator: number, question: Question) =>
          accumulator +
          (question.correctAnswerId === question.selectedAnswerId ? 1 : 0),
        0
      ) / questions.length
    );
  }

  private getCorrectnessTheme(questions: Array<Question>) {
    const correctness = this.getCorrectness(questions);

    return {
      gradientTopColor: this.getClosestColor(
        this.theme.gradientTopColor,
        correctness
      ),
      gradientBottomColor: this.getClosestColor(
        this.theme.gradientBottomColor,
        correctness
      ),
      borderColor: this.getClosestColor(this.theme.borderColor, correctness),
      answerColor: this.getClosestColor(this.theme.answerColor, correctness),
      selectedAnswerColor: this.getClosestColor(
        this.theme.selectedAnswerColor,
        correctness
      ),
      sliderColor: this.getClosestColor(this.theme.sliderColor, correctness),
    };
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
        ...this.getCorrectnessTheme(questions),
      };
    });
  }

  getContainerStyle() {
    return {
      background: `linear-gradient(180deg, ${this.state.gradientTopColor} 0%, ${this.state.gradientBottomColor} 100%)`,
      boxShadow: `0 0 10px ${this.state.gradientTopColor}`,
    };
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
        borderColor={this.state.borderColor}
        answerColor={this.state.answerColor}
        selectedAnswerColor={this.state.selectedAnswerColor}
        sliderColor={this.state.sliderColor}
        onChange={(selectedAnswerId) =>
          this.handleChange(question.id, selectedAnswerId)
        }
      ></Toggle>
    ));

    return (
      <div className="Toggles">
        <div
          className="Toggles-container"
          data-testid="toggles-container"
          style={this.getContainerStyle()}
        >
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
