$estr = function() { return js.Boot.__string_rec(this,''); }
if(typeof server=='undefined') server = {}
server.Async_Api = function(c) { if( c === $_ ) return; {
	this.__cnx = c;
}}
server.Async_Api.__name__ = ["server","Async_Api"];
server.Async_Api.prototype.__cnx = null;
server.Async_Api.prototype.cancelParty = function() {
	this.__cnx.resolve("cancelParty").call([],null);
}
server.Async_Api.prototype.chatMessage = function(r,msg) {
	this.__cnx.resolve("chatMessage").call([r,msg],null);
}
server.Async_Api.prototype.claimVictory = function(v) {
	this.__cnx.resolve("claimVictory").call([v],null);
}
server.Async_Api.prototype.getQueueInfos = function(__callb) {
	this.__cnx.resolve("getQueueInfos").call([],__callb);
}
server.Async_Api.prototype.giveup = function() {
	this.__cnx.resolve("giveup").call([],null);
}
server.Async_Api.prototype.identify = function(sid) {
	this.__cnx.resolve("identify").call([sid],null);
}
server.Async_Api.prototype.joinChatRoom = function(r,stranger) {
	this.__cnx.resolve("joinChatRoom").call([r,stranger],null);
}
server.Async_Api.prototype.joinQueue = function() {
	this.__cnx.resolve("joinQueue").call([],null);
}
server.Async_Api.prototype.leaveQueue = function() {
	this.__cnx.resolve("leaveQueue").call([],null);
}
server.Async_Api.prototype.leaveRoom = function(r) {
	this.__cnx.resolve("leaveRoom").call([r],null);
}
server.Async_Api.prototype.nextHistoryMessage = function() {
	this.__cnx.resolve("nextHistoryMessage").call([],null);
}
server.Async_Api.prototype.playNow = function(gid) {
	this.__cnx.resolve("playNow").call([gid],null);
}
server.Async_Api.prototype.quitParty = function() {
	this.__cnx.resolve("quitParty").call([],null);
}
server.Async_Api.prototype.resumeParty = function(__callb) {
	this.__cnx.resolve("resumeParty").call([],__callb);
}
server.Async_Api.prototype.sendMessages = function(msgs,endTurn) {
	this.__cnx.resolve("sendMessages").call([msgs,endTurn],null);
}
server.Async_Api.prototype.setMetaData = function(r,m) {
	this.__cnx.resolve("setMetaData").call([r,m],null);
}
server.Async_Api.prototype.watchParty = function(pid,first) {
	this.__cnx.resolve("watchParty").call([pid,first],null);
}
server.Async_Api.prototype.__class__ = server.Async_Api;
ServerAccess = function(c) { if( c === $_ ) return; {
	server.Async_Api.apply(this,[c]);
}}
ServerAccess.__name__ = ["ServerAccess"];
ServerAccess.__super__ = server.Async_Api;
for(var k in server.Async_Api.prototype ) ServerAccess.prototype[k] = server.Async_Api.prototype[k];
ServerAccess.prototype.__class__ = ServerAccess;
if(typeof js=='undefined') js = {}
js.Remoting_Client = function(c) { if( c === $_ ) return; {
	this.__cnx = c;
}}
js.Remoting_Client.__name__ = ["js","Remoting_Client"];
js.Remoting_Client.prototype.__cnx = null;
js.Remoting_Client.prototype.add = function(id,tplName,ctx) {
	this.__cnx.resolve("add").call([id,tplName,ctx]);
}
js.Remoting_Client.prototype.alert = function(msg) {
	this.__cnx.resolve("alert").call([msg]);
}
js.Remoting_Client.prototype.announceVictory = function(v,kind) {
	this.__cnx.resolve("announceVictory").call([v,kind]);
}
js.Remoting_Client.prototype.applyTpl = function(tplName,ctx) {
	return this.__cnx.resolve("applyTpl").call([tplName,ctx]);
}
js.Remoting_Client.prototype.connected = function(b) {
	this.__cnx.resolve("connected").call([b]);
}
js.Remoting_Client.prototype.connecting = function(b) {
	this.__cnx.resolve("connecting").call([b]);
}
js.Remoting_Client.prototype.dataChanged = function(data) {
	this.__cnx.resolve("dataChanged").call([data]);
}
js.Remoting_Client.prototype.displayVictory = function(v,kind) {
	this.__cnx.resolve("displayVictory").call([v,kind]);
}
js.Remoting_Client.prototype.fill = function(id,tplName,ctx) {
	this.__cnx.resolve("fill").call([id,tplName,ctx]);
}
js.Remoting_Client.prototype.focus = function(id) {
	this.__cnx.resolve("focus").call([id]);
}
js.Remoting_Client.prototype.headBar = function(tplName,ctx,timeout) {
	this.__cnx.resolve("headBar").call([tplName,ctx,timeout]);
}
js.Remoting_Client.prototype.headBarEmpty = function(id) {
	this.__cnx.resolve("headBarEmpty").call([id]);
}
js.Remoting_Client.prototype.hideRoomUserTip = function() {
	this.__cnx.resolve("hideRoomUserTip").call([]);
}
js.Remoting_Client.prototype.load = function(url) {
	this.__cnx.resolve("load").call([url]);
}
js.Remoting_Client.prototype.menuSelect = function(menuId,selectedId) {
	this.__cnx.resolve("menuSelect").call([menuId,selectedId]);
}
js.Remoting_Client.prototype.partyWaitTime = function(t) {
	this.__cnx.resolve("partyWaitTime").call([t]);
}
js.Remoting_Client.prototype.pong = function() {
	this.__cnx.resolve("pong").call([]);
}
js.Remoting_Client.prototype.post = function(url,params) {
	this.__cnx.resolve("post").call([url,params]);
}
js.Remoting_Client.prototype.reboot = function() {
	this.__cnx.resolve("reboot").call([]);
}
js.Remoting_Client.prototype.roomEjected = function(r) {
	this.__cnx.resolve("roomEjected").call([r]);
}
js.Remoting_Client.prototype.roomUserTip = function(uid,name,x,y) {
	this.__cnx.resolve("roomUserTip").call([uid,name,x,y]);
}
js.Remoting_Client.prototype.scrollDown = function(id) {
	this.__cnx.resolve("scrollDown").call([id]);
}
js.Remoting_Client.prototype.setClass = function(id,className) {
	this.__cnx.resolve("setClass").call([id,className]);
}
js.Remoting_Client.prototype.setColors = function(me,opp) {
	this.__cnx.resolve("setColors").call([me,opp]);
}
js.Remoting_Client.prototype.setQueueInfos = function(inf) {
	this.__cnx.resolve("setQueueInfos").call([inf]);
}
js.Remoting_Client.prototype.trace = function(msg,pos) {
	this.__cnx.resolve("trace").call([msg,pos]);
}
js.Remoting_Client.prototype.updateMoney = function(m,freem) {
	this.__cnx.resolve("updateMoney").call([m,freem]);
}
js.Remoting_Client.prototype.updatePrizeToken = function(t) {
	this.__cnx.resolve("updatePrizeToken").call([t]);
}
js.Remoting_Client.prototype.__class__ = js.Remoting_Client;
JsAccess = function(c) { if( c === $_ ) return; {
	js.Remoting_Client.apply(this,[c]);
}}
JsAccess.__name__ = ["JsAccess"];
JsAccess.__super__ = js.Remoting_Client;
for(var k in js.Remoting_Client.prototype ) JsAccess.prototype[k] = js.Remoting_Client.prototype[k];
JsAccess.prototype.__class__ = JsAccess;
Remoting_Client = function(c) { if( c === $_ ) return; {
	this.__cnx = c;
}}
Remoting_Client.__name__ = ["Remoting_Client"];
Remoting_Client.prototype.__cnx = null;
Remoting_Client.prototype._activateSound = function(v) {
	this.__cnx.resolve("_activateSound").call([v]);
}
Remoting_Client.prototype._addInBlacklist = function(u) {
	this.__cnx.resolve("_addInBlacklist").call([u]);
}
Remoting_Client.prototype._autoReconnect = function() {
	this.__cnx.resolve("_autoReconnect").call([]);
}
Remoting_Client.prototype._cancelParty = function() {
	this.__cnx.resolve("_cancelParty").call([]);
}
Remoting_Client.prototype._chatReport = function(room,uid) {
	this.__cnx.resolve("_chatReport").call([room,uid]);
}
Remoting_Client.prototype._chatUsers = function(room,strangers) {
	return this.__cnx.resolve("_chatUsers").call([room,strangers]);
}
Remoting_Client.prototype._connect = function(server,port,sid) {
	this.__cnx.resolve("_connect").call([server,port,sid]);
}
Remoting_Client.prototype._defyDisplayed = function(b) {
	this.__cnx.resolve("_defyDisplayed").call([b]);
}
Remoting_Client.prototype._disconnect = function() {
	this.__cnx.resolve("_disconnect").call([]);
}
Remoting_Client.prototype._displayChatRoom = function(room) {
	this.__cnx.resolve("_displayChatRoom").call([room]);
}
Remoting_Client.prototype._displayGame = function(room) {
	this.__cnx.resolve("_displayGame").call([room]);
}
Remoting_Client.prototype._getChatColor = function(room) {
	return this.__cnx.resolve("_getChatColor").call([room]);
}
Remoting_Client.prototype._giveup = function() {
	this.__cnx.resolve("_giveup").call([]);
}
Remoting_Client.prototype._hasParty = function() {
	return this.__cnx.resolve("_hasParty").call([]);
}
Remoting_Client.prototype._hideChatRoom = function(room) {
	this.__cnx.resolve("_hideChatRoom").call([room]);
}
Remoting_Client.prototype._hideGame = function() {
	this.__cnx.resolve("_hideGame").call([]);
}
Remoting_Client.prototype._init = function(sid) {
	this.__cnx.resolve("_init").call([sid]);
}
Remoting_Client.prototype._initChatColors = function(list,key) {
	this.__cnx.resolve("_initChatColors").call([list,key]);
}
Remoting_Client.prototype._joinChatRoom = function(room,props) {
	this.__cnx.resolve("_joinChatRoom").call([room,props]);
}
Remoting_Client.prototype._joinQueue = function() {
	this.__cnx.resolve("_joinQueue").call([]);
}
Remoting_Client.prototype._leaveQueue = function() {
	this.__cnx.resolve("_leaveQueue").call([]);
}
Remoting_Client.prototype._ping = function() {
	this.__cnx.resolve("_ping").call([]);
}
Remoting_Client.prototype._playNow = function(gid) {
	this.__cnx.resolve("_playNow").call([gid]);
}
Remoting_Client.prototype._removeFromBlacklist = function(u) {
	this.__cnx.resolve("_removeFromBlacklist").call([u]);
}
Remoting_Client.prototype._resumeParty = function() {
	this.__cnx.resolve("_resumeParty").call([]);
}
Remoting_Client.prototype._sendChatMessage = function(room,val) {
	this.__cnx.resolve("_sendChatMessage").call([room,val]);
}
Remoting_Client.prototype._setBlacklist = function(users) {
	this.__cnx.resolve("_setBlacklist").call([users]);
}
Remoting_Client.prototype._setChatColor = function(room,color) {
	this.__cnx.resolve("_setChatColor").call([room,color]);
}
Remoting_Client.prototype._startChatReport = function(room) {
	this.__cnx.resolve("_startChatReport").call([room]);
}
Remoting_Client.prototype._updateWatchChat = function(room,v) {
	this.__cnx.resolve("_updateWatchChat").call([room,v]);
}
Remoting_Client.prototype._userHighlight = function(room,uid) {
	this.__cnx.resolve("_userHighlight").call([room,uid]);
}
Remoting_Client.prototype._userUnHighlight = function(room,uid) {
	this.__cnx.resolve("_userUnHighlight").call([room,uid]);
}
Remoting_Client.prototype._watchParty = function(pid,isMaster) {
	this.__cnx.resolve("_watchParty").call([pid,isMaster]);
}
Remoting_Client.prototype.onConnected = function() {
	this.__cnx.resolve("onConnected").call([]);
}
Remoting_Client.prototype.onConnecting = function() {
	this.__cnx.resolve("onConnecting").call([]);
}
Remoting_Client.prototype.onDisconnected = function() {
	this.__cnx.resolve("onDisconnected").call([]);
}
Remoting_Client.prototype.onError = function(e) {
	this.__cnx.resolve("onError").call([e]);
}
Remoting_Client.prototype.onIdentified = function(id,scnx) {
	return this.__cnx.resolve("onIdentified").call([id,scnx]);
}
Remoting_Client.prototype.onIdentifyFailed = function() {
	this.__cnx.resolve("onIdentifyFailed").call([]);
}
Remoting_Client.prototype.onPreventRelogin = function() {
	this.__cnx.resolve("onPreventRelogin").call([]);
}
Remoting_Client.prototype.__class__ = Remoting_Client;
if(typeof haxe=='undefined') haxe = {}
if(!haxe.remoting) haxe.remoting = {}
haxe.remoting.FlashJsConnection = function() { }
haxe.remoting.FlashJsConnection.__name__ = ["haxe","remoting","FlashJsConnection"];
haxe.remoting.FlashJsConnection.flashCall = function(flashObj,name,path,params) {
	// Cette fonction est réécrite dans "pages/group/chat_addendum.html".
	try {
		var fobj = window.document[flashObj];
		if(fobj == null) fobj = window.document.getElementById(flashObj);
		if(fobj == null) throw ("Could not find flash object '" + flashObj) + "'";
		var data = null;
		try {
			data = fobj.flashJsRemotingCall(name,path,params);
		}
		catch( $e0 ) {
			{
				var e = $e0;
				null;
			}
		}
		if(data == null) throw ("Flash object " + flashObj) + " does not have an active FlashJsConnection";
		return data;
	}
	catch( $e1 ) {
		{
			var e = $e1;
			{
				var s = new haxe.Serializer();
				s.serializeException(e);
				return s.toString();
			}
		}
	}
}
haxe.remoting.FlashJsConnection.prototype.__class__ = haxe.remoting.FlashJsConnection;
haxe.remoting.AsyncConnection = function() { }
haxe.remoting.AsyncConnection.__name__ = ["haxe","remoting","AsyncConnection"];
haxe.remoting.AsyncConnection.prototype.call = null;
haxe.remoting.AsyncConnection.prototype.resolve = null;
haxe.remoting.AsyncConnection.prototype.setErrorHandler = null;
haxe.remoting.AsyncConnection.prototype.__class__ = haxe.remoting.AsyncConnection;
EReg = function(r,opt) { if( r === $_ ) return; {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
}}
EReg.__name__ = ["EReg"];
EReg.prototype.customReplace = function(s,f) {
	var buf = new StringBuf();
	while(true) {
		if(!this.match(s)) break;
		buf.b[buf.b.length] = this.matchedLeft();
		buf.b[buf.b.length] = f(this);
		s = this.matchedRight();
	}
	buf.b[buf.b.length] = s;
	return buf.b.join("");
}
EReg.prototype.match = function(s) {
	this.r.m = this.r.exec(s);
	this.r.s = s;
	this.r.l = RegExp.leftContext;
	this.r.r = RegExp.rightContext;
	return (this.r.m != null);
}
EReg.prototype.matched = function(n) {
	return (this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:(function($this) {
		var $r;
		throw "EReg::matched";
		return $r;
	}(this)));
}
EReg.prototype.matchedLeft = function() {
	if(this.r.m == null) throw "No string matched";
	if(this.r.l == null) return this.r.s.substr(0,this.r.m.index);
	return this.r.l;
}
EReg.prototype.matchedPos = function() {
	if(this.r.m == null) throw "No string matched";
	return { pos : this.r.m.index, len : this.r.m[0].length}
}
EReg.prototype.matchedRight = function() {
	if(this.r.m == null) throw "No string matched";
	if(this.r.r == null) {
		var sz = this.r.m.index + this.r.m[0].length;
		return this.r.s.substr(sz,this.r.s.length - sz);
	}
	return this.r.r;
}
EReg.prototype.r = null;
EReg.prototype.replace = function(s,by) {
	return s.replace(this.r,by);
}
EReg.prototype.split = function(s) {
	var d = "#__delim__#";
	return s.replace(this.r,d).split(d);
}
EReg.prototype.__class__ = EReg;
Xml = function(p) { if( p === $_ ) return; {
	null;
}}
Xml.__name__ = ["Xml"];
Xml.Element = null;
Xml.PCData = null;
Xml.CData = null;
Xml.Comment = null;
Xml.DocType = null;
Xml.Prolog = null;
Xml.Document = null;
Xml.parse = function(str) {
	var rules = [Xml.enode,Xml.epcdata,Xml.eend,Xml.ecdata,Xml.edoctype,Xml.ecomment,Xml.eprolog];
	var nrules = rules.length;
	var current = Xml.createDocument();
	var stack = new List();
	while(str.length > 0) {
		var i = 0;
		try {
			while(i < nrules) {
				var r = rules[i];
				if(r.match(str)) {
					switch(i) {
					case 0:{
						var x = Xml.createElement(r.matched(1));
						current.addChild(x);
						str = r.matchedRight();
						while(Xml.eattribute.match(str)) {
							x.set(Xml.eattribute.matched(1),Xml.eattribute.matched(3));
							str = Xml.eattribute.matchedRight();
						}
						if(!Xml.eclose.match(str)) {
							i = nrules;
							throw "__break__";
						}
						if(Xml.eclose.matched(1) == ">") {
							stack.push(current);
							current = x;
						}
						str = Xml.eclose.matchedRight();
					}break;
					case 1:{
						var x = Xml.createPCData(r.matched(0));
						current.addChild(x);
						str = r.matchedRight();
					}break;
					case 2:{
						if(current._children != null && current._children.length == 0) {
							var e = Xml.createPCData("");
							current.addChild(e);
						}
						else null;
						if(r.matched(1) != current._nodeName || stack.isEmpty()) {
							i = nrules;
							throw "__break__";
						}
						else null;
						current = stack.pop();
						str = r.matchedRight();
					}break;
					case 3:{
						str = r.matchedRight();
						if(!Xml.ecdata_end.match(str)) throw "End of CDATA section not found";
						var x = Xml.createCData(Xml.ecdata_end.matchedLeft());
						current.addChild(x);
						str = Xml.ecdata_end.matchedRight();
					}break;
					case 4:{
						var pos = 0;
						var count = 0;
						var old = str;
						try {
							while(true) {
								if(!Xml.edoctype_elt.match(str)) throw "End of DOCTYPE section not found";
								var p = Xml.edoctype_elt.matchedPos();
								pos += p.pos + p.len;
								str = Xml.edoctype_elt.matchedRight();
								switch(Xml.edoctype_elt.matched(0)) {
								case "[":{
									count++;
								}break;
								case "]":{
									count--;
									if(count < 0) throw "Invalid ] found in DOCTYPE declaration";
								}break;
								default:{
									if(count == 0) throw "__break__";
								}break;
								}
							}
						} catch( e ) { if( e != "__break__" ) throw e; }
						var x = Xml.createDocType(old.substr(10,pos - 11));
						current.addChild(x);
					}break;
					case 5:{
						if(!Xml.ecomment_end.match(str)) throw "Unclosed Comment";
						var p = Xml.ecomment_end.matchedPos();
						var x = Xml.createComment(str.substr(4,(p.pos + p.len) - 7));
						current.addChild(x);
						str = Xml.ecomment_end.matchedRight();
					}break;
					case 6:{
						var prolog = r.matched(0);
						var x = Xml.createProlog(prolog.substr(2,prolog.length - 4));
						current.addChild(x);
						str = r.matchedRight();
					}break;
					}
					throw "__break__";
				}
				i += 1;
			}
		} catch( e ) { if( e != "__break__" ) throw e; }
		if(i == nrules) {
			if(str.length > 10) throw (("Xml parse error : Unexpected " + str.substr(0,10)) + "...");
			else throw ("Xml parse error : Unexpected " + str);
		}
	}
	if(!stack.isEmpty()) throw "Xml parse error : Unclosed " + stack.last().getNodeName();
	return current;
}
Xml.createElement = function(name) {
	var r = new Xml();
	r.nodeType = Xml.Element;
	r._children = new Array();
	r._attributes = new Hash();
	r.setNodeName(name);
	return r;
}
Xml.createPCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.PCData;
	r.setNodeValue(data);
	return r;
}
Xml.createCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.CData;
	r.setNodeValue(data);
	return r;
}
Xml.createComment = function(data) {
	var r = new Xml();
	r.nodeType = Xml.Comment;
	r.setNodeValue(data);
	return r;
}
Xml.createDocType = function(data) {
	var r = new Xml();
	r.nodeType = Xml.DocType;
	r.setNodeValue(data);
	return r;
}
Xml.createProlog = function(data) {
	var r = new Xml();
	r.nodeType = Xml.Prolog;
	r.setNodeValue(data);
	return r;
}
Xml.createDocument = function() {
	var r = new Xml();
	r.nodeType = Xml.Document;
	r._children = new Array();
	return r;
}
Xml.prototype._attributes = null;
Xml.prototype._children = null;
Xml.prototype._nodeName = null;
Xml.prototype._nodeValue = null;
Xml.prototype._parent = null;
Xml.prototype.addChild = function(x) {
	if(this._children == null) throw "bad nodetype";
	if(x._parent != null) x._parent._children.remove(x);
	x._parent = this;
	this._children.push(x);
}
Xml.prototype.attributes = function() {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._attributes.keys();
}
Xml.prototype.elements = function() {
	if(this._children == null) throw "bad nodetype";
	return { cur : 0, x : this._children, hasNext : function() {
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			if(this.x[k].nodeType == Xml.Element) break;
			k += 1;
		}
		this.cur = k;
		return k < l;
	}, next : function() {
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			var n = this.x[k];
			k += 1;
			if(n.nodeType == Xml.Element) {
				this.cur = k;
				return n;
			}
		}
		return null;
	}}
}
Xml.prototype.elementsNamed = function(name) {
	if(this._children == null) throw "bad nodetype";
	return { cur : 0, x : this._children, hasNext : function() {
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			var n = this.x[k];
			if(n.nodeType == Xml.Element && n._nodeName == name) break;
			k++;
		}
		this.cur = k;
		return k < l;
	}, next : function() {
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			var n = this.x[k];
			k++;
			if(n.nodeType == Xml.Element && n._nodeName == name) {
				this.cur = k;
				return n;
			}
		}
		return null;
	}}
}
Xml.prototype.exists = function(att) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._attributes.exists(att);
}
Xml.prototype.firstChild = function() {
	if(this._children == null) throw "bad nodetype";
	return this._children[0];
}
Xml.prototype.firstElement = function() {
	if(this._children == null) throw "bad nodetype";
	var cur = 0;
	var l = this._children.length;
	while(cur < l) {
		var n = this._children[cur];
		if(n.nodeType == Xml.Element) return n;
		cur++;
	}
	return null;
}
Xml.prototype.get = function(att) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._attributes.get(att);
}
Xml.prototype.getNodeName = function() {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._nodeName;
}
Xml.prototype.getNodeValue = function() {
	if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
	return this._nodeValue;
}
Xml.prototype.getParent = function() {
	return this._parent;
}
Xml.prototype.insertChild = function(x,pos) {
	if(this._children == null) throw "bad nodetype";
	if(x._parent != null) x._parent._children.remove(x);
	x._parent = this;
	this._children.insert(pos,x);
}
Xml.prototype.iterator = function() {
	if(this._children == null) throw "bad nodetype";
	return { cur : 0, x : this._children, hasNext : function() {
		return this.cur < this.x.length;
	}, next : function() {
		return this.x[this.cur++];
	}}
}
Xml.prototype.nodeName = null;
Xml.prototype.nodeType = null;
Xml.prototype.nodeValue = null;
Xml.prototype.parent = null;
Xml.prototype.remove = function(att) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	this._attributes.remove(att);
}
Xml.prototype.removeChild = function(x) {
	if(this._children == null) throw "bad nodetype";
	var b = this._children.remove(x);
	if(b) x._parent = null;
	return b;
}
Xml.prototype.set = function(att,value) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	this._attributes.set(att,value);
}
Xml.prototype.setNodeName = function(n) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._nodeName = n;
}
Xml.prototype.setNodeValue = function(v) {
	if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
	return this._nodeValue = v;
}
Xml.prototype.toString = function() {
	if(this.nodeType == Xml.PCData) return this._nodeValue;
	if(this.nodeType == Xml.CData) return ("<![CDATA[" + this._nodeValue) + "]]>";
	if(this.nodeType == Xml.Comment) return ("<!--" + this._nodeValue) + "-->";
	if(this.nodeType == Xml.DocType) return ("<!DOCTYPE " + this._nodeValue) + ">";
	if(this.nodeType == Xml.Prolog) return ("<?" + this._nodeValue) + "?>";
	var s = new StringBuf();
	if(this.nodeType == Xml.Element) {
		s.b[s.b.length] = "<";
		s.b[s.b.length] = this._nodeName;
		{ var $it0 = this._attributes.keys();
		while( $it0.hasNext() ) { var k = $it0.next();
		{
			s.b[s.b.length] = " ";
			s.b[s.b.length] = k;
			s.b[s.b.length] = "=\"";
			s.b[s.b.length] = this._attributes.get(k);
			s.b[s.b.length] = "\"";
		}
		}}
		if(this._children.length == 0) {
			s.b[s.b.length] = "/>";
			return s.b.join("");
		}
		s.b[s.b.length] = ">";
	}
	{ var $it1 = this.iterator();
	while( $it1.hasNext() ) { var x = $it1.next();
	s.b[s.b.length] = x.toString();
	}}
	if(this.nodeType == Xml.Element) {
		s.b[s.b.length] = "</";
		s.b[s.b.length] = this._nodeName;
		s.b[s.b.length] = ">";
	}
	return s.b.join("");
}
Xml.prototype.__class__ = Xml;
StringTools = function() { }
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
StringTools.htmlEscape = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
StringTools.htmlUnescape = function(s) {
	return s.split("&gt;").join(">").split("&lt;").join("<").split("&amp;").join("&");
}
StringTools.startsWith = function(s,start) {
	return (s.length >= start.length && s.substr(0,start.length) == start);
}
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return (slen >= elen && s.substr(slen - elen,elen) == end);
}
StringTools.isSpace = function(s,pos) {
	var c = s.charCodeAt(pos);
	return (c >= 9 && c <= 13) || c == 32;
}
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) {
		r++;
	}
	if(r > 0) return s.substr(r,l - r);
	else return s;
}
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,(l - r) - 1)) {
		r++;
	}
	if(r > 0) {
		return s.substr(0,l - r);
	}
	else {
		return s;
	}
}
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
}
StringTools.rpad = function(s,c,l) {
	var sl = s.length;
	var cl = c.length;
	while(sl < l) {
		if(l - sl < cl) {
			s += c.substr(0,l - sl);
			sl = l;
		}
		else {
			s += c;
			sl += cl;
		}
	}
	return s;
}
StringTools.lpad = function(s,c,l) {
	var ns = "";
	var sl = s.length;
	if(sl >= l) return s;
	var cl = c.length;
	while(sl < l) {
		if(l - sl < cl) {
			ns += c.substr(0,l - sl);
			sl = l;
		}
		else {
			ns += c;
			sl += cl;
		}
	}
	return ns + s;
}
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
}
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
}
StringTools.prototype.__class__ = StringTools;
Reflect = function() { }
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	if(o.hasOwnProperty != null) return o.hasOwnProperty(field);
	var arr = Reflect.fields(o);
	{ var $it0 = arr.iterator();
	while( $it0.hasNext() ) { var t = $it0.next();
	if(t == field) return true;
	}}
	return false;
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	}
	catch( $e0 ) {
		{
			var e = $e0;
			null;
		}
	}
	return v;
}
Reflect.setField = function(o,field,value) {
	o[field] = value;
}
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
}
Reflect.fields = function(o) {
	if(o == null) return new Array();
	var a = new Array();
	if(o.hasOwnProperty) {
		
				for(var i in o)
					if( o.hasOwnProperty(i) )
						a.push(i);
			;
	}
	else {
		var t;
		try {
			t = o.__proto__;
		}
		catch( $e0 ) {
			{
				var e = $e0;
				{
					t = null;
				}
			}
		}
		if(t != null) o.__proto__ = null;
		
				for(var i in o)
					if( i != "__proto__" )
						a.push(i);
			;
		if(t != null) o.__proto__ = t;
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && f.__name__ == null;
}
Reflect.compare = function(a,b) {
	return ((a == b)?0:((((a) > (b))?1:-1)));
}
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return (t == "string" || (t == "object" && !v.__enum__) || (t == "function" && v.__name__ != null));
}
Reflect.deleteField = function(o,f) {
	if(!Reflect.hasField(o,f)) return false;
	delete(o[f]);
	return true;
}
Reflect.copy = function(o) {
	var o2 = { }
	{
		var _g = 0, _g1 = Reflect.fields(o);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			o2[f] = Reflect.field(o,f);
		}
	}
	return o2;
}
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = new Array();
		{
			var _g1 = 0, _g = arguments.length;
			while(_g1 < _g) {
				var i = _g1++;
				a.push(arguments[i]);
			}
		}
		return f(a);
	}
}
Reflect.prototype.__class__ = Reflect;
js.BackForward = function() { }
js.BackForward.__name__ = ["js","BackForward"];
js.BackForward.iframe = null;
js.BackForward.history = null;
js.BackForward.current = null;
js.BackForward.currentHash = null;
js.BackForward.isFirefox = null;
js.BackForward.isSafari = null;
js.BackForward.urlBase = null;
js.BackForward.init = function() {
	// Le site était optimisé pour Firefox, à une époque où Chrome n'existait pas encore et de nombreuses différences d'implémentation existaient entre les navigateurs.
	// Ce ne devrait plus être le cas désormais et les deux lignes suivantes ont donc été changées (Chrome était par ailleurs incorrectement détecté comme étant Safari !).
	// Ceci est également appliqué aux propriétés "js.Lib.isIE" et "js.Lib.isOpera", plus bas dans ce fichier.
	js.BackForward.isFirefox = true;
	js.BackForward.isSafari = false;
	js.BackForward.history = new List();
	if(!js.BackForward.isSafari) {
		js.BackForward.check();
		var t = new haxe.Timer(200);
		t.run = $closure(js.BackForward,"check");
	}
	if(js.Lib.isIE || js.BackForward.isSafari) haxe.Timer.delay($closure(js.BackForward,"realInit"),200);
}
js.BackForward.realInit = function() {
	js.BackForward.iframe = js.Lib.document.getElementById("HistoryFrame");
	js.BackForward.iframe.src = "fake.html?back";
}
js.BackForward.iframeLoaded = function(location) {
	var e = Std.string(location).split("?");
	if(js.BackForward.iframeInit) {
		if(e[1] == "back") {
			js.BackForward.goBack();
			js.Lib.window.history.forward();
		}
	}
	else {
		if(e[1] == "back") {
			js.BackForward.iframe.src = "fake.html?ok";
		}
		else if(e[1] == "ok") {
			js.BackForward.iframeInit = true;
		}
	}
}
js.BackForward.check = function() {
	var h = Std.string(js.Lib.window.location).split("#")[1];
	if(h != undefined && h != js.BackForward.currentHash) {
		var t = StringTools.urlDecode(h);
		if(t != null && t.length > 3 && t != "null" && t != "undefined") {
			js.XmlHttp.enqueue(t);
		}
		else if(t == "") {
			if(js.BackForward.urlBase != null) js.XmlHttp.enqueue(js.BackForward.urlBase);
		}
		if(h != null) js.BackForward.currentHash = h;
	}
}
js.BackForward.setBase = function(url) {
	var r = new EReg("(.*)[?;]rand=[0-9]+","");
	if(r.match(url)) url = r.matched(1);
	if(url === "partnerFrame") url = "game"; // Empêche le lien du header de renvoyer vers une mauvaise page.
	js.BackForward.urlBase = url;
}
js.BackForward.add = function(url) {
	var r = new EReg("(.*)[?;]rand=[0-9]+","");
	if(r.match(url)) url = r.matched(1);
	if(js.BackForward.current == url) return;
	if(js.BackForward.current != null) js.BackForward.history.push(js.BackForward.current);
	js.BackForward.current = url;
	if(js.BackForward.current != null) {
		js.BackForward.currentHash = url;
		if(!js.BackForward.isSafari) js.Lib.window.location = (Std.string(js.Lib.window.location).split("#")[0] + "#") + js.BackForward.currentHash;
	}
}
js.BackForward.goBack = function() {
	if(js.BackForward.history.length > 0) {
		var url = js.BackForward.history.pop();
		if(url == "") {
			if(js.BackForward.urlBase != null) js.XmlHttp.get(js.BackForward.urlBase);
		}
		else {
			js.XmlHttp.get(url);
		}
		js.BackForward.current = null;
	}
}
js.BackForward.clear = function() {
	js.BackForward.history = new List();
	js.BackForward.current = null;
}
js.BackForward.prototype.__class__ = js.BackForward;
haxe.Log = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Log.prototype.__class__ = haxe.Log;
js.Utils = function() { }
js.Utils.__name__ = ["js","Utils"];
js.Utils.init = function() {
	null;
}
js.Utils.friendlyBrowser = function() {
	var n = js.Lib.window.navigator.userAgent;
	var b;
	if(js.Utils.REG_FF.match(n)) b = "Firefox " + js.Utils.REG_FF.matched(1);
	else if(js.Utils.REG_OP.match(n)) b = "Opera " + js.Utils.REG_OP.matched(1);
	else if(js.Utils.REG_IE.match(n)) b = "Internet Explorer " + js.Utils.REG_IE.matched(1);
	else if(js.Utils.REG_SF.match(n)) b = "Safari " + js.Utils.REG_SF.matched(1);
	else b = n;
	return b;
}
js.Utils.strace = function(v) {
	if(!haxe.Firebug.detect()) return haxe.Log.trace(v,{ fileName : "Utils.hx", lineNumber : 33, className : "js.Utils", methodName : "strace"});
	return console.log(v);
}
js.Utils.byId = function(id) {
	return js.Lib.document.getElementById(id);
}
js.Utils.getFirstNamed = function(p,name) {
	var i = 0;
	var a = p.childNodes;
	while(i < a.length) {
		if(a[i].nodeName == name) return a[i];
		i++;
	}
	return null;
}
js.Utils.scrollDown = function(id,force) {
	if(force == null) force = false;
	var div = js.Lib.document.getElementById(id);
	if(div == null) return;
	if(div.autoScroll == null) {
		div.onscroll = function(e) {
			div.autoScroll = (div.scrollTop / (div.scrollHeight - div.clientHeight) > 0.85);
		}
		div.autoScroll = true;
	}
	if(div.autoScroll || force) div.scrollTop = div.scrollHeight - div.clientHeight;
}
js.Utils.scrollTop = function() {
	var s = null;
	{
		var doc = js.Lib.document;
		var win = js.Lib.window;
		s = win.scrollY;
		if(s == null && doc.documentElement != null) s = doc.documentElement.scrollTop;
		if(s == null) s = doc.body.scrollTop;
		else null;
	}
	if(s > 200) js.Lib.window.scrollTo(0,60);
}
js.Utils.appearDown = function(id,time) {
	var div = js.Utils.byId(id);
	if(div == null) return;
	var tStep = 20;
	var o = { tot : div.clientHeight, p : 0, s : (div.clientHeight * tStep) / time}
	div.style.top = -o.tot + "px";
	var timer = new haxe.Timer(tStep);
	timer.run = function() {
		o.p++;
		var t = Math.round(-o.tot + o.p * o.s);
		if(t > 0) {
			t = 0;
			timer.stop();
		}
		div.style.top = t + "px";
	}
}
js.Utils.addClassE = function(e,className) {
	var cn = e.className.split(" ");
	cn.remove(className);
	cn.push(className);
	e.className = cn.join(" ");
}
js.Utils.addClass = function(id,className) {
	var e = js.Lib.document.getElementById(id);
	if(e != null) js.Utils.addClassE(e,className);
}
js.Utils.removeClassE = function(e,className) {
	var cn = e.className.split(" ");
	cn.remove(className);
	e.className = cn.join(" ");
}
js.Utils.removeClass = function(id,className) {
	var e = js.Lib.document.getElementById(id);
	if(e != null) js.Utils.removeClassE(e,className);
}
js.Utils.setClass = function(id,classes) {
	var e = js.Lib.document.getElementById(id);
	if(e != null) {
		e.className = classes;
	}
}
js.Utils.checkAll = function(id,prefix) {
	var form = js.Utils.byId(id);
	if(form == null) throw "Form not found";
	var l = form.elements;
	{
		var _g1 = 0, _g = l.length;
		while(_g1 < _g) {
			var i = _g1++;
			var e = l[i];
			if(e.type == "checkbox" && (prefix == null || e.id.substr(0,prefix.length) == prefix)) e.checked = true;
		}
	}
}
js.Utils.refreshCSS = function() {
	var html = js.Utils.getFirstNamed(js.Lib.document,"HTML");
	var head = js.Utils.getFirstNamed(html,"HEAD");
	var i = 0;
	var a = head.childNodes;
	while(i < a.length) {
		var l = a[i];
		if(l.nodeName == "LINK") {
			var t = l.getAttribute("href");
			var r = new EReg("(.*?)\\?version=([0-9]+)","");
			l.setAttribute("href",(r.match(t)?(r.matched(1) + "?version=") + (Std.parseInt(r.matched(2)) + 1):t + "?version=2"));
			haxe.Log.trace(l.getAttribute("href"),{ fileName : "Utils.hx", lineNumber : 166, className : "js.Utils", methodName : "refreshCSS"});
		}
		i++;
	}
}
js.Utils.menuSelect = function(menuId,selectedId,className) {
	try {
		var menu = js.Utils.byId(menuId);
		var c = menu.firstChild;
		js.Utils.rec_menuSelect(c,selectedId,className);
	}
	catch( $e0 ) {
		{
			var e = $e0;
			null;
		}
	}
}
js.Utils.rec_menuSelect = function(c,selectedId,className) {
	while(c != null) {
		if(c.nodeType == 1) {
			var id = c.getAttribute("menuid");
			if(id != null) {
				var cn = c.className.split(" ");
				cn.remove(className);
				if(id == selectedId) {
					cn.push(className);
				}
				c.className = cn.join(" ");
			}
			else {
				js.Utils.rec_menuSelect(c.firstChild,selectedId,className);
			}
		}
		c = c.nextSibling;
	}
}
js.Utils.prototype.__class__ = js.Utils;
_PartyMode = { __ename__ : ["_PartyMode"], __constructs__ : ["_MPlay","_MView","_MReplay"] }
_PartyMode._MPlay = ["_MPlay",0];
_PartyMode._MPlay.toString = $estr;
_PartyMode._MPlay.__enum__ = _PartyMode;
_PartyMode._MReplay = ["_MReplay",2];
_PartyMode._MReplay.toString = $estr;
_PartyMode._MReplay.__enum__ = _PartyMode;
_PartyMode._MView = ["_MView",1];
_PartyMode._MView.toString = $estr;
_PartyMode._MView.__enum__ = _PartyMode;
_ChatMessage = { __ename__ : ["_ChatMessage"], __constructs__ : ["_Message","_Speech","_Command"] }
_ChatMessage._Command = function(c) { var $x = ["_Command",2,c]; $x.__enum__ = _ChatMessage; $x.toString = $estr; return $x; }
_ChatMessage._Message = function(s,color) { var $x = ["_Message",0,s,color]; $x.__enum__ = _ChatMessage; $x.toString = $estr; return $x; }
_ChatMessage._Speech = function(s) { var $x = ["_Speech",1,s]; $x.__enum__ = _ChatMessage; $x.toString = $estr; return $x; }
_ChatCommand = { __ename__ : ["_ChatCommand"], __constructs__ : ["_Lol","_Yes","_No","_Love","_Cry","_Out","_Happy","_Puke","_Jump","_Fight","_Angry","_Token"] }
_ChatCommand._Angry = ["_Angry",10];
_ChatCommand._Angry.toString = $estr;
_ChatCommand._Angry.__enum__ = _ChatCommand;
_ChatCommand._Cry = ["_Cry",4];
_ChatCommand._Cry.toString = $estr;
_ChatCommand._Cry.__enum__ = _ChatCommand;
_ChatCommand._Fight = ["_Fight",9];
_ChatCommand._Fight.toString = $estr;
_ChatCommand._Fight.__enum__ = _ChatCommand;
_ChatCommand._Happy = ["_Happy",6];
_ChatCommand._Happy.toString = $estr;
_ChatCommand._Happy.__enum__ = _ChatCommand;
_ChatCommand._Jump = ["_Jump",8];
_ChatCommand._Jump.toString = $estr;
_ChatCommand._Jump.__enum__ = _ChatCommand;
_ChatCommand._Lol = ["_Lol",0];
_ChatCommand._Lol.toString = $estr;
_ChatCommand._Lol.__enum__ = _ChatCommand;
_ChatCommand._Love = ["_Love",3];
_ChatCommand._Love.toString = $estr;
_ChatCommand._Love.__enum__ = _ChatCommand;
_ChatCommand._No = ["_No",2];
_ChatCommand._No.toString = $estr;
_ChatCommand._No.__enum__ = _ChatCommand;
_ChatCommand._Out = ["_Out",5];
_ChatCommand._Out.toString = $estr;
_ChatCommand._Out.__enum__ = _ChatCommand;
_ChatCommand._Puke = ["_Puke",7];
_ChatCommand._Puke.toString = $estr;
_ChatCommand._Puke.__enum__ = _ChatCommand;
_ChatCommand._Token = ["_Token",11];
_ChatCommand._Token.toString = $estr;
_ChatCommand._Token.__enum__ = _ChatCommand;
_ChatCommand._Yes = ["_Yes",1];
_ChatCommand._Yes.toString = $estr;
_ChatCommand._Yes.__enum__ = _ChatCommand;
_AdminMessage = { __ename__ : ["_AdminMessage"], __constructs__ : ["_UpdateMoney","_UpdatePrizeToken","_Load","_Alert","_NewMessage","_DefyNew","_DefyRefused","_DefyAccepted","_GroupJoin","_DefyCanceled","_Reboot"] }
_AdminMessage._Alert = function(s) { var $x = ["_Alert",3,s]; $x.__enum__ = _AdminMessage; $x.toString = $estr; return $x; }
_AdminMessage._DefyAccepted = function(name) { var $x = ["_DefyAccepted",7,name]; $x.__enum__ = _AdminMessage; $x.toString = $estr; return $x; }
_AdminMessage._DefyCanceled = ["_DefyCanceled",9];
_AdminMessage._DefyCanceled.toString = $estr;
_AdminMessage._DefyCanceled.__enum__ = _AdminMessage;
_AdminMessage._DefyNew = function(name,game,gameShort,group) { var $x = ["_DefyNew",5,name,game,gameShort,group]; $x.__enum__ = _AdminMessage; $x.toString = $estr; return $x; }
_AdminMessage._DefyRefused = function(name,r) { var $x = ["_DefyRefused",6,name,r]; $x.__enum__ = _AdminMessage; $x.toString = $estr; return $x; }
_AdminMessage._GroupJoin = function(group,user) { var $x = ["_GroupJoin",8,group,user]; $x.__enum__ = _AdminMessage; $x.toString = $estr; return $x; }
_AdminMessage._Load = function(s) { var $x = ["_Load",2,s]; $x.__enum__ = _AdminMessage; $x.toString = $estr; return $x; }
_AdminMessage._NewMessage = function(f,n) { var $x = ["_NewMessage",4,f,n]; $x.__enum__ = _AdminMessage; $x.toString = $estr; return $x; }
_AdminMessage._Reboot = ["_Reboot",10];
_AdminMessage._Reboot.toString = $estr;
_AdminMessage._Reboot.__enum__ = _AdminMessage;
_AdminMessage._UpdateMoney = function(m,freem) { var $x = ["_UpdateMoney",0,m,freem]; $x.__enum__ = _AdminMessage; $x.toString = $estr; return $x; }
_AdminMessage._UpdatePrizeToken = function(t) { var $x = ["_UpdatePrizeToken",1,t]; $x.__enum__ = _AdminMessage; $x.toString = $estr; return $x; }
_ChatType = { __ename__ : ["_ChatType"], __constructs__ : ["_Group","_Party"] }
_ChatType._Group = ["_Group",0];
_ChatType._Group.toString = $estr;
_ChatType._Group.__enum__ = _ChatType;
_ChatType._Party = ["_Party",1];
_ChatType._Party.toString = $estr;
_ChatType._Party.__enum__ = _ChatType;
_Victory = { __ename__ : ["_Victory"], __constructs__ : ["_VNormal","_VTimeout","_VGiveup","_VDisconnected","_VBug","_VCanceled"] }
_Victory._VBug = ["_VBug",4];
_Victory._VBug.toString = $estr;
_Victory._VBug.__enum__ = _Victory;
_Victory._VCanceled = ["_VCanceled",5];
_Victory._VCanceled.toString = $estr;
_Victory._VCanceled.__enum__ = _Victory;
_Victory._VDisconnected = ["_VDisconnected",3];
_Victory._VDisconnected.toString = $estr;
_Victory._VDisconnected.__enum__ = _Victory;
_Victory._VGiveup = ["_VGiveup",2];
_Victory._VGiveup.toString = $estr;
_Victory._VGiveup.__enum__ = _Victory;
_Victory._VNormal = ["_VNormal",0];
_Victory._VNormal.toString = $estr;
_Victory._VNormal.__enum__ = _Victory;
_Victory._VTimeout = ["_VTimeout",1];
_Victory._VTimeout.toString = $estr;
_Victory._VTimeout.__enum__ = _Victory;
StringBuf = function(p) { if( p === $_ ) return; {
	this.b = new Array();
}}
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype.add = function(x) {
	this.b[this.b.length] = x;
}
StringBuf.prototype.addChar = function(c) {
	this.b[this.b.length] = String.fromCharCode(c);
}
StringBuf.prototype.addSub = function(s,pos,len) {
	this.b[this.b.length] = s.substr(pos,len);
}
StringBuf.prototype.b = null;
StringBuf.prototype.toString = function() {
	return this.b.join("");
}
StringBuf.prototype.__class__ = StringBuf;
js.TemplateTools = function() { }
js.TemplateTools.__name__ = ["js","TemplateTools"];
js.TemplateTools.token = function(r,text) {
	return ((("<span class=\"tokens\" title=\"" + text) + " sucre(s)\">") + text) + "<img src=\"img/icons/small_token.gif\" alt=\"sucre(s)\"/></span>";
}
js.TemplateTools.tip = function(r,text) {
	return ("onmouseover=\"mt.js.Tip.show(this,'" + text.split("'").join("\\'")) + "',null)\" onmouseout=\"mt.js.Tip.hide()\"";
}
js.TemplateTools.mtip = function(r,macro) {
	return ("onmouseover=\"mt.js.Tip.show(this,js.App.applyTpl('" + macro) + "',null),null)\" onmouseout=\"mt.js.Tip.hide()\"";
}
js.TemplateTools.click = function(r,url) {
	return ("href=\"#\" onclick=\"js.XmlHttp.get('" + url) + "',this); return false;\"";
}
js.TemplateTools.macro = function(r,name) {
	return js.App.applyTpl(name,null);
}
js.TemplateTools.prototype.__class__ = js.TemplateTools;
haxe.remoting.Connection = function() { }
haxe.remoting.Connection.__name__ = ["haxe","remoting","Connection"];
haxe.remoting.Connection.prototype.call = null;
haxe.remoting.Connection.prototype.resolve = null;
haxe.remoting.Connection.prototype.__class__ = haxe.remoting.Connection;
Hash = function(p) { if( p === $_ ) return; {
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	}
	else null;
}}
Hash.__name__ = ["Hash"];
Hash.prototype.exists = function(key) {
	try {
		key = "$" + key;
		return this.hasOwnProperty.call(this.h,key);
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				
				for(var i in this.h)
					if( i == key ) return true;
			;
				return false;
			}
		}
	}
}
Hash.prototype.get = function(key) {
	return this.h["$" + key];
}
Hash.prototype.h = null;
Hash.prototype.iterator = function() {
	return { ref : this.h, it : this.keys(), hasNext : function() {
		return this.it.hasNext();
	}, next : function() {
		var i = this.it.next();
		return this.ref["$" + i];
	}}
}
Hash.prototype.keys = function() {
	var a = new Array();
	
			for(var i in this.h)
				a.push(i.substr(1));
		;
	return a.iterator();
}
Hash.prototype.remove = function(key) {
	if(!this.exists(key)) return false;
	delete(this.h["$" + key]);
	return true;
}
Hash.prototype.set = function(key,value) {
	this.h["$" + key] = value;
}
Hash.prototype.toString = function() {
	var s = new StringBuf();
	s.b[s.b.length] = "{";
	var it = this.keys();
	{ var $it0 = it;
	while( $it0.hasNext() ) { var i = $it0.next();
	{
		s.b[s.b.length] = i;
		s.b[s.b.length] = " => ";
		s.b[s.b.length] = Std.string(this.get(i));
		if(it.hasNext()) s.b[s.b.length] = ", ";
	}
	}}
	s.b[s.b.length] = "}";
	return s.b.join("");
}
Hash.prototype.__class__ = Hash;
haxe.remoting.ExternalConnection = function(data,path) { if( data === $_ ) return; {
	this.__data = data;
	this.__path = path;
}}
haxe.remoting.ExternalConnection.__name__ = ["haxe","remoting","ExternalConnection"];
haxe.remoting.ExternalConnection.escapeString = function(s) {
	return s;
}
haxe.remoting.ExternalConnection.doCall = function(name,path,params) {
	try {
		var cnx = haxe.remoting.ExternalConnection.connections.get(name);
		if(cnx == null) throw "Unknown connection : " + name;
		if(cnx.__data.ctx == null) throw "No context shared for the connection " + name;
		var params1 = new haxe.Unserializer(params).unserialize();
		var ret = cnx.__data.ctx.call(path.split("."),params1);
		var s = new haxe.Serializer();
		s.serialize(ret);
		return s.toString() + "#";
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				var s = new haxe.Serializer();
				s.serializeException(e);
				return s.toString();
			}
		}
	}
}
haxe.remoting.ExternalConnection.flashConnect = function(name,flashObjectID,ctx) {
	var cnx = new haxe.remoting.ExternalConnection({ ctx : ctx, name : name, flash : flashObjectID},[]);
	haxe.remoting.ExternalConnection.connections.set(name,cnx);
	return cnx;
}
haxe.remoting.ExternalConnection.prototype.__data = null;
haxe.remoting.ExternalConnection.prototype.__path = null;
haxe.remoting.ExternalConnection.prototype.call = function(params) {
	var s = new haxe.Serializer();
	s.serialize(params);
	var params1 = s.toString();
	var data = null;
	var fobj = window.document[this.__data.flash];
	if(fobj == null) fobj = window.document.getElementById(this.__data.flash);
	if(fobj == null) throw ("Could not find flash object '" + this.__data.flash) + "'";
	try {
		data = fobj.externalRemotingCall(this.__data.name,this.__path.join("."),params1);
	}
	catch( $e0 ) {
		{
			var e = $e0;
			null;
		}
	}
	if(data == null) {
		var domain, pageDomain;
		try {
			domain = fobj.src.split("/")[2];
			pageDomain = js.Lib.window.location.host;
		}
		catch( $e1 ) {
			{
				var e = $e1;
				{
					domain = null;
					pageDomain = null;
				}
			}
		}
		if(domain != pageDomain) throw ("ExternalConnection call failure : SWF need allowDomain('" + pageDomain) + "')";
		throw "Call failure : ExternalConnection is not " + "initialized in Flash";
	}
	return new haxe.Unserializer(data).unserialize();
}
haxe.remoting.ExternalConnection.prototype.close = function() {
	haxe.remoting.ExternalConnection.connections.remove(this.__data.name);
}
haxe.remoting.ExternalConnection.prototype.resolve = function(field) {
	var e = new haxe.remoting.ExternalConnection(this.__data,this.__path.copy());
	e.__path.push(field);
	return e;
}
haxe.remoting.ExternalConnection.prototype.__class__ = haxe.remoting.ExternalConnection;
haxe.remoting.ExternalConnection.__interfaces__ = [haxe.remoting.Connection];
haxe.Firebug = function() { }
haxe.Firebug.__name__ = ["haxe","Firebug"];
haxe.Firebug.detect = function() {
	try {
		return console != null && console.error != null;
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				return false;
			}
		}
	}
}
haxe.Firebug.redirectTraces = function() {
	haxe.Log.trace = $closure(haxe.Firebug,"trace");
	js.Lib.setErrorHandler($closure(haxe.Firebug,"onError"));
}
haxe.Firebug.onError = function(err,stack) {
	var buf = err + "\n";
	{
		var _g = 0;
		while(_g < stack.length) {
			var s = stack[_g];
			++_g;
			buf += ("Called from " + s) + "\n";
		}
	}
	haxe.Firebug.trace(buf,null);
	return true;
}
haxe.Firebug.trace = function(v,inf) {
	var type = (inf != null && inf.customParams != null?inf.customParams[0]:null);
	if(type != "warn" && type != "info" && type != "debug" && type != "error") type = (inf == null?"error":"log");
	console[type](((inf == null?"":((inf.fileName + ":") + inf.lineNumber) + " : ")) + Std.string(v));
}
haxe.Firebug.prototype.__class__ = haxe.Firebug;
if(!haxe.io) haxe.io = {}
haxe.io.Bytes = function(length,b) { if( length === $_ ) return; {
	this.length = length;
	this.b = b;
}}
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	{
		var _g = 0;
		while(_g < length) {
			var i = _g++;
			a.push(0);
		}
	}
	return new haxe.io.Bytes(length,a);
}
haxe.io.Bytes.ofString = function(s) {
	var a = new Array();
	{
		var _g1 = 0, _g = s.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = s["cca"](i);
			if(c <= 127) a.push(c);
			else if(c <= 2047) {
				a.push(192 | (c >> 6));
				a.push(128 | (c & 63));
			}
			else if(c <= 65535) {
				a.push(224 | (c >> 12));
				a.push(128 | ((c >> 6) & 63));
				a.push(128 | (c & 63));
			}
			else {
				a.push(240 | (c >> 18));
				a.push(128 | ((c >> 12) & 63));
				a.push(128 | ((c >> 6) & 63));
				a.push(128 | (c & 63));
			}
		}
	}
	return new haxe.io.Bytes(a.length,a);
}
haxe.io.Bytes.ofData = function(b) {
	return new haxe.io.Bytes(b.length,b);
}
haxe.io.Bytes.prototype.b = null;
haxe.io.Bytes.prototype.blit = function(pos,src,srcpos,len) {
	if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) throw haxe.io.Error.OutsideBounds;
	var b1 = this.b;
	var b2 = src.b;
	if(b1 == b2 && pos > srcpos) {
		var i = len;
		while(i > 0) {
			i--;
			b1[i + pos] = b2[i + srcpos];
		}
		return;
	}
	{
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			b1[i + pos] = b2[i + srcpos];
		}
	}
}
haxe.io.Bytes.prototype.compare = function(other) {
	var b1 = this.b;
	var b2 = other.b;
	var len = ((this.length < other.length)?this.length:other.length);
	{
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			if(b1[i] != b2[i]) return b1[i] - b2[i];
		}
	}
	return this.length - other.length;
}
haxe.io.Bytes.prototype.get = function(pos) {
	return this.b[pos];
}
haxe.io.Bytes.prototype.getData = function() {
	return this.b;
}
haxe.io.Bytes.prototype.length = null;
haxe.io.Bytes.prototype.readString = function(pos,len) {
	if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
	var s = "";
	var b = this.b;
	var fcc = $closure(String,"fromCharCode");
	var i = pos;
	var max = pos + len;
	while(i < max) {
		var c = b[i++];
		if(c < 128) {
			if(c == 0) break;
			s += fcc(c);
		}
		else if(c < 224) s += fcc(((c & 63) << 6) | (b[i++] & 127));
		else if(c < 240) {
			var c2 = b[i++];
			s += fcc((((c & 31) << 12) | ((c2 & 127) << 6)) | (b[i++] & 127));
		}
		else {
			var c2 = b[i++];
			var c3 = b[i++];
			s += fcc(((((c & 15) << 18) | ((c2 & 127) << 12)) | ((c3 << 6) & 127)) | (b[i++] & 127));
		}
	}
	return s;
}
haxe.io.Bytes.prototype.set = function(pos,v) {
	this.b[pos] = (v & 255);
}
haxe.io.Bytes.prototype.sub = function(pos,len) {
	if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
	return new haxe.io.Bytes(len,this.b.slice(pos,pos + len));
}
haxe.io.Bytes.prototype.toString = function() {
	return this.readString(0,this.length);
}
haxe.io.Bytes.prototype.__class__ = haxe.io.Bytes;
if(!haxe._Template) haxe._Template = {}
haxe._Template.TemplateExpr = { __ename__ : ["haxe","_Template","TemplateExpr"], __constructs__ : ["OpVar","OpExpr","OpIf","OpStr","OpBlock","OpForeach","OpMacro"] }
haxe._Template.TemplateExpr.OpBlock = function(l) { var $x = ["OpBlock",4,l]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpExpr = function(expr) { var $x = ["OpExpr",1,expr]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpForeach = function(expr,loop) { var $x = ["OpForeach",5,expr,loop]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpIf = function(expr,eif,eelse) { var $x = ["OpIf",2,expr,eif,eelse]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpMacro = function(name,params) { var $x = ["OpMacro",6,name,params]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpStr = function(str) { var $x = ["OpStr",3,str]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpVar = function(v) { var $x = ["OpVar",0,v]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe.Template = function(str) { if( str === $_ ) return; {
	var tokens = this.parseTokens(str);
	this.expr = this.parseBlock(tokens);
	if(!tokens.isEmpty()) throw ("Unexpected '" + tokens.first().s) + "'";
}}
haxe.Template.__name__ = ["haxe","Template"];
haxe.Template.prototype.buf = null;
haxe.Template.prototype.context = null;
haxe.Template.prototype.execute = function(context,macros) {
	this.macros = (macros == null?{ }:macros);
	this.context = context;
	this.stack = new List();
	this.buf = new StringBuf();
	this.run(this.expr);
	return this.buf.b.join("");
}
haxe.Template.prototype.expr = null;
haxe.Template.prototype.macros = null;
haxe.Template.prototype.makeConst = function(v) {
	haxe.Template.expr_trim.match(v);
	v = haxe.Template.expr_trim.matched(1);
	if(v.charCodeAt(0) == 34) {
		var str = v.substr(1,v.length - 2);
		return function() {
			return str;
		}
	}
	if(haxe.Template.expr_int.match(v)) {
		var i = Std.parseInt(v);
		return function() {
			return i;
		}
	}
	if(haxe.Template.expr_float.match(v)) {
		var f = Std.parseFloat(v);
		return function() {
			return f;
		}
	}
	var me = this;
	return function() {
		return me.resolve(v);
	}
}
haxe.Template.prototype.makeExpr = function(l) {
	return this.makePath(this.makeExpr2(l),l);
}
haxe.Template.prototype.makeExpr2 = function(l) {
	var p = l.pop();
	if(p == null) throw "<eof>";
	if(p.s) return this.makeConst(p.p);
	switch(p.p) {
	case "(":{
		var e1 = this.makeExpr(l);
		var p1 = l.pop();
		if(p1 == null || p1.s) throw p1.p;
		if(p1.p == ")") return e1;
		var e2 = this.makeExpr(l);
		var p2 = l.pop();
		if(p2 == null || p2.p != ")") throw p2.p;
		return (function($this) {
			var $r;
			switch(p1.p) {
			case "+":{
				$r = function() {
					return e1() + e2();
				}
			}break;
			case "-":{
				$r = function() {
					return e1() - e2();
				}
			}break;
			case "*":{
				$r = function() {
					return e1() * e2();
				}
			}break;
			case "/":{
				$r = function() {
					return e1() / e2();
				}
			}break;
			case ">":{
				$r = function() {
					return e1() > e2();
				}
			}break;
			case "<":{
				$r = function() {
					return e1() < e2();
				}
			}break;
			case ">=":{
				$r = function() {
					return e1() >= e2();
				}
			}break;
			case "<=":{
				$r = function() {
					return e1() <= e2();
				}
			}break;
			case "==":{
				$r = function() {
					return e1() == e2();
				}
			}break;
			case "!=":{
				$r = function() {
					return e1() != e2();
				}
			}break;
			case "&&":{
				$r = function() {
					return e1() && e2();
				}
			}break;
			case "||":{
				$r = function() {
					return e1() || e2();
				}
			}break;
			default:{
				$r = (function($this) {
					var $r;
					throw "Unknown operation " + p1.p;
					return $r;
				}($this));
			}break;
			}
			return $r;
		}(this));
	}break;
	case "!":{
		var e = this.makeExpr(l);
		return function() {
			var v = e();
			return (v == null || v == false);
		}
	}break;
	case "-":{
		var e = this.makeExpr(l);
		return function() {
			return -e();
		}
	}break;
	}
	throw p.p;
}
haxe.Template.prototype.makePath = function(e,l) {
	var p = l.first();
	if(p == null || p.p != ".") return e;
	l.pop();
	var field = l.pop();
	if(field == null || !field.s) throw field.p;
	var f = field.p;
	haxe.Template.expr_trim.match(f);
	f = haxe.Template.expr_trim.matched(1);
	return this.makePath(function() {
		return Reflect.field(e(),f);
	},l);
}
haxe.Template.prototype.parse = function(tokens) {
	var t = tokens.pop();
	var p = t.p;
	if(t.s) return haxe._Template.TemplateExpr.OpStr(p);
	if(t.l != null) {
		var pe = new List();
		{
			var _g = 0, _g1 = t.l;
			while(_g < _g1.length) {
				var p1 = _g1[_g];
				++_g;
				pe.add(this.parseBlock(this.parseTokens(p1)));
			}
		}
		return haxe._Template.TemplateExpr.OpMacro(p,pe);
	}
	if(p.substr(0,3) == "if ") {
		p = p.substr(3,p.length - 3);
		var e = this.parseExpr(p);
		var eif = this.parseBlock(tokens);
		var t1 = tokens.first();
		var eelse;
		if(t1 == null) throw "Unclosed 'if'";
		if(t1.p == "end") {
			tokens.pop();
			eelse = null;
		}
		else if(t1.p == "else") {
			tokens.pop();
			eelse = this.parseBlock(tokens);
			t1 = tokens.pop();
			if(t1 == null || t1.p != "end") throw "Unclosed 'else'";
		}
		else {
			t1.p = t1.p.substr(4,t1.p.length - 4);
			eelse = this.parse(tokens);
		}
		return haxe._Template.TemplateExpr.OpIf(e,eif,eelse);
	}
	if(p.substr(0,8) == "foreach ") {
		p = p.substr(8,p.length - 8);
		var e = this.parseExpr(p);
		var efor = this.parseBlock(tokens);
		var t1 = tokens.pop();
		if(t1 == null || t1.p != "end") throw "Unclosed 'foreach'";
		return haxe._Template.TemplateExpr.OpForeach(e,efor);
	}
	if(haxe.Template.expr_splitter.match(p)) return haxe._Template.TemplateExpr.OpExpr(this.parseExpr(p));
	return haxe._Template.TemplateExpr.OpVar(p);
}
haxe.Template.prototype.parseBlock = function(tokens) {
	var l = new List();
	while(true) {
		var t = tokens.first();
		if(t == null) break;
		if(!t.s && (t.p == "end" || t.p == "else" || t.p.substr(0,7) == "elseif ")) break;
		l.add(this.parse(tokens));
	}
	if(l.length == 1) return l.first();
	return haxe._Template.TemplateExpr.OpBlock(l);
}
haxe.Template.prototype.parseExpr = function(data) {
	var l = new List();
	var expr = data;
	while(haxe.Template.expr_splitter.match(data)) {
		var p = haxe.Template.expr_splitter.matchedPos();
		var k = p.pos + p.len;
		if(p.pos != 0) l.add({ p : data.substr(0,p.pos), s : true});
		var p1 = haxe.Template.expr_splitter.matched(0);
		l.add({ p : p1, s : p1.indexOf("\"") >= 0});
		data = haxe.Template.expr_splitter.matchedRight();
	}
	if(data.length != 0) l.add({ p : data, s : true});
	var e;
	try {
		e = this.makeExpr(l);
		if(!l.isEmpty()) throw l.first().p;
	}
	catch( $e0 ) {
		if( js.Boot.__instanceof($e0,String) ) {
			var s = $e0;
			{
				throw (("Unexpected '" + s) + "' in ") + expr;
			}
		} else throw($e0);
	}
	return function() {
		try {
			return e();
		}
		catch( $e1 ) {
			{
				var exc = $e1;
				{
					throw (("Error : " + Std.string(exc)) + " in ") + expr;
				}
			}
		}
	}
}
haxe.Template.prototype.parseTokens = function(data) {
	var tokens = new List();
	while(haxe.Template.splitter.match(data)) {
		var p = haxe.Template.splitter.matchedPos();
		if(p.pos > 0) tokens.add({ p : data.substr(0,p.pos), s : true, l : null});
		if(data.charCodeAt(p.pos) == 58) {
			tokens.add({ p : data.substr(p.pos + 2,p.len - 4), s : false, l : null});
			data = haxe.Template.splitter.matchedRight();
			continue;
		}
		var parp = p.pos + p.len;
		var npar = 1;
		while(npar > 0) {
			var c = data.charCodeAt(parp);
			if(c == 40) npar++;
			else if(c == 41) npar--;
			else if(c == null) throw "Unclosed macro parenthesis";
			parp++;
		}
		var params = data.substr(p.pos + p.len,(parp - (p.pos + p.len)) - 1).split(",");
		tokens.add({ p : haxe.Template.splitter.matched(2), s : false, l : params});
		data = data.substr(parp,data.length - parp);
	}
	if(data.length > 0) tokens.add({ p : data, s : true, l : null});
	return tokens;
}
haxe.Template.prototype.resolve = function(v) {
	if(Reflect.hasField(this.context,v)) return Reflect.field(this.context,v);
	{ var $it0 = this.stack.iterator();
	while( $it0.hasNext() ) { var ctx = $it0.next();
	if(Reflect.hasField(ctx,v)) return Reflect.field(ctx,v);
	}}
	if(v == "__current__") return this.context;
	return Reflect.field(haxe.Template.globals,v);
}
haxe.Template.prototype.run = function(e) {
	var $e = (e);
	switch( $e[1] ) {
	case 0:
	var v = $e[2];
	{
		this.buf.add(Std.string(this.resolve(v)));
	}break;
	case 1:
	var e1 = $e[2];
	{
		this.buf.add(Std.string(e1()));
	}break;
	case 2:
	var eelse = $e[4], eif = $e[3], e1 = $e[2];
	{
		var v = e1();
		if(v == null || v == false) {
			if(eelse != null) this.run(eelse);
		}
		else this.run(eif);
	}break;
	case 3:
	var str = $e[2];
	{
		this.buf.add(str);
	}break;
	case 4:
	var l = $e[2];
	{
		{ var $it0 = l.iterator();
		while( $it0.hasNext() ) { var e1 = $it0.next();
		this.run(e1);
		}}
	}break;
	case 5:
	var loop = $e[3], e1 = $e[2];
	{
		var v = e1();
		try {
			if(v.hasNext == null) {
				var x = v.iterator();
				if(x.hasNext == null) throw null;
				v = x;
			}
		}
		catch( $e1 ) {
			{
				var e2 = $e1;
				{
					throw "Cannot iter on " + v;
				}
			}
		}
		this.stack.push(this.context);
		var v1 = v;
		{ var $it2 = v1;
		while( $it2.hasNext() ) { var ctx = $it2.next();
		{
			this.context = ctx;
			this.run(loop);
		}
		}}
		this.context = this.stack.pop();
	}break;
	case 6:
	var params = $e[3], m = $e[2];
	{
		var v = Reflect.field(this.macros,m);
		var pl = new Array();
		var old = this.buf;
		pl.push($closure(this,"resolve"));
		{ var $it3 = params.iterator();
		while( $it3.hasNext() ) { var p = $it3.next();
		{
			var $e = (p);
			switch( $e[1] ) {
			case 0:
			var v1 = $e[2];
			{
				pl.push(this.resolve(v1));
			}break;
			default:{
				this.buf = new StringBuf();
				this.run(p);
				pl.push(this.buf.b.join(""));
			}break;
			}
		}
		}}
		this.buf = old;
		try {
			this.buf.add(Std.string(v.apply(this.macros,pl)));
		}
		catch( $e4 ) {
			{
				var e1 = $e4;
				{
					var plstr = (function($this) {
						var $r;
						try {
							$r = pl.join(",");
						}
						catch( $e5 ) {
							{
								var e2 = $e5;
								$r = "???";
							}
						}
						return $r;
					}(this));
					var msg = ((((("Macro call " + m) + "(") + plstr) + ") failed (") + Std.string(e1)) + ")";
					throw msg;
				}
			}
		}
	}break;
	}
}
haxe.Template.prototype.stack = null;
haxe.Template.prototype.__class__ = haxe.Template;
IntIter = function(min,max) { if( min === $_ ) return; {
	this.min = min;
	this.max = max;
}}
IntIter.__name__ = ["IntIter"];
IntIter.prototype.hasNext = function() {
	return this.min < this.max;
}
IntIter.prototype.max = null;
IntIter.prototype.min = null;
IntIter.prototype.next = function() {
	return this.min++;
}
IntIter.prototype.__class__ = IntIter;
haxe.Timer = function(time_ms) { if( time_ms === $_ ) return; {
	this.id = haxe.Timer.arr.length;
	haxe.Timer.arr[this.id] = this;
	this.timerId = window.setInterval(("haxe.Timer.arr[" + this.id) + "].run();",time_ms);
}}
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	}
	return t;
}
haxe.Timer.stamp = function() {
	return Date.now().getTime() / 1000;
}
haxe.Timer.prototype.id = null;
haxe.Timer.prototype.run = function() {
	null;
}
haxe.Timer.prototype.stop = function() {
	if(this.id == null) return;
	window.clearInterval(this.timerId);
	haxe.Timer.arr[this.id] = null;
	if(this.id > 100 && this.id == haxe.Timer.arr.length - 1) {
		var p = this.id - 1;
		while(p >= 0 && haxe.Timer.arr[p] == null) p--;
		haxe.Timer.arr = haxe.Timer.arr.slice(0,p + 1);
	}
	this.id = null;
}
haxe.Timer.prototype.timerId = null;
haxe.Timer.prototype.__class__ = haxe.Timer;
haxe.io.Error = { __ename__ : ["haxe","io","Error"], __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] }
haxe.io.Error.Blocked = ["Blocked",0];
haxe.io.Error.Blocked.toString = $estr;
haxe.io.Error.Blocked.__enum__ = haxe.io.Error;
haxe.io.Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe.io.Error; $x.toString = $estr; return $x; }
haxe.io.Error.OutsideBounds = ["OutsideBounds",2];
haxe.io.Error.OutsideBounds.toString = $estr;
haxe.io.Error.OutsideBounds.__enum__ = haxe.io.Error;
haxe.io.Error.Overflow = ["Overflow",1];
haxe.io.Error.Overflow.toString = $estr;
haxe.io.Error.Overflow.__enum__ = haxe.io.Error;
Type = function() { }
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	if(o.__enum__ != null) return null;
	return o.__class__;
}
Type.getEnum = function(o) {
	if(o == null) return null;
	return o.__enum__;
}
Type.getSuperClass = function(c) {
	return c.__super__;
}
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
}
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
}
Type.resolveClass = function(name) {
	var cl;
	try {
		cl = eval(name);
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				cl = null;
			}
		}
	}
	if(cl == null || cl.__name__ == null) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e;
	try {
		e = eval(name);
	}
	catch( $e0 ) {
		{
			var err = $e0;
			{
				e = null;
			}
		}
	}
	if(e == null || e.__ename__ == null) return null;
	return e;
}
Type.createInstance = function(cl,args) {
	if(args.length <= 3) return new cl(args[0],args[1],args[2]);
	if(args.length > 8) throw "Too many arguments";
	return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
}
Type.createEmptyInstance = function(cl) {
	return new cl($_);
}
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw ("Constructor " + constr) + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw ("Constructor " + constr) + " does not need parameters";
	return f;
}
Type.createEnumIndex = function(e,index,params) {
	var c = Type.getEnumConstructs(e)[index];
	if(c == null) throw index + " is not a valid enum constructor index";
	return Type.createEnum(e,c,params);
}
Type.getInstanceFields = function(c) {
	var a = Reflect.fields(c.prototype);
	a.remove("__class__");
	return a;
}
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	a.remove("__name__");
	a.remove("__interfaces__");
	a.remove("__super__");
	a.remove("prototype");
	return a;
}
Type.getEnumConstructs = function(e) {
	return e.__constructs__;
}
Type["typeof"] = function(v) {
	switch(typeof(v)) {
	case "boolean":{
		return ValueType.TBool;
	}break;
	case "string":{
		return ValueType.TClass(String);
	}break;
	case "number":{
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	}break;
	case "object":{
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	}break;
	case "function":{
		if(v.__name__ != null) return ValueType.TObject;
		return ValueType.TFunction;
	}break;
	case "undefined":{
		return ValueType.TNull;
	}break;
	default:{
		return ValueType.TUnknown;
	}break;
	}
}
Type.enumEq = function(a,b) {
	if(a == b) return true;
	try {
		if(a[0] != b[0]) return false;
		{
			var _g1 = 2, _g = a.length;
			while(_g1 < _g) {
				var i = _g1++;
				if(!Type.enumEq(a[i],b[i])) return false;
			}
		}
		var e = a.__enum__;
		if(e != b.__enum__ || e == null) return false;
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				return false;
			}
		}
	}
	return true;
}
Type.enumConstructor = function(e) {
	return e[0];
}
Type.enumParameters = function(e) {
	return e.slice(2);
}
Type.enumIndex = function(e) {
	return e[1];
}
Type.prototype.__class__ = Type;
haxe.Unserializer = function(buf) { if( buf === $_ ) return; {
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = new Array();
	this.cache = new Array();
	this.setResolver(haxe.Unserializer.DEFAULT_RESOLVER);
}}
haxe.Unserializer.__name__ = ["haxe","Unserializer"];
haxe.Unserializer.initCodes = function() {
	var codes = new Array();
	{
		var _g1 = 0, _g = haxe.Unserializer.BASE64.length;
		while(_g1 < _g) {
			var i = _g1++;
			codes[haxe.Unserializer.BASE64.cca(i)] = i;
		}
	}
	return codes;
}
haxe.Unserializer.run = function(v) {
	return new haxe.Unserializer(v).unserialize();
}
haxe.Unserializer.prototype.buf = null;
haxe.Unserializer.prototype.cache = null;
haxe.Unserializer.prototype.get = function(p) {
	return this.buf.cca(p);
}
haxe.Unserializer.prototype.getResolver = function() {
	return this.resolver;
}
haxe.Unserializer.prototype.length = null;
haxe.Unserializer.prototype.pos = null;
haxe.Unserializer.prototype.readDigits = function() {
	var k = 0;
	var s = false;
	var fpos = this.pos;
	while(true) {
		var c = this.buf.cca(this.pos);
		if(Math.isNaN(c)) break;
		if(c == 45) {
			if(this.pos != fpos) break;
			s = true;
			this.pos++;
			continue;
		}
		if(c < 48 || c > 57) break;
		k = k * 10 + (c - 48);
		this.pos++;
	}
	if(s) k *= -1;
	return k;
}
haxe.Unserializer.prototype.resolver = null;
haxe.Unserializer.prototype.scache = null;
haxe.Unserializer.prototype.setResolver = function(r) {
	if(r == null) this.resolver = { resolveClass : function(_) {
		return null;
	}, resolveEnum : function(_) {
		return null;
	}}
	else this.resolver = r;
}
haxe.Unserializer.prototype.unserialize = function() {
	switch(this.buf.cca(this.pos++)) {
	case 110:{
		return null;
	}break;
	case 116:{
		return true;
	}break;
	case 102:{
		return false;
	}break;
	case 122:{
		return 0;
	}break;
	case 105:{
		return this.readDigits();
	}break;
	case 100:{
		var p1 = this.pos;
		while(true) {
			var c = this.buf.cca(this.pos);
			if((c >= 43 && c < 58) || c == 101 || c == 69) this.pos++;
			else break;
		}
		return Std.parseFloat(this.buf.substr(p1,this.pos - p1));
	}break;
	case 121:{
		var len = this.readDigits();
		if(this.buf.cca(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid string length";
		var s = this.buf.substr(this.pos,len);
		this.pos += len;
		s = StringTools.urlDecode(s);
		this.scache.push(s);
		return s;
	}break;
	case 107:{
		return Math.NaN;
	}break;
	case 109:{
		return Math.NEGATIVE_INFINITY;
	}break;
	case 112:{
		return Math.POSITIVE_INFINITY;
	}break;
	case 97:{
		var buf = this.buf;
		var a = new Array();
		this.cache.push(a);
		while(true) {
			var c = this.buf.cca(this.pos);
			if(c == 104) {
				this.pos++;
				break;
			}
			if(c == 117) {
				this.pos++;
				var n = this.readDigits();
				a[(a.length + n) - 1] = null;
			}
			else a.push(this.unserialize());
		}
		return a;
	}break;
	case 111:{
		var o = { }
		this.cache.push(o);
		this.unserializeObject(o);
		return o;
	}break;
	case 114:{
		var n = this.readDigits();
		if(n < 0 || n >= this.cache.length) throw "Invalid reference";
		return this.cache[n];
	}break;
	case 82:{
		var n = this.readDigits();
		if(n < 0 || n >= this.scache.length) throw "Invalid string reference";
		return this.scache[n];
	}break;
	case 120:{
		throw this.unserialize();
	}break;
	case 99:{
		var name = this.unserialize();
		var cl = this.resolver.resolveClass(name);
		if(cl == null) throw "Class not found " + name;
		var o = Type.createEmptyInstance(cl);
		this.cache.push(o);
		this.unserializeObject(o);
		return o;
	}break;
	case 119:{
		var name = this.unserialize();
		var edecl = this.resolver.resolveEnum(name);
		if(edecl == null) throw "Enum not found " + name;
		return this.unserializeEnum(edecl,this.unserialize());
	}break;
	case 106:{
		var name = this.unserialize();
		var edecl = this.resolver.resolveEnum(name);
		if(edecl == null) throw "Enum not found " + name;
		this.pos++;
		var index = this.readDigits();
		var tag = Type.getEnumConstructs(edecl)[index];
		if(tag == null) throw (("Unknown enum index " + name) + "@") + index;
		return this.unserializeEnum(edecl,tag);
	}break;
	case 108:{
		var l = new List();
		this.cache.push(l);
		var buf = this.buf;
		while(this.buf.cca(this.pos) != 104) l.add(this.unserialize());
		this.pos++;
		return l;
	}break;
	case 98:{
		var h = new Hash();
		this.cache.push(h);
		var buf = this.buf;
		while(this.buf.cca(this.pos) != 104) {
			var s = this.unserialize();
			h.set(s,this.unserialize());
		}
		this.pos++;
		return h;
	}break;
	case 113:{
		var h = new IntHash();
		this.cache.push(h);
		var buf = this.buf;
		var c = this.buf.cca(this.pos++);
		while(c == 58) {
			var i = this.readDigits();
			h.set(i,this.unserialize());
			c = this.buf.cca(this.pos++);
		}
		if(c != 104) throw "Invalid IntHash format";
		return h;
	}break;
	case 118:{
		var d = Date.fromString(this.buf.substr(this.pos,19));
		this.cache.push(d);
		this.pos += 19;
		return d;
	}break;
	case 115:{
		var len = this.readDigits();
		var buf = this.buf;
		if(this.buf.cca(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid bytes length";
		var codes = haxe.Unserializer.CODES;
		if(codes == null) {
			codes = haxe.Unserializer.initCodes();
			haxe.Unserializer.CODES = codes;
		}
		var i = this.pos;
		var rest = len & 3;
		var size = (len >> 2) * 3 + (((rest >= 2)?rest - 1:0));
		var max = i + (len - rest);
		var bytes = haxe.io.Bytes.alloc(size);
		var bpos = 0;
		while(i < max) {
			var c1 = codes[buf.cca(i++)];
			var c2 = codes[buf.cca(i++)];
			bytes.b[bpos++] = (((c1 << 2) | (c2 >> 4)) & 255);
			var c3 = codes[buf.cca(i++)];
			bytes.b[bpos++] = (((c2 << 4) | (c3 >> 2)) & 255);
			var c4 = codes[buf.cca(i++)];
			bytes.b[bpos++] = (((c3 << 6) | c4) & 255);
		}
		if(rest >= 2) {
			var c1 = codes[buf.cca(i++)];
			var c2 = codes[buf.cca(i++)];
			bytes.b[bpos++] = (((c1 << 2) | (c2 >> 4)) & 255);
			if(rest == 3) {
				var c3 = codes[buf.cca(i++)];
				bytes.b[bpos++] = (((c2 << 4) | (c3 >> 2)) & 255);
			}
		}
		this.pos += len;
		this.cache.push(bytes);
		return bytes;
	}break;
	case 67:{
		var name = this.unserialize();
		var cl = this.resolver.resolveClass(name);
		if(cl == null) throw "Class not found " + name;
		var o = Type.createEmptyInstance(cl);
		this.cache.push(o);
		o.hxUnserialize(this);
		if(this.buf.cca(this.pos++) != 103) throw "Invalid custom data";
		return o;
	}break;
	default:{
		null;
	}break;
	}
	this.pos--;
	throw ((("Invalid char " + this.buf.charAt(this.pos)) + " at position ") + this.pos);
}
haxe.Unserializer.prototype.unserializeEnum = function(edecl,tag) {
	var constr = Reflect.field(edecl,tag);
	if(constr == null) throw (("Unknown enum tag " + Type.getEnumName(edecl)) + ".") + tag;
	if(this.buf.cca(this.pos++) != 58) throw "Invalid enum format";
	var nargs = this.readDigits();
	if(nargs == 0) {
		this.cache.push(constr);
		return constr;
	}
	var args = new Array();
	while(nargs > 0) {
		args.push(this.unserialize());
		nargs -= 1;
	}
	var e = constr.apply(edecl,args);
	this.cache.push(e);
	return e;
}
haxe.Unserializer.prototype.unserializeObject = function(o) {
	while(true) {
		if(this.pos >= this.length) throw "Invalid object";
		if(this.buf.cca(this.pos) == 103) break;
		var k = this.unserialize();
		if(!Std["is"](k,String)) throw "Invalid object key";
		var v = this.unserialize();
		o[k] = v;
	}
	this.pos++;
}
haxe.Unserializer.prototype.__class__ = haxe.Unserializer;
haxe.remoting.Context = function(p) { if( p === $_ ) return; {
	this.objects = new Hash();
}}
haxe.remoting.Context.__name__ = ["haxe","remoting","Context"];
haxe.remoting.Context.share = function(name,obj) {
	var ctx = new haxe.remoting.Context();
	ctx.addObject(name,obj);
	return ctx;
}
haxe.remoting.Context.prototype.addObject = function(name,obj,recursive) {
	this.objects.set(name,{ obj : obj, rec : recursive});
}
haxe.remoting.Context.prototype.call = function(path,params) {
	if(path.length < 2) throw ("Invalid path '" + path.join(".")) + "'";
	var inf = this.objects.get(path[0]);
	if(inf == null) throw "No such object " + path[0];
	var o = inf.obj;
	var m = Reflect.field(o,path[1]);
	if(path.length > 2) {
		if(!inf.rec) throw "Can't access " + path.join(".");
		{
			var _g1 = 2, _g = path.length;
			while(_g1 < _g) {
				var i = _g1++;
				o = m;
				m = Reflect.field(o,path[i]);
			}
		}
	}
	if(!Reflect.isFunction(m)) throw "No such method " + path.join(".");
	return m.apply(o,params);
}
haxe.remoting.Context.prototype.objects = null;
haxe.remoting.Context.prototype.__class__ = haxe.remoting.Context;
if(typeof loader=='undefined') loader = {}
loader.LoaderApi = function() { }
loader.LoaderApi.__name__ = ["loader","LoaderApi"];
loader.LoaderApi.prototype.dataChanged = null;
loader.LoaderApi.prototype.displayVictory = null;
loader.LoaderApi.prototype.setColors = null;
loader.LoaderApi.prototype.__class__ = loader.LoaderApi;
Std = function() { }
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	if(x < 0) return Math.ceil(x);
	return Math.floor(x);
}
Std.parseInt = function(x) {
	var v = parseInt(x);
	if(Math.isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.random = function(x) {
	return Math.floor(Math.random() * x);
}
Std.prototype.__class__ = Std;
Lambda = function() { }
Lambda.__name__ = ["Lambda"];
Lambda.array = function(it) {
	var a = new Array();
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var i = $it0.next();
	a.push(i);
	}}
	return a;
}
Lambda.list = function(it) {
	var l = new List();
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var i = $it0.next();
	l.add(i);
	}}
	return l;
}
Lambda.map = function(it,f) {
	var l = new List();
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	l.add(f(x));
	}}
	return l;
}
Lambda.mapi = function(it,f) {
	var l = new List();
	var i = 0;
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	l.add(f(i++,x));
	}}
	return l;
}
Lambda.has = function(it,elt,cmp) {
	if(cmp == null) {
		{ var $it0 = it.iterator();
		while( $it0.hasNext() ) { var x = $it0.next();
		if(x == elt) return true;
		}}
	}
	else {
		{ var $it1 = it.iterator();
		while( $it1.hasNext() ) { var x = $it1.next();
		if(cmp(x,elt)) return true;
		}}
	}
	return false;
}
Lambda.exists = function(it,f) {
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	if(f(x)) return true;
	}}
	return false;
}
Lambda.foreach = function(it,f) {
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	if(!f(x)) return false;
	}}
	return true;
}
Lambda.iter = function(it,f) {
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	f(x);
	}}
}
Lambda.filter = function(it,f) {
	var l = new List();
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	if(f(x)) l.add(x);
	}}
	return l;
}
Lambda.fold = function(it,f,first) {
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	first = f(x,first);
	}}
	return first;
}
Lambda.count = function(it) {
	var n = 0;
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var _ = $it0.next();
	++n;
	}}
	return n;
}
Lambda.empty = function(it) {
	return !it.iterator().hasNext();
}
Lambda.prototype.__class__ = Lambda;
haxe.Serializer = function(p) { if( p === $_ ) return; {
	this.buf = new StringBuf();
	this.cache = new Array();
	this.useCache = haxe.Serializer.USE_CACHE;
	this.useEnumIndex = haxe.Serializer.USE_ENUM_INDEX;
	this.shash = new Hash();
	this.scount = 0;
}}
haxe.Serializer.__name__ = ["haxe","Serializer"];
haxe.Serializer.run = function(v) {
	var s = new haxe.Serializer();
	s.serialize(v);
	return s.toString();
}
haxe.Serializer.prototype.buf = null;
haxe.Serializer.prototype.cache = null;
haxe.Serializer.prototype.scount = null;
haxe.Serializer.prototype.serialize = function(v) {
	var $e = (Type["typeof"](v));
	switch( $e[1] ) {
	case 0:
	{
		this.buf.add("n");
	}break;
	case 1:
	{
		if(v == 0) {
			this.buf.add("z");
			return;
		}
		this.buf.add("i");
		this.buf.add(v);
	}break;
	case 2:
	{
		if(Math.isNaN(v)) this.buf.add("k");
		else if(!Math.isFinite(v)) this.buf.add((v < 0?"m":"p"));
		else {
			this.buf.add("d");
			this.buf.add(v);
		}
	}break;
	case 3:
	{
		this.buf.add((v?"t":"f"));
	}break;
	case 6:
	var c = $e[2];
	{
		if(c == String) {
			this.serializeString(v);
			return;
		}
		if(this.useCache && this.serializeRef(v)) return;
		switch(c) {
		case Array:{
			var ucount = 0;
			this.buf.add("a");
			var l = v["length"];
			{
				var _g = 0;
				while(_g < l) {
					var i = _g++;
					if(v[i] == null) ucount++;
					else {
						if(ucount > 0) {
							if(ucount == 1) this.buf.add("n");
							else {
								this.buf.add("u");
								this.buf.add(ucount);
							}
							ucount = 0;
						}
						this.serialize(v[i]);
					}
				}
			}
			if(ucount > 0) {
				if(ucount == 1) this.buf.add("n");
				else {
					this.buf.add("u");
					this.buf.add(ucount);
				}
			}
			this.buf.add("h");
		}break;
		case List:{
			this.buf.add("l");
			var v1 = v;
			{ var $it0 = v1.iterator();
			while( $it0.hasNext() ) { var i = $it0.next();
			this.serialize(i);
			}}
			this.buf.add("h");
		}break;
		case Date:{
			var d = v;
			this.buf.add("v");
			this.buf.add(d.toString());
		}break;
		case Hash:{
			this.buf.add("b");
			var v1 = v;
			{ var $it1 = v1.keys();
			while( $it1.hasNext() ) { var k = $it1.next();
			{
				this.serializeString(k);
				this.serialize(v1.get(k));
			}
			}}
			this.buf.add("h");
		}break;
		case IntHash:{
			this.buf.add("q");
			var v1 = v;
			{ var $it2 = v1.keys();
			while( $it2.hasNext() ) { var k = $it2.next();
			{
				this.buf.add(":");
				this.buf.add(k);
				this.serialize(v1.get(k));
			}
			}}
			this.buf.add("h");
		}break;
		case haxe.io.Bytes:{
			var v1 = v;
			var i = 0;
			var max = v1.length - 2;
			var chars = "";
			var b64 = haxe.Serializer.BASE64;
			while(i < max) {
				var b1 = v1.b[i++];
				var b2 = v1.b[i++];
				var b3 = v1.b[i++];
				chars += ((b64.charAt(b1 >> 2) + b64.charAt(((b1 << 4) | (b2 >> 4)) & 63)) + b64.charAt(((b2 << 2) | (b3 >> 6)) & 63)) + b64.charAt(b3 & 63);
			}
			if(i == max) {
				var b1 = v1.b[i++];
				var b2 = v1.b[i++];
				chars += (b64.charAt(b1 >> 2) + b64.charAt(((b1 << 4) | (b2 >> 4)) & 63)) + b64.charAt((b2 << 2) & 63);
			}
			else if(i == max + 1) {
				var b1 = v1.b[i++];
				chars += b64.charAt(b1 >> 2) + b64.charAt((b1 << 4) & 63);
			}
			this.buf.add("s");
			this.buf.add(chars.length);
			this.buf.add(":");
			this.buf.add(chars);
		}break;
		default:{
			this.cache.pop();
			if(v.hxSerialize != null) {
				this.buf.add("C");
				this.serializeString(Type.getClassName(c));
				this.cache.push(v);
				v.hxSerialize(this);
				this.buf.add("g");
			}
			else {
				this.buf.add("c");
				this.serializeString(Type.getClassName(c));
				this.cache.push(v);
				this.serializeFields(v);
			}
		}break;
		}
	}break;
	case 4:
	{
		if(this.useCache && this.serializeRef(v)) return;
		this.buf.add("o");
		this.serializeFields(v);
	}break;
	case 7:
	var e = $e[2];
	{
		if(this.useCache && this.serializeRef(v)) return;
		this.cache.pop();
		this.buf.add((this.useEnumIndex?"j":"w"));
		this.serializeString(Type.getEnumName(e));
		if(this.useEnumIndex) {
			this.buf.add(":");
			this.buf.add(v[1]);
		}
		else this.serializeString(v[0]);
		this.buf.add(":");
		var l = v["length"];
		this.buf.add(l - 2);
		{
			var _g = 2;
			while(_g < l) {
				var i = _g++;
				this.serialize(v[i]);
			}
		}
		this.cache.push(v);
	}break;
	case 5:
	{
		throw "Cannot serialize function";
	}break;
	default:{
		throw "Cannot serialize " + Std.string(v);
	}break;
	}
}
haxe.Serializer.prototype.serializeException = function(e) {
	this.buf.add("x");
	this.serialize(e);
}
haxe.Serializer.prototype.serializeFields = function(v) {
	{
		var _g = 0, _g1 = Reflect.fields(v);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			this.serializeString(f);
			this.serialize(Reflect.field(v,f));
		}
	}
	this.buf.add("g");
}
haxe.Serializer.prototype.serializeRef = function(v) {
	var vt = typeof(v);
	{
		var _g1 = 0, _g = this.cache.length;
		while(_g1 < _g) {
			var i = _g1++;
			var ci = this.cache[i];
			if(typeof(ci) == vt && ci == v) {
				this.buf.add("r");
				this.buf.add(i);
				return true;
			}
		}
	}
	this.cache.push(v);
	return false;
}
haxe.Serializer.prototype.serializeString = function(s) {
	var x = this.shash.get(s);
	if(x != null) {
		this.buf.add("R");
		this.buf.add(x);
		return;
	}
	this.shash.set(s,this.scount++);
	this.buf.add("y");
	s = StringTools.urlEncode(s);
	this.buf.add(s.length);
	this.buf.add(":");
	this.buf.add(s);
}
haxe.Serializer.prototype.shash = null;
haxe.Serializer.prototype.toString = function() {
	return this.buf.b.join("");
}
haxe.Serializer.prototype.useCache = null;
haxe.Serializer.prototype.useEnumIndex = null;
haxe.Serializer.prototype.__class__ = haxe.Serializer;
List = function(p) { if( p === $_ ) return; {
	this.length = 0;
}}
List.__name__ = ["List"];
List.prototype.add = function(item) {
	var x = [item];
	if(this.h == null) this.h = x;
	else this.q[1] = x;
	this.q = x;
	this.length++;
}
List.prototype.clear = function() {
	this.h = null;
	this.q = null;
	this.length = 0;
}
List.prototype.filter = function(f) {
	var l2 = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		if(f(v)) l2.add(v);
	}
	return l2;
}
List.prototype.first = function() {
	return (this.h == null?null:this.h[0]);
}
List.prototype.h = null;
List.prototype.isEmpty = function() {
	return (this.h == null);
}
List.prototype.iterator = function() {
	return { h : this.h, hasNext : function() {
		return (this.h != null);
	}, next : function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		return x;
	}}
}
List.prototype.join = function(sep) {
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	while(l != null) {
		if(first) first = false;
		else s.b[s.b.length] = sep;
		s.b[s.b.length] = l[0];
		l = l[1];
	}
	return s.b.join("");
}
List.prototype.last = function() {
	return (this.q == null?null:this.q[0]);
}
List.prototype.length = null;
List.prototype.map = function(f) {
	var b = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		b.add(f(v));
	}
	return b;
}
List.prototype.pop = function() {
	if(this.h == null) return null;
	var x = this.h[0];
	this.h = this.h[1];
	if(this.h == null) this.q = null;
	this.length--;
	return x;
}
List.prototype.push = function(item) {
	var x = [item,this.h];
	this.h = x;
	if(this.q == null) this.q = x;
	this.length++;
}
List.prototype.q = null;
List.prototype.remove = function(v) {
	var prev = null;
	var l = this.h;
	while(l != null) {
		if(l[0] == v) {
			if(prev == null) this.h = l[1];
			else prev[1] = l[1];
			if(this.q == l) this.q = prev;
			this.length--;
			return true;
		}
		prev = l;
		l = l[1];
	}
	return false;
}
List.prototype.toString = function() {
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	s.b[s.b.length] = "{";
	while(l != null) {
		if(first) first = false;
		else s.b[s.b.length] = ", ";
		s.b[s.b.length] = Std.string(l[0]);
		l = l[1];
	}
	s.b[s.b.length] = "}";
	return s.b.join("");
}
List.prototype.__class__ = List;
if(typeof mt=='undefined') mt = {}
if(!mt.js) mt.js = {}
mt.js.Tip = function() { }
mt.js.Tip.__name__ = ["mt","js","Tip"];
mt.js.Tip.lastRef = null;
mt.js.Tip.placeRef = null;
mt.js.Tip.initialized = null;
mt.js.Tip.tooltip = null;
mt.js.Tip.tooltipContent = null;
mt.js.Tip.mousePos = null;
mt.js.Tip.onHide = null;
mt.js.Tip.excludeList = null;
mt.js.Tip.show = function(refObj,contentHTML,cName,pRef) {
	mt.js.Tip.init();
	if(mt.js.Tip.tooltip == null) {
		mt.js.Tip.tooltip = js.Lib.document.getElementById(mt.js.Tip.tooltipId);
		if(mt.js.Tip.tooltip == null) {
			mt.js.Tip.tooltip = js.Lib.document.createElement("div");
			mt.js.Tip.tooltip.id = mt.js.Tip.tooltipId;
			js.Lib.document.body.insertBefore(mt.js.Tip.tooltip,js.Lib.document.body.firstChild);
		}
		mt.js.Tip.tooltip.style.top = "-1000px";
		mt.js.Tip.tooltip.style.position = "absolute";
		mt.js.Tip.tooltip.style.zIndex = 10;
	}
	if(mt.js.Tip.tooltipContent == null) {
		mt.js.Tip.tooltipContent = js.Lib.document.getElementById(mt.js.Tip.tooltipContentId);
		if(mt.js.Tip.tooltipContent == null) {
			mt.js.Tip.tooltipContent = js.Lib.document.createElement("div");
			mt.js.Tip.tooltipContent.id = mt.js.Tip.tooltipContentId;
			mt.js.Tip.tooltip.appendChild(mt.js.Tip.tooltipContent);
		}
	}
	if(pRef == null) pRef = false;
	mt.js.Tip.placeRef = pRef;
	if(cName == null) mt.js.Tip.tooltip.className = mt.js.Tip.defaultClass;
	else mt.js.Tip.tooltip.className = cName;
	if(mt.js.Tip.lastRef != null && mt.js.Tip.onHide != null) {
		mt.js.Tip.onHide();
		mt.js.Tip.onHide = null;
	}
	mt.js.Tip.lastRef = refObj;
	mt.js.Tip.tooltipContent.innerHTML = contentHTML;
	if(mt.js.Tip.placeRef) mt.js.Tip.placeTooltipRef();
	else mt.js.Tip.placeTooltip();
}
mt.js.Tip.exclude = function(id) {
	var e = js.Lib.document.getElementById(id);
	if(e == null) throw id + " not found";
	if(mt.js.Tip.excludeList == null) mt.js.Tip.excludeList = new List();
	mt.js.Tip.excludeList.add(e);
}
mt.js.Tip.placeTooltip = function() {
	if(mt.js.Tip.mousePos == null) return;
	var tts = mt.js.Tip.elementSize(mt.js.Tip.tooltip);
	var w = mt.js.Tip.windowSize();
	var top = 0;
	var left = 0;
	left = mt.js.Tip.mousePos.x + mt.js.Tip.xOffset;
	top = mt.js.Tip.mousePos.y + mt.js.Tip.yOffset;
	if(mt.js.Tip.excludeList != null) { var $it0 = mt.js.Tip.excludeList.iterator();
	while( $it0.hasNext() ) { var e = $it0.next();
	{
		var s = mt.js.Tip.elementSize(e);
		if(left > s.x + s.width || left + tts.width < s.x || top > s.y + s.height || top + tts.height < s.y) continue;
		var dx1 = left - (s.x + s.width);
		var dx2 = (left + tts.width) - s.x;
		var dx = ((Math.abs(dx1) > Math.abs(dx2))?dx2:dx1);
		var dy1 = top - (s.y + s.height);
		var dy2 = (top + tts.height) - s.y;
		var dy = ((Math.abs(dy1) > Math.abs(dy2))?dy2:dy1);
		var cx = (left + tts.width / 2) - mt.js.Tip.mousePos.x;
		var cy = (top + tts.height / 2) - mt.js.Tip.mousePos.y;
		if((cx - dx) * (cx - dx) + cy * cy > cx * cx + (cy - dy) * (cy - dy)) top -= dy;
		else left -= dx;
	}
	}}
	if(top + tts.height > (w.height - 2) + w.scrollTop) {
		if(mt.js.Tip.mousePos.y - tts.height > 5 + w.scrollTop) top = (mt.js.Tip.mousePos.y - tts.height) - 5;
		else top = ((w.height - 2) + w.scrollTop) - tts.height;
	}
	if(left + tts.width > (w.width - 22) + w.scrollLeft) {
		if(mt.js.Tip.mousePos.x - tts.width > 5 + w.scrollLeft) left = (mt.js.Tip.mousePos.x - tts.width) - 5;
		else left = ((w.width - 22) + w.scrollLeft) - tts.width;
	}
	if(top < 0) top = 0;
	if(left < 0) left = 0;
	mt.js.Tip.tooltip.style.left = left + "px";
	mt.js.Tip.tooltip.style.top = top + "px";
}
mt.js.Tip.placeTooltipRef = function() {
	var o = mt.js.Tip.elementSize(mt.js.Tip.lastRef);
	var tts = mt.js.Tip.elementSize(mt.js.Tip.tooltip);
	if(o.width <= 0) mt.js.Tip.tooltip.style.left = (o.x) + "px";
	else mt.js.Tip.tooltip.style.left = ((o.x - tts.width * 0.5) + o.width * 0.5) + "px";
	mt.js.Tip.tooltip.style.top = (o.y + Math.max(mt.js.Tip.minOffsetY,o.height)) + "px";
}
mt.js.Tip.showTip = function(refObj,title,contentBase) {
	contentBase = ("<p>" + contentBase) + "</p>";
	mt.js.Tip.show(refObj,(("<div class=\"title\">" + title) + "</div>") + contentBase);
}
mt.js.Tip.hide = function() {
	if(mt.js.Tip.lastRef == null) return;
	mt.js.Tip.lastRef = null;
	if(mt.js.Tip.onHide != null) {
		mt.js.Tip.onHide();
		mt.js.Tip.onHide = null;
	}
	mt.js.Tip.tooltip.style.top = "-1000px";
	mt.js.Tip.tooltip.style.width = "";
}
mt.js.Tip.clean = function() {
	if(mt.js.Tip.lastRef == null) return;
	if(mt.js.Tip.lastRef.parentNode == null) return mt.js.Tip.hide();
	if(mt.js.Tip.lastRef.id != null && mt.js.Tip.lastRef.id != "") {
		if(js.Lib.document.getElementById(mt.js.Tip.lastRef.id) != mt.js.Tip.lastRef) return mt.js.Tip.hide();
	}
	return;
}
mt.js.Tip.elementSize = function(o) {
	var ret = { x : 0, y : 0, width : o.clientWidth, height : o.clientHeight}
	var p = o;
	while(p != null) {
		if(p.offsetParent != null) {
			ret.x += p.offsetLeft - p.scrollLeft;
			ret.y += p.offsetTop - p.scrollTop;
		}
		else {
			ret.x += p.offsetLeft;
			ret.y += p.offsetTop;
		}
		p = p.offsetParent;
	}
	return ret;
}
mt.js.Tip.windowSize = function() {
	var ret = { x : 0, y : 0, width : js.Lib.window.innerWidth, height : js.Lib.window.innerHeight, scrollLeft : js.Lib.document.body.scrollLeft + js.Lib.document.documentElement.scrollLeft, scrollTop : js.Lib.document.body.scrollTop + js.Lib.document.documentElement.scrollTop}
	var body = (js.Lib.isIE?js.Lib.document.documentElement:js.Lib.document.body);
	if(ret.width == null) ret.width = body.clientWidth;
	if(ret.height == null) ret.height = body.clientHeight;
	return ret;
}
mt.js.Tip.onMouseMove = function(evt) {
	try {
		var posx = 0;
		var posy = 0;
		if(evt == null) evt = js.Lib.window.event;
		var e = evt;
		if(e.pageX || e.pageY) {
			posx = e.pageX;
			posy = e.pageY;
		}
		else if(e.clientX || e.clientY) {
			posx = (e.clientX + js.Lib.document.body.scrollLeft) + js.Lib.document.documentElement.scrollLeft;
			posy = (e.clientY + js.Lib.document.body.scrollTop) + js.Lib.document.documentElement.scrollTop;
		}
		mt.js.Tip.mousePos = { x : posx, y : posy}
		if(mt.js.Tip.lastRef != null && !mt.js.Tip.placeRef) mt.js.Tip.placeTooltip();
	}
	catch( $e0 ) {
		{
			var e = $e0;
			null;
		}
	}
}
mt.js.Tip.trackMenu = function(elt,onOut) {
	mt.js.Tip.init();
	var ftrack = null;
	var body = js.Lib.document.body;
	ftrack = function(evt) {
		if(mt.js.Tip.mousePos == null) return;
		var size = mt.js.Tip.elementSize(elt);
		if(mt.js.Tip.mousePos.x < size.x || mt.js.Tip.mousePos.y < size.y || mt.js.Tip.mousePos.x > size.x + size.width || mt.js.Tip.mousePos.y > size.y + size.height) {
			if(body.attachEvent) body.detachEvent("onmousemove",ftrack);
			else body.removeEventListener("mousemove",ftrack,false);
			onOut();
		}
	}
	if(body.attachEvent) body.attachEvent("onmousemove",ftrack);
	else body.addEventListener("mousemove",ftrack,false);
}
mt.js.Tip.init = function() {
	if(mt.js.Tip.initialized) return;
	if(document.body != null) {
		mt.js.Tip.initialized = true;
		document.body.onmousemove = $closure(mt.js.Tip,"onMouseMove");
	}
	else null;
}
mt.js.Tip.prototype.__class__ = mt.js.Tip;
haxe.Http = function(url) { if( url === $_ ) return; {
	this.url = url;
	this.headers = new Hash();
	this.params = new Hash();
	this.async = true;
}}
haxe.Http.__name__ = ["haxe","Http"];
haxe.Http.requestUrl = function(url) {
	var h = new haxe.Http(url);
	h.async = false;
	var r = null;
	h.onData = function(d) {
		r = d;
	}
	h.onError = function(e) {
		throw e;
	}
	h.request(false);
	return r;
}
haxe.Http.prototype.async = null;
haxe.Http.prototype.headers = null;
haxe.Http.prototype.onData = function(data) {
	null;
}
haxe.Http.prototype.onError = function(msg) {
	null;
}
haxe.Http.prototype.onStatus = function(status) {
	null;
}
haxe.Http.prototype.params = null;
haxe.Http.prototype.postData = null;
haxe.Http.prototype.request = function(post) {
	var me = this;
	var r = new js.XMLHttpRequest();
	var onreadystatechange = function() {
		if(r.readyState != 4) return;
		var s = (function($this) {
			var $r;
			try {
				$r = r.status;
			}
			catch( $e0 ) {
				{
					var e = $e0;
					$r = null;
				}
			}
			return $r;
		}(this));
		if(s == undefined) s = null;
		if(s != null) me.onStatus(s);
		if(s != null && s >= 200 && s < 400) me.onData(r.responseText);
		else switch(s) {
		case null:{
			me.onError("Failed to connect or resolve host");
		}break;
		case 12029:{
			me.onError("Failed to connect to host");
		}break;
		case 12007:{
			me.onError("Unknown host");
		}break;
		default:{
			me.onError("Http Error #" + r.status);
		}break;
		}
		if(s === null || s < 200 || s >= 400) return;
		// Le serveur de jeu n'existant pas dans le cadre de cette archive, toute partie non terminée est définitivement arrêtée dès qu'une autre page est chargée.
		// Le code ci-dessous cache donc l'élément "Une partie est en cours" et affiche à nouveau "Jouer au bar" lorsque cette situation se produit.
		// Sur cafejeux.com, se rendre sur une autre page du site (ou être déconnecté durant un temps cumulé de 60 secondes au maximum) ne provoquait pas l'arrêt de la partie.
		var menuBtnPlaying = document.getElementById("menuBtnPlaying");
		if(menuBtnPlaying !== null && menuBtnPlaying.className.indexOf("hidden") === -1) {
			var url = me.url.split("?")[0];
			if(
				url !== "game/play_generic" && url !== "partnerFrame" && url !== "user/dayChanged" && url !== "user/siteSound" && url !== "user/tipContact" &&
				url.indexOf("ctpl/") !== 0 && url.indexOf("smileyTip") !== 0 && url.replace(/[0-9]/g, "").indexOf("user//remContact") !== 0 && url.replace(/[0-9]/g, "").indexOf("user//tip") !== 0 &&
				r.responseText.indexOf("<load>user/dayChanged</load>") === -1
			) {
				js.App.setTitle();
				js.Utils.setClass("menuBtnPlaying", "hidden");
				js.Utils.setClass("menuBtnBar", "");
			}
		}
	}
	if(this.async) r.onreadystatechange = onreadystatechange;
	var uri = this.postData;
	if(uri != null) post = true;
	else { var $it1 = this.params.keys();
	while( $it1.hasNext() ) { var p = $it1.next();
	{
		if(uri == null) uri = "";
		else uri += "&";
		uri += (StringTools.urlDecode(p) + "=") + StringTools.urlEncode(this.params.get(p));
	}
	}}
	if(!this.async && window.fetchedCtpl.__total > 0) {
		// Fichiers préchargés pour éviter d'utiliser XMLHttpRequest de manière synchrone.
		var splitUrl = this.url.split("?")[0];
		var preloadedFile = window.fetchedCtpl[splitUrl];
		if(preloadedFile) {
			r = {};
			r.responseText = preloadedFile;
			r.readyState = 4;
			r.status = 200;
			onreadystatechange();
			return;
		}
	}
	try {
		if(post) r.open("POST",this.url,this.async);
		else if(uri != null) {
			var question = this.url.split("?").length <= 1;
			r.open("GET",(this.url + ((question?"?":"&"))) + uri,this.async);
			uri = null;
		}
		else r.open("GET",this.url,this.async);
	}
	catch( $e2 ) {
		{
			var e = $e2;
			{
				this.onError(e.toString());
				return;
			}
		}
	}
	if(this.headers.get("Content-Type") == null && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	{ var $it3 = this.headers.keys();
	while( $it3.hasNext() ) { var h = $it3.next();
	r.setRequestHeader(h,this.headers.get(h));
	}}
	r.send(uri);
	if(!this.async) onreadystatechange();
}
haxe.Http.prototype.setHeader = function(header,value) {
	this.headers.set(header,value);
}
haxe.Http.prototype.setParameter = function(param,value) {
	this.params.set(param,value);
}
haxe.Http.prototype.setPostData = function(data) {
	this.postData = data;
}
haxe.Http.prototype.url = null;
haxe.Http.prototype.__class__ = haxe.Http;
js.Lib = function() { }
js.Lib.__name__ = ["js","Lib"];
js.Lib.isIE = null;
js.Lib.isOpera = null;
js.Lib.document = null;
js.Lib.window = null;
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
}
js.Lib.eval = function(code) {
	return eval(code);
}
js.Lib.setErrorHandler = function(f) {
	js.Lib.onerror = f;
}
js.Lib.prototype.__class__ = js.Lib;
ValueType = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] }
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
js.Boot = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = (i != null?((i.fileName + ":") + i.lineNumber) + ": ":"");
	msg += js.Boot.__unhtml(js.Boot.__string_rec(v,"")) + "<br/>";
	var d = document.getElementById("haxe:trace");
	if(d == null) alert("No haxe:trace element defined\n" + msg);
	else d.innerHTML += msg;
}
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
	else null;
}
js.Boot.__closure = function(o,f) {
	var m = o[f];
	if(m == null) return null;
	var f1 = function() {
		return m.apply(o,arguments);
	}
	f1.scope = o;
	f1.method = m;
	return f1;
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ != null || o.__ename__ != null)) t = "object";
	switch(t) {
	case "object":{
		if(o instanceof Array) {
			if(o.__enum__ != null) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				{
					var _g1 = 2, _g = o.length;
					while(_g1 < _g) {
						var i = _g1++;
						if(i != 2) str += "," + js.Boot.__string_rec(o[i],s);
						else str += js.Boot.__string_rec(o[i],s);
					}
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			{
				var _g = 0;
				while(_g < l) {
					var i1 = _g++;
					str += ((i1 > 0?",":"")) + js.Boot.__string_rec(o[i1],s);
				}
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		}
		catch( $e0 ) {
			{
				var e = $e0;
				{
					return "???";
				}
			}
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = (o.hasOwnProperty != null);
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) continue;
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__") continue;
		if(str.length != 2) str += ", \n";
		str += ((s + k) + " : ") + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += ("\n" + s) + "}";
		return str;
	}break;
	case "function":{
		return "<function>";
	}break;
	case "string":{
		return o;
	}break;
	default:{
		return String(o);
	}break;
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	try {
		if(o instanceof cl) {
			if(cl == Array) return (o.__enum__ == null);
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				if(cl == null) return false;
			}
		}
	}
	switch(cl) {
	case Int:{
		return Math.ceil(o%2147483648.0) === o;
	}break;
	case Float:{
		return typeof(o) == "number";
	}break;
	case Bool:{
		return o === true || o === false;
	}break;
	case String:{
		return typeof(o) == "string";
	}break;
	case Dynamic:{
		return true;
	}break;
	default:{
		if(o == null) return false;
		return o.__enum__ == cl || (cl == Class && o.__name__ != null) || (cl == Enum && o.__ename__ != null);
	}break;
	}
}
js.Boot.__init = function() {
	// Les deux lignes suivantes ont été changées pour éviter de possibles faux positifs lors de la détection des anciennes versions de Internet Explorer (6 et 7) et Opera (avant sa transition vers Chromium).
	// Ceci est également appliqué aux propriétés "js.BackForward.isFirefox" et "js.BackForward.isSafari", plus haut dans ce fichier.
	js.Lib.isIE = false;
	js.Lib.isOpera = false;
	Array.prototype.copy = Array.prototype.slice;
	Array.prototype.insert = function(i,x) {
		this.splice(i,0,x);
	}
	Array.prototype.remove = (Array.prototype.indexOf?function(obj) {
		var idx = this.indexOf(obj);
		if(idx == -1) return false;
		this.splice(idx,1);
		return true;
	}:function(obj) {
		var i = 0;
		var l = this.length;
		while(i < l) {
			if(this[i] == obj) {
				this.splice(i,1);
				return true;
			}
			i++;
		}
		return false;
	});
	Array.prototype.iterator = function() {
		return { cur : 0, arr : this, hasNext : function() {
			return this.cur < this.arr.length;
		}, next : function() {
			return this.arr[this.cur++];
		}}
	}
	var cca = String.prototype.charCodeAt;
	String.prototype.cca = cca;
	String.prototype.charCodeAt = function(i) {
		var x = cca.call(this,i);
		if(isNaN(x)) return null;
		return x;
	}
	var oldsub = String.prototype.substr;
	String.prototype.substr = function(pos,len) {
		if(pos != null && pos != 0 && len != null && len < 0) return "";
		if(len == null) len = this.length;
		if(pos < 0) {
			pos = this.length + pos;
			if(pos < 0) pos = 0;
		}
		else if(len < 0) {
			len = (this.length + len) - pos;
		}
		return oldsub.apply(this,[pos,len]);
	}
	$closure = js.Boot.__closure;
}
js.Boot.prototype.__class__ = js.Boot;
if(!js._XmlHttp) js._XmlHttp = {}
js._XmlHttp.Room = { __ename__ : ["js","_XmlHttp","Room"], __constructs__ : ["Chat","Game","Play","Defy","Queue"] }
js._XmlHttp.Room.Chat = function(name) { var $x = ["Chat",0,name]; $x.__enum__ = js._XmlHttp.Room; $x.toString = $estr; return $x; }
js._XmlHttp.Room.Defy = ["Defy",3];
js._XmlHttp.Room.Defy.toString = $estr;
js._XmlHttp.Room.Defy.__enum__ = js._XmlHttp.Room;
js._XmlHttp.Room.Game = function(id) { var $x = ["Game",1,id]; $x.__enum__ = js._XmlHttp.Room; $x.toString = $estr; return $x; }
js._XmlHttp.Room.Play = function(room) { var $x = ["Play",2,room]; $x.__enum__ = js._XmlHttp.Room; $x.toString = $estr; return $x; }
js._XmlHttp.Room.Queue = ["Queue",4];
js._XmlHttp.Room.Queue.toString = $estr;
js._XmlHttp.Room.Queue.__enum__ = js._XmlHttp.Room;
js.XmlHttp = function() { }
js.XmlHttp.__name__ = ["js","XmlHttp"];
js.XmlHttp.get = function(url,obj) {
	if(js.XmlHttp.stop) return;
	if(url == null || url == "" || url == "undefined") throw "Bad url: " + url;
	if(js.XmlHttp.lock != null) {
		return;
	}
	if(new EReg("[?]","").match(url)) url += ";rand=" + Std.random(9999999);
	else url += "?rand=" + Std.random(9999999);
	var r = new haxe.Http(url);
	js.XmlHttp.onStart(r,obj);
	js.XmlHttp.urlForBack = url;
	r.setHeader("X-Handler","js.XmlHttp");
	r.onData = $closure(js.XmlHttp,"onData");
	r.onError = $closure(js.XmlHttp,"onError");
	r.request(false);
}
js.XmlHttp.tipCache = function(url,cache,obj) {
	if(js.XmlHttp.tip_cache_b.exists(cache)) {
		var c = js.XmlHttp.tip_cache_b.get(cache);
		mt.js.Tip.show(obj,c.content,c.className,c.placeRef);
	}
	else js.XmlHttp.get(url,obj);
}
js.XmlHttp.rmTipCache = function(cache) {
	js.XmlHttp.tip_cache_b.remove(cache);
}
js.XmlHttp.userTip = function(ref,id,special,name) {
	if(js.XmlHttp.tip_cache.exists(id + special)) {
		js.XmlHttp.displayUserTip(ref.id,js.XmlHttp.tip_cache.get(id + special));
	}
	else {
		if(name != null) mt.js.Tip.show(ref,("<div class='title'>" + name) + "</div><em>Veuillez patienter...</em>",null);
		else mt.js.Tip.show(ref,"<em>Veuillez patienter...</em>",null);
		js.XmlHttp.waitingUserTip = { id : ref.id}
		var t = js.XmlHttp.getDelayed((("user/" + id) + "/tip?") + special,500);
		ref.tipTimer = t;
	}
}
js.XmlHttp.hideUserTip = function(ref) {
	if(ref.tipTimer != null) ref.tipTimer.stop();
	else null;
	js.XmlHttp.waitingUserTip = null;
	mt.js.Tip.hide();
}
js.XmlHttp.getPrompt = function(url,prompt) {
	if(prompt == null) return;
	url += (url.indexOf("?") < 0?"?":";");
	url += "prompt=" + StringTools.urlEncode(prompt);
	js.XmlHttp.get(url);
}
js.XmlHttp.getDelayed = function(url,delay) {
	var o = new haxe.Timer(delay);
	o.run = function() {
		o.stop();
		js.XmlHttp.enqueue(url);
	}
	return o;
}
js.XmlHttp.post = function(url,form,vname) {
	if(js.XmlHttp.lock != null) {
		return;
	}
	var h = new Hash();
	var l = form.elements;
	var list = new List();
	{
		var _g1 = 0, _g = l.length;
		while(_g1 < _g) {
			var i = _g1++;
			var e = l[i];
			if(e.name == null || e.name == "") continue;
			if((e.type != "checkbox" && e.type != "radio") || e.checked) {
				if(e.name == vname) list.add(e.value);
				else h.set(e.name,e.value);
			}
			if(e.type == "submit") {
				e.disabled = true;
				js.XmlHttp.lockButton = e;
			}
		}
	}
	if(vname != null) h.set(vname,list.join("|"));
	return js.XmlHttp.postHash(url,h);
}
js.XmlHttp.postHash = function(url,h) {
	if(js.XmlHttp.lock != null) {
		return;
	}
	if(new EReg("[?]","").match(url)) url += ";rand=" + Std.random(9999999);
	else url += "?rand=" + Std.random(9999999);
	var r = new haxe.Http(url);
	js.XmlHttp.urlForBack = null;
	r.setHeader("X-Handler","js.XmlHttp");
	r.onData = $closure(js.XmlHttp,"onData");
	r.onError = $closure(js.XmlHttp,"onError");
	{ var $it0 = h.keys();
	while( $it0.hasNext() ) { var k = $it0.next();
	{
		r.setParameter(k,h.get(k));
	}
	}}
	js.XmlHttp.onStart(r,js.XmlHttp.lockButton);
	r.request(true);
}
js.XmlHttp.enqueue = function(url) {
	if(js.XmlHttp.lock != null) {
		js.XmlHttp.queue.add(url);
		return;
	}
	js.XmlHttp.get(url);
}
js.XmlHttp.isInChatRoom = function(r) {
	{ var $it0 = js.XmlHttp.divRoom.iterator();
	while( $it0.hasNext() ) { var e = $it0.next();
	{
		var $e = (e);
		switch( $e[1] ) {
		case 0:
		var s = $e[2];
		{
			if(r == s) return true;
		}break;
		default:{
			null;
		}break;
		}
	}
	}}
	return false;
}
js.XmlHttp.lastLinkLauncher = null;
js.XmlHttp.lastLinkLauncherCursor = null;
js.XmlHttp.waitingUserTip = null;
js.XmlHttp.onStart = function(r,ll) {
	if(js.XmlHttp.oldLock != null) {
		js.XmlHttp.oldLock.onData = function(v) {
			null;
		}
		js.XmlHttp.oldLock.onError = function(v) {
			null;
		}
		js.XmlHttp.oldLock = null;
	}
	js.XmlHttp.lock = r;
	js.XmlHttp.lockTimeOut = new haxe.Timer(10000);
	js.XmlHttp.lockTimeOut.run = function() {
		var me = js.XmlHttp;
		if(me.lockTimeOut != null) {
			me.lockTimeOut.stop();
			me.lockTimeOut = null;
		}
		me.oldLock = me.lock;
		me.lock = null;
	}
	js.Utils.addClass("globalContainer","httpLoading");
	js.Lib.document.body.style.cursor = "progress";
	if(ll != null) {
		if(js.XmlHttp.lastLinkLauncher != null) {
			js.XmlHttp.lastLinkLauncher.style.cursor = js.XmlHttp.lastLinkLauncherCursor;
		}
		js.XmlHttp.lastLinkLauncher = ll;
		js.XmlHttp.lastLinkLauncherCursor = ll.style.cursor;
		ll.style.cursor = "progress";
	}
}
js.XmlHttp.cleanLastLinkLauncher = function() {
	js.Lib.document.body.style.cursor = "default";
	if(js.XmlHttp.lastLinkLauncher != null) {
		js.XmlHttp.lastLinkLauncher.style.cursor = js.XmlHttp.lastLinkLauncherCursor;
		js.XmlHttp.lastLinkLauncher = null;
	}
}
js.XmlHttp.onEnd = function() {
	js.XmlHttp.cleanLastLinkLauncher();
	if(js.XmlHttp.lockTimeOut != null) {
		js.XmlHttp.lockTimeOut.stop();
		js.XmlHttp.lockTimeOut = null;
	}
	js.XmlHttp.lock = null;
	js.XmlHttp.oldLock = null;
	js.XmlHttp.urlForBack = null;
	js.App.updateTitle();
	js.Utils.removeClass("globalContainer","httpLoading");
	if(js.XmlHttp.queue.length > 0) {
		js.XmlHttp.get(js.XmlHttp.queue.pop());
		return;
	}
	if(js.XmlHttp.lockButton != null) {
		js.XmlHttp.lockButton.disabled = false;
	}
}
js.XmlHttp.onError = function(msg) {
	haxe.Log.trace((("Error[" + js.XmlHttp.urlForBack) + "]: ") + msg,{ fileName : "XmlHttp.hx", lineNumber : 248, className : "js.XmlHttp", methodName : "onError"});
	js.XmlHttp.onEnd();
}
js.XmlHttp.onData = function(data) {
	var url = js.XmlHttp.urlForBack;
	var x;
	try {
		x = Xml.parse(("<resp>" + data) + "</resp>").firstChild();
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				haxe.Log.trace(e,{ fileName : "XmlHttp.hx", lineNumber : 258, className : "js.XmlHttp", methodName : "onData"});
				return;
			}
		}
	}
	var backOk = false;
	var noBack = false;
	var fillMain = false;
	var scroll = false;
	var addToCache = null;
	try {
		{ var $it1 = x.elements();
		while( $it1.hasNext() ) { var n = $it1.next();
		{
			if((n.getNodeName() == "fill" || n.getNodeName() == "add") && n.exists("id")) {
				var id = n.get("id");
				if(id == "main" && n.getNodeName() == "fill") fillMain = true;
				if(n.getNodeName() == "fill" && (id == "main" || id == "groupMain" || id == "shopMain")) {
					scroll = true;
					mt.js.Tip.hide();
				}
				if(n.exists("refresh")) {
					var urlRefresh = url;
					if(urlRefresh != null) {
						var r = new EReg("(.*)[?;]rand=[0-9]+","");
						if(r.match(urlRefresh)) urlRefresh = r.matched(1);
						var refresh = Std.parseInt(n.get("refresh"));
						if(refresh != null && refresh > 5) haxe.Timer.delay(function(f,a1) {
							return function() {
								return f(a1);
							}
						}($closure(js.XmlHttp,"enqueue"),urlRefresh),refresh * 1000);
					}
				}
				var menuBtnCache = null;
				if(id == "menu") {
					var mc = js.Utils.byId("menuBtnContainer");
					if(mc != null) {
						menuBtnCache = mc.innerHTML;
					}
				}
				var d = js.Utils.byId(id);
				if(d != null) {
					var ignorePlay = false;
					if(js.XmlHttp.divRoom.exists(id)) {
						if(n.exists("play") && Type.enumEq(js.XmlHttp.divRoom.get(id),js._XmlHttp.Room.Play(n.get("play")))) ignorePlay = true;
						else js.XmlHttp.hideRoom(id);
					}
					var s = "";
					{ var $it2 = n.iterator();
					while( $it2.hasNext() ) { var c = $it2.next();
					{
						if(c.nodeType == Xml.CData) s += c.getNodeValue();
						else s += c.toString();
					}
					}}
					if(n.exists("class")) {
						d.className = n.get("class");
					}
					if(n.getNodeName() == "add") {
						d.innerHTML += s;
					}
					else {
						d.innerHTML = s;
					}
					if(id == "menu" && menuBtnCache != null) {
						var mc = js.Utils.byId("menuBtnContainer");
						if(mc != null) {
							mc.innerHTML = menuBtnCache;
						}
					}
					if(n.exists("scrollDown")) {
						js.Utils.scrollDown(id);
					}
					if(n.exists("chat")) {
						js.XmlHttp.displayRoom(id,js._XmlHttp.Room.Chat(n.get("chat")));
					}
					if(n.exists("game")) {
						js.XmlHttp.displayRoom(id,js._XmlHttp.Room.Game(Std.parseInt(n.get("game"))));
					}
					if(n.exists("play")) {
						if(!ignorePlay) js.XmlHttp.displayRoom(id,js._XmlHttp.Room.Play(n.get("play")));
					}
					if(n.exists("queue")) {
						if(!js.XmlHttp.isInQueue()) js.XmlHttp.displayRoom(id,js._XmlHttp.Room.Queue);
					}
					if(n.exists("room")) {
						var r = n.get("room");
						switch(r) {
						case "defy":{
							js.XmlHttp.displayRoom(id,js._XmlHttp.Room.Defy);
						}break;
						default:{
							throw "Unknown room type";
						}break;
						}
					}
				}
				else {
					haxe.Log.trace("section not found",{ fileName : "XmlHttp.hx", lineNumber : 359, className : "js.XmlHttp", methodName : "onData"});
				}
			}
			else if(n.getNodeName() == "blacklist") {
				if(n.exists("set")) {
					js.App.c._setBlacklist(Lambda.array(Lambda.map(n.get("set").split(";"),$closure(Std,"parseInt"))));
				}
				else if(n.exists("remove")) {
					js.App.c._removeFromBlacklist(Std.parseInt(n.get("remove")));
				}
				else if(n.exists("add")) {
					js.App.c._addInBlacklist(Std.parseInt(n.get("add")));
				}
			}
			else if(n.getNodeName() == "back") {
				if(n.exists("clear")) {
					js.BackForward.clear();
				}
				else if(n.exists("ignore")) {
					noBack = true;
				}
				else {
					if(n.firstChild() != null && n.firstChild().getNodeValue() != null) {
						var u = n.firstChild().getNodeValue();
						if(u == "") js.BackForward.setBase(url);
						js.BackForward.add(u);
					}
					else if(url != null) {
						js.BackForward.add(url);
					}
					backOk = true;
				}
			}
			else if(n.getNodeName() == "tip") {
				var id = n.get("id");
				var s = "";
				{ var $it3 = n.iterator();
				while( $it3.hasNext() ) { var c = $it3.next();
				{
					if(c.nodeType == Xml.CData) s += c.getNodeValue();
					else s += c.toString();
				}
				}}
				var uid = n.get("uid");
				if(uid != null) {
					if(js.XmlHttp.waitingUserTip != null) {
						// La variable "addToCache" a été déplacée en fin de bloc, de sorte que si une exception se produit dans "displayUserTip" (ce qui peut arriver lors d'un changement rapide de page),
						// le bloc d'informations sur cet utilisateur n'affiche pas le texte "Veuillez patienter..." indéfiniment du fait de sa mise en cache.
						// De plus, la mise en cache est désactivée pour l'ID 999999, comme l'avatar de cet utilisateur est systématiquement différent dans le cadre de l'archive.
						js.XmlHttp.displayUserTip(js.XmlHttp.waitingUserTip.id,s);
						if(uid !== "999999") addToCache = uid;
					}
				}
				else {
					var refObj = js.Utils.byId(id);
					if(refObj == null) throw "No object with id: " + id;
					if(n.exists("cache")) {
						js.XmlHttp.tip_cache_b.set(n.get("cache"),{ content : s, className : n.get("class"), placeRef : n.exists("placeRef")});
					}
					mt.js.Tip.show(refObj,s,n.get("class"),n.exists("placeRef"));
				}
			}
			else if(n.getNodeName() == "menu") {
				var menuId = n.get("id");
				var selectedId = n.get("selected");
				var className = (n.exists("class")?n.get("class"):"selected");
				js.Utils.menuSelect(menuId,selectedId,className);
			}
			else if(n.getNodeName() == "style") {
				var id = n.get("id");
				if(n.exists("add")) js.Utils.addClass(id,n.get("add"));
				else if(n.exists("rm")) js.Utils.removeClass(id,n.get("rm"));
				else if(n.exists("class")) js.Utils.setClass(id,n.get("class"));
			}
			else if(n.getNodeName() == "input") {
				var e = js.Utils.byId(n.get("id"));
				var c = n.firstChild();
				if(c != null) e.value = c.getNodeValue();
				else e.value = "";
			}
			else if(n.getNodeName() == "scrolltop") {
				scroll = true;
			}
			else if(n.getNodeName() == "user") {
				if(n.exists("money") && n.exists("freeMoney")) {
					var money = Std.parseInt(n.get("money"));
					var freeMoney = Std.parseInt(n.get("freeMoney"));
					js.App.updateMoney(money,freeMoney);
				}
				if(n.exists("prizeToken")) {
					var prizeToken = Std.parseInt(n.get("prizeToken"));
					js.App.updatePrizeToken(prizeToken);
				}
			}
			else if(n.getNodeName() == "initcolors") {
				js.App.c._initChatColors(n.get("l"),n.get("k"));
			}
			else if(n.getNodeName() == "sound") {
				js.App.c._activateSound(n.get("on") == "1");
			}
			else if(n.getNodeName() == "resumeparty") {
				if(js.App.c._hasParty()) {
					js.App.resumeParty();
					break;
				}
			}
			else if(n.getNodeName() == "load") {
				js.XmlHttp.enqueue(n.firstChild().getNodeValue());
			}
			else if(n.getNodeName() == "reboot") {
				js.App.reboot();
			}
			else if(n.getNodeName() == "alert") {
				if(n.firstChild() != null) {
					js.Lib.alert(n.firstChild().getNodeValue());
				}
				else if(n.exists("macro")) {
					var ctx = { }
					{ var $it4 = n.attributes();
					while( $it4.hasNext() ) { var e = $it4.next();
					{
						ctx[e] = n.get(e).split("&quot;").join("\"");
					}
					}}
					js.Lib.alert(js.App.c.applyTpl(n.get("macro"),ctx));
				}
			}
			else if(n.getNodeName() == "title") {
				js.App.setTitle(n.firstChild().getNodeValue());
			}
			else if(n.getNodeName() == "connect") {
				js.App.init(n.get("host"),Std.parseInt(n.get("port")),n.get("sid"));
			}
			else if(n.getNodeName() == "join") {
				var t = (n.get("type") == "party"?_ChatType._Party:_ChatType._Group);
				var props = { _type : t, _title : n.get("title"), _id : Std.parseInt(n.get("id")), _watch : n.get("watch") == "1", _stranger : n.get("stranger") == "1"}
				js.App.c._joinChatRoom(n.get("room"),props);
			}
			else if(n.getNodeName() == "confirm") {
				var txt = "";
				if(n.firstChild() != null) {
					txt = n.firstChild().getNodeValue();
				}
				else if(n.exists("macro")) {
					var ctx = { }
					{ var $it5 = n.attributes();
					while( $it5.hasNext() ) { var e = $it5.next();
					{
						ctx[e] = n.get(e).split("&quot;").join("\"");
					}
					}}
					txt = js.App.c.applyTpl(n.get("macro"),ctx);
				}
				var rs = js.Lib.window.confirm(txt);
				if(rs) {
					js.XmlHttp.enqueue(n.get("url"));
				}
			}
			else if(n.getNodeName() == "script") {
				var s = "";
				{ var $it6 = n.iterator();
				while( $it6.hasNext() ) { var c = $it6.next();
				{
					if(c.nodeType == Xml.CData) s += c.getNodeValue();
					else s += c.toString();
				}
				}}
				try {
					js.Lib.eval(s);
				}
				catch( $e7 ) {
					{
						var e = $e7;
						{
							haxe.Log.trace(Std.string(e),{ fileName : "XmlHttp.hx", lineNumber : 506, className : "js.XmlHttp", methodName : "onData"});
						}
					}
				}
			}
			else if(n.getNodeName() == "exception") {
				var s = "";
				{ var $it8 = n.elementsNamed("head");
				while( $it8.hasNext() ) { var h = $it8.next();
				{
					s += ("Exception: " + h.firstChild().getNodeValue()) + "\n";
				}
				}}
				{ var $it9 = n.elementsNamed("stack");
				while( $it9.hasNext() ) { var st = $it9.next();
				{
					{ var $it10 = st.elements();
					while( $it10.hasNext() ) { var e = $it10.next();
					{
						s += (function($this) {
							var $r;
							switch(e.getNodeName()) {
							case "cfunction":{
								$r = "cfunction";
							}break;
							case "module":{
								$r = "Module " + e.get("n");
							}break;
							case "file":{
								$r = (e.get("n") + ":") + e.get("l");
							}break;
							default:{
								$r = null;
							}break;
							}
							return $r;
						}(this));
						s += "\n";
					}
					}}
				}
				}}
				js.Utils.strace(s);
			}
			else {
				haxe.Log.trace("Ignore " + n,{ fileName : "XmlHttp.hx", lineNumber : 527, className : "js.XmlHttp", methodName : "onData"});
			}
		}
		}}
	}
	catch( $e11 ) {
		{
			var e = $e11;
			{
				haxe.Log.trace("Exception",{ fileName : "XmlHttp.hx", lineNumber : 531, className : "js.XmlHttp", methodName : "onData"});
				haxe.Log.trace(e,{ fileName : "XmlHttp.hx", lineNumber : 532, className : "js.XmlHttp", methodName : "onData"});
				haxe.Log.trace(e.message,{ fileName : "XmlHttp.hx", lineNumber : 533, className : "js.XmlHttp", methodName : "onData"});
			}
		}
	}
	js.XmlHttp.execJs();
	if(addToCache != null) {
		if(js.XmlHttp.waitingUserTip != null && mt.js.Tip.lastRef != null && js.XmlHttp.waitingUserTip.id == mt.js.Tip.lastRef.id) js.XmlHttp.tip_cache.set(addToCache,js.Utils.byId("tooltipContent").innerHTML);
		else js.XmlHttp.tip_cache.set(addToCache,js.Utils.byId("tooltipContent").innerHTML);
	}
	js.XmlHttp.checkDivRoom();
	mt.js.Tip.clean();
	var t = mt.js.Tip.lastRef;
	while(t != null) {
		t = t.parentNode;
		if(t == null || js.XmlHttp.lastLinkLauncher == null) break;
		if(t == js.XmlHttp.lastLinkLauncher) {
			mt.js.Tip.hide();
			break;
		}
	}
	haxe.Timer.delay($closure(mt.js.Tip,"clean"),1000);
	if(fillMain && !backOk && url != null && !noBack) {
		js.BackForward.add(url);
	}
	else if(!backOk) {
		js.BackForward.add(null);
	}
	if(scroll) js.Utils.scrollTop();
	js.XmlHttp.onEnd();
}
js.XmlHttp.displayUserTip = function(id,s) {
	var refObj = js.Utils.byId(id);
	if(refObj == null) throw "No object with id: " + id;
	if(refObj.parentNode == null) throw "Deleted object";
	mt.js.Tip.show(refObj,s,"userTip");
}
js.XmlHttp.displayRoom = function(id,room) {
	js.XmlHttp.divRoom.set(id,room);
	var $e = (room);
	switch( $e[1] ) {
	case 0:
	var n = $e[2];
	{
		js.App.c._displayChatRoom(n);
	}break;
	case 1:
	var n = $e[2];
	{
		js.App.c._playNow(n);
		js.App.currentGame = n;
	}break;
	case 2:
	var r = $e[2];
	{
		js.App.c._displayGame(r);
		js.App.c._displayChatRoom(r);
		js.XmlHttp.divRoom.remove("waitBar");
		js.App.currentGame = null;
	}break;
	case 3:
	{
		js.App.c._defyDisplayed(true);
	}break;
	case 4:
	{
		js.App.c._joinQueue();
	}break;
	}
}
js.XmlHttp.hideRoom = function(id) {
	var room = js.XmlHttp.divRoom.get(id);
	js.XmlHttp.divRoom.remove(id);
	var $e = (room);
	switch( $e[1] ) {
	case 0:
	var n = $e[2];
	{
		js.App.c._hideChatRoom(n);
	}break;
	case 1:
	var n = $e[2];
	{
		js.App.c._cancelParty();
		js.App.currentGame = null;
		js.App.setTitle();
	}break;
	case 2:
	var r = $e[2];
	{
		js.App.c._hideChatRoom(r);
		js.App.c._hideGame();
	}break;
	case 3:
	{
		js.App.c._defyDisplayed(false);
	}break;
	case 4:
	{
		js.App.c._leaveQueue();
	}break;
	}
}
js.XmlHttp.checkDivRoom = function() {
	{ var $it0 = js.XmlHttp.divRoom.keys();
	while( $it0.hasNext() ) { var k = $it0.next();
	{
		var div = js.Utils.byId(k);
		if(div == null) {
			js.XmlHttp.hideRoom(k);
		}
	}
	}}
}
js.XmlHttp.isInQueue = function() {
	{ var $it0 = js.XmlHttp.divRoom.keys();
	while( $it0.hasNext() ) { var k = $it0.next();
	if(js.XmlHttp.divRoom.get(k) == js._XmlHttp.Room.Queue && js.Utils.byId(k) != null) return true;
	}}
	return false;
}
js.XmlHttp.execJs = function() {
	var i = 1;
	while(true) {
		var e = js.Utils.byId("jsid-" + i);
		if(e == null) break;
		e.setAttribute("id","");
		try {
			js.Lib.eval(e.innerHTML);
		}
		catch( $e0 ) {
			{
				var e1 = $e0;
				{
					haxe.Log.trace(Std.string(e1),{ fileName : "XmlHttp.hx", lineNumber : 629, className : "js.XmlHttp", methodName : "execJs"});
				}
			}
		}
		i++;
	}
}
js.XmlHttp.prototype.__class__ = js.XmlHttp;
IntHash = function(p) { if( p === $_ ) return; {
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	}
	else null;
}}
IntHash.__name__ = ["IntHash"];
IntHash.prototype.exists = function(key) {
	return this.h[key] != null;
}
IntHash.prototype.get = function(key) {
	return this.h[key];
}
IntHash.prototype.h = null;
IntHash.prototype.iterator = function() {
	return { ref : this.h, it : this.keys(), hasNext : function() {
		return this.it.hasNext();
	}, next : function() {
		var i = this.it.next();
		return this.ref[i];
	}}
}
IntHash.prototype.keys = function() {
	var a = new Array();
	
			for( x in this.h )
				a.push(x);
		;
	return a.iterator();
}
IntHash.prototype.remove = function(key) {
	if(this.h[key] == null) return false;
	delete(this.h[key]);
	return true;
}
IntHash.prototype.set = function(key,value) {
	this.h[key] = value;
}
IntHash.prototype.toString = function() {
	var s = new StringBuf();
	s.b[s.b.length] = "{";
	var it = this.keys();
	{ var $it0 = it;
	while( $it0.hasNext() ) { var i = $it0.next();
	{
		s.b[s.b.length] = i;
		s.b[s.b.length] = " => ";
		s.b[s.b.length] = Std.string(this.get(i));
		if(it.hasNext()) s.b[s.b.length] = ", ";
	}
	}}
	s.b[s.b.length] = "}";
	return s.b.join("");
}
IntHash.prototype.__class__ = IntHash;
js.FormHelper = function() { }
js.FormHelper.__name__ = ["js","FormHelper"];
js.FormHelper.pass = null;
js.FormHelper.initPass = function() {
	js.FormHelper.pass = new js.PassHelper();
}
js.FormHelper.prototype.__class__ = js.FormHelper;
js.PassHelper = function(p) { if( p === $_ ) return; {
	this.input = js.Lib.document.getElementById("pass");
	this.container = js.Lib.document.getElementById("passComplexityContainer");
	this.bar = js.Lib.document.getElementById("passComplexityBar");
	this.text = js.Lib.document.getElementById("passComplexityText");
	this.icon = js.Lib.document.getElementById("passComplexityIcon");
	this.input.onchange = $closure(this,"onchange");
	this.input.onkeyup = $closure(this,"onchange");
	this.onchange(null);
}}
js.PassHelper.__name__ = ["js","PassHelper"];
js.PassHelper.prototype.bar = null;
js.PassHelper.prototype.complexity = null;
js.PassHelper.prototype.container = null;
js.PassHelper.prototype.icon = null;
js.PassHelper.prototype.input = null;
js.PassHelper.prototype.last = null;
js.PassHelper.prototype.onchange = function(e) {
	if(this.input.value == this.last) return;
	this.last = this.input.value;
	this.updateComplexity(this.last);
	this.updateDisplay();
}
js.PassHelper.prototype.text = null;
js.PassHelper.prototype.updateComplexity = function(value) {
	this.complexity = 0;
	this.complexity += Std["int"](Math.min(value.length,11));
	var a = new Array();
	{
		var _g1 = 0, _g = value.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = value.charAt(i);
			var found = false;
			{
				var _g2 = 0;
				while(_g2 < a.length) {
					var ac = a[_g2];
					++_g2;
					if(ac == c) found = true;
				}
			}
			if(!found) {
				this.complexity += 1;
				a.push(c);
				if(new EReg("[^A-Z0-9]","i").match(c)) this.complexity += 1;
			}
		}
	}
	if(new EReg("^[a-z]+$","").match(value) || new EReg("^[A-Z]+$","").match(value) || new EReg("^[0-9]+$","").match(value)) {
		this.complexity -= 6;
		this.complexity = Math.min(8,this.complexity);
	}
	else if(new EReg("^[a-z0-9]+$","").match(value) || new EReg("^[A-Z0-9]+$","").match(value) || new EReg("^[A-Za-z]+$","").match(value)) {
		this.complexity -= 2;
		this.complexity = Math.min(14,this.complexity);
	}
	this.complexity = Math.max(this.complexity,Math.min(10,value.length) / 2);
}
js.PassHelper.prototype.updateDisplay = function() {
	var pct = Std["int"]((Math.min(this.complexity,16) * 100) / 16);
	this.bar.style.width = pct + "%";
	var picName = "";
	if(pct < 20) {
		this.container.className = "awful";
		this.text.innerHTML = "Affreuse";
		picName = "bad";
	}
	else if(pct < 70) {
		this.container.className = "bad";
		this.text.innerHTML = "Faible";
		picName = "medium";
	}
	else if(pct < 100) {
		this.container.className = "medium";
		this.text.innerHTML = "Correcte";
		picName = "good";
	}
	else {
		this.container.className = "good";
		this.text.innerHTML = "Excellente !";
		picName = "best";
	}
	this.icon.innerHTML = ("<img src='img/icons/small_pass_" + picName) + ".gif' alt=''/>";
}
js.PassHelper.prototype.__class__ = js.PassHelper;
js.Client = function(obj) { if( obj === $_ ) return; {
	var ctx = new haxe.remoting.Context();
	ctx.addObject("inst",this);
	Remoting_Client.apply(this,[haxe.remoting.ExternalConnection.flashConnect("cnx",obj,ctx).resolve("inst")]);
	js.Client.inst = this;
	this.headBarQueue = new Array();
	this.headBarLast = 0;
	js.Client.pingTimer = new haxe.Timer(1000);
	js.Client.pingTimer.run = $closure(this,"sendPing");
}}
js.Client.__name__ = ["js","Client"];
js.Client.__super__ = Remoting_Client;
for(var k in Remoting_Client.prototype ) js.Client.prototype[k] = Remoting_Client.prototype[k];
js.Client.inst = null;
js.Client.pingTimer = null;
js.Client.getTemplate = function(tpl) {
	try {
		var a = tpl.split("@");
		if(a.length != 2) throw "Bad template name : " + tpl;
		var tplModule = a[0];
		var macroName = a[1];
		if(!js.Client.tpl_cache.exists(tplModule)) {
			var x = (function($this) {
				var $r;
				try {
					$r = (function($this) {
						var $r;
						var s = haxe.Http.requestUrl((("ctpl/" + tplModule) + ".mtt?r=") + Std.random(99999));
						$r = Xml.parse(s).firstElement();
						return $r;
					}($this));
				}
				catch( $e0 ) {
					{
						var e = $e0;
						$r = (function($this) {
							var $r;
							throw (("Error getting " + tplModule) + ".mtt (http or xml parsing error): ") + Std.string(e);
							return $r;
						}($this));
					}
				}
				return $r;
			}(this));
			var h = new Hash();
			{ var $it1 = x.elementsNamed("macro");
			while( $it1.hasNext() ) { var e = $it1.next();
			{
				if(!e.exists("name")) continue;
				var s = "";
				{ var $it2 = e.iterator();
				while( $it2.hasNext() ) { var c = $it2.next();
				{
					if(c.nodeType == Xml.CData) {
						s += c.getNodeValue();
					}
					else {
						s += c.toString();
					}
				}
				}}
				var t = (function($this) {
					var $r;
					try {
						$r = new haxe.Template(s);
					}
					catch( $e3 ) {
						{
							var e1 = $e3;
							$r = (function($this) {
								var $r;
								haxe.Log.trace(e1,{ fileName : "Client.hx", lineNumber : 51, className : "js.Client", methodName : "getTemplate"});
								$r = (function($this) {
									var $r;
									throw (("Error parsing template of " + tplModule) + ".mtt : \n") + s;
									return $r;
								}($this));
								return $r;
							}($this));
						}
					}
					return $r;
				}(this));
				h.set(e.get("name"),t);
			}
			}}
			js.Client.tpl_cache.set(tplModule,h);
		}
		var r = js.Client.tpl_cache.get(tplModule).get(macroName);
		if(r == null) throw "Template not found : " + tpl;
		return r;
	}
	catch( $e4 ) {
		{
			var e = $e4;
			{
				haxe.Log.trace("getTemplate exception",{ fileName : "Client.hx", lineNumber : 64, className : "js.Client", methodName : "getTemplate"});
				haxe.Log.trace(e,{ fileName : "Client.hx", lineNumber : 65, className : "js.Client", methodName : "getTemplate"});
				throw "getTemplate";
			}
		}
	}
}
js.Client.prototype.add = function(id,tplName,ctx) {
	var div = js.Lib.document.getElementById(id);
	if(div == null) return;
	div.innerHTML += this.applyTpl(tplName,ctx);
}
js.Client.prototype.alert = function(msg) {
	js.Lib.alert(msg);
}
js.Client.prototype.announceVictory = function(v,kind) {
	js.App.setTitle();
	js.Utils.setClass("menuBtnBar","");
	js.Utils.setClass("menuBtnPlaying","hidden");
	this.headBar("game@announceVictory",{ _win : v, _kind : kind},15000);
}
js.Client.prototype.applyTpl = function(tplName,ctx) {
	if(tplName == null) return ctx;
	if(ctx == null) ctx = { }
	ctx.DATA = js.App.DATA;
	var tpl = js.Client.getTemplate(tplName);
	return tpl.execute(ctx,js.TemplateTools);
}
js.Client.prototype.connected = function(b) {
	// Le serveur de jeu n'existe pas/plus, mais on prétend que la connexion reste possible.
	var fakeConnection = Math.random() > 0.5;
	if(fakeConnection || this.__fakeConnection) {
		b = true;
		js.Client.prototype.connecting = function() {};
		js.Client.prototype.connected = function() {};
		if(this.__fakeConnection) delete this.__fakeConnection;
		// On enregistre ici le pseudo de l'utilisateur, cela servira à pallier l'absence du serveur de jeu dans certaines situations.
		var headBar = document.querySelector("#headBar");
		if(headBar && headBar.textContent.trim().indexOf("Bonjour") === 0) {
			this.__archiveUserName = headBar.querySelector("strong").textContent;
		}
	} else {
		b = false;
		this.__fakeConnection = true;
	}
	if(b) {
		haxe.Log.trace("Connected",{ fileName : "Client.hx", lineNumber : 207, className : "js.Client", methodName : "connected"});
		this.fill("cnxIcon","global@connected",null);
		js.App.leaveQueue(true);
		if(window.BroadcastChannel) {
			// On simule le cas où le serveur de jeu constate que plusieurs connexions ont lieu simultanément pour un même compte.
			// Ceci ne fonctionne ici que dans le cas où plusieurs fenêtres du site sont ouvertes dans le même navigateur.
			var bc = new BroadcastChannel("cj_checkMultipleLogin");
			var msg = "cj_sendToOtherWindows";
			bc.addEventListener("message", function(event) {
				if(event.data === msg) {
					js.App.c.fill("cnxIcon", "global@closed", null);
					var div = document.getElementById("multipleLoginWarning");
					div.innerHTML = js.App.c.applyTpl("global@multipleLoginWarning", null);
					div.className = "";
					var a = div.querySelector("a");
					a.__onclick = a.onclick;
					a.onclick = function() {
						this.__onclick();
						js.App.c.fill("cnxIcon", "global@connected", null);
						bc.postMessage(msg);
						return false;
					};
				}
			}, false);
			bc.postMessage(msg);
		}
	}
	else {
		haxe.Log.trace("Disconnected !",{ fileName : "Client.hx", lineNumber : 211, className : "js.Client", methodName : "connected"});
		this.fill("cnxIcon","global@closed",null);
		js.App.leaveQueue(true);
	}
}
js.Client.prototype.connecting = function(b) {
	if(b) {
		haxe.Log.trace("Connecting...",{ fileName : "Client.hx", lineNumber : 219, className : "js.Client", methodName : "connecting"});
		this.fill("cnxIcon","global@connecting",null);
	}
	else {
		haxe.Log.trace("Failed to connect",{ fileName : "Client.hx", lineNumber : 222, className : "js.Client", methodName : "connecting"});
		this.fill("cnxIcon","global@closed",null);
	}
}
js.Client.prototype.dataChanged = function(data) {
	var classes = ["game"];
	var playing = data._mode == _PartyMode._MPlay;
	if(!data._history) {
		if(data._mode != _PartyMode._MReplay) {
			this.fill("time1",null,this.formatTime(data._p1time));
			this.fill("time2",null,this.formatTime(data._p2time));
		}
		if(data._myturn) classes.push("p1turn");
		else classes.push("p2turn");
		if(!data._p1connected) classes.push("p1offline");
		if(!data._p2connected) classes.push("p2offline");
		if(playing) {
			if(data._p1time < 60) classes.push("p1timealert");
			if(data._p2time < 60) classes.push("p2timealert");
		}
	}
	else {
		classes.push("synchro");
	}
	if(!playing) classes.push("observer");
	this.setClass("globalGameContainer",classes.join(" "));
}
js.Client.prototype.displayVictory = function(v,kind) {
	js.App.setTitle();
	js.Utils.setClass("menuBtnBar","");
	js.Utils.setClass("menuBtnPlaying","hidden");
	if(v) this.setClass("globalGameContainer","game victory1");
	else this.setClass("globalGameContainer","game victory2");
}
js.Client.prototype.fill = function(id,tplName,ctx) {
	var div = js.Lib.document.getElementById(id);
	if(div == null) return;
	div.innerHTML = this.applyTpl(tplName,ctx);
}
js.Client.prototype.focus = function(id) {
	var div = js.Lib.document.getElementById(id);
	if(div == null) return;
	div.focus();
}
js.Client.prototype.formatTime = function(t) {
	var s = t % 60;
	var m = Math.floor(t / 60);
	return (StringTools.lpad(Std.string(m),"0",2) + ":") + StringTools.lpad(Std.string(s),"0",2);
}
js.Client.prototype.headBar = function(tplName,ctx,timeout) {
	this.headBarLast++;
	if(this.headBarLocked) {
		this.headBarQueue.push({ tplName : tplName, ctx : ctx, timeout : timeout, id : this.headBarLast});
	}
	else {
		this.fill("headBar",tplName,ctx);
		if(timeout > 0) {
			this.headBarLocked = true;
			haxe.Timer.delay($closure(this,"headBarNext"),timeout);
			haxe.Timer.delay(function(f,a1) {
				return function() {
					return f(a1);
				}
			}($closure(this,"headBarEmpty"),this.headBarLast),Std["int"](Math.max(timeout,10000)));
		}
	}
}
js.Client.prototype.headBarEmpty = function(id) {
	if(id == this.headBarLast || id == null) this.fill("headBar","global@barEmpty",null);
}
js.Client.prototype.headBarLast = null;
js.Client.prototype.headBarLocked = null;
js.Client.prototype.headBarNext = function() {
	if(this.headBarQueue.length == 0) {
		this.headBarLocked = false;
	}
	else {
		while(this.headBarQueue.length > 0) {
			var n = this.headBarQueue.shift();
			if(this.headBarQueue.length == 0 || n.timeout > 0) {
				this.fill("headBar",n.tplName,n.ctx);
				if(n.timeout > 0) {
					haxe.Timer.delay($closure(this,"headBarNext"),n.timeout);
					haxe.Timer.delay(function(f,a1) {
						return function() {
							return f(a1);
						}
					}($closure(this,"headBarEmpty"),n.id),Std["int"](Math.max(n.timeout,10000)));
				}
				else {
					this.headBarLocked = false;
				}
				break;
			}
		}
	}
}
js.Client.prototype.headBarQueue = null;
js.Client.prototype.hideRoomUserTip = function() {
	js.XmlHttp.hideUserTip(js.Lib.document.getElementById("rooms"));
}
js.Client.prototype.load = function(url) {
	js.XmlHttp.enqueue(url);
}
js.Client.prototype.menuSelect = function(menuId,selectedId) {
	js.Utils.menuSelect(menuId,selectedId,"selected");
}
js.Client.prototype.partyWaitTime = function(t) {
	this.updateWaitBar({ e : 0.0, t : Math.max(5.0,t)});
}
js.Client.prototype.pong = function() {
	js.Client.lastPong = Date.now().getTime();
}
js.Client.prototype.post = function(url,params) {
	js.XmlHttp.postHash(url,params);
}
js.Client.prototype.reboot = function() {
	js.App.reboot();
}
js.Client.prototype.roomEjected = function(r) {
	if(js.XmlHttp.isInChatRoom(r)) {
		this.alert(this.applyTpl("chat@ejected",null));
		js.XmlHttp.enqueue("group/my");
	}
}
js.Client.prototype.roomUserTip = function(uid,name,x,y) {
	js.XmlHttp.userTip(js.Lib.document.getElementById("rooms"),Std.string(uid),"",name);
}
js.Client.prototype.scrollDown = function(id) {
	js.Utils.scrollDown(id);
}
js.Client.prototype.sendPing = function() {
	var success = false;
	var ntry = 0;
	var errors = new List();
	var lastError = null;
	do {
		try {
			var t = Date.now().getTime();
			this._ping();
			if(t - js.Client.lastPong > 5000) throw "timeout";
			if(Date.now().getTime() - js.Client.lastPong > 5000) throw "delay";
			success = true;
		}
		catch( $e0 ) {
			{
				var e = $e0;
				{
					lastError = Std.string(e);
					errors.add(lastError);
				}
			}
		}
		ntry++;
	} while(!success && ntry < 3);
	if(!success || errors.length > 0) {
		var t = Math.round((Date.now().getTime() - js.Client.initTime) / 1000);
		var u = Std.string(js.Lib.window.location).split("#")[1];
		var r = new haxe.Http("log");
		r.setParameter("a","jsPingFailed");
		r.setParameter("d",((((((((success + " | ") + t) + " | ") + u) + " | ") + js.Lib.window.navigator.userAgent) + " | [") + errors.join(";")) + "]");
		r.request(true);
		if(!success) {
			js.Client.pingTimer.stop();
			this.alert(this.applyTpl("global@pingFailed",{ _t : t, _b : js.Utils.friendlyBrowser(), _e : lastError, _u : u}));
		}
	}
}
js.Client.prototype.setClass = function(id,className) {
	js.Utils.setClass(id,className);
}
js.Client.prototype.setColors = function(me,opp) {
	js.Utils.byId("p1color").style.backgroundColor = "#" + StringTools.hex(me,6);
	js.Utils.byId("p1color").style.display = "block";
	js.Utils.byId("p2color").style.backgroundColor = "#" + StringTools.hex(opp,6);
	js.Utils.byId("p2color").style.display = "block";
}
js.Client.prototype.setQueueInfos = function(inf) {
	js.Utils.setClass("queuePos","");
	this.fill("queuePos","game@queuePos",inf);
}
js.Client.prototype.trace = function(msg,pos) {
	haxe.Log.trace(msg,pos);
}
js.Client.prototype.updateMoney = function(m,freem) {
	js.App.updateMoney(m,freem);
}
js.Client.prototype.updatePrizeToken = function(t) {
	js.App.updatePrizeToken(t);
}
js.Client.prototype.updateWaitBar = function(a) {
	var bar = js.Utils.byId("waitBarFill");
	if(bar == null) return;
	var pct = Math.round((a.e * 100) / a.t) % 200;
	bar.style.width = pct + "px";
	var r = 50;
	a.e += r / 1000;
	haxe.Timer.delay(function(f,a1) {
		return function() {
			return f(a1);
		}
	}($closure(this,"updateWaitBar"),a),r);
}
js.Client.prototype.__class__ = js.Client;
js.Client.__interfaces__ = [loader.LoaderApi];
js.App = function() { }
js.App.__name__ = ["js","App"];
js.App.c = null;
js.App.userMoney = null;
js.App.userFreeMoney = null;
js.App.userPrizeToken = null;
js.App.DATA = null;
js.App.title = null;
js.App.baseTitle = null;
js.App.currentGame = null;
js.App.currentPvmsg = null;
js.App.unload = function() {
	return true;
}
js.App.watchParty = function(pid,isMaster) {
	if(js.XmlHttp.isInQueue()) {
		js.Lib.alert(js.App.c.applyTpl("global@isInQueue",null));
		return;
	}
	if(js.App.c._hasParty()) {
		js.Lib.alert(js.App.c.applyTpl("global@hasParty",null));
		return;
	}
	js.App.c._watchParty(pid,isMaster);
}
js.App.autoReconnect = function() {
	js.App.c._autoReconnect();
}
js.App.giveup = function() {
	js.App.c._giveup();
}
js.App.scrollDown = function(id) {
	js.App.c.scrollDown(id);
}
js.App.focus = function(id) {
	js.App.c.focus(id);
}
js.App.updateWatchChat = function(r,v) {
	js.App.c._updateWatchChat(r,v);
}
js.App.disconnect = function() {
	js.App.c._disconnect();
}
js.App.sendChatMessage = function(room,input) {
	// Fonction modifiée pour renvoyer un booléen si l'argument "room" est la chaîne "__archive".
	// Aucun message n'est alors envoyé, la valeur de retour indiquant seulement si les conditions sont réunies pour qu'il puisse l'être.
	// Les opérations affectant le champ de texte du formulaire restent effectuées.
	var fromArchive = room === "__archive";

	var ok = true;
	var now = Date.now().getTime();
	{
		var _g1 = 0, _g = js.App.sent.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(now - js.App.sent[i] < js.App.floodMinDur[i]) {
				ok = false;
			}
		}
	}
	var b = false;
	if(new EReg("(@|http|w\\s*w\\s*w|sex)","i").match(input.value)) b = true;
	if(new EReg("(\\.|point|dot)[\\s_-]*(c[\\s_-]*(o|\\*)[\\s_-]*m|n[\\s_-]*e[\\s_-]*t|f[\\s_-]*r)","i").match(input.value)) b = true;
	if(new EReg("([A-Za-z0-9!?_-])\\1\\1\\1","i").match(input.value)) b = true;
	if(fromArchive && input.value.trim().length === 0) b = true;
	if(b) {
		input.value = "";
		ok = false;
	}
	if(input.value.length > 0 && ok) {
		js.App.sent.push(now);
		if(js.App.sent.length > js.App.floodMinDur.length) js.App.sent.shift();
		if(!fromArchive) {
			js.App.c._sendChatMessage(room,input.value);
			input.value = "";
			return;
		}
		return true;
	}
	input.style.borderColor = "red";
	haxe.Timer.delay(function() {
		input.style.borderColor = "";
	},100);
	if(fromArchive) return false;
}
js.App.setChatColor = function(room,color) {
	js.App.c._setChatColor(room,color);
}
js.App.getChatColor = function(room) {
	try {
		return js.App.c._getChatColor(room);
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				return 0;
			}
		}
	}
}
js.App.chatTipEjectPublic = function(room,gid,o) {
	var l = js.App.c._chatUsers(room,true);
	mt.js.Tip.show(o,js.App.c.applyTpl("chat@ejectPublicTip",{ _list : l, _room : room, _gid : gid}),"contacts",true);
}
js.App.startChatReport = function(room) {
	js.App.c._startChatReport(room);
}
js.App.chatReport = function(room,uid) {
	js.App.c._chatReport(room,uid);
}
js.App.resumeParty = function() {
	js.App.c._resumeParty();
}
js.App.leaveQueue = function(dc) {
	if(dc != true) js.App.c._leaveQueue();
	js.App.c.fill("queue",null,"");
	js.App.c.setClass("queue","hidden");
	mt.js.Tip.clean();
}
js.App.chatTip = function(e,g) {
	var l = js.App.c._chatUsers(g);
	if(l.length === 0) {
		// On affiche le pseudo de l'utilisateur au survol du nom de l'une des tables de jeu dans le menu, comme cela serait le cas si le serveur de jeu existait toujours.
		var name = js.App.c.__archiveUserName;
		if(name) {
			l.push({_u: {_name: name}});
			if(g === "group_420" && window.location.hash === "#group/420?go=chat" && window.__archiveChatUsers && window.__archiveChatUsers.other) {
				// Sur la page du chat de la Table des Habitués, il y a prétendument un second utilisateur connecté.
				var other = {_u: {_name: "Nath0u"}};
				if(([name.toLowerCase(), "nath0u"].sort())[0] === name.toLowerCase()) {
					l.push(other);
				} else {
					l.unshift(other);
				}
			}
		}
	}
	mt.js.Tip.show(e,js.App.c.applyTpl("chat@tip",{ _list : l}));
}
js.App.splitValues = function(s) {
	var a = s.split(";");
	var c = { }
	var i = 0;
	{
		var _g = 0;
		while(_g < a.length) {
			var v = a[_g];
			++_g;
			c["v" + i] = v;
			i++;
		}
	}
	return c;
}
js.App.applyTpl = function(name,ctx) {
	return js.App.c.applyTpl(name,ctx);
}
js.App.headBarEmpty = function() {
	js.App.c.headBarEmpty(null);
}
js.App.updateMoney = function(money,freeMoney) {
	js.App.userMoney = money;
	js.App.userFreeMoney = freeMoney;
	js.Utils.byId("userMoney").innerHTML = Std.string(js.App.userMoney);
	js.Utils.byId("userFreeMoney").innerHTML = Std.string(js.App.userFreeMoney);
}
js.App.updatePrizeToken = function(prizeToken) {
	js.App.userPrizeToken = prizeToken;
	js.Utils.byId("userPrizeToken").innerHTML = Std.string(js.App.userPrizeToken);
}
js.App.hasMoney = function(n) {
	return n <= js.App.userMoney + js.App.userFreeMoney;
}
js.App.hasPrizeToken = function(n) {
	return n <= js.App.userPrizeToken;
}
js.App.init = function(host,port,sid) {
	js.App.c._connect(host,port,sid);
}
js.App.reboot = function() {
	js.Lib.window.location = Std.string(js.Lib.window.location).split("#")[0];
}
js.App.main = function(sid) {
	if(haxe.Firebug.detect()) haxe.Firebug.redirectTraces();
	js.App.baseTitle = js.Lib.document.title.split("#")[0];
	js.App.c = new js.Client("client");
	js.App.c._init(sid);
	js.Utils.init();
}
js.App.setTitle = function(s) {
	if(s != null && s.length > 0) js.App.title = s;
	else js.App.title = js.App.baseTitle;
	js.App.updateTitle();
}
js.App.updateTitle = function() {
	if(js.App.title != null && js.App.title.length > 0) js.Lib.document.title = js.App.title;
}
js.App.userHighlight = function(r,uid) {
	js.App.c._userHighlight(r,uid);
}
js.App.userUnHighlight = function(r,uid) {
	js.App.c._userUnHighlight(r,uid);
}
js.App.forumInsert = function(id,begin,end) {
	var area = js.Utils.byId(id);
	js.App.replaceSelection(area,begin,end);
	area.focus();
}
js.App.forumUrl = function(id,addr,text) {
	var url = js.Lib.window.prompt(addr,"http://");
	if(url == null || url.length == 0) return;
	var comment = js.Lib.window.prompt(text,url);
	if(comment == null || comment.length == 0 || comment == url) return js.App.forumInsert(id,"",("[lien]" + url) + "[/lien]");
	return js.App.forumInsert(id,"",((("[lien=" + url) + "]") + comment) + "[/lien]");
}
js.App.replaceSelection = function(input,begin,end) {
	if(input.setSelectionRange) {
		var selectionStart = input.selectionStart;
		var selectionEnd = input.selectionEnd;
		var replaceString = (begin + input.value.substring(selectionStart,selectionEnd)) + end;
		input.value = (input.value.substring(0,selectionStart) + replaceString) + input.value.substring(selectionEnd);
	}
	else if((js.Lib.document).selection) {
		var range = (js.Lib.document).selection.createRange();
		if(range.parentElement() == input) {
			var isCollapsed = range.text == "";
			var replaceString = (begin + range.text) + end;
			range.text = replaceString;
			if(!isCollapsed) {
				range.moveStart("character",-replaceString.length);
				range.select();
			}
		}
	}
}
js.App.pvmsgDelete = function(txt,url) {
	var form = js.Utils.byId("msgListForm");
	if(js.App.currentPvmsg != null) {
		var one = false;
		{
			var _g1 = 0, _g = form.elements.length;
			while(_g1 < _g) {
				var i = _g1++;
				var e = form.elements[i];
				if(e.name == "msgid" && e.checked) {
					one = true;
					break;
				}
			}
		}
		if(!one) {
			js.Utils.byId("msgcheck_" + js.App.currentPvmsg).checked = true;
		}
	}
	if(js.Lib.window.confirm(txt)) {
		js.XmlHttp.post(url,form,"msgid");
	}
}
js.App.prototype.__class__ = js.App;
$_ = {}
js.Boot.__res = {}
js.Boot.__init();
{
	Xml.Element = "element";
	Xml.PCData = "pcdata";
	Xml.CData = "cdata";
	Xml.Comment = "comment";
	Xml.DocType = "doctype";
	Xml.Prolog = "prolog";
	Xml.Document = "document";
}
{
	var d = Date;
	d.now = function() {
		return new Date();
	}
	d.fromTime = function(t) {
		var d1 = new Date();
		d1["setTime"](t);
		return d1;
	}
	d.fromString = function(s) {
		switch(s.length) {
		case 8:{
			var k = s.split(":");
			var d1 = new Date();
			d1["setTime"](0);
			d1["setUTCHours"](k[0]);
			d1["setUTCMinutes"](k[1]);
			d1["setUTCSeconds"](k[2]);
			return d1;
		}break;
		case 10:{
			var k = s.split("-");
			return new Date(k[0],k[1] - 1,k[2],0,0,0);
		}break;
		case 19:{
			var k = s.split(" ");
			var y = k[0].split("-");
			var t = k[1].split(":");
			return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
		}break;
		default:{
			throw "Invalid date format : " + s;
		}break;
		}
	}
	d.prototype["toString"] = function() {
		var date = this;
		var m = date.getMonth() + 1;
		var d1 = date.getDate();
		var h = date.getHours();
		var mi = date.getMinutes();
		var s = date.getSeconds();
		return (((((((((date.getFullYear() + "-") + ((m < 10?"0" + m:"" + m))) + "-") + ((d1 < 10?"0" + d1:"" + d1))) + " ") + ((h < 10?"0" + h:"" + h))) + ":") + ((mi < 10?"0" + mi:"" + mi))) + ":") + ((s < 10?"0" + s:"" + s));
	}
	d.prototype.__class__ = d;
	d.__name__ = ["Date"];
}
{
	String.prototype.__class__ = String;
	String.__name__ = ["String"];
	Array.prototype.__class__ = Array;
	Array.__name__ = ["Array"];
	Int = { __name__ : ["Int"]}
	Dynamic = { __name__ : ["Dynamic"]}
	Float = Number;
	Float.__name__ = ["Float"];
	Bool = { __ename__ : ["Bool"]}
	Class = { __name__ : ["Class"]}
	Enum = { }
	Void = { __ename__ : ["Void"]}
}
{
	Math.__name__ = ["Math"];
	Math.NaN = Number["NaN"];
	Math.NEGATIVE_INFINITY = Number["NEGATIVE_INFINITY"];
	Math.POSITIVE_INFINITY = Number["POSITIVE_INFINITY"];
	Math.isFinite = function(i) {
		return isFinite(i);
	}
	Math.isNaN = function(i) {
		return isNaN(i);
	}
}
{
	mt.js.Tip.init();
}
{
	js.Lib.document = document;
	js.Lib.window = window;
	onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if( f == null )
			return false;
		return f(msg,[url+":"+line]);
	}
}
{
	js["XMLHttpRequest"] = (window.XMLHttpRequest?XMLHttpRequest:(window.ActiveXObject?function() {
		try {
			return new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch( $e0 ) {
			{
				var e = $e0;
				{
					try {
						return new ActiveXObject("Microsoft.XMLHTTP");
					}
					catch( $e1 ) {
						{
							var e1 = $e1;
							{
								throw "Unable to create XMLHttpRequest object.";
							}
						}
					}
				}
			}
		}
	}:(function($this) {
		var $r;
		throw "Unable to create XMLHttpRequest object.";
		return $r;
	}(this))));
}
Xml.enode = new EReg("^<([a-zA-Z0-9:_-]+)","");
Xml.ecdata = new EReg("^<!\\[CDATA\\[","i");
Xml.edoctype = new EReg("^<!DOCTYPE ","i");
Xml.eend = new EReg("^</([a-zA-Z0-9:_-]+)>","");
Xml.epcdata = new EReg("^[^<]+","");
Xml.ecomment = new EReg("^<!--","");
Xml.eprolog = new EReg("^<\\?[^\\?]+\\?>","");
Xml.eattribute = new EReg("^\\s*([a-zA-Z0-9:_-]+)\\s*=\\s*([\"'])([^\\2]*?)\\2","");
Xml.eclose = new EReg("^[ \\r\\n\\t]*(>|(/>))","");
Xml.ecdata_end = new EReg("\\]\\]>","");
Xml.edoctype_elt = new EReg("[\\[|\\]>]","");
Xml.ecomment_end = new EReg("-->","");
js.BackForward.iframeInit = false;
js.BackForward.historyPos = 0;
js.Utils.REG_FF = new EReg("Firefox/([0-9.]+)","i");
js.Utils.REG_OP = new EReg("Opera ([0-9.]+)","i");
js.Utils.REG_IE = new EReg("MSIE ([0-9.]+)","i");
js.Utils.REG_SF = new EReg("Safari/([0-9.]+)","i");
haxe.remoting.ExternalConnection.connections = new Hash();
haxe.Template.splitter = new EReg("(::[A-Za-z0-9_ ()&|!+=/><*.\"-]+::|\\$\\$([A-Za-z0-9_-]+)\\()","");
haxe.Template.expr_splitter = new EReg("(\\(|\\)|[ \\r\\n\\t]*\"[^\"]*\"[ \\r\\n\\t]*|[!+=/><*.&|-]+)","");
haxe.Template.expr_trim = new EReg("^[ ]*([^ ]+)[ ]*$","");
haxe.Template.expr_int = new EReg("^[0-9]+$","");
haxe.Template.expr_float = new EReg("^([+-]?)(?=\\d|,\\d)\\d*(,\\d*)?([Ee]([+-]?\\d+))?$","");
haxe.Template.globals = { }
haxe.Timer.arr = new Array();
haxe.Unserializer.DEFAULT_RESOLVER = Type;
haxe.Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.Unserializer.CODES = null;
haxe.Serializer.USE_CACHE = false;
haxe.Serializer.USE_ENUM_INDEX = false;
haxe.Serializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
mt.js.Tip.xOffset = 3;
mt.js.Tip.yOffset = 22;
mt.js.Tip.defaultClass = "normalTip";
mt.js.Tip.tooltipId = "tooltip";
mt.js.Tip.tooltipContentId = "tooltipContent";
mt.js.Tip.minOffsetY = 23;
js.Lib.onerror = null;
js.XmlHttp.stop = false;
js.XmlHttp.lock = null;
js.XmlHttp.lockTimeOut = null;
js.XmlHttp.lockButton = null;
js.XmlHttp.queue = new List();
js.XmlHttp.divRoom = new Hash();
js.XmlHttp.urlForBack = null;
js.XmlHttp.tip_cache = new Hash();
js.XmlHttp.tip_cache_b = new Hash();
js.XmlHttp.oldLock = null;
js.Client.tpl_cache = new Hash();
js.Client.initTime = Date.now().getTime();
js.Client.lastPong = Date.now().getTime();
js.App.sent = new Array();
js.App.floodMinDur = [300,700,1200,1800];
