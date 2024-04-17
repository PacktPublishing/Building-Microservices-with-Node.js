const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

if (!emailRegex.test(req.body.email)) { 

  // Handle invalid email address 

} 