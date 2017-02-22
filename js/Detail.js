var React=require("react");
var timer;
var Deatil=React.createClass({
	getInitialState:function(){
		return {
			day:"4",
			hour:"12",
			min:"43",
			sec:"25",
			ms:"9",
			goodsImg:this.props.goodsImg,
			goodsName:this.props.goodsName,
			price:this.props.price,
			discount:this.props.discount
		}
	},
	render:function(){
		return(			
			<div id="deatilContent">
				<div className="goodsImg">
				<img  src={this.state.goodsImg}/>
				</div>
				<div className="goodsInfo">
					<div className="goodsPrice">
						<span>&yen;{this.state.price}</span>
						<del>&yen;{Math.floor(this.state.price*10/this.state.discount)}</del>
					</div>
					<div className="time">
						距结束<span>{this.state.day}</span>天<span>{this.state.hour}</span>:<span>{this.state.min}</span>:<span>{this.state.sec}</span><i>{this.state.ms}</i>
					</div>
				</div>
				<div className="goodsName">
					{this.state.goodsName}
				</div>
				<div className="imgs">
					<img src="img/de1.jpg"/>
					<img src="img/de2.jpg"/>
					<img src="img/de3.jpg"/>
					<img src="img/de4.jpg"/>
					<img src="img/de5.jpg"/>
				</div>
			</div>
		)
	},
	componentDidMount:function(){
		var that=this;
		var today=new Date().getDate();
		var day=Math.floor(Math.random()*5+today+2);
		var ms1=9;
		var ransec=Math.floor(Math.random()*15000)
		timer=setInterval(function(){			
			var now = new Date(); 
			var endDate = new Date(2017, 0, day); 
			var leftTime=endDate.getTime()-now.getTime(); 
			var leftsecond = parseInt(leftTime/1000-ransec); 
			
			var day1=Math.floor(leftsecond/(60*60*24)); 
			var hour=Math.floor((leftsecond-day1*24*60*60)/3600); 
			var minute=Math.floor((leftsecond-day1*24*60*60-hour*3600)/60); 
			var second=Math.floor(leftsecond-day1*24*60*60-hour*3600-minute*60);
			ms1--;
			if(ms1==-1){
				ms1=9
			}
			that.setState({
				day:day1,
				hour:hour,
				min:minute,
				sec:second,
				ms:ms1
			})
		},100)
	}
	,componentWillUnmount:function(){
		clearInterval(timer)
	}
})
module.exports=Deatil;
