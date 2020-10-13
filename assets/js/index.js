$(function() {
    var form = layui.form

    getUserInfo()

    $('#btnLogout').on('click', function() {
        layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token')
            location.href = '/login.html'

            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // layui.layer.msg('获取用户信息成功')
            // console.log(res)
            renderUserInfo(res)
        }
    })
}

function renderUserInfo(res) {
    var name = res.data.nickname || res.data.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (res.data.user_pic !== '') {
        $('.layui-nav-img').show().attr('src', res.data.user_pic)
        $('.textAvatar').hide()

    } else {
        var first = name[0].toUpperCase()
        $('.textAvatar').show().html(first)
        $('.layui-nav-img').hide()
    }
}