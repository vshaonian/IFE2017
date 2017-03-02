function Observer(obj) {
	this.data = obj;
}
var nnn = new Observer({
	name: 'sxy',
	age: '21'
})
var p = Observer.prototype;
p.convert = function(key,val) {
	Object.defineProPerty(this.data,key,{
		enumerable: true,
		configurable: true,
		get: function() {
			console.log("你访问了" + key);
			return val;
		},
		set: function(newVal) {
			console.log("你设置了" + key);
			console.log("新的" + key + "=" + newVal);
			if (newVal === val) {
				return;
			} else {
				val = newVal;
			}
		}
	})
}