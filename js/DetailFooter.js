var React=require("react");
var ReactDOM=require("react-dom");
var header=document.getElementById("header");
var content=document.getElementById("content");
var footer=document.getElementById("footer");
var DetailFooter=React.createClass({
	getInitialState:function(){
		return {
			goodsImg:this.props.goodsImg,
			goodsName:this.props.goodsName,
			price:this.props.price,
			discount:this.props.discount,
			index:this.props.index,
			backOne:this.props.backOne
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
			<div id="detailFooter">
				<div className="left">
					<div className="goCart">
						<i className="iconfont">&#xe790;</i>
						购物车
					</div>
					<div className="goSave">
						<i className="iconfont">&#xe639;</i>
						收藏
					</div>
				</div>
				
				<div className='right' id="addCart">
					加入购物车
				</div>
			</div>
		)
	},
	componentDidMount:function(){
		var that=this;
		var CartLogin=require("./CartLogin")
		$("#addCart").tap(function(){
			if(localStorage.getItem("userID")){
				var goodsImg=that.state.goodsImg;
				var goodsName=that.state.goodsName;
				var price=that.state.price;
				var discount=that.state.discount;
				if(localStorage.getItem("cartList")&&localStorage.getItem("cartList")!="[]"){
						var cartListArr=JSON.parse(localStorage.getItem("cartList"));
						var len=cartListArr.length;
						for(var i=0;i<len;i++){
							if(goodsImg==cartListArr[i].goodsImg){
								cartListArr[i].number=cartListArr[i].number*1+1;
								break;
							}
							else if(goodsImg!=cartListArr[i].goodsImg&&i==len-1){
								var cartObj={
									"goodsImg":goodsImg,
									"price":price,
									"discount":discount,
									"goodsName":goodsName,
									"number":1
								};
								cartListArr.push(cartObj);
							}
						}
						localStorage.setItem("cartList",JSON.stringify(cartListArr))
					}
					else{
						var cartListArr=[];
						var cartObj={
							"goodsImg":goodsImg,
							"price":price,
							"discount":discount,
							"goodsName":goodsName,
							"number":1
						};
						cartListArr.push(cartObj);
						localStorage.setItem("cartList",JSON.stringify(cartListArr))						
					}
					that.makeText("加入购物车成功",1500)
			}
			else{
				var goodsImg=that.state.goodsImg;
				var goodsName=that.state.goodsName;
				var price=that.state.price;
				var discount=that.state.discount;
				var index=that.state.index;
				var backOne=that.state.backOne;
				
				var Login=require("./Login");
				var LoginHeader=require("./LoginHeader");
				ReactDOM.unmountComponentAtNode(content);
				ReactDOM.render(<Login detail="detail" goodsImg={goodsImg} goodsName={goodsName} price={price} discount={discount} index={index} backOne={backOne}/>,content);
				ReactDOM.unmountComponentAtNode(header);
				ReactDOM.render(<LoginHeader detail="detail" goodsImg={goodsImg} goodsName={goodsName} price={price} discount={discount} index={index} backOne={backOne}/>,header);
				$("#footer").hide();
			}
		})
	}
})
module.exports=DetailFooter;