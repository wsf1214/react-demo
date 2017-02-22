var React=require("react");
var ReactDOM=require("react-dom");
var List=React.createClass({	
	getInitialState:function(){
		return {
			goods:"",
			typeImg:""
		}
	},
	componentWillMount:function(){
		var index=this.props.index;
		index=index>=8?index-8:index;
		var that=this;
		$.getJSON("json/goods.json",function(data){
			var result=data[index];
			var len=result.length;
			console.log(len)
			var goodsList=[];
			for(var i=0;i<len;i++){
				if(result[i].typeImg==""){
					that.setState({
						typeImg:""
					})
				}
				else{
					var img=[];
					img.push(<img key={Math.random()} className="typeImg" src={result[i].typeImg} />)
					that.setState({
						typeImg:img
					})
				}
				goodsList.push(<li className="list" key={Math.random()}>
						<img src={result[i].img}/>
						{that.state.typeImg}
						<p className="goodsName">
							{result[i].name}
						</p>
						<p className="goodsInfo">
							<span>
								&yen;{result[i].price}
							</span>
							<del>
								&yen;{Math.floor(result[i].price*10/result[i].discount)}
							</del>
							<i>
								{result[i].discount}折
							</i>
						</p>
					</li>)
			}
			that.setState({
				goods:""
			})
			that.setState({
				goods:goodsList
			})
		})
	},
	render:function(){
		return(			
			<div id="listContent">			
				<ul className="listTop">
					<li>默认</li>
					<li>销量</li>
					<li>价格</li>
					<li>折扣</li>
				</ul>
				<ul className="listMain">
					{this.state.goods}		
				</ul>
				<div className="goTop"><i className="iconfont">&#xe612;</i></div>
			</div>
		)
	},
	componentDidUpdate:function(){
		var that=this;
		$("#listContent").scroll(function(){
			var a=$("#listContent").scrollTop()
			if(a>=300){
				$(".goTop").show()
			}
			else{
				$(".goTop").hide()
			}
		});
		$(".goTop").tap(function(){	
			var a =$("#listContent").scrollTop()+400;
			var time=5000;
			var pre=time/(a/5);
			var timer1=setInterval(function(){
				var b=$("#listContent").scrollTop();
				$("#listContent").scrollTop(b-5);
				if(b<=0){
					clearInterval(timer1);
				}
			},pre)
		});
		$(".list").tap(function(){
			var index=that.props.index;
			index=index>=8?index-8:index;
			var goodsImg=$(this).find("img").eq(0).attr("src");
			var typeImg=$(this).find("img").eq(1).attr("src");
			var goodsName=$(this).find(".goodsName").html();
			var price=$(this).find('.goodsInfo').find('span').text().substring(1);
			var discount=parseFloat($(this).find('.goodsInfo').find('i').text());
			var backOne=that.props.backOne;
			var Detail=require("./Detail");
			var DetailHeader=require("./DetailHeader");
			var DetailFooter=require("./DetailFooter");
			var content=document.getElementById("content");
			var header=document.getElementById("header");
			var footer=document.getElementById("footer");
			ReactDOM.unmountComponentAtNode(header);
			ReactDOM.render(<DetailHeader index={index} backOne={backOne}/>,header);
			ReactDOM.unmountComponentAtNode(content);
			ReactDOM.render(<Detail goodsImg={goodsImg} typeImg={typeImg} goodsName={goodsName} price={price} discount={discount}/>,content);
			$("#footer").show();
			ReactDOM.render(<DetailFooter goodsImg={goodsImg} typeImg={typeImg} goodsName={goodsName} price={price} discount={discount} index={index} backOne={backOne}/>,footer);
		})
	}	
})
module.exports=List;