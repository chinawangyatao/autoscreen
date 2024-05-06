import resolve from 'rollup-plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

export default {
    input: './src/index.ts', // 入口文件
    output: [
        {
            format: 'cjs', // 打包为commonjs格式
            file: 'lib/autoscreen.cjs.js', // 打包后的文件路径名称
            name: 'autoscreen' // 打包后的默认导出文件名称
        },
        {
            format: 'esm', // 打包为esm格式
            file: 'lib/autoscreen.esm.js',
            name: 'autoscreen'
        },
        {
            format: 'umd', // 打包为umd通用格式
            file: 'lib/autoscreen.umd.js',
            name: 'autoscreen',
            minifyInternalExports: true
        }
    ],
    plugins: [
        typescript({ tsconfig: './tsconfig.json' }),
        resolve()
    ]
}
