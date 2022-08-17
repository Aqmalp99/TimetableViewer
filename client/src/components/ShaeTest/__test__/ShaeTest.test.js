import { render, screen } from "@testing-library/react";
import ShaeTest from "../ShaeTest";

it("renders calendar page correctly", () => {
  expect(render(<ShaeTest />)).not.toBeNull();
});
