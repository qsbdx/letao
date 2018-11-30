$(function () {

    var currentPage = 1; // 当前页
    var pageSize = 5; // 每页条数

    // 1. 一进入页面，发送ajax请求，获取数据，进行渲染 
    render();   
    function render() {
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                // template(模板id, 数据对象), 在模板中可以任意使用传进去对象中的所有属性
                // template方法返回的htmlStr字符串
                var htmlStr = template("firstTpl", info);
                $('tbody').html(htmlStr);

                // 数据回来，进行分页初始化
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3, // 指定版本号
                    currentPage: info.page, // 当前页
                    totalPages: Math.ceil(info.total / info.size), // 总页数
                    onPageClick: function (a, b, c, page) {
                        console.log(page)
                        // 更新当前页
                        currentPage = page;
                        // 重新渲染
                        render();
                    }
                })

            }
        })
    }


})