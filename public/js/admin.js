$(function(){
	$('.del').click(function(e){
		var target = $(e.target);
		var id = target.data('id');
		var type = target.data('type');
		$('#delete_' + type).modal();
		$('.allow_delete').click(function(e){
			var tr = $('.item-id-'+ id)
			$.ajax({
				type: 'DELETE',
				url: '/admin/' + type + '/list?id=' + id,
				success: function(result){
					if(result.success ===1){
						tr.remove();
					}
				}
			})
		})
	})
	$('#signupName').blur(function(e){
		var data = {}
		data = { name: $('#signupName').val()}
		$.ajax({
			type: 'POST',
			url: '/user/signup/name',
			data: data,
			success: function(result){
				if(result.success ===0){
					$('#signupName').after('<div class="alert alert-danger" role="alert">用户名已被占用</div>')
				}
			}
		})
	})

	$('#signupName').focus(function(e){
		$('.alert-danger').remove()
	})

	$('#signinName').blur(function(e){
		var data = {}
		data = { name: $('#signinName').val()}
		$.ajax({
			type: 'POST',
			url: '/user/signin/name',
			data: data,
			success: function(result){
				if(result.success ===0){
					$('#signinName').after('<div class="alert alert-danger" role="alert">用户名不存在</div>')
				}
			}
		})
	})

	$('#signinName').focus(function(e){
		$('.alert-danger').remove()
	})

	$('#signup').click(function(e){
		var target = $(e.target)
		var user = target.data('user')
		console.log(user)
	})

	$(document).keydown(function(event){
		var video = $('.video-js')[0]
		switch(event.which){
			case 39:
				video.currentTime += 10 ; break;
			case 37:
				video.currentTime -= 10; break;
			case 38:
				video.volume += 0.1; break;
			case 40:
				video.volume -= 0.1; break;
			case 32:
				if(video.paused){
					video.play(); break;
				}
				else {
					video.pause(); break;
				}
		}
	})

	$('.video-js').dblclick(function(){
		var video = $('.video-js')[0]
		video.webkitEnterFullscreen();
		video.mozRequestFullScreen()
	})
})
