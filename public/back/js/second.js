$(function () {

    var currentPage = 1; // 当前页
    var pageSize = 5; // 每页条数
    render(); // 一进页面发送ajax请求，获取数据，渲染页面
    // 1、渲染页面
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

    // 2、点击添加分类按钮，显示模态框
    $('#addBtn').click(function () {
        $('#addModal').modal('show');

        // 发送请求，获取一级分类的全部数据
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            // 通过写死 page 和 pageSize 模拟获取全部一级分类的接口
            data: {
                page: 1,
                pageSize: 100,
            },
            dataType: "json",
            success: function (info) {
                console.log(info);

                var htmlStr = template("dropdownTpl", info);
                $('.dropdown-menu').html(htmlStr);
            }
        })


    })

    // 3. 给下拉列表的 a 添加点击事件(通过事件委托实现)
    $('.dropdown-menu').on("click", 'a', function () {

        // 获取文本值
        var txt = $(this).text();
        // 设置给按钮
        $("#dropdownText").text(txt);


        // 获取id
        var id = $(this).data("id");
        // 设置给隐藏域
        $('[name="categoryId"]').val(id);

        // 调用updateStatus更新 隐藏域 校验状态成 VALID
        $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID")

    })

    // 4. 配置文件上传插件, 让插件发送异步文件上传请求
    $("#fileupload").fileupload({
        dataType: "json",
        // done: 表示文件上传完成回调函数
        // e：事件对象
        // data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            // console.log(data);
            // console.log(data.result); // 后台返回的对象

            var picObj = data.result; // 后台返回的数据
            // 获取图片地址，设置给 img src
            var picUrl = picObj.picAddr;
            $('#imgBox img').attr("src", picUrl);

            // 给隐藏域设置图片地址
            $('[name="brandLogo"]').val(picUrl);

            // 调用updateStatus更新 隐藏域 校验状态成 VALID
            $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID")
        }
    });

    // 5. 添加表单校验功能

    $('#form').bootstrapValidator({
        // 重置排除项, 都校验, 不排除
        excluded: [],

        // 配置校验图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok', // 校验成功
            invalid: 'glyphicon glyphicon-remove', // 校验失败
            validating: 'glyphicon glyphicon-refresh' // 校验中
        },

        // 指定校验字段
        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: "请选择一级分类"
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: "请输入二级分类名称"
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传图片"
                    }
                }
            },


        }
    })


    /*
    $('#form').bootstrapValidator({
        // 重置排除项, 都校验, 不排除
        excluded: [],

        // 配置校验图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok', // 校验成功
            invalid: 'glyphicon glyphicon-remove', // 校验失败
            validating: 'glyphicon glyphicon-refresh' // 校验中
        },

        // 指定校验字段
        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: "请选择一级分类"
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: "请输入二级分类名称"
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传图片"
                    }
                }
            }
        }
    })
    */
})