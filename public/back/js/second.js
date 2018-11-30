$(function () {

    var currentPage = 1; // 当前页
    var pageSize = 5; // 每页条数
    render(); // 一进页面发送ajax请求，获取数据，渲染页面

    function render() {
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                // template(模板id, 数据对象), 在模板中可以任意使用传进去对象中的所有属性
                // template方法返回的htmlStr字符串
                var htmlStr = template("secondTpl", info);
                $('tbody').html(htmlStr);

                // 初始化分页插件
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3, // 版本号
                    currentPage: info.page, // 当前页
                    totalPages: Math.ceil(info.total / info.size), // 总页数
                    // 添加页码点击事件
                    onPageClicked: function (a, b, c, page) {
                        // 更新当前页
                        currentPage = page;

                        // 重新渲染页面
                        render();
                    }

                })
            }
        })

    }

})