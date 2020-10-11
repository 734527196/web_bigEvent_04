$(function() {
    $('#link_reg').on('click', function() {
        $('.box_login').hide()
        $('.box_reg').show()
    })

    $('#link_login').on('click', function() {
        $('.box_reg').hide()
        $('.box_login').show()
    })

    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,16}$/, '密码必须6到16位，且不能出现空格'
        ],
        repwd: function(value) {
            var pwd = $('.box_reg [name=password]').val()
            if (value !== pwd) {
                return '两次密码输入不一致'
            }
        }
    })

    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.box_reg [name=username]').val(),
                password: $('.box_reg [name=password]').val(),
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                $('#link_login').click()
            }
        })
    })


    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg('恭喜您，登录成功！')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })


})