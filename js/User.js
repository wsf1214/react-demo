var React=require("react");
var ReactDOM = require("react-dom");

var Collect=require("./Collect");
var CollectHeader=require("./CollectHeader");

var Order=require("./Order");
var OrderHeader=require("./OrderHeader");

var User=React.createClass({
	getInitialState:function(){
		return {
			mountType:this.props.mountType,
			Login:""
		}
	},
	makeText:function(str,time){
		var that =this;
		//吐司的封装函数
		$("#toast").show();
		$("#tip").html(str);
		setTimeout(function(){
			$("#toast").hide();
		},time)
	},	
	render:function(){
		return(			
			<div id="userContent">
				<div className="userNameBox">
					<img src="img/logo1.png"/>
					<div className="userName">用户名:<span className="userID">额就是拽</span></div>
					<ul className="userService">
						<li className="myOrder"><img  src="img/order_red.png"/><p>全部订单</p><img src="img/right_promotion.png"/></li>
						<div className="userOrderIfo">
							<div ><img src="img/image_account_pay.png"/><span>待支付</span></div>
							<div ><img src="img/pingjia.png"/><span>评价晒单</span></div>
							<div ><img src="img/tuihuo.png"/><span>退换货管理</span></div>
						</div>
						<li className="myCollect"><img  src="img/favorite_red.png"/><p>我的收藏</p><img src="img/right_promotion.png"/></li>
						<li><img  src="img/history_red.png"/><p>浏览记录</p><img src="img/right_promotion.png"/></li>
						<li><img  src="img/coupon_red.png"/><p>我的优惠券</p><img src="img/right_promotion.png"/></li>
						<li><img  src="img/address_red.png"/><p>收货地址</p><img src="img/right_promotion.png"/></li>
						<li><img  src="img/id_red.png"/><p>实名认证</p><img src="img/right_promotion.png"/></li>
						<li><img  src="img/safe_new.png"/><p>账号安全	</p><img src="img/right_promotion.png"/></li>
					</ul>
				</div>
			</div>
		)
	},
	componentDidMount:function(){	
		var that =this;
		$(".userID").html(localStorage.getItem("userID"));
		$(".myCollect").on("tap",function(){
	 		ReactDOM.unmountComponentAtNode(content);
			ReactDOM.render(<Collect/>,content);
			ReactDOM.unmountComponentAtNode(header);
			ReactDOM.render(<CollectHeader/>,header);	
		});
		$(".myOrder").on("tap",function(){
			ReactDOM.unmountComponentAtNode(content);
			ReactDOM.render(<Order/>,content);
			ReactDOM.unmountComponentAtNode(header);
			ReactDOM.render(<OrderHeader/>,header);
		})		
	}
})
module.exports=User;