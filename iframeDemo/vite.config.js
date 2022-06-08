import { defineConfig } from 'vite'
import vue from "@vitejs/plugin-vue";
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import styleImport, { VantResolve } from 'vite-plugin-style-import';
const path = require('path');
export default defineConfig({
    base: './', // 打包路径
    plugins: [
        vue(),
        vueJsx(),
        styleImport({
            resolves: [VantResolve()],
            libs: [
                {
                    libraryName: "vant",
                    esModule: true,
                    resolveStyle: (name) => {
                        return `../es/${name}/style/index`;
                    },
                },
            ]
        }),
        createSvgIconsPlugin({
            // 指定要缓存的图标文件夹
            iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
            // 执行icon name的格式
            symbolId: 'icon-[dir]-[name]'
        }),
    ],
    resolve: {
        //配置别名
        alias: {
            '@': '/src',
            'components': '/src/components',
            'styles': '/src/styles',
            'assets': '/src/assets'
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']//这里用了默认
    },
    css: {
        // css预处理器
        preprocessorOptions: {
            scss: {
                // 引入 var.scss 这样就可以在全局中使用 var.scss中预定义的变量了
                additionalData: '@import "@/styles/var.scss";'
            }
        }
    },
    server: {
        host: '0.0.0.0',//这里是服务器ip 写出0.0.0.就可以
        port: 8081,
        open: true, // 自动运行在浏览器中
        proxy: { //跨域代理

        }
    }
})