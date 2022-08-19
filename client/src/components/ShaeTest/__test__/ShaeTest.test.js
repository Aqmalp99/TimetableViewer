import { render, screen } from "@testing-library/react";
import ShaeTest from "../ShaeTest";

it("renders calendar page correctly", () => {
  expect(render(<ShaeTest />)).not.toBeNull();
});

it("recommended times button should be disabled", () => {
  render(<ShaeTest />);
  expect(screen.getByRole('button', {name: /get recommended times/i})).toBeDisabled();
});
