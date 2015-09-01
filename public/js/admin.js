$(function(){
	$('.del').click(function(e){
		var target = $(e.target);
		var movie_id = target.data('id');
		$('#delete').modal();
		$('#allow_delete').click(function(e){
		var tr = $('item-id-'+movie_id)
		$.ajax({
			type: 'DELETE',
			url: '/admin/list?id='+movie_id,
			success: function(result){
				if(result.success ===1){
					tr.remove();
					window.location.reload();
					//document.execCommand('Refresh')
				}
			}
		})
	})
	})
})
