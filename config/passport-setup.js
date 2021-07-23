const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const oauthmodel = require('../models/oauthloginmodel');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        clientID:keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL:'/api/oauth/redirect'
    }, (accessToken,refreshToken,profile,done) => {
        console.log(profile.displayName);
        console.log(profile.id);
        console.log(profile.photos[0].value);
        oauthmodel.findOne({
            where: {
               googleid: profile.id
            }
         }).then(result => {
             console.log(accessToken);
             console.log(refreshToken);
             if(result){ console.log('user exist');done(null, result);}
             else{
                 let googleid = profile.id;
                 let givenname = profile.displayName;
                 let image = profile.photos[0].value;
                oauthmodel.create({
                    googleid,givenname,image
                }
                ).then(result => {console.log(result);done(null, result);})
                .catch(err => {console.log(err);});
            }
        }).catch(err  => {console.log(err)});   
        ///////////////////////
    })
)