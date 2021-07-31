import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import dev from 'rollup-plugin-dev';
import sveltePreprocess from 'svelte-preprocess';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.ts',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js',
        inlineDynamicImports: true,
	},
	plugins: [
		svelte({
			preprocess: [
				sveltePreprocess({ sourceMap: !production }),
			],
			compilerOptions: {
				dev: !production
			}
		}),
		
		css({ output: 'bundle.css' }),

		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		typescript({
			sourceMap: !production,
			inlineSources: !production
		}),

		!production && livereload('public'),
        !production && dev({
			port: 5000,
			dirs: ['public']
		}),

		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
