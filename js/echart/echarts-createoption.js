///创建一个通用的创建option的方法
//json针对只有一个显示json的图表的显示值
//reartName 给图表起的名称
//arr1针对需要显示两个数组数据的图表 如柱状图。其是显示第一个数组数据
//arr2针对需要显示两个数组数据的图表 如柱状图。其是显示第二个数组数据
//chartType 图表展示的类型
//json针对只有一个显示json的图表的显示值
//reartName 给图表起的名称
//arr1针对需要显示两个数组数据的图表 如柱状图。其是显示第一个数组数据
//arr2针对需要显示两个数组数据的图表 如柱状图。其是显示第二个数组数据
//chartType 图表展示的类型
function getOptionByArray(json, reportName,arr1,arr2,chartType,flag) {  
	var arr={};
	var option ={};

	// 根据不同的图表进行创建不同的图表option
	if(chartType=="pie" && flag=='solid'){// 创建饼图实心的
		 option = {  
			        title : {  
			            text: reportName,  
			            x:'left'  
			        },  
			        tooltip : {  
			        	showDelay:0,
			        	show:false,
			            trigger: 'item',  
			            formatter: "{a} <br/>{b} : {c}%"  
			        },  
			        calculable : true,  
			        series : [  
			            {  
			                name:"比例",  
			                type:chartType,  
			                radius : '55%',  
			                center: ['50%', '60%'],  
			                data:json,
			                itemStyle:{ 
			                    normal:{ 
			                          label:{ 
			                            show: true, 
			                        // position: 'inner',//设置文字显示在内部
			                            formatter: '{b} : {c}%' 
			                          },
			                          labelLine :{show:true} // 设置是否需要显示指示线
			                        } 
			                    } 
			            }  
			        ]
			    };  
	}if(chartType=="pie" && flag=='hollow'){// 创建饼图空心的
		option = {
			    tooltip : {
			    	showDelay:0,
			    	show:true,
			        trigger: 'item',
			        formatter: "{b} : {c}%"  
			    },
			    
			    // calculable : true,
			    series : [
			        {
			            name:'',
			            type:'pie',
			            // radius : ['40%'],
						radius:['30%','60%'],
			            itemStyle : {
			                normal : {
			                    label : {
			                        show : true,
			                        formatter: '{b} : {c}%'
			                    },
			                    labelLine : {
			                        show : true
			                    }
			                },
			                
			            },
			            data:json
			        }
			    ]
			};
			                    
	}else if(chartType=="line" && flag=='y'){// 创建折线图
		option = {
			    title : {
			        text: reportName,
			        subtext: ''
			    },
			    tooltip : {
			    	show:false,
			        trigger: 'axis',
			        formatter:"{b}<br/>{c}%",
			        axisPointer : {  
			        	type : 'shadow'
			        }
			    },
			    toolbox: {
			        show : true
			    },
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            data :arr1
			        },
			        
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            axisLabel:{formatter:'{value}%'}
			        }
			    ],
			    series : [
			        {
// name:'',
			            type:chartType,
			            itemStyle: {normal: {color:'#1E90FF', label:{show:false}}},
			            lineStyle:{normal:{label:{show:true}}},
			            // itemStyle:
						// {normal:{label:{position:'top',show:true}}},
			            data:arr2
			        }
			    ]
			};
	}else if(chartType=="line" && flag=='one'){// 创建一条线图
		option = {
			    title : {
			        text: '',
			        subtext: ''
			    },
			    tooltip : {
			    	show:true,
			    	showDelay:0,
			        trigger: 'axis',
			        formatter:"{b}<br/>{c}",	
			    },
			    legend: {
			        data:['']
			    },			  
			    // calculable : true,
			    grid :{ borderWidth :'0px',x:90 },
			    xAxis : [
			        {
			            type : 'category',
			            // boundaryGap : ['0.1','0.1'],
			            splitLine:{show:false},
						boundaryGap : true,// 类目起始和结束两端空白策略，默认为true留空，false则顶头
						axisLine:{show:false},// 坐标轴线
						axisTick:{show:false},// 坐标轴小标记，数值轴和时间轴默认不显示
			            data : arr1
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
						axisLine:{show:false},// 坐标轴线
						axisTick:{show:false},// 坐标轴小标记，数值轴和时间轴默认不显示
						//axisLabel:{formatter:'{value}'}
			        }
			    ],
			    series : [
			        {
			            name:'',
			            type:chartType,
			            smooth:true,// 平滑曲线显示
						symbol:'none',// 不显示折线点；标志图形类型，默认自动选择（8种类型循环使用，不显示标志图形可设为'none'）
			            itemStyle: {
							normal: {
								// color:'#55aaff',//折线点颜色
								areaStyle: {color:'rgba(85,170,255,0.2)',type: 'default'},
								lineStyle:{color: "#55aaff" },
								borderWidth:'0px'
							},
							borderWidth:'0px'
						},
			            data:arr2
			        }
			    ]
			};
			                    
			                    
	}else if(chartType=="line" && flag=='%'){// 创建一条线图
		option = {
			    title : {
			        text: '',
			        subtext: ''
			    },
			    tooltip : {
			    	showDelay:0,
			    	show:true,
			        trigger: 'axis',
			        formatter:"{b}<br/>{c}%",	
			    },
			    legend: {
			        data:['']
			    },			  
			    // calculable : true,
				grid :{ borderWidth :'0px' },
			    xAxis : [
			        {
			            type : 'category',
			            // boundaryGap : ['0.1','0.1'],
			            splitLine:{show:false},
						boundaryGap : true,// 类目起始和结束两端空白策略，默认为true留空，false则顶头
						axisLine:{show:false},// 坐标轴线
						axisTick:{show:false},// 坐标轴小标记，数值轴和时间轴默认不显示
			            data : arr1
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
						axisLine:{show:false},// 坐标轴线
						axisTick:{show:false},// 坐标轴小标记，数值轴和时间轴默认不显示
						axisLabel:{formatter:'{value}%'}
			        }
			    ],
			    series : [
			        {
			            name:'',
			            type:chartType,
			            smooth:true,// 平滑曲线显示
						symbol:'none',// 不显示折线点；标志图形类型，默认自动选择（8种类型循环使用，不显示标志图形可设为'none'）
			            itemStyle: {
							normal: {
								// color:'#55aaff',//折线点颜色
								areaStyle: {color:'rgba(85,170,255,0.2)',type: 'default'},
								lineStyle:{color: "#55aaff" },
								borderWidth:'0px'
							},
							borderWidth:'0px'
						},
			            data:arr2
			        }
			    ]
			};
			                    
			                    
	}else if(chartType=="line" && flag=='two'){// 创建两条线图
		option = {
			    title : {
			        text: '',
			        subtext: ''
			    },
			    tooltip : {
			    	showDelay:0,
			    	show:false,
			        trigger: 'axis'
			    },
			    legend: {
			        data:['']
			    },
			  
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : false,
			            data : json
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value'
			        }
			    ],
			    series : [
			        {
			            name:'',
			            type:chartType,
			            smooth:true,
			            itemStyle: {normal: {areaStyle: {type: 'default'}}},
			            data:arr1
			        },
			        {
			            name:'',
			            type:chartType,
			            smooth:true,
			            itemStyle: {normal: {areaStyle: {type: 'default'}}},
			            data:arr2
			        }
			    ]
			};
			                    
			                    
	}else if(chartType=="bar" && flag=='right'){// 创建柱状图并且y坐标轴在右边显示
		option = {
			    title : {
			        text: reportName,
			        subtext: ''
			    },
			    tooltip : {
			    	show:false,
			        trigger: 'axis',
			        formatter:"{b}<br/>{c}",
			        axisPointer : {  
			        	type : 'shadow'
			        }
			    },
			    toolbox: {
			        show : true
			    },
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            data :arr1,
			            axisLabel:{
			                textStyle:{
			                   color:"black", // 刻度颜色
			                   fontSize:9  // 刻度大小
			              }
			            }
			        },
			        
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            axisLabel:{formatter:'{value}%'}
			        }
			    ],
			    series : [
			        {
			        	// barWidth : 50,//柱图宽度
// name:'',
			            type:chartType,
			            itemStyle: {normal: {color:'#1E90FF', label:{show:true}}},
			            data:arr2
			        }
			    ]
			};
	}else if(chartType=="bar" && flag=='left'){// 创建柱状图并且y坐标轴在右边显示
		option = {
			    title : {
			        text: reportName,
			        subtext: ''
			    },
			    tooltip : {
			    	show:true,
			    	showDelay:0,
			        trigger: 'axis',
			        formatter:"{b}：{c}%",
			        axisPointer : {  
			        	type : 'shadow'
			        }
			    },
			    toolbox: {
			        show : false
			    },
				grid :{ borderWidth :'0px' },
			    xAxis : [
			        {
			            type : 'category',
			            data :arr1,
			            splitLine:{show:false},
		                axisTick: {show: false},
						axisLine:{show:false} // 坐标轴线
			        }			        
			    ],
			    yAxis : [
			        {
			        	// position:'left',//设置y显示在右边
			            type : 'value',
			            // lineStyle:{show:false},
						axisLine:{show:false},// 坐标轴线
						axisTick:{show:false},// 坐标轴小标记，数值轴和时间轴默认不显示
			            axisLabel:{formatter:'{value}%'}
			        }
			    ],
			    series : [
			        {
			        	// barWidth : 50,//柱图宽度
			        	// name:'',
			           type:chartType,
			           itemStyle: {normal: {color:'#1E90FF',
					   label:{show:false,}}},
			           data:arr2
			        }
			    ]
			};
		if(arr2.length<=10){
			option.series[0].barWidth=46;
		}	
	}else if(chartType=="bar" && flag=='left_color_75baff'){// 创建柱状图并且y坐标轴在右边显示
		option = {
			    title : {
			        text: reportName,
			        subtext: ''
			    },
			    tooltip : {
			    	show:true,
			    	showDelay:0,
			        trigger: 'axis',
			        formatter:"{b}：{c}%",
			        axisPointer : {  
			        	type : 'shadow'
			        }
			    },
			    toolbox: {
			        show : false
			    },
			// calculable : true,
				grid :{ borderWidth :'0px' },
			    xAxis : [
			        {
			            type : 'category',
			            data :arr1,
			            splitLine:{show:false},
		                axisTick: {show: false},
						axisLine:{show:false} // 坐标轴线
			        },
			        
			    ],
			    yAxis : [
			        {
			        	// position:'left',//设置y显示在右边
			            type : 'value',
			            lineStyle:{show:false},
			            axisLine: {show: false},
			            axisTick: {show: false},
			            axisLabel:{formatter:'{value}%'}
			        }
			    ],
			    series : [
			        {
			        	// barWidth : 50,//柱图宽度
// name:'',
			            type:chartType,
			          // itemStyle: {normal: {color:'#1E90FF',
						// label:{show:false}}},
			            itemStyle: {normal: {  // 此处设置了每个柱状显示不同颜色
			            	 color: function(params) {
		                            // build a color map as your need.
		                            var colorList = [
		                              '#75baff','#75baff','#75baff','#75baff','#75baff',
		                              '#75baff','#75baff','#75baff','#75baff','#75baff',
		                              '#75baff','#75baff','#75baff','#75baff','#75baff',
		                              '#75baff','#75baff','#75baff','#75baff','#75baff'
		                            ];
		                            return colorList[params.dataIndex]
		                        },
			            }},
			            data:arr2
			        }
			    ]
			};
			if(arr2.length<=10){
			option.series[0].barWidth=46;
		}	
	}else if(chartType=="bar" && flag=='left_gender'){// 创建柱状图并且y坐标轴在右边显示
		option = {
			    title : {
			        text: reportName,
			        subtext: ''
			    },
			    tooltip : {
			    	show:true,
			    	showDelay:0,
			        trigger: 'axis',
			        formatter:"{b}：{c}%",
			        axisPointer : {  
			        	type : 'shadow'
			        }
			    },
			    toolbox: {
			        show : false
			    },
				grid :{ borderWidth :'0px' },
			    xAxis : [
			        {
			            type : 'category',
			            data :arr1,
			            splitLine:{show:false},
						axisTick: {show: false},
						axisLine:{show:false} // 坐标轴线
			        }			        
			    ],
			    yAxis : [
			        {
			        	// position:'left',//设置y显示在右边
			            type : 'value',
			            splitNumber:4,
			            lineStyle:{show:false},
			            axisLine: {show: false},						
			            axisTick: {show: false},
			            axisLabel:{formatter:'{value}%'}
			        }
			    ],
			    series : [
			        {
			        	barWidth : 100,// 柱图宽度
			        	// name:'',
			            type:chartType,
			            itemStyle: {
			            	normal: {  // 此处设置了每个柱状显示不同颜色
			            		/* label: {
			                         show: false,
			                         position: 'top',
			                         textStyle: {
			                            color: '#800080'
			                         }
			                     },*/
			                     
			            	 color: function(params) {
		                            var colorList = [
		                              '#75baff','#f46fa4'
		                            ];
		                            return colorList[params.dataIndex]
		                        },
			            }},
						markPoint : {
							symbolSize:20,
							data : [							
							//	{xAxis: arr1[0],yAxis:(Number(arr2[0])+10),symbol:'../../images/b.png'},
							//	{xAxis: arr1[1],yAxis:(Number(arr2[1])+10),symbol:'../../images/g.png'}
							]
							
						},
			            data:arr2
			        }
			    ]
			};
	}
	else if(chartType=="bar" && flag=='bar'){
		option = {
				tooltip : {
			    	show:true,
			    	showDelay:0,
			        trigger: 'axis',
			        formatter:"{b}：{c}",
			        axisPointer : {  
			        	type : 'shadow'
			        }
			    },
			    toolbox: {
			        show : true
			    },
			    calculable : true,
				grid :{ borderWidth :'0px',x:150 },
			    xAxis : [
			        {
						show:false,// 隐藏坐标
			            type : 'value',
			            boundaryGap : [0, 0.01]
			        }
			    ],
			    yAxis : [
			        {
						axisLine:{show:false},// 坐标轴线
						axisTick:{show:false},// 坐标轴小标记，数值轴和时间轴默认不显示
						splitLine:{show: false},// 去除网格线
						axisLabel:{margin:20,textStyle:{fontSize:14},interval:0},//坐标轴文本标签与坐标轴的间距，默认为8，单位px
			            type : 'category',
			            data : arr1
			        }
			    ],
			    series : [
			        {
			        	barWidth : 8,//柱图宽度
			            itemStyle: {
							normal: {  // 此处设置了每个柱状显示不同颜色
			            	 color: function(params) {
		                            // build a color map as your need.
		                            var colorList = [
										'#eeeeee','#e6eff7','#e5f3ff','#bbdefb','#90caf9',
										'#5b98f1','#2196f3','#1976d2','#00509f','#184785'
		                            ];
		                            return colorList[params.dataIndex]
		                        },
			            }},
			            type:'bar',
			            data:arr2
			        }
			    ]
			};
		
	}else if(chartType=="bar" && flag=='bar%'){
		option = {
				tooltip : {
			    	show:true,
			    	showDelay:0,
			        trigger: 'axis',
			        formatter:"{b}：{c}%",
			        axisPointer : {  
			        	type : 'shadow'
			        }
			    },
			    toolbox: {
			        show : true
			    },
			    calculable : true,
				grid :{ borderWidth :'0px',x:150 },
			    xAxis : [
			        {
						show:false,// 隐藏坐标
			            type : 'value',
			            boundaryGap : [0, 0.01]
			        }
			    ],
			    yAxis : [
			        {
						axisLine:{show:false},// 坐标轴线
						axisTick:{show:false},// 坐标轴小标记，数值轴和时间轴默认不显示
						splitLine:{show: false},// 去除网格线
						axisLabel:{margin:20,textStyle:{fontSize:14},interval:0},//坐标轴文本标签与坐标轴的间距，默认为8，单位px
			            type : 'category',
			            data : arr1
			        }
			    ],
			    series : [
			        {
			        	barWidth : 8,//柱图宽度
			            itemStyle: {
							normal: {  // 此处设置了每个柱状显示不同颜色
			            	 color: function(params) {
		                            // build a color map as your need.
		                            var colorList = [
										'#eeeeee','#e6eff7','#e5f3ff','#bbdefb','#90caf9',
										'#5b98f1','#2196f3','#1976d2','#00509f','#184785'
		                            ];
		                            return colorList[params.dataIndex]
		                        },
			            }},
			            type:'bar',
			            data:arr2
			        }
			    ]
			};
		
	}else if(chartType=="bar" && flag==''){// 创建柱状图并且y坐标轴在右边显示
		option = {
			    title : {
			        text: reportName,
			        subtext: ''
			    },
			    tooltip : {
			    	show:true,
			    	showDelay:0,
			        trigger: 'axis',
			        formatter:"{b}<br/>{c}",
			        axisPointer : {  
			        	type : 'shadow'
			        }
			    },
			    toolbox: {
			        show : false
			    },
			   //calculable : true,
				grid :{ borderWidth :'0px',x:100 },
			    xAxis : [
			        {
			            type : 'category',
			            data :arr1,
			            splitLine:{show:false},
		                axisTick: {show: false},
						axisLine:{show:false} // 坐标轴线
			        },
			        
			    ],
			    yAxis : [
			        {
			        	// position:'left',//设置y显示在右边
			            type : 'value',
			            lineStyle:{show:false},
			            axisLine: {show: false},
			            axisTick: {show: false},
			           // max: 999999999 //值为数值的时候最大只能为9位数
			        //    axisLabel:{formatter:'{value}%'}
			        }
			    ],
			    series : [
			        {
			        	// barWidth : 50,//柱图宽度
			        	// name:'',
			            type:chartType,
			          // itemStyle: {normal: {color:'#1E90FF',
						// label:{show:false}}},
			            itemStyle: {normal: {  // 此处设置了每个柱状显示不同颜色
			            	 color: function(params) {
		                            // build a color map as your need.
		                            var colorList = [
		                              '#75baff','#75baff','#75baff','#75baff','#75baff',
		                              '#75baff','#75baff','#75baff','#75baff','#75baff',
		                              '#75baff','#75baff','#75baff','#75baff','#75baff',
		                              '#75baff','#75baff','#75baff','#75baff','#75baff'
		                            ];
		                            return colorList[params.dataIndex]
		                        },
			            }},
			            data:arr2
			        }
			    ]
			};
			if(arr2.length<=10){
			option.series[0].barWidth=46;
		}	
			
	}else if(chartType=='map' && flag=='count'){// 创建地图,当需要返回省份数据为数量时
		option = {
				title : {
					text: reportName,
					subtext: '',
					x:'left'
				},
		
		  tooltip : { 
			  		showDelay:0,
			  		trigger: 'item', formatter: function
				   (params,ticket,callback) { 
					  	var res = params.name+':';
					  	if(parseInt(params.value)>0){ 
						  	return res+params.value;
					  	}else{ return
					  		res+'0';
					  	} 
				  	} 
				},
		 
				legend: {
					orient: 'vertical',
					x:'left',
					data:['']
				},
				dataRange: {
					show:false,
					x: 'left',
					y: 'bottom',
					splitList: [
						{start: 150000, color:'#8B008B'},
						{start: 50000, end: 150000,color:'#8B2252'},
						{start: 20000, end: 50000,color:'#8B3A3A'},
						{start: 5000, end: 20000,color:'#8B4513'},
						{start: 1000, end: 5000, label: '1000 到 5000',color:'#8B4C39'},
						{start: 500 , end: 1000,color:'#8B5F65'},
						{start: 100 , end: 500,color:'#8B6914'},
						{start: 40 , end: 100,color:'#8B7765'},
					//	{start: 1, end: 40, color: '#BDE61A'}
						{start: 1, end: 40,color:'#8B7D7B'}
					],
					//color: ['#E0022B', '#E09107', '#A3E00B']
					//color: ['#FF3030', '#FF6EB4', '#FF8C00','#FFC1C1','#FFE4E1']
				},
				toolbox: {
					show: true,
					orient : 'vertical',
					x: 'right',
					y: 'center'
				},
				series : [
					{
						name: reportName,
						type: chartType,
						mapType: 'china',
						roam: false,
						selectedMode: 'single',
						itemStyle:{
							normal:{
								label:{
									show:true,
									textStyle: {
									   color: "rgb(249, 249, 249)"
									}
								}
							},
							emphasis:{label:{show:true}}
						},
						data:json
					}
				]
			};   
	}else if(chartType=='map' && flag=='rate'){// 创建地图,当需要返回省份数据为比例时
			option = {
					title : {
						text: reportName,
						subtext: '',
						x:'left'
					},
					tooltip : {
						showDelay:0,
						trigger: 'item',
						 formatter: function (params,ticket,callback) {
							 var res = params.name+':';	
							 if(parseInt(params.value)>0){
								 return res+params.value+'%';
							 }else{
								 return res+'0';
							 }
						 }
					},
					legend: {
						orient: 'vertical',
						x:'left',
						data:['']
					},
					dataRange: {
						show:false,
						x: 'left',
						y: 'bottom',
						splitList: [
									{start: 70, end: 100 ,color:'#8B0000'},
									{start: 50, end: 70 ,color:'#8B1C62'},
									{start: 30 , end: 50 ,color:'#8B3626'},
									{start: 20 , end: 30 ,color:'#8B4500'},
									{start: 10 , end: 20 ,color:'#8B4789'},
									{start: 1, end: 10, color: '#8B5A2B'}
							],
						//color: ['#E0022B', '#E09107', '#A3E00B']
					},
					toolbox: {
						show: true,
						orient : 'vertical',
						x: 'right',
						y: 'center'
					},
					series : [
						{
							name: reportName,
							type: chartType,
							mapType: 'china',
							roam: false,
							selectedMode: 'single',
							itemStyle:{
								normal:{
									label:{
										show:true,
										textStyle: {
										   color: "rgb(249, 249, 249)"
										}
									}
								},
								emphasis:{label:{show:true}}
							},
							data:json
						}
					]
				};   
		}
    return option;  
}  

// 针对点击地图省份进入到相对应的省下面的地区
function getOptionByProvince(json, reportName,chartType,selectedProvince,flag){
	if(chartType=='map' && flag=='count'){// 创建省份下面的市区地图,当需要返回省份数据为数量时
		option = {
				title : {
					text: reportName,
					subtext: '',
					x:'left'
				},
				tooltip : {
					showDelay:0,
					trigger: 'item',
					 formatter: function (params,ticket,callback) {
						 var res = params.name+':';	
						 if(parseInt(params.value)>0){
							 return res+params.value;
						 }else{
							 return res+'0';
						 }
					 }
				},
				legend: {
					orient: 'vertical',
					x:'left',
					data:['']
				},
				dataRange: {
					show:false,
					x: 'left',
					y: 'bottom',
					splitList: [
						{start: 150000, color:'#8B008B'},
						{start: 50000, end: 150000,color:'#8B2252'},
						{start: 20000, end: 50000,color:'#8B3A3A'},
						{start: 5000, end: 20000,color:'#8B4513'},
						{start: 1000, end: 5000, label: '1000 到 5000',color:'#8B4C39'},
						{start: 500 , end: 1000,color:'#8B5F65'},
						{start: 100 , end: 500,color:'#8B6914'},
						{start: 40 , end: 100,color:'#8B7765'},
						{start: 1, end: 40,color:'#8B7D7B'}
					],
					//color: ['#E0022B', '#E09107', '#A3E00B']
				},
				toolbox: {
					show: true,
					orient : 'vertical',
					x: 'right',
					y: 'center'
				},
				series : [
					{ 
						name: reportName,
						type: chartType,
						mapType: selectedProvince,
						roam: false,
						selectedMode: 'single',
						itemStyle:{
							normal:{
								label:{
									show:true,
									textStyle: {
									   color: "rgb(249, 249, 249)"
									}
								}
							},
							emphasis:{label:{show:true}}
						},
						data:json
					}
				]
			};   
	}else if(chartType=='map' && flag=='rate'){// 创建省份下面的市区地图,当需要返回省份数据为比例时
		option = {
				title : {
					text: reportName,
					subtext: '',
					x:'left'
				},
				tooltip : {
					showDelay:0,
					trigger: 'item',
					 formatter: function (params,ticket,callback) {
						 var res = params.name+':';	
						 if(parseInt(params.value)>0){
							 return res+params.value+'%';
						 }else{
							 return res+'0';
						 }
					 }
				},
				legend: {
					orient: 'vertical',
					x:'left',
					data:['']
				},
				dataRange: {
					show:false,
					x: 'left',
					y: 'bottom',
					splitList: [
						{start: 70, end: 100 ,color:'#8B0000'},
						{start: 50, end: 70 ,color:'#8B1C62'},
						{start: 30 , end: 50 ,color:'#8B3626'},
						{start: 20 , end: 30 ,color:'#8B4500'},
						{start: 10 , end: 20 ,color:'#8B4789'},
						{start: 1, end: 10, color: '#8B5A2B'}
					],
					//color: ['#E0022B', '#E09107', '#A3E00B']
				},
				toolbox: {
					show: true,
					orient : 'vertical',
					x: 'right',
					y: 'center'
				},
				series : [
					{
						name: reportName,
						type: chartType,
						mapType: selectedProvince,
						roam: false,
						selectedMode: 'single',
						itemStyle:{
							normal:{
								label:{
									show:true,
									textStyle: {
									   color: "rgb(249, 249, 249)"
									}
								}
							},
							emphasis:{label:{show:true}}
						},
						data:json
					}
				]
			};   
	}
	
	return option;
}




function getOptionByArray2(json, reportName,arr1,arr2,arr3,chartType,flag,name1,name2,name3) {  
	var arr={};
	var option ={};
	if(chartType=="line" && flag=='two'){// 创建两条线图
		option = {
				title : {
			        text: '',
			        subtext: ''
			    },
			    tooltip : {
			    	show:true,
			    	showDelay:0,
			        trigger: 'axis',
			      //  formatter:"{b}<br/>{c}",	
			    },
				color:['#55aaff','#96c600'],
			    legend: {
			        data:[name1,name2]
			    },
				grid :{ borderWidth :'0px' },
			    xAxis : [
			        {
			            type : 'category',
			            splitLine:{show:false},
						boundaryGap : true,// 类目起始和结束两端空白策略，默认为true留空，false则顶头
						axisLine:{show:false},// 坐标轴线
						axisTick:{show:false},// 坐标轴小标记，数值轴和时间轴默认不显示
			            data : json
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
						axisLine:{show:false},// 坐标轴线
						axisTick:{show:false}// 坐标轴小标记，数值轴和时间轴默认不显示
			        }
			    ],
			    /*dataZoom start*/
			    dataZoom: [
			               {   // 这个dataZoom组件，默认控制x轴。
			                   type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
			                   start: 10,      // 左边在 10% 的位置。
			                   end: 60         // 右边在 60% 的位置。
			               }
			           ],
			   /*dataZoom end*/    
			    series : [
			        {
			            name:name1,
			            type:chartType,
			            smooth:true,
						symbol:'none',// 不显示折线点；标志图形类型，默认自动选择（8种类型循环使用，不显示标志图形可设为'none'）
						itemStyle: {
							normal: {
						// //color:'#55aaff',//折线点颜色
								areaStyle: {color:'rgba(85,170,255,0.05)',type: 'default'},
								lineStyle:{color: "#55aaff"}
							}
						},						
			            data:arr1
			        },
			        {
			            name:name2,
			            type:chartType,
			            smooth:true,
						symbol:'none',// 不显示折线点；标志图形类型，默认自动选择（8种类型循环使用，不显示标志图形可设为'none'）
			            itemStyle: {
							normal: {
						// //color:'#55aaff',//折线点颜色
								areaStyle: {color:'rgba(86,207,67,0.05)',type: 'default'},
								lineStyle:{color: "#56cf43"}
							}
						},
			            data:arr2
			        }
			    ]
			};                    
	}else if(chartType=="line" && flag=='three'){// 创建两条线图
		option = {
				title : {
			        text: '',
			        subtext: ''
			    },
			    tooltip : {
			    	show:true,
			    	showDelay:0,
			        trigger: 'axis',
			      //  formatter:"{b}<br/>{c}",	
			    },
				color:['#55aaff','#96c600','#FF0000'],
			    legend: {
			        data:[name1,name2,name3]
			    },
				grid :{ borderWidth :'0px' },
			    xAxis : [
			        {
			            type : 'category',
			            splitLine:{show:false},
						boundaryGap : true,// 类目起始和结束两端空白策略，默认为true留空，false则顶头
						axisLine:{show:false},// 坐标轴线
						axisTick:{show:false},// 坐标轴小标记，数值轴和时间轴默认不显示
			            data : json
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
						axisLine:{show:false},// 坐标轴线
						axisTick:{show:false}// 坐标轴小标记，数值轴和时间轴默认不显示
			        }
			    ],
			    series : [
			        {
			            name:name1,
			            type:chartType,
			            smooth:true,
						symbol:'none',// 不显示折线点；标志图形类型，默认自动选择（8种类型循环使用，不显示标志图形可设为'none'）
						itemStyle: {
							normal: {
						// //color:'#55aaff',//折线点颜色
								areaStyle: {color:'rgba(85,170,255,0.05)',type: 'default'},
								lineStyle:{color: "#55aaff"}
							}
						},						
			            data:arr1
			        },
			        {
			            name:name2,
			            type:chartType,
			            smooth:true,
						symbol:'none',// 不显示折线点；标志图形类型，默认自动选择（8种类型循环使用，不显示标志图形可设为'none'）
			            itemStyle: {
							normal: {
						// //color:'#55aaff',//折线点颜色
								areaStyle: {color:'rgba(86,207,67,0.05)',type: 'default'},
								lineStyle:{color: "#56cf43"}
							}
						},
			            data:arr2
			        }, 
			        {
			            name:name3,
			            type:chartType,
			            smooth:true,
						symbol:'none',// 不显示折线点；标志图形类型，默认自动选择（8种类型循环使用，不显示标志图形可设为'none'）
			            itemStyle: {
							normal: {
						// //color:'#55aaff',//折线点颜色
								areaStyle: {color:'rgba(86,207,67,0.05)',type: 'default'},
								lineStyle:{color: "#FF0000"}
							}
						},
			            data:arr3
			        }
			    ]
			};                    
	}else if(chartType=="line" && flag=='mix'){// 创建折线和柱状图混合
		option = {
				title : {
			        text: '',
			        subtext: ''
			    },
			    tooltip : {
			    	show:true,
			    	showDelay:0,
			        trigger: 'axis',
			      //  formatter:"{b}<br/>{c}",	
			    },
				color:['#FFFF00','#55aaff','#96c600'],
			    legend: {
			        data:[name1,name2,name3]
			    },
				grid :{ borderWidth :'0px' },
			    xAxis : [
			        {
			            type : 'category',
			            splitLine:{show:false},
						boundaryGap : true,// 类目起始和结束两端空白策略，默认为true留空，false则顶头
						axisLine:{show:false},// 坐标轴线
						axisTick:{show:false},// 坐标轴小标记，数值轴和时间轴默认不显示
			            data : json
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
						axisLine:{show:false},// 坐标轴线
						axisTick:{show:false}// 坐标轴小标记，数值轴和时间轴默认不显示
			        }
			    ],
			    /*dataZoom start*/
			    dataZoom: [
			               {   // 这个dataZoom组件，默认控制x轴。
			                   type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
			                   start: 10,      // 左边在 10% 的位置。
			                   end: 60         // 右边在 60% 的位置。
			               }
			           ],
			   /*dataZoom end*/       
			           
			    series : [
			          {
			        	  barWidth : 50,
					      name:name1,
					      type:"bar",
					      smooth:true,
						  symbol:'none',// 不显示折线点；标志图形类型，默认自动选择（8种类型循环使用，不显示标志图形可设为'none'）
						  itemStyle: {
							normal: {
								// //color:'#55aaff',//折线点颜色
							areaStyle: {color:'rgba(85,170,255,0.05)',type: 'default'},
							lineStyle:{color: "#FFFF00"}
								}
							},						
					          data:arr1
					 },			              
			        {
			            name:name2,
			            type:chartType,
			            smooth:true,
						symbol:'none',// 不显示折线点；标志图形类型，默认自动选择（8种类型循环使用，不显示标志图形可设为'none'）
						itemStyle: {
							normal: {
						// //color:'#55aaff',//折线点颜色
								areaStyle: {color:'rgba(85,170,255,0.05)',type: 'default'},
								lineStyle:{color: "#55aaff"}
							}
						},						
			            data:arr2
			        },
			        {
			            name:name3,
			            type:chartType,
			            smooth:true,
						symbol:'none',// 不显示折线点；标志图形类型，默认自动选择（8种类型循环使用，不显示标志图形可设为'none'）
			            itemStyle: {
							normal: {
						// //color:'#55aaff',//折线点颜色
								areaStyle: {color:'rgba(86,207,67,0.05)',type: 'default'},
								lineStyle:{color: "#56cf43"}
							}
						},
			            data:arr3
			        }
			        
			    ]
			};                    
	}
	
	return option;
}











