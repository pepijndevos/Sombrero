function midnight() {
	var d = new Date();
	var midnight = new Date(d.getFullYear(), d.getMonth(), d.getDate());
	return midnight.getTime();
}

function score() {
	db.view("Sombrero/completed", {"startkey":midnight(), "success":function(data) {
		$(".score .counter").html(data.rows[0].value);
	}});
}

function set_status(id, status) {
	var url = db.uri + "_design/Sombrero/_update/set_status/" + id;
	if (status) {
		$.post(url + "?status=" + status);
	} else {
		$.post(url);
	}
}

$(function() {
	score();

	setTimeout(function() {
		changes = db.changes();
		changes.onChange(function (doc) {
			var id = doc.results[0].id;
			var url = db.uri + "_design/Sombrero/_show/action/" + id;
			console.log(id);
			$.get(url, function(data) {
				$("#" + id).remove();
				$("#listing").prepend(data);
			});
			score();
		});
	}, 1000);

	$(".meta input.done").live('click', function() {
		set_status($(this).closest("li[id]").attr('id'));
	});

	$(".meta input.redo").live('click', function() {
		set_status($(this).closest("li[id]").attr('id'), "active");
	});

	$(".meta input.delete").live('click', function() {
		var el = $(this).closest("li[id]")
		db.removeDoc({"_id":el.attr('id'), "_rev":el.attr('rev')});
		el.remove();
	});

	$(".meta input.edit").live('click', function() {
		var el = $(this).closest("li[id]")
		var url = db.uri + "_design/Sombrero/_show/editor/" + el.attr('id');
		el.load(url);
		el.css("listStyleType", "none");
	});
});
