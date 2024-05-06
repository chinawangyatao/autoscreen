# autoscreen
## 大屏可视化，自动自适应插件
## 支持 vue、react

### 安装
```npm
npm install autoscreen
```
```yarn
yarn add autoscreen
```

### 使用
react：
```jsx
import React, { useEffect } from 'react';
import { useAutoScreen, AutoScreenEnum } from './index';

function App() {
  useEffect(() => {
    const options = {
      width: 1920,
      height: 1080,
      el: document.getElementById('canvas'),
      mode: AutoScreenEnum.FIT
    };
    const { resize, unResize } = useAutoScreen(options);
    resize(); // 添加窗口大小变化监听
    return () => {
      unResize(); // 移除窗口大小变化监听
    };
  }, []);

  return (
    <div id="canvas">
      {/* 你的画布内容 */}
    </div>
  );
}

export default App;

```

vue
```vue
<template>
  <div ref="canvas">
    <!-- 你的画布内容 -->
  </div>
</template>

<script>
import { onMounted, onUnmounted } from 'vue';
import { useAutoScreen, AutoScreenEnum } from './index';

export default {
  setup() {
    const canvasRef = ref(null);

    onMounted(() => {
      const options = {
        width: 1920,
        height: 1080,
        el: canvasRef.value,
        mode: AutoScreenEnum.FIT
      };
      const { resize, unResize } = useAutoScreen(options);
      resize(); // 添加窗口大小变化监听
      onUnmounted(() => {
        unResize(); // 移除窗口大小变化监听
      });
    });

    return { canvasRef };
  }
};
</script>

```

### options 参数的详细解释：

* useAutoScreen
  * width （可选）：画布的宽度，默认为 1920。
  
  * height（可选）：画布的高度，默认为 1080。
  
  * el    （必填）：要缩放的元素对象，通常是一个 DOM 元素。
  
  * mode  （必填）：屏幕缩放的模式，可选值为 AutoScreenEnum.FIT、AutoScreenEnum.SCROLL_X、AutoScreenEnum.SCROLL_Y、AutoScreenEnum.FULL，分别表示两边留白、X 轴滚动条、Y 轴滚动条、铺满整个屏幕。


* useAutoScale
  * width （可选）：画布的宽度，默认为 1920。
  
  * height（可选）：画布的高度，默认为 1080。
  
  * el    （必填）：要缩放的元素对象，通常是一个 DOM 元素。


* useScrollYScale
     
  * width （可选）：画布的宽度，默认为 1920。
       
  * height（可选）：画布的高度，默认为 1080。
       
  * el    （必填）：要缩放的元素对象，通常是一个 DOM 元素。
     

* useScrollXScale
  * width （可选）：画布的宽度，默认为 1920。
  
  * height（可选）：画布的高度，默认为 1080。
  
  * el    （必填）：要缩放的元素对象，通常是一个 DOM 元素。
     

* useFullScale
  * width  （可选）：画布的宽度，默认为 1920。
  
  * height （可选）：画布的高度，默认为 1080。
  
  * el     （必填）：要缩放的元素对象，通常是一个 DOM 元素。
