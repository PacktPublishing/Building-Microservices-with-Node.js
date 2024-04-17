const DOMPurify = require('dompurify'); 

const sanitizedHTML = DOMPurify.sanitize(req.body.htmlInput); 