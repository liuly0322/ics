import{e as He,r as W,f as re,g as ze,w as Ae,h as Ke,o as M,c as P,b as E,i as G,v as te,F as Ee,j as Fe,u as H,k as De,n as Re,t as X,l as ve,m as xe,p as Ye,d as me,q as we,s as _e,x as qe,a as We}from"./app.db0dcfa7.js";const Ne={lab1:{testCode:`
let [number, bits] = testcase.split(':').map(Number)
lc3.memory[0x3100] = number
lc3.memory[0x3101] = bits
let mask = 1
let ans  = 0
while (bits-- > 0) {
  if (number & mask) {
     ans++
  }
  mask = mask + mask
}
return ans`,ansCode:"return lc3.memory[0x3102]",testCases:""},\u81EA\u5B9A\u4E49:{testCode:"",ansCode:"",testCases:""}},Xe=Object.keys(Ne);function Te(o){return Ne[o]}const Qe=function(){Array.prototype.includes||(Array.prototype.includes=function(s){var n=Object(this),i=parseInt(n.length)||0;if(i===0)return!1;var f=parseInt(arguments[1])||0,a;f>=0?a=f:(a=i+f,a<0&&(a=0));for(var d;a<i;){if(d=n[a],s===d||s!==s&&d!==d)return!0;a++}return!1}),String.prototype.includes||(String.prototype.includes=function(){return typeof arguments[1]=="number"?this.length<arguments[0].length+arguments[1].length?!1:this.substr(arguments[1],arguments[0].length)===arguments[0]:String.prototype.indexOf.apply(this,arguments)!==-1});var o=function(){function s(n,i){var f=[],a=!0,d=!1,p=void 0;try{for(var m=n[Symbol.iterator](),y;!(a=(y=m.next()).done)&&(f.push(y.value),!(i&&f.length===i));a=!0);}catch(l){d=!0,p=l}finally{try{!a&&m.return&&m.return()}finally{if(d)throw p}}return f}return function(n,i){if(Array.isArray(n))return n;if(Symbol.iterator in Object(n))return s(n,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),r=Object.assign||function(s){for(var n=1;n<arguments.length;n++){var i=arguments[n];for(var f in i)Object.prototype.hasOwnProperty.call(i,f)&&(s[f]=i[f])}return s};function e(s){if(Array.isArray(s)){for(var n=0,i=Array(s.length);n<s.length;n++)i[n]=s[n];return i}else return Array.from(s)}function t(s){return Array.isArray(s)?s:Array.from(s)}function u(s,n,i){return n in s?Object.defineProperty(s,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):s[n]=i,s}function c(s){var n=arguments.length<=1||arguments[1]===void 0?function(i){return i}:arguments[1];return function(){try{return{success:!0,result:s.apply(void 0,arguments)}}catch(i){return{success:!1,errorMessage:n(i.message)}}}}function h(s,n){return function(){try{return s.apply(void 0,arguments)}catch(i){throw new Error(n+": "+i.message)}}}var x=65536,g=16,A=65024,R={MEMORY_SIZE:x,WORD_BITS:g,MAX_STANDARD_MEMORY:A};function F(s){if(s=s.toLowerCase(),s.length===0)return NaN;var n=!1;switch(s[0]==="-"&&(s=s.slice(1),n=!0),s[0]){case"x":var i=s.slice(1);if(i.match(/[^0-9a-f]/))return NaN;var a=parseInt(i,16);return n?-a:a;case"b":var f=s.slice(1);if(f.match(/[^01]/))return NaN;var a=parseInt(f,2);return n?-a:a;default:if(s.match(/[^0-9]/))return NaN;var a=parseInt(s);return n?-a:a}}function w(s){var n=arguments.length<=1||arguments[1]===void 0?4:arguments[1],i=arguments.length<=2||arguments[2]===void 0?"x":arguments[2],f=s.toString(16).toUpperCase();return f.length<n&&(f=Array(n-f.length+1).join("0")+f),i+f}function v(s){return s=s%(1<<g)&(1<<g)-1,s&1<<g-1?s-(1<<g):s}function b(s){var n=v(s);return n<0?n+(1<<g):n}function oe(s,n){var i=s&1<<n-1;return v(i?s-(1<<n):s&(1<<n)-1)}function se(s){var n=s&4,i=s&2,f=s&1;return!!n+!!i+!!f!=1?null:n?-1:f?1:0}function _(s){switch(se(s)){case null:return"Invalid";case-1:return"N";case 0:return"Z";case 1:return"P"}}var L={parseNumber:F,toHexString:w,toInt16:v,toUint16:b,signExtend16:oe,getConditionCode:se,formatConditionCode:_};function Oe(s){var n=c(function(){var i=Me(s),f=Ue(i),a=f.orig,d=f.begin,p=je(i,a,d),m=p.symbolTable,y=Je(i,m,a,d);return{orig:a,symbolTable:m,machineCode:y}})(s);return n.success?n.result:{error:[n.errorMessage]}}function N(s){var n=s.match(/^[Rr]([0-7])$/);if(n)return parseInt(n[1]);throw new Error("Invalid register specification: '"+s+"'")}function U(s){var n=new Error("Invalid numeric literal: '"+s+"'"),i=s.charAt(0);if(i!=="#"&&i.toLowerCase()!=="x"&&i.toLowerCase()!=="b")throw n;var f=i==="#",a=s.charAt(1)==="-",d=f?s.substring(a?2:1):a?i+s.substring(2):s,p=L.parseNumber(d);if(isNaN(p)||a&&p<0)throw n;return a?-p:p}function ke(s){var n=function(C){throw new Error("while parsing the string "+s+": "+C)};s.length<2&&n("this string is way too short! You need at least two characters just for the quote marks.");var i='"';(s.charAt(0)!==i||s.charAt(s.length-1)!==i)&&n("the string needs to start and end with "+("double quotation marks (e.g.: "+i+"I'm a string"+i+")."));var f=new Array(s.length-2),a=void 0;for(a=1;a<s.length-1;a++){var d=s.charAt(a),p=function(C){return n("at index "+a+": "+C)};if(d==='"'&&p("unescaped double quote found before end of string"),d==="\\"){var m=s.charAt(++a),y={0:"\0",n:`
`,r:"\r",'"':'"',"\\":"\\"}[m];m===void 0&&p("unsupported escape character '"+m+"'"),f[a]=y}else f[a]=d}return(a>=s.length||s.charAt(a)!=='"')&&n("unterminated string literal! Did you accidentally backslash-escape the closing quote?"),f.join("")}function Me(s){return s.split(/\r?\n/).map(Pe)}function Pe(s,n){for(var i=s.trimLeft(),f=h(ke,"on line "+(n+1)),a=0,d=1,p=2,m=a,y=[],l="",C=0;C<s.length;C++){var D=i.charAt(C),I=!!D.match(/\s/),T=D===",",V=D==='"';if(m===a){if(I||T)continue;m=V?p:d}if(D===";"&&m!==p)break;m===d?I||T?(y.push(l),m=a,l=""):l+=D:m===p&&(l+=D,D==="\\"?l+=i.charAt(++C):V&&l.length>1&&(y.push(f(l)),m=a,l=""))}return l.length>0&&(m===d?y.push(l):m===p&&y.push(f(l))),y}function Ue(s){var n=s.findIndex(function(m){return m.length>0});if(n===-1)throw new Error("Looks like your program's empty! You need at least an .ORIG directive and an .END directive.");var i=s[n],f=i.some(function(m){return m.toUpperCase()===".ORIG"});if(!f)throw new Error("The first non-empty, non-comment line of your program needs to have an .ORIG directive!");if(i[0].toUpperCase()!==".ORIG")throw new Error(".ORIG directive cannot have a label!");var a=i.length-1;if(a!==1)throw new Error("The .ORIG directive expects exactly one operand, "+("but it looks like you have "+a+"!"));var d=i[1],p=h(U,"while parsing .ORIG directive operand")(d);if(p!==L.toUint16(p))throw new Error(".ORIG operand ("+d+") is out of range! It should be between 0 and 0xFFFF, inclusive.");return{orig:p,begin:n+1}}function Ve(s){if(s.match(/[^A-Za-z0-9_]/))return!1;var n=c(U)(s);return!n.success}function ge(s,n){switch(s.toUpperCase()){case".FILL":return 1;case".BLKW":if(n<0)throw new Error("a .BLKW needs to have a non-negative length, "+("but I found "+n));return n;case".STRINGZ":return n.length+1;default:return 1}}function je(s,n,i){var f={symbols:{},address:n,seenEndDirective:!1},a=function(l){var C=R.MEMORY_SIZE;if(l>C)throw new Error("currently at address "+L.toHexString(l)+", which is past the memory limit "+("of "+L.toHexString(C)))},d=function(l,C){var D=l.address+C;return a(D),r({},l,{address:D})},p={handleEnd:function(l){return r({},l,{seenEndDirective:!0})},handleLabel:function(l,C){a(l.address+1);var D=C[0],I=l.symbols[D];if(I!==void 0)throw new Error("label name "+D+" already exists; "+("it points to "+L.toHexString(I)));return r({},l,{symbols:r({},l.symbols,u({},D,l.address))})},handleDirective:function(l,C){if(l.seenEndDirective)return l;var D=t(C),I=D[0],T=D.slice(1),V=function(){var Z=function(){if(T.length!==1)throw new Error("expected "+I+" directive to have exactly one operand, "+("but found "+T.length))};switch(I.toUpperCase()){case".BLKW":case".FILL":return Z(),U(T[0]);case".STRINGZ":return Z(),T[0];default:return null}}();return d(l,ge(I,V))},handleInstruction:function(l,C){return l.seenEndDirective?l:d(l,ge(C[0],null))}},m=be(s,i,p,f);if(!m.seenEndDirective)throw new Error("no .END directive found!");return{symbolTable:m.symbols,programLength:m.address-n}}function $e(s,n,i,f){var a=function(y){var l=-(1<<f-1),C=(1<<f-1)-1;if(!(l<=y&&y<=C))throw new Error("offset "+y+" is out of range; "+("it must fit into "+f+" bits, ")+("so it should be between "+l+" and "+C+", inclusive"));return y},d=c(U)(n);if(d.success)return a(d.result);if(!(n in i))throw new Error("the offset '"+n+"' is not a valid numeric literal, but I can't find it in the symbol table either; did you misspell a label name?");var p=i[n];return a(p-s)}function Ge(s){var n=s[0],i=s[1];switch(n.toUpperCase()){case".FILL":return[L.toUint16(U(i))];case".BLKW":return new Array(L.toUint16(U(i))).fill(0);case".STRINGZ":return i.split("").map(function(f){return f.charCodeAt(0)}).concat([0]);default:throw new Error("unrecognized directive: "+n)}}function Ze(s,n,i){var f=s[0],a=f.toUpperCase(),d=s.slice(1),p=function(S){if(d.length!==S){var k=S===1?"operand":"operands";throw new Error("expected "+f+" instruction to have "+("exactly "+S+" "+k+", but found "+d.length))}},m=function(S,k,pe){var ue=-(1<<k-1),Ce=(1<<k-1)-1;if(ue<=S&&S<=Ce)return L.toUint16(S)&(1<<k)-1;throw new Error(pe+" is out of range: "+("expected value to fit in "+k+" bits ")+("(i.e., to be between "+ue+" and "+Ce+", inclusive), ")+("but found "+S))},y=function(S,k){var pe="while parsing the offset for a "+f,ue=h($e,pe)(n,S,i,k);return L.toUint16(ue)&(1<<k)-1},l={GETC:32,OUT:33,PUTS:34,IN:35,PUTSP:36,HALT:37},C=l[a];if(C!==void 0)return p(0),[61440|C];var D={ADD:1,AND:5,NOT:9,BR:0,BRP:0,BRZ:0,BRZP:0,BRN:0,BRNP:0,BRNZ:0,BRNZP:0,JMP:12,RET:12,JSR:4,JSRR:4,LD:2,LDI:10,LDR:6,LEA:14,RTI:8,ST:3,STI:11,STR:7,TRAP:15},I=D[a];if(I===void 0)throw new Error('unrecognized instruction "'+f+'"');var T=I<<12;if(a==="ADD"||a==="AND"){p(3);var V=d.slice(0,2).map(function(q){return N(q)}),Z=o(V,2),z=Z[0],le=Z[1],j=d[2],O=c(U)(j),ne=O.success?32|m(O.result,5,"immediate field"):0|N(j);return[T|z<<9|le<<6|ne]}else if(I===0){p(1);var ae=a==="BR"?[!0,!0,!0]:["N","Z","P"].map(function(q){return a.substring(2).includes(q)}),$=o(ae,3),K=$[0],Q=$[1],ee=$[2],Y=K<<2|Q<<1|ee<<0,J=y(d[0],9);return[T|Y<<9|J]}else{if(a==="JMP")return p(1),[T|N(d[0])<<6];if(a==="RET")return p(0),[T|7<<6];if(a==="JSR")return p(1),[T|1<<11|y(d[0],11)];if(a==="JSRR")return p(1),[T|0<<11|N(d[0])<<6];if(["LD","LDI","LEA","ST","STI"].includes(a)){p(2);var ce=N(d[0]),J=y(d[1],9);return[T|ce<<9|J]}else if(a==="LDR"||a==="STR"){p(3);var ye=N(d[0]),fe=N(d[1]),J=y(d[2],6);return[T|ye<<9|fe<<6|J]}else if(a==="NOT"){p(2);var z=N(d[0]),de=N(d[1]);return[T|z<<9|de<<6|63]}else{if(a==="RTI")return p(0),[T];if(a==="TRAP"){p(1);var he="while parsing the trap vector",ie=h(U,he)(d[0]);if(!(0<=ie&&ie<=255))throw new Error("trap vector out of range: expected value to be an unsigned byte (i.e., between 0 and 255, inclusive), "+("but found "+ie));return[T|ie]}else throw new Error("internal error: unhandled instruction "+f)}}}function Je(s,n,i,f){var a={machineCode:[],address:i,seenEndDirective:!1},d=function(l,C){return r({},l,{machineCode:l.machineCode.concat(C),address:l.address+C.length})},p={handleDirective:function(l,C){return l.seenEndDirective?l:d(l,Ge(C))},handleInstruction:function(l,C){if(l.seenEndDirective)return l;var D=l.address+1;return d(l,Ze(C,D,n))},handleEnd:function(l){return r({},l,{seenEndDirective:!0})}},m=be(s,f,p,a);if(!m.seenEndDirective)throw new Error("missing .END directive");return m.machineCode}function be(s,n,i,f){var a=function(O){return O},d=i.handleLabel,p=d===void 0?a:d,m=i.handleDirective,y=m===void 0?a:m,l=i.handleInstruction,C=l===void 0?a:l,D=i.handleEnd,I=D===void 0?a:D,T="GETC OUT PUTS IN PUTSP HALT".split(" "),V=["ADD","AND","NOT","BR","BRP","BRZ","BRZP","BRN","BRNP","BRNZ","BRNZP","JMP","RET","JSR","JSRR","LD","LDI","LDR","LEA","RTI","ST","STI","STR","TRAP"],Z=[".FILL",".BLKW",".STRINGZ"],z=[].concat(e(T),V,Z),le=s.slice(n);return le.reduce(function(j,O,ne){if(O.length===0)return j;var ae="at line "+(ne+n+1),$=function(fe){var de=arguments.length<=1||arguments[1]===void 0?j:arguments[1],he=arguments.length<=2||arguments[2]===void 0?O:arguments[2];return h(fe,ae)(de,he,ne)},K=O[0];if(K.toUpperCase()===".END")return $(I);var Q=!z.includes(K.toUpperCase());if(Q&&!Ve(K))throw new Error(ae+": this line looks like a label, "+("but '"+K+"' is not a valid label name; ")+"you either misspelled an instruction or entered an invalid name for a label");var ee=Q?$(p):j,Y=O.slice(Q?1:0);if(Y.length===0)return ee;var J=Y[0].toUpperCase(),ce=J.charAt(0)===".";return j.address+1,$(ce?y:C,ee,Y)},f)}return Oe}(),Be=function(){var o=function(t){return(t||"").split(`
`).map(function(u){return u.split(";")[0]}).join(`
`)},r=function(t){for(var u=t.split(`
`),c=0;c<u.length;c++){var h=u[c],x=h.match(/[^\s0-9A-Fa-f]/);if(!!x){var g=x[0],A="Invalid character '"+g+"' at line "+(c+1);return{error:A}}}var R=t.replace(/\s/g,""),F=!!R.match(/[^01]/),w=F?4:16;if(R.length%w!==0){var v=R.length===1?"character":"characters",b=F?"hexadecimal":"binary",A="Found a total of "+R.length+" "+v+", but expected to find a multiple of "+w+" for "+b+" data.";return{error:A}}return{type:F?"hex":"binary"}},e=function(t,u){var c=t.replace(/\s/g,""),h=u==="hex"?4:16,x=new Array(c.length/h);if(x.length===0){var g="Your raw data is empty! You need to at least have an origin (.ORIG) address.";return{error:g}}for(var A=0;A<x.length;A++){var R=h*A;x[A]=c.substr(R,h)}var F=u==="hex"?16:2,w=x.map(function(v){return parseInt(v,F)});return{orig:w[0],machineCode:w.slice(1)}};return function(t){var u=o(t),c=r(u);if(c.error)return c;var h=c.type;return e(u,h)}}();function Ie(){var o=[],r=0;this.getLength=function(){return o.length-r},this.isEmpty=function(){return o.length==0},this.enqueue=function(e){o.push(e)},this.dequeue=function(){if(o.length!=0){var e=o[r];return 2*++r>=o.length&&(o=o.slice(r),r=0),e}},this.peek=function(){return 0<o.length?o[r]:void 0}}const Le={TRAP_GETC:1024,TRAP_OUT:1072,TRAP_PUTS:1104,TRAP_IN:1184,TRAP_PUTSP:1248,TRAP_HALT:64880},Se={32:1024,33:1072,34:1104,35:1184,36:1248,37:64880,1024:15879,1025:40964,1026:2046,1027:40963,1028:11779,1029:49600,1030:65024,1031:65026,1072:15882,1073:12808,1074:41477,1075:2046,1076:45060,1077:8708,1078:11780,1079:49600,1080:65028,1081:65030,1104:15894,1105:12306,1106:12818,1107:13330,1108:25088,1109:1029,1110:41993,1111:2046,1112:45576,1113:4129,1114:4089,1115:8200,1116:8712,1117:9224,1118:11784,1119:49600,1120:65028,1121:65030,1122:62461,1123:62462,1184:15878,1185:57350,1186:61474,1187:61472,1188:61473,1189:11777,1190:49600,1191:12289,1248:15911,1249:12322,1250:12834,1251:13346,1252:13858,1253:4640,1254:24640,1255:1030,1256:18445,1257:9240,1258:20482,1259:1026,1260:4705,1261:4088,1262:8212,1263:18438,1264:8211,1265:8723,1266:9235,1267:9747,1268:11795,1269:49600,1270:15878,1271:42503,1272:2049,1273:4092,1274:45059,1275:11777,1276:49600,1278:65030,1279:65028,1280:62461,1281:62462,1282:65280,64768:15934,64769:12348,64770:8199,64771:61473,64772:57350,64773:61474,64774:61477,64775:8246,64776:11830,64777:49600,64880:15886,64881:12812,64882:12298,64883:57356,64884:61474,64885:41519,64886:8239,64887:20544,64888:45100,64889:8195,64890:8707,64891:11779,64892:49600,64933:65534,64934:32767,65028:32768,65534:65535},B={parseNumber:function(o){if(o=o.toLowerCase(),o.length==0)return NaN;var r=!1;switch(o[0]==="-"&&(o=o.slice(1),r=!0),o[0]){case"x":var e=o.slice(1);if(e.match(/[^0-9a-f]/))return NaN;var u=parseInt(e,16);return r?-u:u;case"b":var t=o.slice(1);if(t.match(/[^01]/))return NaN;var u=parseInt(t,2);return r?-u:u;default:if(o.match(/[^0-9]/))return NaN;var u=parseInt(o);return r?-u:u}},toHexString:function(o,r){var e=o.toString(16).toUpperCase();return r=r||4,e.length<r&&(e=Array(r-e.length+1).join("0")+e),"x"+e},toInt16:function(o){return o=o%65536&65535,o&32768?o-65536:o},toUint16:function(o){var r=this.toInt16(o);return r<0?r+65536:r},signExtend16:function(o,r){var e=o>>r-1&1;if(e===1)for(var t=r;t<16;t++)o|=1<<t;else o&=(1<<r)-1;return this.toInt16(o)}};class er{constructor(){this.memory=new Array(65536).fill(0);for(const t in Se)this.memory[t]=Se[t];this.listeners=[],this.addListener=function(t){this.listeners.push(t)},this.notifyListeners=function(t){for(var u=0;u<this.listeners.length;u++)this.listeners[u](t)},this.r=new Array(8).fill(0),this.specialRegisters=["pc","ir","psr"],this.resetSpecialRegisters(),this.labelToAddress={},this.addressToLabel={};for(var r in Le){var e=Le[r];this.setLabel(e,r)}this.maxStandardMemory=65024,this.kbsr=65024,this.kbdr=65026,this.dsr=65028,this.ddr=65030,this.mcr=65534,this.ioLocations=[this.kbsr,this.kbdr,this.dsr,this.ddr],this.kbiv=384,this.div=385,this.kbpl=2,this.dpl=1,this.namedTrapVectors={32:"GETC",33:"OUT",34:"PUTS",35:"IN",36:"PUTSP",37:"HALT"},this.bufferedKeys=new Ie,this.subroutineLevel=0}formatAddress(r){var e=this.addressToLabel[r];return e!==void 0?e:B.toHexString(r)}getConditionCode(){var r=(this.psr&4)!==0,e=(this.psr&2)!==0,t=(this.psr&1)!==0;if(r^e^t&&!(r&&e&&t))return r?-1:e?0:1}setConditionCode(r){r=B.toInt16(r);var e=r<0,t=r>0,u=!e&&!t,c=(e?4:0)|(u?2:0)|(t?1:0);this.setRegister("psr",this.psr&65528|c)}nextInstruction(){this.fetch();var r=this.decode(this.ir),e=this.evaluateAddress(this.pc,r),t=this.fetchOperands(e),u=this.execute(r,e,t);return this.storeResult(r,u),r}fetch(){this.ir=this.getMemory(this.pc),this.setRegister("pc",this.pc+1)}decode(r){for(var e={raw:r,strictValid:!0},t=Array(16),u=0;u<t.length;u++)t[u]=r>>u&1;e.opcode=r>>12&15;var c=r&63,h=r>>6&7,x=r&511,g=r>>9&7,A=r&2047;switch(e.opcode){case 1:case 5:e.opname=e.opcode===1?"ADD":"AND",e.dr=g,e.sr1=h,e.mode="none",t[5]===0?(e.arithmeticMode="reg",e.sr2=r&7,(t[4]!==0||t[3]!==0)&&(e.strictValid=!1)):(e.arithmeticMode="imm",e.imm=B.signExtend16(r&31,5));break;case 0:e.opname="BR",e.n=t[11]==1,e.z=t[10]==1,e.p=t[9]==1,e.mode="pcOffset",e.offset=B.signExtend16(x,9);break;case 12:e.opname=h===7?"RET":"JMP",e.mode="baseOffset",e.baseR=h,e.offset=0,(g!==0||c!==0)&&(e.strictValid=!1);break;case 4:t[11]===0?(e.opname="JSRR",e.mode="baseOffset",e.baseR=h,e.offset=0,(g!==0||c!==0)&&(e.strictValid=!1)):(e.opname="JSR",e.mode="pcOffset",e.offset=B.signExtend16(A,11));break;case 2:case 10:e.opname=e.opcode===2?"LD":"LDI",e.dr=g,e.mode="pcOffset",e.offset=B.signExtend16(x,9);break;case 6:e.opname="LDR",e.dr=g,e.mode="baseOffset",e.baseR=h,e.offset=B.signExtend16(c,6);break;case 14:e.opname="LEA",e.dr=g,e.mode="pcOffset",e.offset=B.signExtend16(x,9);break;case 9:e.opname="NOT",e.mode="none",e.dr=g,e.sr=h,c!==63&&(e.strictValid=!1);break;case 8:e.opname="RTI",e.mode="none",r&!0&&(e.strictValid=!1);break;case 3:case 11:e.opname=e.opcode===3?"ST":"STI",e.sr=g,e.mode="pcOffset",e.offset=B.signExtend16(x,9);break;case 7:e.opname="STR",e.sr=g,e.mode="baseOffset",e.baseR=h,e.offset=B.signExtend16(c,6);break;case 15:e.opname="TRAP",e.mode="trap",e.trapVector=r&255,(r&3840)!==0&&(e.strictValid=!1);break;default:e.opname="reserved",e.strictValid=!1;break}return e}evaluateAddress(r,e){return e.mode==="none"?null:e.mode==="pcOffset"?B.toUint16(r+e.offset):e.mode==="baseOffset"?B.toUint16(this.getRegister(e.baseR)+e.offset):e.mode==="trap"?e.trapVector:void 0}fetchOperands(r){return r==null?r:this.readMemory(r)}execute(r,e,t){switch(r.isIO=!1,r.opcode){case 1:case 5:var u=this.getRegister(r.sr1),c=r.arithmeticMode==="reg"?this.getRegister(r.sr2):r.imm;return r.opcode===1?u+c:u&c;case 0:var h=this.getConditionCode(),x=r.n&&h<0||r.z&&h===0||r.p&&h>0;return x&&this.setRegister("pc",e),null;case 12:return this.setRegister("pc",e),r.opname==="RET"&&this.subroutineLevel--,null;case 4:return this.setRegister(7,this.pc),this.setRegister("pc",e),this.subroutineLevel++,null;case 2:return this.ioLocations.indexOf(e)!==-1&&(r.isIO=!0),t;case 10:return this.ioLocations.indexOf(t)!==-1&&(r.isIO=!0),this.readMemory(t);case 6:return this.ioLocations.indexOf(e)!==-1&&(r.isIO=!0),t;case 14:return e;case 9:return B.toUint16(~this.getRegister(r.sr));case 8:if((this.psr&32768)!==0){var A={type:"exception",exception:"privilege"};this.notifyListeners(A),this.halt()}else{var g=this.r[6];this.setRegister("pc",this.readMemory(g)),this.setRegister("psr",this.readMemory(g+1)),this.setRegister(6,g+2)}return null;case 3:return this.ioLocations.indexOf(e)!==-1&&(r.isIO=!0),this.writeMemory(e,this.getRegister(r.sr)),null;case 11:return this.ioLocations.indexOf(t)!==-1&&(r.isIO=!0),this.writeMemory(t,this.getRegister(r.sr)),null;case 7:return this.ioLocations.indexOf(e)!==-1&&(r.isIO=!0),this.writeMemory(e,this.getRegister(r.sr)),null;case 15:return this.setRegister(7,this.pc),this.setRegister("pc",t),this.subroutineLevel++,null;case 13:var A={type:"exception",exception:"opcode"};return this.notifyListeners(A),this.halt(),null;default:return}}storeResult(r,e){switch(r.opcode){case 1:case 5:case 9:this.setRegister(r.dr,e),this.setConditionCode(e);break;case 0:case 12:case 4:return;case 2:case 10:case 6:case 14:this.setRegister(r.dr,e),this.setConditionCode(e);break;case 8:return;case 3:case 11:case 7:return}}instructionToString(r,e){var t=this.decode(e);if(!t.strictValid)return".FILL "+B.toHexString(t.raw);var u=function(b){return"R"+b};if(!t.strictValid)return".FILL "+B.toHexString(t.raw);var c=t.opname+" ",h=r+1,x=this.evaluateAddress(h,t);switch(t.opcode){case 1:case 5:var g=u(t.sr1),A=t.arithmeticMode=="reg"?u(t.sr2):"#"+t.imm,R=u(t.dr);return c+[R,g,A].join(", ");case 9:return c+[u(t.dr),u(t.sr)].join(", ");case 0:if((t.raw&3584)===0||t.offset===0)return"NOP";var F="BR";return t.n&&(F+="n"),t.z&&(F+="z"),t.p&&(F+="p"),F+" "+this.formatAddress(x);case 12:var w=t.baseR;return w===7?"RET":"JMP "+u(w);case 4:return t.mode==="pcOffset"?c+this.formatAddress(x):c+u(t.baseR);case 2:case 10:case 14:return c+[u(t.dr),this.formatAddress(x)].join(", ");case 6:return c+[u(t.dr),u(t.baseR),"#"+t.offset].join(", ");case 8:return t.opname;case 3:case 11:return c+[u(t.sr),this.formatAddress(x)].join(", ");case 7:return c+[u(t.sr),u(t.baseR),"#"+t.offset].join(", ");case 15:var v=this.namedTrapVectors[x];return v!==void 0?v:c+B.toHexString(x,2);default:return null}}instructionAddressToString(r){return this.instructionToString(r,this.getMemory(r))}setLabel(r,e){this.unsetLabelGivenAddress(r),this.unsetLabelGivenName(e),this.labelToAddress[e]=r,this.addressToLabel[r]=e;var t={type:"labelset",address:r,label:e};this.notifyListeners(t)}unsetLabelGivenAddress(r){var e=this.addressToLabel[r],t=e!==void 0;return t?(this.unsetLabel_internal_(r,e),!0):!1}unsetLabelGivenName(r){var e=this.labelToAddress[r],t=e!==void 0;return t?(this.unsetLabel_internal_(e,r),!0):!1}unsetLabel_internal_(r,e){delete this.addressToLabel[r],delete this.labelToAddress[e];var t={type:"labelunset",address:r,label:e};this.notifyListeners(t)}getMemory(r){return this.memory[r]}setMemory(r,e){var t={type:"memset",address:r,newValue:e};this.memory[r]=B.toUint16(e),this.notifyListeners(t)}readMemory(r){return r===this.kbdr&&this.setMemory(this.kbsr,this.getMemory(this.kbsr)&32767),this.getMemory(r)}writeMemory(r,e){r===this.ddr&&this.setMemory(this.dsr,this.getMemory(this.dsr)&32767),this.setMemory(r,e)}getRegister(r){if(!isNaN(r)&&r>=0&&r<this.r.length)return this.r[r];for(var e=0;e<this.specialRegisters.length;e++){var t=this.specialRegisters[e];if(t===r)return this[t]}}setRegister(r,e){e=B.toUint16(e);var t={type:"regset",register:void 0,newValue:e};if(!isNaN(r)&&r>=0&&r<this.r.length)return t.register=r,this.r[r]=e,this.notifyListeners(t),!0;for(var u=0;u<this.specialRegisters.length;u++){var c=this.specialRegisters[u];if(c===r)return t.register=c,this[c]=e,this.notifyListeners(t),!0}return!1}resetSpecialRegisters(){this.pc=12288,this.ir=0,this.psr=32770}formatConditionCode(){var r=this.getConditionCode();return r===void 0?"Invalid":r>0?"P":r<0?"N":"Z"}sendKey(r){this.bufferedKeys.enqueue(r),this.notifyListeners({type:"bufferchange"})}clearBufferedKeys(){this.bufferedKeys=new Ie,this.notifyListeners({type:"bufferchange"})}isRunning(){return(this.getMemory(this.mcr)&32768)!==0}halt(){this.setMemory(this.mcr,this.getMemory(this.mcr)&32767)}unhalt(){this.setMemory(this.mcr,this.getMemory(this.mcr)|32768)}loadAssembled(r){if(r.error)return!1;for(var e=r.orig,t=r.machineCode,u=r.symbolTable||{},c=0;c<t.length;c++)this.setMemory(e+c,t[c]);for(var h in u)this.setLabel(u[h],h);this.setRegister("pc",e)}interrupt(r,e){if(!(r<=(this.psr&1792)>>8)){var t=this.getRegister(6);t--,this.setMemory(t,this.psr),t--,this.setMemory(t,this.pc),this.psr&=30968,this.psr|=(r&7)<<8,this.setRegister("pc",e),this.setRegister(6,t)}}}function rr(o,r,e,t,u,c){const h=u(o,t),x=[];if(e){const F=w=>{let v="";switch(w.type){case"exception":v=`\u5F02\u5E38\uFF1A${w.exception}`;break;case"memset":v=`x${w.address.toString(16)} \u53D8\u4E3A ${w.newValue}`;break;case"regset":typeof w.register=="number"&&(v=`R${w.register} \u53D8\u4E3A ${w.newValue}`)}if(v){const b=x.pop();x.push(`${b} (${v})`)}};o.addListener(F)}const g=e?()=>{const F=o.instructionAddressToString(o.pc);x.push(`x${o.pc.toString(16)}\uFF1A${F}`),o.nextInstruction()}:()=>{o.nextInstruction()};let A=0;for(;A<=r;A++){const F=o.memory[o.pc];if(F>=61440&&F<=61695||F===0)break;g()}const R=c(o);return A>r?x.push(`\u5F02\u5E38 ${t}, \u8D85\u51FA\u6700\u5927\u6307\u4EE4\u6570\uFF0C\u8BF7\u8C03\u6574\u8BBE\u7F6E\uFF0C\u6216\u8005\u53EF\u80FD\u53D1\u751F\u4E86\u6B7B\u5FAA\u73AF`):h===R?x.push(`\u901A\u8FC7 ${t}, \u6307\u4EE4\u6570: ${A}, \u8F93\u51FA: ${R}`):x.push(`\u5931\u8D25 ${t}, \u6307\u4EE4\u6570: ${A}, \u8F93\u51FA: ${R}, \u9884\u671F: ${h}`),{cycles:A,logs:x,passed:h===R}}function tr(o){const r=Qe(o);let e=Be(o);return"error"in r?"error"in e?[null,[`\u673A\u5668\u7801\uFF1A${e.error}`,`\u6C47\u7F16\uFF1A${r.error}`]]:(e.orig!==12288&&(e=Be(`0011000000000000
${o}`)),["machine",e]):["assembly",r]}function sr(o,r,e,t,u,c){const h={state:null,logs:[]},[x,g]=tr(o);if(!x)return h.logs=g,h;h.state=x,c&&(t=[t[0]]);const A=t.map(v=>{const b=new er;return b.loadAssembled(g),rr(b,u,c,v,r,e)}),R=A.length,F=A.filter(v=>v.passed).length,w=A.reduce((v,b)=>v+b.cycles,0);return h.logs.push(`${F} / ${R} \u4E2A\u901A\u8FC7\u6D4B\u8BD5\u7528\u4F8B`),h.logs.push(`\u5E73\u5747\u6307\u4EE4\u6570: ${w/R}`),h.logs.push(...A.map(v=>v.logs).flat()),h}const nr={class:"card"},ar={class:"form-item"},ir=E("span",{class:"label"},"\u5355\u6837\u4F8B\u6700\u5927\u6307\u4EE4\u6570",-1),ur={class:"form-item"},or=E("span",{class:"label"},"\u9009\u62E9\u8BC4\u6D4B\u5B9E\u9A8C",-1),lr={style:{display:"flex"}},cr=["id","value"],fr=["for"],dr={class:"form-item"},hr=E("span",{class:"label"},"\u6D4B\u8BD5\u6837\u4F8B\uFF0C\u6837\u4F8B\u4E4B\u95F4\u4EE5\u9017\u53F7\u5206\u5272",-1),pr={class:"form-item"},vr=E("span",{class:"label"},"\u4EE3\u7801\u6587\u672C",-1),xr={class:"form-item"},mr=E("span",{class:"label"},"\u8BC4\u6D4B\u51FD\u6570",-1),gr={key:0,style:{color:"red"}},br={class:"form-item"},yr=E("span",{class:"label"},"\u7B54\u6848\u51FD\u6570",-1),Cr={key:0,style:{color:"red"}},Ar={class:"form-item"},Er=E("span",{class:"label"},"\u8C03\u8BD5\u6A21\u5F0F",-1),Fr={style:{display:"flex","justify-content":"flex-end"}},Dr=me(" \u8BC4\u6D4B "),Rr={key:0,class:"card",style:{"margin-top":"2em"}},wr={class:"label"},_r=He({__name:"Judge",setup(o){const r=W(1e6),e=W("lab1"),t=W(Te(e.value)),u=W(""),c=W(!1),h=W({state:null,logs:[]}),x=re(()=>t.value.testCases.replace(/，/g,",").split(",").map(v=>v.trim()).filter(Boolean));ze(()=>{var v;u.value=(v=window.localStorage.getItem("lc3code"))!=null?v:"",Ae(()=>{window.localStorage.setItem("lc3code",u.value)})}),Ae(()=>{c.value&&we({message:"\u5F00\u542F\u8C03\u8BD5\u6A21\u5F0F\u540E\u4E3A\u4E86\u907F\u514D\u6DF7\u6DC6\uFF0C\u53EA\u663E\u793A\u7B2C\u4E00\u4E2A\u6837\u4F8B",type:"primary"})}),Ke(e,v=>{t.value=Te(v),h.value={state:null,logs:[]}});const g=re(()=>{try{return Function("lc3","testcase",t.value.testCode)}catch(v){return String(v)}}),A=re(()=>typeof g.value!="string"),R=re(()=>{try{return Function("lc3",t.value.ansCode)}catch(v){return String(v)}}),F=re(()=>typeof R.value!="string"),w=()=>{h.value={state:null,logs:[]},![[!x.value.length,"\u7F3A\u5C11\u6D4B\u8BD5\u6837\u4F8B"],[!u.value,"\u7F3A\u5C11\u5F85\u6D4B\u4EE3\u7801"],[!t.value.testCode,"\u7F3A\u5C11\u8BC4\u6D4B\u51FD\u6570"],[!A.value,"\u8BC4\u6D4B\u51FD\u6570\u6709\u8BED\u6CD5\u9519\u8BEF"],[!t.value.ansCode,"\u7F3A\u5C11\u7B54\u6848\u51FD\u6570"],[!F.value,"\u7B54\u6848\u51FD\u6570\u6709\u8BED\u6CD5\u9519\u8BEF"]].filter(b=>b[0]).map(b=>b[1]).map(b=>we({message:b,type:"danger"})).length&&(h.value=sr(u.value,g.value,R.value,x.value,r.value,c.value))};return(v,b)=>{const oe=_e("f-switch"),se=_e("f-button");return M(),P("div",nr,[E("div",ar,[ir,G(E("input",{"onUpdate:modelValue":b[0]||(b[0]=_=>r.value=_),type:"number",style:{border:"0.5px solid",padding:"0.5em",margin:"4px"}},null,512),[[te,r.value]])]),E("div",ur,[or,E("div",lr,[(M(!0),P(Ee,null,Fe(H(Xe),_=>(M(),P("div",{key:_,style:{margin:"4px"}},[G(E("input",{id:_,"onUpdate:modelValue":b[1]||(b[1]=L=>e.value=L),type:"radio",value:_},null,8,cr),[[qe,e.value]]),E("label",{for:_},X(_),9,fr)]))),128))])]),E("div",dr,[hr,G(E("input",{"onUpdate:modelValue":b[2]||(b[2]=_=>t.value.testCases=_),style:{border:"0.5px solid",padding:"0.5em",margin:"4px","box-sizing":"border-box",width:"100%"}},null,512),[[te,t.value.testCases]])]),E("div",pr,[vr,G(E("textarea",{"onUpdate:modelValue":b[3]||(b[3]=_=>u.value=_),rows:"10",placeholder:"\u5728\u6B64\u8F93\u5165\u5F85\u8BC4\u6D4B\u7684\u6C47\u7F16\u4EE3\u7801\u6216\u8005\u673A\u5668\u7801",style:{border:"0.5px solid",margin:"4px"}},null,512),[[te,u.value]])]),G(E("div",xr,[mr,G(E("textarea",{"onUpdate:modelValue":b[4]||(b[4]=_=>t.value.testCode=_),rows:"10",class:Re(typeof H(g)=="string"?"border-red":""),placeholder:"\u4E00\u4E2A js \u51FD\u6570\u7684\u51FD\u6570\u4F53\uFF0C\u63A5\u53D7\u5355\u4E2A\u6837\u4F8B\uFF08\u5B57\u7B26\u4E32\uFF09\u4F5C\u4E3A\u53C2\u6570\uFF0C\u521D\u59CB\u5316 lc3.r \u548C lc3.memory\uFF08\u5BC4\u5B58\u5668\u6570\u7EC4\u548C\u5185\u5B58\u6570\u7EC4\uFF09\uFF0C\u5E76\u8FD4\u56DE\u5BF9\u4E8E\u6BCF\u4E2A\u6837\u4F8B\u800C\u8A00\u9884\u671F\u7684\u8F93\u51FA",style:{border:"0.5px solid",margin:"4px"}},null,2),[[te,t.value.testCode]]),H(A)?ve("",!0):(M(),P("div",gr,X(H(g)),1))],512),[[De,e.value==="\u81EA\u5B9A\u4E49"]]),G(E("div",br,[yr,G(E("textarea",{"onUpdate:modelValue":b[5]||(b[5]=_=>t.value.ansCode=_),rows:"10",class:Re(typeof H(R)=="string"?"border-red":""),placeholder:"\u4E00\u4E2A js \u51FD\u6570\u7684\u51FD\u6570\u4F53\uFF0C\u8FD4\u56DE\u6D4B\u8BD5\u7ED3\u675F\u540E\u8BFB\u53D6 lc3 \u6A21\u62DF\u5668\u7684\u54EA\u4E2A\u53D8\u91CF\uFF08\u5982 lc3.r \u548C lc3.memory \u6570\u7EC4\u4E2D\u7684\u67D0\u4E00\u9879\uFF09\u7684\u503C\u4F5C\u4E3A\u7528\u6237\u7A0B\u5E8F\u8FD0\u884C\u7684\u8F93\u51FA\uFF08\u5373\u8BC4\u6D4B\u4F9D\u636E\uFF09",style:{border:"0.5px solid",margin:"4px"}},null,2),[[te,t.value.ansCode]]),H(F)?ve("",!0):(M(),P("div",Cr,X(H(R)),1))],512),[[De,e.value==="\u81EA\u5B9A\u4E49"]]),E("div",Ar,[Er,xe(oe,{modelValue:c.value,"onUpdate:modelValue":b[6]||(b[6]=_=>c.value=_)},null,8,["modelValue"])]),E("div",Fr,[xe(se,{type:"primary",onClick:b[7]||(b[7]=_=>w())},{default:Ye(()=>[Dr]),_:1})]),h.value.logs.length?(M(),P("div",Rr,[E("span",wr,X(h.value.state==="assembly"?"\u6C47\u7F16":h.value.state==="machine"?"\u673A\u5668\u7801":"")+"\u8BC4\u6D4B",1),me(" "+X(h.value.logs[0])+" ",1),E("ul",null,[(M(!0),P(Ee,null,Fe(h.value.logs.slice(1),(_,L)=>(M(),P("li",{key:L},X(_),1))),128))])])):ve("",!0)])}}});const Tr=E("h1",{id:"lc3-\u8BC4\u6D4B",tabindex:"-1"},[me("lc3 \u8BC4\u6D4B "),E("a",{class:"header-anchor",href:"#lc3-\u8BC4\u6D4B","aria-hidden":"true"},"#")],-1),Br=We(`<h2 id="\u529F\u80FD" tabindex="-1">\u529F\u80FD <a class="header-anchor" href="#\u529F\u80FD" aria-hidden="true">#</a></h2><p>\u672C\u5DE5\u5177\u53D7\u5230 <a href="https://github.com/wchargin/lc3web" target="_blank" rel="noreferrer">lc3web</a> \u7684\u542F\u53D1\uFF0C\u53EF\u7528\u4E8E lc3 \u7A0B\u5E8F\u7684\u81EA\u52A9\u8BC4\u6D4B\u53CA\u7A0B\u5E8F\u8C03\u8BD5</p><p>\u9884\u8BBE\u7684\u6BCF\u6B21\u5B9E\u9A8C\u7684\u6D4B\u8BD5\u6837\u4F8B\u4EC5\u4F9B\u53C2\u8003\uFF0C<span style="color:#0095d9;">\u9A8C\u6536\u5B9E\u9A8C\u65F6\u53EF\u80FD\u4F1A\u589E\u6DFB\u66F4\u591A\u6837\u4F8B</span>\uFF0C\u9F13\u52B1\u81EA\u884C\u8865\u5145\u6D4B\u8BD5\u6837\u4F8B</p><p>\u5982\u679C\u4F60\u66F4\u504F\u597D\u672C\u5730\u547D\u4EE4\u884C\u6D4B\u8BD5\uFF0C\u53EF\u4EE5\u67E5\u770B <a href="https://github.com/chiragsakhuja/lc3tools" target="_blank" rel="noreferrer">lc3tools</a> \u9879\u76EE\u63D0\u4F9B\u7684 <a href="https://github.com/chiragsakhuja/lc3tools/blob/master/docs/TEST.md" target="_blank" rel="noreferrer">\u5355\u5143\u6D4B\u8BD5\u6587\u6863</a> \u53CA\u8BE5\u9879\u76EE README \u4E2D\u63D0\u5230\u7684\u547D\u4EE4\u884C\u5DE5\u5177\u7684\u4F7F\u7528</p><h2 id="\u4F7F\u7528\u8BF4\u660E" tabindex="-1">\u4F7F\u7528\u8BF4\u660E <a class="header-anchor" href="#\u4F7F\u7528\u8BF4\u660E" aria-hidden="true">#</a></h2><p>\u7EA6\u5B9A\u5982\u4E0B\uFF1A</p><ul><li>\u7EDF\u4E00\u4EE5 0x3000 \u4F5C\u4E3A\u8BC4\u6D4B\u7A0B\u5E8F\u5165\u53E3</li><li>\u673A\u5668\u7801\u5F00\u5934\u53EF\u4EE5\u5305\u542B 0011000000000000 (0x3000) \u5165\u53E3\u5730\u5740\uFF0C\u4E5F\u53EF\u4EE5\u4E0D\u5305\u542B</li><li>\u6CE8\u610F\u683C\u5F0F\uFF1A <ul><li>\u4EE3\u7801\u4E2D\u7684\u6CE8\u91CA\u9700\u8981\u5199\u5728\u82F1\u6587\u5206\u53F7\u4E4B\u540E</li><li>\u6C47\u7F16\u4EE3\u7801\u9700\u8981\u5199 <code>.ORIG</code> \u548C <code>.END</code></li><li>\u6C47\u7F16\u4EE3\u7801\u53C2\u6570\u9700\u8981\u7528\u82F1\u6587\u9017\u53F7\u5206\u5272</li><li>......</li></ul></li></ul><h2 id="\u81EA\u5B9A\u4E49\u8BC4\u6D4B" tabindex="-1">\u81EA\u5B9A\u4E49\u8BC4\u6D4B <a class="header-anchor" href="#\u81EA\u5B9A\u4E49\u8BC4\u6D4B" aria-hidden="true">#</a></h2><p>\uFF08\u5982\u679C\u53EA\u9700\u8981\u8BC4\u6D4B\u5B9E\u9A8C\u53EF\u7565\u8FC7\uFF09</p><p>\u7528\u6237\u9700\u8981\u8865\u5168\u8BC4\u6D4B\u51FD\u6570\u548C\u7B54\u6848\u51FD\u6570\u4E24\u4E2A\u51FD\u6570\u7684\u51FD\u6570\u4F53</p><p>\u5176\u4E2D\uFF0C\u8BC4\u6D4B\u51FD\u6570\u9700\u8981\u8D1F\u8D23\u521D\u59CB\u5316\u5BC4\u5B58\u5668\u548C\uFF08\u91CD\u7F6E\u6BCF\u6B21\u4F7F\u7528\u5230\u7684\uFF09\u5185\u5B58\u7684\u503C\uFF0C\u5177\u4F53\u6765\u8BF4\uFF0C\u51FD\u6570\u5185\u90E8\u53EF\u4EE5\u901A\u8FC7 <code>lc3.r</code> \u548C <code>lc3.memory</code> \u6765\u8BBF\u95EE\u5BC4\u5B58\u5668\u6570\u7EC4\u53D8\u91CF\u548C\u5185\u5B58\u6570\u7EC4\u53D8\u91CF\u3002\u524D\u8005\u957F\u5EA6\u4E3A <code>8</code>\uFF0C\u540E\u8005\u957F\u5EA6\u4E3A <code>65536</code></p><p>\u4F8B\u5982\uFF0C\u5982\u679C\u521D\u59CB\u8F93\u5165\u5B58\u50A8\u5728 R0, \u76EE\u6807\u662F\u5C06 R0 + R0 \u5B58\u5728 R7\uFF0C\u5BF9\u5E94\u7684\u8BC4\u6D4B\u51FD\u6570\u4F53\u793A\u4F8B\uFF1A</p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#676E95;">// \u53EF\u4EE5\u8BBF\u95EE\u4E24\u4E2A\u53C2\u6570</span></span>
<span class="line"><span style="color:#676E95;">// lc3 \u4E3A\u6A21\u62DF\u5668\u5BF9\u8C61, testcase \u4E3A\u8F93\u5165\u6837\u4F8B\uFF08\u5B57\u7B26\u4E32\u7C7B\u578B\uFF09</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">// \u5B57\u7B26\u4E32\u8F6C\u6362\u4E3A\u6570\u5B57</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> input </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">parseInt</span><span style="color:#A6ACCD;">(testcase)</span></span>
<span class="line"><span style="color:#676E95;">// \u521D\u59CB\u5316\u5BC4\u5B58\u5668</span></span>
<span class="line"><span style="color:#A6ACCD;">lc3</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">r[</span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">] </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> input</span></span>
<span class="line"><span style="color:#676E95;">// \u8FD4\u56DE\u9884\u8BA1\u7684\u6B63\u786E\u7B54\u6848</span></span>
<span class="line"><span style="color:#89DDFF;">return</span><span style="color:#A6ACCD;"> (input </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> input) </span><span style="color:#89DDFF;">%</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">65536</span></span>
<span class="line"></span></code></pre></div><p>\u7B54\u6848\u51FD\u6570\u4F53\u793A\u4F8B\uFF1A</p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#676E95;">// \u51FD\u6570\u63A5\u53D7\u4E00\u4E2A\u53C2\u6570 lc3</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">// \u8FD4\u56DE\u8BC4\u6D4B\u7ED3\u675F\u540E\u83B7\u53D6\u5230\u7684\u7B54\u6848</span></span>
<span class="line"><span style="color:#89DDFF;">return</span><span style="color:#A6ACCD;"> lc3</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">r[</span><span style="color:#F78C6C;">7</span><span style="color:#A6ACCD;">]</span></span>
<span class="line"></span></code></pre></div><p>\u4E24\u4E2A\u51FD\u6570\u7684\u8FD4\u56DE\u503C\u9700\u8981\u4FDD\u6301\u7C7B\u578B\u4E00\u81F4</p>`,16),Sr=JSON.parse('{"title":"lc3 \u8BC4\u6D4B","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u529F\u80FD","slug":"\u529F\u80FD"},{"level":2,"title":"\u4F7F\u7528\u8BF4\u660E","slug":"\u4F7F\u7528\u8BF4\u660E"},{"level":2,"title":"\u81EA\u5B9A\u4E49\u8BC4\u6D4B","slug":"\u81EA\u5B9A\u4E49\u8BC4\u6D4B"}],"relativePath":"judge.md","lastUpdated":1662992396000}'),Ir={name:"judge.md"},Nr=Object.assign(Ir,{setup(o){return(r,e)=>(M(),P("div",null,[Tr,xe(_r),Br]))}});export{Sr as __pageData,Nr as default};
