function(doc) {
	if (doc.type == "action" && doc.status == "completed") {
		emit(doc.completed_at, 1);
	}
}
