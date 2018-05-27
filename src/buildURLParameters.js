export function buildURLParameters(obj){
  var u = new URLSearchParams();
  Object.keys(obj).forEach((key)=> {
      if(Array.isArray(key)){
        u.append(key.join(","));
      }else{
        u.append(key,obj[key]);  
      }
  });
  return u.toString();
}
