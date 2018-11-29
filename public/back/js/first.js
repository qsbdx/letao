$(function() {

    var currentPage = 1; // 当前页
    var pageSize = 5; // 每页条数

    // 1. 一进入页面，发送ajax请求，获取数据，进行渲染    
    $.ajax({
        type: "get",
        url: "/category/queryTopCategoryPaging",
        data: {
            page: currentPage,
            pageSize: pageSize
        },
        dataType: "json",
        success: function(info){
            console.log(info);
        }
    })



})