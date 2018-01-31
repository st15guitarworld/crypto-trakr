export function buildURLParameters(obj){
  var u = new URLSearchParams();
  Object.keys(obj).forEach((key)=> {
      u.append(key,obj[key]);
  });
  return u.toString();
}
