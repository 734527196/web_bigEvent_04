$(function() {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        pwd: [
            /^[\S]{6,16}$/, '密码必须6到16位，且不能出现空格'
        ],
        samepwd: function(value) {
            var pwd = $('[name=oldPwd]').val()
            if (value === pwd) {
                return '新旧密码不能相同'
            }

        },
        repwd: function(value) {
            var newpwd = $('[name=newPwd]').val()
            if (value !== newpwd) {
                return '两次密码输入不一致'
            }
        }
    })

    $('#form_pwd').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: {
                oldPwd: $('[name=oldPwd]').val(),
                newPwd: $('[name=newPwd]').val()
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜您，修改密码成功')
                $('#form_pwd')[0].reset()
            }
        })
    })
})