$(function() {
    //echart渲染数据
    var option = {
        title: {
            text: '策略树',
            // subtext: '虚构数据'
        },
        toolbox: {
            show: true,
            feature: {
                // mark: {
                //     show: true
                // },
                // dataView: {
                //     show: true,
                //     readOnly: false
                // },
                // restore: {
                //     show: true
                // },
                saveAsImage: {
                    show: true
                }
            }
        },
        calculable: false,
        series: [{
            name: '树图',
            type: 'tree',
            orient: 'vertical', // vertical horizontal
            roam: true,
            rootLocation: {
                x: 'center',
                y: 100
            }, // 根节点位置  {x: 100, y: 'center'}
            nodePadding: 50,
            layerPadding:50,
            symbolSize: [120, 60],
            symbol: "rectangle",
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: "inside",
                        textStyle: {
                            fontSize: 16,
                            color: "#000"
                        }
                    },
                    lineStyle: {
                        color: '#48b',
                        width: 2,
                        // shadowColor: '#000',
                        // shadowBlur: 3,
                        // shadowOffsetX: 3,
                        // shadowOffsetY: 5,
                        type: 'broken' // 'curve'|'broken'|'solid'|'dotted'|'dashed'

                    },
                    color:"#ccc",
                    borderColor:"rgba(0,0,0,.8)"
                },
                emphasis: {
                    label: {
                        show: true,
                        textStyle: {
                            fontSize: 16,
                            color: "#000"
                        }
                    },
                    color:"#ccc",
                    borderColor:"rgba(0,0,0,.4)"
                }
            },

            data: [{
                name: '根节点',
                id: "0",
                value: null,
                outParam: [],
                children: []
            }]
        }]
    };
    var toolTipindex = "";
    var nowId = ""; //当前节点ID
    var nowparentId = ""; //当前节点父级ID
    var obj = {}; //新节点
    var nowFatherOutParam = {}; //当前节点父级输出
    var nowOutParam; //当前节点输出
    var nowRuleName = ""; //当前节点name
    var queryOutParam = {};
    var nowFactorParam = [];
    var canSetOutParam = []; //可设置输出项
    var path = option.series[0].data; //后台交互数据
    //页面加载时渲染数据
    var Chart = echarts.init($("#main").get(0));
    queryStrategy(); //查询策略树
    Chart.setOption(option, true);
    Chart.on("click", eventlisten);
    //节点点击
    function eventlisten(param) {
        console.log(param);
        nowId = param.data.id;
        nowparentId = param.data.parentId;
        nowOutParam = param.data.outParam;
        nowRuleCode = param.data.ruleCode;
        $("#tool").show();
        $("#ruleDetail").hide();
    }

    $(".save").click(function() {
        var SuccessFun = function(data) {
            console.log(data);
        };
        var ErrorFun = function(log) {
            console.log(log)
        };
        AJAX_POST("strategy/savestrategy", path, SuccessFun, ErrorFun);
    })
    //添加子节点
    $('#tool').on('click', '.addNode', function() {
        if (nowRuleCode) {
            $("#tool").hide();
            obj = {
                id: (new Date()).getTime()
            };
            creatInput(); //layer弹窗内容
        } else {
            toolTip.msgSuccess("请先配置本节点规则");
        }
    })

    function creatInput() {
        //弹出框内容
        var contentHtml = '<div class="contentHtml">';
        contentHtml += '<p>您正在添加节点，请先设置添加节点的生效前提——上一级节点<span class="dec"></span>执行结果： </p>';
        contentHtml += '<div class="factorSelect">';
        contentHtml += '<li>';
        for (var i = 0; i < nowOutParam.length; i++) {
            contentHtml += '<label><img src="../../images/no.png" alt="no">';
            contentHtml += '<input type="checkbox" value="' + nowOutParam[i].value + '" name="trigger">';
            contentHtml += '<span>' + nowOutParam[i].name + '</span></label>';
        };
        contentHtml += '</li>';
        contentHtml += '<li><input type="button" value="确定" class="add_btn">';
        contentHtml += '<input type="button" value="取消" class="cancel_btn"></li>';
        contentHtml += '</div>';
        contentHtml += '<div class="tips">';
        contentHtml += '<hr/>';
        contentHtml += '<p>备注：</p>';
        contentHtml += '<p>1、可多选，如全部勾选，则视为无条件触发您正在添加的节点；</p>';
        contentHtml += '<p>2、结果仅可被勾选一次，再次添加节点时，已被其他同级节点设置绑定的结果不可再被选择。</p>';
        contentHtml += '</div>';
        contentHtml += '</div>';
        toolTipindex = toolTip.html(contentHtml);
    };
    //layer弹窗确定添加节点
    $("body").on("click", ".add_btn", function() {
        obj.trigger = [];
        obj.triggerName = [];
        $(".factorSelect").find("input").each(function() {
            if ($(this).is(":checked")) {
                obj.trigger.push($(this).val());
                obj.triggerName.push($(this).next("span").text());
            }
        });
        if (obj.trigger.length) {
            obj.name = obj.triggerName.join("/");
            obj.trigger = obj.trigger.join(",");
            obj.triggerName = obj.triggerName.join(",");
            // obj.trigger = $(".factorSelect").find("input:checked").val();
            // obj.triggerName = $(".factorSelect").find("input:checked").next("span").text();
            // obj.name = $(".factorSelect").find("input:checked").next("span").text();
            obj.parentId = nowId;
            recursionAdd(path, nowId, obj); //地柜找到数据节点插入数据
            toolTip.close(toolTipindex); //关闭弹窗
            Chart.setOption(option, true); //重新渲染
            empty(); //置空
        } else {
            toolTip.message("请至少选择一个触发条件!");
        }
    })


    //编辑
    $('#tool').on('click', '.edit', function() {
        $("#tool").hide();
        $('#ruleDetail').show();
        $(".info").text("");
        $(".detailContent").empty();
        showFactor();
    })
    //规则列表请求
    function showFactor() {
        var Data = {};
        var SuccessFun = function(data) {
            console.log(data);
            if (data.code == "0") {
                var RuleListOption = "<option value=''>请选择规则</option>";
                for (var i = 0; i < data.data.length; i++) {
                    RuleListOption += "<option value='" + data.data[i].value + "'>" + data.data[i].name + "</option>";
                };
                $(".selectContent").empty();
                $(".selectContent").append(RuleListOption);
            } else {
                toolTip.msgSuccess("获取规则列表失败");
            }
        };
        var ErrorFun = function() {
            toolTip.msgSuccess("获取规则列表发生错误")
        };
        AJAX_POST("rule/getallvalidrulelist", Data, SuccessFun, ErrorFun);
    }
    //对应规则因子及输出请求
    $('.selectContent').change(function() {
        if (inputCheck.isEmpty($('.selectContent').children("option:selected").val())) {
            return false;
        };
        var Data = {};
        Data.ruleCode = $('.selectContent').children("option:selected").val(); //根据rulecode查询规则因子
        var SuccessFun = function(data) {
            console.log(data);
            var DetailList = "";
            if (data.code == "0") {
                var factorParam = data.data.factorParam;
                nowRuleName = data.data.name;
                queryOutParam = data.data.outParam;
                nowRuleCode = data.data.ruleCode;
                $(".info").text(data.data.inInfo);
                if (factorParam) {
                    DetailList += "<form class='factorParamForm'>";
                    for (var i = 0; i < factorParam.length; i++) {
                        if (factorParam[i].type == "0") {
                            DetailList += "<li>";
                            DetailList += "<span>" + factorParam[i].name + "</span>";
                            DetailList += "<input type='text' name='" + factorParam[i].key + "' value=''>";
                            DetailList += "</li>";
                        } else if (factorParam[i].type == "1") {
                            DetailList += "<li>";
                            DetailList += "<span>" + factorParam[i].name + "</span>";
                            DetailList += "<select name='" + factorParam[i].key + "'>";
                            for (var j = 0, selectList = factorParam[i].selectList; j < selectList.length; j++) {
                                DetailList += "<option value='" + selectList[j].value + "'>" + selectList[j].name + "</option>";
                            };
                            DetailList += "</select>";
                            DetailList += "</li>";
                        }
                    };
                } else {
                    toolTip.message("无因子");
                }
                DetailList += "<li><input type='button' value='确定' class='Detail_btn'>";
                DetailList += "<input type='button' value='取消' class='cancel_btn'></li>";
                DetailList += "</form>";
                $(".detailContent").empty();
                $(".detailContent").append(DetailList);
            } else {
                toolTip.msgSuccess("获取规则对应因子列表失败");
            }

        };
        var ErrorFun = function() {
            toolTip.msgSuccess("获取规则对应因子列表发生错误");
        };
        AJAX_POST("rule/getruleinfobycode", Data, SuccessFun, ErrorFun);
    })
    //提交因子
    $("#ruleDetail").on("click", ".Detail_btn", function() {
        nowFactorParam = $(".factorParamForm").serializeArray();
        recursionEdit(path, nowId, nowRuleName, queryOutParam, nowRuleCode, nowFactorParam);
        Chart.setOption(option, true); //重新渲染
        $("#ruleDetail").hide();
    })

    //节点修改
    $('#tool').on('click', '.modify', function() {
        if (nowparentId == "0") {
            toolTip.message("根节点无法修改触发条件");
            return false;
        };
        $("#tool").hide();
        recursionFather(path, nowparentId);
        var contentHtml = '<div class="contentHtml">';
        contentHtml += '<p>当前节点的生效前提——上一级节点<span class="dec"></span>的执行结果：</p>';
        contentHtml += '<div class="modifySelect">';
        contentHtml += '<li>';
        for (var i = 0; i < nowFatherOutParam.length; i++) {
            contentHtml += '<label>';
            contentHtml += '<img src="../../images/no.png" alt="">';
            contentHtml += '<input type="checkbox" value="' + nowFatherOutParam[i].value + '" name="trigger">';
            contentHtml += '<span>' + nowFatherOutParam[i].name + '</span>';
            contentHtml += '</label>';
        };
        contentHtml += '</li>';
        contentHtml += '<li><input type="button" value="确定" class="modify_btn">';
        contentHtml += '<input type="button" value="取消" class="cancel_btn"></li>';
        contentHtml += '</div>';
        contentHtml += '<div class="tips">';
        contentHtml += '<hr/>';
        contentHtml += '<p>备注：</p>';
        contentHtml += '<p>1、可多选，如全部勾选，则视为无条件触发您正在添加的节点；</p>';
        contentHtml += '<p>2、结果仅可被勾选一次，再次添加节点时，已被其他同级节点设置绑定的结果不可再被选择。</p>';
        contentHtml += '</div>';
        contentHtml += '</div>';
        toolTip.html(contentHtml);
    })
    //layer弹窗修改触发条件
    $("body").on("click", ".modify_btn", function() {
        var newTrigger = [];
        var newTriggerName = [];
        // var name = [$(".modifySelect").find("input:checked").next("span").text()];
        $(".modifySelect").find("input").each(function() {
            if ($(this).is(":checked")) {
                newTrigger.push($(this).val());
                newTriggerName.push($(this).next("span").text());
            }
        });
        if (newTrigger.length) {
            recursionModify(path, nowId, newTrigger, newTriggerName);
            toolTip.closeAll();
            Chart.setOption(option, true); //重新渲染
            empty();
        } else {
            toolTip.message("请至少选择一个触发条件");
        }
    })

    //节点删除
    $('#tool').on('click', '.del', function() {
        if (nowparentId == "0") {
            toolTip.message("根节点不允许删除！");
            return false
        }
        var del_confirm = toolTip.confirm("删除节点会将本节点及本节点子节点全部删除，确定删除？", successFun, cancelFun)

        function successFun() {
            $("#tool").hide();
            toolTip.close(del_confirm);
            recursionDelete(path, nowparentId, nowId);
            Chart.setOption(option, true);
            empty();
        };

        function cancelFun() {
            toolTip.closeAll();
            return false
        };
    })

    //取消通用点击事件
    $("body").on("click", ".cancel_btn", function() {
        $("#ruleDetail").hide();
        toolTip.closeAll();
    })
    //点击选中事件
    $("body").on("click", "label", function() {
        if ($(this).children("img").attr("src").indexOf("no.png") != -1) {
            $(this).children("img").attr("src", "../../images/ok.png");
            $(this).children("input[type='checkbox']").attr("checked", "checked");
            return false;
        } else {
            $(this).children("img").attr("src", "../../images/no.png");
            $(this).children("input[type='checkbox']").removeAttr("checked");
            return false;
        }
    })
    //节点生成递归
    function recursionAdd(arr, id, child) {
        arr.forEach(function(v) {
            if (v.id == id) {
                if (!v.children) {
                    v.children = [];
                }
                if (v.name != '') {
                    if (v.children.length < nowOutParam.length) {
                        v.children.push(child);
                        return false;
                    } else {
                        toolTip.message("添加节点数量已到上限");
                    }
                }

            } else {
                if (v.children) {
                    recursionAdd(v.children, id, child);
                }
                return false;
            }
        })
    };
    //节点编辑递归
    function recursionEdit(arr, id, nowRuleName, queryOutParam, nowRuleCode, nowFactorParam) {
        arr.forEach(function(v) {
            if (v.id == id) {
                if (v.id == "0") {
                    v.name = nowRuleName;
                } else {
                    v.name = v.triggerName + '\n' + nowRuleName;
                }
                v.ruleName = nowRuleName;
                v.outParam = queryOutParam;
                v.ruleCode = nowRuleCode;
                v.factorParam = nowFactorParam;
                v.graphParam = {
                    canSetOutParam: queryOutParam
                };
                return false;
            } else {
                if (v.children) {
                    recursionEdit(v.children, id, nowRuleName, queryOutParam, nowRuleCode, nowFactorParam);
                } else {
                    return false;
                }
            }
        })
    };
    //修改节点触发条件递归
    function recursionModify(arr, id, newTrigger, newTriggerName) {
        arr.forEach(function(v) {
            if (v.id == id) {
                v.ruleName = v.ruleName || "";
                v.name = newTriggerName.join(",") + '\n' + v.ruleName;
                v.triggerName = newTriggerName.join(",");
                v.trigger = newTrigger.join(",");
                return false;
            } else {
                if (v.children) {
                    recursionModify(v.children, id, newTrigger, newTriggerName);
                } else {
                    return false;
                }
            }
        })
    }

    //节点删除递归遍历
    function recursionDelete(arr, nowparentId, nowId) {
        arr.forEach(function(v) {
            if (v.id == nowparentId) {
                v.children.forEach(function(val, index) {
                    if (val.id == nowId) {
                        v.children.splice(index, 1);
                        return false;
                    }
                })
            } else {
                if (v.children) {
                    recursionDelete(v.children, nowparentId, nowId);
                } else {
                    return false;
                }
            }
        })
    };
    //父节点数据位置递归
    function recursionFather(arr, nowparentId) {
        arr.forEach(function(v) {
            if (v.id == nowparentId) {
                nowFatherOutParam = v.outParam;
                return false;
            } else {
                if (v.children) {
                    recursionFather(v.children, nowparentId);
                } else {
                    return false;
                }
            }
        })
    };
    //规则输出配置状态递归
    function recursionStatus(arr, parentId) {
        var configured = [];
        arr.forEach(function(v) {
            if (v.id == parentId) {
                configured = v.outInfo.split("/");
                if (v.children) {
                    v.children.forEach(function() {
                        var index = configured.indexOf(val);
                        configured.splice(index, 1);
                    })
                }
                return false;
            } else {
                if (v.children) {
                    recursionStatus(v.children, id);
                } else {
                    return false;
                }
            }
        })
    }
    //节点name递归
    function recursionName(data) {
        data.forEach(function(v) {
            v.name = v.triggerName + '\n' + v.ruleName;
            if (v.children) {
                recursionName(v.children);
            }
            return false
        })
    }
    //置空所有操作参数
    function empty() {
        nowId = "";
        nowparentId = "";
        nowOutParam = "";
    }
    //查询策略树
    function queryStrategy() {
        var Data = {
            id: "3"
        };
        var SuccessFun = function(data) {
            if (data.code == "0") {
                option.title.text = data.data.strategyName;
                option.series[0].data = data.data.ruleList;
                path = data.data.ruleList;
                recursionName(path);
                console.log(data);
            }
        };
        var ErrorFun = function(log) {
            console.log(log);
        };
        AJAX_POST("strategy/querystrategy", Data, SuccessFun, ErrorFun);
    }
});
