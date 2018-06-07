import express from 'express';

export default function(passport){
    const auth = express.Router();
    
    auth.post('/login',function(req, res,next) {
        passport.authenticate('local', function(err, user, info) {
            if(err)  return next(err);
            if (!user) {
                return res.json({ success: false, message: info.message });
            }
            req.logIn(user, function(err) {
                if (err) return next(err); 
                return res.json({ 
                    success: true, 
                    username:user.username,
                    email:user.email,
                    location:user.location,
                    books:user.books,
                    requests:user.requests
                });
            });
      })(req, res);
    });
    
    auth.get('/logout',function(req, res) {
        req.logout();
        res.redirect('/');
    });
    
    return auth;
}
