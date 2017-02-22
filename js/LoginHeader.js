
var React=require("react");
var ReactDOM = require("react-dom");

var Register=require("./Register");
var RegisterHeader=require("./RegisterHeader");

var LoginHeader=React.createClass({
	getInitialState:function(){
		var that = this;
		return {
			mountType:this.props.mountType,
			LoginHeader:"",
			goodsImg:this.props.goodsImg,
			goodsName:this.props.goodsName,
			price:this.props.price,
			discount:this.props.discount,
			index:this.props.index,
			backOne:this.props.backOne
		}
	},	
	render:function(){
		var that = this;
		return(			
			<div id="LoginHeader">
				<h1 className="logo">
					<i className="iconfont" id="back">&#xe604;</i>
				</h1>
				<div className="middle">
					登录
				</div>
				<div className="toRegister" >注册</div>
			</div>
		)
	},
	componentDidMount:function(){	
		var that =this;		
		$(".toRegister").on("tap",function(){
			if(that.props.detail=="detail"){
				var goodsImg=that.state.goodsImg;
				var goodsName=that.state.goodsName;
				var price=that.state.price;
				var discount=that.state.discount;
				var index=that.state.index;
				var backOne=that.state.backOne;
				ReactDOM.unmountComponentAtNode(content);
				ReactDOM.render(<Register detail="detail" goodsImg={goodsImg} goodsName={goodsName} price={price} discount={discount} index={index} backOne={backOne}/>,content);
				ReactDOM.unmountComponentAtNode(header);
				ReactDOM.render(<RegisterHeader detail="detail" goodsImg={goodsImg} goodsName={goodsName} price={price} discount={discount} index={index} backOne={backOne}/>,header);
			}
			else{
				ReactDOM.unmountComponentAtNode(content);
				ReactDOM.render(<Register />,content);
				ReactDOM.unmountComponentAtNode(header);
				ReactDOM.render(<RegisterHeader />,header);
			}
		});
		$("#back").tap(function(){
			if(that.props.detail=="detail"){
				var goodsImg=that.state.goodsImg;
				var goodsName=that.state.goodsName;
				var price=that.state.price;
				var discount=that.state.discount;
				var index=that.state.index;
				var backOne=that.state.backOne;
	
				var Detail=require("./Detail");
				var DetailHeader=require("./DetailHeader");
				ReactDOM.unmountComponentAtNode(content);
				ReactDOM.render(<Detail detail="detail" goodsImg={goodsImg} goodsName={goodsName} price={price} discount={discount} />,content);
				ReactDOM.unmountComponentAtNode(header);
				ReactDOM.render(<DetailHeader detail="detail" index={index} backOne={backOne}/>,header);	
				$("#footer").show();
			}			
		})
	}
	
})
module.exports=LoginHeader;