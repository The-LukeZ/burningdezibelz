import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      fontWeight: {
        hairline: "50",
        thin: "100",
        normal: "300",
      },
    },
  },

  plugins: [daisyui],
  daisyui: {
    themes: ["coffee"],
    dark: true,
    styled: true,
    utils: true,
    logs: false,
    prefix: "dy-",
  },
};
