import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResultBox from './ResultBox';

describe('Component ResultBox', () => {
  const testConversionPLNTOUSD = [
    { amount: 100, expected: 'PLN 100.00 = $28.57' },
    { amount: 20, expected: 'PLN 20.00 = $5.71' },
    { amount: 200, expected: 'PLN 200.00 = $57.14' },
    { amount: 345, expected: 'PLN 345.00 = $98.57' },
  ];

  const testConversionUSDTOPLN = [
    { amount: 100, expected: '$100.00 = PLN 350.00' },
    { amount: 200, expected: '$200.00 = PLN 700.00' },
    { amount: 150, expected: '$150.00 = PLN 525.00' },
    { amount: 17, expected: '$17.00 = PLN 59.50' },
  ];

  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });

  for (const testObj of testConversionPLNTOUSD) {
    it('should render proper info about conversion when PLN -> USD', () => {
      render(<ResultBox from="PLN" to="USD" amount={testObj.amount} />);

      // find conversion
      const output = screen.getByTestId('output');

      expect(output).toHaveTextContent(testObj.expected);
    });
  }

  for (const testObj of testConversionUSDTOPLN) {
    it('should render proper info about conversion when USD -> PLN', () => {
      render(<ResultBox from="USD" to="PLN" amount={testObj.amount} />);

      // find conversion
      const output = screen.getByTestId('output');

      expect(output).toHaveTextContent(testObj.expected);
    });
  }

  it('should return false if value is < 0', () => {
    render(<ResultBox from="USD" to="PLN" amount={-1} />);

    // find conversion
    const output = screen.getByTestId('output-error');

    expect(output).toHaveTextContent('Wrong amount!');
  });
});
