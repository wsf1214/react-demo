var React=require("react");
var ReactDOM = require("react-dom");

var Home=require("./Home");
var HomeHeader=require("./HomeHeader");

var Order=React.createClass({
	getInitialState:function(){
		return {
			mountType:this.props.mountType,
			activeIndex:0,
			orderList:""
		}
	},	
	makeText:function(str,time){		
		var that =this;
		$("#toast").show();
		$("#tip").html(str);
		setTimeout(function(){
			$("#toast").hide();
		},time)
	},
	render:function(){
		return(			
			<div id="orderContent">
				<div id="empty">
					<div className="orderTip">您还没有相关订单</div>
					<div className="toHome">赶紧去逛逛吧</div>
				</div>
				<ul id="have">
					{this.state.orderList}
				</ul>
			</div>
		)
	},
	componentDidMount:function(){	
		var that =this;
		if(localStorage.getItem("orderList")&&localStorage.getItem("orderList")!="[]"){
			var data=JSON.parse(localStorage.getItem("orderList"));
			console.log(data);
			var len=data.length;
			var arr=[];
			for(var i=0;i<len;i++){
				arr.push(<li className="orderList" key={Math.random()}>
						<div className="proPic"><img src = {data[i].goodsImg}/></div>
						<div className="proInfo">
							<p className="proName">{data[i].goodsName}</p>
							<div className="sizePrice">
								<p>￥<span>{data[i].price}</span></p>
								<p>总价: ￥<span className="unitPrice1">{data[i].price*1*data[i].number*1}</span></p>
							</div>
							<p className="proNum" >数量: <span>{data[i].number}</span></p>
						</div>
					</li>)
			}
			that.setState({
				orderList:arr
			})
		}
		else{
			$("#empty").show();
			$("#have").hide();
		}
		
		$(".toHome").on("tap",function(){
			var Footer=require("./Footer")
			ReactDOM.unmountComponentAtNode(content);
			ReactDOM.render(<Home/>,content);
			ReactDOM.unmountComponentAtNode(header);
			ReactDOM.render(<HomeHeader/>,header);
			ReactDOM.unmountComponentAtNode(document.getElementById("footer"));
			ReactDOM.render(<Footer footerIndex="0"/>,document.getElementById("footer"));
		});		
	}	
})
module.exports=Order;