# enhanced-framer-motion

> 修炼 framer-motion

## 01 level up

### Motion Element

![01-01](./previews/01-01.gif)

- `framer-motion` 还是对 css 的封装

### Animate Prop

```js
 <motion.h2 animate={{ x: value * 2 + 'px', opacity: isToggle }}>
  Super Cool
</motion.h2>
<button onClick={() => setIsToggle((prev) => (prev ? 0 : 1))}>
  Toggle
</button>
<input
  type="range"
  min="-100"
  max="100"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

### Animate Presence

> 跟出入场相关的动画要用 `<AnimatePresence></AnimatePresence>` 包一下

### Modal

结合以上特性来个 Modal

```js
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const Modal = ({ isToggled, setToggle, children }) => {
  return (
    <AnimatePresence>
      {isToggled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            top: 30,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <motion.div initial={{ y: 50 }} animate={{ y: 0 }}>
            <button onClick={() => setToggle(false)}>Close</button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
```

### keyframes

> 帧

![01-keyframes](./previews/01-keyframes.png)

### variants

引入变量的概念及使用

```js
const variants = {
  open: { opacity: 1, height: 'auto' },
  closed: { opacity: 0, height: 0 },
};

<motion.div
  variants={variants}
  style={{ overflow: 'hidden' }}
  initial="closed"
  animate="open"
  exit="closed"
>
```

### Mobile Nav

因为是 `unmount`，所以不需要包裹 `AnimatePresence`

```js
const variants = {
  open: { x: 0 },
  closed: { x: "-100%" },
};

<MenuNav
  variants={variants}
  initial="closed"
  animate={isNavOpen ? "open" : "closed"}
  transition={{ damping: 300 }}
>

```

### Orchestration

- 让子元素按顺序播放~
- 或者说是编排子元素的播放顺序~

```js
const ulVariants = {
  open: {
    scale: 1.05,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
      staggerDirection: 1,
      when: "afterChildren", // beforeChildren, afterChildren
    },
  },
  closed: {
    scale: 1,
  },
};
```

### Gestures

> 鼠标手势动效

- 可以只有一个动效
  - `whileHover={{scale: 1.2}}`
- 也可以是一连串的动效，用数组包起来
  - `whileHover={{scale: [1.02, 0.8, 1.3]}}`
- 控制手势相关动效

```js
<Card
  whileHover={{ scale: [1.02, 0.8, 1.3] }}
  whileTap={{ background: "var(--red)" }}
  onHoverEnd={() => console.log("~~onHoverEnd~~")}
  style={{ background: "var(--black)" }}
>
```

### Drag

> 拖拽一定要限制好范围

```js
<Card
  drag
  dragConstraints={{
    top: -100,
    left: -100,
    right: 100,
    bottom: 100,
  }}
  style={{ background: "var(--purp)" }}
>
  <h3>Some card</h3>
  <img src={purp} />
</Card>
<Card
  drag="x"
  dragConstraints={{
    left: 0,
    right: 0,
  }}
  style={{ background: "var(--blue)" }}
>
```

### useMotionValue & useTransform

![01-useMotionValue](./previews/01-useMotionValue.png)

### drag project

![01-drag-project](./previews/01-drag-project.png)

> 为什么要做这个优化？因为 dragConstraints 相对设置了 0，当 onDragEnd 时，Card 还要返回原地！

![01-drag-project](./previews/01-drag-project0.gif)

![01-drag-project](./previews/01-drag-project1.gif)

### Position Transition

![01-PositionTransition](./previews/01-PositionTransition.gif)

```js
<div>
  <button onClick={() => setColorsList(shuffle(colorsList))}>Shuffle</button>
  {colorsList.map((color) => (
    <motion.div
      key={color}
      positionTransition={{
        damping: 100,
        stiffness: 1,
      }}
      style={{
        background: color,
        height: 100,
        width: 100,
      }}
    />
  ))}
</div>
```

### slideshow

自定义变量，控制动效。

```js
const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -1000 : 1000,
    opacity: 0,
  }),
};
```

---

## 02 swipe-to-enlarge

## 预览

[https://hifive.yna.app/](https://hifive.yna.app/)

![02](./previews/preview02.gif)

### 结构

```js
function App() {
  return (
    <>
      <Header />
      <Breadcrumb />
      <Product />
      <Spec />
    </>
  );
}
```

- Header
  - 最外层 .header 是个 div 不需要设 width，设个高度即可
  - 内层盒子用 flex 的 align-item 居中，设下高度 100%
  - 最内层盒子 flex 的往两边排布，设下宽度 100% 撑开

```scss
.header {
  height: 72px;
  .header-inner {
    padding: 0 32px;
    display: flex;
    align-items: center;
    height: 100%;
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      .logo {
        position: relative;
        width: 85px;
        display: flex;
        align-items: center;
        img {
          width: 85px;
        }
      }
    }
  }
}
```

- Product 的结构
  - 产品图上方部分为产品描述
  - 产品图部分
  - 产品图下方部分为产品参数
- 产品图为核心部分，其又依次分为：
  1. background 遮盖层
  2. drag-header 预览时的头部
  3. 真正的产品图
  4. product-drag 预览时的尾部(含进度条)

```js
const Product = () => {
  return (
    <div className="product">
      <div className="product-inner">
        <div className="product-content">
          <div className="product-content-inner">
            {/* some desc... */}
            <div className="btn-row">
              <button>Buy Now ($59)</button>
              <DownArrow />
            </div>
          </div>
        </div>
      </div>
      <div className="product-slide-enlarge">
        <div className="background"></div>
        <div className="product-drag-header">
          <div className="company-name">HiFive1</div>
          <div className="close">
            <Close />
          </div>
        </div>
        <div className="product-container">
          <div className="product-image">
            <img src={ProductImage} alt="product" />
          </div>
        </div>
        <div className="product-drag">
          <div className="product-drag-inner">
            <div className="product-drag-label">{/* preview header */}</div>
            <div className="product-drag-progress-background">
              <div className="product-drag-progress"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
```

### 步骤

- 产品图允许水平滑动浏览
  - `drag={'x'}` 仅允许 x 轴
  - `dragConstraints={{ left: -1060, right: 0 }}` 活动范围
  - `dragElastic={0.05}` 拖拽的灵活度，相当于在 x 轴上到了限值后的偏差(到了限值再多动一点的意思)

```js
<motion.div
  drag={"x"}
  dragConstraints={{ left: -1060, right: 0 }}
  dragElastic={0.05}
  className="product-image"
>
  <img src={ProductImage} alt="product" />
</motion.div>
```

- 跟随进度条

```js
const width = useTransform(x, [-1060, 0], [350, 0]);

// --------

<div className="product-container">
  <motion.div
    style={{ x }}
    drag={'x'}
    dragConstraints={{ left: -1060, right: 0 }}
    dragElastic={0.05}
    className="product-image"
  >
    <img src={ProductImage} alt="product" />
  </motion.div>
</div>

<div className="product-drag-progress-background">
  <motion.div style={{ width }} className="product-drag-progress"></motion.div>
</div>;
```

- 优化动画

```js
const ease = [0.6, 0.05, -0.01, 0.99];
const x = useSpring(0, { stiffness: 300, damping: 200, ease: ease });
```

- 拖动产品图放大效果
  - `useTransform(x, [-100, 0], [1.25, 1])`
  - 观察 x 的值变化，在 -100 (px)时对应 1.25 倍放大
  - 在 0 (px)时又还原 1 倍的大小

```js
const scale = useTransform(x, [-100, 0], [1.25, 1]);

<motion.div style={{ x, scale }} />;
```

- 检测拖拽预览的状态

> 埋个点：为了以后点击 ❌ 关闭预览

```js
// state
const [state, setState] = useState(false);

useEffect(() => {
  // 给 x 对象上个回调，监视它是否在 x 轴移动超过 -100 px
  x.onChange(() => {
    x.get() > -100 ? setState(false) : setState(true);
  });
  // 这里不需要每次都监视，因为本来设置的就是回调监听函数！
  // eslint-disable-next-line
}, []);
```

- 拖拽遮盖层背景 FadeIn

```js
const fadeIn = useTransform(x, [-100, 0], [1, 0]);

<motion.div style={{ opacity: fadeIn }} className="background" />;
```

- 拖拽 tips 元素 FadeOut

```js
const fadeOut = useTransform(x, [-60, 0], [0, 1])
<motion.h6 style={{ opacity: fadeOut, x }}>
  <Chevron />
  Drag To Enlarge
</motion.h6>
```

- 产品图上下区域挪开

```js
const up = useTransform(x, [-100, 0], [-100, 0]);
const down = useTransform(x, [-100, 0], [100, 0]);

<motion.div style={{ translateY: up }} className="product-content-inner"/>

// 本来也可以 translateY，但目标在组件意外，就用 padding 实现类似效果
<motion.div style={{ paddingBottom: down }} className="product-drag"/>
```

- 产品拖拽预览标题
  - 注意，这个 header 是 fixed
  - 当拖拽了 100px 显示产品预览标题和叉叉
  - 如果有操作从 “dom tree” 上增加删除元素时的动画，要用 AnimatePresence 包一下

> AnimatePresence allows components to animate out when they're removed from the React tree.

```js
{
  state ? (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ ease: ease }}
        className="product-drag-header"
      >
        <div className="company-name">HiFive1</div>
        <div className="close">
          <Close />
        </div>
      </motion.div>
    </AnimatePresence>
  ) : (
    <AnimatePresence />
  );
}
```

- 点击关闭商品拖拽预览

```js
const closeProductDrag = () => {
  x.stop();
  x.set(0);
};

<div onClick={closeProductDrag} className="close">
  <Close />
</div>;
```

- 预览时禁止上下滚动

```js
let targetElement = document.querySelector("html");

useEffect(() => {
  state
    ? targetElement.classList.add("no-scroll")
    : targetElement.classList.remove("no-scroll");
});
```
