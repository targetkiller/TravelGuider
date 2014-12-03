var historyController = {};
(function(){
	var _history = ['1000'];
	/*
	*重新设定起点
	*@param moduleId (type str) 模块ID
	*/
	historyController.resetOrigin = function(moduleId){
		_history = [moduleId];
	};
	/*
	*进入下一个页面
	*@param pageId (type str) 页面ID
	*/
	historyController.skipDest = function(pageId){
		var srcId = _history[_history.length-1];
		_history.push(pageId);
		return {
			srcPage: srcId,
			destPage: pageId
		};
	};
	/*
	*后退
	*no param
	*/
	historyController.skipBack = function(){
		var srcId, destId;
		if(_history.length > 1){
			srcId = _history.pop();
			destId = _history[_history.length-1];
		}
		return {
			srcPage: srcId,
			destPage: destId
		};
	};
})();