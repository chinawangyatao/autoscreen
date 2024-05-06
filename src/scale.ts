import { debounce, throttle } from './utils'
import type { AutoScreenOptions } from './types'
import { AutoScreenEnum } from './types'

// * 屏幕缩放适配（两边留白）
export const useAutoScreen = (options: AutoScreenOptions & { mode: AutoScreenEnum }) => createCalcRateFn(options)

// * 屏幕缩放适配（两边留白）
export const useAutoScale = (options: AutoScreenOptions) => createCalcRateFn({ ...options, mode: AutoScreenEnum.FIT })

// *  X轴撑满，Y轴滚动条
export const useScrollYScale = (options: AutoScreenOptions) => createCalcRateFn({ ...options, mode: AutoScreenEnum.SCROLL_Y })

// *  Y轴撑满，X轴滚动条
export const useScrollXScale = (options: AutoScreenOptions) => createCalcRateFn({ ...options, mode: AutoScreenEnum.SCROLL_X })

// * 变形内容，宽高铺满
export const useFullScale = (options: AutoScreenOptions) => createCalcRateFn({ ...options, mode: AutoScreenEnum.FULL })

// * 计算缩放比例函数
function createCalcRateFn(options: AutoScreenOptions & { mode: AutoScreenEnum }) {
    const {
        // * 画布尺寸（px）
        width = 1920,
        height = 1080,
        el,
        mode,
        executeMode = 'throttle',
        waitTime = 200,
        beforeCalculate,
        afterCalculate,
    } = options

    // * 默认缩放值
    let scale = {
        widthRatio: 1,
        heightRatio: 1,
    }

    // * 需保持的比例
    const baseProportion = parseFloat((width / height).toFixed(5))
    const calcRate = () => {
        if (beforeCalculate) {
            const flag = beforeCalculate(scale)
            if (flag === false)
                return
        }

        if (el) {
            switch (mode) {
                case AutoScreenEnum.FIT: {
                    // 当前屏幕宽高比
                    const currentRate = parseFloat((window.innerWidth / window.innerHeight).toFixed(5))
                    // 比例越大，则越宽，基准值采用高度，计算出宽度
                    // 反之，则越高，基准值采用宽度，计算出高度
                    scale = currentRate > baseProportion
                        ? calcRateByHeight(width, height, baseProportion)
                        : calcRateByWidth(width, height, baseProportion)
                }
                    break

                case AutoScreenEnum.SCROLL_X:
                    scale = calcRateByHeight(width, height, baseProportion)
                    break

                case AutoScreenEnum.SCROLL_Y:
                    scale = calcRateByWidth(width, height, baseProportion)
                    break

                case AutoScreenEnum.FULL:
                    scale = calcRateByStretch(width, height)
                    break
            }

            el.style.transform = `scale(${scale.widthRatio}, ${scale.heightRatio})`
            if (afterCalculate)
                afterCalculate(scale)
        }else {
            console.error("必须指定一个元素！")
        }
    }

    let tFn = () => {}
    switch (executeMode) {
        case 'none':
            tFn = calcRate
            break
        case 'debounce':
            tFn = debounce(() => { calcRate() }, waitTime)
            break
        case 'throttle':
            tFn = throttle(() => { calcRate() }, waitTime, { trailing: true })
            break
        default:
            tFn = throttle(() => { calcRate() }, waitTime, { trailing: true })
            break
    }

    // * 改变窗口大小重新绘制
    const resize = () => {
        window.addEventListener('resize', tFn)
    }

    // * 改变窗口大小重新绘制
    const unResize = () => {
        window.removeEventListener('resize', tFn)
    }

    return {
        calcRate,
        resize,
        unResize,
    }
}

// * 以宽度为基准
function calcRateByWidth(baseWidth: number, baseHeight: number, baseProportion: number) {
    // 表示更高
    const heightRatio = parseFloat(((window.innerWidth / baseProportion) / baseHeight).toFixed(5))
    const widthRatio = parseFloat((window.innerWidth / baseWidth).toFixed(5))

    return { widthRatio, heightRatio }
}

// * 以高度为基准
function calcRateByHeight(baseWidth: number, baseHeight: number, baseProportion: number) {
    // 表示更宽
    const widthRatio = parseFloat(((window.innerHeight * baseProportion) / baseWidth).toFixed(5))
    const heightRatio = parseFloat((window.innerHeight / baseHeight).toFixed(5))

    return { widthRatio, heightRatio }
}

// * 拉伸
function calcRateByStretch(baseWidth: number, baseHeight: number) {
    // 表示更高
    const widthRatio = parseFloat((window.innerWidth / baseWidth).toFixed(5))
    const heightRatio = parseFloat((window.innerHeight / baseHeight).toFixed(5))

    return { widthRatio, heightRatio }
}
