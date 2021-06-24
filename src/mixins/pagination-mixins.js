export default {
    data() {
        return {
            // 分页器
            currentPage: 1,
            currentPageSize: 5,
            pagination: {
                showTotal: (total) => `共 ${total} 条记录`,
                showQuickJumper: true,
                showSizeChanger: true,
                defaultCurrent: 1,
                defaultPageSize: 5,
                total: 0,
                pageSizeOptions: ["5", "10", "20", "30", "40"],
                onChange: (page) => {
                    this.currentPage = page;
                },
                onShowSizeChange: (current, size) => {
                    this.currentPageSize = size;
                },
            },
        }
    }
}