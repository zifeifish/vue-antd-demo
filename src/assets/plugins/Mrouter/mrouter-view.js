
export default {
    
    render(h) {
        let component = null; // 需要渲染的组件

        // 动态获取current对应的组件
        // this指向当前实例
        // $router.$options.routes 即: 路由配置数组
        // $options是MVueRouter类暴露出来的option属性
        this.$router.$options.routes.forEach(route => {
            if (route.path === this.$router.current) {
                component = route.component
            }
        });

        return h(component)
    }
}