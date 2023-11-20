import { useReducer } from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
import "./App.css";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOper: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "0" && state.currentOper === "0") {
        return state;
      }
      if (payload.digit === "." && state.currentOper.includes(".")) {
        return state;
      }

      return {
        ...state,
        currentOper: `${state.currentOper || ""}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOper == null && state.previousOper == null) {
        return state;
      }

      if (state.currentOper == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      if (state.previousOper == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOper: state.currentOper,
          currentOper: null,
        };
      }
      return {
        ...state,
        previousOper: evaluate(state),
        operation: payload.operation,
        currentOper: null,
      };
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOper: null,
        };
      }
      if (state.currentOper == null) return state;
      if (state.currentOper.length == 1) {
        return { ...state, currentOper: null };
      }

      return {
        ...state,
        currentOper: state.currentOper.slice(0, -1),
      };
    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOper == null ||
        state.previousOper == null
      ) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        previousOper: null,
        operation: null,
        currentOper: evaluate(state),
      };
  }
}

function evaluate({ currentOper, previousOper, operation }) {
  const prev = parseFloat(previousOper);
  const current = parseFloat(currentOper);
  if (isNaN(prev) || isNaN(current)) return "";
  let computation = "";

  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
  }

  return computation.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat("cs-CZ", {
  maximumFractionDigits: 0,
});

function formatOperand(operand) {
  if (operand == null) return;
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

function App() {
  const [{ currentOper, previousOper, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {formatOperand(previousOper)} {operation}
        </div>
        <div className="current-operand">{formatOperand(currentOper)}</div>
      </div>
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
        DEL
      </button>
      <OperationButton operation="÷" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton className="round-left" digit="0" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <button
        className="round-right span-two"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        =
      </button>
    </div>
  );
}

export default App;
