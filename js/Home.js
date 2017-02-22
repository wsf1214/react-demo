var React=require("react");
var ReactDOM=require("react-dom");

var header=document.getElementById("header");
var content=document.getElementById("content");
var footer=document.getElementById("footer");
var Home=React.createClass({
	getInitialState:function(){
		return {
			homeLists:"",
			imgsList:"",
			activeIndex:""
		}
	},

	componentWillMount:function(){
		var that=this;
		var imgs=[
			"http://i.okaybuy.cn/images/multipic/new/201612/34/340a016e392a1a0a504c7cdf54fd8947.jpg",
			"http://i.okaybuy.cn/images/multipic/new/201612/08/088789aaccbc464c4be0d21b26c2b22b.jpg",
			"http://i.okaybuy.cn/images/multipic/new/201612/ed/ed931aac1aad3541529f81c4f95ad27b.jpg",
			"http://i.okaybuy.cn/images/multipic/new/201612/70/705cdb95ebea937db409af3d9739f1e2.jpg",
			"http://i.okaybuy.cn/images/multipic/new/201612/4e/4e4b4b06c2e53109fdb751c7507858a6.jpg",
			"http://i.okaybuy.cn/images/multipic/new/201612/db/db0e32bca62325bfaef21464f161a241.jpg",
			"http://i.okaybuy.cn/images/multipic/new/201612/c2/c29d382bc6a183c72b08f3b42dcc4f23.jpg"
		];
		var arr=[];
		for(var i=0;i<imgs.length;i++){
			arr.push(<div className="swiper-slide" key={Math.random()}><img src={imgs[i]}/></div>)
		};	
		$.getJSON("json/homeList.json",function(data){
			var arr1=[];
			for(var i=0;i<data.length;i++){
				arr1.push(<li  key={Math.random()} className="homeList">
			    		<img src={data[i].img} alt="1"/>
				    	<p>
				    		<span>{data[i].color}</span>
				    		{data[i].normal}
				    	</p>			    	
			    	</li>)
			}
			that.setState({
				homeLists:arr1				
			});
		})
		that.setState({
			imgsList:arr	
		});		
	},
	render:function(){
		return(			
			<div id="homeContent">
				<div className="swiper-container" id="homeSwiper">
				    <div className="swiper-wrapper">
				        {this.state.imgsList}
				    </div>
				    <div className="swiper-pagination"></div>				   
				</div>
				 <ul className="someLinks">
			    	<li>
			    		<img src="http://1.js.lx.okbuycdn.com/resources/complete/images/index/index-brand.png"/>
			    		品牌			    	
			    	</li>
			    	<li id="goKind">
			    		<img src="http://1.js.lx.okbuycdn.com/resources/complete/images/index/index-category.png"/>
			    		分类			    	
			    	</li>
			    	<li>
			    		<img src="http://1.js.lx.okbuycdn.com/resources/complete/images/index/index-order.png"/>
			    		我的订单			    	
			    	</li>
			    	<li>
			    		<img src="http://1.js.lx.okbuycdn.com/resources/complete/images/index/index-like.png"/>
			    		我的收藏			    	
			    	</li>
			    </ul>
			    <div className="tips">
			    	<i className="iconfont">&#xe600;</i>评价晒单有机会得现金券哦
			    </div>
			    <ul className="homeLists">
			    	{this.state.homeLists}		    
			    </ul>
			    <div className="goTop"><i className="iconfont">&#xe612;</i></div>
			</div>
		)
	},
	componentDidMount:function(){
		var that=this;
		var swiper = new Swiper(".swiper-container",{
			"pagination":".swiper-pagination",
			autoplay:2000,
			loop:true,
			autoplayDisableOnInteraction:false
		});
		$("#goKind").tap(function(){			
			$("#footer li").eq(1).trigger("click");
		});	
		
	},
	componentDidUpdate:function(){
		$(".homeList").tap(function(){
			var List=require("./List");
			var ListHeader=require("./ListHeader");
			var index=$(this).index();
			ReactDOM.unmountComponentAtNode(content);
			ReactDOM.render(<List index={index} backOne="home"/>,content);
			ReactDOM.unmountComponentAtNode(header);
			ReactDOM.render(<ListHeader back="home"/>,header);
			$("#footer").hide();
		});
		$("#homeContent").scroll(function(){
			var a=$("#homeContent").scrollTop();			
			if(a>=400){
				$(".goTop").show()
			}
			else{
				$(".goTop").hide()
			}
		});
		$(".goTop").tap(function(){	
			var a =$("#homeContent").scrollTop();

			var time=100;
			var pre=time/(a/10);
			var timer=setInterval(function(){
				var b=$("#homeContent").scrollTop();
				$("#homeContent").scrollTop(b-10);
				if(b<=0){
					clearInterval(timer);
				}
			},pre)
		});
		
	}
})
module.exports=Home;