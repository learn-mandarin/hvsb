const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            'line-height': 1.5,
            p: {
              'margin-top': '0',
            },
          },
        },
        lg: {
          css: {
            p: {
              'margin-top': '0',
            },
          },
        },
      },
      colors: {
        green: colors.emerald, // can find-replace these to remove
        yellow: colors.amber, // can find-replace to remove
        primary: colors.indigo,
      },
      screens: {
        print: { raw: 'print' },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
