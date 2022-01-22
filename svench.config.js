import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  vite: {
    resolve: {
      alias: {
        $app: path.resolve(__dirname, '.svelte-kit/dev/runtime/app'),
        $lib: path.resolve(__dirname, 'src/lib'),
        $sveltefirets: path.resolve(__dirname, 'src/sveltefirets'),
      }
    }
  }
}