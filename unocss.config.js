import { defineConfig, presetAttributify, presetIcons, presetUno, presetWebFonts } from 'unocss'

export default defineConfig({
  exclude: ['node_modules', '.git', '.github', '.husky', '.vscode', 'build', 'dist', 'mock', 'public', './stats.html'],
  shortcuts: [
    ['f-c-c', 'flex justify-center items-center'],
    [
      'btn',
      'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50',
    ],
    [
      'icon-btn',
      'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600',
    ],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    /*     presetIcons({
      scale: 1.2,
      warn: true,
    }), */
    /*     presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }), */
  ],
  rules: [
    [
      'card-shadow' /* 边框阴影 */,
      {
        'box-shadow': '0 1px 2px -2px #00000029, 0 3px 6px #0000001f, 0 5px 12px 4px #00000017',
      },
    ],
    [/^bc-(.+)$/, ([, color]) => ({ 'border-color': `#${color}` })],
  ],
  theme: {
    colors: {
      primary: 'var(--primary-color)',
    },
  },
})
