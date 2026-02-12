import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import pkg from './package.json';

export default defineConfig({
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    compatConfig: {
                        MODE: 2
                    }
                }
            }
        })
    ],
    resolve: {
        alias: {
            vue: '@vue/compat',
            '@': path.resolve(__dirname, 'src'),
            '~': path.resolve(__dirname, 'node_modules'), // Handing '~' for imports if needed
        },
        extensions: ['.js', '.vue', '.json'],
    },
    define: {
        'process.env.VERSION': JSON.stringify(pkg.version),
        'VERSION': JSON.stringify(pkg.version),
        // Compatibility for process.env usage in code
        'process.env': process.env,
    },
    server: {
        port: 8080,
    },
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: true,
    },
    // Handle static assets
    publicDir: 'static',
});
