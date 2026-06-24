import js from "@eslint/js";
import ts from "typescript-eslint";
import react from "eslint-plugin-react";

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    plugins: { react },
    rules: {
      "react/jsx-key": "error",
      "react/jsx-no-target-blank": "error",
      "react/no-unescaped-entities": "error"
    }
  }
];
