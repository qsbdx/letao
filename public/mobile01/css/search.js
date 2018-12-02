import {
    template
} from "handlebars";

$(function () {

    // 由于所有的功能都是对于本地的操作，可以约定一个键名：search_list

    // 功能分析
    // 1. 获取所有搜索历史，完成渲染
    // 2. 删除单个搜索历史
    // 3. 清空所有搜索历史
    // 4. 添加单个搜索历史


    // 功能1：渲染功能
    // (1) 获取本地历史，得到jsonStr
    // (2) 将jsonStr转成数组
    // (3) 根据模板引擎渲染  template(id, 对象)

    // 获取本地历史的数组
    function getHistory() {
        var jsonStr = localStorage.getItem("search_list"); // 得到jsonStr
        var arr = JSON.parse(jsonStr); // 转成数组
    }

    // 获取本地历史的数组，并且根据数组进行渲染
    function render() {
        // 利用模板引擎渲染
        var htmlStr = template('historyTpl', {
            list: arr
        });
        $('.lt_history').html(htmlStr);
    }



    // 功能2：清空所有
    // (1) 给清空所有添加点击事件 (事件委托)
    // (2) 利用removeItem 清除 search_list
    // (3) 重新渲染
    $('.lt_history').on("click", '.btn_empty', function () {
        // 清空历史记录
        localStorage.removeItem("search_list");
        // 重新渲染
        render();
    })



    // 功能3：删除单个记录
    // (1) 给所有删除按钮添加点击事件 (事件委托)
    // (2) 获取数据，根据下标，将数组对应项删除
    // (3) 将数组转成jsonStr,存储到本地
    // (4) 重新渲染

    $('.lt_history').on("click", ".btn_delete", function () {
        // 得到数组
        var arr = getHistory();

        // 获取下标
        var index = $(this).data("index");

        // 根据下标，删除数组对应项
        // splice 可以在任意位置删除，替换，添加任一项
        // arr.splice(从哪儿开始， 删几个， 替换项1， 替换项2 ...)
        arr.splice(index,1);

        // 转成jsonStr,存储到本地
        localStorage.setItem( "search_list", JSON.stringify(arr));

        // 重新渲染
        render();



    })


    // 功能4：添加单个历史记录
    // (1) 给搜索按钮添加点击事件
    // (2) 获取走索关键字
    // (3) 获取数组，往数组最前面追加 unshift
    // (4) 转成 jsonStr, 存储到本地存储中
    // (5) 重新渲染
    



})