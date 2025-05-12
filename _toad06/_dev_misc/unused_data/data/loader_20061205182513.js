Remoting = {}
Remoting.Client = function(c) { if( c === $_ ) return; {
	this.__cnx = c;
}}
Remoting.Client.__name__ = ["Remoting","Client"];
Remoting.Client.prototype.__cnx = null;
Remoting.Client.prototype._autoReconnect = function(flag) {
	return this.__cnx.__resolve("_autoReconnect").call([flag]);
}
Remoting.Client.prototype._cancelParty = function(gid,pid) {
	return this.__cnx.__resolve("_cancelParty").call([gid,pid]);
}
Remoting.Client.prototype._connect = function(server,port) {
	return this.__cnx.__resolve("_connect").call([server,port]);
}
Remoting.Client.prototype._createParty = function(gid) {
	return this.__cnx.__resolve("_createParty").call([gid]);
}
Remoting.Client.prototype._defyDisplayed = function(b) {
	return this.__cnx.__resolve("_defyDisplayed").call([b]);
}
Remoting.Client.prototype._displayChatRoom = function(room) {
	return this.__cnx.__resolve("_displayChatRoom").call([room]);
}
Remoting.Client.prototype._displayGame = function() {
	return this.__cnx.__resolve("_displayGame").call([]);
}
Remoting.Client.prototype._filterPartyList = function(s) {
	return this.__cnx.__resolve("_filterPartyList").call([s]);
}
Remoting.Client.prototype._gameChatMessage = function(msg) {
	return this.__cnx.__resolve("_gameChatMessage").call([msg]);
}
Remoting.Client.prototype._giveup = function() {
	return this.__cnx.__resolve("_giveup").call([]);
}
Remoting.Client.prototype._hideChatRoom = function(room) {
	return this.__cnx.__resolve("_hideChatRoom").call([room]);
}
Remoting.Client.prototype._hideGame = function() {
	return this.__cnx.__resolve("_hideGame").call([]);
}
Remoting.Client.prototype._isPlaying = function() {
	return this.__cnx.__resolve("_isPlaying").call([]);
}
Remoting.Client.prototype._joinChatRoom = function(room,props) {
	return this.__cnx.__resolve("_joinChatRoom").call([room,props]);
}
Remoting.Client.prototype._joinFirstParty = function() {
	return this.__cnx.__resolve("_joinFirstParty").call([]);
}
Remoting.Client.prototype._joinGameRoom = function(gid) {
	return this.__cnx.__resolve("_joinGameRoom").call([gid]);
}
Remoting.Client.prototype._joinParty = function(gid,pid) {
	return this.__cnx.__resolve("_joinParty").call([gid,pid]);
}
Remoting.Client.prototype._leaveGameRoom = function(gid) {
	return this.__cnx.__resolve("_leaveGameRoom").call([gid]);
}
Remoting.Client.prototype._playNow = function(gid) {
	return this.__cnx.__resolve("_playNow").call([gid]);
}
Remoting.Client.prototype._quitParty = function() {
	return this.__cnx.__resolve("_quitParty").call([]);
}
Remoting.Client.prototype._resumeParty = function() {
	return this.__cnx.__resolve("_resumeParty").call([]);
}
Remoting.Client.prototype._sendChatMessage = function(room,val) {
	return this.__cnx.__resolve("_sendChatMessage").call([room,val]);
}
Remoting.Client.prototype._setSID = function(sid) {
	return this.__cnx.__resolve("_setSID").call([sid]);
}
Remoting.Client.prototype._updateWatchChat = function(room,v) {
	return this.__cnx.__resolve("_updateWatchChat").call([room,v]);
}
Remoting.Client.prototype._userHighlight = function(room,uid) {
	return this.__cnx.__resolve("_userHighlight").call([room,uid]);
}
Remoting.Client.prototype._userUnHighlight = function(room,uid) {
	return this.__cnx.__resolve("_userUnHighlight").call([room,uid]);
}
Remoting.Client.prototype._watchFirstParty = function() {
	return this.__cnx.__resolve("_watchFirstParty").call([]);
}
Remoting.Client.prototype._watchParty = function(pid,isMaster) {
	return this.__cnx.__resolve("_watchParty").call([pid,isMaster]);
}
Remoting.Client.prototype.onIdentified = function(id) {
	return this.__cnx.__resolve("onIdentified").call([id]);
}
Remoting.Client.prototype.__class__ = Remoting.Client;
EReg = function(r,opt) { if( r === $_ ) return; {
	this.r = new RegExp(r,opt);
}}
EReg.__name__ = ["EReg"];
EReg.prototype.match = function(s) {
	{
		this.r.m = this.r.exec(s);
		this.r.s = s;
		this.r.l = RegExp.leftContext;
		this.r.r = RegExp.rightContext;
		return (this.r.m != null);
	}
}
EReg.prototype.matched = function(n) {
	return (this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:function($this) {
		var $r;
		throw "EReg::matched";
		return $r;
	}(this));
}
EReg.prototype.matchedLeft = function() {
	{
		if(this.r.m == null) throw "EReg::matchedLeft";
		if(this.r.l == null) return this.r.s.substr(0,this.r.m.index);
		return this.r.l;
	}
}
EReg.prototype.matchedPos = function() {
	if(this.r.m == null) throw "EReg::matchedPos";
	return { len : this.r.m[0].length, pos : this.r.m.index}
}
EReg.prototype.matchedRight = function() {
	{
		if(this.r.m == null) throw "EReg::matchedRight";
		if(this.r.r == null) {
			var sz = this.r.m.index + this.r.m[0].length;
			return this.r.s.substr(sz,this.r.s.length - sz);
		}
		return this.r.r;
	}
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
js = {}
js.JsXml__ = function(p) { if( p === $_ ) return; {
	null;
}}
js.JsXml__.__name__ = ["js","JsXml__"];
js.JsXml__.parse = function(str) {
	var rules = [js.JsXml__.enode,js.JsXml__.epcdata,js.JsXml__.eend,js.JsXml__.ecdata,js.JsXml__.edoctype,js.JsXml__.ecomment,js.JsXml__.eprolog];
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
						while(js.JsXml__.eattribute.match(str)) {
							x.set(js.JsXml__.eattribute.matched(1),js.JsXml__.eattribute.matched(2));
							str = js.JsXml__.eattribute.matchedRight();
						}
						if(!js.JsXml__.eclose.match(str)) {
							i = nrules;
							throw "__break__";
						}
						if(js.JsXml__.eclose.matched(1) == ">") {
							stack.push(current);
							current = x;
						}
						str = js.JsXml__.eclose.matchedRight();
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
						if(r.matched(1) != current._nodeName || stack.isEmpty()) {
							i = nrules;
							throw "__break__";
						}
						current = stack.pop();
						str = r.matchedRight();
					}break;
					case 3:{
						str = r.matchedRight();
						if(!js.JsXml__.ecdata_end.match(str)) throw "End of CDATA section not found";
						var x = Xml.createCData(js.JsXml__.ecdata_end.matchedLeft());
						current.addChild(x);
						str = js.JsXml__.ecdata_end.matchedRight();
					}break;
					case 4:{
						var pos = 0;
						var count = 0;
						var old = str;
						try {
							while(true) {
								if(!js.JsXml__.edoctype_elt.match(str)) throw "End of DOCTYPE section not found";
								var p = js.JsXml__.edoctype_elt.matchedPos();
								pos += p.pos + p.len;
								str = js.JsXml__.edoctype_elt.matchedRight();
								switch(js.JsXml__.edoctype_elt.matched(0)) {
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
						var x = Xml.createDocType(old.substr(0,pos));
						current.addChild(x);
					}break;
					case 5:{
						if(!js.JsXml__.ecomment_end.match(str)) throw "Unclosed Comment";
						var p = js.JsXml__.ecomment_end.matchedPos();
						var x = Xml.createComment(str.substr(0,p.pos + p.len));
						current.addChild(x);
						str = js.JsXml__.ecomment_end.matchedRight();
					}break;
					case 6:{
						var x = Xml.createProlog(r.matched(0));
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
			if(str.length > 10) throw ("Xml parse error : Unexpected " + str.substr(0,10) + "...");
			else throw ("Xml parse error : Unexpected " + str);
		}
	}
	return current;
}
js.JsXml__.createElement = function(name) {
	var r = new js.JsXml__();
	r.nodeType = Xml.Element;
	r._children = new Array();
	r._attributes = new Hash();
	r.setNodeName(name);
	return r;
}
js.JsXml__.createPCData = function(data) {
	var r = new js.JsXml__();
	r.nodeType = Xml.PCData;
	r.setNodeValue(data);
	return r;
}
js.JsXml__.createCData = function(data) {
	var r = new js.JsXml__();
	r.nodeType = Xml.CData;
	r.setNodeValue(data);
	return r;
}
js.JsXml__.createComment = function(data) {
	var r = new js.JsXml__();
	r.nodeType = Xml.Comment;
	r.setNodeValue(data);
	return r;
}
js.JsXml__.createDocType = function(data) {
	var r = new js.JsXml__();
	r.nodeType = Xml.DocType;
	r.setNodeValue(data);
	return r;
}
js.JsXml__.createProlog = function(data) {
	var r = new js.JsXml__();
	r.nodeType = Xml.Prolog;
	r.setNodeValue(data);
	return r;
}
js.JsXml__.createDocument = function() {
	var r = new js.JsXml__();
	r.nodeType = Xml.Document;
	r._children = new Array();
	return r;
}
js.JsXml__.prototype._attributes = null;
js.JsXml__.prototype._children = null;
js.JsXml__.prototype._nodeName = null;
js.JsXml__.prototype._nodeValue = null;
js.JsXml__.prototype._parent = null;
js.JsXml__.prototype.addChild = function(x) {
	if(this._children == null) throw "bad nodetype";
	if(x._parent != null) x._parent._children.remove(x);
	x._parent = this;
	this._children.push(x);
}
js.JsXml__.prototype.attributes = function() {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._attributes.keys();
}
js.JsXml__.prototype.elements = function() {
	if(this._children == null) throw "bad nodetype";
	return { next : function() {
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
	}, hasNext : function() {
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			if(this.x[k].nodeType == Xml.Element) break;
			k += 1;
		}
		this.cur = k;
		return k < l;
	}, x : this._children, cur : 0}
}
js.JsXml__.prototype.elementsNamed = function(name) {
	if(this._children == null) throw "bad nodetype";
	return { next : function() {
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
	}, hasNext : function() {
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			var n = this.x[k];
			if(n.nodeType == Xml.Element && n._nodeName == name) break;
			k++;
		}
		this.cur = k;
		return k < l;
	}, x : this._children, cur : 0}
}
js.JsXml__.prototype.exists = function(att) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._attributes.exists(att);
}
js.JsXml__.prototype.firstChild = function() {
	if(this._children == null) throw "bad nodetype";
	return this._children[0];
}
js.JsXml__.prototype.firstElement = function() {
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
js.JsXml__.prototype.get = function(att) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._attributes.get(att);
}
js.JsXml__.prototype.getNodeName = function() {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._nodeName;
}
js.JsXml__.prototype.getNodeValue = function() {
	if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
	return this._nodeValue;
}
js.JsXml__.prototype.getParent = function() {
	return this._parent;
}
js.JsXml__.prototype.insertChild = function(x,pos) {
	if(this._children == null) throw "bad nodetype";
	if(x._parent != null) x._parent._children.remove(x);
	x._parent = this;
	this._children.insert(pos,x);
}
js.JsXml__.prototype.iterator = function() {
	if(this._children == null) throw "bad nodetype";
	return { next : function() {
		return this.x[this.cur++];
	}, hasNext : function() {
		return this.cur < this.x.length;
	}, x : this._children, cur : 0}
}
js.JsXml__.prototype.nodeName = null;
js.JsXml__.prototype.nodeType = null;
js.JsXml__.prototype.nodeValue = null;
js.JsXml__.prototype.parent = null;
js.JsXml__.prototype.remove = function(att) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	this._attributes.remove(att);
}
js.JsXml__.prototype.removeChild = function(x) {
	if(this._children == null) throw "bad nodetype";
	var b = this._children.remove(x);
	if(b) x._parent = null;
	return b;
}
js.JsXml__.prototype.set = function(att,value) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	this._attributes.set(att,value);
}
js.JsXml__.prototype.setNodeName = function(n) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._nodeName = n;
}
js.JsXml__.prototype.setNodeValue = function(v) {
	if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
	return this._nodeValue = v;
}
js.JsXml__.prototype.toString = function() {
	if(this.nodeType == Xml.PCData) return this._nodeValue;
	if(this.nodeType == Xml.CData) return "<![CDATA[" + this._nodeValue + "]]>";
	if(this.nodeType == Xml.Comment || this.nodeType == Xml.DocType || this.nodeType == Xml.Prolog) return this._nodeValue;
	var s = new StringBuf();
	if(this.nodeType == Xml.Element) {
		s.add("<");
		s.add(this._nodeName);
		{ var $it0 = this._attributes.keys();
		while( $it0.hasNext() ) { var k = $it0.next();
		{
			s.add(" ");
			s.add(k);
			s.add("=\"");
			s.add(this._attributes.get(k));
			s.add("\"");
		}
		}}
		if(this._children.length == 0) {
			s.add("/>");
			return s.toString();
		}
		s.add(">");
	}
	{ var $it1 = this.iterator();
	while( $it1.hasNext() ) { var x = $it1.next();
	s.add(x);
	}}
	if(this.nodeType == Xml.Element) {
		s.add("</");
		s.add(this._nodeName);
		s.add(">");
	}
	return s.toString();
}
js.JsXml__.prototype.__class__ = js.JsXml__;
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
	while(r < l && StringTools.isSpace(s,l - r - 1)) {
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
StringTools.baseEncode = function(s,base) {
	var len = base.length;
	var nbits = 1;
	while(len > 1 << nbits) nbits++;
	if(nbits > 8 || len != 1 << nbits) throw "baseEncode: base must be a power of two.";
	var size = Std["int"]((s.length * 8 + nbits - 1) / nbits);
	var out = new StringBuf();
	var buf = 0;
	var curbits = 0;
	var mask = ((1 << nbits) - 1);
	var pin = 0;
	while(size-- > 0) {
		while(curbits < nbits) {
			curbits += 8;
			buf <<= 8;
			var t = s.charCodeAt(pin++);
			if(t > 255) throw "baseEncode: bad chars";
			buf |= t;
		}
		curbits -= nbits;
		out.addChar(base.charCodeAt((buf >> curbits) & mask));
	}
	return out.toString();
}
StringTools.baseDecode = function(s,base) {
	var len = base.length;
	var nbits = 1;
	while(len > 1 << nbits) nbits++;
	if(nbits > 8 || len != 1 << nbits) throw "baseDecode: base must be a power of two.";
	var size = (s.length * 8 + nbits - 1) / nbits;
	var tbl = new Array();
	{
		var _g1 = 0, _g = 256;
		while(_g1 < _g) {
			var i = _g1;
			++_g1;
			tbl[i] = -1;
		}
	}
	{
		var _g1 = 0, _g = len;
		while(_g1 < _g) {
			var i = _g1;
			++_g1;
			tbl[base.charCodeAt(i)] = i;
		}
	}
	var size1 = (s.length * nbits) / 8;
	var out = new StringBuf();
	var buf = 0;
	var curbits = 0;
	var pin = 0;
	while(size1-- > 0) {
		while(curbits < 8) {
			curbits += nbits;
			buf <<= nbits;
			var i = tbl[s.charCodeAt(pin++)];
			if(i == -1) throw "baseDecode: bad chars";
			buf |= i;
		}
		curbits -= 8;
		out.addChar((buf >> curbits) & 255);
	}
	return out.toString();
}
StringTools.prototype.__class__ = StringTools;
Reflect = function() { }
Reflect.__name__ = ["Reflect"];
Reflect.empty = function() {
	return {}
}
Reflect.createInstance = function(cl,args) {
	if(args.length >= 6) throw "Too many arguments";
	return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
}
Reflect.hasField = function(o,field) {
	{
		if(o.hasOwnProperty != null) return o.hasOwnProperty(field);
		var arr = Reflect.fields(o);
		{ var $it2 = arr.iterator();
		while( $it2.hasNext() ) { var t = $it2.next();
		if(t == field) return true;
		}}
		return false;
	}
}
Reflect.field = function(o,field) {
	try {
		return o[field];
	}
	catch( $e3 ) {
		{
			var e = $e3;
			{
				return null;
			}
		}
	}
}
Reflect.setField = function(o,field,value) {
	o[field] = value;
}
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
}
Reflect.fields = function(o) {
	if(o == null) return new Array();
	{
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
			catch( $e4 ) {
				{
					var e = $e4;
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
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && f.__name__ == null;
}
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return (t == "string" || (t == "object" && !v.__enum__) || (t == "function" && v.__name__ != null));
}
Reflect.deleteField = function(o,f) {
	{
		if(!Reflect.hasField(o,f)) return false;
		delete(o[f]);
		return true;
	}
}
Reflect.copy = function(o) {
	var o2 = Reflect.empty();
	{ var $it5 = Reflect.fields(o).iterator();
	while( $it5.hasNext() ) { var f = $it5.next();
	Reflect.setField(o2,f,Reflect.field(o,f));
	}}
	return o2;
}
Reflect.prototype.__class__ = Reflect;
js.BackForward = function() { }
js.BackForward.__name__ = ["js","BackForward"];
js.BackForward.iframe = null;
js.BackForward.history = null;
js.BackForward.current = null;
js.BackForward.currentHash = null;
js.BackForward.isFirefox = null;
js.BackForward.init = function() {
	js.BackForward.isFirefox = new EReg("firefox","i").match(js.Lib.window.navigator.userAgent);
	js.BackForward.history = new List();
	js.BackForward.check();
	var t = new haxe.Timer(200);
	t.run = $closure(js.BackForward,"check");
	if(js.Lib.isIE) (haxe.Timer.delayed($closure(js.BackForward,"realInit"),200))();
}
js.BackForward.realInit = function() {
	js.BackForward.iframe = js.Lib.document.getElementById("HistoryFrame");
	js.BackForward.iframe.src = "/fake?back";
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
			js.BackForward.iframe.src = "/fake?ok";
		}
		else if(e[1] == "ok") {
			js.BackForward.iframeInit = true;
		}
	}
}
js.BackForward.check = function() {
	var h = Std.string(js.Lib.window.location).split("#")[1];
	if(h != js.BackForward.currentHash) {
		var t = StringTools.urlDecode(h);
		if(t != null && t.length > 3 && t != "null" && t != "undefined") {
			js.XmlHttp.enqueue(t);
		}
		if(h != null && h != "") js.BackForward.currentHash = h;
	}
}
js.BackForward.add = function(url) {
	var r = new EReg("(.*)[?;]rand=[0-9]+","");
	if(r.match(url)) url = r.matched(1);
	if(js.BackForward.current == url) return;
	if(js.BackForward.current != null && js.BackForward.current != "") js.BackForward.history.push(js.BackForward.current);
	js.BackForward.current = url;
	if(js.BackForward.current != null) {
		js.BackForward.currentHash = url;
		js.Lib.window.location = Std.string(js.Lib.window.location).split("#")[0] + "#" + js.BackForward.currentHash;
	}
}
js.BackForward.goBack = function() {
	if(js.BackForward.history.length > 0) {
		var url = js.BackForward.history.pop();
		js.XmlHttp.get(url);
		js.BackForward.current = null;
	}
}
js.BackForward.clear = function() {
	js.BackForward.history = new List();
	js.BackForward.current = null;
}
js.BackForward.prototype.__class__ = js.BackForward;
haxe = {}
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
js.Utils.strace = function(v) {
	if(!window.__firebug__) return haxe.Log.trace(v,{ methodName : "strace", className : "js.Utils", lineNumber : 31, fileName : "Utils.hx"});
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
js.Utils.scrollTop = function() {
	var s = null;
	{
		var doc = js.Lib.document;
		var win = js.Lib.window;
		s = win.scrollY;
		if(s == null && doc.documentElement != null) s = doc.documentElement.scrollTop;
		if(s == null) s = doc.body.scrollTop;
	}
	if(s > 200) js.Lib.window.scrollTo(0,60);
}
js.Utils.addClass = function(id,className) {
	var e = js.Lib.document.getElementById(id);
	if(e != null) {
		var cn = e.className.split(" ");
		cn.remove(className);
		cn.push(className);
		e.className = cn.join(" ");
	}
}
js.Utils.removeClass = function(id,className) {
	var e = js.Lib.document.getElementById(id);
	if(e != null) {
		var cn = e.className.split(" ");
		cn.remove(className);
		e.className = cn.join(" ");
	}
}
js.Utils.setClass = function(id,classes) {
	var e = js.Lib.document.getElementById(id);
	if(e != null) {
		e.className = classes;
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
			l.setAttribute("href",(r.match(t)?r.matched(1) + "?version=" + (Std.parseInt(r.matched(2)) + 1):t + "?version=2"));
			haxe.Log.trace(l.getAttribute("href"),{ methodName : "refreshCSS", className : "js.Utils", lineNumber : 107, fileName : "Utils.hx"});
		}
		i++;
	}
}
js.Utils.menuSelect = function(menuId,selectedId,className) {
	try {
		var menu = js.Utils.byId(menuId);
		var c = menu.firstChild;
		var d = c;
		while(d != null) {
			if(d.nodeType == 1) {
				if(d.nodeName == "TBODY") c = d.firstChild;
				break;
			}
			d = d.nextSibling;
		}
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
					haxe.Log.trace("no menuid",{ methodName : "menuSelect", className : "js.Utils", lineNumber : 138, fileName : "Utils.hx"});
				}
			}
			c = c.nextSibling;
		}
	}
	catch( $e6 ) {
		{
			var e = $e6;
			{
				haxe.Log.trace("Exception in menuSelect",{ methodName : "menuSelect", className : "js.Utils", lineNumber : 144, fileName : "Utils.hx"});
			}
		}
	}
}
js.Utils.prototype.__class__ = js.Utils;
_ChatMessage = { __ename__ : ["_ChatMessage"] }
_ChatMessage._Command = function(c) { var $x = ["_Command",c]; $x.__enum__ = _ChatMessage; return $x; }
_ChatMessage._Message = function(s) { var $x = ["_Message",s]; $x.__enum__ = _ChatMessage; return $x; }
_ChatCommand = { __ename__ : ["_ChatCommand"] }
_ChatCommand._Cry = ["_Cry"];
_ChatCommand._Cry.__enum__ = _ChatCommand;
_ChatCommand._Happy = ["_Happy"];
_ChatCommand._Happy.__enum__ = _ChatCommand;
_ChatCommand._Jump = ["_Jump"];
_ChatCommand._Jump.__enum__ = _ChatCommand;
_ChatCommand._Lol = ["_Lol"];
_ChatCommand._Lol.__enum__ = _ChatCommand;
_ChatCommand._Love = ["_Love"];
_ChatCommand._Love.__enum__ = _ChatCommand;
_ChatCommand._No = ["_No"];
_ChatCommand._No.__enum__ = _ChatCommand;
_ChatCommand._Out = ["_Out"];
_ChatCommand._Out.__enum__ = _ChatCommand;
_ChatCommand._Puke = ["_Puke"];
_ChatCommand._Puke.__enum__ = _ChatCommand;
_ChatCommand._Speech = ["_Speech"];
_ChatCommand._Speech.__enum__ = _ChatCommand;
_ChatCommand._Yes = ["_Yes"];
_ChatCommand._Yes.__enum__ = _ChatCommand;
_AdminMessage = { __ename__ : ["_AdminMessage"] }
_AdminMessage._Alert = function(s) { var $x = ["_Alert",s]; $x.__enum__ = _AdminMessage; return $x; }
_AdminMessage._DefyAccepted = function(name) { var $x = ["_DefyAccepted",name]; $x.__enum__ = _AdminMessage; return $x; }
_AdminMessage._DefyNew = function(name,game,cid,group) { var $x = ["_DefyNew",name,game,cid,group]; $x.__enum__ = _AdminMessage; return $x; }
_AdminMessage._DefyRefused = function(name,r) { var $x = ["_DefyRefused",name,r]; $x.__enum__ = _AdminMessage; return $x; }
_AdminMessage._Load = function(s) { var $x = ["_Load",s]; $x.__enum__ = _AdminMessage; return $x; }
_AdminMessage._NewMessage = function(f,n) { var $x = ["_NewMessage",f,n]; $x.__enum__ = _AdminMessage; return $x; }
LcConfig = function() { }
LcConfig.__name__ = ["LcConfig"];
LcConfig.prototype.__class__ = LcConfig;
StringBuf = function(p) { if( p === $_ ) return; {
	this.b = "";
}}
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype.add = function(x) {
	this.b += js.Boot.__string_rec(x,"");
}
StringBuf.prototype.addChar = function(c) {
	this.b += String.fromCharCode(c);
}
StringBuf.prototype.addSub = function(s,pos,len) {
	this.b += s.substr(pos,len);
}
StringBuf.prototype.b = null;
StringBuf.prototype.toString = function() {
	return this.b;
}
StringBuf.prototype.__class__ = StringBuf;
js.TemplateTools = function() { }
js.TemplateTools.__name__ = ["js","TemplateTools"];
js.TemplateTools.token = function(r,text) {
	return "<span class=\"tokens\" title=\"" + text + " sucre(s)\">" + text + "<img src=\"/img/icons/small_token.gif\" alt=\"sucre(s)\"/></span>";
}
js.TemplateTools.tip = function(r,text) {
	return "onmouseover=\"mt.js.Tip.show(this,'" + text.split("'").join("\\'") + "',null)\" onmouseout=\"mt.js.Tip.hide()\"";
}
js.TemplateTools.mtip = function(r,macro) {
	return "onmouseover=\"mt.js.Tip.show(this,js.App.applyTpl('" + macro + "',null),null)\" onmouseout=\"mt.js.Tip.hide()\"";
}
js.TemplateTools.click = function(r,url) {
	return "href=\"#\" onclick=\"js.XmlHttp.get('" + url + "',this); return false;\"";
}
js.TemplateTools.macro = function(r,name) {
	return js.App.applyTpl(name,null);
}
js.TemplateTools.prototype.__class__ = js.TemplateTools;
haxe._Template = {}
haxe._Template.TemplateExpr = { __ename__ : ["haxe","_Template","TemplateExpr"] }
haxe._Template.TemplateExpr.OpBlock = function(l) { var $x = ["OpBlock",l]; $x.__enum__ = haxe._Template.TemplateExpr; return $x; }
haxe._Template.TemplateExpr.OpExpr = function(expr) { var $x = ["OpExpr",expr]; $x.__enum__ = haxe._Template.TemplateExpr; return $x; }
haxe._Template.TemplateExpr.OpForeach = function(expr,loop) { var $x = ["OpForeach",expr,loop]; $x.__enum__ = haxe._Template.TemplateExpr; return $x; }
haxe._Template.TemplateExpr.OpIf = function(expr,eif,eelse) { var $x = ["OpIf",expr,eif,eelse]; $x.__enum__ = haxe._Template.TemplateExpr; return $x; }
haxe._Template.TemplateExpr.OpMacro = function(name,params) { var $x = ["OpMacro",name,params]; $x.__enum__ = haxe._Template.TemplateExpr; return $x; }
haxe._Template.TemplateExpr.OpStr = function(str) { var $x = ["OpStr",str]; $x.__enum__ = haxe._Template.TemplateExpr; return $x; }
haxe._Template.TemplateExpr.OpVar = function(v) { var $x = ["OpVar",v]; $x.__enum__ = haxe._Template.TemplateExpr; return $x; }
haxe.Template = function(str) { if( str === $_ ) return; {
	var tokens = this.parseTokens(str);
	this.expr = this.parseBlock(tokens);
	if(!tokens.isEmpty()) throw "Unexpected '" + tokens.first().s + "'";
}}
haxe.Template.__name__ = ["haxe","Template"];
haxe.Template.prototype.buf = null;
haxe.Template.prototype.context = null;
haxe.Template.prototype.execute = function(context,macros) {
	this.macros = macros;
	this.context = context;
	this.stack = new List();
	this.buf = new StringBuf();
	this.run(this.expr);
	return this.buf.toString();
}
haxe.Template.prototype.expr = null;
haxe.Template.prototype.macros = null;
haxe.Template.prototype.makeConst = function(v) {
	haxe.Template.expr_trim.match(v);
	v = haxe.Template.expr_trim.matched(1);
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
		return function($this) {
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
				$r = function($this) {
					var $r;
					throw "Unknown operation " + p1.p;
					return $r;
				}($this);
			}break;
			}
			return $r;
		}(this);
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
		{ var $it7 = t.l.iterator();
		while( $it7.hasNext() ) { var p1 = $it7.next();
		pe.add(this.parseBlock(this.parseTokens(p1)));
		}}
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
		if(p.pos != 0) l.add({ s : true, p : data.substr(0,p.pos)});
		l.add({ s : false, p : haxe.Template.expr_splitter.matched(0)});
		data = haxe.Template.expr_splitter.matchedRight();
	}
	if(data.length != 0) l.add({ s : true, p : data});
	var e;
	try {
		e = this.makeExpr(l);
		if(!l.isEmpty()) throw l.first().p;
	}
	catch( $e8 ) {
		if( js.Boot.__instanceof($e8,Int) ) {
			var s = $e8;
			{
				throw "Unexpected '" + s + "' in " + expr;
			}
		} else throw($e8);
	}
	return function() {
		try {
			return e();
		}
		catch( $e9 ) {
			{
				var exc = $e9;
				{
					throw "Error : " + Std.string(exc) + " in " + expr;
				}
			}
		}
	}
}
haxe.Template.prototype.parseTokens = function(data) {
	var tokens = new List();
	while(haxe.Template.splitter.match(data)) {
		var p = haxe.Template.splitter.matchedPos();
		if(p.pos > 0) tokens.add({ l : null, s : true, p : data.substr(0,p.pos)});
		if(data.charCodeAt(p.pos) == 58) {
			tokens.add({ l : null, s : false, p : data.substr(p.pos + 2,p.len - 4)});
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
		var params = data.substr(p.pos + p.len,parp - (p.pos + p.len) - 1).split(",");
		tokens.add({ l : params, s : false, p : haxe.Template.splitter.matched(2)});
		data = data.substr(parp,data.length - parp);
	}
	if(data.length > 0) tokens.add({ l : null, s : true, p : data});
	return tokens;
}
haxe.Template.prototype.resolve = function(v) {
	if(Reflect.hasField(this.context,v)) return Reflect.field(this.context,v);
	{ var $it10 = this.stack.iterator();
	while( $it10.hasNext() ) { var ctx = $it10.next();
	if(Reflect.hasField(ctx,v)) return Reflect.field(ctx,v);
	}}
	return Reflect.field(haxe.Template.globals,v);
}
haxe.Template.prototype.run = function(e) {
	var $e = (e);
	switch( $e[0] ) {
	case "OpVar":
	var v = $e[1];
	{
		this.buf.add(this.resolve(v));
	}break;
	case "OpExpr":
	var e1 = $e[1];
	{
		this.buf.add(e1());
	}break;
	case "OpIf":
	var eelse = $e[3], eif = $e[2], e1 = $e[1];
	{
		var v = e1();
		if(v == null || v == false) {
			if(eelse != null) this.run(eelse);
		}
		else this.run(eif);
	}break;
	case "OpStr":
	var str = $e[1];
	{
		this.buf.add(str);
	}break;
	case "OpBlock":
	var l = $e[1];
	{
		{ var $it11 = l.iterator();
		while( $it11.hasNext() ) { var e1 = $it11.next();
		this.run(e1);
		}}
	}break;
	case "OpForeach":
	var loop = $e[2], e1 = $e[1];
	{
		var v = e1();
		try {
			if(v.hasNext == null) {
				var x = v.iterator();
				if(x.hasNext == null) throw null;
				v = x;
			}
		}
		catch( $e12 ) {
			{
				var e2 = $e12;
				{
					throw "Cannot iter on " + v;
				}
			}
		}
		this.stack.push(this.context);
		{ var $it13 = v;
		while( $it13.hasNext() ) { var ctx = $it13.next();
		{
			this.context = ctx;
			this.run(loop);
		}
		}}
		this.context = this.stack.pop();
	}break;
	case "OpMacro":
	var params = $e[2], m = $e[1];
	{
		var v = Reflect.field(this.macros,m);
		var pl = new Array();
		var old = this.buf;
		pl.push($closure(this,"resolve"));
		{ var $it14 = params.iterator();
		while( $it14.hasNext() ) { var p = $it14.next();
		{
			var $e = (p);
			switch( $e[0] ) {
			case "OpVar":
			var v1 = $e[1];
			{
				pl.push(this.resolve(v1));
			}break;
			default:{
				this.buf = new StringBuf();
				this.run(p);
				pl.push(this.buf.toString());
			}break;
			}
		}
		}}
		this.buf = old;
		try {
			this.buf.add(Reflect.callMethod(null,v,pl));
		}
		catch( $e15 ) {
			{
				var e1 = $e15;
				{
					var msg = "Macro call " + m + " failed (" + Std.string(e1) + ")";
					throw msg;
				}
			}
		}
	}break;
	}
}
haxe.Template.prototype.stack = null;
haxe.Template.prototype.__class__ = haxe.Template;
haxe.Timer = function(time) { if( time === $_ ) return; {
	var id = haxe.Timer.arr.length;
	haxe.Timer.arr[id] = this;
	this.timerId = window.setInterval("haxe.Timer.arr[" + id + "].run();",time);
}}
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.delayed = function(f,time) {
	return function() {
		var t = new haxe.Timer(time);
		t.run = function() {
			t.stop();
			f();
		}
	}
}
haxe.Timer.delayedArg = function(f,time) {
	return function(arg) {
		var t = new haxe.Timer(time);
		t.run = function() {
			t.stop();
			f(arg);
		}
	}
}
haxe.Timer.stamp = function() {
	return Date.now().getTime() / 1000;
}
haxe.Timer.prototype.run = function() {
	null;
}
haxe.Timer.prototype.stop = function() {
	window.clearInterval(this.timerId);
}
haxe.Timer.prototype.timerId = null;
haxe.Timer.prototype.__class__ = haxe.Timer;
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
Type = function() { }
Type.__name__ = ["Type"];
Type.toEnum = function(t) {
	try {
		if(t.__ename__ == null) return null;
		return t;
	}
	catch( $e16 ) {
		{
			var e = $e16;
			{
				return null;
			}
		}
	}
}
Type.toClass = function(t) {
	try {
		if(t.__name__ == null) return null;
		return t;
	}
	catch( $e17 ) {
		{
			var e = $e17;
			{
				return null;
			}
		}
	}
}
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
	if(c == null) return null;
	var a = c.__name__;
	return a.join(".");
}
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
}
Type.resolveClass = function(name) {
	var cl;
	{
		try {
			cl = eval(name);
		}
		catch( $e18 ) {
			{
				var e = $e18;
				{
					cl = null;
				}
			}
		}
		if(cl == null || cl.__name__ == null) return null;
	}
	return cl;
}
Type.resolveEnum = function(name) {
	var e;
	{
		try {
			e = eval(name);
		}
		catch( $e19 ) {
			{
				var e1 = $e19;
				{
					e1 = null;
				}
			}
		}
		if(e == null || e.__ename__ == null) return null;
	}
	return e;
}
Type.createEmptyInstance = function(cl) {
	return new cl($_);
}
Type.getInstanceFields = function(c) {
	var a = Reflect.fields(c.prototype);
	c = c.__super__;
	while(c != null) {
		a = a.concat(Reflect.fields(c.prototype));
		c = c.__super__;
	}
	while(a.remove("__class__")) null;
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
	var a = Reflect.fields(e);
	a.remove("__ename__");
	return a;
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
		if(v + 1 == v) return ValueType.TFloat;
		if(Math.ceil(v) == v) return ValueType.TInt;
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
haxe.Unserializer.run = function(v) {
	return new haxe.Unserializer(v).unserialize();
}
haxe.Unserializer.prototype.buf = null;
haxe.Unserializer.prototype.cache = null;
haxe.Unserializer.prototype.length = null;
haxe.Unserializer.prototype.pos = null;
haxe.Unserializer.prototype.readDigits = function() {
	var k = 0;
	var s = false;
	var fpos = this.pos;
	while(true) {
		var c = this.buf.charCodeAt(this.pos);
		if(c == null) break;
		if(c == 45) {
			if(this.pos != fpos) break;
			s = true;
			this.pos++;
			continue;
		}
		c -= 48;
		if(c < 0 || c > 9) break;
		k = k * 10 + c;
		this.pos++;
	}
	if(s) k *= -1;
	return k;
}
haxe.Unserializer.prototype.resolver = null;
haxe.Unserializer.prototype.scache = null;
haxe.Unserializer.prototype.setResolver = function(r) {
	if(r == null) this.resolver = { resolveEnum : function(_) {
		return null;
	}, resolveClass : function(_) {
		return null;
	}}
	else this.resolver = r;
}
haxe.Unserializer.prototype.unserialize = function() {
	switch(this.buf.charCodeAt(this.pos++)) {
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
			var c = this.buf.charCodeAt(this.pos);
			if((c >= 43 && c < 58) || c == 101 || c == 69) this.pos++;
			else break;
		}
		var s = this.buf.substr(p1,this.pos - p1);
		var f = Std.parseFloat(s);
		if(f == null) throw ("Invalid float " + s);
		return f;
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
	case 115:{
		var len = this.readDigits();
		if(this.buf.charAt(this.pos++) != ":" || this.length - this.pos < len) throw "Invalid string length";
		var s = this.buf.substr(this.pos,len);
		this.pos += len;
		this.scache.push(s);
		return s;
	}break;
	case 106:{
		var len = this.readDigits();
		if(this.buf.charAt(this.pos++) != ":") throw "Invalid string length";
		var s = this.buf.substr(this.pos,len);
		this.pos += len;
		var delim = "##__delim__##";
		var a = s.split("\\\\");
		s = a.join(delim).split("\\r").join("\r").split("\\n").join("\n").split(delim).join("\\");
		this.scache.push(s);
		return s;
	}break;
	case 97:{
		var a = new Array();
		this.cache.push(a);
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c == 104) {
				this.pos++;
				break;
			}
			if(c == 117) {
				this.pos++;
				var n = this.readDigits();
				a[a.length + n - 1] = null;
			}
			else a.push(this.unserialize());
		}
		return a;
	}break;
	case 111:{
		var o = Reflect.empty();
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
		var tag = this.unserialize();
		if(!Std["is"](tag,String)) throw "Invalid enum tag";
		var constr = Reflect.field(edecl,tag);
		if(constr == null) throw "Unknown enum tag " + name + "." + tag;
		if(this.buf.charCodeAt(this.pos++) != 58) throw "Invalid enum format";
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
		var e = Reflect.callMethod(edecl,constr,args);
		this.cache.push(e);
		return e;
	}break;
	case 108:{
		var l = new List();
		while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
		this.pos++;
		return l;
	}break;
	case 98:{
		var h = new Hash();
		while(this.buf.charCodeAt(this.pos) != 104) {
			var s = this.unserialize();
			h.set(s,this.unserialize());
		}
		this.pos++;
		return h;
	}break;
	case 113:{
		var h = new IntHash();
		var c = this.buf.charCodeAt(this.pos++);
		while(c == 58) {
			var i = this.readDigits();
			h.set(i,this.unserialize());
			c = this.buf.charCodeAt(this.pos++);
		}
		if(c != 104) throw "Invalid IntHash format";
		return h;
	}break;
	case 118:{
		var d = Date.fromString(this.buf.substr(this.pos,19));
		this.pos += 19;
		return d;
	}break;
	default:{
		null;
	}break;
	}
	this.pos--;
	throw ("Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos);
}
haxe.Unserializer.prototype.unserializeObject = function(o) {
	while(true) {
		if(this.pos >= this.length) throw "Invalid object";
		if(this.buf.charCodeAt(this.pos) == 103) break;
		var k = this.unserialize();
		if(!Std["is"](k,String)) throw "Invalid object key";
		var v = this.unserialize();
		Reflect.setField(o,k,v);
	}
	this.pos++;
}
haxe.Unserializer.prototype.__class__ = haxe.Unserializer;
Std = function() { }
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	return Math.floor(x);
}
Std.bool = function(x) {
	return (x !== 0 && x != null && x !== false);
}
Std.parseInt = function(x) {
	{
		var v = parseInt(x);
		if(Math.isNaN(v)) return null;
		return v;
	}
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.chr = function(x) {
	return String.fromCharCode(x);
}
Std.ord = function(x) {
	if(x == "") return null;
	else return x.charCodeAt(0);
}
Std.random = function(x) {
	return Math.floor(Math.random() * x);
}
Std.resource = function(name) {
	return js.Boot.__res[name];
}
Std.prototype.__class__ = Std;
haxe.Serializer = function(p) { if( p === $_ ) return; {
	this.buf = new StringBuf();
	this.cache = new Array();
	this.useCache = true;
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
haxe.Serializer.prototype.dontUseCache = function() {
	this.useCache = false;
}
haxe.Serializer.prototype.scount = null;
haxe.Serializer.prototype.serialize = function(v) {
	var $e = (Type["typeof"](v));
	switch( $e[0] ) {
	case "TNull":
	{
		this.buf.add("n");
	}break;
	case "TInt":
	{
		if(v == 0) {
			this.buf.add("z");
			return;
		}
		this.buf.add("i");
		this.buf.add(v);
	}break;
	case "TFloat":
	{
		if(Math.isNaN(v)) this.buf.add("k");
		else if(!Math.isFinite(v)) this.buf.add((v < 0?"m":"p"));
		else {
			this.buf.add("d");
			this.buf.add(v);
		}
	}break;
	case "TBool":
	{
		this.buf.add((v?"t":"f"));
	}break;
	case "TClass":
	var c = $e[1];
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
				var _g1 = 0, _g = l;
				while(_g1 < _g) {
					var i = _g1;
					++_g1;
					{
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
			{ var $it20 = v.iterator();
			while( $it20.hasNext() ) { var i = $it20.next();
			this.serialize(i);
			}}
			this.buf.add("h");
		}break;
		case Date:{
			this.buf.add("v");
			this.buf.add(v);
		}break;
		case Hash:{
			this.buf.add("b");
			{ var $it21 = v.keys();
			while( $it21.hasNext() ) { var k = $it21.next();
			{
				this.serializeString(k);
				this.serialize(v.get(k));
			}
			}}
			this.buf.add("h");
		}break;
		case IntHash:{
			this.buf.add("q");
			{ var $it22 = v.keys();
			while( $it22.hasNext() ) { var k = $it22.next();
			{
				this.buf.add(":");
				this.buf.add(k);
				this.serialize(v.get(k));
			}
			}}
			this.buf.add("h");
		}break;
		default:{
			this.cache.pop();
			this.buf.add("c");
			this.serialize(Type.getClassName(c));
			this.cache.push(v);
			this.serializeFields(v);
		}break;
		}
	}break;
	case "TObject":
	{
		if(this.useCache && this.serializeRef(v)) return;
		this.buf.add("o");
		this.serializeFields(v);
	}break;
	case "TEnum":
	var e = $e[1];
	{
		if(this.useCache && this.serializeRef(v)) return;
		this.cache.pop();
		this.buf.add("w");
		this.serialize(Type.getEnumName(e));
		this.serializeString(v[0]);
		this.buf.add(":");
		var l = v["length"];
		this.buf.add(l - 1);
		{
			var _g1 = 1, _g = l;
			while(_g1 < _g) {
				var i = _g1;
				++_g1;
				this.serialize(v[i]);
			}
		}
		this.cache.push(v);
	}break;
	case "TFunction":
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
	{ var $it23 = Reflect.fields(v).iterator();
	while( $it23.hasNext() ) { var f = $it23.next();
	{
		this.serializeString(f);
		this.serialize(Reflect.field(v,f));
	}
	}}
	this.buf.add("g");
}
haxe.Serializer.prototype.serializeRef = function(v) {
	var vt = typeof(v);
	{
		var _g1 = 0, _g = this.cache.length;
		while(_g1 < _g) {
			var i = _g1;
			++_g1;
			{
				var ci = this.cache[i];
				if(typeof(ci) == vt && ci == v) {
					this.buf.add("r");
					this.buf.add(i);
					return true;
				}
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
	if(s.indexOf("\n") != -1 || s.indexOf("\r") != -1) {
		this.buf.add("j");
		s = s.split("\\").join("\\\\").split("\n").join("\\n").split("\r").join("\\r");
	}
	else this.buf.add("s");
	this.buf.add(s.length);
	this.buf.add(":");
	this.buf.add(s);
}
haxe.Serializer.prototype.shash = null;
haxe.Serializer.prototype.toString = function() {
	return this.buf.toString();
}
haxe.Serializer.prototype.useCache = null;
haxe.Serializer.prototype.__class__ = haxe.Serializer;
List = function(p) { if( p === $_ ) return; {
	this.length = 0;
}}
List.__name__ = ["List"];
List.prototype.add = function(item) {
	var x = [item,null];
	if(this.h == null) this.h = x;
	else this.q[1] = x;
	this.q = x;
	this.length++;
}
List.prototype.clear = function() {
	this.h = null;
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
	return { next : function() {
		{
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}
	}, hasNext : function() {
		return (this.h != null);
	}, h : this.h}
}
List.prototype.join = function(sep) {
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	while(l != null) {
		if(first) first = false;
		else s.add(sep);
		s.add(l[0]);
		l = l[1];
	}
	return s.toString();
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
	s.add("{");
	while(l != null) {
		if(first) first = false;
		else s.add(", ");
		s.add(l[0]);
		l = l[1];
	}
	s.add("}");
	return s.toString();
}
List.prototype.__class__ = List;
mt = {}
mt.js = {}
mt.js.Tip = function() { }
mt.js.Tip.__name__ = ["mt","js","Tip"];
mt.js.Tip.lastRef = null;
mt.js.Tip.tooltip = null;
mt.js.Tip.tooltipContent = null;
mt.js.Tip.show = function(refObj,contentHTML,cName,offset) {
	if(mt.js.Tip.tooltip == null) {
		mt.js.Tip.tooltip = js.Lib.document.getElementById(mt.js.Tip.tooltipId);
		if(mt.js.Tip.tooltip == null) throw "Tooltip div not found";
	}
	if(mt.js.Tip.tooltipContent == null) {
		mt.js.Tip.tooltipContent = js.Lib.document.getElementById(mt.js.Tip.tooltipContentId);
		if(mt.js.Tip.tooltipContent == null) throw "TooltipContent div not found";
	}
	if(cName == null) mt.js.Tip.tooltip.className = mt.js.Tip.defaultClass;
	else mt.js.Tip.tooltip.className = cName;
	mt.js.Tip.lastRef = refObj;
	mt.js.Tip.tooltipContent.innerHTML = contentHTML;
	if(offset != null) mt.js.Tip.placeTooltip(offset.x,offset.y);
	else mt.js.Tip.placeTooltip();
}
mt.js.Tip.placeTooltip = function(ofx,ofy) {
	var o = mt.js.Tip.getSize(mt.js.Tip.lastRef);
	var tts = mt.js.Tip.getSize(mt.js.Tip.tooltip);
	if(ofx == null) ofx = 0;
	if(ofy == null) ofy = 0;
	if(o.width <= 0 || ofx > 0) mt.js.Tip.tooltip.style.left = (o.x + ofx) + "px";
	else mt.js.Tip.tooltip.style.left = (o.x - tts.width * 0.5 + o.width * 0.5) + "px";
	if(ofy > 0) mt.js.Tip.tooltip.style.top = (o.y + ofy) + "px";
	else mt.js.Tip.tooltip.style.top = (o.y + Math.max(mt.js.Tip.minOffsetY,o.height)) + "px";
}
mt.js.Tip.showTip = function(refObj,title,contentBase) {
	contentBase = "<p>" + contentBase + "</p>";
	mt.js.Tip.show(refObj,"<div class=\"title\">" + title + "</div>" + contentBase);
}
mt.js.Tip.hide = function() {
	if(mt.js.Tip.lastRef == null) return;
	mt.js.Tip.lastRef = null;
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
mt.js.Tip.getSize = function(o) {
	var ret = { height : o.clientHeight, width : o.clientWidth, y : 0, x : 0}
	var p = o;
	while(p != null) {
		ret.x += p.offsetLeft - p.scrollLeft;
		ret.y += p.offsetTop - p.scrollTop;
		p = p.offsetParent;
	}
	return ret;
}
mt.js.Tip.prototype.__class__ = mt.js.Tip;
haxe.Http = function(url) { if( url === $_ ) return; {
	this.url = url;
	this.headers = new Hash();
	this.params = new Hash();
	this.async = true;
}}
haxe.Http.__name__ = ["haxe","Http"];
haxe.Http.request = function(url) {
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
haxe.Http.prototype.request = function(post) {
	var me = this;
	var r = new js.XMLHttpRequest();
	var onreadystatechange = function() {
		if(r.readyState != 4) return;
		var s = function($this) {
			var $r;
			try {
				$r = r.status;
			}
			catch( $e24 ) {
				{
					var e = $e24;
					$r = null;
				}
			}
			return $r;
		}(this);
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
	}
	r.onreadystatechange = onreadystatechange;
	var uri = null;
	{ var $it25 = this.params.keys();
	while( $it25.hasNext() ) { var p = $it25.next();
	{
		if(uri == null) uri = "";
		else uri += "&";
		uri += StringTools.urlDecode(p) + "=" + StringTools.urlEncode(this.params.get(p));
	}
	}}
	try {
		if(post) r.open("POST",this.url,this.async);
		else if(uri != null) {
			var question = this.url.split("?").length <= 1;
			r.open("GET",this.url + ((question?"?":"&")) + uri,this.async);
			uri = null;
		}
		else r.open("GET",this.url,this.async);
	}
	catch( $e26 ) {
		{
			var e = $e26;
			{
				this.onError(e.toString());
				return;
			}
		}
	}
	if(this.headers.get("Content-Type") == null && post) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	{ var $it27 = this.headers.keys();
	while( $it27.hasNext() ) { var h = $it27.next();
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
haxe.Http.prototype.url = null;
haxe.Http.prototype.__class__ = haxe.Http;
ValueType = { __ename__ : ["ValueType"] }
ValueType.TBool = ["TBool"];
ValueType.TBool.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",c]; $x.__enum__ = ValueType; return $x; }
ValueType.TEnum = function(e) { var $x = ["TEnum",e]; $x.__enum__ = ValueType; return $x; }
ValueType.TFloat = ["TFloat"];
ValueType.TFloat.__enum__ = ValueType;
ValueType.TFunction = ["TFunction"];
ValueType.TFunction.__enum__ = ValueType;
ValueType.TInt = ["TInt"];
ValueType.TInt.__enum__ = ValueType;
ValueType.TNull = ["TNull"];
ValueType.TNull.__enum__ = ValueType;
ValueType.TObject = ["TObject"];
ValueType.TObject.__enum__ = ValueType;
ValueType.TUnknown = ["TUnknown"];
ValueType.TUnknown.__enum__ = ValueType;
js.Lib = function() { }
js.Lib.__name__ = ["js","Lib"];
js.Lib.isIE = null;
js.Lib.isOpera = null;
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
js._XmlHttp = {}
js._XmlHttp.Room = { __ename__ : ["js","_XmlHttp","Room"] }
js._XmlHttp.Room.Chat = function(name) { var $x = ["Chat",name]; $x.__enum__ = js._XmlHttp.Room; return $x; }
js._XmlHttp.Room.Defy = ["Defy"];
js._XmlHttp.Room.Defy.__enum__ = js._XmlHttp.Room;
js._XmlHttp.Room.Game = function(id) { var $x = ["Game",id]; $x.__enum__ = js._XmlHttp.Room; return $x; }
js._XmlHttp.Room.Play = ["Play"];
js._XmlHttp.Room.Play.__enum__ = js._XmlHttp.Room;
Hash = function(p) { if( p === $_ ) return; {
	{
		this.h = {}
		if(this.h.__proto__ != null) {
			this.h.__proto__ = null;
			delete(this.h.__proto__);
		}
	}
}}
Hash.__name__ = ["Hash"];
Hash.prototype.exists = function(key) {
	try {
		return this.hasOwnProperty.call(this.h,key);
	}
	catch( $e28 ) {
		{
			var e = $e28;
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
	return this.h[key];
}
Hash.prototype.h = null;
Hash.prototype.iterator = function() {
	return { next : function() {
		var i = this.it.next();
		return this.ref[i];
	}, hasNext : function() {
		return this.it.hasNext();
	}, it : this.keys(), ref : this.h}
}
Hash.prototype.keys = function() {
	var a = new Array();
	
			for(var i in this.h)
				a.push(i);
		;
	return a.iterator();
}
Hash.prototype.remove = function(key) {
	if(!this.exists(key)) return false;
	delete(this.h[key]);
	return true;
}
Hash.prototype.set = function(key,value) {
	this.h[key] = value;
}
Hash.prototype.toString = function() {
	var s = new StringBuf();
	s.add("{");
	var it = this.keys();
	{ var $it29 = it;
	while( $it29.hasNext() ) { var i = $it29.next();
	{
		s.add(i);
		s.add(" => ");
		s.add(this.get(i));
		if(it.hasNext()) s.add(", ");
	}
	}}
	s.add("}");
	return s.toString();
}
Hash.prototype.__class__ = Hash;
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
	var r = new haxe.Http("/" + url);
	js.XmlHttp.onStart(r,obj);
	js.XmlHttp.urlForBack = url;
	r.setHeader("X-Handler","js.XmlHttp");
	r.onData = $closure(js.XmlHttp,"onData");
	r.onError = $closure(js.XmlHttp,"onError");
	r.request(false);
}
js.XmlHttp.userTip = function(ref,id,special) {
	return js.XmlHttp.userTipOffset(ref,id,special,0,0);
}
js.XmlHttp.userTipOffset = function(ref,id,special,x,y,name) {
	if(js.XmlHttp.tip_cache.exists(id + special)) {
		js.XmlHttp.displayUserTip(ref.id,js.XmlHttp.tip_cache.get(id + special),x,y);
	}
	else {
		if(name != null) mt.js.Tip.show(ref,"<div class='title'>" + name + "</div><em>Veuillez patienter...</em>",null,{ y : y, x : x});
		else mt.js.Tip.show(ref,"<em>Veuillez patienter...</em>",null,{ y : y, x : x});
		js.XmlHttp.waitingUserTip = { y : y, x : x, id : ref.id}
		var t = js.XmlHttp.getDelayed("user/" + id + "/tip?" + special,500);
		ref.tipTimer = t;
	}
}
js.XmlHttp.hideUserTip = function(ref) {
	if(ref.tipTimer != null) ref.tipTimer.stop();
	js.XmlHttp.waitingUserTip = null;
	mt.js.Tip.hide();
}
js.XmlHttp.getDelayed = function(url,delay) {
	var o = new haxe.Timer(delay);
	o.run = function() {
		o.stop();
		js.XmlHttp.enqueue(url);
	}
	return o;
}
js.XmlHttp.post = function(url,form) {
	if(js.XmlHttp.lock != null) {
		return;
	}
	if(new EReg("[?]","").match(url)) url += ";rand=" + Std.random(9999999);
	else url += "?rand=" + Std.random(9999999);
	var r = new haxe.Http("/" + url);
	js.XmlHttp.urlForBack = null;
	r.setHeader("X-Handler","js.XmlHttp");
	r.onData = $closure(js.XmlHttp,"onData");
	r.onError = $closure(js.XmlHttp,"onError");
	var l = form.elements;
	{
		var _g1 = 0, _g = l.length;
		while(_g1 < _g) {
			var i = _g1;
			++_g1;
			{
				var e = l[i];
				if(e.name == null || e.name == "") continue;
				if(e.type == "checkbox" || e.type == "radio") {
					if(e.checked) r.setParameter(e.name,e.value);
				}
				else {
					r.setParameter(e.name,e.value);
				}
				if(e.type == "submit") {
					e.disabled = true;
					js.XmlHttp.lockButton = e;
				}
			}
		}
	}
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
	{ var $it30 = js.XmlHttp.divRoom.iterator();
	while( $it30.hasNext() ) { var e = $it30.next();
	{
		var $e = (e);
		switch( $e[0] ) {
		case "Chat":
		var s = $e[1];
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
	js.XmlHttp.lock = r;
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
js.XmlHttp.onEnd = function() {
	js.Lib.document.body.style.cursor = "default";
	if(js.XmlHttp.lastLinkLauncher != null) {
		js.XmlHttp.lastLinkLauncher.style.cursor = js.XmlHttp.lastLinkLauncherCursor;
		js.XmlHttp.lastLinkLauncher = null;
	}
	js.XmlHttp.lock = null;
	js.XmlHttp.urlForBack = null;
	if(js.XmlHttp.queue.length > 0) {
		js.XmlHttp.get(js.XmlHttp.queue.pop());
		return;
	}
	if(js.XmlHttp.lockButton != null) {
		js.XmlHttp.lockButton.disabled = false;
	}
}
js.XmlHttp.onError = function(msg) {
	js.XmlHttp.onEnd();
	haxe.Log.trace("Error[" + js.XmlHttp.urlForBack + "]: " + msg,{ methodName : "onError", className : "js.XmlHttp", lineNumber : 177, fileName : "XmlHttp.hx"});
}
js.XmlHttp.onData = function(data) {
	var url = js.XmlHttp.urlForBack;
	var x;
	try {
		x = Xml.parse("<resp>" + data + "</resp>").firstChild();
	}
	catch( $e31 ) {
		{
			var e = $e31;
			{
				haxe.Log.trace(e,{ methodName : "onData", className : "js.XmlHttp", lineNumber : 186, fileName : "XmlHttp.hx"});
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
		{ var $it32 = x.elements();
		while( $it32.hasNext() ) { var n = $it32.next();
		{
			if((n.getNodeName() == "fill" || n.getNodeName() == "add") && n.exists("id")) {
				var id = n.get("id");
				if(id == "main" && n.getNodeName() == "fill") fillMain = true;
				if(n.getNodeName() == "fill" && (id == "main" || id == "groupMain")) {
					scroll = true;
					mt.js.Tip.hide();
				}
				var d = js.Utils.byId(id);
				if(d != null) {
					if(js.XmlHttp.divRoom.exists(id)) {
						js.XmlHttp.hideRoom(id);
					}
					var s = "";
					{ var $it33 = n.iterator();
					while( $it33.hasNext() ) { var c = $it33.next();
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
					if(n.exists("chat")) {
						js.XmlHttp.displayRoom(id,js._XmlHttp.Room.Chat(n.get("chat")));
					}
					if(n.exists("game")) {
						js.XmlHttp.displayRoom(id,js._XmlHttp.Room.Game(Std.parseInt(n.get("game"))));
					}
					if(n.exists("room")) {
						var r = n.get("room");
						switch(r) {
						case "play":{
							js.XmlHttp.displayRoom(id,js._XmlHttp.Room.Play);
						}break;
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
					haxe.Log.trace("section not found",{ methodName : "onData", className : "js.XmlHttp", lineNumber : 247, fileName : "XmlHttp.hx"});
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
						js.BackForward.add(n.firstChild().getNodeValue());
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
				{ var $it34 = n.iterator();
				while( $it34.hasNext() ) { var c = $it34.next();
				{
					if(c.nodeType == Xml.CData) s += c.getNodeValue();
					else s += c.toString();
				}
				}}
				var uid = n.get("uid");
				if(uid != null) {
					if(js.XmlHttp.waitingUserTip != null) {
						addToCache = uid;
						js.XmlHttp.displayUserTip(js.XmlHttp.waitingUserTip.id,s,js.XmlHttp.waitingUserTip.x,js.XmlHttp.waitingUserTip.y);
					}
				}
				else {
					var refObj = js.Utils.byId(id);
					if(refObj == null) throw "No object with id: " + id;
					mt.js.Tip.show(refObj,s,n.get("class"));
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
			else if(n.getNodeName() == "user") {
				var money = Std.parseInt(n.get("money"));
				var freeMoney = Std.parseInt(n.get("freeMoney"));
				js.App.updateMoney(money,freeMoney);
			}
			else if(n.getNodeName() == "load") {
				js.XmlHttp.enqueue(n.firstChild().getNodeValue());
			}
			else if(n.getNodeName() == "reboot") {
				js.App.reboot();
			}
			else if(n.getNodeName() == "alert") {
				js.Lib.alert(n.firstChild().getNodeValue());
			}
			else if(n.getNodeName() == "connect") {
				js.App.init(n.get("host"),Std.parseInt(n.get("port")),n.get("sid"));
			}
			else if(n.getNodeName() == "join") {
				js.App.c._joinChatRoom(n.get("room"),{ _watch : n.get("watch") == "1", _id : Std.parseInt(n.get("id")), _title : n.get("title")});
			}
			else if(n.getNodeName() == "confirm") {
				var rs = js.Lib.window.confirm(n.firstChild().getNodeValue());
				if(rs) {
					js.XmlHttp.enqueue(n.get("url"));
				}
			}
			else if(n.getNodeName() == "script") {
				var s = "";
				{ var $it35 = n.iterator();
				while( $it35.hasNext() ) { var c = $it35.next();
				{
					if(c.nodeType == Xml.CData) s += c.getNodeValue();
					else s += c.toString();
				}
				}}
				js.Lib.eval(s);
			}
			else if(n.getNodeName() == "exception") {
				var s = "";
				{ var $it36 = n.elementsNamed("head");
				while( $it36.hasNext() ) { var h = $it36.next();
				{
					s += "Exception: " + h.firstChild().getNodeValue() + "\n";
				}
				}}
				{ var $it37 = n.elementsNamed("stack");
				while( $it37.hasNext() ) { var st = $it37.next();
				{
					{ var $it38 = st.elements();
					while( $it38.hasNext() ) { var e = $it38.next();
					{
						s += function($this) {
							var $r;
							switch(e.getNodeName()) {
							case "cfunction":{
								$r = "cfunction";
							}break;
							case "module":{
								$r = "Module " + e.get("n");
							}break;
							case "file":{
								$r = e.get("n") + ":" + e.get("l");
							}break;
							}
							return $r;
						}(this);
						s += "\n";
					}
					}}
				}
				}}
				js.Utils.strace(s);
			}
			else {
				haxe.Log.trace("Ignore " + n,{ methodName : "onData", className : "js.XmlHttp", lineNumber : 345, fileName : "XmlHttp.hx"});
			}
		}
		}}
	}
	catch( $e39 ) {
		{
			var e = $e39;
			{
				haxe.Log.trace("Exception",{ methodName : "onData", className : "js.XmlHttp", lineNumber : 349, fileName : "XmlHttp.hx"});
				haxe.Log.trace(e,{ methodName : "onData", className : "js.XmlHttp", lineNumber : 350, fileName : "XmlHttp.hx"});
				haxe.Log.trace(e.message,{ methodName : "onData", className : "js.XmlHttp", lineNumber : 351, fileName : "XmlHttp.hx"});
			}
		}
	}
	js.XmlHttp.execJs();
	if(addToCache != null) {
		if(js.XmlHttp.waitingUserTip != null && mt.js.Tip.lastRef != null && js.XmlHttp.waitingUserTip.id == mt.js.Tip.lastRef.id) js.XmlHttp.tip_cache.set(addToCache,js.Utils.byId("tooltipContent").innerHTML);
	}
	js.XmlHttp.checkDivRoom();
	mt.js.Tip.clean();
	(haxe.Timer.delayed($closure(mt.js.Tip,"clean"),1000))();
	if(fillMain && !backOk && url != null && !noBack) {
		js.BackForward.add(url);
	}
	else if(!backOk) {
		js.BackForward.add(null);
	}
	if(scroll) js.Utils.scrollTop();
	js.XmlHttp.onEnd();
}
js.XmlHttp.displayUserTip = function(id,s,x,y) {
	if(x == null) x = 0;
	if(y == null) y = 0;
	var refObj = js.Utils.byId(id);
	if(refObj == null) throw "No object with id: " + id;
	if(refObj.parentNode == null) throw "Deleted object";
	mt.js.Tip.show(refObj,s,"userTip",{ y : y, x : x});
}
js.XmlHttp.displayRoom = function(id,room) {
	js.XmlHttp.divRoom.set(id,room);
	var $e = (room);
	switch( $e[0] ) {
	case "Chat":
	var n = $e[1];
	{
		js.App.c._displayChatRoom(n);
	}break;
	case "Game":
	var i = $e[1];
	{
		js.App.c._joinGameRoom(i);
	}break;
	case "Play":
	{
		js.App.c._displayGame();
	}break;
	case "Defy":
	{
		js.App.c._defyDisplayed(true);
	}break;
	}
}
js.XmlHttp.hideRoom = function(id) {
	var room = js.XmlHttp.divRoom.get(id);
	js.XmlHttp.divRoom.remove(id);
	var $e = (room);
	switch( $e[0] ) {
	case "Chat":
	var n = $e[1];
	{
		js.App.c._hideChatRoom(n);
	}break;
	case "Game":
	var i = $e[1];
	{
		js.App.c._leaveGameRoom(i);
	}break;
	case "Play":
	{
		js.App.c._hideGame();
	}break;
	case "Defy":
	{
		js.App.c._defyDisplayed(false);
	}break;
	}
}
js.XmlHttp.checkDivRoom = function() {
	{ var $it40 = js.XmlHttp.divRoom.keys();
	while( $it40.hasNext() ) { var k = $it40.next();
	{
		var div = js.Utils.byId(k);
		if(div == null) {
			js.XmlHttp.hideRoom(k);
		}
	}
	}}
}
js.XmlHttp.execJs = function() {
	var i = 1;
	while(true) {
		var e = js.Utils.byId("jsid-" + i);
		if(e == null) break;
		e.setAttribute("id","");
		js.Lib.eval(e.innerHTML);
		i++;
	}
}
js.XmlHttp.prototype.__class__ = js.XmlHttp;
js.Boot = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	{
		var msg = (i != null?i.fileName + ":" + i.lineNumber + ": ":"");
		msg += js.Boot.__unhtml(js.Boot.__string_rec(v,"")) + "<br/>";
		var d = document.getElementById("haxe:trace");
		if(d == null) alert("No haxe:trace element defined\n" + msg);
		else d.innerHTML += msg;
	}
}
js.Boot.__clear_trace = function() {
	{
		var d = document.getElementById("haxe:trace");
		if(d != null) d.innerHTML = "";
	}
}
js.Boot.__closure = function(o,f) {
	{
		var m = o[f];
		if(m == null) return null;
		return function() {
			return m.apply(o,arguments);
		}
	}
}
js.Boot.__string_rec = function(o,s) {
	{
		if(o == null) return "null";
		if(s.length >= 5) return "<...>";
		var t = typeof(o);
		if(t == "function" && (o.__name__ != null || o.__ename__ != null)) t = "object";
		switch(t) {
		case "object":{
			if(o instanceof Array) {
				if(o.__enum__ != null) {
					if(o.length == 1) return o[0];
					var str = o[0] + "(";
					s += "\t";
					{
						var _g1 = 1, _g = o.length;
						while(_g1 < _g) {
							var i = _g1;
							++_g1;
							{
								if(i != 1) str += "," + js.Boot.__string_rec(o[i],s);
								else str += js.Boot.__string_rec(o[i],s);
							}
						}
					}
					return str + ")";
				}
				var l = o.length;
				var i;
				var str = "[";
				s += "\t";
				{
					var _g1 = 0, _g = l;
					while(_g1 < _g) {
						var i1 = _g1;
						++_g1;
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
			catch( $e41 ) {
				{
					var e = $e41;
					{
						return "???";
					}
				}
			}
			if(tostr != null && tostr != Object.toString) {
				var s2 = o.toString();
				if(s2 != "[object Object]") return s2;
			}
			var k;
			var str = "{\n";
			s += "\t";
			var hasp = (o.hasOwnProperty != null);
			for( var k in o ) { ;
			if(hasp && !o.hasOwnProperty(k)) continue;
			if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__") continue;
			if(str.length != 2) str += ", \n";
			str += s + k + " : " + js.Boot.__string_rec(o[k],s);
			}
			s = s.substring(1);
			str += "\n" + s + "}";
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
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1;
			++_g1;
			{
				var i1 = intf[i];
				if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
			}
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	{
		try {
			if(o instanceof cl) {
				if(cl == Array) return (o.__enum__ == null);
				return true;
			}
			if(js.Boot.__interfLoop(o.__class__,cl)) return true;
		}
		catch( $e42 ) {
			{
				var e = $e42;
				{
					if(cl == null) return false;
				}
			}
		}
		switch(cl) {
		case Int:{
			return (Math.ceil(o) === o) && isFinite(o);
		}break;
		case Float:{
			return typeof(o) == "number";
		}break;
		case Bool:{
			return (o === true || o === false);
		}break;
		case String:{
			return typeof(o) == "string";
		}break;
		case Dynamic:{
			return true;
		}break;
		default:{
			if(o != null && o.__enum__ == cl) return true;
			return false;
		}break;
		}
	}
}
js.Boot.__init = function() {
	{
		js.Lib.isIE = (document.all != null && window.opera == null);
		js.Lib.isOpera = (window.opera != null);
		Array.prototype.copy = Array.prototype.slice;
		Array.prototype.insert = function(i,x) {
			this.splice(i,0,x);
		}
		Array.prototype.remove = function(obj) {
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
		}
		Array.prototype.iterator = function() {
			return { next : function() {
				return this.arr[this.cur++];
			}, hasNext : function() {
				return this.cur < this.arr.length;
			}, arr : this, cur : 0}
		}
		String.prototype.__class__ = String;
		String.__name__ = ["String"];
		Array.prototype.__class__ = Array;
		Array.__name__ = ["Array"];
		var cca = String.prototype.charCodeAt;
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
				len = this.length + len - pos;
			}
			return oldsub.apply(this,[pos,len]);
		}
		Int = new Object();
		Dynamic = new Object();
		Float = Number;
		Bool = new Object();
		Bool["true"] = true;
		Bool["false"] = false;
		$closure = js.Boot.__closure;
	}
}
js.Boot.prototype.__class__ = js.Boot;
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
	this.input.onchange = $closure(this,"onchange");
	this.input.onkeyup = $closure(this,"onchange");
	this.onchange(null);
}}
js.PassHelper.__name__ = ["js","PassHelper"];
js.PassHelper.prototype.bar = null;
js.PassHelper.prototype.complexity = null;
js.PassHelper.prototype.container = null;
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
			var i = _g1;
			++_g1;
			{
				var c = value.charAt(i);
				var found = false;
				{ var $it43 = a.iterator();
				while( $it43.hasNext() ) { var ac = $it43.next();
				{
					if(ac == c) found = true;
				}
				}}
				if(!found) {
					this.complexity += 1;
					a.push(c);
					if(new EReg("[^A-Z0-9]","i").match(c)) this.complexity += 1;
				}
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
	var pct = Std["int"](Math.min(this.complexity,16) * 100 / 16);
	this.bar.style.width = pct + "%";
	if(pct < 20) {
		this.container.className = "awful";
		this.text.innerHTML = "TrÃ¨s faible";
	}
	else if(pct < 70) {
		this.container.className = "bad";
		this.text.innerHTML = "Faible";
	}
	else if(pct < 100) {
		this.container.className = "medium";
		this.text.innerHTML = "Moyen";
	}
	else {
		this.container.className = "good";
		this.text.innerHTML = "Bon !";
	}
}
js.PassHelper.prototype.__class__ = js.PassHelper;
IntHash = function(p) { if( p === $_ ) return; {
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	}
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
	return { next : function() {
		var i = this.it.next();
		return this.ref[i];
	}, hasNext : function() {
		return this.it.hasNext();
	}, it : this.keys(), ref : this.h}
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
	s.add("{");
	var it = this.keys();
	{ var $it44 = it;
	while( $it44.hasNext() ) { var i = $it44.next();
	{
		s.add(i);
		s.add(" => ");
		s.add(this.get(i));
		if(it.hasNext()) s.add(", ");
	}
	}}
	s.add("}");
	return s.toString();
}
IntHash.prototype.__class__ = IntHash;
js.Client = function(obj) { if( obj === $_ ) return; {
	Remoting.Client.apply(this,[haxe.remoting.Connection.flashConnect(obj).__resolve("inst")]);
	js.Client.inst = this;
	this.headBarQueue = new Array();
	this.headBarLast = 0;
}}
js.Client.__name__ = ["js","Client"];
js.Client.__super__ = Remoting.Client;
for(var k in Remoting.Client.prototype ) js.Client.prototype[k] = Remoting.Client.prototype[k];
js.Client.inst = null;
js.Client.getTemplate = function(tpl) {
	try {
		var a = tpl.split("@");
		if(a.length != 2) throw "Bad template name : " + tpl;
		var tplModule = a[0];
		var macroName = a[1];
		if(!js.Client.tpl_cache.exists(tplModule)) {
			var x = function($this) {
				var $r;
				try {
					$r = function($this) {
						var $r;
						var s = haxe.Http.request("/ctpl/" + tplModule + ".mtt?r=" + Std.random(99999));
						$r = Xml.parse(s).firstElement();
						return $r;
					}($this);
				}
				catch( $e45 ) {
					{
						var e = $e45;
						$r = function($this) {
							var $r;
							throw "Error getting " + tplModule + ".mtt (http or xml parsing error): " + Std.string(e);
							return $r;
						}($this);
					}
				}
				return $r;
			}(this);
			var h = new Hash();
			{ var $it46 = x.elementsNamed("macro");
			while( $it46.hasNext() ) { var e = $it46.next();
			{
				if(!e.exists("name")) continue;
				var s = "";
				{ var $it47 = e.iterator();
				while( $it47.hasNext() ) { var c = $it47.next();
				{
					if(c.nodeType == Xml.CData) {
						s += c.getNodeValue();
					}
					else {
						s += c.toString();
					}
				}
				}}
				var t = function($this) {
					var $r;
					try {
						$r = new haxe.Template(s);
					}
					catch( $e48 ) {
						{
							var e1 = $e48;
							$r = function($this) {
								var $r;
								haxe.Log.trace(e1,{ methodName : "getTemplate", className : "js.Client", lineNumber : 44, fileName : "Client.hx"});
								$r = function($this) {
									var $r;
									throw "Error parsing template of " + tplModule + ".mtt : \n" + s;
									return $r;
								}($this);
								return $r;
							}($this);
						}
					}
					return $r;
				}(this);
				h.set(e.get("name"),t);
			}
			}}
			js.Client.tpl_cache.set(tplModule,h);
		}
		var r = js.Client.tpl_cache.get(tplModule).get(macroName);
		if(r == null) throw "Template not found : " + tpl;
		return r;
	}
	catch( $e49 ) {
		{
			var e = $e49;
			{
				haxe.Log.trace("getTemplate exception",{ methodName : "getTemplate", className : "js.Client", lineNumber : 57, fileName : "Client.hx"});
				haxe.Log.trace(e,{ methodName : "getTemplate", className : "js.Client", lineNumber : 58, fileName : "Client.hx"});
				throw "getTemplate";
			}
		}
	}
}
js.Client.prototype.add = function(id,tplName,ctx) {
	var div = js.Lib.document.getElementById(id);
	if(div == null) throw "No html element with id " + id;
	div.innerHTML += this.applyTpl(tplName,ctx);
}
js.Client.prototype.alert = function(msg) {
	js.Lib.alert(msg);
}
js.Client.prototype.applyTpl = function(tplName,ctx) {
	if(tplName == null) return ctx;
	var tpl = js.Client.getTemplate(tplName);
	return tpl.execute(ctx,js.TemplateTools);
}
js.Client.prototype.connected = function(b) {
	if(b) {
		haxe.Log.trace("Connected",{ methodName : "connected", className : "js.Client", lineNumber : 158, fileName : "Client.hx"});
		this.fill("cnxIcon","global@connected",null);
	}
	else {
		haxe.Log.trace("Disconnected !",{ methodName : "connected", className : "js.Client", lineNumber : 161, fileName : "Client.hx"});
		this.fill("cnxIcon","global@closed",null);
	}
}
js.Client.prototype.connecting = function(b) {
	if(b) {
		haxe.Log.trace("Connecting...",{ methodName : "connecting", className : "js.Client", lineNumber : 168, fileName : "Client.hx"});
		this.fill("cnxIcon","global@connecting",null);
	}
	else {
		haxe.Log.trace("Failed to connect",{ methodName : "connecting", className : "js.Client", lineNumber : 171, fileName : "Client.hx"});
		this.fill("cnxIcon","global@closed",null);
	}
}
js.Client.prototype.fill = function(id,tplName,ctx) {
	var div = js.Lib.document.getElementById(id);
	if(div == null) throw "No html element with id " + id;
	div.innerHTML = this.applyTpl(tplName,ctx);
}
js.Client.prototype.focus = function(id) {
	var div = js.Lib.document.getElementById(id);
	if(div == null) throw "No html element with id " + id;
	div.focus();
}
js.Client.prototype.headBar = function(tplName,ctx,timeout) {
	this.headBarLast++;
	if(this.headBarLocked) {
		this.headBarQueue.push({ id : this.headBarLast, timeout : timeout, ctx : ctx, tplName : tplName});
	}
	else {
		this.fill("headBar",tplName,ctx);
		if(timeout > 0) {
			this.headBarLocked = true;
			(haxe.Timer.delayed($closure(this,"headBarNext"),timeout))();
		}
		(haxe.Timer.delayedArg($closure(this,"headBarEmpty"),Std["int"](Math.max(timeout,20000))))(this.headBarLast);
	}
}
js.Client.prototype.headBarEmpty = function(id) {
	if(id == this.headBarLast) this.fill("headBar","global@barEmpty",null);
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
				if(n.timeout > 0) (haxe.Timer.delayed($closure(this,"headBarNext"),n.timeout))();
				else this.headBarLocked = false;
				(haxe.Timer.delayedArg($closure(this,"headBarEmpty"),Std["int"](Math.max(n.timeout,20000))))(n.id);
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
	js.XmlHttp.userTipOffset(js.Lib.document.getElementById("rooms"),Std.string(uid),"",x,y,name);
}
js.Client.prototype.scrollDown = function(id) {
	var div = js.Lib.document.getElementById(id);
	if(div == null) throw "No html element with id " + id;
	if(div.autoScroll == null) {
		div.onscroll = function(e) {
			div.autoScroll = (div.scrollTop == div.scrollHeight - div.clientHeight);
		}
		div.autoScroll = true;
	}
	if(div.autoScroll) div.scrollTop = div.scrollHeight - div.clientHeight;
}
js.Client.prototype.setClass = function(id,className) {
	js.Utils.setClass(id,className);
}
js.Client.prototype.trace = function(msg,pos) {
	haxe.Log.trace(msg,pos);
}
js.Client.prototype.__class__ = js.Client;
js.App = function() { }
js.App.__name__ = ["js","App"];
js.App.c = null;
js.App.userMoney = null;
js.App.userFreeMoney = null;
js.App.unload = function() {
	return true;
}
js.App.playNow = function(gid) {
	js.App.c._playNow(gid);
}
js.App.createParty = function(gid) {
	js.App.c._createParty(gid);
}
js.App.cancelParty = function(gid,pid) {
	js.App.c._cancelParty(gid,pid);
}
js.App.joinParty = function(gid,pid) {
	js.App.c._joinParty(gid,pid);
}
js.App.watchParty = function(pid,isMaster) {
	js.App.c._watchParty(pid,isMaster);
}
js.App.autoReconnect = function(b) {
	js.App.c._autoReconnect(b);
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
js.App.sendChatMessage = function(room,input) {
	if(input.value.length > 1) {
		js.App.c._sendChatMessage(room,input.value);
		input.value = "";
	}
}
js.App.sendGameChatMessage = function(input) {
	var msg = input.value;
	if(msg.length > 1) {
		js.App.c._gameChatMessage(msg);
		input.value = "";
	}
}
js.App.filterPartyList = function(f) {
	js.App.c._filterPartyList(f);
}
js.App.isPlaying = function() {
	return js.App.c._isPlaying();
}
js.App.resumeParty = function() {
	js.App.c._resumeParty();
}
js.App.splitValues = function(s) {
	var a = s.split(";");
	var c = Reflect.empty();
	var i = 0;
	{ var $it50 = a.iterator();
	while( $it50.hasNext() ) { var v = $it50.next();
	{
		Reflect.setField(c,"v" + i,v);
		i++;
	}
	}}
	return c;
}
js.App.applyTpl = function(name,ctx) {
	return js.App.c.applyTpl(name,ctx);
}
js.App.updateMoney = function(money,freeMoney) {
	js.App.userMoney = money;
	js.App.userFreeMoney = freeMoney;
	js.Lib.document.getElementById("userMoney").innerHTML = Std.string(js.App.userMoney);
	js.Lib.document.getElementById("userFreeMoney").innerHTML = Std.string(js.App.userFreeMoney);
}
js.App.hasMoney = function(n) {
	return n <= js.App.userMoney + js.App.userFreeMoney;
}
js.App.init = function(host,port,sid) {
	js.App.c._connect(host,port);
}
js.App.reboot = function() {
	js.Lib.window.location = Std.string(js.Lib.window.location).split("#")[0];
}
js.App.main = function(sid) {
	js.App.c = new js.Client("client");
	js.App.c._setSID(sid);
	js.Utils.init();
}
js.App.userHighlight = function(r,uid) {
	js.App.c._userHighlight(r,uid);
}
js.App.userUnHighlight = function(r,uid) {
	js.App.c._userUnHighlight(r,uid);
}
js.App.prototype.__class__ = js.App;
haxe.remoting = {}
haxe.remoting.Connection = function(data,path) { if( data === $_ ) return; {
	this.__data = data;
	this.__path = path;
}}
haxe.remoting.Connection.__name__ = ["haxe","remoting","Connection"];
haxe.remoting.Connection.doCall = function(path,f,params) {
	try {
		var params1 = new haxe.Unserializer(params).unserialize();
		var obj = js.Lib.eval(path);
		var fun = Reflect.field(obj,f);
		if(fun == null) throw "Invalid remoting call : " + path + "." + f;
		var v = Reflect.callMethod(obj,fun,params1);
		var s = new haxe.Serializer();
		s.serialize(v);
		return s.toString() + "#";
	}
	catch( $e51 ) {
		{
			var e = $e51;
			{
				var s = new haxe.Serializer();
				s.serializeException(e);
				return s.toString();
			}
		}
	}
}
haxe.remoting.Connection.jsRemoting = function() {
	return "yes";
}
haxe.remoting.Connection.flashConnect = function(objId) {
	var x = window.document[objId];
	if(x == null) throw "Could not find flash object '" + objId + "'";
	if(x.remotingCall == null) throw "The flash object is not ready or does not contain haxe.remoting.Connection";
	return new haxe.remoting.Connection(x,[]);
}
haxe.remoting.Connection.urlConnect = function(url) {
	return new haxe.remoting.Connection(url,[]);
}
haxe.remoting.Connection.prototype.__data = null;
haxe.remoting.Connection.prototype.__path = null;
haxe.remoting.Connection.prototype.__resolve = function(field) {
	var s = new haxe.remoting.Connection(this.__data,this.__path.copy());
	s.__path.push(field);
	return s;
}
haxe.remoting.Connection.prototype.call = function(params) {
	var p = this.__path.copy();
	var f = p.pop();
	var path = p.join(".");
	var s = new haxe.Serializer();
	s.serialize(params);
	var params1 = s.toString();
	var s1;
	if(this.__data.remotingCall == null) {
		var h = new haxe.Http(this.__data);
		h.async = false;
		h.onData = function(d) {
			s1 = d;
		}
		h.onError = function(e) {
			throw e;
		}
		h.setHeader("X-Haxe-Remoting","1");
		h.setParameter("__x",params1);
		h.request(true);
	}
	else s1 = this.__data.remotingCall(path,f,params1);
	if(s1 == null) throw "Failed to call Flash method " + this.__path.join(".");
	return new haxe.Unserializer(s1).unserialize();
}
haxe.remoting.Connection.prototype.__class__ = haxe.remoting.Connection;
$_ = {}
js.Boot.__res = {}
js.Boot.__init();
{
	Xml = js.JsXml__;
	Xml.__name__ = ["Xml"];
	Xml.Element = "element";
	Xml.PCData = "pcdata";
	Xml.CData = "cdata";
	Xml.Comment = "comment";
	Xml.DocType = "doctype";
	Xml.Prolog = "prolog";
	Xml.Document = "document";
}
{
	Date.now = function() {
		return new Date();
	}
	Date.fromTime = function(t) {
		var d = new Date();
		d["setTime"](t);
		return d;
	}
	Date.fromString = function(s) {
		switch(s.length) {
		case 8:{
			var k = s.split(":");
			var d = new Date();
			d["setTime"](0);
			d["setUTCHours"](k[0]);
			d["setUTCMinutes"](k[1]);
			d["setUTCSeconds"](k[2]);
			return d;
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
	Date.prototype["toString"] = function() {
		var m = this.getMonth() + 1;
		var d = this.getDate();
		var h = this.getHours();
		var mi = this.getMinutes();
		var s = this.getSeconds();
		if(d < 10) d = "0" + d;
		if(m < 10) m = "0" + m;
		if(h < 10) h = "0" + h;
		if(mi < 10) mi = "0" + mi;
		if(s < 10) s = "0" + s;
		return this.getFullYear() + "-" + m + "-" + d + " " + h + ":" + mi + ":" + s;
	}
	Date.prototype.__class__ = Date;
	Date.__name__ = ["Date"];
}
{
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
	
			onerror = function(msg,url,line) {
				var f = js.Lib.onerror;
				if( f == null )
					return false;
				return f(msg,[url+":"+line]);
			}
		;
}
{
	js["XMLHttpRequest"] = (window.XMLHttpRequest?XMLHttpRequest:(window.ActiveXObject?function() {
		try {
			return new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch( $e52 ) {
			{
				var e = $e52;
				{
					try {
						return new ActiveXObject("Microsoft.XMLHTTP");
					}
					catch( $e53 ) {
						{
							var e1 = $e53;
							{
								throw "Unable to create XMLHttpRequest object.";
							}
						}
					}
				}
			}
		}
	}:function($this) {
		var $r;
		throw "Unable to create XMLHttpRequest object.";
		return $r;
	}(this)));
}
js.JsXml__.enode = new EReg("^<([a-zA-Z0-9:_-]+)","");
js.JsXml__.ecdata = new EReg("^<!\\[CDATA\\[","i");
js.JsXml__.edoctype = new EReg("^<!DOCTYPE","i");
js.JsXml__.eend = new EReg("^</([a-zA-Z0-9:_-]+)>","");
js.JsXml__.epcdata = new EReg("^[^<]+","");
js.JsXml__.ecomment = new EReg("^<!--","");
js.JsXml__.eprolog = new EReg("^<\\?[^\\?]+\\?>","");
js.JsXml__.eattribute = new EReg("^[ \\r\\n\\t]*([a-zA-Z0-9:_-]+)[ \\r\\n\\t]*=[ \\r\\n\\t]*\"([^\"]*)\"","");
js.JsXml__.eclose = new EReg("^[ \\r\\n\\t]*(>|(/>))","");
js.JsXml__.ecdata_end = new EReg("\\]\\]>","");
js.JsXml__.edoctype_elt = new EReg("[\\[|\\]>]","");
js.JsXml__.ecomment_end = new EReg("-->","");
js.BackForward.iframeInit = false;
js.BackForward.historyPos = 0;
LcConfig.NAME = "_cj_play";
LcConfig.FROM_WWW = ["www.cafejeux.com","skool.cafejeux.com","seb.cafejeux.com"];
LcConfig.FROM_DATA = ["data.cafejeux.com","skool.cafejeux.com","seb.cafejeux.com"];
haxe.Template.splitter = new EReg("(::[A-Za-z0-9_ ()&|!+=/><*.-]+::|\\$\\$([A-Za-z0-9_-]+)\\()","");
haxe.Template.expr_splitter = new EReg("(\\(|\\)|[!+=/><*.&|-]+)","");
haxe.Template.expr_trim = new EReg("^[ ]*([^ ]+)[ ]*$","");
haxe.Template.expr_int = new EReg("^[0-9]+$","");
haxe.Template.expr_float = new EReg("^([+-]?)(?=\\d|,\\d)\\d*(,\\d*)?([Ee]([+-]?\\d+))?$","");
haxe.Template.globals = Reflect.empty();
haxe.Timer.arr = new Array();
haxe.Unserializer.DEFAULT_RESOLVER = Type;
mt.js.Tip.defaultClass = "normalTip";
mt.js.Tip.tooltipId = "tooltip";
mt.js.Tip.tooltipContentId = "tooltipContent";
mt.js.Tip.minOffsetY = 23;
js.Lib.document = document;
js.Lib.window = window;
js.Lib.onerror = null;
js.XmlHttp.stop = false;
js.XmlHttp.lock = null;
js.XmlHttp.lockButton = null;
js.XmlHttp.queue = new List();
js.XmlHttp.divRoom = new Hash();
js.XmlHttp.urlForBack = null;
js.XmlHttp.tip_cache = new Hash();
js.Client.tpl_cache = new Hash();