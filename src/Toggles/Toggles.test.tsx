import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Toggles from "./Toggles";

test("should display is correct message if correct answer selected",async () => {
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

  fireEvent.click(screen.getByText('Valid answer'));

  await waitFor(() => {
    expect(screen.getByText('The answer is correct!')).toBeInTheDocument()
  })
});

test("should display is incorrect message if incorrect answer selected",async () => {
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

  fireEvent.click(screen.getByText('Invalid answer'));

  await waitFor(() => {
    expect(screen.getByText('The answer is incorrect')).toBeInTheDocument()
  })
});
