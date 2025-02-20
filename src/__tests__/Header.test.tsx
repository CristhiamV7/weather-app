import { render, screen } from '@testing-library/react';
import Header from '@/components/header/header';

describe('Header Component', () => {
  it('renders the title "Weather Application"', () => {
    render(<Header />);
    const title = screen.getByText('Weather Application');
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('text-2xl font-semibold');
  });

  it('renders the ToggleTheme component', () => {
    render(<Header />);
    const toggleThemeButton = screen.getByRole('button');
    expect(toggleThemeButton).toBeInTheDocument();
  });
});
