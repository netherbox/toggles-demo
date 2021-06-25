import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Toggle from "./Toggle";

test("should not change if locked", async () => {
  const handleChange = jest.fn()

  render(
    <Toggle
      id="q1"
      answers={[
        { id: "a1", text: "Valid answer" },
        { id: "a2", text: "Invalid answer" },
      ]}
      selectedAnswerId="a2"
      correctAnswerId="a1"
      locked={true}
      onChange={handleChange}
    />
  );

  fireEvent.click(screen.getByText("Valid answer"));

  expect(handleChange).not.toHaveBeenCalled();
});

test("should change answer if unlocked", async () => {
  const handleChange = jest.fn()

  render(
    <Toggle
      id="q1"
      answers={[
        { id: "a1", text: "Valid answer" },
        { id: "a2", text: "Invalid answer" },
      ]}
      selectedAnswerId="a2"
      correctAnswerId="a1"
      locked={false}
      onChange={handleChange}
    />
  );

  fireEvent.click(screen.getByText("Valid answer"));

  expect(handleChange).toHaveBeenCalledTimes(1);
});
