// 一、进度条基本使用
// NProgress.start(); // 开启进度条
// NProgress.done(); // 关闭进度条

// 二、需求：
//    1. 当第一个ajax发送的时候，开启进度条
//    2. 当所有的ajax都完成后，关闭进度条

// 三、ajax全局事件
// .ajaxComplete() 每个ajax完成时调用(不管成功与否)
// .ajaxError()    每个ajax只要失败了就会调用
// .ajaxSend()     每个ajax发送前调用
// .ajaxSuccess()  每个ajax成功了就会调用

// .ajaxStart()    当第一个ajax请求发送时调用
// .ajaxStop()     当所有的ajax都完成后调用

$(document).ajaxStart(function() {
    NProgress.start(); // 开启进度条
})
$(document).ajaxStop(function() {
    NProgress.done(); // 关闭进度条
});


// 首页
$(function() {
    // 公共的功能：
    // 1. 左侧二级菜单切换
    $('.category').click(function() {
        $(this).next().stop().slideToggle();
    })

    // 2. 左侧侧边栏切换
    $('.icon_left').click(function() {
        $('.lt_aside').toggleClass('hidemenu'); 
        $('.lt_main').toggleClass('hidemenu');
        $('.lt_topbar').toggleClass('hidemenu');
    })

    // 3. 退出功能
    



})
   