import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Toggles from "./Toggles";

describe("Should show correct/incorrect message", () => {
  it("should display is correct message if answer is correct", async () => {
    render(
      <Toggles
        id="t1"
        title="Really easy question:"
        questions={[
          {
            id: "q1",
            answers: [
              { id: "a1", text: "Valid answer" },
              { id: "a2", text: "Invalid answer" },
            ],
            correctAnswerId: "a1",
          },
        ]}
        disableShuffle={true}
      />
    );

    expect(screen.getByText("The answer is correct!")).toBeInTheDocument();
  });

  it("should display is incorrect message if answer is incorrect", async () => {
    render(
      <Toggles
        id="t1"
        title="Really easy question:"
        questions={[
          {
            id: "q1",
            answers: [
              { id: "a2", text: "Invalid answer" },
              { id: "a1", text: "Valid answer" },
            ],
            correctAnswerId: "a1",
          },
        ]}
        disableShuffle={true}
      />
    );

    expect(screen.getByText("The answer is incorrect")).toBeInTheDocument();
  });
});

describe("The solution should lock once the correct answer is reached so the toggles can no longer be switched", () => {
  it("should allow to change answer if incorrect", async () => {
    render(
      <Toggles
        id="t1"
        title="Really easy question:"
        questions={[
          {
            id: "q1",
            answers: [
              { id: "a2", text: "Invalid answer" },
              { id: "a1", text: "Valid answer" },
            ],
            correctAnswerId: "a1",
          },
        ]}
        disableShuffle={true}
      />
    );

    expect(screen.getByText("The answer is incorrect")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Valid answer"));

    await waitFor(() => {
      expect(screen.getByText("The answer is correct!")).toBeInTheDocument();
    });
  });

  it("should not allow to change answer if correct", async () => {
    render(
      <Toggles
        id="t1"
        title="Really easy question:"
        questions={[
          {
            id: "q1",
            answers: [
              { id: "a1", text: "Valid answer" },
              { id: "a2", text: "Invalid answer" },
            ],
            correctAnswerId: "a1",
          },
        ]}
        disableShuffle={true}
      />
    );

    expect(screen.getByText("The answer is correct!")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Invalid answer"));

    await waitFor(() => {
      expect(screen.getByText("The answer is correct!")).toBeInTheDocument();
    });
  });
});

describe('The background color should change in proportion to how "correct" the answer is', () => {
  it("should set the colors to red if all three answers are incorrect", async () => {
    const { container } = render(
      <Toggles
        id="t1"
        title="Really easy question:"
        questions={[
          {
            id: "q1",
            answers: [
              { id: "a2", text: "Invalid answer 1" },
              { id: "a1", text: "Valid answer 1" },
            ],
            correctAnswerId: "a1",
          },
          {
            id: "q2",
            answers: [
              { id: "a2", text: "Invalid answer 2" },
              { id: "a1", text: "Valid answer 2" },
            ],
            correctAnswerId: "a1",
          },
          {
            id: "q3",
            answers: [
              { id: "a2", text: "Invalid answer 3" },
              { id: "a1", text: "Valid answer 3" },
            ],
            correctAnswerId: "a1",
          },
        ]}
        disableShuffle={true}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should set the colors to red if one of the answers in incorrect", async () => {
    const { container } = render(
      <Toggles
        id="t1"
        title="Really easy question:"
        questions={[
          {
            id: "q1",
            answers: [
                { id: "a1", text: "Valid answer 1" },
                { id: "a2", text: "Invalid answer 1" },
            ],
            correctAnswerId: "a1",
          },
          {
            id: "q2",
            answers: [
              { id: "a2", text: "Invalid answer 2" },
              { id: "a1", text: "Valid answer 2" },
            ],
            correctAnswerId: "a1",
          },
          {
            id: "q3",
            answers: [
              { id: "a2", text: "Invalid answer 3" },
              { id: "a1", text: "Valid answer 3" },
            ],
            correctAnswerId: "a1",
          },
        ]}
        disableShuffle={true}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should set the colors to orange if two of the answers in incorrect", async () => {
    const { container } = render(
      <Toggles
        id="t1"
        title="Really easy question:"
        questions={[
          {
            id: "q1",
            answers: [
              { id: "a1", text: "Valid answer 1" },
              { id: "a2", text: "Invalid answer 1" },
            ],
            correctAnswerId: "a1",
          },
          {
            id: "q2",
            answers: [
              { id: "a1", text: "Valid answer 2" },
              { id: "a2", text: "Invalid answer 2" },
            ],
            correctAnswerId: "a1",
          },
          {
            id: "q3",
            answers: [
              { id: "a2", text: "Invalid answer 3" },
              { id: "a1", text: "Valid answer 3" },
            ],
            correctAnswerId: "a1",
          },
        ]}
        disableShuffle={true}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should set the colors to green if all three answers are correct", async () => {
    const { container } = render(
      <Toggles
        id="t1"
        title="Really easy question:"
        questions={[
          {
            id: "q1",
            answers: [
              { id: "a1", text: "Valid answer 1" },
              { id: "a2", text: "Invalid answer 1" },
            ],
            correctAnswerId: "a1",
          },
          {
            id: "q2",
            answers: [
              { id: "a1", text: "Valid answer 2" },
              { id: "a2", text: "Invalid answer 2" },
            ],
            correctAnswerId: "a1",
          },
          {
            id: "q3",
            answers: [
              { id: "a1", text: "Valid answer 3" },
              { id: "a2", text: "Invalid answer 3" },
            ],
            correctAnswerId: "a1",
          },
        ]}
        disableShuffle={true}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
