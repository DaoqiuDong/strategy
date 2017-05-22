//设置cookie，有效期单位分钟
function setCookie(c_name, value, expireminutes) {
    var exdate = new Date();
    exdate.setMinutes(exdate.getMinutes() + expireminutes)
    document.cookie = c_name + "=" + escape(value) +
        ((expireminutes == null) ? "" : ";expires=" + exdate.toUTCString()) + ";path=/";
};
//获取cookie
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    };
    return "";
};
//删除cookie
function deleteCookie(c_name) {
    var exdate = new Date();
    exdate.setHours(exdate.getHours() - 5)
    document.cookie = c_name + "=" + escape("") +
        ";expires=" + exdate.toUTCString() + ";path=/";
};

// var index = window.location.pathname.indexOf("html/");
// var url = window.location.pathname.substr(0,index);
var url = "/rule-web/web/";
var userAccount = getCookie("ua");
var userName = getCookie("un");
var token = getCookie("token");
//退出登录
function loginout() {
    $.ajax({
        url: url + "system/loginOut",
        type: "post",
        cache: false,
        async: false,
        dataType: "json",
        success: function(data) {
            deleteCookie("token");
            deleteCookie("mu");
            deleteCookie("un");
            deleteCookie("ua");
            window.location.href = "login.html";
        },
        error: function() {}
    });
}


//通用ajax-post
function AJAX_POST(Url, Data, SuccessFun, ErrorFun) {
  $.ajax({
    url: url + Url,
    type:"post",
    cache: false,
    async: false,
    dataType: "json",
    data: Data,
    success: function(data) {
      if (data.code == "999") {
        console.log(999);
      } else {
        SuccessFun(data);
      }
    },
    error: ErrorFun

  })
}

//通用ajax-get
function AJAX_GET(Url, Data, SuccessFun, ErrorFun) {
    $.ajax({
        url: url + Url,
        type: "get",
        cache: false,
        async: false,
        dataType: "json",
        data: Data,
        success: function(data) {
            if (data.code == "999") {
                window.top.location.href = "../login.html";
            } else {
                SuccessFun(data);
            }
        },
        error: ErrorFun
    });
}

//通用自定义方法，同步/异步ajax
function AJAXBYTYPE(Url, Data, Type, Async, SuccessFun, ErrorFun) {
    $.ajax({
        url: url + Url,
        // beforeSend:function(request){
        //     request.setRequestHeader("Authorization", token);
        // },
        type: Type,
        cache: false,
        async: Async,
        dataType: "json",
        data: Data,
        success: function(data) {
            if (data.code == "999") {
                window.top.location.href = "../login.html";
                0
            } else {
                SuccessFun(data);
            }
        },
        error: ErrorFun
    });
}

//通用截取url参数
function GetUrlParam(key) {
    var param = window.location.search;
    var strs;
    var value;
    if (param.indexOf("?") != -1) {
        if (param.indexOf("&" != -1)) {
            var str = param.substr(1).split("&");
            for (var i = 0; i < str.length; i++) {
                strs = str[i].split("=");
                if (strs[0] = key) {
                    value = strs[1];
                } else {
                    console.log(key + "参数不匹配");
                };
            };
        } else {
            strs = param.substr(1).split("=");
            if (strs[0] == key) {
                value = strs[1];
            } else {
                console.log(key + "参数不匹配");
            };
        };
        return value;
    } else {
        console.log("参数为空");
    }
}

//数组操作
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(callback, thisArg) {
        var T, k;
        if (this == null) {
            throw new TypeError(" this is null or not defined");
        }
        var O = Object(this);
        var len = O.length >>> 0; // Hack to convert O.length to a UInt32
        if ({}.toString.call(callback) != "[object Function]") {
            throw new TypeError(callback + " is not a function");
        }
        if (thisArg) {
            T = thisArg;
        }
        k = 0;
        while (k < len) {
            var kValue;
            if (k in O) {
                kValue = O[k];
                callback.call(T, kValue, k, O);
            }
            k++;
        }
    };
} ;
