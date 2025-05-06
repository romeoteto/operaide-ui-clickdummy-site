import{aN as ue,aO as Me,aP as de,aQ as fe,aR as he,aS as St,aT as Le,aJ as We,_ as c,g as Ve,s as Ne,q as Pe,p as Oe,a as Re,b as ze,c as at,d as kt,aU as Ye,aV as Be,aW as qe,e as je,L as Xe,aX as R,l as bt,aY as Qt,aZ as $t,a_ as He,a$ as Ue,b0 as Ge,b1 as Ke,b2 as Ze,b3 as Je,b4 as Qe,b5 as te,b6 as ee,b7 as ie,b8 as ne,b9 as re,k as $e,j as ti,y as ei,u as ii,ba as ni,bb as ri}from"./index-C1ysrbvJ.js";const ai=Math.PI/180,si=180/Math.PI,Tt=18,ke=.96422,me=1,ye=.82521,ge=4/29,st=6/29,pe=3*st*st,ci=st*st*st;function ve(t){if(t instanceof K)return new K(t.l,t.a,t.b,t.opacity);if(t instanceof tt)return be(t);t instanceof ue||(t=Me(t));var e=Mt(t.r),i=Mt(t.g),n=Mt(t.b),a=It((.2225045*e+.7168786*i+.0606169*n)/me),h,d;return e===i&&i===n?h=d=a:(h=It((.4360747*e+.3850649*i+.1430804*n)/ke),d=It((.0139322*e+.0971045*i+.7141733*n)/ye)),new K(116*a-16,500*(h-a),200*(a-d),t.opacity)}function li(t,e,i,n){return arguments.length===1?ve(t):new K(t,e,i,n??1)}function K(t,e,i,n){this.l=+t,this.a=+e,this.b=+i,this.opacity=+n}de(K,li,fe(he,{brighter(t){return new K(this.l+Tt*(t??1),this.a,this.b,this.opacity)},darker(t){return new K(this.l-Tt*(t??1),this.a,this.b,this.opacity)},rgb(){var t=(this.l+16)/116,e=isNaN(this.a)?t:t+this.a/500,i=isNaN(this.b)?t:t-this.b/200;return e=ke*At(e),t=me*At(t),i=ye*At(i),new ue(Ft(3.1338561*e-1.6168667*t-.4906146*i),Ft(-.9787684*e+1.9161415*t+.033454*i),Ft(.0719453*e-.2289914*t+1.4052427*i),this.opacity)}}));function It(t){return t>ci?Math.pow(t,1/3):t/pe+ge}function At(t){return t>st?t*t*t:pe*(t-ge)}function Ft(t){return 255*(t<=.0031308?12.92*t:1.055*Math.pow(t,1/2.4)-.055)}function Mt(t){return(t/=255)<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4)}function oi(t){if(t instanceof tt)return new tt(t.h,t.c,t.l,t.opacity);if(t instanceof K||(t=ve(t)),t.a===0&&t.b===0)return new tt(NaN,0<t.l&&t.l<100?0:NaN,t.l,t.opacity);var e=Math.atan2(t.b,t.a)*si;return new tt(e<0?e+360:e,Math.sqrt(t.a*t.a+t.b*t.b),t.l,t.opacity)}function Wt(t,e,i,n){return arguments.length===1?oi(t):new tt(t,e,i,n??1)}function tt(t,e,i,n){this.h=+t,this.c=+e,this.l=+i,this.opacity=+n}function be(t){if(isNaN(t.h))return new K(t.l,0,0,t.opacity);var e=t.h*ai;return new K(t.l,Math.cos(e)*t.c,Math.sin(e)*t.c,t.opacity)}de(tt,Wt,fe(he,{brighter(t){return new tt(this.h,this.c,this.l+Tt*(t??1),this.opacity)},darker(t){return new tt(this.h,this.c,this.l-Tt*(t??1),this.opacity)},rgb(){return be(this).rgb()}}));function ui(t){return function(e,i){var n=t((e=Wt(e)).h,(i=Wt(i)).h),a=St(e.c,i.c),h=St(e.l,i.l),d=St(e.opacity,i.opacity);return function(S){return e.h=n(S),e.c=a(S),e.l=h(S),e.opacity=d(S),e+""}}}const di=ui(Le);function fi(t){return t}var yt=1,Lt=2,Vt=3,mt=4,ae=1e-6;function hi(t){return"translate("+t+",0)"}function ki(t){return"translate(0,"+t+")"}function mi(t){return e=>+t(e)}function yi(t,e){return e=Math.max(0,t.bandwidth()-e*2)/2,t.round()&&(e=Math.round(e)),i=>+t(i)+e}function gi(){return!this.__axis}function Te(t,e){var i=[],n=null,a=null,h=6,d=6,S=3,A=typeof window<"u"&&window.devicePixelRatio>1?0:.5,_=t===yt||t===mt?-1:1,C=t===mt||t===Lt?"x":"y",M=t===yt||t===Vt?hi:ki;function b(g){var N=n??(e.ticks?e.ticks.apply(e,i):e.domain()),E=a??(e.tickFormat?e.tickFormat.apply(e,i):fi),et=Math.max(h,0)+S,Z=e.range(),X=+Z[0]+A,H=+Z[Z.length-1]+A,U=(e.bandwidth?yi:mi)(e.copy(),A),j=g.selection?g.selection():g,B=j.selectAll(".domain").data([null]),O=j.selectAll(".tick").data(N,e).order(),y=O.exit(),T=O.enter().append("g").attr("class","tick"),p=O.select("line"),v=O.select("text");B=B.merge(B.enter().insert("path",".tick").attr("class","domain").attr("stroke","currentColor")),O=O.merge(T),p=p.merge(T.append("line").attr("stroke","currentColor").attr(C+"2",_*h)),v=v.merge(T.append("text").attr("fill","currentColor").attr(C,_*et).attr("dy",t===yt?"0em":t===Vt?"0.71em":"0.32em")),g!==j&&(B=B.transition(g),O=O.transition(g),p=p.transition(g),v=v.transition(g),y=y.transition(g).attr("opacity",ae).attr("transform",function(m){return isFinite(m=U(m))?M(m+A):this.getAttribute("transform")}),T.attr("opacity",ae).attr("transform",function(m){var w=this.parentNode.__axis;return M((w&&isFinite(w=w(m))?w:U(m))+A)})),y.remove(),B.attr("d",t===mt||t===Lt?d?"M"+_*d+","+X+"H"+A+"V"+H+"H"+_*d:"M"+A+","+X+"V"+H:d?"M"+X+","+_*d+"V"+A+"H"+H+"V"+_*d:"M"+X+","+A+"H"+H),O.attr("opacity",1).attr("transform",function(m){return M(U(m)+A)}),p.attr(C+"2",_*h),v.attr(C,_*et).text(E),j.filter(gi).attr("fill","none").attr("font-size",10).attr("font-family","sans-serif").attr("text-anchor",t===Lt?"start":t===mt?"end":"middle"),j.each(function(){this.__axis=U})}return b.scale=function(g){return arguments.length?(e=g,b):e},b.ticks=function(){return i=Array.from(arguments),b},b.tickArguments=function(g){return arguments.length?(i=g==null?[]:Array.from(g),b):i.slice()},b.tickValues=function(g){return arguments.length?(n=g==null?null:Array.from(g),b):n&&n.slice()},b.tickFormat=function(g){return arguments.length?(a=g,b):a},b.tickSize=function(g){return arguments.length?(h=d=+g,b):h},b.tickSizeInner=function(g){return arguments.length?(h=+g,b):h},b.tickSizeOuter=function(g){return arguments.length?(d=+g,b):d},b.tickPadding=function(g){return arguments.length?(S=+g,b):S},b.offset=function(g){return arguments.length?(A=+g,b):A},b}function pi(t){return Te(yt,t)}function vi(t){return Te(Vt,t)}var gt={exports:{}},bi=gt.exports,se;function Ti(){return se||(se=1,function(t,e){(function(i,n){t.exports=n()})(bi,function(){var i="day";return function(n,a,h){var d=function(_){return _.add(4-_.isoWeekday(),i)},S=a.prototype;S.isoWeekYear=function(){return d(this).year()},S.isoWeek=function(_){if(!this.$utils().u(_))return this.add(7*(_-this.isoWeek()),i);var C,M,b,g,N=d(this),E=(C=this.isoWeekYear(),M=this.$u,b=(M?h.utc:h)().year(C).startOf("year"),g=4-b.isoWeekday(),b.isoWeekday()>4&&(g+=7),b.add(g,i));return N.diff(E,"week")+1},S.isoWeekday=function(_){return this.$utils().u(_)?this.day()||7:this.day(this.day()%7?_:_-7)};var A=S.startOf;S.startOf=function(_,C){var M=this.$utils(),b=!!M.u(C)||C;return M.p(_)==="isoweek"?b?this.date(this.date()-(this.isoWeekday()-1)).startOf("day"):this.date(this.date()-1-(this.isoWeekday()-1)+7).endOf("day"):A.bind(this)(_,C)}}})}(gt)),gt.exports}var xi=Ti();const wi=We(xi);var Nt=function(){var t=c(function(w,l,u,k){for(u=u||{},k=w.length;k--;u[w[k]]=l);return u},"o"),e=[6,8,10,12,13,14,15,16,17,18,20,21,22,23,24,25,26,27,28,29,30,31,33,35,36,38,40],i=[1,26],n=[1,27],a=[1,28],h=[1,29],d=[1,30],S=[1,31],A=[1,32],_=[1,33],C=[1,34],M=[1,9],b=[1,10],g=[1,11],N=[1,12],E=[1,13],et=[1,14],Z=[1,15],X=[1,16],H=[1,19],U=[1,20],j=[1,21],B=[1,22],O=[1,23],y=[1,25],T=[1,35],p={trace:c(function(){},"trace"),yy:{},symbols_:{error:2,start:3,gantt:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NL:10,weekday:11,weekday_monday:12,weekday_tuesday:13,weekday_wednesday:14,weekday_thursday:15,weekday_friday:16,weekday_saturday:17,weekday_sunday:18,weekend:19,weekend_friday:20,weekend_saturday:21,dateFormat:22,inclusiveEndDates:23,topAxis:24,axisFormat:25,tickInterval:26,excludes:27,includes:28,todayMarker:29,title:30,acc_title:31,acc_title_value:32,acc_descr:33,acc_descr_value:34,acc_descr_multiline_value:35,section:36,clickStatement:37,taskTxt:38,taskData:39,click:40,callbackname:41,callbackargs:42,href:43,clickStatementDebug:44,$accept:0,$end:1},terminals_:{2:"error",4:"gantt",6:"EOF",8:"SPACE",10:"NL",12:"weekday_monday",13:"weekday_tuesday",14:"weekday_wednesday",15:"weekday_thursday",16:"weekday_friday",17:"weekday_saturday",18:"weekday_sunday",20:"weekend_friday",21:"weekend_saturday",22:"dateFormat",23:"inclusiveEndDates",24:"topAxis",25:"axisFormat",26:"tickInterval",27:"excludes",28:"includes",29:"todayMarker",30:"title",31:"acc_title",32:"acc_title_value",33:"acc_descr",34:"acc_descr_value",35:"acc_descr_multiline_value",36:"section",38:"taskTxt",39:"taskData",40:"click",41:"callbackname",42:"callbackargs",43:"href"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[19,1],[19,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,1],[9,2],[37,2],[37,3],[37,3],[37,4],[37,3],[37,4],[37,2],[44,2],[44,3],[44,3],[44,4],[44,3],[44,4],[44,2]],performAction:c(function(l,u,k,f,x,s,o){var r=s.length-1;switch(x){case 1:return s[r-1];case 2:this.$=[];break;case 3:s[r-1].push(s[r]),this.$=s[r-1];break;case 4:case 5:this.$=s[r];break;case 6:case 7:this.$=[];break;case 8:f.setWeekday("monday");break;case 9:f.setWeekday("tuesday");break;case 10:f.setWeekday("wednesday");break;case 11:f.setWeekday("thursday");break;case 12:f.setWeekday("friday");break;case 13:f.setWeekday("saturday");break;case 14:f.setWeekday("sunday");break;case 15:f.setWeekend("friday");break;case 16:f.setWeekend("saturday");break;case 17:f.setDateFormat(s[r].substr(11)),this.$=s[r].substr(11);break;case 18:f.enableInclusiveEndDates(),this.$=s[r].substr(18);break;case 19:f.TopAxis(),this.$=s[r].substr(8);break;case 20:f.setAxisFormat(s[r].substr(11)),this.$=s[r].substr(11);break;case 21:f.setTickInterval(s[r].substr(13)),this.$=s[r].substr(13);break;case 22:f.setExcludes(s[r].substr(9)),this.$=s[r].substr(9);break;case 23:f.setIncludes(s[r].substr(9)),this.$=s[r].substr(9);break;case 24:f.setTodayMarker(s[r].substr(12)),this.$=s[r].substr(12);break;case 27:f.setDiagramTitle(s[r].substr(6)),this.$=s[r].substr(6);break;case 28:this.$=s[r].trim(),f.setAccTitle(this.$);break;case 29:case 30:this.$=s[r].trim(),f.setAccDescription(this.$);break;case 31:f.addSection(s[r].substr(8)),this.$=s[r].substr(8);break;case 33:f.addTask(s[r-1],s[r]),this.$="task";break;case 34:this.$=s[r-1],f.setClickEvent(s[r-1],s[r],null);break;case 35:this.$=s[r-2],f.setClickEvent(s[r-2],s[r-1],s[r]);break;case 36:this.$=s[r-2],f.setClickEvent(s[r-2],s[r-1],null),f.setLink(s[r-2],s[r]);break;case 37:this.$=s[r-3],f.setClickEvent(s[r-3],s[r-2],s[r-1]),f.setLink(s[r-3],s[r]);break;case 38:this.$=s[r-2],f.setClickEvent(s[r-2],s[r],null),f.setLink(s[r-2],s[r-1]);break;case 39:this.$=s[r-3],f.setClickEvent(s[r-3],s[r-1],s[r]),f.setLink(s[r-3],s[r-2]);break;case 40:this.$=s[r-1],f.setLink(s[r-1],s[r]);break;case 41:case 47:this.$=s[r-1]+" "+s[r];break;case 42:case 43:case 45:this.$=s[r-2]+" "+s[r-1]+" "+s[r];break;case 44:case 46:this.$=s[r-3]+" "+s[r-2]+" "+s[r-1]+" "+s[r];break}},"anonymous"),table:[{3:1,4:[1,2]},{1:[3]},t(e,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:17,12:i,13:n,14:a,15:h,16:d,17:S,18:A,19:18,20:_,21:C,22:M,23:b,24:g,25:N,26:E,27:et,28:Z,29:X,30:H,31:U,33:j,35:B,36:O,37:24,38:y,40:T},t(e,[2,7],{1:[2,1]}),t(e,[2,3]),{9:36,11:17,12:i,13:n,14:a,15:h,16:d,17:S,18:A,19:18,20:_,21:C,22:M,23:b,24:g,25:N,26:E,27:et,28:Z,29:X,30:H,31:U,33:j,35:B,36:O,37:24,38:y,40:T},t(e,[2,5]),t(e,[2,6]),t(e,[2,17]),t(e,[2,18]),t(e,[2,19]),t(e,[2,20]),t(e,[2,21]),t(e,[2,22]),t(e,[2,23]),t(e,[2,24]),t(e,[2,25]),t(e,[2,26]),t(e,[2,27]),{32:[1,37]},{34:[1,38]},t(e,[2,30]),t(e,[2,31]),t(e,[2,32]),{39:[1,39]},t(e,[2,8]),t(e,[2,9]),t(e,[2,10]),t(e,[2,11]),t(e,[2,12]),t(e,[2,13]),t(e,[2,14]),t(e,[2,15]),t(e,[2,16]),{41:[1,40],43:[1,41]},t(e,[2,4]),t(e,[2,28]),t(e,[2,29]),t(e,[2,33]),t(e,[2,34],{42:[1,42],43:[1,43]}),t(e,[2,40],{41:[1,44]}),t(e,[2,35],{43:[1,45]}),t(e,[2,36]),t(e,[2,38],{42:[1,46]}),t(e,[2,37]),t(e,[2,39])],defaultActions:{},parseError:c(function(l,u){if(u.recoverable)this.trace(l);else{var k=new Error(l);throw k.hash=u,k}},"parseError"),parse:c(function(l){var u=this,k=[0],f=[],x=[null],s=[],o=this.table,r="",F=0,D=0,I=2,P=1,L=s.slice.call(arguments,1),W=Object.create(this.lexer),J={yy:{}};for(var _t in this.yy)Object.prototype.hasOwnProperty.call(this.yy,_t)&&(J.yy[_t]=this.yy[_t]);W.setInput(l,J.yy),J.yy.lexer=W,J.yy.parser=this,typeof W.yylloc>"u"&&(W.yylloc={});var Ct=W.yylloc;s.push(Ct);var Ae=W.options&&W.options.ranges;typeof J.yy.parseError=="function"?this.parseError=J.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function Fe(Y){k.length=k.length-2*Y,x.length=x.length-Y,s.length=s.length-Y}c(Fe,"popStack");function Zt(){var Y;return Y=f.pop()||W.lex()||P,typeof Y!="number"&&(Y instanceof Array&&(f=Y,Y=f.pop()),Y=u.symbols_[Y]||Y),Y}c(Zt,"lex");for(var z,it,q,Et,rt={},ft,Q,Jt,ht;;){if(it=k[k.length-1],this.defaultActions[it]?q=this.defaultActions[it]:((z===null||typeof z>"u")&&(z=Zt()),q=o[it]&&o[it][z]),typeof q>"u"||!q.length||!q[0]){var Dt="";ht=[];for(ft in o[it])this.terminals_[ft]&&ft>I&&ht.push("'"+this.terminals_[ft]+"'");W.showPosition?Dt="Parse error on line "+(F+1)+`:
`+W.showPosition()+`
Expecting `+ht.join(", ")+", got '"+(this.terminals_[z]||z)+"'":Dt="Parse error on line "+(F+1)+": Unexpected "+(z==P?"end of input":"'"+(this.terminals_[z]||z)+"'"),this.parseError(Dt,{text:W.match,token:this.terminals_[z]||z,line:W.yylineno,loc:Ct,expected:ht})}if(q[0]instanceof Array&&q.length>1)throw new Error("Parse Error: multiple actions possible at state: "+it+", token: "+z);switch(q[0]){case 1:k.push(z),x.push(W.yytext),s.push(W.yylloc),k.push(q[1]),z=null,D=W.yyleng,r=W.yytext,F=W.yylineno,Ct=W.yylloc;break;case 2:if(Q=this.productions_[q[1]][1],rt.$=x[x.length-Q],rt._$={first_line:s[s.length-(Q||1)].first_line,last_line:s[s.length-1].last_line,first_column:s[s.length-(Q||1)].first_column,last_column:s[s.length-1].last_column},Ae&&(rt._$.range=[s[s.length-(Q||1)].range[0],s[s.length-1].range[1]]),Et=this.performAction.apply(rt,[r,D,F,J.yy,q[1],x,s].concat(L)),typeof Et<"u")return Et;Q&&(k=k.slice(0,-1*Q*2),x=x.slice(0,-1*Q),s=s.slice(0,-1*Q)),k.push(this.productions_[q[1]][0]),x.push(rt.$),s.push(rt._$),Jt=o[k[k.length-2]][k[k.length-1]],k.push(Jt);break;case 3:return!0}}return!0},"parse")},v=function(){var w={EOF:1,parseError:c(function(u,k){if(this.yy.parser)this.yy.parser.parseError(u,k);else throw new Error(u)},"parseError"),setInput:c(function(l,u){return this.yy=u||this.yy||{},this._input=l,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:c(function(){var l=this._input[0];this.yytext+=l,this.yyleng++,this.offset++,this.match+=l,this.matched+=l;var u=l.match(/(?:\r\n?|\n).*/g);return u?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),l},"input"),unput:c(function(l){var u=l.length,k=l.split(/(?:\r\n?|\n)/g);this._input=l+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-u),this.offset-=u;var f=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),k.length-1&&(this.yylineno-=k.length-1);var x=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:k?(k.length===f.length?this.yylloc.first_column:0)+f[f.length-k.length].length-k[0].length:this.yylloc.first_column-u},this.options.ranges&&(this.yylloc.range=[x[0],x[0]+this.yyleng-u]),this.yyleng=this.yytext.length,this},"unput"),more:c(function(){return this._more=!0,this},"more"),reject:c(function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},"reject"),less:c(function(l){this.unput(this.match.slice(l))},"less"),pastInput:c(function(){var l=this.matched.substr(0,this.matched.length-this.match.length);return(l.length>20?"...":"")+l.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:c(function(){var l=this.match;return l.length<20&&(l+=this._input.substr(0,20-l.length)),(l.substr(0,20)+(l.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:c(function(){var l=this.pastInput(),u=new Array(l.length+1).join("-");return l+this.upcomingInput()+`
`+u+"^"},"showPosition"),test_match:c(function(l,u){var k,f,x;if(this.options.backtrack_lexer&&(x={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(x.yylloc.range=this.yylloc.range.slice(0))),f=l[0].match(/(?:\r\n?|\n).*/g),f&&(this.yylineno+=f.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:f?f[f.length-1].length-f[f.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+l[0].length},this.yytext+=l[0],this.match+=l[0],this.matches=l,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(l[0].length),this.matched+=l[0],k=this.performAction.call(this,this.yy,this,u,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),k)return k;if(this._backtrack){for(var s in x)this[s]=x[s];return!1}return!1},"test_match"),next:c(function(){if(this.done)return this.EOF;this._input||(this.done=!0);var l,u,k,f;this._more||(this.yytext="",this.match="");for(var x=this._currentRules(),s=0;s<x.length;s++)if(k=this._input.match(this.rules[x[s]]),k&&(!u||k[0].length>u[0].length)){if(u=k,f=s,this.options.backtrack_lexer){if(l=this.test_match(k,x[s]),l!==!1)return l;if(this._backtrack){u=!1;continue}else return!1}else if(!this.options.flex)break}return u?(l=this.test_match(u,x[f]),l!==!1?l:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:c(function(){var u=this.next();return u||this.lex()},"lex"),begin:c(function(u){this.conditionStack.push(u)},"begin"),popState:c(function(){var u=this.conditionStack.length-1;return u>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:c(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:c(function(u){return u=this.conditionStack.length-1-Math.abs(u||0),u>=0?this.conditionStack[u]:"INITIAL"},"topState"),pushState:c(function(u){this.begin(u)},"pushState"),stateStackSize:c(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:c(function(u,k,f,x){switch(f){case 0:return this.begin("open_directive"),"open_directive";case 1:return this.begin("acc_title"),31;case 2:return this.popState(),"acc_title_value";case 3:return this.begin("acc_descr"),33;case 4:return this.popState(),"acc_descr_value";case 5:this.begin("acc_descr_multiline");break;case 6:this.popState();break;case 7:return"acc_descr_multiline_value";case 8:break;case 9:break;case 10:break;case 11:return 10;case 12:break;case 13:break;case 14:this.begin("href");break;case 15:this.popState();break;case 16:return 43;case 17:this.begin("callbackname");break;case 18:this.popState();break;case 19:this.popState(),this.begin("callbackargs");break;case 20:return 41;case 21:this.popState();break;case 22:return 42;case 23:this.begin("click");break;case 24:this.popState();break;case 25:return 40;case 26:return 4;case 27:return 22;case 28:return 23;case 29:return 24;case 30:return 25;case 31:return 26;case 32:return 28;case 33:return 27;case 34:return 29;case 35:return 12;case 36:return 13;case 37:return 14;case 38:return 15;case 39:return 16;case 40:return 17;case 41:return 18;case 42:return 20;case 43:return 21;case 44:return"date";case 45:return 30;case 46:return"accDescription";case 47:return 36;case 48:return 38;case 49:return 39;case 50:return":";case 51:return 6;case 52:return"INVALID"}},"anonymous"),rules:[/^(?:%%\{)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:%%(?!\{)*[^\n]*)/i,/^(?:[^\}]%%*[^\n]*)/i,/^(?:%%*[^\n]*[\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:%[^\n]*)/i,/^(?:href[\s]+["])/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:call[\s]+)/i,/^(?:\([\s]*\))/i,/^(?:\()/i,/^(?:[^(]*)/i,/^(?:\))/i,/^(?:[^)]*)/i,/^(?:click[\s]+)/i,/^(?:[\s\n])/i,/^(?:[^\s\n]*)/i,/^(?:gantt\b)/i,/^(?:dateFormat\s[^#\n;]+)/i,/^(?:inclusiveEndDates\b)/i,/^(?:topAxis\b)/i,/^(?:axisFormat\s[^#\n;]+)/i,/^(?:tickInterval\s[^#\n;]+)/i,/^(?:includes\s[^#\n;]+)/i,/^(?:excludes\s[^#\n;]+)/i,/^(?:todayMarker\s[^\n;]+)/i,/^(?:weekday\s+monday\b)/i,/^(?:weekday\s+tuesday\b)/i,/^(?:weekday\s+wednesday\b)/i,/^(?:weekday\s+thursday\b)/i,/^(?:weekday\s+friday\b)/i,/^(?:weekday\s+saturday\b)/i,/^(?:weekday\s+sunday\b)/i,/^(?:weekend\s+friday\b)/i,/^(?:weekend\s+saturday\b)/i,/^(?:\d\d\d\d-\d\d-\d\d\b)/i,/^(?:title\s[^\n]+)/i,/^(?:accDescription\s[^#\n;]+)/i,/^(?:section\s[^\n]+)/i,/^(?:[^:\n]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[6,7],inclusive:!1},acc_descr:{rules:[4],inclusive:!1},acc_title:{rules:[2],inclusive:!1},callbackargs:{rules:[21,22],inclusive:!1},callbackname:{rules:[18,19,20],inclusive:!1},href:{rules:[15,16],inclusive:!1},click:{rules:[24,25],inclusive:!1},INITIAL:{rules:[0,1,3,5,8,9,10,11,12,13,14,17,23,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52],inclusive:!0}}};return w}();p.lexer=v;function m(){this.yy={}}return c(m,"Parser"),m.prototype=p,p.Parser=m,new m}();Nt.parser=Nt;var _i=Nt;R.extend(wi);R.extend(ni);R.extend(ri);var ce={friday:5,saturday:6},G="",zt="",Yt=void 0,Bt="",ot=[],ut=[],qt=new Map,jt=[],xt=[],lt="",Xt="",xe=["active","done","crit","milestone"],Ht=[],dt=!1,Ut=!1,Gt="sunday",wt="saturday",Pt=0,Ci=c(function(){jt=[],xt=[],lt="",Ht=[],pt=0,Rt=void 0,vt=void 0,V=[],G="",zt="",Xt="",Yt=void 0,Bt="",ot=[],ut=[],dt=!1,Ut=!1,Pt=0,qt=new Map,ei(),Gt="sunday",wt="saturday"},"clear"),Ei=c(function(t){zt=t},"setAxisFormat"),Di=c(function(){return zt},"getAxisFormat"),Si=c(function(t){Yt=t},"setTickInterval"),Ii=c(function(){return Yt},"getTickInterval"),Ai=c(function(t){Bt=t},"setTodayMarker"),Fi=c(function(){return Bt},"getTodayMarker"),Mi=c(function(t){G=t},"setDateFormat"),Li=c(function(){dt=!0},"enableInclusiveEndDates"),Wi=c(function(){return dt},"endDatesAreInclusive"),Vi=c(function(){Ut=!0},"enableTopAxis"),Ni=c(function(){return Ut},"topAxisEnabled"),Pi=c(function(t){Xt=t},"setDisplayMode"),Oi=c(function(){return Xt},"getDisplayMode"),Ri=c(function(){return G},"getDateFormat"),zi=c(function(t){ot=t.toLowerCase().split(/[\s,]+/)},"setIncludes"),Yi=c(function(){return ot},"getIncludes"),Bi=c(function(t){ut=t.toLowerCase().split(/[\s,]+/)},"setExcludes"),qi=c(function(){return ut},"getExcludes"),ji=c(function(){return qt},"getLinks"),Xi=c(function(t){lt=t,jt.push(t)},"addSection"),Hi=c(function(){return jt},"getSections"),Ui=c(function(){let t=le();const e=10;let i=0;for(;!t&&i<e;)t=le(),i++;return xt=V,xt},"getTasks"),we=c(function(t,e,i,n){return n.includes(t.format(e.trim()))?!1:i.includes("weekends")&&(t.isoWeekday()===ce[wt]||t.isoWeekday()===ce[wt]+1)||i.includes(t.format("dddd").toLowerCase())?!0:i.includes(t.format(e.trim()))},"isInvalidDate"),Gi=c(function(t){Gt=t},"setWeekday"),Ki=c(function(){return Gt},"getWeekday"),Zi=c(function(t){wt=t},"setWeekend"),_e=c(function(t,e,i,n){if(!i.length||t.manualEndTime)return;let a;t.startTime instanceof Date?a=R(t.startTime):a=R(t.startTime,e,!0),a=a.add(1,"d");let h;t.endTime instanceof Date?h=R(t.endTime):h=R(t.endTime,e,!0);const[d,S]=Ji(a,h,e,i,n);t.endTime=d.toDate(),t.renderEndTime=S},"checkTaskDates"),Ji=c(function(t,e,i,n,a){let h=!1,d=null;for(;t<=e;)h||(d=e.toDate()),h=we(t,i,n,a),h&&(e=e.add(1,"d")),t=t.add(1,"d");return[e,d]},"fixTaskDates"),Ot=c(function(t,e,i){i=i.trim();const a=/^after\s+(?<ids>[\d\w- ]+)/.exec(i);if(a!==null){let d=null;for(const A of a.groups.ids.split(" ")){let _=nt(A);_!==void 0&&(!d||_.endTime>d.endTime)&&(d=_)}if(d)return d.endTime;const S=new Date;return S.setHours(0,0,0,0),S}let h=R(i,e.trim(),!0);if(h.isValid())return h.toDate();{bt.debug("Invalid date:"+i),bt.debug("With date format:"+e.trim());const d=new Date(i);if(d===void 0||isNaN(d.getTime())||d.getFullYear()<-1e4||d.getFullYear()>1e4)throw new Error("Invalid date:"+i);return d}},"getStartDate"),Ce=c(function(t){const e=/^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/.exec(t.trim());return e!==null?[Number.parseFloat(e[1]),e[2]]:[NaN,"ms"]},"parseDuration"),Ee=c(function(t,e,i,n=!1){i=i.trim();const h=/^until\s+(?<ids>[\d\w- ]+)/.exec(i);if(h!==null){let C=null;for(const b of h.groups.ids.split(" ")){let g=nt(b);g!==void 0&&(!C||g.startTime<C.startTime)&&(C=g)}if(C)return C.startTime;const M=new Date;return M.setHours(0,0,0,0),M}let d=R(i,e.trim(),!0);if(d.isValid())return n&&(d=d.add(1,"d")),d.toDate();let S=R(t);const[A,_]=Ce(i);if(!Number.isNaN(A)){const C=S.add(A,_);C.isValid()&&(S=C)}return S.toDate()},"getEndDate"),pt=0,ct=c(function(t){return t===void 0?(pt=pt+1,"task"+pt):t},"parseId"),Qi=c(function(t,e){let i;e.substr(0,1)===":"?i=e.substr(1,e.length):i=e;const n=i.split(","),a={};Kt(n,a,xe);for(let d=0;d<n.length;d++)n[d]=n[d].trim();let h="";switch(n.length){case 1:a.id=ct(),a.startTime=t.endTime,h=n[0];break;case 2:a.id=ct(),a.startTime=Ot(void 0,G,n[0]),h=n[1];break;case 3:a.id=ct(n[0]),a.startTime=Ot(void 0,G,n[1]),h=n[2];break}return h&&(a.endTime=Ee(a.startTime,G,h,dt),a.manualEndTime=R(h,"YYYY-MM-DD",!0).isValid(),_e(a,G,ut,ot)),a},"compileData"),$i=c(function(t,e){let i;e.substr(0,1)===":"?i=e.substr(1,e.length):i=e;const n=i.split(","),a={};Kt(n,a,xe);for(let h=0;h<n.length;h++)n[h]=n[h].trim();switch(n.length){case 1:a.id=ct(),a.startTime={type:"prevTaskEnd",id:t},a.endTime={data:n[0]};break;case 2:a.id=ct(),a.startTime={type:"getStartDate",startData:n[0]},a.endTime={data:n[1]};break;case 3:a.id=ct(n[0]),a.startTime={type:"getStartDate",startData:n[1]},a.endTime={data:n[2]};break}return a},"parseData"),Rt,vt,V=[],De={},tn=c(function(t,e){const i={section:lt,type:lt,processed:!1,manualEndTime:!1,renderEndTime:null,raw:{data:e},task:t,classes:[]},n=$i(vt,e);i.raw.startTime=n.startTime,i.raw.endTime=n.endTime,i.id=n.id,i.prevTaskId=vt,i.active=n.active,i.done=n.done,i.crit=n.crit,i.milestone=n.milestone,i.order=Pt,Pt++;const a=V.push(i);vt=i.id,De[i.id]=a-1},"addTask"),nt=c(function(t){const e=De[t];return V[e]},"findTaskById"),en=c(function(t,e){const i={section:lt,type:lt,description:t,task:t,classes:[]},n=Qi(Rt,e);i.startTime=n.startTime,i.endTime=n.endTime,i.id=n.id,i.active=n.active,i.done=n.done,i.crit=n.crit,i.milestone=n.milestone,Rt=i,xt.push(i)},"addTaskOrg"),le=c(function(){const t=c(function(i){const n=V[i];let a="";switch(V[i].raw.startTime.type){case"prevTaskEnd":{const h=nt(n.prevTaskId);n.startTime=h.endTime;break}case"getStartDate":a=Ot(void 0,G,V[i].raw.startTime.startData),a&&(V[i].startTime=a);break}return V[i].startTime&&(V[i].endTime=Ee(V[i].startTime,G,V[i].raw.endTime.data,dt),V[i].endTime&&(V[i].processed=!0,V[i].manualEndTime=R(V[i].raw.endTime.data,"YYYY-MM-DD",!0).isValid(),_e(V[i],G,ut,ot))),V[i].processed},"compileTask");let e=!0;for(const[i,n]of V.entries())t(i),e=e&&n.processed;return e},"compileTasks"),nn=c(function(t,e){let i=e;at().securityLevel!=="loose"&&(i=ti.sanitizeUrl(e)),t.split(",").forEach(function(n){nt(n)!==void 0&&(Ie(n,()=>{window.open(i,"_self")}),qt.set(n,i))}),Se(t,"clickable")},"setLink"),Se=c(function(t,e){t.split(",").forEach(function(i){let n=nt(i);n!==void 0&&n.classes.push(e)})},"setClass"),rn=c(function(t,e,i){if(at().securityLevel!=="loose"||e===void 0)return;let n=[];if(typeof i=="string"){n=i.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);for(let h=0;h<n.length;h++){let d=n[h].trim();d.startsWith('"')&&d.endsWith('"')&&(d=d.substr(1,d.length-2)),n[h]=d}}n.length===0&&n.push(t),nt(t)!==void 0&&Ie(t,()=>{ii.runFunc(e,...n)})},"setClickFun"),Ie=c(function(t,e){Ht.push(function(){const i=document.querySelector(`[id="${t}"]`);i!==null&&i.addEventListener("click",function(){e()})},function(){const i=document.querySelector(`[id="${t}-text"]`);i!==null&&i.addEventListener("click",function(){e()})})},"pushFun"),an=c(function(t,e,i){t.split(",").forEach(function(n){rn(n,e,i)}),Se(t,"clickable")},"setClickEvent"),sn=c(function(t){Ht.forEach(function(e){e(t)})},"bindFunctions"),cn={getConfig:c(()=>at().gantt,"getConfig"),clear:Ci,setDateFormat:Mi,getDateFormat:Ri,enableInclusiveEndDates:Li,endDatesAreInclusive:Wi,enableTopAxis:Vi,topAxisEnabled:Ni,setAxisFormat:Ei,getAxisFormat:Di,setTickInterval:Si,getTickInterval:Ii,setTodayMarker:Ai,getTodayMarker:Fi,setAccTitle:ze,getAccTitle:Re,setDiagramTitle:Oe,getDiagramTitle:Pe,setDisplayMode:Pi,getDisplayMode:Oi,setAccDescription:Ne,getAccDescription:Ve,addSection:Xi,getSections:Hi,getTasks:Ui,addTask:tn,findTaskById:nt,addTaskOrg:en,setIncludes:zi,getIncludes:Yi,setExcludes:Bi,getExcludes:qi,setClickEvent:an,setLink:nn,getLinks:ji,bindFunctions:sn,parseDuration:Ce,isInvalidDate:we,setWeekday:Gi,getWeekday:Ki,setWeekend:Zi};function Kt(t,e,i){let n=!0;for(;n;)n=!1,i.forEach(function(a){const h="^\\s*"+a+"\\s*$",d=new RegExp(h);t[0].match(d)&&(e[a]=!0,t.shift(1),n=!0)})}c(Kt,"getTaskTags");var ln=c(function(){bt.debug("Something is calling, setConf, remove the call")},"setConf"),oe={monday:Qe,tuesday:Je,wednesday:Ze,thursday:Ke,friday:Ge,saturday:Ue,sunday:He},on=c((t,e)=>{let i=[...t].map(()=>-1/0),n=[...t].sort((h,d)=>h.startTime-d.startTime||h.order-d.order),a=0;for(const h of n)for(let d=0;d<i.length;d++)if(h.startTime>=i[d]){i[d]=h.endTime,h.order=d+e,d>a&&(a=d);break}return a},"getMaxIntersections"),$,un=c(function(t,e,i,n){const a=at().gantt,h=at().securityLevel;let d;h==="sandbox"&&(d=kt("#i"+e));const S=h==="sandbox"?kt(d.nodes()[0].contentDocument.body):kt("body"),A=h==="sandbox"?d.nodes()[0].contentDocument:document,_=A.getElementById(e);$=_.parentElement.offsetWidth,$===void 0&&($=1200),a.useWidth!==void 0&&($=a.useWidth);const C=n.db.getTasks();let M=[];for(const y of C)M.push(y.type);M=O(M);const b={};let g=2*a.topPadding;if(n.db.getDisplayMode()==="compact"||a.displayMode==="compact"){const y={};for(const p of C)y[p.section]===void 0?y[p.section]=[p]:y[p.section].push(p);let T=0;for(const p of Object.keys(y)){const v=on(y[p],T)+1;T+=v,g+=v*(a.barHeight+a.barGap),b[p]=v}}else{g+=C.length*(a.barHeight+a.barGap);for(const y of M)b[y]=C.filter(T=>T.type===y).length}_.setAttribute("viewBox","0 0 "+$+" "+g);const N=S.select(`[id="${e}"]`),E=Ye().domain([Be(C,function(y){return y.startTime}),qe(C,function(y){return y.endTime})]).rangeRound([0,$-a.leftPadding-a.rightPadding]);function et(y,T){const p=y.startTime,v=T.startTime;let m=0;return p>v?m=1:p<v&&(m=-1),m}c(et,"taskCompare"),C.sort(et),Z(C,$,g),je(N,g,$,a.useMaxWidth),N.append("text").text(n.db.getDiagramTitle()).attr("x",$/2).attr("y",a.titleTopMargin).attr("class","titleText");function Z(y,T,p){const v=a.barHeight,m=v+a.barGap,w=a.topPadding,l=a.leftPadding,u=Xe().domain([0,M.length]).range(["#00B9FA","#F95002"]).interpolate(di);H(m,w,l,T,p,y,n.db.getExcludes(),n.db.getIncludes()),U(l,w,T,p),X(y,m,w,l,v,u,T),j(m,w),B(l,w,T,p)}c(Z,"makeGantt");function X(y,T,p,v,m,w,l){const k=[...new Set(y.map(o=>o.order))].map(o=>y.find(r=>r.order===o));N.append("g").selectAll("rect").data(k).enter().append("rect").attr("x",0).attr("y",function(o,r){return r=o.order,r*T+p-2}).attr("width",function(){return l-a.rightPadding/2}).attr("height",T).attr("class",function(o){for(const[r,F]of M.entries())if(o.type===F)return"section section"+r%a.numberSectionStyles;return"section section0"});const f=N.append("g").selectAll("rect").data(y).enter(),x=n.db.getLinks();if(f.append("rect").attr("id",function(o){return o.id}).attr("rx",3).attr("ry",3).attr("x",function(o){return o.milestone?E(o.startTime)+v+.5*(E(o.endTime)-E(o.startTime))-.5*m:E(o.startTime)+v}).attr("y",function(o,r){return r=o.order,r*T+p}).attr("width",function(o){return o.milestone?m:E(o.renderEndTime||o.endTime)-E(o.startTime)}).attr("height",m).attr("transform-origin",function(o,r){return r=o.order,(E(o.startTime)+v+.5*(E(o.endTime)-E(o.startTime))).toString()+"px "+(r*T+p+.5*m).toString()+"px"}).attr("class",function(o){const r="task";let F="";o.classes.length>0&&(F=o.classes.join(" "));let D=0;for(const[P,L]of M.entries())o.type===L&&(D=P%a.numberSectionStyles);let I="";return o.active?o.crit?I+=" activeCrit":I=" active":o.done?o.crit?I=" doneCrit":I=" done":o.crit&&(I+=" crit"),I.length===0&&(I=" task"),o.milestone&&(I=" milestone "+I),I+=D,I+=" "+F,r+I}),f.append("text").attr("id",function(o){return o.id+"-text"}).text(function(o){return o.task}).attr("font-size",a.fontSize).attr("x",function(o){let r=E(o.startTime),F=E(o.renderEndTime||o.endTime);o.milestone&&(r+=.5*(E(o.endTime)-E(o.startTime))-.5*m),o.milestone&&(F=r+m);const D=this.getBBox().width;return D>F-r?F+D+1.5*a.leftPadding>l?r+v-5:F+v+5:(F-r)/2+r+v}).attr("y",function(o,r){return r=o.order,r*T+a.barHeight/2+(a.fontSize/2-2)+p}).attr("text-height",m).attr("class",function(o){const r=E(o.startTime);let F=E(o.endTime);o.milestone&&(F=r+m);const D=this.getBBox().width;let I="";o.classes.length>0&&(I=o.classes.join(" "));let P=0;for(const[W,J]of M.entries())o.type===J&&(P=W%a.numberSectionStyles);let L="";return o.active&&(o.crit?L="activeCritText"+P:L="activeText"+P),o.done?o.crit?L=L+" doneCritText"+P:L=L+" doneText"+P:o.crit&&(L=L+" critText"+P),o.milestone&&(L+=" milestoneText"),D>F-r?F+D+1.5*a.leftPadding>l?I+" taskTextOutsideLeft taskTextOutside"+P+" "+L:I+" taskTextOutsideRight taskTextOutside"+P+" "+L+" width-"+D:I+" taskText taskText"+P+" "+L+" width-"+D}),at().securityLevel==="sandbox"){let o;o=kt("#i"+e);const r=o.nodes()[0].contentDocument;f.filter(function(F){return x.has(F.id)}).each(function(F){var D=r.querySelector("#"+F.id),I=r.querySelector("#"+F.id+"-text");const P=D.parentNode;var L=r.createElement("a");L.setAttribute("xlink:href",x.get(F.id)),L.setAttribute("target","_top"),P.appendChild(L),L.appendChild(D),L.appendChild(I)})}}c(X,"drawRects");function H(y,T,p,v,m,w,l,u){if(l.length===0&&u.length===0)return;let k,f;for(const{startTime:D,endTime:I}of w)(k===void 0||D<k)&&(k=D),(f===void 0||I>f)&&(f=I);if(!k||!f)return;if(R(f).diff(R(k),"year")>5){bt.warn("The difference between the min and max time is more than 5 years. This will cause performance issues. Skipping drawing exclude days.");return}const x=n.db.getDateFormat(),s=[];let o=null,r=R(k);for(;r.valueOf()<=f;)n.db.isInvalidDate(r,x,l,u)?o?o.end=r:o={start:r,end:r}:o&&(s.push(o),o=null),r=r.add(1,"d");N.append("g").selectAll("rect").data(s).enter().append("rect").attr("id",function(D){return"exclude-"+D.start.format("YYYY-MM-DD")}).attr("x",function(D){return E(D.start)+p}).attr("y",a.gridLineStartPadding).attr("width",function(D){const I=D.end.add(1,"day");return E(I)-E(D.start)}).attr("height",m-T-a.gridLineStartPadding).attr("transform-origin",function(D,I){return(E(D.start)+p+.5*(E(D.end)-E(D.start))).toString()+"px "+(I*y+.5*m).toString()+"px"}).attr("class","exclude-range")}c(H,"drawExcludeDays");function U(y,T,p,v){let m=vi(E).tickSize(-v+T+a.gridLineStartPadding).tickFormat(Qt(n.db.getAxisFormat()||a.axisFormat||"%Y-%m-%d"));const l=/^([1-9]\d*)(millisecond|second|minute|hour|day|week|month)$/.exec(n.db.getTickInterval()||a.tickInterval);if(l!==null){const u=l[1],k=l[2],f=n.db.getWeekday()||a.weekday;switch(k){case"millisecond":m.ticks(re.every(u));break;case"second":m.ticks(ne.every(u));break;case"minute":m.ticks(ie.every(u));break;case"hour":m.ticks(ee.every(u));break;case"day":m.ticks(te.every(u));break;case"week":m.ticks(oe[f].every(u));break;case"month":m.ticks($t.every(u));break}}if(N.append("g").attr("class","grid").attr("transform","translate("+y+", "+(v-50)+")").call(m).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10).attr("dy","1em"),n.db.topAxisEnabled()||a.topAxis){let u=pi(E).tickSize(-v+T+a.gridLineStartPadding).tickFormat(Qt(n.db.getAxisFormat()||a.axisFormat||"%Y-%m-%d"));if(l!==null){const k=l[1],f=l[2],x=n.db.getWeekday()||a.weekday;switch(f){case"millisecond":u.ticks(re.every(k));break;case"second":u.ticks(ne.every(k));break;case"minute":u.ticks(ie.every(k));break;case"hour":u.ticks(ee.every(k));break;case"day":u.ticks(te.every(k));break;case"week":u.ticks(oe[x].every(k));break;case"month":u.ticks($t.every(k));break}}N.append("g").attr("class","grid").attr("transform","translate("+y+", "+T+")").call(u).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10)}}c(U,"makeGrid");function j(y,T){let p=0;const v=Object.keys(b).map(m=>[m,b[m]]);N.append("g").selectAll("text").data(v).enter().append(function(m){const w=m[0].split($e.lineBreakRegex),l=-(w.length-1)/2,u=A.createElementNS("http://www.w3.org/2000/svg","text");u.setAttribute("dy",l+"em");for(const[k,f]of w.entries()){const x=A.createElementNS("http://www.w3.org/2000/svg","tspan");x.setAttribute("alignment-baseline","central"),x.setAttribute("x","10"),k>0&&x.setAttribute("dy","1em"),x.textContent=f,u.appendChild(x)}return u}).attr("x",10).attr("y",function(m,w){if(w>0)for(let l=0;l<w;l++)return p+=v[w-1][1],m[1]*y/2+p*y+T;else return m[1]*y/2+T}).attr("font-size",a.sectionFontSize).attr("class",function(m){for(const[w,l]of M.entries())if(m[0]===l)return"sectionTitle sectionTitle"+w%a.numberSectionStyles;return"sectionTitle"})}c(j,"vertLabels");function B(y,T,p,v){const m=n.db.getTodayMarker();if(m==="off")return;const w=N.append("g").attr("class","today"),l=new Date,u=w.append("line");u.attr("x1",E(l)+y).attr("x2",E(l)+y).attr("y1",a.titleTopMargin).attr("y2",v-a.titleTopMargin).attr("class","today"),m!==""&&u.attr("style",m.replace(/,/g,";"))}c(B,"drawToday");function O(y){const T={},p=[];for(let v=0,m=y.length;v<m;++v)Object.prototype.hasOwnProperty.call(T,y[v])||(T[y[v]]=!0,p.push(y[v]));return p}c(O,"checkUnique")},"draw"),dn={setConf:ln,draw:un},fn=c(t=>`
  .mermaid-main-font {
        font-family: ${t.fontFamily};
  }

  .exclude-range {
    fill: ${t.excludeBkgColor};
  }

  .section {
    stroke: none;
    opacity: 0.2;
  }

  .section0 {
    fill: ${t.sectionBkgColor};
  }

  .section2 {
    fill: ${t.sectionBkgColor2};
  }

  .section1,
  .section3 {
    fill: ${t.altSectionBkgColor};
    opacity: 0.2;
  }

  .sectionTitle0 {
    fill: ${t.titleColor};
  }

  .sectionTitle1 {
    fill: ${t.titleColor};
  }

  .sectionTitle2 {
    fill: ${t.titleColor};
  }

  .sectionTitle3 {
    fill: ${t.titleColor};
  }

  .sectionTitle {
    text-anchor: start;
    font-family: ${t.fontFamily};
  }


  /* Grid and axis */

  .grid .tick {
    stroke: ${t.gridColor};
    opacity: 0.8;
    shape-rendering: crispEdges;
  }

  .grid .tick text {
    font-family: ${t.fontFamily};
    fill: ${t.textColor};
  }

  .grid path {
    stroke-width: 0;
  }


  /* Today line */

  .today {
    fill: none;
    stroke: ${t.todayLineColor};
    stroke-width: 2px;
  }


  /* Task styling */

  /* Default task */

  .task {
    stroke-width: 2;
  }

  .taskText {
    text-anchor: middle;
    font-family: ${t.fontFamily};
  }

  .taskTextOutsideRight {
    fill: ${t.taskTextDarkColor};
    text-anchor: start;
    font-family: ${t.fontFamily};
  }

  .taskTextOutsideLeft {
    fill: ${t.taskTextDarkColor};
    text-anchor: end;
  }


  /* Special case clickable */

  .task.clickable {
    cursor: pointer;
  }

  .taskText.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideLeft.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideRight.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }


  /* Specific task settings for the sections*/

  .taskText0,
  .taskText1,
  .taskText2,
  .taskText3 {
    fill: ${t.taskTextColor};
  }

  .task0,
  .task1,
  .task2,
  .task3 {
    fill: ${t.taskBkgColor};
    stroke: ${t.taskBorderColor};
  }

  .taskTextOutside0,
  .taskTextOutside2
  {
    fill: ${t.taskTextOutsideColor};
  }

  .taskTextOutside1,
  .taskTextOutside3 {
    fill: ${t.taskTextOutsideColor};
  }


  /* Active task */

  .active0,
  .active1,
  .active2,
  .active3 {
    fill: ${t.activeTaskBkgColor};
    stroke: ${t.activeTaskBorderColor};
  }

  .activeText0,
  .activeText1,
  .activeText2,
  .activeText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Completed task */

  .done0,
  .done1,
  .done2,
  .done3 {
    stroke: ${t.doneTaskBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
  }

  .doneText0,
  .doneText1,
  .doneText2,
  .doneText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Tasks on the critical line */

  .crit0,
  .crit1,
  .crit2,
  .crit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.critBkgColor};
    stroke-width: 2;
  }

  .activeCrit0,
  .activeCrit1,
  .activeCrit2,
  .activeCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.activeTaskBkgColor};
    stroke-width: 2;
  }

  .doneCrit0,
  .doneCrit1,
  .doneCrit2,
  .doneCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
    cursor: pointer;
    shape-rendering: crispEdges;
  }

  .milestone {
    transform: rotate(45deg) scale(0.8,0.8);
  }

  .milestoneText {
    font-style: italic;
  }
  .doneCritText0,
  .doneCritText1,
  .doneCritText2,
  .doneCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .activeCritText0,
  .activeCritText1,
  .activeCritText2,
  .activeCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .titleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${t.titleColor||t.textColor};
    font-family: ${t.fontFamily};
  }
`,"getStyles"),hn=fn,mn={parser:_i,db:cn,renderer:dn,styles:hn};export{mn as diagram};
