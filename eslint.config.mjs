import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // 先套用 next 的预设（这些可能会开启 no-explicit-any）
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // 忽略
  { ignores: ["src/components/ui/dist/**"] },

  // ⭐ 放在最后：覆盖前面的规则设置
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default eslintConfig;
