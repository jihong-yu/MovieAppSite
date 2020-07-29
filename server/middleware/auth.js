const User = require('../models/User');

let auth = (req,res,next) => {
    //인증처리를 하는곳
    //클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;
    //토큰을 복호화한 후 유저를 찾는다.
    User.findByToken(token,(err,user)=>{
        if(err) throw err;
        if(!user) return res.json({isAuth:false,error:true});

        req.token = token; //req에 넣으면 index.js에있는 app.get에 req에서 사용가능
        req.user =user; //상동
        next(); //index.js에서 app.get( ~~, auth ,~~) 인데 next를안해주면 다음으로안너어감
    })
    //유저가 있으면 인증 okay

    //유저가 없으면 인증 no!
}

module.exports = auth;