import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Toggles from "./Toggles";

describe("Correct message", () => {
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

describe("Lock if correct", () => {
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
