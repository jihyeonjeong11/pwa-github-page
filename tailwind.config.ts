const config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}", "./node_modules/fumadocs-ui/dist/**/*.js"],
  prefix: "",
  theme: {
    // todo: Old color variable not working
    // extends: {
    //   colors: {
    //     background: "var(--primary-background)",
    //     windowBackground: "var(--primary-window-background)",
    //     windowHeaderFocused: "var(--primary-header-background)",
    //     windowHeaderBackground: "var(--secondary-header-background)",
    //   },
    // },
  },
};

export default config;
