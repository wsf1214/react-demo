var React=require("react");
var ReactDOM = require("react-dom");

var Login=require("./Login");
var LoginHeader=require("./LoginHeader");

var Buy=require("./Buy");
var BuyHeader=require("./BuyHeader");

var Cart=React.createClass({
	render:function(){
		return(			
			<div id="cartContent">
				<div className="cartContentTop">
					<p>现在登录您可以同步电脑和手机购物车的商品!</p>
					<div className="toLogin">登录</div>
				</div>
				<div className="cartContentBottom">
					<div className="iconfont cartPic">&#xe790;</div>
					<p>购物车内无商品,去逛逛吧!</p>
					<div className="toBox">
						<div className="toBuy">逛逛特卖</div>
						<div className="toCollect">我的收藏</div>
					</div>	
				</div>
			</div>
		)
	},
	componentDidMount:function(){		
		var that =this;
		$(".toLogin").on("tap",function(){				
			ReactDOM.unmountComponentAtNode(content);
			ReactDOM.render(<Login mountType="cart"/>,content);
			ReactDOM.unmountComponentAtNode(header);
			ReactDOM.render(<LoginHeader mountType="cart"/>,header);					
		});
		$(".toBuy").on("tap",function(){
			ReactDOM.unmountComponentAtNode(content);
			ReactDOM.render(<Buy/>,content);
			ReactDOM.unmountComponentAtNode(header);
			ReactDOM.render(<BuyHeader/>,header);

		});
		$(".toCollect").on("tap",function(){
			ReactDOM.unmountComponentAtNode(content);
			ReactDOM.render(<Login mountType="Collect" />,content);
			ReactDOM.unmountComponentAtNode(header);
			ReactDOM.render(<LoginHeader mountType="Collect"/>,header);				
		});		
	}	
})
module.exports=Cart;