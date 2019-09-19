//对cookie的存取
let pathArr = [
    {
        index: 0,
        name: '首页',
        path: '/'
    }
    
]


export function getCrumbs(){
    // console.log(document.cookie)
    if(!document.cookie){
        document.cookie = JSON.stringify(pathArr);
    }
    
    let arr = JSON.parse(document.cookie)
    arr[arr.length - 1].path = ""
    return arr
}
export function setCrumbs(obj){
    let cookies = JSON.parse(document.cookie)
    let index = obj.index;
    cookies[index] = obj;
    let newCookies =cookies.slice(0,index+1)
    document.cookie = JSON.stringify(newCookies)
}