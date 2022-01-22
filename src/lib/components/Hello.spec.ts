import { render } from '@testing-library/svelte';
import Hello from './Hello.svelte';

test('Hello world! displays by default', () => {
  const results = render(Hello);
  expect(results.container).toHaveTextContent('Hello world!');
});

test('Hello Chris displays when Chris is passed in as a prop', () => {
  const results = render(Hello, { name: 'Chris' });
  expect(results.container).toHaveTextContent('Hello Chris!');
});
