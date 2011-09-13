function(doc) {
	for(id in doc.verbs) {
		emit(doc.verbs[id], doc);
	}
}
