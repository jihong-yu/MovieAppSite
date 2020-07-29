const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const moment = require('moment');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, //공백제거
    unique: 1, //unique함(중복x)
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String, //유효성관리
  },
  tokenExp: {
    type: Number, //유효기간관리
  },
});

userSchema.pre('save', function (next) {
  //save함수가 실행되기전에무엇을한다는의미
  var user = this;

  if (user.isModified('password')) {
    //비밀번호를 암호화 시킨다.
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err); //next하면은 바로 user.save함수실행됨

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    //비밀번호를변경하지않을땐 그냥바로다음실행
    next();
  }
});
userSchema.methods.comparePassword = function (planePassword, cb) {
  bcrypt.compare(planePassword, this.password, function (err, isMatch) {
    //isMatch는 맞으면true를반환
    //1st:사용자가입력하여암호화된패스워드,2nd:기존DB 패스워드,3rd:콜백함수
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
userSchema.methods.generateToken = function (cb) {
  var user = this;
  //jsonwebtoken을 이용해서 토큰을 생성하기
  var token = jwt.sign(user._id.toHexString(), 'secretToken'); // user._id+ secretToken이 합쳐진이름으로 토큰이만들어짐
  var oneHour = moment().add(1, 'hour').valueOf();

  user.token = token;
  user.tokenExp = oneHour;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  //토큰을 decode한다.
  jwt.verify(token, 'secretToken', function (err, decoded) {
    //decoded:복호화된_id값
    //유저아이디를 이용해서 유저를 찾은 다음에 클라이언트에서 가져온 token과
    //DB에 보관된 토큰이 일치하는지 확인
    //저장할때 user._id + 'secretToken'으로 저장했기 때문에 복호화할때도
    //'secretToken'때고 user_.id만 복호화해서 decoded에 저장됨

    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};
const User = mongoose.model('User', userSchema); //1st모델의이름,2nd데이터

module.exports = User; //다른파일에서사용가능
