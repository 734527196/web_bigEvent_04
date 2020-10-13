$(function() {
    var form = layui.form;
    var layer = layui.layer;

    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '用户昵称必须在 1 - 6 位之间'
            }
        }
    })
    initUserInfo()

    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val('userinfo', res.data)
            }
        })
    }

    $('.btn_reset').on('click', function(e) {
        e.preventDefault()
        initUserInfo()
    })

    $('#form_userinfo').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $('#form_userinfo').serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜您，修改资料成功！')
                initUserInfo()
            }
        })
    })
})