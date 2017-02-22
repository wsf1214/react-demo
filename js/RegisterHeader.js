var React=require("react");
var ReactDOM=require("react-dom");

var Login=require("./Login");
var LoginHeader=require("./LoginHeader");

var RegisterHeader=React.createClass({
	getInitialState:function(){
		return {
			mountType:this.props.mountType,
			RegisterHeader:"",
			goodsImg:this.props.goodsImg,
			goodsName:this.props.goodsName,
			price:this.props.price,
			discount:this.props.discount,
			index:this.props.index,
			backOne:this.props.backOne
		}
	},	
	render:function(){
		return(			
			<div id="RegisterHeader">
					<div className="logo back">
						<i className="iconfont" id="back">&#xe604;</i>
					</div>
					<div className="middle">
						注册好乐买
					</div>
					<div className="toLogin">登录</div>
			</div>
		)
	},
	componentDidMount:function(){	
		var that =this;
		$(".toLogin").on("tap",function(){
			var Login=require("./Login");
			var LoginHeader=require("./LoginHeader");
			if(that.props.detail=="detail"){
				var goodsImg=that.state.goodsImg;
				var goodsName=that.state.goodsName;
				var price=that.state.price;
				var discount=that.state.discount;
				var index=that.state.index;
				var backOne=that.state.backOne;
				ReactDOM.unmountComponentAtNode(content);
				ReactDOM.render(<Login detail="detail" goodsImg={goodsImg} goodsName={goodsName} price={price} discount={discount} index={index} backOne={backOne}/>,content);
				ReactDOM.unmountComponentAtNode(header);
				ReactDOM.render(<LoginHeader detail="detail"  goodsImg={goodsImg} goodsName={goodsName} price={price} discount={discount} index={index} backOne={backOne}/>,header);
			}
			else{
				ReactDOM.unmountComponentAtNode(content);
				ReactDOM.render(<Login />,content);
				ReactDOM.unmountComponentAtNode(header);
				ReactDOM.render(<LoginHeader />,header);
			}
		});
		$(".back").on("tap",function(){
			var Login=require("./Login");
			var LoginHeader=require("./LoginHeader");
			if(that.props.detail=='detail'){
				var goodsImg=that.state.goodsImg;
				var goodsName=that.state.goodsName;
				var price=that.state.price;
				var discount=that.state.discount;
				var index=that.state.index;
				var backOne=that.state.backOne;
				ReactDOM.unmountComponentAtNode(content);
				ReactDOM.render(<Login detail="detail"  goodsImg={goodsImg} goodsName={goodsName} price={price} discount={discount} index={index} backOne={backOne}/>,content);
				ReactDOM.unmountComponentAtNode(header);
				ReactDOM.render(<LoginHeader detail="detail"  goodsImg={goodsImg} goodsName={goodsName} price={price} discount={discount} index={index} backOne={backOne}/>,header);	
			}
			else{
				ReactDOM.unmountComponentAtNode(content);
				ReactDOM.render(<Login />,content);
				ReactDOM.unmountComponentAtNode(header);
				ReactDOM.render(<LoginHeader />,header);	
			}
		});		
	}
	
})
module.exports=RegisterHeader;