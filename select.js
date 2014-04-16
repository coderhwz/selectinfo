(function($){
	function select3(element,options){
		this.wrapper = $(element);
		this.opts = {
			selected:'-1',
			placeholder:'请选择',
			show:'a',
			inputName:'brand_id',
			cache:true,
			curPage:1,
			pageSize:10,
		};

		//合并输入的参数与默认的参数
		this.opts = $.extend(this.opts,options,{});
		console.log(this.opts);
		this.init();
	}
	select3.prototype={
		init:function(){
			// 如果启用缓存则开启缓存
			if(this.opts.cache){
				this.initCache();
			}
			// 文本框用于表单提交
			this.input = $('<input type="'+this.opts.inputType+'" name="'+this.opts.inputName+'"/>');
			this.input.appendTo(this.wrapper);
			// 两个按钮
			this.nextBtn = $('<button type="button" class="btn btn-default">下一页</button>');
			this.preBtn = $('<button type="button" class="btn btn-default">上一页</button>')

			// 没有选中值
			if(this.opts.selected < 1){
				this.box = $('<a href="javascript:;" class="form-control">'+ this.opts.placeholder + '</a>');
			}else{
				this.box = $('<a href="javascript:;" class="form-control">'+ this.opts.placeholder + '</a>');
				this.input.val(this.opts.selected);
			}
			// 添加选择按钮
			this.box.appendTo(this.wrapper);
			this.container = $('<div class="container" style="display:none;" />');
			this.container.appendTo(this.wrapper);
			this.setAlphas();
			this.preBtn.appendTo(this.container);
			this.nextBtn.appendTo(this.container);
			this.eventBind();
		},

		setItems:function(page){// 加载默认
			var _this = this;
			this.getItems(this.opts.show,page,this.opts.pageSize,function(data){
				if( data.length > 0){
					$('.list-group',_this.container).remove();
					var ul = $('<ul class="list-group" />');
					for (var i = 0; i < data.length; i++) {
						$('<li class="list-group-item"><a data-id='+data[i].id+' href="javascript:;">'+data[i].name+'</a></li')
						.appendTo(ul)
						.click(function(){
							var a = $(this).find('a');
							_this.select(a.attr('data-id'),a.text());
						});
					}
					$('a[data-alpha='+_this.opts.show+']').after(ul);
				};
			});
		},

		select:function(id,name){
			this.box.text(name);
			if(this.opts.onSelect != undefined){
				this.opts.onSelect(id,name);
			}
			this.container.hide();
			this.input.val(id);
		},

		initCache:function(){
			this.cache = {};
		},

		setCache:function(key,data){
			if (this.cache == undefined) {
				return false;
			};
			if( this.cache['data'] == undefined){
				this.cache['data'] = [];
			}
			if (this.cache['data'][key] == undefined) {
				this.cache['data'][key] = [];
			};
			this.cache['data'][key] = this.cache['data'][key].concat(data);
		},

		getCache:function(key,page,size){
			if (this.cache == undefined) {
				return false;
			};
			if (this.cache['data'] == undefined) {
				this.cache['data'] = [];
				return false;
			};

			if (!this.cache['data'][key]) {
				return false;
			};
			var offset = ( page-1 )*size;
			return this.cache['data'][key].slice(offset,offset+size);

		},

		setAlphas:function(){
			var _this = this;
			this.getAlphas(function(data){
				for (var i = 0; i < data.length; i++) {
					$('<a href="javascript:;" data-alpha="'+data[i]+'">'+data[i].toUpperCase()+'</a>')
					.appendTo(_this.container)
					.click(function(){
						if($(this).next('ul').length < 1){
							_this.opts.show = $(this).attr('data-alpha');
							_this.opts.curPage = 1
							_this.setItems(_this.opts.curPage);
						}else{
							$(this).next('ul').remove();
						}
					});
				};
			});
		},
		eventBind:function(){
			var _this = this;
			this.box.click(function(){
				if (_this.container.is(':hidden')) {
					_this.setItems(_this.opts.curPage);
					_this.container.show();
				}else{
					_this.container.hide();
				};
			});
			$(document).click(function(event){
				var target = $(event.target);
				var parent = target.parents('#select');
				if (!parent.length) {
					_this.container.hide();
				}; 
			});
			this.nextBtn.click(function(){
				_this.setItems(_this.opts.curPage+1);
			});
			this.preBtn.click(function(){
				var page = _this.opts.curPage - 1 || 1;
				_this.setItems(page);
			});
		},

		getAlphas:function(callback){
			$.getJSON(this.opts.apiUrl,{type:"alphas"},function(data){
				callback(data);
			});
		},

		getItems:function(alpha,page,size,callback){
			var cached = this.getCache(alpha,page,size);
			var _this = this;
			if (cached.length > 1) {
				callback(cached);
				_this.opts.curPage = page;
				console.debug('data from cache');
			}else{
				$.getJSON(this.opts.apiUrl,{type:"brands",alpha:alpha,page:page,size:size},function(data){
					callback(data);
					if(data.length > 0)
						_this.opts.curPage = page;
					_this.setCache(alpha,data);
					console.debug('data from ajax');
				});
			};
		},

		getSingle:function(id){
		}


	};

	$.fn.select3 = function (options) {
			new select3(this,options);
        /* return this.each(function () {
            if (!$.data(this, 'select3')) {
                $.data(this, 'select3', new select3(this,options));
            }
        }); */
    };
})(jQuery);

$(document).ready(function(){
	$('#select').select3({
		show:'d',
		apiUrl:'/select/app/api.php',
		pageSize:3,
		curPage:1,
		placeholder:"..请选择..",
		cache:true,
		inputType:'hidden',
		inputName:'brand'

		// cache:true,
	});
});

