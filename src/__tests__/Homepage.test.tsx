import { Button } from "@/components/common/button";
import { render, screen } from "@testing-library/react";

describe('Button Component', () => {
  it('renders a button element when asChild is false', () => {
    render(<Button>Click me</Button>);
    
    const button = screen.getByRole('button');
    expect(button.tagName).toBe('BUTTON');
    expect(button).toHaveTextContent('Click me');
  });
})