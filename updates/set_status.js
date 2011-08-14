function(doc, req) {
	if (req.query.status) {
		doc.status = req.query.status;
	} else {
		doc.status = "completed";
		doc.completed_at = Date.now();
	}
	return [doc, "success"];
}
