var $hxClasses = $hxClasses || {},$estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	return proto;
}
var Common = $hxClasses["Common"] = function() { }
Common.__name__ = ["Common"];
Common.convertRound = function(c,e) {
	var v = c * e / 100;
	var ov = v;
	if(v < 40) return Math.ceil(v); else if(v < 400) return Math.round(v / 5) * 5; else if(v < 4000) return Math.round(v / 50) * 50; else if(v < 20000) return Math.round(v / 100) * 100; else if(v < 950000) return Math.round(v / 1000) * 1000; else return Math.round(v / 5000) * 5000;
}
var EReg = $hxClasses["EReg"] = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = ["EReg"];
EReg.prototype = {
	customReplace: function(s,f) {
		var buf = new StringBuf();
		while(true) {
			if(!this.match(s)) break;
			buf.b += Std.string(this.matchedLeft());
			buf.b += Std.string(f(this));
			s = this.matchedRight();
		}
		buf.b += Std.string(s);
		return buf.b;
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,split: function(s) {
		var d = "#__delim__#";
		return s.replace(this.r,d).split(d);
	}
	,matchedPos: function() {
		if(this.r.m == null) throw "No string matched";
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,matchedRight: function() {
		if(this.r.m == null) throw "No string matched";
		var sz = this.r.m.index + this.r.m[0].length;
		return this.r.s.substr(sz,this.r.s.length - sz);
	}
	,matchedLeft: function() {
		if(this.r.m == null) throw "No string matched";
		return this.r.s.substr(0,this.r.m.index);
	}
	,matched: function(n) {
		return this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:(function($this) {
			var $r;
			throw "EReg::matched";
			return $r;
		}(this));
	}
	,match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,r: null
	,__class__: EReg
}
var Editor = $hxClasses["Editor"] = function(data) {
	this.config = haxe.Unserializer.run(data);
	this.refresh = { latest : null, timestamp : 0., auto : true, changed : false};
	this.tqueue = new js.TimerQueue(1000);
	this.subcache = new Hash();
	this.content = this.config.name + "_content";
	this.preview = this.config.name + "_preview";
};
Editor.__name__ = ["Editor"];
Editor.normalize = function(name) {
	return new EReg("[^a-z0-9.]+","g").replace(name.toLowerCase(),"_");
}
Editor.isEmpty = function(s) {
	return s == null;
}
Editor.toggle = function(id) {
	var e = js.Lib.document.getElementById(id);
	if(e != null) e.style.display = e.style.display == "none"?"":"none";
	return false;
}
Editor.getElementPosition = function(o) {
	var ret = { x : 0, y : 0, width : o.offsetWidth, height : o.offsetHeight};
	var p = o;
	while(p != null) {
		if(p.offsetParent != null) {
			ret.x += p.offsetLeft - p.scrollLeft;
			ret.y += p.offsetTop - p.scrollTop;
		} else {
			ret.x += p.offsetLeft;
			ret.y += p.offsetTop;
		}
		p = p.offsetParent;
	}
	return ret;
}
Editor.makeSpans = function(t) {
	return new EReg("\n*\\[([A-Za-z0-9_ ]+)\\]\n*([^<>]*?)\n*\\[/\\1\\]\n*","").customReplace(t,function(r) {
		return "<div class=\"" + r.matched(1) + "\">" + Editor.makeSpans(r.matched(2)) + "</div>";
	});
}
Editor.prototype = {
	format: function(t) {
		this.uniqueId = 1;
		t = new EReg("\r\n?","g").replace(t,"\n");
		var me = this;
		var b = new StringBuf();
		var codes = new Array();
		t = new EReg("<code( [a-zA-Z0-9]+)?>([^\\0]*?)</code>","").customReplace(t,function(r) {
			var style = r.matched(1);
			var code = me.code(r.matched(2),style == null?null:HxOverrides.substr(style,1,null));
			codes.push(code);
			return "##CODE" + (codes.length - 1) + "##";
		});
		var div_open = new EReg("^\\[([A-Za-z0-9_ ]+)\\]$","");
		var div_close = new EReg("^\\[/([A-Za-z0-9_ ]+)\\]$","");
		var _g = 0, _g1 = new EReg("\n[ \t]*\n","g").split(t);
		while(_g < _g1.length) {
			var t1 = _g1[_g];
			++_g;
			var p = this.paragraph(t1);
			switch(HxOverrides.substr(p,0,3)) {
			case "<h1":case "<h2":case "<h3":case "<ul":case "<pr":case "##C":case "<sp":
				b.b += Std.string(p);
				break;
			default:
				if(div_open.match(p)) b.b += Std.string("<div class=\"" + div_open.matched(1) + "\">"); else if(div_close.match(p)) b.b += "</div>"; else {
					b.b += "<p>";
					b.b += Std.string(p);
					b.b += "</p>";
				}
			}
			b.b += "\n";
		}
		t = b.b;
		var r = new EReg("(<ul>)?(<li>)?\\[\\$([a-z]+):([a-zA-Z0-9_]+)\\]([^\\0]*?)\\[/\\$\\3:\\4\\](</li>)?(</ul>)?","");
		while(r.match(t)) {
			var tag = r.matched(4);
			var content = r.matched(5);
			var pre = { ul : !(r.matched(1) == null), li : !(r.matched(2) == null)};
			var post = { ul : !(r.matched(7) == null), li : !(r.matched(6) == null)};
			var before = (pre.ul?"<ul>":"") + (pre.li?"<li>":"");
			var after = (post.li?"</li>":"") + (post.ul?"</ul>":"");
			if(pre.ul && pre.li && post.ul && post.li && StringTools.startsWith(content,"</li>") && StringTools.endsWith(content,"<li>")) {
				before = "";
				after = "";
				content = "<ul>" + HxOverrides.substr(content,5,content.length - 9) + "</ul>";
			}
			var content1 = (function($this) {
				var $r;
				switch(r.matched(3)) {
				case "clic":
					$r = "<a href=\"#\" onclick=\"return Editor.toggle('" + tag + "')\">" + content + "</a>";
					break;
				case "id":
					$r = "<div id=\"" + tag + "\" style=\"display : none\">" + content + "</div>";
					break;
				default:
					$r = "Unknown script " + r.matched(3);
				}
				return $r;
			}(this));
			t = r.matchedLeft() + before + content1 + after + r.matchedRight();
		}
		var _g1 = 0, _g = codes.length;
		while(_g1 < _g) {
			var i = _g1++;
			t = StringTools.replace(t,"##CODE" + i + "##",codes[i]);
		}
		t = StringTools.replace(t,"><p>",">\n<p>");
		return t;
	}
	,paragraph: function(t) {
		var me = this;
		t = StringTools.htmlEscape(t).split("\"").join("&quot;");
		t = Editor.makeSpans(t);
		t = StringTools.replace(t,"\n","<br/>");
		t = new EReg("\\[\\[support\\|([^\\]]+)\\]\\]","g").replace(t,"<a class=\"big\" href=\"/box\">$1</a>");
		t = new EReg("\\[\\[box:([0-9]+)\\|([^\\]]+)\\]\\]","g").replace(t,"<a class=\"big\" href=\"/box/$1\">$2</a>");
		t = new EReg("\\[\\[help:([0-9]+)\\|([^\\]]+)\\]\\]","g").replace(t,"<a class=\"helplink\" href=\"/help/$1\">$2</a>");
		t = new EReg("\\[\\[helpcat:([0-9]+)\\|([^\\]]+)\\]\\]","g").replace(t,"<a class=\"helplink\" href=\"/help/category/$1\">$2</a>");
		t = new EReg("\\[\\[msg:([0-9]+)\\|([^\\]]+)\\]\\]","g").replace(t,"<a class=\"big\" href=\"/msg/$1\">$2</a>");
		t = new EReg("\\[\\[(https?:[^\\]\"]*?)\\|(.*?)\\]\\]","g").replace(t,"<a href=\"$1\" class=\"extern\" target=\"_blank\">$2</a>");
		t = new EReg("\\[\\[(https?:[^\\]\"]*?)\\]\\]","g").replace(t,"<a href=\"$1\" class=\"extern\" target=\"_blank\">$1</a>");
		t = new EReg("@(https?:[^\\]\"@:]+?):([0-9]+)x([0-9]+)(:[^@]+)?@","").customReplace(t,function(r) {
			var id = me.uniqueId++;
			var str = "<div class=\"swf\" id=\"swf_" + id + "\" style=\"width : " + r.matched(2) + "px\">[" + r.matched(1) + "]</div>";
			str += "<script type=\"text/javascript\" id=\"js_" + id + "\">";
			str += "var o = new js.SWFObject('" + r.matched(1) + "','swfobj_" + id + "'," + r.matched(2) + "," + r.matched(3) + ",'9','#FFFFFF');";
			str += "o.addParam('wmode','transparent');";
			var params = r.matched(4);
			if(!(params == null)) {
				params = Lambda.map(HxOverrides.substr(params,1,null).split("&amp;"),function(p) {
					return Lambda.map(p.split("="),StringTools.urlEncode).join("=");
				}).join("&");
				str += "o.addParam('FlashVars','" + params + "');";
			}
			str += "o.write('swf_" + id + "');";
			str += "</script>";
			return str;
		});
		t = new EReg("@(https?:[^\\]\"@]+?)@","g").replace(t,"<img src=\"$1\" alt=\"\" class=\"extern\"/>");
		t = new EReg("@([ A-Za-z0-9._-]+)@","g").replace(t,"<img src=\"/file/$1\" alt=\"$1\" class=\"intern\"/>");
		t = new EReg("@([ A-Za-z0-9._-]+):([0-9]+)x([0-9]+)(:[^@]+)?@","").customReplace(t,function(r) {
			var id = me.uniqueId++;
			var str = "<div class=\"swf\" id=\"swf_" + id + "\" style=\"width : " + r.matched(2) + "px\">[" + r.matched(1) + "]</div>";
			str += "<script type=\"text/javascript\" id=\"js_" + id + "\">";
			str += "var o = new js.SWFObject('/file/" + r.matched(1) + "','swfobj_" + id + "'," + r.matched(2) + "," + r.matched(3) + ",'9','#FFFFFF');";
			var params = r.matched(4);
			if(!(params == null)) {
				params = Lambda.map(HxOverrides.substr(params,1,null).split("&amp;"),function(p) {
					return Lambda.map(p.split("="),StringTools.urlEncode).join("=");
				}).join("&");
				str += "o.addParam('FlashVars','" + params + "');";
			}
			str += "o.write('swf_" + id + "');";
			str += "</script>";
			return str;
		});
		t = this.list(t);
		t = new EReg("__([^<>]*?)__","g").replace(t,"<span class=\"underline\">$1</span>");
		t = new EReg("\\*{1,2}([^<>]*?)\\*{1,2}","g").replace(t,"<b>$1</b>");
		t = new EReg("//([^<>]*?)//","g").replace(t,"<em>$1</em>");
		t = new EReg("''([^<>]*?)''","g").replace(t,"<code>$1</code>");
		return t;
	}
	,code: function(t,style) {
		var cl = style == null?"":" class=\"" + style + "\"";
		if(t.charAt(0) == "\n") t = HxOverrides.substr(t,1,null);
		if(t.charAt(t.length - 1) == "\n") t = HxOverrides.substr(t,0,t.length - 1);
		t = StringTools.replace(t,"\t","    ");
		t = StringTools.htmlEscape(t);
		switch(style) {
		case "xml":case "html":
			var me = this;
			t = new EReg("(&lt;/?)([a-zA-Z0-9:_]+)([^&]*?)(/?&gt;)","").customReplace(t,function(r) {
				var tag = r.matched(2);
				var attr = new EReg("([a-zA-Z0-9:_]+)=\"([^\"]*?)\"","g").replace(r.matched(3),"<span class=\"att\">$1</span><span class=\"kwd\">=</span><span class=\"string\">\"$2\"</span>");
				return "<span class=\"kwd\">" + r.matched(1) + "</span><span class=\"tag\">" + tag + "</span>" + attr + "<span class=\"kwd\">" + r.matched(4) + "</span>";
			});
			t = new EReg("(&lt;!--(.*?)--&gt;)","g").replace(t,"<span class=\"comment\">$1</span>");
			break;
		default:
		}
		return "<pre" + cl + ">" + t + "</pre>";
	}
	,list: function(t) {
		var r = new EReg("(^|<br/>)([ \t]+)\\* ","");
		if(!r.match(t)) return t;
		var b = new StringBuf();
		var spaces = r.matched(2);
		var pos = r.matchedPos();
		b.b += HxOverrides.substr(t,0,pos.pos);
		t = HxOverrides.substr(t,pos.pos + pos.len,null);
		b.b += "<ul>";
		var _g = 0, _g1 = new EReg("<br/>" + spaces + "\\* ","g").split(t);
		while(_g < _g1.length) {
			var x = _g1[_g];
			++_g;
			b.b += Std.string("<li>" + this.list(x) + "</li>");
		}
		b.b += "</ul>";
		return b.b;
	}
	,buttonAction: function(b) {
		var sel = new js.Selection(this.getDocument());
		var text = sel.get();
		if(text == "") text = b.text == null?this.config.text:b.text;
		sel.insert(b.left,text,b.right);
		this.updatePreview();
		return false;
	}
	,addButton: function(label,left,right,text) {
		if(right == null) right = left;
		this.config.buttons.push({ id : this.config.buttons.length, label : label, left : left, right : right, text : text});
	}
	,insertSpecialLink: function(t) {
		var sel = new js.Selection(this.getDocument());
		var text = sel.get();
		var l = HxOverrides.substr(t,0,t.indexOf("|"));
		var t1 = HxOverrides.substr(t,t.indexOf("|") + 1,null);
		if(text == "") text = t1;
		sel.insert("[[" + l + "|",text,"]]");
		this.updatePreview();
	}
	,insert: function(t) {
		var sel = new js.Selection(this.getDocument());
		var text = sel.get();
		sel.insert(t,text,"");
		this.updatePreview();
	}
	,uploadResult: function(url) {
		var sel = new js.Selection(this.getDocument());
		var text = this.uploadImage?"@" + url + "@":"{{" + url + "}}";
		sel.insert(sel.get(),text,"");
		this.updatePreview();
	}
	,uploadError: function(e) {
		js.Lib.alert(e);
	}
	,spanAction: function(title) {
		var span = js.Lib.window.prompt(title);
		if(span == null || !new EReg("^([A-Za-z0-9_])+$","").match(span)) return false;
		var sel = new js.Selection(this.getDocument());
		var text = sel.get();
		if(text == "") text = this.config.text;
		sel.insert("[" + span + "]",text,"[/" + span + "]");
		this.updatePreview();
		return false;
	}
	,displayUpload: function(target,title,pattern,img) {
		var params = { title : title, pattern : pattern, url : "/wiki/upload", bgcolor : 0, fgcolor : 16777215, color : 32768, object : this.config.name, sid : this.config.sid};
		var swf = new js.SWFObject("/upload.swf","swf_upload","100%","100%","9","#FFFFFF");
		var params1 = Lambda.map(Reflect.fields(params),function(k) {
			return k + "=" + StringTools.urlEncode(Reflect.field(params,k));
		});
		swf.addParam("AllowScriptAccess","always");
		swf.addParam("wmode","transparent");
		swf.addParam("FlashVars",params1.join("&"));
		swf.write(target);
		this.uploadImage = img;
		var me = this;
		var ctx = new haxe.remoting.Context();
		ctx.addObject("api",{ uploadResult : function(url) {
			haxe.Timer.delay((function(f,a1) {
				return function() {
					return f(a1);
				};
			})($bind(me,me.uploadResult),url),1);
		}, uploadError : $bind(this,this.uploadError)});
		haxe.remoting.ExternalConnection.flashConnect(this.config.name,"upload",ctx);
	}
	,initUpload: function(button,title,pattern,img) {
		var loaded = false;
		var but = js.Lib.document.getElementById(button);
		var me = this;
		var target = button + "_swf";
		js.Lib.document.write("<div id=\"" + target + "\"></div>");
		but.onmouseover = function(_) {
			if(loaded) return;
			loaded = true;
			var doc = js.Lib.document;
			var win = js.Lib.window;
			var swf = doc.getElementById(target);
			swf.style.position = "absolute";
			swf.style.left = "0px";
			swf.style.top = "0px";
			var p = Editor.getElementPosition(but);
			swf.style.width = p.width + "px";
			swf.style.height = p.height + "px";
			swf.style.zIndex = 10;
			var p2 = Editor.getElementPosition(swf);
			swf.style.top = p.y - p2.y + "px";
			swf.style.left = p.x - p2.x + "px";
			me.displayUpload(target,title,pattern,img);
		};
	}
	,handleTab: function(e) {
		if(e.keyCode != 9 || e.altKey || e.ctrlKey || e.shiftKey) return true;
		var sel = new js.Selection(this.getDocument());
		sel.insert("\t","","");
		return false;
	}
	,updatePreview: function() {
		var prev = js.Lib.document.getElementById(this.preview);
		var start = haxe.Timer.stamp();
		var data = this.getDocument().value;
		if(data == this.refresh.latest) return false;
		if(!this.refresh.auto && start - this.refresh.timestamp < .5) {
			this.refresh.timestamp = start;
			if(this.refresh.changed) return false;
			var me = this;
			this.refresh.changed = true;
			this.tqueue.add(function() {
				me.refresh.changed = false;
				me.updatePreview();
			});
			return false;
		}
		this.refresh.changed = false;
		this.refresh.latest = data;
		prev.innerHTML = this.format(data);
		if(this.previewBlock != null) js.Lib.document.getElementById(this.previewBlock).style.display = StringTools.trim(data) == ""?"none":"";
		if(haxe.Timer.stamp() - start > 0.15) this.refresh.auto = false;
		var _g1 = 1, _g = this.uniqueId;
		while(_g1 < _g) {
			var i = _g1++;
			var e = js.Lib.document.getElementById("js_" + i);
			if(e != null) eval(e.innerHTML);
		}
		this.refresh.timestamp = haxe.Timer.stamp();
		return false;
	}
	,getDocument: function() {
		return js.Lib.document.getElementsByName(this.content)[0];
	}
	,refresh: null
	,tqueue: null
	,uploadImage: null
	,previewBlock: null
	,subcache: null
	,uniqueId: null
	,config: null
	,preview: null
	,content: null
	,__class__: Editor
}
var Hash = $hxClasses["Hash"] = function() {
	this.h = { };
};
Hash.__name__ = ["Hash"];
Hash.prototype = {
	toString: function() {
		var s = new StringBuf();
		s.b += "{";
		var it = this.keys();
		while( it.hasNext() ) {
			var i = it.next();
			s.b += Std.string(i);
			s.b += " => ";
			s.b += Std.string(Std.string(this.get(i)));
			if(it.hasNext()) s.b += ", ";
		}
		s.b += "}";
		return s.b;
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,h: null
	,__class__: Hash
}
var HxOverrides = $hxClasses["HxOverrides"] = function() { }
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d < 10?"0" + d:"" + d) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
}
HxOverrides.strDate = function(s) {
	switch(s.length) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k = s.split("-");
		return new Date(k[0],k[1] - 1,k[2],0,0,0);
	case 19:
		var k = s.split(" ");
		var y = k[0].split("-");
		var t = k[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw "Invalid date format : " + s;
	}
}
HxOverrides.cca = function(s,index) {
	var x = s.cca(index);
	if(x != x) return undefined;
	return x;
}
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
}
HxOverrides.remove = function(a,obj) {
	var i = 0;
	var l = a.length;
	while(i < l) {
		if(a[i] == obj) {
			a.splice(i,1);
			return true;
		}
		i++;
	}
	return false;
}
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var IntHash = $hxClasses["IntHash"] = function() {
	this.h = { };
};
IntHash.__name__ = ["IntHash"];
IntHash.prototype = {
	toString: function() {
		var s = new StringBuf();
		s.b += "{";
		var it = this.keys();
		while( it.hasNext() ) {
			var i = it.next();
			s.b += Std.string(i);
			s.b += " => ";
			s.b += Std.string(Std.string(this.get(i)));
			if(it.hasNext()) s.b += ", ";
		}
		s.b += "}";
		return s.b;
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i];
		}};
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,get: function(key) {
		return this.h[key];
	}
	,set: function(key,value) {
		this.h[key] = value;
	}
	,h: null
	,__class__: IntHash
}
var IntIter = $hxClasses["IntIter"] = function(min,max) {
	this.min = min;
	this.max = max;
};
IntIter.__name__ = ["IntIter"];
IntIter.prototype = {
	next: function() {
		return this.min++;
	}
	,hasNext: function() {
		return this.min < this.max;
	}
	,max: null
	,min: null
	,__class__: IntIter
}
var Lambda = $hxClasses["Lambda"] = function() { }
Lambda.__name__ = ["Lambda"];
Lambda.array = function(it) {
	var a = new Array();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
}
Lambda.list = function(it) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		l.add(i);
	}
	return l;
}
Lambda.map = function(it,f) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(x));
	}
	return l;
}
Lambda.mapi = function(it,f) {
	var l = new List();
	var i = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(i++,x));
	}
	return l;
}
Lambda.has = function(it,elt,cmp) {
	if(cmp == null) {
		var $it0 = $iterator(it)();
		while( $it0.hasNext() ) {
			var x = $it0.next();
			if(x == elt) return true;
		}
	} else {
		var $it1 = $iterator(it)();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(cmp(x,elt)) return true;
		}
	}
	return false;
}
Lambda.exists = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
}
Lambda.foreach = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(!f(x)) return false;
	}
	return true;
}
Lambda.iter = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		f(x);
	}
}
Lambda.filter = function(it,f) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) l.add(x);
	}
	return l;
}
Lambda.fold = function(it,f,first) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		first = f(x,first);
	}
	return first;
}
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = $iterator(it)();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = $iterator(it)();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
}
Lambda.empty = function(it) {
	return !$iterator(it)().hasNext();
}
Lambda.indexOf = function(it,v) {
	var i = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var v2 = $it0.next();
		if(v == v2) return i;
		i++;
	}
	return -1;
}
Lambda.concat = function(a,b) {
	var l = new List();
	var $it0 = $iterator(a)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(x);
	}
	var $it1 = $iterator(b)();
	while( $it1.hasNext() ) {
		var x = $it1.next();
		l.add(x);
	}
	return l;
}
var List = $hxClasses["List"] = function() {
	this.length = 0;
};
List.__name__ = ["List"];
List.prototype = {
	map: function(f) {
		var b = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			b.add(f(v));
		}
		return b;
	}
	,filter: function(f) {
		var l2 = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			if(f(v)) l2.add(v);
		}
		return l2;
	}
	,join: function(sep) {
		var s = new StringBuf();
		var first = true;
		var l = this.h;
		while(l != null) {
			if(first) first = false; else s.b += Std.string(sep);
			s.b += Std.string(l[0]);
			l = l[1];
		}
		return s.b;
	}
	,toString: function() {
		var s = new StringBuf();
		var first = true;
		var l = this.h;
		s.b += "{";
		while(l != null) {
			if(first) first = false; else s.b += ", ";
			s.b += Std.string(Std.string(l[0]));
			l = l[1];
		}
		s.b += "}";
		return s.b;
	}
	,iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l[0] == v) {
				if(prev == null) this.h = l[1]; else prev[1] = l[1];
				if(this.q == l) this.q = prev;
				this.length--;
				return true;
			}
			prev = l;
			l = l[1];
		}
		return false;
	}
	,clear: function() {
		this.h = null;
		this.q = null;
		this.length = 0;
	}
	,isEmpty: function() {
		return this.h == null;
	}
	,pop: function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		if(this.h == null) this.q = null;
		this.length--;
		return x;
	}
	,last: function() {
		return this.q == null?null:this.q[0];
	}
	,first: function() {
		return this.h == null?null:this.h[0];
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,length: null
	,q: null
	,h: null
	,__class__: List
}
var Reflect = $hxClasses["Reflect"] = function() { }
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.setField = function(o,field,value) {
	o[field] = value;
}
Reflect.getProperty = function(o,field) {
	var tmp;
	return o == null?null:o.__properties__ && (tmp = o.__properties__["get_" + field])?o[tmp]():o[field];
}
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
}
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
}
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
}
Reflect.compare = function(a,b) {
	return a == b?0:a > b?1:-1;
}
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return t == "string" || t == "object" && !v.__enum__ || t == "function" && (v.__name__ || v.__ename__);
}
Reflect.deleteField = function(o,f) {
	if(!Reflect.hasField(o,f)) return false;
	delete(o[f]);
	return true;
}
Reflect.copy = function(o) {
	var o2 = { };
	var _g = 0, _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		o2[f] = Reflect.field(o,f);
	}
	return o2;
}
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = Array.prototype.slice.call(arguments);
		return f(a);
	};
}
var Std = $hxClasses["Std"] = function() { }
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	return x | 0;
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.random = function(x) {
	return x <= 0?0:Math.floor(Math.random() * x);
}
var StringBuf = $hxClasses["StringBuf"] = function() {
	this.b = "";
};
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	toString: function() {
		return this.b;
	}
	,addSub: function(s,pos,len) {
		this.b += HxOverrides.substr(s,pos,len);
	}
	,addChar: function(c) {
		this.b += String.fromCharCode(c);
	}
	,add: function(x) {
		this.b += Std.string(x);
	}
	,b: null
	,__class__: StringBuf
}
var StringTools = $hxClasses["StringTools"] = function() { }
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
StringTools.htmlEscape = function(s,quotes) {
	s = s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
	return quotes?s.split("\"").join("&quot;").split("'").join("&#039;"):s;
}
StringTools.htmlUnescape = function(s) {
	return s.split("&gt;").join(">").split("&lt;").join("<").split("&quot;").join("\"").split("&#039;").join("'").split("&amp;").join("&");
}
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
}
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && HxOverrides.substr(s,slen - elen,elen) == end;
}
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c >= 9 && c <= 13 || c == 32;
}
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
}
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
}
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
}
StringTools.rpad = function(s,c,l) {
	var sl = s.length;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		s += HxOverrides.substr(c,0,l - sl);
		sl = l;
	} else {
		s += c;
		sl += cl;
	}
	return s;
}
StringTools.lpad = function(s,c,l) {
	var ns = "";
	var sl = s.length;
	if(sl >= l) return s;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		ns += HxOverrides.substr(c,0,l - sl);
		sl = l;
	} else {
		ns += c;
		sl += cl;
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
StringTools.fastCodeAt = function(s,index) {
	return s.cca(index);
}
StringTools.isEOF = function(c) {
	return c != c;
}
var ValueType = $hxClasses["ValueType"] = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] }
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = $hxClasses["Type"] = function() { }
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
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
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
}
Type.createInstance = function(cl,args) {
	switch(args.length) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
}
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
}
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
}
Type.createEnumIndex = function(e,index,params) {
	var c = e.__constructs__[index];
	if(c == null) throw index + " is not a valid enum constructor index";
	return Type.createEnum(e,c,params);
}
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	HxOverrides.remove(a,"__class__");
	HxOverrides.remove(a,"__properties__");
	return a;
}
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	HxOverrides.remove(a,"__name__");
	HxOverrides.remove(a,"__interfaces__");
	HxOverrides.remove(a,"__properties__");
	HxOverrides.remove(a,"__super__");
	HxOverrides.remove(a,"prototype");
	return a;
}
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
}
Type["typeof"] = function(v) {
	switch(typeof(v)) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
}
Type.enumEq = function(a,b) {
	if(a == b) return true;
	try {
		if(a[0] != b[0]) return false;
		var _g1 = 2, _g = a.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!Type.enumEq(a[i],b[i])) return false;
		}
		var e = a.__enum__;
		if(e != b.__enum__ || e == null) return false;
	} catch( e ) {
		return false;
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
Type.allEnums = function(e) {
	var all = [];
	var cst = e.__constructs__;
	var _g = 0;
	while(_g < cst.length) {
		var c = cst[_g];
		++_g;
		var v = Reflect.field(e,c);
		if(!Reflect.isFunction(v)) all.push(v);
	}
	return all;
}
var Xml = $hxClasses["Xml"] = function() {
};
Xml.__name__ = ["Xml"];
Xml.Element = null;
Xml.PCData = null;
Xml.CData = null;
Xml.Comment = null;
Xml.DocType = null;
Xml.Prolog = null;
Xml.Document = null;
Xml.parse = function(str) {
	return haxe.xml.Parser.parse(str);
}
Xml.createElement = function(name) {
	var r = new Xml();
	r.nodeType = Xml.Element;
	r._children = new Array();
	r._attributes = new Hash();
	r.set_nodeName(name);
	return r;
}
Xml.createPCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.PCData;
	r.set_nodeValue(data);
	return r;
}
Xml.createCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.CData;
	r.set_nodeValue(data);
	return r;
}
Xml.createComment = function(data) {
	var r = new Xml();
	r.nodeType = Xml.Comment;
	r.set_nodeValue(data);
	return r;
}
Xml.createDocType = function(data) {
	var r = new Xml();
	r.nodeType = Xml.DocType;
	r.set_nodeValue(data);
	return r;
}
Xml.createProlog = function(data) {
	var r = new Xml();
	r.nodeType = Xml.Prolog;
	r.set_nodeValue(data);
	return r;
}
Xml.createDocument = function() {
	var r = new Xml();
	r.nodeType = Xml.Document;
	r._children = new Array();
	return r;
}
Xml.prototype = {
	toString: function() {
		if(this.nodeType == Xml.PCData) return this._nodeValue;
		if(this.nodeType == Xml.CData) return "<![CDATA[" + this._nodeValue + "]]>";
		if(this.nodeType == Xml.Comment) return "<!--" + this._nodeValue + "-->";
		if(this.nodeType == Xml.DocType) return "<!DOCTYPE " + this._nodeValue + ">";
		if(this.nodeType == Xml.Prolog) return "<?" + this._nodeValue + "?>";
		var s = new StringBuf();
		if(this.nodeType == Xml.Element) {
			s.b += "<";
			s.b += Std.string(this._nodeName);
			var $it0 = this._attributes.keys();
			while( $it0.hasNext() ) {
				var k = $it0.next();
				s.b += " ";
				s.b += Std.string(k);
				s.b += "=\"";
				s.b += Std.string(this._attributes.get(k));
				s.b += "\"";
			}
			if(this._children.length == 0) {
				s.b += "/>";
				return s.b;
			}
			s.b += ">";
		}
		var $it1 = this.iterator();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			s.b += Std.string(x.toString());
		}
		if(this.nodeType == Xml.Element) {
			s.b += "</";
			s.b += Std.string(this._nodeName);
			s.b += ">";
		}
		return s.b;
	}
	,insertChild: function(x,pos) {
		if(this._children == null) throw "bad nodetype";
		if(x._parent != null) HxOverrides.remove(x._parent._children,x);
		x._parent = this;
		this._children.splice(pos,0,x);
	}
	,removeChild: function(x) {
		if(this._children == null) throw "bad nodetype";
		var b = HxOverrides.remove(this._children,x);
		if(b) x._parent = null;
		return b;
	}
	,addChild: function(x) {
		if(this._children == null) throw "bad nodetype";
		if(x._parent != null) HxOverrides.remove(x._parent._children,x);
		x._parent = this;
		this._children.push(x);
	}
	,firstElement: function() {
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
	,firstChild: function() {
		if(this._children == null) throw "bad nodetype";
		return this._children[0];
	}
	,elementsNamed: function(name) {
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
		}};
	}
	,elements: function() {
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
		}};
	}
	,iterator: function() {
		if(this._children == null) throw "bad nodetype";
		return { cur : 0, x : this._children, hasNext : function() {
			return this.cur < this.x.length;
		}, next : function() {
			return this.x[this.cur++];
		}};
	}
	,attributes: function() {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.keys();
	}
	,exists: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.exists(att);
	}
	,remove: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		this._attributes.remove(att);
	}
	,set: function(att,value) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		this._attributes.set(att,value);
	}
	,get: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.get(att);
	}
	,get_parent: function() {
		return this._parent;
	}
	,set_nodeValue: function(v) {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue = v;
	}
	,get_nodeValue: function() {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue;
	}
	,set_nodeName: function(n) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName = n;
	}
	,get_nodeName: function() {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName;
	}
	,_parent: null
	,_children: null
	,_attributes: null
	,_nodeValue: null
	,_nodeName: null
	,parent: null
	,nodeType: null
	,__class__: Xml
	,__properties__: {set_nodeName:"set_nodeName",get_nodeName:"get_nodeName",set_nodeValue:"set_nodeValue",get_nodeValue:"get_nodeValue",get_parent:"get_parent"}
}
var haxe = haxe || {}
haxe.Http = $hxClasses["haxe.Http"] = function(url) {
	this.url = url;
	this.headers = new Hash();
	this.params = new Hash();
	this.async = true;
};
haxe.Http.__name__ = ["haxe","Http"];
haxe.Http.requestUrl = function(url) {
	var h = new haxe.Http(url);
	h.async = false;
	var r = null;
	h.onData = function(d) {
		r = d;
	};
	h.onError = function(e) {
		throw e;
	};
	h.request(false);
	return r;
}
haxe.Http.prototype = {
	onStatus: function(status) {
	}
	,onError: function(msg) {
	}
	,onData: function(data) {
	}
	,request: function(post) {
		var me = this;
		var r = new js.XMLHttpRequest();
		var onreadystatechange = function() {
			if(r.readyState != 4) return;
			var s = (function($this) {
				var $r;
				try {
					$r = r.status;
				} catch( e ) {
					$r = null;
				}
				return $r;
			}(this));
			if(s == undefined) s = null;
			if(s != null) me.onStatus(s);
			if(s != null && s >= 200 && s < 400) me.onData(r.responseText); else switch(s) {
			case null: case undefined:
				me.onError("Failed to connect or resolve host");
				break;
			case 12029:
				me.onError("Failed to connect to host");
				break;
			case 12007:
				me.onError("Unknown host");
				break;
			default:
				me.onError("Http Error #" + r.status);
			}
		};
		if(this.async) r.onreadystatechange = onreadystatechange;
		var uri = this.postData;
		if(uri != null) post = true; else {
			var $it0 = this.params.keys();
			while( $it0.hasNext() ) {
				var p = $it0.next();
				if(uri == null) uri = ""; else uri += "&";
				uri += StringTools.urlEncode(p) + "=" + StringTools.urlEncode(this.params.get(p));
			}
		}
		try {
			if(post) r.open("POST",this.url,this.async); else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question?"?":"&") + uri,this.async);
				uri = null;
			} else r.open("GET",this.url,this.async);
		} catch( e ) {
			this.onError(e.toString());
			return;
		}
		if(this.headers.get("Content-Type") == null && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		var $it1 = this.headers.keys();
		while( $it1.hasNext() ) {
			var h = $it1.next();
			r.setRequestHeader(h,this.headers.get(h));
		}
		r.send(uri);
		if(!this.async) onreadystatechange();
	}
	,setPostData: function(data) {
		this.postData = data;
	}
	,setParameter: function(param,value) {
		this.params.set(param,value);
	}
	,setHeader: function(header,value) {
		this.headers.set(header,value);
	}
	,params: null
	,headers: null
	,postData: null
	,async: null
	,url: null
	,__class__: haxe.Http
}
haxe.Log = $hxClasses["haxe.Log"] = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Serializer = $hxClasses["haxe.Serializer"] = function() {
	this.buf = new StringBuf();
	this.cache = new Array();
	this.useCache = haxe.Serializer.USE_CACHE;
	this.useEnumIndex = haxe.Serializer.USE_ENUM_INDEX;
	this.shash = new Hash();
	this.scount = 0;
};
haxe.Serializer.__name__ = ["haxe","Serializer"];
haxe.Serializer.run = function(v) {
	var s = new haxe.Serializer();
	s.serialize(v);
	return s.toString();
}
haxe.Serializer.prototype = {
	serializeException: function(e) {
		this.buf.b += "x";
		this.serialize(e);
	}
	,serialize: function(v) {
		var $e = (Type["typeof"](v));
		switch( $e[1] ) {
		case 0:
			this.buf.b += "n";
			break;
		case 1:
			if(v == 0) {
				this.buf.b += "z";
				return;
			}
			this.buf.b += "i";
			this.buf.b += Std.string(v);
			break;
		case 2:
			if(Math.isNaN(v)) this.buf.b += "k"; else if(!Math.isFinite(v)) this.buf.b += Std.string(v < 0?"m":"p"); else {
				this.buf.b += "d";
				this.buf.b += Std.string(v);
			}
			break;
		case 3:
			this.buf.b += Std.string(v?"t":"f");
			break;
		case 6:
			var c = $e[2];
			if(c == String) {
				this.serializeString(v);
				return;
			}
			if(this.useCache && this.serializeRef(v)) return;
			switch(c) {
			case Array:
				var ucount = 0;
				this.buf.b += "a";
				var l = v.length;
				var _g = 0;
				while(_g < l) {
					var i = _g++;
					if(v[i] == null) ucount++; else {
						if(ucount > 0) {
							if(ucount == 1) this.buf.b += "n"; else {
								this.buf.b += "u";
								this.buf.b += Std.string(ucount);
							}
							ucount = 0;
						}
						this.serialize(v[i]);
					}
				}
				if(ucount > 0) {
					if(ucount == 1) this.buf.b += "n"; else {
						this.buf.b += "u";
						this.buf.b += Std.string(ucount);
					}
				}
				this.buf.b += "h";
				break;
			case List:
				this.buf.b += "l";
				var v1 = v;
				var $it0 = v1.iterator();
				while( $it0.hasNext() ) {
					var i = $it0.next();
					this.serialize(i);
				}
				this.buf.b += "h";
				break;
			case Date:
				var d = v;
				this.buf.b += "v";
				this.buf.b += Std.string(HxOverrides.dateStr(d));
				break;
			case Hash:
				this.buf.b += "b";
				var v1 = v;
				var $it1 = v1.keys();
				while( $it1.hasNext() ) {
					var k = $it1.next();
					this.serializeString(k);
					this.serialize(v1.get(k));
				}
				this.buf.b += "h";
				break;
			case IntHash:
				this.buf.b += "q";
				var v1 = v;
				var $it2 = v1.keys();
				while( $it2.hasNext() ) {
					var k = $it2.next();
					this.buf.b += ":";
					this.buf.b += Std.string(k);
					this.serialize(v1.get(k));
				}
				this.buf.b += "h";
				break;
			case haxe.io.Bytes:
				var v1 = v;
				var i = 0;
				var max = v1.length - 2;
				var charsBuf = new StringBuf();
				var b64 = haxe.Serializer.BASE64;
				while(i < max) {
					var b1 = v1.b[i++];
					var b2 = v1.b[i++];
					var b3 = v1.b[i++];
					charsBuf.b += Std.string(b64.charAt(b1 >> 2));
					charsBuf.b += Std.string(b64.charAt((b1 << 4 | b2 >> 4) & 63));
					charsBuf.b += Std.string(b64.charAt((b2 << 2 | b3 >> 6) & 63));
					charsBuf.b += Std.string(b64.charAt(b3 & 63));
				}
				if(i == max) {
					var b1 = v1.b[i++];
					var b2 = v1.b[i++];
					charsBuf.b += Std.string(b64.charAt(b1 >> 2));
					charsBuf.b += Std.string(b64.charAt((b1 << 4 | b2 >> 4) & 63));
					charsBuf.b += Std.string(b64.charAt(b2 << 2 & 63));
				} else if(i == max + 1) {
					var b1 = v1.b[i++];
					charsBuf.b += Std.string(b64.charAt(b1 >> 2));
					charsBuf.b += Std.string(b64.charAt(b1 << 4 & 63));
				}
				var chars = charsBuf.b;
				this.buf.b += "s";
				this.buf.b += Std.string(chars.length);
				this.buf.b += ":";
				this.buf.b += Std.string(chars);
				break;
			default:
				this.cache.pop();
				if(v.hxSerialize != null) {
					this.buf.b += "C";
					this.serializeString(Type.getClassName(c));
					this.cache.push(v);
					v.hxSerialize(this);
					this.buf.b += "g";
				} else {
					this.buf.b += "c";
					this.serializeString(Type.getClassName(c));
					this.cache.push(v);
					this.serializeFields(v);
				}
			}
			break;
		case 4:
			if(this.useCache && this.serializeRef(v)) return;
			this.buf.b += "o";
			this.serializeFields(v);
			break;
		case 7:
			var e = $e[2];
			if(this.useCache && this.serializeRef(v)) return;
			this.cache.pop();
			this.buf.b += Std.string(this.useEnumIndex?"j":"w");
			this.serializeString(Type.getEnumName(e));
			if(this.useEnumIndex) {
				this.buf.b += ":";
				this.buf.b += Std.string(v[1]);
			} else this.serializeString(v[0]);
			this.buf.b += ":";
			var l = v.length;
			this.buf.b += Std.string(l - 2);
			var _g = 2;
			while(_g < l) {
				var i = _g++;
				this.serialize(v[i]);
			}
			this.cache.push(v);
			break;
		case 5:
			throw "Cannot serialize function";
			break;
		default:
			throw "Cannot serialize " + Std.string(v);
		}
	}
	,serializeFields: function(v) {
		var _g = 0, _g1 = Reflect.fields(v);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			this.serializeString(f);
			this.serialize(Reflect.field(v,f));
		}
		this.buf.b += "g";
	}
	,serializeRef: function(v) {
		var vt = typeof(v);
		var _g1 = 0, _g = this.cache.length;
		while(_g1 < _g) {
			var i = _g1++;
			var ci = this.cache[i];
			if(typeof(ci) == vt && ci == v) {
				this.buf.b += "r";
				this.buf.b += Std.string(i);
				return true;
			}
		}
		this.cache.push(v);
		return false;
	}
	,serializeString: function(s) {
		var x = this.shash.get(s);
		if(x != null) {
			this.buf.b += "R";
			this.buf.b += Std.string(x);
			return;
		}
		this.shash.set(s,this.scount++);
		this.buf.b += "y";
		s = StringTools.urlEncode(s);
		this.buf.b += Std.string(s.length);
		this.buf.b += ":";
		this.buf.b += Std.string(s);
	}
	,toString: function() {
		return this.buf.b;
	}
	,useEnumIndex: null
	,useCache: null
	,scount: null
	,shash: null
	,cache: null
	,buf: null
	,__class__: haxe.Serializer
}
haxe.Timer = $hxClasses["haxe.Timer"] = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
}
haxe.Timer.measure = function(f,pos) {
	var t0 = haxe.Timer.stamp();
	var r = f();
	haxe.Log.trace(haxe.Timer.stamp() - t0 + "s",pos);
	return r;
}
haxe.Timer.stamp = function() {
	return new Date().getTime() / 1000;
}
haxe.Timer.prototype = {
	run: function() {
	}
	,stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,id: null
	,__class__: haxe.Timer
}
haxe.Unserializer = $hxClasses["haxe.Unserializer"] = function(buf) {
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = new Array();
	this.cache = new Array();
	var r = haxe.Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe.Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
};
haxe.Unserializer.__name__ = ["haxe","Unserializer"];
haxe.Unserializer.initCodes = function() {
	var codes = new Array();
	var _g1 = 0, _g = haxe.Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe.Unserializer.BASE64.cca(i)] = i;
	}
	return codes;
}
haxe.Unserializer.run = function(v) {
	return new haxe.Unserializer(v).unserialize();
}
haxe.Unserializer.prototype = {
	unserialize: function() {
		switch(this.buf.cca(this.pos++)) {
		case 110:
			return null;
		case 116:
			return true;
		case 102:
			return false;
		case 122:
			return 0;
		case 105:
			return this.readDigits();
		case 100:
			var p1 = this.pos;
			while(true) {
				var c = this.buf.cca(this.pos);
				if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
			}
			return Std.parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
		case 121:
			var len = this.readDigits();
			if(this.buf.cca(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid string length";
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = StringTools.urlDecode(s);
			this.scache.push(s);
			return s;
		case 107:
			return Math.NaN;
		case 109:
			return Math.NEGATIVE_INFINITY;
		case 112:
			return Math.POSITIVE_INFINITY;
		case 97:
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
					a[a.length + n - 1] = null;
				} else a.push(this.unserialize());
			}
			return a;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 114:
			var n = this.readDigits();
			if(n < 0 || n >= this.cache.length) throw "Invalid reference";
			return this.cache[n];
		case 82:
			var n = this.readDigits();
			if(n < 0 || n >= this.scache.length) throw "Invalid string reference";
			return this.scache[n];
		case 120:
			throw this.unserialize();
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o = Type.createEmptyInstance(cl);
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 119:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) throw "Enum not found " + name;
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) throw "Enum not found " + name;
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl)[index];
			if(tag == null) throw "Unknown enum index " + name + "@" + index;
			var e = this.unserializeEnum(edecl,tag);
			this.cache.push(e);
			return e;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf = this.buf;
			while(this.buf.cca(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new Hash();
			this.cache.push(h);
			var buf = this.buf;
			while(this.buf.cca(this.pos) != 104) {
				var s = this.unserialize();
				h.set(s,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
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
		case 118:
			var d = HxOverrides.strDate(HxOverrides.substr(this.buf,this.pos,19));
			this.cache.push(d);
			this.pos += 19;
			return d;
		case 115:
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
			var size = (len >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i + (len - rest);
			var bytes = haxe.io.Bytes.alloc(size);
			var bpos = 0;
			while(i < max) {
				var c1 = codes[buf.cca(i++)];
				var c2 = codes[buf.cca(i++)];
				bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
				var c3 = codes[buf.cca(i++)];
				bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
				var c4 = codes[buf.cca(i++)];
				bytes.b[bpos++] = (c3 << 6 | c4) & 255;
			}
			if(rest >= 2) {
				var c1 = codes[buf.cca(i++)];
				var c2 = codes[buf.cca(i++)];
				bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
				if(rest == 3) {
					var c3 = codes[buf.cca(i++)];
					bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
				}
			}
			this.pos += len;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o = Type.createEmptyInstance(cl);
			this.cache.push(o);
			o.hxUnserialize(this);
			if(this.buf.cca(this.pos++) != 103) throw "Invalid custom data";
			return o;
		default:
		}
		this.pos--;
		throw "Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.buf.cca(this.pos++) != 58) throw "Invalid enum format";
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = new Array();
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw "Invalid object";
			if(this.buf.cca(this.pos) == 103) break;
			var k = this.unserialize();
			if(!js.Boot.__instanceof(k,String)) throw "Invalid object key";
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.cca(this.pos);
			if(c != c) break;
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
	,get: function(p) {
		return this.buf.cca(p);
	}
	,getResolver: function() {
		return this.resolver;
	}
	,setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_) {
			return null;
		}}; else this.resolver = r;
	}
	,resolver: null
	,scache: null
	,cache: null
	,length: null
	,pos: null
	,buf: null
	,__class__: haxe.Unserializer
}
haxe.Utf8 = $hxClasses["haxe.Utf8"] = function(size) {
	this.__b = "";
};
haxe.Utf8.__name__ = ["haxe","Utf8"];
haxe.Utf8.iter = function(s,chars) {
	var _g1 = 0, _g = s.length;
	while(_g1 < _g) {
		var i = _g1++;
		chars(HxOverrides.cca(s,i));
	}
}
haxe.Utf8.encode = function(s) {
	throw "Not implemented";
	return s;
}
haxe.Utf8.decode = function(s) {
	throw "Not implemented";
	return s;
}
haxe.Utf8.charCodeAt = function(s,index) {
	return HxOverrides.cca(s,index);
}
haxe.Utf8.validate = function(s) {
	return true;
}
haxe.Utf8.compare = function(a,b) {
	return a > b?1:a == b?0:-1;
}
haxe.Utf8.sub = function(s,pos,len) {
	return HxOverrides.substr(s,pos,len);
}
haxe.Utf8.prototype = {
	toString: function() {
		return this.__b;
	}
	,addChar: function(c) {
		this.__b += String.fromCharCode(c);
	}
	,__b: null
	,__class__: haxe.Utf8
}
if(!haxe.io) haxe.io = {}
haxe.io.Bytes = $hxClasses["haxe.io.Bytes"] = function(length,b) {
	this.length = length;
	this.b = b;
};
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
}
haxe.io.Bytes.ofString = function(s) {
	var a = new Array();
	var _g1 = 0, _g = s.length;
	while(_g1 < _g) {
		var i = _g1++;
		var c = s.cca(i);
		if(c <= 127) a.push(c); else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe.io.Bytes(a.length,a);
}
haxe.io.Bytes.ofData = function(b) {
	return new haxe.io.Bytes(b.length,b);
}
haxe.io.Bytes.fastGet = function(b,pos) {
	return b[pos];
}
haxe.io.Bytes.prototype = {
	getData: function() {
		return this.b;
	}
	,toHex: function() {
		var s = new StringBuf();
		var chars = [];
		var str = "0123456789abcdef";
		var _g1 = 0, _g = str.length;
		while(_g1 < _g) {
			var i = _g1++;
			chars.push(HxOverrides.cca(str,i));
		}
		var _g1 = 0, _g = this.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = this.b[i];
			s.b += String.fromCharCode(chars[c >> 4]);
			s.b += String.fromCharCode(chars[c & 15]);
		}
		return s.b;
	}
	,toString: function() {
		return this.readString(0,this.length);
	}
	,readString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) break;
				s += fcc(c);
			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c2 = b[i++];
				var c3 = b[i++];
				s += fcc((c & 15) << 18 | (c2 & 127) << 12 | c3 << 6 & 127 | b[i++] & 127);
			}
		}
		return s;
	}
	,compare: function(other) {
		var b1 = this.b;
		var b2 = other.b;
		var len = this.length < other.length?this.length:other.length;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			if(b1[i] != b2[i]) return b1[i] - b2[i];
		}
		return this.length - other.length;
	}
	,sub: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
		return new haxe.io.Bytes(len,this.b.slice(pos,pos + len));
	}
	,blit: function(pos,src,srcpos,len) {
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
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			b1[i + pos] = b2[i + srcpos];
		}
	}
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,get: function(pos) {
		return this.b[pos];
	}
	,b: null
	,length: null
	,__class__: haxe.io.Bytes
}
haxe.io.Error = $hxClasses["haxe.io.Error"] = { __ename__ : ["haxe","io","Error"], __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] }
haxe.io.Error.Blocked = ["Blocked",0];
haxe.io.Error.Blocked.toString = $estr;
haxe.io.Error.Blocked.__enum__ = haxe.io.Error;
haxe.io.Error.Overflow = ["Overflow",1];
haxe.io.Error.Overflow.toString = $estr;
haxe.io.Error.Overflow.__enum__ = haxe.io.Error;
haxe.io.Error.OutsideBounds = ["OutsideBounds",2];
haxe.io.Error.OutsideBounds.toString = $estr;
haxe.io.Error.OutsideBounds.__enum__ = haxe.io.Error;
haxe.io.Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe.io.Error; $x.toString = $estr; return $x; }
if(!haxe.remoting) haxe.remoting = {}
haxe.remoting.Connection = $hxClasses["haxe.remoting.Connection"] = function() { }
haxe.remoting.Connection.__name__ = ["haxe","remoting","Connection"];
haxe.remoting.Connection.prototype = {
	call: null
	,resolve: null
	,__class__: haxe.remoting.Connection
}
haxe.remoting.Context = $hxClasses["haxe.remoting.Context"] = function() {
	this.objects = new Hash();
};
haxe.remoting.Context.__name__ = ["haxe","remoting","Context"];
haxe.remoting.Context.share = function(name,obj) {
	var ctx = new haxe.remoting.Context();
	ctx.addObject(name,obj);
	return ctx;
}
haxe.remoting.Context.prototype = {
	call: function(path,params) {
		if(path.length < 2) throw "Invalid path '" + path.join(".") + "'";
		var inf = this.objects.get(path[0]);
		if(inf == null) throw "No such object " + path[0];
		var o = inf.obj;
		var m = Reflect.field(o,path[1]);
		if(path.length > 2) {
			if(!inf.rec) throw "Can't access " + path.join(".");
			var _g1 = 2, _g = path.length;
			while(_g1 < _g) {
				var i = _g1++;
				o = m;
				m = Reflect.field(o,path[i]);
			}
		}
		if(!Reflect.isFunction(m)) throw "No such method " + path.join(".");
		return m.apply(o,params);
	}
	,addObject: function(name,obj,recursive) {
		this.objects.set(name,{ obj : obj, rec : recursive});
	}
	,objects: null
	,__class__: haxe.remoting.Context
}
haxe.remoting.ExternalConnection = $hxClasses["haxe.remoting.ExternalConnection"] = function(data,path) {
	this.__data = data;
	this.__path = path;
};
haxe.remoting.ExternalConnection.__name__ = ["haxe","remoting","ExternalConnection"];
haxe.remoting.ExternalConnection.__interfaces__ = [haxe.remoting.Connection];
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
	} catch( e ) {
		var s = new haxe.Serializer();
		s.serializeException(e);
		return s.toString();
	}
}
haxe.remoting.ExternalConnection.flashConnect = function(name,flashObjectID,ctx) {
	var cnx = new haxe.remoting.ExternalConnection({ ctx : ctx, name : name, flash : flashObjectID},[]);
	haxe.remoting.ExternalConnection.connections.set(name,cnx);
	return cnx;
}
haxe.remoting.ExternalConnection.prototype = {
	call: function(params) {
		var s = new haxe.Serializer();
		s.serialize(params);
		var params1 = s.toString();
		var data = null;
		var fobj = window.document[this.__data.flash];
		if(fobj == null) fobj = window.document.getElementById(this.__data.flash);
		if(fobj == null) throw "Could not find flash object '" + this.__data.flash + "'";
		try {
			data = fobj.externalRemotingCall(this.__data.name,this.__path.join("."),params1);
		} catch( e ) {
		}
		if(data == null) {
			var domain, pageDomain;
			try {
				domain = fobj.src.split("/")[2];
				pageDomain = js.Lib.window.location.host;
			} catch( e ) {
				domain = null;
				pageDomain = null;
			}
			if(domain != pageDomain) throw "ExternalConnection call failure : SWF need allowDomain('" + pageDomain + "')";
			throw "Call failure : ExternalConnection is not " + "initialized in Flash";
		}
		return new haxe.Unserializer(data).unserialize();
	}
	,close: function() {
		haxe.remoting.ExternalConnection.connections.remove(this.__data.name);
	}
	,resolve: function(field) {
		var e = new haxe.remoting.ExternalConnection(this.__data,this.__path.slice());
		e.__path.push(field);
		return e;
	}
	,__path: null
	,__data: null
	,__class__: haxe.remoting.ExternalConnection
}
if(!haxe.xml) haxe.xml = {}
haxe.xml.Parser = $hxClasses["haxe.xml.Parser"] = function() { }
haxe.xml.Parser.__name__ = ["haxe","xml","Parser"];
haxe.xml.Parser.parse = function(str) {
	var doc = Xml.createDocument();
	haxe.xml.Parser.doParse(str,0,doc);
	return doc;
}
haxe.xml.Parser.doParse = function(str,p,parent) {
	if(p == null) p = 0;
	var xml = null;
	var state = 1;
	var next = 1;
	var aname = null;
	var start = 0;
	var nsubs = 0;
	var nbrackets = 0;
	var c = str.cca(p);
	while(!(c != c)) {
		switch(state) {
		case 0:
			switch(c) {
			case 10:case 13:case 9:case 32:
				break;
			default:
				state = next;
				continue;
			}
			break;
		case 1:
			switch(c) {
			case 60:
				state = 0;
				next = 2;
				break;
			default:
				start = p;
				state = 13;
				continue;
			}
			break;
		case 13:
			if(c == 60) {
				var child = Xml.createPCData(HxOverrides.substr(str,start,p - start));
				parent.addChild(child);
				nsubs++;
				state = 0;
				next = 2;
			}
			break;
		case 17:
			if(c == 93 && str.cca(p + 1) == 93 && str.cca(p + 2) == 62) {
				var child = Xml.createCData(HxOverrides.substr(str,start,p - start));
				parent.addChild(child);
				nsubs++;
				p += 2;
				state = 1;
			}
			break;
		case 2:
			switch(c) {
			case 33:
				if(str.cca(p + 1) == 91) {
					p += 2;
					if(HxOverrides.substr(str,p,6).toUpperCase() != "CDATA[") throw "Expected <![CDATA[";
					p += 5;
					state = 17;
					start = p + 1;
				} else if(str.cca(p + 1) == 68 || str.cca(p + 1) == 100) {
					if(HxOverrides.substr(str,p + 2,6).toUpperCase() != "OCTYPE") throw "Expected <!DOCTYPE";
					p += 8;
					state = 16;
					start = p + 1;
				} else if(str.cca(p + 1) != 45 || str.cca(p + 2) != 45) throw "Expected <!--"; else {
					p += 2;
					state = 15;
					start = p + 1;
				}
				break;
			case 63:
				state = 14;
				start = p;
				break;
			case 47:
				if(parent == null) throw "Expected node name";
				start = p + 1;
				state = 0;
				next = 10;
				break;
			default:
				state = 3;
				start = p;
				continue;
			}
			break;
		case 3:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(p == start) throw "Expected node name";
				xml = Xml.createElement(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml);
				state = 0;
				next = 4;
				continue;
			}
			break;
		case 4:
			switch(c) {
			case 47:
				state = 11;
				nsubs++;
				break;
			case 62:
				state = 9;
				nsubs++;
				break;
			default:
				state = 5;
				start = p;
				continue;
			}
			break;
		case 5:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				var tmp;
				if(start == p) throw "Expected attribute name";
				tmp = HxOverrides.substr(str,start,p - start);
				aname = tmp;
				if(xml.exists(aname)) throw "Duplicate attribute";
				state = 0;
				next = 6;
				continue;
			}
			break;
		case 6:
			switch(c) {
			case 61:
				state = 0;
				next = 7;
				break;
			default:
				throw "Expected =";
			}
			break;
		case 7:
			switch(c) {
			case 34:case 39:
				state = 8;
				start = p;
				break;
			default:
				throw "Expected \"";
			}
			break;
		case 8:
			if(c == str.cca(start)) {
				var val = HxOverrides.substr(str,start + 1,p - start - 1);
				xml.set(aname,val);
				state = 0;
				next = 4;
			}
			break;
		case 9:
			p = haxe.xml.Parser.doParse(str,p,xml);
			start = p;
			state = 1;
			break;
		case 11:
			switch(c) {
			case 62:
				state = 1;
				break;
			default:
				throw "Expected >";
			}
			break;
		case 12:
			switch(c) {
			case 62:
				if(nsubs == 0) parent.addChild(Xml.createPCData(""));
				return p;
			default:
				throw "Expected >";
			}
			break;
		case 10:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(start == p) throw "Expected node name";
				var v = HxOverrides.substr(str,start,p - start);
				if(v != parent.get_nodeName()) throw "Expected </" + parent.get_nodeName() + ">";
				state = 0;
				next = 12;
				continue;
			}
			break;
		case 15:
			if(c == 45 && str.cca(p + 1) == 45 && str.cca(p + 2) == 62) {
				parent.addChild(Xml.createComment(HxOverrides.substr(str,start,p - start)));
				p += 2;
				state = 1;
			}
			break;
		case 16:
			if(c == 91) nbrackets++; else if(c == 93) nbrackets--; else if(c == 62 && nbrackets == 0) {
				parent.addChild(Xml.createDocType(HxOverrides.substr(str,start,p - start)));
				state = 1;
			}
			break;
		case 14:
			if(c == 63 && str.cca(p + 1) == 62) {
				p++;
				var str1 = HxOverrides.substr(str,start + 1,p - start - 2);
				parent.addChild(Xml.createProlog(str1));
				state = 1;
			}
			break;
		}
		c = str.cca(++p);
	}
	if(state == 1) {
		start = p;
		state = 13;
	}
	if(state == 13) {
		if(p != start || nsubs == 0) parent.addChild(Xml.createPCData(HxOverrides.substr(str,start,p - start)));
		return p;
	}
	throw "Unexpected end";
}
haxe.xml.Parser.isValidChar = function(c) {
	return c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45;
}
var mt = mt || {}
if(!mt.js) mt.js = {}
mt.js.Tip = $hxClasses["mt.js.Tip"] = function() { }
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
		mt.js.Tip.tooltip.style.zIndex = mt.js.Tip.tipZIndex;
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
	if(cName == null) mt.js.Tip.tooltip.className = mt.js.Tip.defaultClass; else mt.js.Tip.tooltip.className = cName;
	if(mt.js.Tip.lastRef != null && mt.js.Tip.onHide != null) {
		mt.js.Tip.onHide();
		mt.js.Tip.onHide = null;
	}
	mt.js.Tip.lastRef = refObj;
	mt.js.Tip.tooltipContent.innerHTML = contentHTML;
	if(mt.js.Tip.placeRef) mt.js.Tip.placeTooltipRef(); else mt.js.Tip.placeTooltip();
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
	if(top + tts.height > w.height - 2 + w.scrollTop) {
		if(mt.js.Tip.mousePos.y - tts.height > 5 + w.scrollTop) top = mt.js.Tip.mousePos.y - tts.height - 5; else top = w.height - 2 + w.scrollTop - tts.height;
	}
	if(left + tts.width > w.width - 22 + w.scrollLeft) {
		if(mt.js.Tip.mousePos.x - tts.width > 5 + w.scrollLeft) left = mt.js.Tip.mousePos.x - tts.width - 5; else left = w.width - 22 + w.scrollLeft - tts.width;
	}
	if(top < 0) top = 0;
	if(left < 0) left = 0;
	if(mt.js.Tip.excludeList != null) {
		var $it0 = mt.js.Tip.excludeList.iterator();
		while( $it0.hasNext() ) {
			var e = $it0.next();
			var s = mt.js.Tip.elementSize(e);
			if(left > s.x + s.width || left + tts.width < s.x || top > s.y + s.height || top + tts.height < s.y) continue;
			var dx1 = left - (s.x + s.width);
			var dx2 = left + tts.width - s.x;
			var dx = Math.abs(dx1) > Math.abs(dx2)?dx2:dx1;
			var dy1 = top - (s.y + s.height);
			var dy2 = top + tts.height - s.y;
			var dy = Math.abs(dy1) > Math.abs(dy2)?dy2:dy1;
			var cx = left + tts.width / 2 - mt.js.Tip.mousePos.x;
			var cy = top + tts.height / 2 - mt.js.Tip.mousePos.y;
			if((cx - dx) * (cx - dx) + cy * cy > cx * cx + (cy - dy) * (cy - dy)) top -= dy; else left -= dx;
		}
	}
	mt.js.Tip.tooltip.style.left = left + "px";
	mt.js.Tip.tooltip.style.top = top + "px";
}
mt.js.Tip.placeTooltipRef = function() {
	var o = mt.js.Tip.elementSize(mt.js.Tip.lastRef);
	var tts = mt.js.Tip.elementSize(mt.js.Tip.tooltip);
	if(o.width <= 0) mt.js.Tip.tooltip.style.left = o.x + "px"; else mt.js.Tip.tooltip.style.left = o.x - tts.width * 0.5 + o.width * 0.5 + "px";
	mt.js.Tip.tooltip.style.top = o.y + Math.max(mt.js.Tip.minOffsetY,o.height) + "px";
}
mt.js.Tip.showTip = function(refObj,title,contentBase) {
	contentBase = "<p>" + contentBase + "</p>";
	mt.js.Tip.show(refObj,"<div class=\"title\">" + title + "</div>" + contentBase);
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
	var ret = { x : 0, y : 0, width : o.clientWidth, height : o.clientHeight};
	var p = o;
	while(p != null) {
		if(p.offsetParent != null) {
			ret.x += p.offsetLeft - p.scrollLeft;
			ret.y += p.offsetTop - p.scrollTop;
		} else {
			ret.x += p.offsetLeft;
			ret.y += p.offsetTop;
		}
		p = p.offsetParent;
	}
	return ret;
}
mt.js.Tip.windowSize = function() {
	var ret = { x : 0, y : 0, width : js.Lib.window.innerWidth, height : js.Lib.window.innerHeight, scrollLeft : js.Lib.document.body.scrollLeft + js.Lib.document.documentElement.scrollLeft, scrollTop : js.Lib.document.body.scrollTop + js.Lib.document.documentElement.scrollTop};
	var isIE = document.all != null && window.opera == null;
	var body = isIE?js.Lib.document.documentElement:js.Lib.document.body;
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
		} else if(e.clientX || e.clientY) {
			posx = e.clientX + js.Lib.document.body.scrollLeft + js.Lib.document.documentElement.scrollLeft;
			posy = e.clientY + js.Lib.document.body.scrollTop + js.Lib.document.documentElement.scrollTop;
		}
		mt.js.Tip.mousePos = { x : posx, y : posy};
		if(mt.js.Tip.lastRef != null && !mt.js.Tip.placeRef) mt.js.Tip.placeTooltip();
	} catch( e ) {
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
			if(body.attachEvent) body.detachEvent("onmousemove",ftrack); else body.removeEventListener("mousemove",ftrack,false);
			onOut();
		}
	};
	if(body.attachEvent) body.attachEvent("onmousemove",ftrack); else body.addEventListener("mousemove",ftrack,false);
}
mt.js.Tip.init = function() {
	if(mt.js.Tip.initialized) return;
	if(document.body != null) {
		mt.js.Tip.initialized = true;
		document.body.onmousemove = mt.js.Tip.onMouseMove;
	}
}
var js = js || {}
js.XmlHttp = $hxClasses["js.XmlHttp"] = function() { }
js.XmlHttp.__name__ = ["js","XmlHttp"];
js.XmlHttp.get = function(url,obj) {
	if(js.XmlHttp.lock != null) {
		haxe.Log.trace("locked",{ fileName : "XmlHttp.hx", lineNumber : 8, className : "js.XmlHttp", methodName : "get"});
		return;
	}
	var r = new haxe.Http(url);
	r.setHeader("X-Handler","js.XmlHttp");
	js.XmlHttp.onStart(r,obj);
	r.onData = js.XmlHttp.onData;
	r.onError = js.XmlHttp.onError;
	js.XmlHttp.lastUrl = url;
	js.XmlHttp.urlForBack = url;
	r.request(false);
}
js.XmlHttp.post = function(url,form,vname) {
	if(js.XmlHttp.lock != null) {
		haxe.Log.trace("locked",{ fileName : "XmlHttp.hx", lineNumber : 24, className : "js.XmlHttp", methodName : "post"});
		return;
	}
	var h = new Hash();
	var l = form.elements;
	var list = new List();
	var _g1 = 0, _g = l.length;
	while(_g1 < _g) {
		var i = _g1++;
		var e = l[i];
		if(e.name == null || e.name == "") continue;
		if(e.type != "checkbox" && e.type != "radio" || e.checked) {
			if(e.name == vname) list.add(e.value); else h.set(e.name,e.value);
		}
		if(e.type == "submit") {
			e.disabled = true;
			js.XmlHttp.lockButton = e;
		}
	}
	if(vname != null) h.set(vname,list.join("|"));
	return js.XmlHttp.postHash(url,h);
}
js.XmlHttp.postHash = function(url,h) {
	if(js.XmlHttp.lock != null) return;
	if(new EReg("[?]","").match(url)) url += ";rand=" + Std.random(9999999); else url += "?rand=" + Std.random(9999999);
	var r = new haxe.Http(url);
	js.XmlHttp.urlForBack = null;
	r.setHeader("X-Handler","js.XmlHttp");
	r.onData = js.XmlHttp.onData;
	r.onError = js.XmlHttp.onError;
	var $it0 = h.keys();
	while( $it0.hasNext() ) {
		var k = $it0.next();
		r.setParameter(k,h.get(k));
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
js.XmlHttp.uqueue = function(url) {
	if(js.XmlHttp.lock != null) {
		js.XmlHttp.squeue = url;
		return;
	}
	js.XmlHttp.get(url);
}
js.XmlHttp.isLocked = function() {
	return js.XmlHttp.lock != null;
}
js.XmlHttp.lastUrl = null;
js.XmlHttp.urlForBack = null;
js.XmlHttp.lastLinkLauncher = null;
js.XmlHttp.lastLinkLauncherCursor = null;
js.XmlHttp.waitGo = null;
js.XmlHttp.onStart = function(r,ll) {
	js.XmlHttp.lock = r;
	try {
		js.Lib.document.body.style.cursor = "progress";
	} catch( e ) {
	}
	if(ll != null) {
		if(js.XmlHttp.lastLinkLauncher != null) try {
			js.XmlHttp.lastLinkLauncher.style.cursor = js.XmlHttp.lastLinkLauncherCursor;
		} catch( e ) {
		}
		js.XmlHttp.lastLinkLauncher = ll;
		js.XmlHttp.lastLinkLauncherCursor = ll.style.cursor;
		try {
			ll.style.cursor = "progress";
		} catch( e ) {
		}
	}
}
js.XmlHttp.onEnd = function() {
	try {
		js.Lib.document.body.style.cursor = "default";
	} catch( e ) {
	}
	if(js.XmlHttp.lastLinkLauncher != null) {
		try {
			js.XmlHttp.lastLinkLauncher.style.cursor = js.XmlHttp.lastLinkLauncherCursor;
		} catch( e ) {
		}
		js.XmlHttp.lastLinkLauncher = null;
	}
	js.XmlHttp.lock = null;
	js.XmlHttp.urlForBack = null;
	if(js.XmlHttp.queue.length > 0) {
		js.XmlHttp.get(js.XmlHttp.queue.pop());
		return;
	}
	if(js.XmlHttp.squeue != null) {
		var t = js.XmlHttp.squeue;
		js.XmlHttp.squeue = null;
		js.XmlHttp.get(t);
		return;
	}
	if(js.XmlHttp.waitGo) return;
	if(js.XmlHttp.lockButton != null) js.XmlHttp.lockButton.disabled = false;
}
js.XmlHttp.onError = function(msg) {
	js.XmlHttp.onEnd();
	haxe.Log.trace("Error: " + msg,{ fileName : "XmlHttp.hx", lineNumber : 152, className : "js.XmlHttp", methodName : "onError"});
}
js.XmlHttp.onData = function(data) {
	var url = js.XmlHttp.urlForBack;
	var x;
	try {
		x = Xml.parse("<resp>" + data + "</resp>").firstChild();
	} catch( e ) {
		haxe.Log.trace(e,{ fileName : "XmlHttp.hx", lineNumber : 161, className : "js.XmlHttp", methodName : "onData"});
		return;
	}
	try {
		var $it0 = x.elements();
		while( $it0.hasNext() ) {
			var n = $it0.next();
			if((n.get_nodeName() == "fill" || n.get_nodeName() == "add") && n.exists("id")) {
				var id = n.get("id");
				var d = js.Lib.document.getElementById(id);
				if(d != null) {
					var s = "";
					var $it1 = n.iterator();
					while( $it1.hasNext() ) {
						var c = $it1.next();
						if(c.nodeType == Xml.CData) s += c.get_nodeValue(); else s += c.toString();
					}
					if(n.exists("class")) d.className = n.get("class");
					if(n.get_nodeName() == "add") d.innerHTML += s; else d.innerHTML = s;
				} else haxe.Log.trace("section '" + id + "' not found",{ fileName : "XmlHttp.hx", lineNumber : 188, className : "js.XmlHttp", methodName : "onData"});
			} else if(n.get_nodeName() == "iframe") {
				var id = n.get("id");
				var d = js.Lib.document.getElementById(id);
				if(n.exists("src")) d.src = n.get("src");
			} else if(n.get_nodeName() == "tip") {
				var id = n.get("id");
				var s = "";
				var $it2 = n.iterator();
				while( $it2.hasNext() ) {
					var c = $it2.next();
					s += c.nodeType == Xml.CData?c.get_nodeValue():c.toString();
				}
				var refObj = js.Lib.document.getElementById(id);
				if(refObj == null) throw "No object with id: " + id;
				mt.js.Tip.show(refObj,s,n.get("class"),n.exists("placeRef"));
			} else if(n.get_nodeName() == "menu") {
				var menuId = n.get("id");
				var selectedId = n.get("selected");
				var className = n.exists("class")?n.get("class"):"selected";
				js.XmlHttp.menuSelect(menuId,selectedId,className);
			} else if(n.get_nodeName() == "input") {
				var e = js.Lib.document.getElementById(n.get("id"));
				var c = n.firstChild();
				if(c != null) e.value = StringTools.htmlUnescape(c.get_nodeValue()); else e.value = "";
			} else if(n.get_nodeName() == "style") {
				var id = n.get("id");
				if(n.exists("add")) js.XmlHttp.addClass(id,n.get("add")); else if(n.exists("rm")) js.XmlHttp.removeClass(id,n.get("rm"));
			} else if(n.get_nodeName() == "load") js.XmlHttp.enqueue(n.firstChild().get_nodeValue()); else if(n.get_nodeName() == "refresh") js.Lib.window.location.reload(); else if(n.get_nodeName() == "go") {
				var r = n.exists("confirm")?js.Lib.window.confirm(n.get("confirm")):true;
				if(r) {
					js.XmlHttp.waitGo = true;
					js.Lib.window.location = n.firstChild().get_nodeValue();
				}
			} else if(n.get_nodeName() == "close") js.Lib.window.close(); else if(n.get_nodeName() == "alert") js.Lib.alert(n.firstChild().get_nodeValue()); else if(n.get_nodeName() == "confirm") {
				var rs = js.Lib.window.confirm(n.firstChild().get_nodeValue());
				if(rs) js.XmlHttp.enqueue(n.get("url"));
			} else if(n.get_nodeName() == "script") {
				var s = "";
				var $it3 = n.iterator();
				while( $it3.hasNext() ) {
					var c = $it3.next();
					if(c.nodeType == Xml.CData) s += c.get_nodeValue(); else s += c.toString();
				}
				eval(s);
			} else haxe.Log.trace("Ignore " + Std.string(n),{ fileName : "XmlHttp.hx", lineNumber : 268, className : "js.XmlHttp", methodName : "onData"});
		}
	} catch( e ) {
		haxe.Log.trace("Exception",{ fileName : "XmlHttp.hx", lineNumber : 272, className : "js.XmlHttp", methodName : "onData"});
		haxe.Log.trace(e,{ fileName : "XmlHttp.hx", lineNumber : 273, className : "js.XmlHttp", methodName : "onData"});
		haxe.Log.trace(e.message,{ fileName : "XmlHttp.hx", lineNumber : 274, className : "js.XmlHttp", methodName : "onData"});
	}
	js.XmlHttp.execJs();
	js.XmlHttp.onEnd();
}
js.XmlHttp.execJs = function() {
	var i = 1;
	while(true) {
		var e = js.Lib.document.getElementById("jsid-" + i);
		if(e == null) break;
		e.setAttribute("id","");
		try {
			eval(e.innerHTML);
		} catch( e1 ) {
			haxe.Log.trace("Exception: " + Std.string(e1),{ fileName : "XmlHttp.hx", lineNumber : 292, className : "js.XmlHttp", methodName : "execJs"});
		}
		i++;
	}
}
js.XmlHttp.addClass = function(id,className) {
	var e = js.Lib.document.getElementById(id);
	if(e != null) {
		var cn = e.className.split(" ");
		HxOverrides.remove(cn,className);
		cn.push(className);
		e.className = cn.join(" ");
	}
}
js.XmlHttp.removeClass = function(id,className) {
	var e = js.Lib.document.getElementById(id);
	if(e != null) {
		var cn = e.className.split(" ");
		HxOverrides.remove(cn,className);
		e.className = cn.join(" ");
	}
}
js.XmlHttp.menuSelect = function(menuId,selectedId,className) {
	try {
		var menu = js.Lib.document.getElementById(menuId);
		if(menu == null) return;
		var c = menu.firstChild;
		js.XmlHttp.rec_menuSelect(c,selectedId,className);
	} catch( e ) {
		haxe.Log.trace("Exception in menuSelect: " + Std.string(e),{ fileName : "XmlHttp.hx", lineNumber : 325, className : "js.XmlHttp", methodName : "menuSelect"});
	}
}
js.XmlHttp.rec_menuSelect = function(c,selectedId,className) {
	while(c != null) {
		if(c.nodeType == 1) {
			var id = c.getAttribute("id");
			if(id != null) {
				var cn = c.className.split(" ");
				HxOverrides.remove(cn,className);
				if(id == selectedId) cn.push(className);
				c.className = cn.join(" ");
			} else js.XmlHttp.rec_menuSelect(c.firstChild,selectedId,className);
		}
		c = c.nextSibling;
	}
}
js.Utils = $hxClasses["js.Utils"] = function() { }
js.Utils.__name__ = ["js","Utils"];
js.Utils.byId = function(id) {
	return js.Lib.document.getElementById(id);
}
js.Utils.swClassE = function(e,className) {
	var cn = e.className.split(" ");
	var t = HxOverrides.remove(cn,className);
	if(!t) cn.push(className);
	e.className = cn.join(" ");
	return !t;
}
js.Utils.swClass = function(id,className) {
	var e = js.Lib.document.getElementById(id);
	if(e != null) js.Utils.swClassE(e,className);
}
js.Utils.addClassE = function(e,className) {
	var cn = e.className.split(" ");
	HxOverrides.remove(cn,className);
	cn.push(className);
	e.className = cn.join(" ");
}
js.Utils.addClass = function(id,className) {
	var e = js.Lib.document.getElementById(id);
	if(e != null) js.Utils.addClassE(e,className);
}
js.Utils.removeClassE = function(e,className) {
	var cn = e.className.split(" ");
	HxOverrides.remove(cn,className);
	e.className = cn.join(" ");
}
js.Utils.removeClass = function(id,className) {
	var e = js.Lib.document.getElementById(id);
	if(e != null) js.Utils.removeClassE(e,className);
}
js.Utils.setClass = function(id,classes) {
	var e = js.Lib.document.getElementById(id);
	if(e != null) e.className = classes;
}
js.Utils.menuSelect = function(menuId,selectedId,className) {
	try {
		var menu = js.Utils.byId(menuId);
		if(menu == null) return;
		var c = menu.firstChild;
		js.Utils.rec_menuSelect(c,selectedId,className);
	} catch( e ) {
		haxe.Log.trace("Exception in menuSelect: " + Std.string(e),{ fileName : "Utils.hx", lineNumber : 65, className : "js.Utils", methodName : "menuSelect"});
	}
}
js.Utils.rec_menuSelect = function(c,selectedId,className) {
	while(c != null) {
		if(c.nodeType == 1) {
			var id = c.getAttribute("id");
			if(id != null) {
				var cn = c.className.split(" ");
				HxOverrides.remove(cn,"");
				HxOverrides.remove(cn,className);
				if(id == selectedId) cn.push(className);
				c.className = cn.join(" ");
			} else js.Utils.rec_menuSelect(c.firstChild,selectedId,className);
		}
		c = c.nextSibling;
	}
}
mt.js.Editor = $hxClasses["mt.js.Editor"] = function(name) {
	this.name = name;
	this.contentName = name + "_content";
	this.config = { buttons : new List(), icons : new List(), iconsUrl : "", autoLink : true, linkTarget : "_blank", uploadData : null, uploadColors : { bg : 0, fg : 16777215, fill : 32768}};
};
mt.js.Editor.__name__ = ["mt","js","Editor"];
mt.js.Editor.getElementPosition = function(o) {
	var ret = { x : 0, y : 0, width : o.clientWidth, height : o.clientHeight};
	if(ret.width == 0) ret.width = o.offsetWidth;
	if(ret.height == 0) ret.height = o.offsetHeight;
	var p = o;
	while(p != null) {
		if(p.offsetParent != null) {
			ret.x += p.offsetLeft - p.scrollLeft;
			ret.y += p.offsetTop - p.scrollTop;
		} else {
			ret.x += p.offsetLeft;
			ret.y += p.offsetTop;
		}
		p = p.offsetParent;
	}
	return ret;
}
mt.js.Editor.prototype = {
	initUpload: function(id,act,target) {
		if(this.config.uploadData == null) throw "No data domain";
		var cnxName = "edcnx_" + id + "_" + this.name;
		var me = this;
		var api = { uploadResult : function(url) {
			act(url);
		}, uploadError : function(e) {
			js.Lib.alert(me.config.uploadData.error + "\n(" + e + ")");
		}};
		var cnx = haxe.remoting.ExternalConnection.flashConnect(cnxName,null,haxe.remoting.Context.share("api",api));
		var params = [this.config.uploadData.url + "upload/upload.swf","swf_" + id,"100%","100%",9];
		var swfobj;
		try {
			swfobj = eval("js.SWFObject");
			if(swfobj == null) throw null;
		} catch( e ) {
			swfobj = eval("SWFObject");
		}
		var obj = Type.createInstance(swfobj,params);
		obj.addParam("AllowScriptAccess","always");
		var c = this.config.uploadColors;
		var colors = "&bgcolor=" + c.bg + "&fgcolor=" + c.fg + "&color=" + c.fill;
		obj.addParam("FlashVars","name=" + cnxName + "&site=" + this.config.uploadData.site + "&prefix=" + this.config.uploadData.uid + colors + (target != null?"&click=1":""));
		obj.addParam("wmode","transparent");
		obj.write(id);
		return false;
	}
	,updatePreview: function(id) {
		var doc = js.Lib.document.getElementById(id);
		doc.innerHTML = this.format(this.getDocument().value);
	}
	,quoteSelection: function(begin,end) {
		var doc = this.getDocument();
		var sel = new js.Selection(doc);
		sel.insert(begin,sel.get(),end);
		if(doc.onkeyup != null) doc.onkeyup(null);
	}
	,insertImage: function(url) {
		this.insert("@" + url + "@");
	}
	,insert: function(txt) {
		this.quoteSelection(txt,"");
	}
	,execute: function(act) {
		var act1 = haxe.Unserializer.run(act);
		var $e = (act1);
		switch( $e[1] ) {
		case 0:
			var tag = $e[2];
			this.insert(tag);
			break;
		case 1:
		case 2:
			var tag = $e[2];
			this.quoteSelection("[" + tag + "]","[/" + tag + "]");
			break;
		case 3:
			var node = $e[4], text = $e[3], addr = $e[2];
			var url = js.Lib.window.prompt(addr,"http://");
			if(url == null || url.length == 0 || url == "http://") return false;
			var comment = js.Lib.window.prompt(text,url);
			if(comment.length == 0 || comment == url) this.insert("[" + node + "]" + url + "[/" + node + "]"); else this.insert("[" + node + "=" + url + "]" + comment + "[/" + node + "]");
			break;
		case 4:
			break;
		}
		return false;
	}
	,loadConfig: function(str) {
		this.config = haxe.Unserializer.run(str);
	}
	,getDocument: function() {
		return js.Lib.document.getElementsByName(this.contentName)[0];
	}
	,setUploadButton: function(target,act) {
		var id = target + "_swf";
		var loaded = false;
		js.Lib.document.write("<div id=\"" + id + "\"></div>");
		var but = js.Lib.document.getElementById(target);
		var me = this;
		but.onmouseover = function(_) {
			if(loaded) return;
			loaded = true;
			var doc = js.Lib.document;
			var win = js.Lib.window;
			var swf = doc.getElementById(id);
			swf.style.position = "absolute";
			swf.style.left = "0px";
			swf.style.top = "0px";
			var p = mt.js.Editor.getElementPosition(but);
			swf.style.width = p.width + "px";
			swf.style.height = p.height + "px";
			swf.style.zIndex = 10;
			var p2 = mt.js.Editor.getElementPosition(swf);
			swf.style.top = p.y - p2.y + "px";
			swf.style.left = p.x - p2.x + "px";
			me.initUpload(id,act,but);
		};
	}
	,format: function(txt) {
		if(txt == "" || txt == null) return "";
		this.sections = [];
		txt = StringTools.htmlEscape(txt);
		txt = txt.split("\r\n").join("\n");
		txt = txt.split("\r").join("\n");
		txt = StringTools.trim(txt);
		txt = txt.split("\\0")[0];
		if(txt == null) return "";
		var me = this;
		if(this.config.autoLink) {
			txt = new EReg("([^@=>\\]\"])(http://[a-zA-Z0-9/?;&=%_.#-]+)","").customReplace(txt,function(r) {
				return r.matched(1) + me.addSection("<a href=\"" + r.matched(2) + "\"" + me.linkTarget() + ">" + r.matched(2) + "</a>");
			});
			txt = new EReg("^(http://[a-zA-Z0-9/?;&=%_.#-]+)","").customReplace(txt,function(r) {
				var url = r.matched(1);
				return me.addSection("<a href=\"" + url + "\"" + me.linkTarget() + ">" + url + "</a>");
			});
		}
		if(this.config.uploadData != null) txt = new EReg("@([A-Za-z0-9/_.]+)@","").customReplace(txt,function(r) {
			return me.addSection("<img src=\"" + me.config.uploadData.url + r.matched(1) + "\"/>");
		});
		var icons = Lambda.array(this.config.icons);
		icons.sort($bind(this,this.compareIcons));
		var _g = 0;
		while(_g < icons.length) {
			var i = icons[_g];
			++_g;
			txt = this.formatAction(txt,i.act);
		}
		var $it0 = this.config.buttons.iterator();
		while( $it0.hasNext() ) {
			var b = $it0.next();
			txt = this.formatAction(txt,b.act);
		}
		txt = new EReg("<s:([0-9]+)/>","").customReplace(txt,function(r) {
			return me.sections[Std.parseInt(r.matched(1))];
		});
		this.sections = null;
		txt = new EReg("<([a-z]+)></\\1>","i").replace(txt,"");
		var schar = "";
		txt = txt.split(schar).join("");
		txt = new EReg("<([a-zA-Z0-9]+[^>]*/>)","g").replace(txt,schar + "$1");
		var r = new EReg("<([a-zA-Z0-9]+)([^>]*>[^<]*)</\\1>","g");
		while(true) {
			var t = r.replace(txt,schar + "$1$2" + schar + "/$1>");
			if(t == txt) break;
			txt = t;
		}
		txt = new EReg("</?[a-zA-Z0-9]+[^>]*>","g").replace(txt,"");
		txt = txt.split(schar).join("<");
		var b = new StringBuf();
		this.wordify(b,(function($this) {
			var $r;
			try {
				$r = Xml.parse(txt);
			} catch( e ) {
				$r = (function($this) {
					var $r;
					throw "Invalid XML " + txt + " (" + Std.string(e) + ")";
					return $r;
				}($this));
			}
			return $r;
		}(this)));
		return b.b;
	}
	,wordify: function(b,x) {
		switch(x.nodeType) {
		case Xml.Document:
			var $it0 = x.iterator();
			while( $it0.hasNext() ) {
				var x1 = $it0.next();
				this.wordify(b,x1);
			}
			break;
		case Xml.Element:
			b.b += Std.string("<" + x.get_nodeName());
			var $it1 = x.attributes();
			while( $it1.hasNext() ) {
				var a = $it1.next();
				b.b += Std.string(" " + a + "=\"" + x.get(a) + "\"");
			}
			if(x.firstChild() == null) b.b += "/>"; else {
				b.b += ">";
				var $it2 = x.iterator();
				while( $it2.hasNext() ) {
					var x1 = $it2.next();
					this.wordify(b,x1);
				}
				b.b += Std.string("</" + x.get_nodeName() + ">");
			}
			break;
		case Xml.PCData:case Xml.CData:
			var first = true;
			var _g = 0, _g1 = x.get_nodeValue().split(" ");
			while(_g < _g1.length) {
				var data = _g1[_g];
				++_g;
				if(first) first = false; else b.b += " ";
				while(data.length > 40) {
					b.b += Std.string(HxOverrides.substr(data,0,40));
					b.b += " ";
					data = HxOverrides.substr(data,40,null);
				}
				b.b += Std.string(data);
			}
			break;
		default:
		}
	}
	,formatAction: function(txt,act) {
		return (function($this) {
			var $r;
			var $e = (act);
			switch( $e[1] ) {
			case 0:
				var img = $e[3], tag = $e[2];
				$r = txt.split(tag).join("<img src=\"" + $this.image(img) + "\" alt=\"\"/>");
				break;
			case 1:
				var html = $e[3], node = $e[2];
				$r = $this.formatNode(txt,node,"<" + html + ">","</" + html + ">");
				break;
			case 2:
				var span = $e[3], node = $e[2];
				$r = $this.formatNode(txt,node,"<span class=\"" + span + "\">","</span>");
				break;
			case 3:
				var node = $e[4];
				$r = (function($this) {
					var $r;
					var r = new EReg("\\[" + node + "\\](https?://[^\"]*?)\\[\\/" + node + "\\]","ig");
					txt = r.replace(txt,"<a href=\"$1\"" + $this.linkTarget() + ">$1</a>");
					r = new EReg("\\[" + node + "=(https?://[^\"]*?)\\](.*?)\\[\\/" + node + "\\]","i");
					var me = $this;
					$r = r.customReplace(txt,function(r1) {
						return me.addSection("<a href=\"" + r1.matched(1) + "\"" + me.linkTarget() + ">") + r1.matched(2) + "</a>";
					});
					return $r;
				}($this));
				break;
			case 4:
				var replace = $e[3], ereg = $e[2];
				$r = (function($this) {
					var $r;
					var r = new EReg(ereg,"ig");
					$r = r.replace(txt,replace);
					return $r;
				}($this));
				break;
			}
			return $r;
		}(this));
	}
	,compareIcons: function(a,b) {
		return (function($this) {
			var $r;
			var $e = (a.act);
			switch( $e[1] ) {
			case 0:
				var taga = $e[2];
				$r = (function($this) {
					var $r;
					var $e = (b.act);
					switch( $e[1] ) {
					case 0:
						var tagb = $e[2];
						$r = Reflect.compare(tagb,taga);
						break;
					default:
						$r = Reflect.compare(a,b);
					}
					return $r;
				}($this));
				break;
			default:
				$r = Reflect.compare(a,b);
			}
			return $r;
		}(this));
	}
	,addSection: function(text) {
		var sid = this.sections.length;
		this.sections.push(text);
		return "<s:" + sid + "/>";
	}
	,linkTarget: function() {
		return this.config.linkTarget == null?"":" target=\"" + this.config.linkTarget + "\"";
	}
	,formatNode: function(txt,node,h1,h2) {
		return txt.split("[" + node + "]").join(h1).split("[/" + node + "]").join(h2);
	}
	,image: function(img) {
		return this.config.iconsUrl.split("::img::").join(img);
	}
	,config: null
	,sections: null
	,name: null
	,contentName: null
	,__class__: mt.js.Editor
}
js.App = $hxClasses["js.App"] = function() { }
js.App.__name__ = ["js","App"];
js.App.toggle = function(id) {
	var elt = js.Lib.document.getElementById(id);
	elt.style.display = elt.style.display == "none"?"":"none";
	return false;
}
js.App.main = function() {
}
js.App.maxLength = function(obj,len) {
	if(obj == null || obj.value == null) return;
	if(obj.value.length > len) obj.value = HxOverrides.substr(obj.value,0,len);
}
js.App.onLoad = function() {
	var l = js.Lib.document.getElementsByTagName("a");
	js.App.akh = new IntHash();
	var _g1 = 0, _g = l.length;
	while(_g1 < _g) {
		var i = _g1++;
		var e = l[i];
		if(e.getAttribute("accesskey") != null) {
			if(Std.string(Std.parseInt(e.getAttribute("accesskey"))) == e.getAttribute("accesskey")) js.App.akh.set(Std.parseInt(e.getAttribute("accesskey")),e); else js.App.akh.set(HxOverrides.cca(e.getAttribute("accesskey").toUpperCase(),0),e);
			e.setAttribute("accesskey",null);
		}
	}
	var l1 = js.Lib.document.getElementsByTagName("select");
	var _g1 = 0, _g = l1.length;
	while(_g1 < _g) {
		var i = _g1++;
		var e1 = [l1[i]];
		e1[0].addEventListener("focus",(function() {
			return function(_) {
				js.App.globalFocus = false;
			};
		})(),false);
		e1[0].addEventListener("blur",(function() {
			return function(_) {
				js.App.globalFocus = true;
			};
		})(),false);
		e1[0].addEventListener("keypress",(function(e1) {
			return function(evt) {
				if(evt.keyCode == 27) e1[0].blur();
			};
		})(e1),false);
	}
	var l2 = js.Lib.document.getElementsByTagName("input");
	var _g1 = 0, _g = l2.length;
	while(_g1 < _g) {
		var i = _g1++;
		var e2 = [l2[i]];
		if(e2[0].getAttribute("accesskey") != null) {
			js.App.akh.set(HxOverrides.cca(e2[0].getAttribute("accesskey").toUpperCase(),0),e2[0]);
			e2[0].setAttribute("accesskey",null);
		}
		e2[0].addEventListener("focus",(function() {
			return function(_) {
				js.App.globalFocus = false;
			};
		})(),false);
		e2[0].addEventListener("blur",(function() {
			return function(_) {
				js.App.globalFocus = true;
			};
		})(),false);
		e2[0].addEventListener("keypress",(function(e2) {
			return function(evt) {
				if(evt.keyCode == 27) e2[0].blur();
			};
		})(e2),false);
	}
	var l3 = js.Lib.document.getElementsByTagName("textarea");
	var _g1 = 0, _g = l3.length;
	while(_g1 < _g) {
		var i = _g1++;
		var e3 = [l3[i]];
		e3[0].addEventListener("focus",(function() {
			return function(_) {
				js.App.globalFocus = false;
			};
		})(),false);
		e3[0].addEventListener("blur",(function() {
			return function(_) {
				js.App.globalFocus = true;
			};
		})(),false);
		e3[0].addEventListener("keyup",(function(e3) {
			return function(evt) {
				if(evt.keyCode == 27) e3[0].blur();
			};
		})(e3),false);
	}
	var l4 = js.Lib.document.getElementsByTagName("button");
	var _g1 = 0, _g = l4.length;
	while(_g1 < _g) {
		var i = _g1++;
		var e = l4[i];
		if(e.getAttribute("accesskey") != null) {
			js.App.akh.set(HxOverrides.cca(e.getAttribute("accesskey").toUpperCase(),0),e);
			e.setAttribute("accesskey",null);
		}
	}
	js.Lib.window.addEventListener("keyup",js.App.onKeyUp,false);
}
js.App.onKeyUp = function(evt) {
	if(!evt.altKey && !evt.shiftKey && evt.ctrlKey && js.App.globalFocus) switch(evt.keyCode) {
	case 37:
		js.App.runAc(52);
		return;
	case 38:
		js.App.runAc(56);
		return;
	case 39:
		js.App.runAc(54);
		return;
	case 40:
		js.App.runAc(50);
		return;
	}
	if(js.App.globalFocus && !evt.ctrlKey) {
		if(evt.keyCode != null) {
			js.App.runAc(evt.keyCode);
			return;
		}
	}
}
js.App.runAc = function(charCode) {
	if(js.App.akh.exists(charCode)) {
		var e = js.App.akh.get(charCode);
		if(e != null) {
			if(e.getAttribute("onclick") != null) e.onclick(null); else if(e.getAttribute("href") != "#") js.Lib.window.location.assign(e.getAttribute("href"));
		}
	}
}
js.App.setRights = function(l) {
	var list = l.split(",");
	var _g = 0, _g1 = Common.boxRights;
	while(_g < _g1.length) {
		var e = _g1[_g];
		++_g;
		js.Lib.document.getElementById("r_" + e + "_null").checked = HxOverrides.remove(list,e);
	}
}
js.App.initHelpAccordion = function(container,initOpen) {
	if(initOpen == null) initOpen = false;
	var cacc = new js.fx.Accordion(initOpen != true);
	cacc.onChangeStatus = function(item) {
		try {
			var i = HxOverrides.substr(item.content.id,4,null);
			var a = Std.string(js.Lib.window.location).split("#");
			if(item.active) js.Lib.window.location = Std.string(a[0] + "#" + i);
		} catch( e ) {
		}
	};
	var qs = js.Lib.document.getElementById(container).getElementsByTagName("h3");
	var def = ("hcd_" + js.Lib.window.location.hash).split("#").join("");
	var _g1 = 0, _g = qs.length;
	while(_g1 < _g) {
		var j = _g1++;
		var q = qs[j];
		var c = q.nextSibling;
		while(c != null && c.nodeType != 1) c = c.nextSibling;
		if(c == null || c.nodeName == "h3") continue;
		cacc.add(q,c,def == c.id || initOpen);
		if(def == c.id) js.App.windowScrollVisible(c);
	}
}
js.App.lastRespUrl = null;
js.App.uResp = null;
js.App.getNextResp = function() {
	if(js.XmlHttp.isLocked() || js.App.lastRespCursor < 0) return;
	if(js.App.lastRespCursor == 0) {
		js.Lib.document.getElementById("content").value = js.App.uResp;
		js.App.uResp = null;
		js.App.lastRespCursor--;
		return;
	}
	js.App.lastRespCursor--;
	js.XmlHttp.enqueue(js.App.lastRespUrl + js.App.lastRespCursor);
}
js.App.getPrevResp = function() {
	if(js.XmlHttp.isLocked()) return;
	if(js.App.lastRespCursor == -1) js.App.uResp = js.Lib.document.getElementById("content").value;
	js.App.lastRespCursor++;
	js.XmlHttp.enqueue(js.App.lastRespUrl + js.App.lastRespCursor);
}
js.App.sendReply = function() {
	var form = js.Lib.document.getElementById("replyForm");
	if(form != null && form.sub != null) form.sub.click();
}
js.App.contentOnKeyUp = function(evt) {
	if(evt.keyCode != null && evt.keyCode != 0) switch(evt.keyCode) {
	case 40:
		if((evt.altKey || evt.ctrlKey) && !evt.shiftKey) js.App.getNextResp();
		break;
	case 38:
		if((evt.altKey || evt.ctrlKey) && !evt.shiftKey) js.App.getPrevResp();
		break;
	case 13:
		if((evt.altKey || evt.ctrlKey) && !evt.shiftKey) js.App.sendReply();
		break;
	}
	var d = js.Lib.document.getElementById("fastReplaceHelp");
	if(d != null) d.className = "hidden";
	var t = js.Lib.document.getElementById("content");
	if(t == null) return;
	var str = t.value;
	if(t.selectionStart != null) {
		if(d != null && HxOverrides.substr(str,t.selectionStart - 1 | 0,1) == "%") d.className = "";
		var str0 = HxOverrides.substr(str,0,t.selectionStart);
		var str1 = str.substring(t.selectionStart,t.selectionEnd);
		var str2 = HxOverrides.substr(str,t.selectionEnd,null);
		var change = false;
		var $it0 = js.App.fastReplace.keys();
		while( $it0.hasNext() ) {
			var k = $it0.next();
			if(str0.indexOf("%" + k) >= 0) {
				change = true;
				str0 = str0.split("%" + k).join(js.App.fastReplace.get(k));
			}
			if(str1.indexOf("%" + k) >= 0) {
				change = true;
				str1 = str1.split("%" + k).join(js.App.fastReplace.get(k));
			}
			if(str2.indexOf("%" + k) >= 0) {
				change = true;
				str2 = str2.split("%" + k).join(js.App.fastReplace.get(k));
			}
		}
		if(change) {
			t.value = str0 + str1 + str2;
			t.selectionStart = str0.length;
			t.selectionEnd = str0.length + str1.length;
		}
	} else {
		var $it1 = js.App.fastReplace.keys();
		while( $it1.hasNext() ) {
			var k = $it1.next();
			if(str.indexOf("%" + k) >= 0) str = str.split("%" + k).join(js.App.fastReplace.get(k));
		}
		t.value = str;
	}
}
js.App.zoomImageInit = function(img,id) {
	var div = js.Utils.byId("uic_" + id);
	div.style.height = img.clientHeight + "px";
	div.style.width = img.clientWidth + "px";
}
js.App.zoomImage = function(img,id) {
	var div = js.Utils.byId("uic_" + id);
	var mdiv = js.Utils.byId("uim_" + id);
	var oc = js.fx.Coordinate.of(img);
	var s = js.Utils.swClassE(img,"unlimited");
	if(s) {
		var c = js.fx.Coordinate.of(img);
		js.Utils.removeClassE(mdiv,"hidden");
		mdiv.style.width = oc.w + "px";
		mdiv.style.height = oc.h + "px";
		var dw = Math.round(Math.min(c.x,(c.w - oc.w) / 2));
		var dh = Math.round(Math.min(c.y,(c.h - oc.h) / 2));
		div.style.zIndex = 5;
		div.style.position = "absolute";
		div.style.marginLeft = -dw + "px";
		div.style.marginTop = -dh + "px";
		div.style.marginRight = dw + "px";
		div.style.marginBottom = dh + "px";
	} else {
		div.style.position = "static";
		div.style.zIndex = null;
		div.style.margin = "0px";
		js.Utils.addClassE(mdiv,"hidden");
	}
}
js.App.scrollTop = function() {
	var s = null;
	var doc = js.Lib.document;
	var win = js.Lib.window;
	s = win.scrollY;
	if(s == null && doc.documentElement != null) s = doc.documentElement.scrollTop;
	if(s == null) s = doc.body.scrollTop;
	if(s > 200) js.Lib.window.scrollTo(0,60);
}
js.App.windowScrollVisible = function(element) {
	var p = element;
	var y = 0;
	while(p != null) {
		y += p.offsetTop;
		p = p.offsetParent;
	}
	var t = Math.max(0,y - 25);
	var b = y + element.clientHeight + 10 - js.Lib.window.innerHeight;
	var s = Math.min(t,b) | 0;
	js.Lib.window.scrollTo(0,s);
}
js.Boot = $hxClasses["js.Boot"] = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__string_rec(v,"");
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof(console) != "undefined" && console.log != null) console.log(msg);
}
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
}
js.Boot.isClass = function(o) {
	return o.__name__;
}
js.Boot.isEnum = function(e) {
	return e.__ename__;
}
js.Boot.getClass = function(o) {
	return o.__class__;
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
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
			if(cl == Array) return o.__enum__ == null;
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	} catch( e ) {
		if(cl == null) return false;
	}
	switch(cl) {
	case Int:
		return Math.ceil(o%2147483648.0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return o === true || o === false;
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o == null) return false;
		if(cl == Class && o.__name__ != null) return true; else null;
		if(cl == Enum && o.__ename__ != null) return true; else null;
		return o.__enum__ == cl;
	}
}
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
}
js.Lib = $hxClasses["js.Lib"] = function() { }
js.Lib.__name__ = ["js","Lib"];
js.Lib.document = null;
js.Lib.window = null;
js.Lib.debug = function() {
	debugger;
}
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
}
js.Lib.eval = function(code) {
	return eval(code);
}
js.Lib.setErrorHandler = function(f) {
	js.Lib.onerror = f;
}
js.Selection = $hxClasses["js.Selection"] = function(doc) {
	this.doc = doc;
};
js.Selection.__name__ = ["js","Selection"];
js.Selection.prototype = {
	insert: function(left,text,right) {
		this.doc.focus();
		if(this.doc.selectionStart != null) {
			var top = this.doc.scrollTop;
			var start = this.doc.selectionStart;
			var end = this.doc.selectionEnd;
			this.doc.value = Std.string(this.doc.value.substr(0,start)) + left + text + right + Std.string(this.doc.value.substr(end));
			this.doc.selectionStart = start + left.length;
			this.doc.selectionEnd = start + left.length + text.length;
			this.doc.scrollTop = top;
			return;
		}
		var range = js.Lib.document.selection.createRange();
		range.text = left + text + right;
		range.moveStart("character",-text.length - right.length);
		range.moveEnd("character",-right.length);
		range.select();
	}
	,select: function(start,end) {
		this.doc.focus();
		if(this.doc.selectionStart != null) {
			this.doc.selectionStart = start;
			this.doc.selectionEnd = end;
			return;
		}
		var value = this.doc.value;
		var p = 0, delta = 0;
		while(true) {
			var i = value.indexOf("\r\n",p);
			if(i < 0 || i > start) break;
			delta++;
			p = i + 2;
		}
		start -= delta;
		while(true) {
			var i = value.indexOf("\r\n",p);
			if(i < 0 || i > end) break;
			delta++;
			p = i + 2;
		}
		end -= delta;
		var r = this.doc.createTextRange();
		r.moveEnd("textedit",-1);
		r.moveStart("character",start);
		r.moveEnd("character",end - start);
		r.select();
	}
	,get: function() {
		if(this.doc.selectionStart != null) return this.doc.value.substring(this.doc.selectionStart,this.doc.selectionEnd);
		var range = js.Lib.document.selection.createRange();
		if(range.parentElement() != this.doc) return "";
		return range.text;
	}
	,doc: null
	,__class__: js.Selection
}
js.TimerQueue = $hxClasses["js.TimerQueue"] = function(delay) {
	this.delay = delay == null?1:delay;
	this.q = new Array();
};
js.TimerQueue.__name__ = ["js","TimerQueue"];
js.TimerQueue.prototype = {
	process: function() {
		var f = this.q.shift();
		if(f == null) {
			this.t.stop();
			this.t = null;
			return;
		}
		f();
	}
	,add: function(f) {
		this.q.push(f);
		if(this.t == null) {
			this.t = new haxe.Timer(this.delay);
			this.t.run = $bind(this,this.process);
		}
	}
	,q: null
	,t: null
	,delay: null
	,__class__: js.TimerQueue
}
if(!js.fx) js.fx = {}
js.fx.Accordion = $hxClasses["js.fx.Accordion"] = function(onlyOneItemActive) {
	this.time = 200;
	this.exclusive = onlyOneItemActive == false?false:true;
	this.items = new List();
	this.current = null;
	this.transition = null;
};
js.fx.Accordion.__name__ = ["js","fx","Accordion"];
js.fx.Accordion.prototype = {
	toggleActive: function(item) {
		item.active = !item.active;
		if(this.onChangeStatus != null) this.onChangeStatus(item);
		if(item.active) js.fx.Tool.addCssClass(item.title,"active"); else js.fx.Tool.removeCssClass(item.title,"active");
	}
	,clicked: function(item) {
		if(!this.exclusive) {
			this.toggleActive(item);
			item.slide.duration = this.getDuration();
			item.slide.toggle();
			return;
		}
		var anim = new js.fx.MultiMorph();
		if(this.exclusive) {
			if(this.current == item) {
				this.toggleActive(item);
				anim.add(item.slide);
				this.current = null;
			} else {
				if(this.current != null) {
					anim.add(this.current.slide);
					this.toggleActive(this.current);
				}
				this.current = item;
				anim.add(item.slide);
				this.toggleActive(item);
			}
		}
		anim.onComplete = function() {
			var $it0 = anim.anims.iterator();
			while( $it0.hasNext() ) {
				var a = $it0.next();
				a.updateOpenStatus();
			}
		};
		anim.duration = this.time;
		anim.start();
	}
	,collapseAll: function(animate) {
		if(animate == null) animate = true;
		if(this.exclusive) this.current = null;
		var $it0 = this.items.iterator();
		while( $it0.hasNext() ) {
			var item = $it0.next();
			if(item.active) {
				this.toggleActive(item);
				item.slide.duration = this.getDuration();
				if(animate) item.slide.toggle(); else item.slide.hide();
			}
		}
	}
	,expandAll: function(animate) {
		if(animate == null) animate = true;
		if(this.exclusive) return;
		var $it0 = this.items.iterator();
		while( $it0.hasNext() ) {
			var item = $it0.next();
			if(!item.active) {
				this.toggleActive(item);
				item.slide.duration = this.getDuration();
				if(animate) item.slide.toggle(); else item.slide.show();
			}
		}
	}
	,add: function(title,content,open) {
		var item = { title : title, content : content, slide : new js.fx.Slide(content,js.fx.SlideKind.Vertical), active : false};
		if(this.transition != null) item.slide.transition = this.transition;
		item.slide.duration = this.getDuration();
		this.items.push(item);
		var me = this;
		title.onclick = function(_) {
			me.clicked(item);
		};
		if(open == true) {
			item.active = true;
			js.fx.Tool.addCssClass(item.title,"active");
			if(this.exclusive && this.current != null) {
				this.current.slide.hide();
				this.current.active = false;
				js.fx.Tool.removeCssClass(this.current.title,"active");
				this.current = item;
			}
			this.current = item;
		} else item.slide.hide();
	}
	,setTransition: function(t) {
		this.transition = js.fx.TransitionFunctions.get(t);
		var $it0 = this.items.iterator();
		while( $it0.hasNext() ) {
			var i = $it0.next();
			i.slide.transition = this.transition;
		}
	}
	,getDuration: function() {
		return this.time;
	}
	,setDuration: function(v) {
		this.time = v;
		var $it0 = this.items.iterator();
		while( $it0.hasNext() ) {
			var i = $it0.next();
			i.slide.duration = this.time;
		}
		return this.time;
	}
	,onChangeStatus: null
	,transition: null
	,time: null
	,exclusive: null
	,items: null
	,current: null
	,__class__: js.fx.Accordion
	,__properties__: {set_duration:"setDuration",get_duration:"getDuration"}
}
js.fx.Anim = $hxClasses["js.fx.Anim"] = function() {
	this.fps = 60;
	this.duration = 250;
	this.transition = js.fx.TransitionFunctions.get(js.fx.Transition.Linear);
};
js.fx.Anim.__name__ = ["js","fx","Anim"];
js.fx.Anim.prototype = {
	startTimer: function() {
		if(this.timer != null) return false;
		this.time = new Date().getTime() - this.time;
		this.timer = js.fx.Timer.periodical((function(f) {
			return function() {
				return f();
			};
		})($bind(this,this.next)),Math.round(1000 / this.fps));
		return true;
	}
	,stopTimer: function() {
		if(this.timer == null) return false;
		this.time = new Date().getTime() - this.time;
		this.timer = js.fx.Timer.clear(this.timer);
		return true;
	}
	,complete: function() {
		if(this.stopTimer()) {
			if(this.onComplete != null) this.onComplete();
			return true;
		}
		return false;
	}
	,next: function() {
		var now = new Date().getTime();
		if(now < this.time + this.duration) {
			var delta = this.transition((now - this.time) / this.duration);
			this.set(delta);
		} else {
			this.set(1);
			this.complete();
		}
	}
	,set: function(delta) {
		throw "set(delta:Float) not implemented";
	}
	,resume: function() {
		this.startTimer();
	}
	,pause: function() {
		this.stopTimer();
	}
	,cancel: function() {
		if(this.stopTimer() && this.onCancel != null) this.onCancel();
	}
	,start: function() {
		this.time = 0;
		this.startTimer();
		if(this.onStart != null) this.onStart();
	}
	,setTransition: function(t) {
		this.transition = js.fx.TransitionFunctions.get(t);
	}
	,onCancel: null
	,onStart: null
	,onComplete: null
	,transition: null
	,timer: null
	,time: null
	,fps: null
	,duration: null
	,__class__: js.fx.Anim
}
js.fx.Coordinate = $hxClasses["js.fx.Coordinate"] = function() { }
js.fx.Coordinate.__name__ = ["js","fx","Coordinate"];
js.fx.Coordinate.getAbsoluteDiff = function(e) {
	var p = e;
	while(p != null) {
		if(p.style != null) {
			var s = js.fx.Style.getStyles(p,{ position : "", left : "", right : "", top : "", bottom : ""});
			if(s.left != "auto" || s.top != "auto" || s.right != "auto" || s.bottom != "auto") return e == p?js.fx.Coordinate.of(e.offsetParent):js.fx.Coordinate.of(p);
		}
		p = p.parentNode;
	}
	return { x : 0, y : 0, w : 0, h : 0};
}
js.fx.Coordinate.of = function(e) {
	var p = e;
	var x = 0;
	var y = 0;
	var h = e.clientHeight;
	var w = e.clientWidth;
	x = e.offsetLeft;
	y = e.offsetTop;
	var off = e.offsetParent;
	while(off != null) {
		x += off.offsetLeft;
		y += off.offsetTop;
		off = off.offsetParent;
	}
	return { x : x, y : y, h : h, w : w};
}
js.fx.Coordinate.set = function(e,c) {
	e.style.left = c.x + "px";
	e.style.top = c.y + "px";
}
js.fx.MultiMorph = $hxClasses["js.fx.MultiMorph"] = function() {
	js.fx.Anim.call(this);
	this.anims = new List();
};
js.fx.MultiMorph.__name__ = ["js","fx","MultiMorph"];
js.fx.MultiMorph.__super__ = js.fx.Anim;
js.fx.MultiMorph.prototype = $extend(js.fx.Anim.prototype,{
	set: function(delta) {
		var $it0 = this.anims.iterator();
		while( $it0.hasNext() ) {
			var a = $it0.next();
			a.set(delta);
		}
	}
	,add: function(anim) {
		this.anims.push(anim);
	}
	,anims: null
	,__class__: js.fx.MultiMorph
});
js.fx.Slide = $hxClasses["js.fx.Slide"] = function(e,k,noFlow) {
	js.fx.Anim.call(this);
	this.keepElementSpace = noFlow == true;
	this.element = e;
	this.kind = k;
	if(this.element.wrapper == null) {
		var parent = this.element.parentNode;
		this.wrapper = js.Lib.document.createElement("DIV");
		parent.replaceChild(this.wrapper,this.element);
		this.wrapper.appendChild(this.element);
		js.fx.Style.setStyles(this.wrapper,js.fx.Style.getStyles(this.element,{ marginLeft : 0, marginTop : 0, marginRight : 0, marginBottom : 0, position : ""}));
		js.fx.Style.setStyles(this.wrapper,{ overflow : "hidden", position : "relative", padding : 0});
		js.fx.Style.setStyles(this.element,{ margin : "0px", position : "relative"});
		this.element.wrapper = this.wrapper;
	} else this.wrapper = this.element.wrapper;
	this.open = true;
};
js.fx.Slide.__name__ = ["js","fx","Slide"];
js.fx.Slide.__super__ = js.fx.Anim;
js.fx.Slide.prototype = $extend(js.fx.Anim.prototype,{
	complete: function() {
		if(js.fx.Anim.prototype.complete.call(this)) {
			this.updateOpenStatus();
			return true;
		}
		return false;
	}
	,updateOpenStatus: function() {
		this.open = (function($this) {
			var $r;
			switch( ($this.kind)[1] ) {
			case 0:
				$r = $this.element.style.marginTop == "0px";
				break;
			case 1:
				$r = $this.keepElementSpace?$this.element.style.marginTop == "0px":$this.wrapper.offsetHeight == $this.height;
				break;
			case 2:
				$r = $this.element.style.marginLeft == "0px";
				break;
			case 3:
				$r = $this.keepElementSpace?$this.element.style.marginLeft == "0px":$this.wrapper.offsetWidth == $this.width;
				break;
			}
			return $r;
		}(this));
	}
	,set: function(delta) {
		this.height = this.element.offsetHeight;
		this.width = this.element.offsetWidth;
		if(this.keepElementSpace) {
			switch( (this.kind)[1] ) {
			case 0:
				js.fx.Style.setStyles(this.element,{ marginTop : (this.open?-this.height * delta:-this.height + delta * this.height) | 0});
				break;
			case 1:
				js.fx.Style.setStyles(this.element,{ marginTop : -1 * ((this.open?-this.height * delta:-this.height + delta * this.height) | 0)});
				break;
			case 2:
				js.fx.Style.setStyles(this.element,{ marginLeft : (this.open?-this.width * delta:-this.width + delta * this.width) | 0});
				break;
			case 3:
				js.fx.Style.setStyles(this.element,{ marginLeft : -1 * ((this.open?-this.width * delta:-this.width + delta * this.width) | 0)});
				break;
			}
		} else {
			switch( (this.kind)[1] ) {
			case 0:
				var marginTop = (this.open?-this.height * delta:-this.height + delta * this.height) | 0;
				js.fx.Style.setStyles(this.element,{ marginTop : marginTop});
				js.fx.Style.setStyles(this.wrapper,{ height : this.height + marginTop});
				break;
			case 2:
				var marginLeft = (this.open?-this.width * delta:-this.width + delta * this.width) | 0;
				js.fx.Style.setStyles(this.element,{ marginLeft : marginLeft});
				js.fx.Style.setStyles(this.wrapper,{ width : this.width + marginLeft});
				break;
			case 1:
				var marginTop = -1 * ((this.open?-this.height * delta:-this.height + delta * this.height) | 0);
				js.fx.Style.setStyles(this.wrapper,{ height : this.height - marginTop});
				break;
			case 3:
				var marginLeft = -1 * ((this.open?-this.width * delta:-this.width + delta * this.width) | 0);
				js.fx.Style.setStyles(this.wrapper,{ width : this.width - marginLeft});
				break;
			}
		}
	}
	,toggle: function() {
		if(this.timer != null) {
			this.open = !this.open;
			var elapsed = new Date().getTime() - this.time;
			var remain = this.duration - elapsed;
			this.time = new Date().getTime() - remain;
		} else this.start();
	}
	,show: function() {
		if(this.open) return;
		this.open = true;
		this.set(0);
	}
	,hide: function() {
		if(!this.open) return;
		this.open = false;
		this.set(0);
	}
	,height: null
	,width: null
	,offset: null
	,wrapper: null
	,kind: null
	,element: null
	,keepElementSpace: null
	,open: null
	,__class__: js.fx.Slide
});
js.fx.SlideKind = $hxClasses["js.fx.SlideKind"] = { __ename__ : ["js","fx","SlideKind"], __constructs__ : ["Vertical","VerticalBottom","Horizontal","HorizontalRight"] }
js.fx.SlideKind.Vertical = ["Vertical",0];
js.fx.SlideKind.Vertical.toString = $estr;
js.fx.SlideKind.Vertical.__enum__ = js.fx.SlideKind;
js.fx.SlideKind.VerticalBottom = ["VerticalBottom",1];
js.fx.SlideKind.VerticalBottom.toString = $estr;
js.fx.SlideKind.VerticalBottom.__enum__ = js.fx.SlideKind;
js.fx.SlideKind.Horizontal = ["Horizontal",2];
js.fx.SlideKind.Horizontal.toString = $estr;
js.fx.SlideKind.Horizontal.__enum__ = js.fx.SlideKind;
js.fx.SlideKind.HorizontalRight = ["HorizontalRight",3];
js.fx.SlideKind.HorizontalRight.toString = $estr;
js.fx.SlideKind.HorizontalRight.__enum__ = js.fx.SlideKind;
js.fx.Style = $hxClasses["js.fx.Style"] = function() { }
js.fx.Style.__name__ = ["js","fx","Style"];
js.fx.Style.getDocumentStyles = function(selector) {
	var result = { };
	var found = false;
	var _g1 = 0, _g = js.Lib.document.styleSheets.length;
	while(_g1 < _g) {
		var i = _g1++;
		var sheet = js.Lib.document.styleSheets[i];
		if(sheet.href != null && sheet.href.indexOf("://") != -1 && sheet.href.indexOf(js.Lib.document.domain) == -1) continue;
		var rules = sheet.rules != null?sheet.rules:sheet.cssRules;
		if(rules == null) continue;
		var _g3 = 0, _g2 = rules.length;
		while(_g3 < _g2) {
			var j = _g3++;
			var rule = rules[j];
			if(rule.style == null || rule.selectorText == null || rule.selectorText != selector) continue;
			found = true;
			if(js.fx.Tool.isIE) {
				var _g4 = 0, _g5 = Reflect.fields(rule.style);
				while(_g4 < _g5.length) {
					var f = _g5[_g4];
					++_g4;
					var value = Reflect.field(rule.style,f);
					if(value == null || value == "") continue;
					var value1 = js.fx.Style.parseStyle(value);
					if(value1 != null && value1 != "") result[f] = value1;
				}
			} else {
				var _g5 = 0, _g4 = rule.style.length;
				while(_g5 < _g4) {
					var s = _g5++;
					var style = rule.style[s];
					var camel = js.fx.Style.camel(style);
					var value = Reflect.field(rule.style,camel);
					if(value != null && value != "") result[camel] = js.fx.Style.parseStyle(value);
				}
			}
		}
	}
	if(!found) return null;
	return result;
}
js.fx.Style.getStyles = function(e,template) {
	var getter = null;
	if(e.currentStyle != null) getter = function(key) {
		return e.currentStyle[key];
	};
	if(getter == null) {
		var window = js.Lib.document.defaultView?js.Lib.document.defaultView:js.Lib.document.parentWindow;
		if(window != null && window.getComputedStyle != null) {
			var cs = window.getComputedStyle(e,null);
			if(cs != null) getter = function(key) {
				return cs.getPropertyValue(js.fx.Style.hyphen(key));
			};
		}
	}
	if(getter == null) getter = function(key) {
		return Reflect.field(e,key);
	};
	var result = { };
	var _g = 0, _g1 = Reflect.fields(template);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		var currentValue = f == "opacity"?Std.string(js.fx.Style.getOpacity(e)):getter(f);
		var expectedType = Reflect.field(template,f);
		if(js.Boot.__instanceof(expectedType,js.fx.RGBA)) {
			var value = js.fx.RGBA.parse(currentValue);
			if(value == null) value = new js.fx.RGBA(0,0,0,0);
			result[f] = value;
			continue;
		}
		if(js.Boot.__instanceof(expectedType,js.fx.RGB)) {
			var value = js.fx.RGB.parse(currentValue);
			if(value == null) value = new js.fx.RGB(0,0,0);
			result[f] = value;
			continue;
		}
		if(js.Boot.__instanceof(expectedType,js.fx.Unit)) {
			var value = js.fx.Unit.parse(currentValue);
			if(value == null) value = new js.fx.Unit(expectedType.kind,0);
			if(value.kind != expectedType.kind) throw "Unit kind mismatch " + Std.string(value) + " != " + Std.string(expectedType);
			result[f] = value;
			continue;
		}
		if(js.Boot.__instanceof(expectedType,String)) result[f] = currentValue;
		var type = Type["typeof"](expectedType);
		if(type == ValueType.TFloat || f == "opacity") {
			var value = Std.parseFloat(Std.string(currentValue)) + 0.000000001;
			if(value == null) value = 0.000000001;
			result[f] = value;
		} else if(type == ValueType.TInt) {
			var value = Std.parseInt(Std.string(currentValue));
			if(value == null) value = 0;
			result[f] = value;
		}
	}
	return result;
}
js.fx.Style.setStyles = function(e,styles) {
	var _g = 0, _g1 = Reflect.fields(styles);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		js.fx.Style.setStyle(e,f,Reflect.field(styles,f));
	}
}
js.fx.Style.setStyle = function(e,property,value) {
	switch(property) {
	case "opacity":
		js.fx.Style.setOpacity(e,value);
		return;
	case "float":
		property = js.fx.Style.REQUIRES_FILTERS?"styleFloat":"cssFloat";
		break;
	case "zIndex":
		value = Std.string(value);
		break;
	}
	e.style[property] = js.fx.Style.styleValueToString(value);
}
js.fx.Style.setOpacity = function(e,opacity) {
	e.style.visibility = opacity == 0.0?"hidden":"visible";
	if(js.fx.Style.REQUIRES_FILTERS) {
		e.style.zoom = 1;
		e.style["-ms-filter"] = "\"progid:DXImageTransform.Microsoft.Alpha(Opacity=" + (opacity * 100 | 0) + ")\"";
		e.style.filter = opacity == 1.0?"":"alpha(opacity=" + (opacity * 100 | 0) + ")";
	}
	e.style.opacity = opacity;
	e.style._opacity = opacity;
}
js.fx.Style.getOpacity = function(element) {
	var v = element.style._opacity;
	if(v == null) return (function($this) {
		var $r;
		switch(element.style.visibility) {
		case "visible":
			$r = 1.0;
			break;
		case "hidden":
			$r = 0.0;
			break;
		case "":
			$r = element.style.display == "none"?0.0:1.0;
			break;
		}
		return $r;
	}(this));
	return v;
}
js.fx.Style.styleValueToString = function(v) {
	return (function($this) {
		var $r;
		var $e = (Type["typeof"](v));
		switch( $e[1] ) {
		case 6:
			var c = $e[2];
			$r = Std.string(v);
			break;
		case 1:
			$r = Std.string(v) + "px";
			break;
		case 2:
			$r = Std.string(v);
			break;
		case 0:
			$r = "";
			break;
		default:
			$r = (function($this) {
				var $r;
				throw "Unsupported js.fx.Style value " + Std.string(Type["typeof"](v));
				return $r;
			}($this));
		}
		return $r;
	}(this));
}
js.fx.Style.parseStyle = function(s) {
	var rgba = js.fx.RGBA.parse(s);
	if(rgba != null) return rgba;
	var rgb = js.fx.RGB.parse(s);
	if(rgb != null) return rgb;
	var unit = js.fx.Unit.parse(s);
	if(unit != null) return unit;
	return s;
}
js.fx.Style.camel = function(hyphen) {
	return new EReg("(-[a-z])","").customReplace(hyphen,function(reg) {
		return reg.matched(1).charAt(1).toUpperCase();
	});
}
js.fx.Style.hyphen = function(camel) {
	return new EReg("([A-Z])","").customReplace(camel,function(reg) {
		return "-" + reg.matched(1).toLowerCase();
	});
}
js.fx.RGBA = $hxClasses["js.fx.RGBA"] = function(r,g,b,a) {
	this.r = r;
	this.g = g;
	this.b = g;
	this.a = a;
};
js.fx.RGBA.__name__ = ["js","fx","RGBA"];
js.fx.RGBA.hexToInt = function(str) {
	str = str.toLowerCase();
	if(str.length == 0) return 0;
	if(str.length == 1) {
		var c = HxOverrides.cca(str,0);
		var a = HxOverrides.cca("a",0);
		if(c >= a) return 10 + c - a;
		var z = HxOverrides.cca("0",0);
		if(c >= z) return c - z;
	}
	if(str.length == 2) return 16 * js.fx.RGBA.hexToInt(str.charAt(0)) + js.fx.RGBA.hexToInt(str.charAt(1));
	return 0;
}
js.fx.RGBA.parse = function(value) {
	var reg = new EReg("^#?([a-f0-9]{1,2})([a-f0-9]{1,2})([a-f0-9]{1,2})([a-f0-9]{1,2})$","i");
	if(reg.match(value)) {
		var result = new js.fx.RGBA(js.fx.RGBA.hexToInt(reg.matched(1)),js.fx.RGBA.hexToInt(reg.matched(2)),js.fx.RGBA.hexToInt(reg.matched(3)),js.fx.RGBA.hexToInt(reg.matched(4)));
		return result;
	}
	var reg1 = new EReg("rgba\\(\\s*(\\d+),\\s*(\\d+),\\s*(\\d+),\\s*(\\d+)\\s*\\)","");
	if(reg1.match(value)) return new js.fx.RGBA(Std.parseInt(reg1.matched(1)),Std.parseInt(reg1.matched(2)),Std.parseInt(reg1.matched(3)),Std.parseInt(reg1.matched(4)));
	return null;
}
js.fx.RGBA.prototype = {
	toString: function() {
		return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
	}
	,a: null
	,b: null
	,g: null
	,r: null
	,__class__: js.fx.RGBA
}
js.fx.RGB = $hxClasses["js.fx.RGB"] = function(r,g,b) {
	this.r = r;
	this.g = g;
	this.b = g;
};
js.fx.RGB.__name__ = ["js","fx","RGB"];
js.fx.RGB.hexToInt = function(str) {
	str = str.toLowerCase();
	if(str.length == 0) return 0;
	if(str.length == 1) {
		var c = HxOverrides.cca(str,0);
		var a = HxOverrides.cca("a",0);
		if(c >= a) return 10 + c - a;
		var z = HxOverrides.cca("0",0);
		if(c >= z) return c - z;
	}
	if(str.length == 2) return 16 * js.fx.RGB.hexToInt(str.charAt(0)) + js.fx.RGB.hexToInt(str.charAt(1));
	return 0;
}
js.fx.RGB.parse = function(value) {
	var reg = new EReg("^#?([a-f0-9]{1,2})([a-f0-9]{1,2})([a-f0-9]{1,2})$","i");
	if(reg.match(value)) {
		var result = new js.fx.RGB(js.fx.RGB.hexToInt(reg.matched(1)),js.fx.RGB.hexToInt(reg.matched(2)),js.fx.RGB.hexToInt(reg.matched(3)));
		return result;
	}
	var reg1 = new EReg("rgb\\(\\s*(\\d+),\\s*(\\d+),\\s*(\\d+)\\s*\\)","");
	if(reg1.match(value)) return new js.fx.RGB(Std.parseInt(reg1.matched(1)),Std.parseInt(reg1.matched(2)),Std.parseInt(reg1.matched(3)));
	return null;
}
js.fx.RGB.prototype = {
	toString: function() {
		return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
	}
	,b: null
	,g: null
	,r: null
	,__class__: js.fx.RGB
}
js.fx.UnitKind = $hxClasses["js.fx.UnitKind"] = { __ename__ : ["js","fx","UnitKind"], __constructs__ : ["KEm","KPt","KPc","KPx"] }
js.fx.UnitKind.KEm = ["KEm",0];
js.fx.UnitKind.KEm.toString = $estr;
js.fx.UnitKind.KEm.__enum__ = js.fx.UnitKind;
js.fx.UnitKind.KPt = ["KPt",1];
js.fx.UnitKind.KPt.toString = $estr;
js.fx.UnitKind.KPt.__enum__ = js.fx.UnitKind;
js.fx.UnitKind.KPc = ["KPc",2];
js.fx.UnitKind.KPc.toString = $estr;
js.fx.UnitKind.KPc.__enum__ = js.fx.UnitKind;
js.fx.UnitKind.KPx = ["KPx",3];
js.fx.UnitKind.KPx.toString = $estr;
js.fx.UnitKind.KPx.__enum__ = js.fx.UnitKind;
js.fx.Unit = $hxClasses["js.fx.Unit"] = function(k,v) {
	this.kind = k;
	this.value = v;
	this.toString = (function($this) {
		var $r;
		switch( (k)[1] ) {
		case 0:
			$r = $bind($this,$this.emToString);
			break;
		case 1:
			$r = $bind($this,$this.ptToString);
			break;
		case 2:
			$r = $bind($this,$this.pcToString);
			break;
		case 3:
			$r = $bind($this,$this.pxToString);
			break;
		}
		return $r;
	}(this));
};
js.fx.Unit.__name__ = ["js","fx","Unit"];
js.fx.Unit.parse = function(value) {
	var reg = new EReg("^(\\-?[0-9.]+)(em|pt|%|px|)$","i");
	if(!reg.match(value)) return null;
	var val = Std.parseFloat(reg.matched(1));
	var kst = reg.matched(2);
	return (function($this) {
		var $r;
		switch(kst) {
		case "em":
			$r = new js.fx.Unit(js.fx.UnitKind.KEm,val);
			break;
		case "pt":
			$r = new js.fx.Unit(js.fx.UnitKind.KPt,val);
			break;
		case "px":
			$r = new js.fx.Unit(js.fx.UnitKind.KPx,val);
			break;
		case "%":
			$r = new js.fx.Unit(js.fx.UnitKind.KPc,val);
			break;
		default:
			$r = new js.fx.Unit(js.fx.UnitKind.KPx,val);
		}
		return $r;
	}(this));
}
js.fx.Unit.prototype = {
	pxToString: function() {
		return Math.round(this.value) + "px";
	}
	,pcToString: function() {
		return Math.round(this.value * 10) / 10 + "%";
	}
	,ptToString: function() {
		return Math.round(this.value * 10) / 10 + "pt";
	}
	,emToString: function() {
		return Math.round(this.value * 10) / 10 + "em";
	}
	,toString: null
	,value: null
	,kind: null
	,__class__: js.fx.Unit
}
js.fx.Delta = $hxClasses["js.fx.Delta"] = function() { }
js.fx.Delta.__name__ = ["js","fx","Delta"];
js.fx.Delta.getDeltaFunc = function(from,to) {
	return js.Boot.__instanceof(from,js.fx.RGB)?js.fx.Delta.rgb:js.Boot.__instanceof(from,js.fx.RGBA)?js.fx.Delta.rgba:js.Boot.__instanceof(from,js.fx.Unit)?js.fx.Delta.unit:js.Boot.__instanceof(from,String)?js.fx.Delta.string:Type["typeof"](from) == ValueType.TFloat?js.fx.Delta["float"]:Type["typeof"](from) == ValueType.TInt?js.fx.Delta["int"]:js.fx.Delta.unknown;
}
js.fx.Delta.styles = function(from,to,delta) {
	var result = { };
	var _g = 0, _g1 = Reflect.fields(from);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		result[f] = js.fx.Delta.any(Reflect.field(from,f),Reflect.field(to,f),delta);
	}
	return result;
}
js.fx.Delta.unknown = function(from,to,delta) {
	return delta < 0.5?from:to;
}
js.fx.Delta.any = function(a,b,delta) {
	return (js.fx.Delta.getDeltaFunc(a,b))(a,b,delta);
}
js.fx.Delta.rgb = function(from,to,delta) {
	return new js.fx.RGB(js.fx.Delta["int"](from.r,to.r,delta),js.fx.Delta["int"](from.g,to.g,delta),js.fx.Delta["int"](from.b,to.b,delta));
}
js.fx.Delta.rgba = function(from,to,delta) {
	return new js.fx.RGBA(js.fx.Delta["int"](from.r,to.r,delta),js.fx.Delta["int"](from.g,to.g,delta),js.fx.Delta["int"](from.b,to.b,delta),js.fx.Delta["int"](from.a,to.a,delta));
}
js.fx.Delta.unit = function(from,to,delta) {
	return new js.fx.Unit(from.kind,js.fx.Delta["float"](from.value,to.value,delta));
}
js.fx.Delta.string = function(from,to,delta) {
	return delta < 0.5?from:to;
}
js.fx.Delta["int"] = function(from,to,delta) {
	return Math.floor((to - from) * delta + from) | 0;
}
js.fx.Delta["float"] = function(from,to,delta) {
	return (to - from) * delta + from;
}
js.fx.Timer = $hxClasses["js.fx.Timer"] = function() {
};
js.fx.Timer.__name__ = ["js","fx","Timer"];
js.fx.Timer.timeout = function(cb,delay) {
	var t = new js.fx.Timer();
	t.data = setTimeout(cb,delay);
	return t;
}
js.fx.Timer.periodical = function(cb,delay) {
	var t = new js.fx.Timer();
	t.data = setInterval(cb,delay);
	return t;
}
js.fx.Timer.clear = function(t) {
	clearTimeout(t.data);
	clearInterval(t.data);
	return null;
}
js.fx.Timer.prototype = {
	data: null
	,__class__: js.fx.Timer
}
js.fx.Tool = $hxClasses["js.fx.Tool"] = function() { }
js.fx.Tool.__name__ = ["js","fx","Tool"];
js.fx.Tool.nextElement = function(node) {
	var next = node.nextSibling;
	while(next != null && next.nodeName != node.nodeName) next = next.nextSibling;
	return next;
}
js.fx.Tool.prevElement = function(node) {
	var prev = node.previousSibling;
	while(prev != null && prev.nodeName != node.nodeName) prev = prev.previousSibling;
	return prev;
}
js.fx.Tool.placeBefore = function(newNode,oldNode) {
	if(newNode.parentNode != null) newNode.parentNode.removeChild(newNode);
	oldNode.parentNode.insertBefore(newNode,oldNode);
}
js.fx.Tool.placeAfter = function(newNode,oldNode) {
	if(newNode.parentNode != null) newNode.parentNode.removeChild(newNode);
	if(oldNode.nextSibling == null) oldNode.parentNode.appendChild(newNode); else oldNode.parentNode.insertBefore(newNode,oldNode.nextSibling);
}
js.fx.Tool.trace = function(x) {
	js.Lib.document.getElementById("trace").innerHTML = Std.string(x);
}
js.fx.Tool.addCssClass = function(e,c) {
	if(e.className.indexOf(c) == -1) e.className = e.className + " " + c;
}
js.fx.Tool.removeCssClass = function(e,c) {
	if(e.className.indexOf(c) != -1) e.className = StringTools.replace(e.className,c,"");
}
js.fx.Tool.preventDefault = function(evt) {
	if(evt == null) evt = js.Lib.window.event;
	if(evt.preventDefault != null) evt.preventDefault(); else evt.returnValue = false;
	return false;
}
js.fx.Tool.cancelBubble = function(evt) {
	if(evt == null) evt = js.Lib.window.event;
	if($bind(evt,evt.stopPropagation) != null) evt.stopPropagation(); else evt.cancelBubble = true;
	return false;
}
js.fx.Tool.findElementsWithClassName = function(parent,tag,className) {
	if(parent == null) parent = js.Lib.document.body;
	if(tag == null) tag = "*";
	var elements = tag == "*" && parent.all != null?parent.all:parent.getElementsByTagName(tag);
	var results = new List();
	var regexp = new EReg("(^|\\s)" + className + "(\\s|$)","");
	var _g1 = 0, _g = elements.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(Std.string(elements[i].className) == "") continue;
		if(regexp.match("" + elements[i].className)) results.push(elements[i]);
	}
	return results;
}
js.fx.Transition = $hxClasses["js.fx.Transition"] = { __ename__ : ["js","fx","Transition"], __constructs__ : ["Linear","Quad","Cubic","Quart","Quint","Pow","Expo","Circ","Sine","Back","Bounce","Elastic"] }
js.fx.Transition.Linear = ["Linear",0];
js.fx.Transition.Linear.toString = $estr;
js.fx.Transition.Linear.__enum__ = js.fx.Transition;
js.fx.Transition.Quad = function(p) { var $x = ["Quad",1,p]; $x.__enum__ = js.fx.Transition; $x.toString = $estr; return $x; }
js.fx.Transition.Cubic = function(p) { var $x = ["Cubic",2,p]; $x.__enum__ = js.fx.Transition; $x.toString = $estr; return $x; }
js.fx.Transition.Quart = function(p) { var $x = ["Quart",3,p]; $x.__enum__ = js.fx.Transition; $x.toString = $estr; return $x; }
js.fx.Transition.Quint = function(p) { var $x = ["Quint",4,p]; $x.__enum__ = js.fx.Transition; $x.toString = $estr; return $x; }
js.fx.Transition.Pow = function(pa) { var $x = ["Pow",5,pa]; $x.__enum__ = js.fx.Transition; $x.toString = $estr; return $x; }
js.fx.Transition.Expo = function(p) { var $x = ["Expo",6,p]; $x.__enum__ = js.fx.Transition; $x.toString = $estr; return $x; }
js.fx.Transition.Circ = function(p) { var $x = ["Circ",7,p]; $x.__enum__ = js.fx.Transition; $x.toString = $estr; return $x; }
js.fx.Transition.Sine = function(p) { var $x = ["Sine",8,p]; $x.__enum__ = js.fx.Transition; $x.toString = $estr; return $x; }
js.fx.Transition.Back = function(p,pa) { var $x = ["Back",9,p,pa]; $x.__enum__ = js.fx.Transition; $x.toString = $estr; return $x; }
js.fx.Transition.Bounce = function(p) { var $x = ["Bounce",10,p]; $x.__enum__ = js.fx.Transition; $x.toString = $estr; return $x; }
js.fx.Transition.Elastic = function(p,pa) { var $x = ["Elastic",11,p,pa]; $x.__enum__ = js.fx.Transition; $x.toString = $estr; return $x; }
js.fx.TransitionFunctions = $hxClasses["js.fx.TransitionFunctions"] = function() { }
js.fx.TransitionFunctions.__name__ = ["js","fx","TransitionFunctions"];
js.fx.TransitionFunctions.transitionParam = function(p,f) {
	return (function($this) {
		var $r;
		switch( (p)[1] ) {
		case 0:
			$r = f;
			break;
		case 1:
			$r = function(pos) {
				return 1 - f(1 - pos);
			};
			break;
		case 2:
			$r = function(pos) {
				return pos <= 0.5?f(2 * pos) / 2:2 - f(2 * (1 - pos)) / 2;
			};
			break;
		}
		return $r;
	}(this));
}
js.fx.TransitionFunctions.get = function(t) {
	return (function($this) {
		var $r;
		var $e = (t);
		switch( $e[1] ) {
		case 0:
			$r = js.fx.TransitionFunctions.linear;
			break;
		case 1:
			var p = $e[2];
			$r = js.fx.TransitionFunctions.transitionParam(p,js.fx.TransitionFunctions.quad);
			break;
		case 2:
			var p = $e[2];
			$r = js.fx.TransitionFunctions.transitionParam(p,js.fx.TransitionFunctions.cubic);
			break;
		case 3:
			var p = $e[2];
			$r = js.fx.TransitionFunctions.transitionParam(p,js.fx.TransitionFunctions.quart);
			break;
		case 4:
			var p = $e[2];
			$r = js.fx.TransitionFunctions.transitionParam(p,js.fx.TransitionFunctions.quint);
			break;
		case 5:
			var p = $e[2];
			$r = (function(f,x) {
				return function(p1) {
					return f(x,p1);
				};
			})(js.fx.TransitionFunctions.pow,p);
			break;
		case 6:
			var p = $e[2];
			$r = js.fx.TransitionFunctions.transitionParam(p,js.fx.TransitionFunctions.expo);
			break;
		case 7:
			var p = $e[2];
			$r = js.fx.TransitionFunctions.transitionParam(p,js.fx.TransitionFunctions.circ);
			break;
		case 8:
			var p = $e[2];
			$r = js.fx.TransitionFunctions.transitionParam(p,js.fx.TransitionFunctions.sine);
			break;
		case 9:
			var pa = $e[3], p = $e[2];
			$r = js.fx.TransitionFunctions.transitionParam(p,(function(f1,pa1) {
				return function(p1) {
					return f1(pa1,p1);
				};
			})(js.fx.TransitionFunctions.back,pa));
			break;
		case 10:
			var p = $e[2];
			$r = js.fx.TransitionFunctions.transitionParam(p,js.fx.TransitionFunctions.bounce);
			break;
		case 11:
			var pa = $e[3], p = $e[2];
			$r = js.fx.TransitionFunctions.transitionParam(p,(function(f2,pa2) {
				return function(p1) {
					return f2(pa2,p1);
				};
			})(js.fx.TransitionFunctions.elastic,pa));
			break;
		}
		return $r;
	}(this));
}
js.fx.TransitionFunctions.linear = function(p) {
	return p;
}
js.fx.TransitionFunctions.pow = function(x,p) {
	if(x == null) x = 6.0;
	return Math.pow(p,x);
}
js.fx.TransitionFunctions.expo = function(p) {
	return Math.pow(2,8 * (p - 1));
}
js.fx.TransitionFunctions.circ = function(p) {
	return 1 - Math.sin(Math.acos(p));
}
js.fx.TransitionFunctions.sine = function(p) {
	return 1 - Math.sin((1 - p) * Math.PI / 2);
}
js.fx.TransitionFunctions.back = function(pa,p) {
	if(pa == null) pa = 1.618;
	return Math.pow(p,2) * ((pa + 1) * p - pa);
}
js.fx.TransitionFunctions.bounce = function(p) {
	var value = null;
	var a = 0.0;
	var b = 1.0;
	while(true) {
		if(p >= (7 - 4 * a) / 11) {
			value = -Math.pow((11 - 6 * a - 11 * p) / 4,2) + b * b;
			break;
		}
		a += b;
		b /= 2.0;
	}
	return value;
}
js.fx.TransitionFunctions.elastic = function(pa,p) {
	if(pa == null) pa = 1.0;
	return Math.pow(2,10 * --p) * Math.cos(20 * p * Math.PI * pa / 3);
}
js.fx.TransitionFunctions.quad = function(p) {
	return Math.pow(p,2);
}
js.fx.TransitionFunctions.cubic = function(p) {
	return Math.pow(p,3);
}
js.fx.TransitionFunctions.quart = function(p) {
	return Math.pow(p,4);
}
js.fx.TransitionFunctions.quint = function(p) {
	return Math.pow(p,5);
}
js.fx.TransitionParam = $hxClasses["js.fx.TransitionParam"] = { __ename__ : ["js","fx","TransitionParam"], __constructs__ : ["In","Out","InOut"] }
js.fx.TransitionParam.In = ["In",0];
js.fx.TransitionParam.In.toString = $estr;
js.fx.TransitionParam.In.__enum__ = js.fx.TransitionParam;
js.fx.TransitionParam.Out = ["Out",1];
js.fx.TransitionParam.Out.toString = $estr;
js.fx.TransitionParam.Out.__enum__ = js.fx.TransitionParam;
js.fx.TransitionParam.InOut = ["InOut",2];
js.fx.TransitionParam.InOut.toString = $estr;
js.fx.TransitionParam.InOut.__enum__ = js.fx.TransitionParam;
mt.ArrayStd = $hxClasses["mt.ArrayStd"] = function() { }
mt.ArrayStd.__name__ = ["mt","ArrayStd"];
mt.ArrayStd.size = function(ar) {
	return ar.length;
}
mt.ArrayStd.first = function(ar) {
	return ar[0];
}
mt.ArrayStd.last = function(ar) {
	return ar[ar.length - 1];
}
mt.ArrayStd.clear = function(ar) {
	ar.splice(0,ar.length);
	return ar;
}
mt.ArrayStd.set = function(ar,index,v) {
	ar[index] = v;
	return ar;
}
mt.ArrayStd.at = function(ar,index) {
	return ar[index];
}
mt.ArrayStd.indexOf = function(ar,elt) {
	var id = -1, i = -1;
	var _g = 0;
	while(_g < ar.length) {
		var e = ar[_g];
		++_g;
		++i;
		if(e == elt) {
			id = i;
			break;
		}
	}
	return id;
}
mt.ArrayStd.addFirst = function(ar,e) {
	ar.unshift(e);
	return ar;
}
mt.ArrayStd.addLast = function(ar,e) {
	ar.push(e);
	return ar;
}
mt.ArrayStd.removeFirst = function(ar) {
	return ar.shift();
}
mt.ArrayStd.removeLast = function(ar) {
	return ar.pop();
}
mt.ArrayStd.map = function(ar,f) {
	var output = [];
	var _g = 0;
	while(_g < ar.length) {
		var e = ar[_g];
		++_g;
		output.push(f(e));
	}
	return output;
}
mt.ArrayStd.stripNull = function(ar) {
	while(HxOverrides.remove(ar,null)) {
	}
	return ar;
}
mt.ArrayStd.flatten = function(ar) {
	var out = new Array();
	var _g1 = 0, _g = ar.length;
	while(_g1 < _g) {
		var i = _g1++;
		var $it0 = $iterator(ar[i])();
		while( $it0.hasNext() ) {
			var x = $it0.next();
			out.push(x);
			out;
		}
		out;
	}
	return out;
}
mt.ArrayStd.append = function(ar,it) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		ar.push(x);
		ar;
	}
	return ar;
}
mt.ArrayStd.prepend = function(ar,it) {
	var a = Lambda.array(it);
	a.reverse();
	var _g = 0;
	while(_g < a.length) {
		var x = a[_g];
		++_g;
		ar.unshift(x);
		ar;
	}
	return ar;
}
mt.ArrayStd.shuffle = function(ar,rand) {
	var rnd = rand != null?rand:Std.random;
	var size = ar.length;
	var _g1 = 0, _g = size << 1;
	while(_g1 < _g) {
		var i = _g1++;
		var id0 = rnd(size), id1 = rnd(size);
		var tmp = ar[id0];
		ar[id0] = ar[id1];
		ar[id1] = tmp;
	}
	return ar;
}
mt.ArrayStd.getRandom = function(ar,rnd) {
	var random = rnd != null?rnd:Std.random;
	var id = random(ar.length);
	return ar[id];
}
mt.ArrayStd.usort = function(t,f) {
	var a = t, i = 0, l = t.length;
	while(i < l) {
		var swap = false;
		var j = 0, max = l - i - 1;
		while(j < max) {
			if(f(a[j],a[j + 1]) > 0) {
				var tmp = a[j + 1];
				a[j + 1] = a[j];
				a[j] = tmp;
				swap = true;
			}
			j += 1;
		}
		if(!swap) break;
		i += 1;
	}
	return a;
}
mt.ListStd = $hxClasses["mt.ListStd"] = function() { }
mt.ListStd.__name__ = ["mt","ListStd"];
mt.ListStd.size = function(l) {
	return l.length;
}
mt.ListStd.at = function(l,index) {
	var ite = l.iterator();
	while(--index > -1) ite.next();
	return ite.next();
}
mt.ListStd.indexOf = function(l,elt) {
	var id = -1, i = -1;
	var $it0 = l.iterator();
	while( $it0.hasNext() ) {
		var e = $it0.next();
		++i;
		if(e == elt) {
			id = i;
			break;
		}
	}
	return id;
}
mt.ListStd.addFirst = function(l,e) {
	l.push(e);
	return l;
}
mt.ListStd.addLast = function(l,e) {
	l.add(e);
	return l;
}
mt.ListStd.removeFirst = function(l) {
	return l.pop();
}
mt.ListStd.removeLast = function(l) {
	var cpy = Lambda.list(l);
	var ite = cpy.iterator();
	var last = l.last();
	l.clear();
	var _g1 = 0, _g = cpy.length - 1;
	while(_g1 < _g) {
		var i = _g1++;
		l.add(ite.next());
	}
	return last;
}
mt.ListStd.copy = function(l) {
	return Lambda.list(l);
}
mt.ListStd.flatten = function(l) {
	var out = new List();
	var _g1 = 0, _g = l.length;
	while(_g1 < _g) {
		var i = _g1++;
		var $it0 = $iterator(mt.ListStd.at(l,i))();
		while( $it0.hasNext() ) {
			var x = $it0.next();
			out.add(x);
		}
		out;
	}
	return out;
}
mt.ListStd.append = function(l,it) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(x);
	}
	return l;
}
mt.ListStd.prepend = function(l,it) {
	var a = Lambda.array(it);
	a.reverse();
	var _g = 0;
	while(_g < a.length) {
		var x = a[_g];
		++_g;
		l.push(x);
		l;
	}
	return l;
}
mt.ListStd.reverse = function(l) {
	var cpy = [];
	while(l.length > 0) {
		cpy.unshift(l.pop());
		cpy;
	}
	while(cpy.length > 0) {
		l.push(cpy.pop());
		l;
	}
	return l;
}
mt.ListStd.shuffle = function(l,rand) {
	var ar = Lambda.array(l);
	mt.ArrayStd.shuffle(ar,rand);
	l.clear();
	var _g1 = 0, _g = ar.length;
	while(_g1 < _g) {
		var i = _g1++;
		l.add(ar[i]);
		l;
	}
	ar = null;
	return l;
}
mt.ListStd.slice = function(l,pos,end) {
	var out = new List();
	if(end == null) end = l.length;
	var _g = pos;
	while(_g < end) {
		var i = _g++;
		out.add(mt.ListStd.at(l,i));
		out;
	}
	return out;
}
mt.ListStd.splice = function(l,pos,len) {
	var out = new List();
	var copy = Lambda.list(l);
	l.clear();
	var i = 0;
	var $it0 = copy.iterator();
	while( $it0.hasNext() ) {
		var e = $it0.next();
		if(i < pos) {
			l.add(e);
			l;
		} else if(i >= pos + len) {
			l.add(e);
			l;
		} else {
			out.add(e);
			out;
		}
		i++;
	}
	return out;
}
mt.ListStd.stripNull = function(l) {
	while(l.remove(null)) {
	}
	return l;
}
mt.ListStd.getRandom = function(l,rnd) {
	var random = rnd != null?rnd:Std.random;
	var id = random(l.length);
	return mt.ListStd.at(l,id);
}
mt.ListStd.usort = function(l,f) {
	var a = Lambda.array(l);
	a = mt.ArrayStd.usort(a,f);
	l.clear();
	var _g = 0;
	while(_g < a.length) {
		var e = a[_g];
		++_g;
		l.add(e);
		l;
	}
	return l;
}
mt.StringStd = $hxClasses["mt.StringStd"] = function() { }
mt.StringStd.__name__ = ["mt","StringStd"];
mt.StringStd.getReducedChars = function() {
	return mt.StringStd.MT_CHARS;
}
mt.StringStd.isReduced = function(str) {
	var valid = true;
	haxe.Utf8.iter(str,function(c) {
		if(!mt.StringStd.MT_CHARS.exists(c)) valid = false;
	});
	return valid;
}
mt.js.EditorAction = $hxClasses["mt.js.EditorAction"] = { __ename__ : ["mt","js","EditorAction"], __constructs__ : ["AImage","ANode","ASpan","ALink","AReg"] }
mt.js.EditorAction.AImage = function(tag,url) { var $x = ["AImage",0,tag,url]; $x.__enum__ = mt.js.EditorAction; $x.toString = $estr; return $x; }
mt.js.EditorAction.ANode = function(node,html) { var $x = ["ANode",1,node,html]; $x.__enum__ = mt.js.EditorAction; $x.toString = $estr; return $x; }
mt.js.EditorAction.ASpan = function(node,span) { var $x = ["ASpan",2,node,span]; $x.__enum__ = mt.js.EditorAction; $x.toString = $estr; return $x; }
mt.js.EditorAction.ALink = function(text1,text2,node) { var $x = ["ALink",3,text1,text2,node]; $x.__enum__ = mt.js.EditorAction; $x.toString = $estr; return $x; }
mt.js.EditorAction.AReg = function(ereg,replace) { var $x = ["AReg",4,ereg,replace]; $x.__enum__ = mt.js.EditorAction; $x.toString = $estr; return $x; }
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; };
var $_;
function $bind(o,m) { var f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; return f; };
if(Array.prototype.indexOf) HxOverrides.remove = function(a,o) {
	var i = a.indexOf(o);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
}; else null;
if(String.prototype.cca == null) String.prototype.cca = String.prototype.charCodeAt;
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
Array.prototype.__class__ = $hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
var Void = $hxClasses.Void = { __ename__ : ["Void"]};
Xml.Element = "element";
Xml.PCData = "pcdata";
Xml.CData = "cdata";
Xml.Comment = "comment";
Xml.DocType = "doctype";
Xml.Prolog = "prolog";
Xml.Document = "document";
mt.js.Tip.init();
/**
 * SWFObject v1.5: Flash Player detection and embed - http://blog.deconcept.com/swfobject/
 *
 * SWFObject is (c) 2007 Geoff Stearns and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
if(typeof deconcept=="undefined"){var deconcept=new Object();}if(typeof deconcept.util=="undefined"){deconcept.util=new Object();}if(typeof deconcept.SWFObjectUtil=="undefined"){deconcept.SWFObjectUtil=new Object();}deconcept.SWFObject=function(_1,id,w,h,_5,c,_7,_8,_9,_a){if(!document.getElementById){return;}this.DETECT_KEY=_a?_a:"detectflash";this.skipDetect=deconcept.util.getRequestParameter(this.DETECT_KEY);this.params=new Object();this.variables=new Object();this.attributes=new Array();if(_1){this.setAttribute("swf",_1);}if(id){this.setAttribute("id",id);}if(w){this.setAttribute("width",w);}if(h){this.setAttribute("height",h);}if(_5){this.setAttribute("version",new deconcept.PlayerVersion(_5.toString().split(".")));}this.installedVer=deconcept.SWFObjectUtil.getPlayerVersion();if(!window.opera&&document.all&&this.installedVer.major>7){deconcept.SWFObject.doPrepUnload=true;}if(c){this.addParam("bgcolor",c);}var q=_7?_7:"high";this.addParam("quality",q);this.setAttribute("useExpressInstall",false);this.setAttribute("doExpressInstall",false);var _c=(_8)?_8:window.location;this.setAttribute("xiRedirectUrl",_c);this.setAttribute("redirectUrl","");if(_9){this.setAttribute("redirectUrl",_9);}};deconcept.SWFObject.prototype={useExpressInstall:function(_d){this.xiSWFPath=!_d?"expressinstall.swf":_d;this.setAttribute("useExpressInstall",true);},setAttribute:function(_e,_f){this.attributes[_e]=_f;},getAttribute:function(_10){return this.attributes[_10];},addParam:function(_11,_12){this.params[_11]=_12;},getParams:function(){return this.params;},addVariable:function(_13,_14){this.variables[_13]=_14;},getVariable:function(_15){return this.variables[_15];},getVariables:function(){return this.variables;},getVariablePairs:function(){var _16=new Array();var key;var _18=this.getVariables();for(key in _18){_16[_16.length]=key+"="+_18[key];}return _16;},getSWFHTML:function(){var _19="";if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","PlugIn");this.setAttribute("swf",this.xiSWFPath);}_19="<embed type=\"application/x-shockwave-flash\" src=\""+this.getAttribute("swf")+"\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\"";_19+=" id=\""+this.getAttribute("id")+"\" name=\""+this.getAttribute("id")+"\" ";var _1a=this.getParams();for(var key in _1a){_19+=[key]+"=\""+_1a[key]+"\" ";}var _1c=this.getVariablePairs().join("&");if(_1c.length>0){_19+="flashvars=\""+_1c+"\"";}_19+="/>";}else{if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","ActiveX");this.setAttribute("swf",this.xiSWFPath);}_19="<object id=\""+this.getAttribute("id")+"\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\">";_19+="<param name=\"movie\" value=\""+this.getAttribute("swf")+"\" />";var _1d=this.getParams();for(var key in _1d){_19+="<param name=\""+key+"\" value=\""+_1d[key]+"\" />";}var _1f=this.getVariablePairs().join("&");if(_1f.length>0){_19+="<param name=\"flashvars\" value=\""+_1f+"\" />";}_19+="</object>";}return _19;},write:function(_20){if(this.getAttribute("useExpressInstall")){var _21=new deconcept.PlayerVersion([6,0,65]);if(this.installedVer.versionIsValid(_21)&&!this.installedVer.versionIsValid(this.getAttribute("version"))){this.setAttribute("doExpressInstall",true);this.addVariable("MMredirectURL",escape(this.getAttribute("xiRedirectUrl")));document.title=document.title.slice(0,47)+" - Flash Player Installation";this.addVariable("MMdoctitle",document.title);}}if(this.skipDetect||this.getAttribute("doExpressInstall")||this.installedVer.versionIsValid(this.getAttribute("version"))){var n=(typeof _20=="string")?document.getElementById(_20):_20;n.innerHTML=this.getSWFHTML();return true;}else{if(this.getAttribute("redirectUrl")!=""){document.location.replace(this.getAttribute("redirectUrl"));}}return false;}};deconcept.SWFObjectUtil.getPlayerVersion=function(){var _23=new deconcept.PlayerVersion([0,0,0]);if(navigator.plugins&&navigator.mimeTypes.length){var x=navigator.plugins["Shockwave Flash"];if(x&&x.description){_23=new deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));}}else{if(navigator.userAgent&&navigator.userAgent.indexOf("Windows CE")>=0){var axo=1;var _26=3;while(axo){try{_26++;axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+_26);_23=new deconcept.PlayerVersion([_26,0,0]);}catch(e){axo=null;}}}else{try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");}catch(e){try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");_23=new deconcept.PlayerVersion([6,0,21]);axo.AllowScriptAccess="always";}catch(e){if(_23.major==6){return _23;}}try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");}catch(e){}}if(axo!=null){_23=new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));}}}return _23;};deconcept.PlayerVersion=function(_29){this.major=_29[0]!=null?parseInt(_29[0]):0;this.minor=_29[1]!=null?parseInt(_29[1]):0;this.rev=_29[2]!=null?parseInt(_29[2]):0;};deconcept.PlayerVersion.prototype.versionIsValid=function(fv){if(this.major<fv.major){return false;}if(this.major>fv.major){return true;}if(this.minor<fv.minor){return false;}if(this.minor>fv.minor){return true;}if(this.rev<fv.rev){return false;}return true;};deconcept.util={getRequestParameter:function(_2b){var q=document.location.search||document.location.hash;if(_2b==null){return q;}if(q){var _2d=q.substring(1).split("&");for(var i=0;i<_2d.length;i++){if(_2d[i].substring(0,_2d[i].indexOf("="))==_2b){return _2d[i].substring((_2d[i].indexOf("=")+1));}}}return "";}};deconcept.SWFObjectUtil.cleanupSWFs=function(){var _2f=document.getElementsByTagName("OBJECT");for(var i=_2f.length-1;i>=0;i--){_2f[i].style.display="none";for(var x in _2f[i]){if(typeof _2f[i][x]=="function"){_2f[i][x]=function(){};}}}};if(deconcept.SWFObject.doPrepUnload){if(!deconcept.unloadSet){deconcept.SWFObjectUtil.prepUnload=function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){};window.attachEvent("onunload",deconcept.SWFObjectUtil.cleanupSWFs);};window.attachEvent("onbeforeunload",deconcept.SWFObjectUtil.prepUnload);deconcept.unloadSet=true;}}if(!document.getElementById&&document.all){document.getElementById=function(id){return document.all[id];};}var getQueryParamValue=deconcept.util.getRequestParameter;var FlashObject=deconcept.SWFObject;var SWFObject=deconcept.SWFObject;;
js.SWFObject = deconcept.SWFObject;
if(typeof document != "undefined") js.Lib.document = document;
if(typeof window != "undefined") {
	js.Lib.window = window;
	js.Lib.window.onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if(f == null) return false;
		return f(msg,[url + ":" + line]);
	};
}
js.XMLHttpRequest = window.XMLHttpRequest?XMLHttpRequest:window.ActiveXObject?function() {
	try {
		return new ActiveXObject("Msxml2.XMLHTTP");
	} catch( e ) {
		try {
			return new ActiveXObject("Microsoft.XMLHTTP");
		} catch( e1 ) {
			throw "Unable to create XMLHttpRequest object.";
		}
	}
}:(function($this) {
	var $r;
	throw "Unable to create XMLHttpRequest object.";
	return $r;
}(this));
Common.boxRights = ["view","viewNew","viewOpen","viewClosed","viewDeleted","post","open","close","del","selfClose","selfOpenClosed","replyOpen","assign","viewFile","upFile","isStaff","viewStaffName","viewDetails","moveFrom","moveTo","search","browse","autoReNew"];
Common.siteRights = ["viewBoxes","searchUser","editHelp","uploadImage","creditUser","adminUser","viewBuyLog","alert","ban","cashUnlockUser","reportUser"];
haxe.Serializer.USE_CACHE = false;
haxe.Serializer.USE_ENUM_INDEX = false;
haxe.Serializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.Unserializer.DEFAULT_RESOLVER = Type;
haxe.Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.Unserializer.CODES = null;
haxe.remoting.ExternalConnection.connections = new Hash();
mt.js.Tip.xOffset = 3;
mt.js.Tip.yOffset = 22;
mt.js.Tip.defaultClass = "normalTip";
mt.js.Tip.tooltipId = "tooltip";
mt.js.Tip.tooltipContentId = "tooltipContent";
mt.js.Tip.minOffsetY = 23;
mt.js.Tip.tipZIndex = 10;
js.XmlHttp.lock = null;
js.XmlHttp.lockButton = null;
js.XmlHttp.queue = new List();
js.XmlHttp.squeue = null;
js.App.ref = [haxe.remoting.Connection,mt.js.Tip,Editor,js.SWFObject,js.XmlHttp,js.Utils,mt.js.Editor];
js.App.globalFocus = true;
js.App.akh = new IntHash();
js.App.lastRespCursor = -1;
js.App.fastReplace = new Hash();
js.Lib.onerror = null;
js.fx.Style.REQUIRES_FILTERS = js.Lib.window.ActiveXObject != null;
js.fx.Tool.isIE = typeof document!='undefined' && document.all != null && typeof window!='undefined' && window.opera == null;
mt.StringStd.MT_CHARS = (function($this) {
	var $r;
	var hash = new IntHash();
	var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz '-\"'%,?!$+:*.éèêëàäâïîüç0123456789+=><()[]/\\âàäéèêëîïôöùûüçáéíóúÁÉÍÓÚÑñ¡¿äÄÖÜß_²αβ";
	{
		var _g1 = 0, _g = str.length;
		while(_g1 < _g) {
			var c = _g1++;
			hash.set(str.cca(c),true);
		}
	}
	$r = hash;
	return $r;
}(this));
js.App.main();