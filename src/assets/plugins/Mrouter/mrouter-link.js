// router-link 组件实质上就是一个a标签,可以触发路由change事件
export default {
    props: {
        // to 属性: 跳转的url
        to: {
            type: String,
            require: true
        }
    },
    render(h) {
        // 渲染结果: <a href="/path">aaa</a>
        // 渲染函数三个参数: 标签名称、属性集合、子元素数组
        return h('a', { attrs: { href: `#${this.to}` } }, [this.$slots.default])
        // JSX语法
        // return <a href={'#' + this.to}>{this.$slot.default}</a>
    }
}