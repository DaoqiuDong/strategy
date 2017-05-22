/**
 * 弹出框
 * 需要引入layer.js
 */
var toolTip = {
    //需引入web版layer.js
    html: function(html) {
        var layerpage = layer.open({
            type: 1,
            title: false,
            closeBtn: 0,
            area: "600px",
            shadeClose: true,
            resize: false,
            content: html
        });
        return layerpage;
    },
    confirm: function(confirmMsg, successFun, cancelFun) {
        var index = layer.confirm(confirmMsg, {
            title: false,
            closeBtn: 0,
            btnAlign:"c",
            area: ["450px", "240px"],
            shadeClose: true,
            resize: false,
            btn: ['确定', '取消'] //按钮
        }, function(index) {
            layer.close(index);
            if (!inputCheck.isEmpty(successFun)) {
                successFun();
            }
        }, function(index) {
            layer.close(index);
            if (!inputCheck.isEmpty(cancelFun)) {
                cancelFun();
            }
        });
        return index;
    },
    msgSuccess: function(message, successFun) {
        //信息框
        var index = layer.open({
            content: message,
            closeBtn:0,
            title:false,
            btn: ['确定'],
            yes: function(index) {
                layer.close(index);
                if (!inputCheck.isEmpty(successFun)) {
                    successFun();
                }
            }
        });
        return index;
    },
    loading: function() {
        var index = layer.load(1, {
            shade: [0.1, '#FFFFFF'] // [0.8, '#393D49']
        });
        return index;
    },
    message: function(message) {
        var index;
        if (typeof(layer.msg) === "function") {

            index = layer.msg(message, {
                time: 3000 //3s后自动关闭
            });
        } else {
            index = this.wap.msgSuccess(message, null);
        }
        return index;
    },
    close: function(index) {
        layer.close(index);
    },
    closeAll: function() {
        layer.closeAll();
    }
}

/**
 * 对输入值进行检测
 */
var inputCheck = {
    /**
     * 检查值是否为null,undefined,空字符串，空对象
     * @param 	value 需要判断的字符串or对象
     * @return	true 是空
     * 			false 不是空
     */
    isEmpty: function(value) {
        if (value == null || typeof(value) === "undefined") {
            return true;
        }
        if (typeof(value) === "string" && value == "") {
            return true;
        }
        if (typeof(value) === "object") {
            for (var i in value) {
                if (value.hasOwnProperty(i)) {
                    return false;
                }
            }
            return true;
        }
        return false;
    },
    isNumber: function(value) {
        if (typeof(value) !== "undefined" && typeof(value) === "number") {
            return true;
        }
        return false;
    },
    isNotEmpty: function(value) {
        return !this.isEmpty(value);
    },
    /**
     * 检查是否是非数值，而且小数只能保留6位
     * @param	value 需要检查格式的值
     * @return	{"result":检查结果,"value":格式化后的值}
     */
    isNumAndFormat: function(value, fixed) {
        //检查是否是非数字值
        if (this.isEmpty(value)) {
            value = "";
            return {
                "result": false,
                "value": value
            };
        }
        if (isNaN(value)) {
            console.log("值为非数值");
            value = "";
            return {
                "result": false,
                "value": value
            };
        }
        fixed = (this.isEmpty(fixed)) ? 2 : fixed;
        //检查小数点后是否多余于fixed位
        if (value.toString().split(".").length > 1 && value.toString().split(".")[1].length > fixed) {
            console.log("小数点后多于" + fixed + "位！");
            value = Number(value).toFixed(fixed);
            return {
                "result": false,
                "value": value
            };
        }
        return {
            "result": true,
            "value": value
        };
    },
    /**
     * @param obj  html  input对象
     */
    numFormat: function(obj, fixed) {
        var returnObj = this.isNumAndFormat(obj.value, fixed);
        obj.value = returnObj.value;
    },
    /**
     * 验证是否是手机号
     * @param	value 需要验证的值
     * @return	true 是手机号码格式
     * 			false 不是手机号码格式
     */
    isMobile: function(value) {
        if (this.isEmpty(value)) {
            return false;
        }
        return /^1(3|4|5|7|8)\d{9}$/.test(value);

    },
    isEmail: function(value) {
        if (value == null || typeof(value) == "undefined" || value == "") {
            return false;
        }
        var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        if (!reg.test(value)) {
            return false
        }
        return true;
    },
    isIdcard: function(idcard) {
        if (this.isEmpty(idcard)) {
            return false;
        }
        return /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/.test(idcard);
    },
    isNotMobile: function(value) {
        return !this.isMobile(value);
    }

}

/**
 * 对type="file"的html对象上传的图片进行校验
 */
var image = {
    /*
     * 默认可以上传的图片类型，gif|jpg|jpeg|png|GIF|JPG|PNG
     */
    filetypesreg: /\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/,
    /*
     * 默认可以上车的图片大小，2M
     */
    filemaxsize: 1024 * 2, //2M
    /*
     * 检查图片是否符合上传要求（主要判断图片类型和图片大小）
     * @param target type="file"的html对象
     * @return true-符合要求,false-不符合
     */
    fileCheck: function(target) {
        var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
        var fileSize = 0;
        var filetypesreg = this.filetypesreg;
        var filepath = target.value;
        var filemaxsize = this.filemaxsize;
        if (filepath) {
            var isnext = false;
            var fileend = filepath.substring(filepath.indexOf("."));
            if (filetypesreg && filetypesreg.test(target.value)) {
                isnext = true;
            }
            if (!isnext) {
                toolTip.message("不接受此文件类型！");
                target.value = "";
                return false
            }
        } else {
            return false;
        }
        if (isIE && !target.files) {
            var filePath = target.value;
            var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
            if (!fileSystem.FileExists(filePath)) {
                toolTip.message("附件不存在，请重新选择！");
                return false;
            }
            var file = fileSystem.GetFile(filePath);
            fileSize = file.Size;
        } else {
            fileSize = target.files[0].size;
        }

        var size = fileSize / 1024;
        if (size > filemaxsize) {
            toolTip.message("附件大小不能大于" + filemaxsize / 1024 + "M！");
            target.value = "";
            return false;
        }
        if (size <= 0) {
            toolTip.message("附件大小不能为0M！");
            target.value = "";
            return false;
        }
        return true;
    },
    /*
     * 创建图片可显示的url
     * @param target type="file"的html对象
     * @return 可显示的url
     */
    getObjectURL: function(target) {
        var file = target.files[0];
        var url = null;
        if (window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    }
}

function inputRange(select) {
    var position = 0;
    var txtFocus = $(select);
    if (window.ActiveXObject || "ActiveXObject" in window) {
        var range = txtFocus.createTextRange();
        range.move("character", position);
        range.select();
    } else {
        //obj.setSelectionRange(startPosition, endPosition);
        //txtFocus.setSelectionRange(position, position);
        txtFocus.focus();
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

/**
 *
 */
var dateUitl = {
    addDay: function(date, days) {
        var d = new Date(date);
        d.setDate(d.getDate() + days);
        var month = d.getMonth() + 1;
        var day = d.getDate();
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        var val = d.getFullYear() + "-" + month + "-" + day;
        return val;
    },
    addMonth: function(date, months) {
        var d = new Date(date);
        d.setMonth(d.getMonth() + months);
        var month = d.getMonth() + 1;
        var day = d.getDate();
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        var val = d.getFullYear() + "-" + month + "-" + day;
        return val;
    }
}
