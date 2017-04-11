var vm = new Vue({
	el:"#app",
	data:{
		totalP:0,
		totalmoney:0,
		productList:[],
		checkall:false,
		delflag:false
	},
	filters:{
		formatMoney:function(val){
			return "￥"+val.toFixed(2)+"元";
		}
	},
	mounted:function(){
		this.carview();	
	},
	methods:{
		carview:function(){
			var _this=this;
			$.get("data/cardata.json",function(res){
				 var data = eval('(' + res + ')');
				_this.productList=data.result.list;
				_this.totalmoney=data.result.totalmoney;
			});
			
		},
		changeMoney:function(product,way){
			if(way>0){
				product.productCount++;
			}
			else{
				product.productCount--;
				if(product.productCount<1){
					product.productCount=1;
				}
			}
			this.caluPrice();
		},
		select:function(item){
			if(typeof item.checked=="undefined"){
				this.$set(item,"checked",true);
			}
			else{
				item.checked=!item.checked;
			}
			this.caluPrice();
		},
		ckall:function(flag){
			_this=this;
			this.checkall=flag;
				_this.productList.forEach(function(item,index){
					if(typeof item.checked=="undefined"){
						_this.$set(item,"checked",_this.checkall);
					}
					else{
						item.checked=_this.checkall;
					}
				})
				this.caluPrice();
		},
		caluPrice:function(){
			this.totalP=0;
			var _this=this;
			this.productList.forEach(function(item,index){
				if(item.checked){
					_this.totalP+=item.productCount*item.productPrice;
				}
			});
		},
		deletebox:function(){
			layer.confirm('您确定要删除吗', {
  			btn: ['是','否'] //按钮
			}, function(){
  				layer.msg('亲！删除了就没有数据了', {icon: 1});
			}, function(){
  				layer.msg('亲！好样的', {
    			time: 1000, //20s后自动关闭
  			});
		});
        //layer.open({
           //type: 1,
           //skin: 'layui-layer-rim',
           //title: "删除",
           //area: '400px',
           //content: $(".showbox01"),
         //  offset: '230px',
       //})
		},
		payoff:function(){
			layer.alert(
				'结账成功了哦，亲！',
				{
				skin:'layui-layer-molv',
				closeBtn: 0,
				}
				)
		}
	}	
});