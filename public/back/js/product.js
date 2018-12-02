
$(function() {
    var currentPage = 1;    // 当前页
    var pageSize = 5;       // 每页条数 

    var picArr = [];  // 专门用于存储所有用于提交的图片对象

    // 1. 一进入页面，发送ajax请求，渲染商品列表
    render();

    function render() {
        $.ajax({
            type: "get",
            url: "/product/queryProductDetailList",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function( info ){
                console.log( info );

                var htmlStr = template("productTpl", info);
                $('tbody').html(htmlStr);

                // 进行分页初始化
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,   // 版本号
                    currentPage: info.page,     // 当前页
                    totalPages: Math.ceil(info.total / info.size),  // 总页数
                    // 页码点击事件
                    onPageClicked: function(a, b, c, page) {
                        // 更新当前页
                        currentPage = page;
                        // 重新渲染
                        render();
                    }

                })
            },

        })
    }


    // 2. 点击添加按钮，显示模态框
    $('#addBtn').click(function() {
        $('#addModal').modal("show");


        // 发送ajax请求，请求所有二级分类列表
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: "json",
            success: function(info){
                console.log(info);
                // 点击添加按钮，渲染下拉框
                var htmlStr = template("dropdownTpl", info);
                $('.dropdown-menu').html(htmlStr);
            }
        })
    })


    // 3. 给下拉列表的所有 a 添加点击事件 (事件委托)
    $('.dropdown-menu').on('click', 'a', function() {
        // 获取文本，赋值给按钮
        var txt = $(this).text();
        $('#dropdownText').text(txt);

        // 获取id, 赋值给隐藏域
        var id = $(this).data("id");
        $('[name="brandId"]').val(id);



    })

    // 4. 配置文件上传插件
    $('#fileupload').fileupload({
        // 返回回来的数据类型
        dataType: "json",
        // 文件上传完成的回调函数
        done: function(e, data) {
            console.log(data.result); // 后台返回的结果
            var picObj = data.result;
            // 将上传的图片对象(图片地址和名称) 添加到数组最前面
            picArr.unshift(picObj); 

            var picUrl = picObj.picAddr; // 图片地址
            // 将每次上传完成的图片，显示到结构最前面

            $('#imgBox').prepend( ' <img src="'+ picUrl +'" style="width: 100px;" />' );

            // 如果长度超过3，需要将最后一个移除
            if (picArr.length > 3) {
                picArr.pop();  // 删除数组最后一项
                // 从结构上，删除最后一张图片
                $('#imgBox img:last-of-type').remove(); // 找最后一个图片类型的子元素 (只关注类型)
            }

        }
    })

    // 5. 
    
})