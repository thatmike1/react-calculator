# React Calculator

This project is a simple calculator application built using React and Vite. It provides basic arithmetic operations such as addition, subtraction, multiplication, and division. The application does not use any math libraries and all calculations are performed using JavaScript's built-in arithmetic operators.

## Main Components

- `App`: This is the main component of the application. It uses the useReducer hook to manage the state of the calculator. The state includes the current and previous operands, as well as the chosen operation. The App component also renders the calculator grid and handles user interactions such as clicking on digits, operations, and other buttons.

- `DigitButton`: This component represents a button for a digit. It dispatches an ADD_DIGIT action when clicked.

- `OperationButton`: This component represents a button for an operation (addition, subtraction, multiplication, division). It dispatches a CHOOSE_OPERATION action when clicked.
