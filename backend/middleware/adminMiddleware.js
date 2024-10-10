const adminMiddleware = (req, res, next) => {
    try {
        console.log('ad',req.user)
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied, not an admin' });
          }
          next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
   
  };

module.exports=adminMiddleware;  
  
  