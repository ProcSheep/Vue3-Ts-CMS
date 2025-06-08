import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import { off } from 'process'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    plugins: {
      js // js插件
    },
    extends: [
      'js/recommended', // eslint中推荐的js规则,来自js插件
      ...tseslint.configs.recommended, // ts推荐规则
      eslintConfigPrettier, // prettier规则优先于eslint
      eslintPluginPrettierRecommended // 将pre规则集成到esl中,并且pre的格式化问题会报告为esl警告
    ],
    rules: {
      // 大多数规则自己别写了,用eslint自带的
      'vue/multi-word-component-names': off // 对特别的不合适的规则,根据提示自己取消掉
    }
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    languageOptions: { globals: globals.browser }
  },
  {
    files: ['**/*.vue'],
    plugins: {
      vue: pluginVue // vue插件
    },
    extends: [
      ...pluginVue.configs['flat/essential'] // vue推荐规则,看文档
      // 'vue/flat/essential'
      // 'vue/vue3-essential'
    ],
    languageOptions: {
      parserOptions: { parser: tseslint.parser },
      ecmaVersion: 2020
    }
  },
  {
    ignores: [
      'node_modules',
      'dist',
      'build',
      '.git',
      '.vscode',
      '.idea',
      '*.min.js',
      '*.map',
      '*.svg',
      '*.png',
      '*.jpg',
      '*.woff',
      '*.ttf',
      '*.md',
      'package-lock.json',
      'yarn.lock',
      '.env'
    ]
  }
])
