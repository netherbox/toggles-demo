import React from "react";
import "./App.css";
import Toggles from "./Toggles/Toggles";

function App() {
  return (
    <div className="App">
      <h1>Toggles component demo</h1>
      <Toggles
        id="t1"
        title="An animal cell contains:"
        questions={[
          {
            id: "q1",
            answers: [
              { id: "a1", text: "Cell wall" },
              { id: "a2", text: "Ribosomes" },
            ],
            correctAnswerId: "a1",
          },
          {
            id: "q2",
            answers: [
              { id: "a1", text: "Cytoplasm" },
              { id: "a2", text: "Chroloplast" },
            ],
            correctAnswerId: "a2",
          },
          {
            id: "q3",
            answers: [
              { id: "a1", text: "Partially permeable membrane" },
              { id: "a2", text: "Impermeable membrane" },
            ],
            correctAnswerId: "a2",
          },
          {
            id: "q4",
            answers: [
              { id: "a1", text: "Cellulose" },
              { id: "a2", text: "Mitochondria" },
            ],
            correctAnswerId: "a2",
          },
        ]}
      />

      <Toggles
        id="t2"
        title="What are the ideal conditions inside an office?"
        questions={[
          {
            id: "q1",
            answers: [
              { id: "a1", text: "good pay" },
              { id: "a2", text: "bad pay" },
            ],
            correctAnswerId: "a1",
          },
          {
            id: "q2",
            answers: [
              { id: "a1", text: "free coffee" },
              { id: "a2", text: "expensive coffee" },
            ],
            correctAnswerId: "a1",
          },
          {
            id: "q3",
            answers: [
              { id: "a1", text: "bear in office" },
              { id: "a2", text: "dog in office" },
            ],
            correctAnswerId: "a2",
          },
        ]}
      />

      <Toggles
        id="t3"
        title="Which are the best sports people & teams?"
        questions={[
          {
            id: "q1",
            answers: [
              { id: "a1", text: "Liverpool" },
              { id: "a2", text: "Chelsea" },
              { id: "a3", text: "Man Utd" },
            ],
            correctAnswerId: "a1",
          },
          {
            id: "q2",
            answers: [
              { id: "a1", text: "Serena Williams" },
              { id: "a2", text: "Naomi Osaka" },
            ],
            correctAnswerId: "a2",
          },
        ]}
      />
    </div>
  );
}

export default App;
