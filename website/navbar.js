// 在您的HTML中已经包含了jQuery库，所以我们将使用jQuery简化DOM操作
function hide(id) {
    $('#' + id).hide(); // 使用jQuery的hide方法
}

function show(id) {
    $('#' + id).show(); // 使用jQuery的show方法
}

$(document).ready(function() {
    // 默认隐藏slide部分
    $('#slide').hide();

    // 在导航链接上绑定事件，不需要在HTML中使用onclick
    $('a[href="#home"]').click(function() {
        hide('slide');
        show('main-content');
    });

    $('a[href="#resource"]').click(function() {
        hide('main-content');
        show('slide');
    });

    $('a[href="#image"]').click(function() {
        // 如果有图像展示部分的话，这里可以添加相应的显示逻辑
        alert("Image section under construction.");
    });
});