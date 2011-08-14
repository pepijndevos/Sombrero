function(doc) {
  if (doc.created_at && doc.type == "action" && doc.priority > 0) {
    emit([doc.status, 3 - doc.priority, doc.created_at], doc);
  }
};
