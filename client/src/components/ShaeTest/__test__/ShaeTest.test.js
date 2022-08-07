import { render, screen } from "@testing-library/react";
import ShaeTest from "../ShaeTest";

it("render text my app", () => {
  render(<ShaeTest />);
  const element = screen.getByText(/my app/i);
  expect(element).toBeInTheDocument();
});
