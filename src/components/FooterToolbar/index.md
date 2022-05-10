# HuFooterToolbar 底部工具栏

固定在底部的工具栏

## 何时使用

固定在内容区域的底部，不随滚动条移动，常用于长页面的数据搜集和提交工作。

引用方式

```javascript
import HuFooterToolbar from '@/components/FooterToolbar'

export default {
    components: {
        FooterToolBar
    }
}
```

## 示例

```html
<hu-footer-toolbar>
    <a-button type="primary" @click="validate" :loading="loading">提交</a-button>
</hu-footer-toolbar>
```
或
```html
<hu-footer-toolbar left="leftButtons">
    <template #leftButtons>
        <a-button>返回</a-button>
    </template>
    <a-button type="primary" @click="validate" :loading="loading">提交</a-button>
</hu-footer-toolbar>
```


## 内置属性

属性 | 说明 | 类型 | 默认值
----|------|-----|------
children (slot) | 工具栏内容，向右对齐 | - | -
left (slot) | 额外信息，向左对齐 | - | -

