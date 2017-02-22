var React=require("react");
var ReactDOM = require("react-dom");
var Cart=React.createClass({
	getInitialState:function(){
		return {
			cartList:""
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
	componentWillMount:function(){
		var that=this;
		if(localStorage.getItem("cartList")&&localStorage.getItem("cartList")!="[]"){
			var data=JSON.parse(localStorage.getItem("cartList"));
			var len=data.length;
			var arr=[];
			for(var i=0;i<len;i++){
				arr.push(<li className="proBox" key={Math.random()}>
						<div className="isChoice active"></div>
						<div className="proPic"><img src ={data[i].goodsImg}/></div>
						<div className="proInfo">
							<p className="proName">{data[i].goodsName}</p>
							<p>￥<span className="prePrice">{data[i].price}</span></p>
							<p>总价:<span className="unitPrice">{data[i].price*data[i].number}</span></p>
							<p><span className="reduce" name="1">-</span><span className="proNum">{data[i].number}</span><span className="add" name="1">+</span></p>
							<p><img className="delete"  src="img/image_order_cancel.png"/></p>
						</div>
					</li>)
			}
			that.setState({
				cartList:arr
			})
		}
		
	},
	render:function(){
		return(			
			<div id="cartLoginContent">
			
				<ul className="proBoxs">
					{this.state.cartList}
				</ul>
				<div className="accountsBox">
					<div className="allChoice active"></div>
					<div className="accounts">
						<p>总计:<strong>  ￥<span className="totalPrice">2578</span></strong></p>
						<p>商品金额:<strong>  ￥<span className="totalPrice">2578</span></strong></p>
					</div>
					<div className="goPay">去结算(<span className="totalNum">2</span>)</div>	
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
	//求和 全选
	sum:function(){
		var sum=0;
		var sumPrice=0;
		var len=$(".isChoice.active").length;
		for(var i=0;i<len;i++){
			sumPrice+=$(".isChoice.active").eq(i).parents(".proBox").find(".unitPrice").html()*1;
			sum+=$(".isChoice.active").eq(i).parents(".proBox").find(".proNum").html()*1;
		}
		$(".totalPrice").html(sumPrice);
		$(".totalNum").html(sum);
	},
	//加减购物车
	changeCart:function(goodsImg,k,type){
		var data=JSON.parse(localStorage.getItem("cartList"));
		var len=data.length;
		for(var i=0;i<len;i++){
			if(goodsImg==data[i].goodsImg){
				if(type=="detele"){
					data.splice(i,1)
				}
				else{
					data[i].number=data[i].number*1+k;
				}				
				break;
			}
		}
		localStorage.setItem("cartList",JSON.stringify(data))
	},
	componentDidMount:function(){
		var that=this;
		if(!(localStorage.getItem("cartList"))||localStorage.getItem("cartList")=="[]"){
			$("#cartLoginContent ul").hide();
			$(".accountsBox").hide();
			$(".cartContentBottom").show();
		}
		this.sum();
		var that =this;
		//减物品
		$(".reduce").on("tap",function(){
			var goodsImg=$(this).parents(".proBox").find(".proPic").find("img").attr("src");
			var $proNum=$(this).siblings(".proNum");
			var proNum = $proNum.html()*1;
			var prePrice=$(this).parents(".proInfo").find(".prePrice").html()*1;
			if(proNum==1){
				that.makeText("不能少于一个",1500)
			}
			else{
				proNum--;
				$proNum.html(proNum);
				that.changeCart(goodsImg,-1);
			}
			if(!$(this).parents(".proBox").find(".isChoice").hasClass("active")){
				$(this).parents(".proBox").find(".isChoice").trigger("tap")
			}
			$(this).parents(".proInfo").find(".unitPrice").html(proNum*prePrice);			
			that.sum();
		});
		//加物品
		$(".add").on("tap",function(){
			var goodsImg=$(this).parents(".proBox").find(".proPic").find("img").attr("src");
			var $proNum=$(this).siblings(".proNum");
			var proNum = $proNum.html()*1;
			var prePrice=$(this).parents(".proInfo").find(".prePrice").html()*1;
			proNum++;
			$proNum.html(proNum);
			$(this).parents(".proInfo").find(".unitPrice").html(proNum*prePrice);
			if(!$(this).parents(".proBox").find(".isChoice").hasClass("active")){
				$(this).parents(".proBox").find(".isChoice").trigger("tap")
			}
			that.changeCart(goodsImg,1)
			that.sum();
		});
		
		//是否选择
		$(".isChoice").on("tap",function(){			
			if($(this).hasClass('active')){
				$(this).removeClass('active');
				if($(".isChoice.active").length==$(".isChoice").length){
					$(".allChoice").addClass("active")
				}
				else{
					$(".allChoice").removeClass("active")
				}
			}
			else if(!$(this).hasClass('active')){
				$(this).addClass('active');	
				if($(".isChoice.active").length==$(".isChoice").length){
					$(".allChoice").addClass("active")
				}
				else{
					$(".allChoice").removeClass("active")
				}
			}			
			that.sum();
		});
		//全选
		$(".allChoice").on("tap",function(){			
			if($(this).hasClass("active")){
				$(this).removeClass("active");
				$(".isChoice.active").removeClass("active");
			}
			else{
				$(this).addClass("active");
				$(".isChoice").addClass("active");
			}
			that.sum();
		});
		//删除
		$(".delete").on("tap",function(){
			var goodsImg=$(this).parents(".proBox").find(".proPic").find("img").attr("src");
			$(this).parents(".proBox").remove();
			that.changeCart(goodsImg,0,"detele");
			that.sum();
			//console.log($(".proBox").length);
			if($(".proBox").length==0){
				$("#cartLoginContent ul").hide();
				$(".accountsBox").hide();
				$(".cartContentBottom").show();
			}
		});		
		$(".goPay").on("tap",function(){
			var $toPay=$(".isChoice.active");
			var len=$toPay.length;
			if(len==0){
				that.makeText("请选择要结算的商品",1500)
			}
			else{
				if(localStorage.getItem("orderList")&&localStorage.getItem("orderList")!="[]"){
					var arr=[];
					var data=JSON.parse(localStorage.getItem("orderList"));
					for(var i=0;i<len;i++){
						var goodsImg=$toPay.eq(i).parents(".proBox").find(".proPic").find("img").attr('src');
						var goodsName=$toPay.eq(i).parents(".proBox").find(".proName").html();
						var price=$toPay.eq(i).parents(".proBox").find(".prePrice").html();
						var number=$toPay.eq(i).parents(".proBox").find(".proNum").html(); 
						for(var i=0;i<data.length;i++){
							if(goodsName==data[i].goodsName){
								data[i].number=data[i].number*1+number*1;
								$toPay.eq(i).parents(".proBox").find(".delete").trigger('tap');
								break;
							}
							else if(goodsName!=data[i].goodsName&&i==len-1){
								var obj={
									goodsImg:goodsImg,
									goodsName:goodsName,
									price:price,
									number:number
								};
								data.push(obj);
								$toPay.eq(i).parents(".proBox").find(".delete").trigger('tap');
								break;
							}							
						}
						localStorage.setItem("orderList",JSON.stringify(data))
					}	
				}
				else{
					var arr=[];
					for(var i=0;i<len;i++){						
						var goodsImg=$toPay.eq(i).parents(".proBox").find(".proPic").find("img").attr('src');
						var goodsName=$toPay.eq(i).parents(".proBox").find(".proName").html();
						var price=$toPay.eq(i).parents(".proBox").find(".prePrice").html();
						var number=$toPay.eq(i).parents(".proBox").find(".proNum").html();
						var obj={
							goodsImg:goodsImg,
							goodsName:goodsName,
							price:price,
							number:number
						};
						arr.push(obj);
						$toPay.eq(i).parents(".proBox").find(".delete").trigger('tap');
					}
					
					localStorage.setItem("orderList",JSON.stringify(arr))
				}
				
			}
			

//			that.makeText("支付成功",1000);
//			$("#cartLoginContent ul").hide();
//			$(".accountsBox").hide();
//			$(".cartContentBottom").show();
		});
		$(".toBuy").on("tap",function(){
			var Buy=require("./Buy");
			var BuyHeader=require("./BuyHeader");
			var Footer=require('./Footer');
			
			ReactDOM.unmountComponentAtNode(content);
			ReactDOM.render(<Buy/>,content);
			ReactDOM.unmountComponentAtNode(header);
			ReactDOM.render(<BuyHeader/>,header);
			ReactDOM.unmountComponentAtNode(document.getElementById("footer"));
			ReactDOM.render(<Footer footerIndex="2"/>,document.getElementById("footer"));
		});
		$(".toCollect").on("tap",function(){
			var Collect=require("./Collect");
			var CollectHeader=require("./CollectHeader");
			ReactDOM.unmountComponentAtNode(content);
			ReactDOM.render(<Collect/>,content);
			ReactDOM.unmountComponentAtNode(header);
			ReactDOM.render(<CollectHeader/>,header);				
		});

	}
})
module.exports=Cart;