## 零碎知识点
- 文本元素之间的一个空白符可以通过设置字体为0px来消除
- 响应式布局:
    设置固定宽度会出现横向滚动条，所以各个大块的容器宽度，需要使用百分比, 对于子元素间是固定像素间距的，或者宽度不好计算的，可使用flex，利用grow、shrink的特点或者使用box-sizing,对于布局需要改变的元素，应该单独和该容器内的。然后配合媒体查询，需要注意媒体查询需要写在后面，以免写在前面被后面的覆盖掉。并且dom结构需要结合所有端的设计稿综合考虑。还需要注意媒体查询时小屏幕的有时候会继承大屏幕的，所以需要写好媒体查询条件
    元素隔离开。
- `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">` 是为了避免将整个页面放在移动端被缩小，而是应该和pc端大小一致，出现超出时，显示滚动条
- transition: 可以设置多个过渡属性，如 transtion: width 0.5s liner , height 0.5s liner 0.5s;
 

## 触发bfc
- position: absolute
- overflow: hidden
- float
- display: inline-block

## margin塌陷
- 非嵌套垂直方向取最大
- 嵌套垂直方向需触发bfc

## float
- 对块级元素不可见
- 对文本类元素(inline-block inline)和文本可见
- 对产生bfc的元素可见

### 清除浮动

```
div::after {
    content: '';
    display: block;
    clear: both;
}

```

## 不能撑开父元素
- float
- position: absolute/fixed

## 单行文本溢出
{
    overflow: hidden;
    text-overflow: ellipisis;
    white-space: nowrap;
}

## 权重
- 内联 id (class 属性选择器 伪类) (元素 伪元素) 
- 通配符权重为0


## 像素
### css像素
通常是多个物理像素(pt),只是一个虚拟像素

### 物理像素
屏幕从工厂出来那天起，它上面的物理像素点就固定不变了，单位pt。

### 设备像素比
- dpr = 设备像素/css像素  // 例如2:1 则四个设备像素表示一个css像素
- 使用window.devicePixelRatio获取

### ppi
对角线上每英寸上的像素点多少

### 视口
首先，移动设备上的浏览器认为自己必须能让所有的网站都正常显示，即使是那些不是为移动设备设计的网站。但如果以浏览器的可视区域作为viewport的话，因为移动设备的屏幕都不是很宽，所以那些为桌面浏览器设计的网站放到移动设备上显示时，必然会因为移动设备的viewport太窄，而挤作一团，甚至布局什么的都会乱掉。也许有人会问，现在不是有很多手机分辨率都非常大吗，比如768x1024，或者1080x1920这样，那这样的手机用来显示为桌面浏览器设计的网站是没问题的吧？前面我们已经说了，css中的1px并不是代表屏幕上的1px，你分辨率越大，css中1px代表的物理像素就越多，devicePixelRatio的值也越大，这很好理解，因为你分辨率增大了，但屏幕尺寸并没有变大多少，必须让css中的1px代表更多的物理像素，才能让1px的东西在屏幕上的大小与那些低分辨率的设备差不多，不然就会因为太小而看不清。所以在1080x1920这样的设备上，在默认情况下，也许你只要把一个div的宽度设为300多px（视devicePixelRatio的值而定），就是满屏的宽度了

浏览器就决定默认情况下把viewport设为一个较宽的值，比如980px，这样的话即使是那些为桌面设计的网站也能在移动浏览器上正常显示了。ppk把这个浏览器默认的viewport叫做 layout viewport。

pc端只有一个视口，移动端有多个视口
- 布局视口: document.documentElement.clientWidth
- 可视视口: window.innerWidth

`<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">`

## 水平垂直剧中

- flex布局
- left top 为 百分之五十 maring left top 往回拉高度的一半(translate(-50%, -50%))
- text-aligin 为 center, line-height
