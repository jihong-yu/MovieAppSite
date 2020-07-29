if(process.env.NODE_ENV === 'production'){ //production모드인지develop모드인지반환
    module.exports=require('./prod.js');
}else{
    module.exports=require('./dev.js');
}