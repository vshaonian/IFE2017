//创建事件
function Event() {
	this.events = {};
}

//添加原型属性，监听
Event.prototype.on = function(attr, callback) {
	if(this.events[attr]) {
		this.events[attr].push(callback);
	} else {
		this.events[attr] = [callback];
	}
}

Event.prototype.off = function(attr) {
	for(var key in this.events) {
		if(this.events.hasOwnProperty(key) && key === attr) {
			delete this.events[key];
		}
	}
}

Event.prototype.emit = function(attr, ...arg) {
	this.events[attr] && this.events[attr].forEach(function(item) {
		item(...arg);
	})
}

function Observer(data) {
	this.data = data;
	this.walk(data);
	this.eventsBus = new Event();
}

//原型方法

Observer.prototype.walk = function(obj) {
	var val;
	for(var key in obj) {
		if(obj.hasOwnProperty(key)) {
			val = obj[key];
			if(typeof val === "object") {
				new Observer(val);
			}
			this.convert(key,val);
		}
	}
}
Observer.prototype.convert = function(key,val) {
	var _this = this;
	Object.defineProperty(this.data,key,{
		enumerable: true,
		configurable: true,
		get: function() {
			console.log("你访问了" + key);
			return val;
		},
		set: function(newVal) {
			console.log("你设置了" + key);
			console.log("新的" + key + "=" + newVal);

			//触发$watch
			_this.eventsBus.emit(key,val,newVal);

			if (typeof newVal === "object") {
				new Observer(val);
			}
			if (newVal === val) {
				return;
			} else {
				val = newVal;
			}	
		}
	});
}

Observer.prototype.$watch = function(attr, callback) {
	this.eventsBus.on(attr, callback);
}

var nnn = new Observer({
	name: "sxy",
	age: "21",
	ad: {
		a: "zz",
		b: "hj"
	}
})

nnn.$watch("age", function(oldVal, newVal) {
	console.log("我的年龄变了，原来是：" + oldVal + ", 现在是" + newVal);
})