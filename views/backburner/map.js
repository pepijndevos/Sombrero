function(doc) {
  if (doc.created_at && doc.type == "action" && doc.priority == 0) {
    emit([doc.status, doc.created_at], doc);
  }
};
