import { render, screen } from '@testing-library/react';
import { Button } from '@/components/common/button';

describe('Button Component', () => {
  it('renders button component', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Click me');
  })
});
