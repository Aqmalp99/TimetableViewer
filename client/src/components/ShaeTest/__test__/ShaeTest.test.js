import { render, screen, cleanup } from "@testing-library/react";
import ShaeTest from "../ShaeTest";

it("renders calendar page correctly", () => {
  expect(render(<ShaeTest />)).not.toBeNull();
});

it("without selecting an event, recommended times button should be disabled", () => {
  render(<ShaeTest />);
  expect(screen.getByRole('button', {name: /get recommended times/i})).toBeDisabled();
});
