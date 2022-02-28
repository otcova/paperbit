!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.paperbit=e():t.paperbit=e()}(self,(function(){return(()=>{"use strict";var t={919:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Frame=void 0;const r=i(358);e.Frame=class{constructor(t){this.count=0,this.time=0,this.deltaTime=0,this.fps=0,this.size=[0,0],this.pixelSize=0,this.pastTime=0,t(this.updateAfterDraw.bind(this))}updateOnResize(t){this.pixelSize=2/Math.min(...t.canvasSize),this.size[0]=.5*t.canvasSize[0]*this.pixelSize,this.size[1]=.5*t.canvasSize[1]*this.pixelSize}updateAfterDraw(t){++this.count,this.time=performance.now()/1e3,this.deltaTime=this.time-this.pastTime,this.fps=1/this.deltaTime,this.pastTime=this.time,r.vec.equal(this.size,t.canvasSize)||this.updateOnResize(t)}}},594:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.PaperbitAPI=void 0;const r=i(919),s=i(33),n=i(711),a=i(975);class o extends s.GraphicsFunctions{constructor(t){super(),this.beforeFrameCallbacks=[];const e=t=>this.beforeFrameCallbacks.push(t);this.frame=new r.Frame(e),this.mouse=new a.Mouse(e),this.keyboard=new n.Keyboard(e),t(this.doFrame.bind(this))}async doFrame(t){var e;0==this.frame.count&&await(null===(e=this.onStart)||void 0===e?void 0:e.call(this,this));for(const e of this.beforeFrameCallbacks)e(t);return this.state.scope((()=>{var t;return null===(t=this.onDraw)||void 0===t?void 0:t.call(this,this)})),this.state.reset(),{verticesCount:this.buffer.size/10,buffer:this.buffer.clear()}}}e.PaperbitAPI=o},33:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.GraphicsFunctions=void 0;const r=i(358),s=i(671),n=i(390);e.GraphicsFunctions=class{constructor(){this.state=new n.GraphicsStateStack,this.buffer=new s.PushBuffer,this.triangle=this.triangle.bind(this),this.ellipse=this.ellipse.bind(this),this.rect=this.rect.bind(this),this.triangleStrip=this.triangleStrip.bind(this),this.background=this.background.bind(this),this.line=this.line.bind(this),this.text=this.text.bind(this),this.textWidth=this.textWidth.bind(this)}triangleStrip(t){for(let e=2;e<t.length;++e)this.triangle(t[e],t[e-1],t[e-2])}background(...t){const[e,i,r,n]=(0,s.setColor)([0,0,0,0],t),a=[-this.frame.size[0],-this.frame.size[1]],o=[this.frame.size[0],-this.frame.size[1]],h=[-this.frame.size[0],this.frame.size[1]],l=[this.frame.size[0],this.frame.size[1]];this.buffer.push([o[0],o[1],0,0,0,e,i,r,n,0,l[0],l[1],0,0,0,e,i,r,n,0,h[0],h[1],0,0,0,e,i,r,n,0,h[0],h[1],0,0,0,e,i,r,n,0,a[0],a[1],0,0,0,e,i,r,n,0,o[0],o[1],0,0,0,e,i,r,n,0])}triangle(t,e,i){var s,n,a;t=r.matrix.dot(this.state.matrix,4,[t[0],t[1],null!==(s=t[2])&&void 0!==s?s:0]),e=r.matrix.dot(this.state.matrix,4,[e[0],e[1],null!==(n=e[2])&&void 0!==n?n:0]),i=r.matrix.dot(this.state.matrix,4,[i[0],i[1],null!==(a=i[2])&&void 0!==a?a:0]),this.buffer.push([t[0],t[1],t[2],0,0,...this.state.color,0,e[0],e[1],e[2],0,0,...this.state.color,0,i[0],i[1],i[2],0,0,...this.state.color,0])}ellipse(t,e,i,s){s||(s=i);const n=t-(i/=2),a=e-(s/=2),o=t+i,h=e+s,l=r.matrix.dot(this.state.matrix,4,[n,a,0]),c=r.matrix.dot(this.state.matrix,4,[o,a,0]),u=r.matrix.dot(this.state.matrix,4,[n,h,0]),d=r.matrix.dot(this.state.matrix,4,[o,h,0]),g=this.genTextureClass("ellipse");this.buffer.push([c[0],c[1],c[2],-s,s,...this.state.color,g,d[0],d[1],d[2],-s,-s,...this.state.color,g,u[0],u[1],u[2],s,-s,...this.state.color,g,u[0],u[1],u[2],s,-s,...this.state.color,g,l[0],l[1],l[2],s,s,...this.state.color,g,c[0],c[1],c[2],-s,s,...this.state.color,g])}rect(t,e,i,s){null!=s||(s=i),i/=2,s/=2;const n=this.state.rectOrigin,a=t-i-n[0]*i,o=e-s-n[1]*s,h=t+i-n[0]*i,l=e+s-n[1]*s,c=r.matrix.dot(this.state.matrix,4,[a,o,0]),u=r.matrix.dot(this.state.matrix,4,[h,o,0]),d=r.matrix.dot(this.state.matrix,4,[a,l,0]),g=r.matrix.dot(this.state.matrix,4,[h,l,0]),f=this.state.rectUV,[m,p,v,x]=this.state.color,b=this.genTextureClass("rect");let w=[f[0],f[3]],y=[f[2],f[3]],_=[f[0],f[1]],A=[f[2],f[1]];8==f.length&&(w=[f[0],f[7]],y=[f[2],f[5]],_=[f[4],f[3]],A=[f[6],f[1]]),this.buffer.push([u[0],u[1],u[2],y[0],y[1],m,p,v,x,b,g[0],g[1],g[2],A[0],A[1],m,p,v,x,b,d[0],d[1],d[2],_[0],_[1],m,p,v,x,b,d[0],d[1],d[2],_[0],_[1],m,p,v,x,b,c[0],c[1],c[2],w[0],w[1],m,p,v,x,b,u[0],u[1],u[2],y[0],y[1],m,p,v,x,b])}line(t,e=!1){for(let e=1;e<t.length;++e)this.segment(t[e-2],t[e-1],t[e],t[e+1]);e&&t.length>2&&this.segment(t[t.length-2],t[t.length-1],t[0],t[1])}segment(t,e,i,s){var n,a,o,h;const l=r.vec.resize(r.vec.sub(i,e),this.state.lineWidth/2),c=[l[1],-l[0]],u=r.vec.add(e,c),d=r.vec.sub(e,c),g=r.vec.add(i,c),f=r.vec.sub(i,c),m=r.matrix.dot(this.state.matrix,4,[u[0],u[1],null!==(n=u[2])&&void 0!==n?n:0]),p=r.matrix.dot(this.state.matrix,4,[d[0],d[1],null!==(a=d[2])&&void 0!==a?a:0]),v=r.matrix.dot(this.state.matrix,4,[g[0],g[1],null!==(o=g[2])&&void 0!==o?o:0]),x=r.matrix.dot(this.state.matrix,4,[f[0],f[1],null!==(h=f[2])&&void 0!==h?h:0]);this.buffer.push([p[0],p[1],p[2],-1,1,...this.state.color,0,x[0],x[1],x[2],-1,-1,...this.state.color,0,v[0],v[1],v[2],1,-1,...this.state.color,0,v[0],v[1],v[2],1,-1,...this.state.color,0,m[0],m[1],m[2],1,1,...this.state.color,0,p[0],p[1],p[2],-1,1,...this.state.color,0])}text(t,e,i,r=.2){this.state.scope((()=>{const s=this.textWidth(t)*r,n=r;e-=(s+this.state.textOrigin[0]*s)/2,1==this.state.textOrigin[1]?i-=n/2:-1==this.state.textOrigin[1]&&(i-=.21875*n),this.state.textureColorBlend="*r";for(let s=0;s<t.length;++s)this.drawChar(t[s],e+this.textWidth(t.substring(0,s),t[s])*r,i,r)}))}textWidth(t,e){var i,r,s,n;const a=this.state.font;if(null==a)throw Error("state.font = null");let o=0;for(const e of t)o+=null!==(r=null===(i=a.atlas.map.get(e))||void 0===i?void 0:i.advance)&&void 0!==r?r:0;return e&&(o+=null!==(n=null===(s=a.atlas.map.get(t[t.length-1]))||void 0===s?void 0:s.kerning.get(e))&&void 0!==n?n:0),o}drawChar(t,e,i,r){if(!this.state.font)throw Error("state.font = null");const s=this.state.font.atlas.map.get(t);if(!s)throw Error(`Char '${t[0]}' of code '${t[0].charCodeAt(0)}' is not in the font`);const n=r*s.height;this.state.rectUV=[...s.a,...s.b],this.state.rectOrigin=[-1,1],this.state.texture=this.state.font,this.rect(e+r*s.offset[0],i-r*s.offset[1]+.5*r,n*(s.b[0]-s.a[0])/(s.b[1]-s.a[1]),n)}genTextureClass(t){const e=this.state.texture;let i="rect"==t?0:1<<31;if(e){switch(this.state.textureColorBlend){case"+":i|=1<<29;break;case"*":i|=2<<29;break;case"*r":i|=3<<29}i|=e.slot<<24}return i}}},671:function(t,e){var i,r,s=this&&this.__classPrivateFieldGet||function(t,e,i,r){if("a"===i&&!r)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===i?r:"a"===i?r.call(t):r?r.value:e.get(t)};Object.defineProperty(e,"__esModule",{value:!0}),e.PushBuffer=e.setColor=void 0,e.setColor=function(t,e){if("number"==typeof e)return t[0]=e,t[1]=e,t[2]=e,t[3]=1,t;switch(t[0]=e[0],e.length){case 1:return t[1]=e[0],t[2]=e[0],t[3]=1,t;case 2:return t[1]=e[0],t[2]=e[0],t[3]=e[1],t;case 3:return t[1]=e[1],t[2]=e[2],t[3]=1,t;case 4:t[1]=e[1],t[2]=e[2],t[3]=e[3]}return t},e.PushBuffer=class{constructor(t=1024,e=ArrayBuffer){i.add(this),this.BufferConstructor=e,this.size=0,this.buffer=new this.BufferConstructor(t),this.f32=new Float32Array(this.buffer)}push(t){this.buffer.byteLength/Float32Array.BYTES_PER_ELEMENT<=this.size+t.length&&s(this,i,"m",r).call(this,2*(this.size+t.length)),this.f32.set(t,this.size),this.size+=t.length}clear(){return this.size=0,this.buffer}},i=new WeakSet,r=function(t){const e=this.f32;this.buffer=new this.BufferConstructor(t*Float32Array.BYTES_PER_ELEMENT),this.f32=new Float32Array(this.buffer),e&&this.f32.set(e,0)}},711:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Keyboard=void 0,e.Keyboard=class{constructor(t){}}},975:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Mouse=void 0;class i{constructor(){this.pos=[0,0],this.left=0,this.right=0,this.middle=0,this.wheel=0}}e.Mouse=class extends i{constructor(t){super(),this.delta=new i,this.past=new i,this.pastMouseData={left:0,right:0,middle:0},t((t=>{var e,i;this.past.pos=this.pos,this.pos=t.mouse.pos,this.delta.pos[0]=this.pos[0]-this.past.pos[0],this.delta.pos[1]=this.pos[1]-this.past.pos[1],0==this.delta.pos[0]&&0==this.delta.pos[1]||null===(e=this.onMove)||void 0===e||e.call(this,this),this.past.wheel=this.wheel,this.wheel=t.mouse.wheel,this.delta.wheel=this.wheel-this.past.wheel,0!=this.delta.wheel&&(null===(i=this.onWheel)||void 0===i||i.call(this,this)),this.useMouseButtonData("left",t),this.useMouseButtonData("right",t),this.useMouseButtonData("middle",t)}))}useMouseButtonData(t,e){var i,r,s,n;if(0==e.mouse[t])this.past[t]=this[t],this.delta[t]=this[t]-this.past[t],-1==this.delta[t]?null===(i=this.onUp)||void 0===i||i.call(this,this):1==this.delta[t]&&(null===(r=this.onDown)||void 0===r||r.call(this,this));else for(;e.mouse[t]>0;)--e.mouse[t],++this.pastMouseData[t],this.past[t]=this[t],this[t]=this.pastMouseData[t]%2==0?0:1,this.delta[t]=this[t]-this.past[t],-1==this.delta[t]?null===(s=this.onUp)||void 0===s||s.call(this,this):1==this.delta[t]&&(null===(n=this.onDown)||void 0===n||n.call(this,this))}}},390:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.GraphicsStateStack=void 0;const r=i(358),s=i(671);class n{constructor(t){t?(this.matrix=[...t.matrix],this.color=[...t.color],this.lineWidth=t.lineWidth,this.lineCap=t.lineCap,this.lineJoin=t.lineJoin,this.font=t.font,this.texture=t.texture,this.textureColorBlend=t.textureColorBlend,this.rectOrigin=[...t.rectOrigin],this.rectUV=[...t.rectUV],this.textOrigin=[...t.textOrigin]):(this.matrix=r.matrix.new([4,4]),this.color=[.3,.3,.3,1],this.lineWidth=.1,this.lineCap="round",this.lineJoin="round",this.font=null,this.texture=null,this.textureColorBlend="*",this.rectOrigin=[0,0],this.rectUV=[0,0,1,1],this.textOrigin=[0,-1])}}e.GraphicsStateStack=class{constructor(){this.stateStack=[new n]}set color(t){(0,s.setColor)(this.current.color,t)}get color(){return this.current.color}set colorHex(t){(0,s.setColor)(this.current.color,r.vec.div(t,255))}get colorHex(){return r.vec.mult(this.current.color,255)}set colorAlpha(t){this.current.color[3]=t}get colorAlpha(){return this.current.color[3]}set lineWidth(t){this.current.lineWidth=t}get lineWidth(){return this.current.lineWidth}set lineCap(t){this.current.lineCap=t}get lineCap(){return this.current.lineCap}set lineJoin(t){this.current.lineJoin=t}get lineJoin(){return this.current.lineJoin}set font(t){this.current.font=t}get font(){return this.current.font}set textOrigin(t){this.current.textOrigin=t}get textOrigin(){return this.current.textOrigin}set texture(t){this.current.texture=t}get texture(){return this.current.texture}set textureColorBlend(t){this.current.textureColorBlend=t}get textureColorBlend(){return this.current.textureColorBlend}set rectUV(t){this.current.rectUV=t}get rectUV(){return this.current.rectUV}set rectOrigin(t){this.current.rectOrigin=t}get rectOrigin(){return this.current.rectOrigin}set matrix(t){this.current.matrix=t}get matrix(){return this.current.matrix}get inverseMatrix(){return r.matrix.invert4x4(this.current.matrix)}rotateX(t){const e=Math.cos(t),i=Math.sin(t);this.current.matrix=r.matrix.dot(this.current.matrix,4,[1,0,0,0,0,e,i,0,0,-i,e,0,0,0,0,1],4)}rotateY(t){const e=Math.cos(t),i=Math.sin(t);this.current.matrix=r.matrix.dot(this.current.matrix,4,[e,0,-i,0,0,1,0,0,i,0,e,0,0,0,0,1],4)}rotateZ(t){const e=Math.cos(t),i=Math.sin(t);this.current.matrix=r.matrix.dot(this.current.matrix,4,[e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1],4)}rotate(t,e){const i=Math.cos(t),s=Math.sin(t);if(e){const t=1-i,[n,a,o]=r.vec.normalize(e);this.current.matrix=r.matrix.dot(this.current.matrix,4,[t*n*n+i,t*n*a+o*s,t*n*o-a*s,0,t*n*a-o*s,t*a*a+i,t*a*o+n*s,0,t*n*o+a*s,t*a*o-n*s,t*o*o+i,0,0,0,0,1],4)}else this.current.matrix=r.matrix.dot(this.current.matrix,4,[i,-s,0,0,s,i,0,0,0,0,1,0,0,0,0,1],4)}scale(t,e,i){this.current.matrix=r.matrix.dot(this.current.matrix,4,[t,0,0,0,0,null!=e?e:t,0,0,0,0,null!=i?i:e?1:t,0,0,0,0,1],4)}translate(t,e,i=0){this.current.matrix=r.matrix.dot(this.current.matrix,4,[1,0,0,0,0,1,0,0,0,0,1,0,t,e,i,1],4)}scope(t){this.stateStack.push(new n(this.current)),t(),this.stateStack.pop()}get current(){return this.stateStack[this.stateStack.length-1]}reset(){this.stateStack=[new n]}}},273:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Canvas=void 0,e.Canvas=class{constructor(t){this.canvas=document.createElement("canvas"),this.canvas.style.width="100%",this.canvas.style.height="100%",this.container=t,this.container.appendChild(this.canvas);const e=this.canvas.getContext("webgl2");if(!e)throw Error("Can't create webgl2 context");this.gl=e}resize(){const t=this.canvas.offsetWidth,e=this.canvas.offsetHeight;return this.canvas.width==this.canvas.offsetWidth&&this.canvas.height==this.canvas.offsetHeight||(this.canvas.width=t,this.canvas.height=e,this.gl.viewport(0,0,t,e)),[t,e]}}},946:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Graphics=void 0;const r=i(315),s=i(273),n=i(553);class a extends s.Canvas{constructor(t){super(t),this.glTextures=[],this.glProgram=new n.GLProgram(this.gl,o[0],o[1]),this.glBuffer=new n.GLBuffer(this.gl),this.gl.enable(this.gl.BLEND),this.gl.blendFuncSeparate(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA,this.gl.ONE,this.gl.ONE);for(let t=0;t<8;++t)this.glProgram.setUniform(`sampler[${t}]`,t)}render(t){this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.glProgram.use(),this.glBuffer.update(t.buffer),this.glProgram.setUniform("screenSize",[this.canvas.width,this.canvas.height]),this.glProgram.setAttribs(["pos",3],["texCoord",2],["color",4],["texId",1]),this.gl.drawArrays(this.gl.TRIANGLES,0,t.verticesCount)}async loadTexture(t){const e=new n.GLTexture(this.gl,this.glTextures.length,t);return this.glTextures.push(e),await e.onLoad(),{slot:e.slot,size:e.size}}async loadFont(t,e){return Object.assign({atlas:await(0,r.loadFNT)(e)},await this.loadTexture(t))}}e.Graphics=a;const o=["#version 300 es\n\nin vec3 pos;\nin vec2 texCoord;\nin vec4 color;\nin float texId;\n\nout float pixelSize;\nout vec2 _texCoord;\nflat out int _texId;\nout vec4 _color;\nout float radius;\n\nuniform vec2 screenSize;\n\nvoid main() {\n\tpixelSize = 2. / min(screenSize.x, screenSize.y);\n\tvec2 ratio = screenSize.x < screenSize.y? vec2(1, screenSize.x / screenSize.y) : vec2(screenSize.y / screenSize.x, 1);\n\tvec2 halfScreenSize = screenSize / vec2(2);\n\tvec2 pixelPerfectTranslation = (halfScreenSize - ceil(halfScreenSize)) / vec2(min(halfScreenSize.x, halfScreenSize.y));\n\tgl_Position = vec4(pos.xy * ratio + pixelPerfectTranslation, 0, 1);\n\t_texId = int(texId);\n\t_color = color;\n\t_texCoord = texCoord;\n\tradius = abs(texCoord.x);\n}","#version 300 es\n\nprecision highp float;\n\nin float pixelSize;\nin float radius;\nin vec2 _texCoord;\nflat in int _texId;\nin vec4 _color;\n\nout vec4 color;\n\nuniform sampler2D sampler[8];\n\nvec4 getTextureColor() {\n\tswitch ((_texId & 0x1F000000)>> 24 ) {\n\t\tcase 0: return texture(sampler[0], _texCoord);\n\t\tcase 1: return texture(sampler[1], _texCoord);\n\t\tcase 2: return texture(sampler[2], _texCoord);\n\t\tcase 3: return texture(sampler[3], _texCoord);\n\t\tcase 4: return texture(sampler[4], _texCoord);\n\t\tcase 5: return texture(sampler[5], _texCoord);\n\t\tcase 6: return texture(sampler[6], _texCoord);\n\t\tcase 7: return texture(sampler[7], _texCoord);\n\t\tdefault: return vec4(1,1,1,1);\n\t}\n}\n\nvoid main() {\n\t\n\tswitch ((_texId >> 29) & 0x3) {\n\t\tcase 0:\n\t\t\tcolor = _color;\n\t\t\tbreak;\n\t\tcase 1:\n\t\t\tcolor = _color + getTextureColor();\n\t\t\tbreak;\n\t\tcase 2:\n\t\t\tcolor = _color * getTextureColor();\n\t\t\tbreak;\n\t\tcase 3:\n\t\t\tcolor = vec4(_color.rgb, _color.a * getTextureColor().r);\n\t\t\tbreak;\n\t}\n\tbool isRect = (_texId & 0x80000000)  == 0;\n\tif (isRect) return;\n\tcolor = vec4(_color.rgb, smoothstep(0., pixelSize, radius - length(_texCoord)) * clamp(_color.a, 0., 1.));\n}"]},482:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.PaperbitKeyboard=void 0,e.PaperbitKeyboard=class{constructor(t){this.keys=new Map,this.typed=""}updateKey(t){}pullData(){const t={keys:this.keys,typed:this.typed};return this.keys=new Map,this.typed="",t}}},738:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.PaperbitMouse=void 0,e.PaperbitMouse=class{constructor(t){this.pos=[0,0],this.left=0,this.right=0,this.middle=0,this.wheel=0,this.offsetLeft=0,this.offsetMiddle=0,this.offsetRight=0,this.canvas=t,document.addEventListener("mousedown",(t=>this.updateButtons(t))),document.addEventListener("mouseup",(t=>this.updateButtons(t))),document.addEventListener("mousemove",(t=>this.updateMouse(t))),this.canvas.onwheel=t=>this.updateWheel(t)}updateMouse(t){const e=Math.min(this.canvas.width,this.canvas.height);this.pos=[(2*(t.clientX-this.canvas.offsetLeft+window.scrollX)-this.canvas.width)/e,(this.canvas.height-2*(t.clientY-this.canvas.offsetTop+window.scrollY))/e],0==(1&t.buttons)!=(this.left%2==0)&&++this.left,0==(2&t.buttons)!=(this.right%2==0)&&++this.right,0==(4&t.buttons)!=(this.middle%2==0)&&++this.middle}updateButtons(t){0==(1&t.buttons)!=(this.left%2==0)&&0==t.button?this.left+=1:0==(4&t.buttons)!=(this.left%2==0)&&1==t.button?this.middle+=1:0==(2&t.buttons)!=(this.left%2==0)&&2==t.button&&(this.right+=1)}updateWheel(t){this.updateMouse(t),this.wheel=this.wheel+(t instanceof WheelEvent?t.deltaY/100:0)}pullData(){let t={pos:this.pos,wheel:this.wheel,left:this.left-this.offsetLeft,middle:this.middle-this.offsetMiddle,right:this.right-this.offsetRight};return this.offsetLeft=this.left,this.middle=this.middle,this.right=this.right,t}}},762:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.PaperbitCanvas=void 0;const r=i(946),s=i(482),n=i(738),a=i(594);e.PaperbitCanvas=class{constructor(t=document.body,e){this.paperbit=this,e?this.doFrame=e:this.api=new a.PaperbitAPI((t=>this.doFrame=t)),this.graphics=new r.Graphics(t),this.mouse=new n.PaperbitMouse(this.graphics.canvas),this.keyboard=new s.PaperbitKeyboard(this.graphics.canvas),setTimeout(this.draw.bind(this),0)}async draw(){this.graphics.render(await this.doFrame({canvasSize:this.graphics.resize(),mouse:this.mouse.pullData(),keyboard:this.keyboard.pullData()})),requestAnimationFrame(this.draw.bind(this))}}},553:function(t,e){var i,r,s,n,a,o,h=this&&this.__classPrivateFieldGet||function(t,e,i,r){if("a"===i&&!r)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===i?r:"a"===i?r.call(t):r?r.value:e.get(t)};function l(t){throw Error(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.GLTexture=e.GLBuffer=e.GLProgram=e.GLVao=void 0,e.GLVao=class{constructor(t){var e;this.gl=t,this.id=null!==(e=t.createVertexArray())&&void 0!==e?e:l("Can't create VAO")}use(){return this.gl.bindVertexArray(this.id),this}},e.GLProgram=class{constructor(t,e,n){var a,o,c;i.add(this),this.gl=t;const u=null!==(a=h(this,i,"m",r).call(this,this.gl.VERTEX_SHADER,e))&&void 0!==a?a:l("Can't create vertShader"),d=null!==(o=h(this,i,"m",r).call(this,this.gl.FRAGMENT_SHADER,n))&&void 0!==o?o:l("Can't create fragShader");this.id=null!==(c=h(this,i,"m",s).call(this,u,d))&&void 0!==c?c:l("Can't create Program"),this.gl.deleteShader(u),this.gl.deleteShader(d)}delete(){this.gl.deleteProgram(this.id)}getUniformLoc(t){return t instanceof WebGLUniformLocation?t:this.gl.getUniformLocation(this.id,t)}getAttribLoc(t){return"number"==typeof t?t:this.gl.getAttribLocation(this.id,t)}use(t){this.gl.useProgram(this.id),t&&h(this,i,"m",n).call(this,t)}setUniform(t,e){var i;this.gl.useProgram(this.id),t=null!==(i=this.getUniformLoc(t))&&void 0!==i?i:l(`Invalid uniform name: '${t}'`),"number"==typeof e?this.gl.uniform1i(t,e):1==e.length?this.gl.uniform1f(t,...e):2==e.length?this.gl.uniform2f(t,...e):3==e.length?this.gl.uniform3f(t,...e):4==e.length&&this.gl.uniform4f(t,...e)}setMatAttrib(t,e,i=null,r=0){var s;i||(i=e*e),t=null!==(s=this.getAttribLoc(t))&&void 0!==s?s:l(`Invalid attribute name: '${t}'`);for(let s=0;s<e;++s){const n=t+s;this.gl.enableVertexAttribArray(n),this.gl.vertexAttribPointer(n,e,this.gl.FLOAT,!1,4*i,4*(r+e*s))}return{divisor:()=>{for(let i=0;i<e;++i)this.gl.vertexAttribDivisor(t+i,1)}}}setAttribs(...t){if(t.length%2!=0)throw`Invalid attributes: ${t}`;let e=0;for(let i=0;i<t.length;++i)e+=t[i][1];for(let i=0,r=0;i<t.length;++i)this.setVecAttrib(t[i][0],t[i][1],e,r,t[i][2]),r+=t[i][1]}setVecAttrib(t,e,i=null,r=0,s="f"){i||(i=e);let n=this.getAttribLoc(t);return-1==n?console.warn(n==t?`[setVecAttrib] location: ${t}`:`[setVecAttrib] location: "${t}" doesn't exist`):(this.gl.enableVertexAttribArray(n),"f"==s?this.gl.vertexAttribPointer(n,e,"f"===s?this.gl.FLOAT:this.gl.INT,!1,4*i,4*r):this.gl.vertexAttribIPointer(n,e,this.gl.INT,4*i,4*r),{divisor:()=>this.gl.vertexAttribDivisor(n,1)})}},i=new WeakSet,r=function(t,e){var i;let r;t==this.gl.VERTEX_SHADER?r="vertex":t==this.gl.FRAGMENT_SHADER&&(r="fragment");const s=null!==(i=this.gl.createShader(t))&&void 0!==i?i:l(`Can't create ${r} shader`);if(this.gl.shaderSource(s,e),this.gl.compileShader(s),this.gl.getShaderParameter(s,this.gl.COMPILE_STATUS))return s;if(!r)throw Error("> [ERROR] shader type is unknown");console.error(`> Error compiling ${r} shader:\n${this.gl.getShaderInfoLog(s)}`),this.gl.deleteShader(s)},s=function(t,e){var i;const r=null!==(i=this.gl.createProgram())&&void 0!==i?i:l("Can't create shader program");if(this.gl.attachShader(r,t),this.gl.attachShader(r,e),this.gl.linkProgram(r),this.gl.getProgramParameter(r,this.gl.LINK_STATUS))return r;console.error(this.gl.getProgramInfoLog(r)),this.gl.deleteProgram(r)},n=function(t){var e;for(const[i,r]of t)this.setUniform(null!==(e=this.getUniformLoc(i))&&void 0!==e?e:l(`Invalid uniform name: '${i}'`),r)},e.GLBuffer=class{constructor(t,e=!0){var i;a.add(this),this.glReservedSize=0,this.size=0,this.gl=t,this.dynamic=e,this.id=null!==(i=t.createBuffer())&&void 0!==i?i:l("Can't create buffer")}bind(){this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.id)}update(t,e){this.size=e||t.byteLength/Float32Array.BYTES_PER_ELEMENT,this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.id),this.glReservedSize<this.size?h(this,a,"m",o).call(this,t):this.gl.bufferSubData(this.gl.ARRAY_BUFFER,0,new Float32Array(t,0,this.size))}},a=new WeakSet,o=function(t){this.glReservedSize=t.byteLength/Float32Array.BYTES_PER_ELEMENT,this.gl.bufferData(this.gl.ARRAY_BUFFER,new Uint8Array(t),this.dynamic?this.gl.DYNAMIC_DRAW:this.gl.STATIC_DRAW)},e.GLTexture=class extends class{constructor(t={}){this.mipmap=!0,this.minFilter="linear",this.magFilter="linear",this.wrapX="clamp",this.wrapY="clamp",t.mipmap&&(this.mipmap=t.mipmap),t.minFilter&&(this.minFilter=t.minFilter),t.magFilter&&(this.magFilter=t.magFilter),t.wrapX&&(this.wrapX=t.wrapX),t.wrapY&&(this.wrapY=t.wrapY)}setConfig(){this.mipmap&&this.gl.generateMipmap(this.gl.TEXTURE_2D),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.glWrap(this.wrapX)),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.glWrap(this.wrapY)),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.glMinFilter(this.minFilter)),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.glMagFilter(this.magFilter))}glWrap(t){return"clamp"===t?this.gl.CLAMP_TO_EDGE:"repeat"===t?this.gl.REPEAT:this.gl.MIRRORED_REPEAT}glMinFilter(t){return this.mipmap?"linear"===t?this.gl.LINEAR_MIPMAP_LINEAR:this.gl.NEAREST_MIPMAP_NEAREST:this.glMagFilter(t)}glMagFilter(t){return"linear"===t?this.gl.LINEAR:this.gl.NEAREST}}{constructor(t,e=0,i,r={}){var s;super(r),this.size=[0,0],this.gl=t,this.slot=e,this.id=null!==(s=t.createTexture())&&void 0!==s?s:l("Can't create texture"),this.use(),this.setDefaultImage(),this.loadPromise=new Promise((e=>{if(!i)return e();const r=new Image;r.onload=()=>{this.size=[r.width,r.height],this.use(),t.texImage2D(t.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,r),this.setConfig(),e()},r.src=i}))}async onLoad(t){await this.loadPromise,null==t||t(this)}use(){this.gl.activeTexture(this.gl.TEXTURE0+this.slot),this.gl.bindTexture(this.gl.TEXTURE_2D,this.id)}setDefaultImage(){const t=new Uint8Array([0,0,255,255,255,0,255,255,0,0,255,255,255,0,255,255,0,0,255,255,255,0,255,255,0,0,255,255,255,0,255,255,0,0,255,255]);this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,3,3,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,t)}}},315:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.loadFNT=void 0,e.loadFNT=async function(t){var e,i;const r=await(await fetch(t)).text();let s={};for(const t of r.split("\n")){const e=t.trim().replace(/\s+(?=([^"]*"[^"]*")*[^"]*$)/g,"'").split(/'+/);if(e.length>0){const t={};for(const i of e.slice(1,e.length)){const[e,r]=i.split("=");r.startsWith('"')&&r.endsWith('"')?t[e]=r.replace(/["]/,""):Number.isNaN(Number(r))?t[e]=r.split(",").map((t=>Number(t))):t[e]=Number(r)}s[e[0]]?s[e[0]]=Array.isArray(s[e[0]])?[...s[e[0]],t]:[s[e[0]],t]:s[e[0]]=t}}const n=1/s.common.lineHeight,a={map:new Map};for(const t of s.char)a.map.set(String.fromCharCode(t.id),{a:[t.x/s.common.scaleW,t.y/s.common.scaleH],b:[(t.x+t.width)/s.common.scaleW,(t.y+t.height)/s.common.scaleH],offset:[t.xoffset*n,t.yoffset*n],advance:t.xadvance*n,kerning:new Map,height:t.height*n});for(const t of s.kerning){const r=String.fromCharCode(t.first),s=String.fromCharCode(t.second);null===(e=a.map.get(r))||void 0===e||e.kerning.set(s,t.amount*n),null===(i=a.map.get(s))||void 0===i||i.kerning.set(r,t.amount*n)}return a}},277:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.geometry=void 0;const r=i(989);class s{constructor(t){this.coord=t}distanceTo(t){if(t instanceof s)return r.vec.dist(this.coord,t.coord);if(t instanceof n)return console.log("TODO: distance point-segment"),0;if(t instanceof a){let e=0,i=Math.min(Math.abs(this.coord[0]-t.a[0]),Math.abs(this.coord[0]-t.b[0])),r=Math.min(Math.abs(this.coord[1]-t.a[1]),Math.abs(this.coord[1]-t.b[1])),s=i,n=r;this.coord[1]<t.a[1]||this.coord[1]>t.b[1]?s=Math.hypot(i,r):e++,this.coord[0]<t.a[0]||this.coord[0]>t.b[0]?n=Math.hypot(i,r):e++;const a=Math.min(s,n);return 2==e?-a:a}}}class n{constructor(t,e){this.a=t,this.b=e}distanceTo(t){return t.distanceTo(this)}}class a{constructor(t,e){e=r.vec.mult(e,.5),this.a=r.vec.sub(t,e),this.b=r.vec.add(t,e)}distanceTo(t){return t.distanceTo(this)}}e.geometry={point:t=>new s(t),segment:(t,e)=>new n(t,e),rect:(t,e)=>new a(t,e)}},989:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.geometry=e.SmoothBit=e.PaperbitCanvas=e.matrix=e.vec=void 0;var r=i(358);Object.defineProperty(e,"vec",{enumerable:!0,get:function(){return r.vec}}),Object.defineProperty(e,"matrix",{enumerable:!0,get:function(){return r.matrix}});var s=i(762);Object.defineProperty(e,"PaperbitCanvas",{enumerable:!0,get:function(){return s.PaperbitCanvas}});var n=i(212);Object.defineProperty(e,"SmoothBit",{enumerable:!0,get:function(){return n.SmoothBit}});var a=i(277);Object.defineProperty(e,"geometry",{enumerable:!0,get:function(){return a.geometry}})},212:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.SmoothBit=void 0,e.SmoothBit=class{constructor(t=0,e=1,i=1/4){this.t0=0,this.target=!1,this.duration=i,this.zero=t,this.one=e,this.t0=this.currenTime}set(t){if(this.target!=t){this.target=t;const e=(this.currenTime-this.t0)/this.duration;this.t0=e>1?this.currenTime:this.currenTime-(1-e)}return this}get(t,e){null!=t||(t=this.zero),null!=e||(e=this.one);const i=(this.currenTime-this.t0)/this.duration;if(i>=1)return this.target?this.one:this.zero;let r=function(t){return-(Math.cos(Math.PI*t)-1)/2}(i);return this.target||(r=1-r),r=t+r*(e-t),r}get currenTime(){return performance.now()/1e3}}},358:(t,e)=>{function i(...t){let e=null;for(let i=0;i<t.length;++i){const r=t[i];if("number"!=typeof r)if(e){if(e!=r.length)throw Error("Invalid arguments")}else e=r.length}return null!=e?e:t.length>0?1:0}Object.defineProperty(e,"__esModule",{value:!0}),e.matrix=e.vec=void 0,e.vec=new class{new(t,e=0){const i=Array("number"==typeof t?t:t.length);if("number"==typeof e)return i.fill(e);for(let t=0;t<i.length;++t)i[t]=e(t);return i}equal(t,e,i=1e-9){if(t.length!=e.length)return!1;for(let r=0;r<t.length;++r)if(Math.abs(t[r]-e[r])>i)return!1;return!0}add(t,...e){const r=i(t,...e);return this.new(r,(i=>{var r;return e.reduce(((t,e)=>{var r;return t+(null!==(r=null==e?void 0:e[i])&&void 0!==r?r:e)}),null!==(r=null==t?void 0:t[i])&&void 0!==r?r:t)}))}sub(t,...e){const r=i(t,...e);return this.new(r,(i=>{var r;return e.reduce(((t,e)=>{var r;return t-(null!==(r=null==e?void 0:e[i])&&void 0!==r?r:e)}),null!==(r=null==t?void 0:t[i])&&void 0!==r?r:t)}))}mult(t,...e){const r=i(t,...e);return this.new(r,(i=>{var r;return e.reduce(((t,e)=>{var r;return t*(null!==(r=null==e?void 0:e[i])&&void 0!==r?r:e)}),null!==(r=null==t?void 0:t[i])&&void 0!==r?r:t)}))}div(t,...e){const r=i(t,...e);return this.new(r,(i=>{var r;return e.reduce(((t,e)=>{var r;return t/(null!==(r=null==e?void 0:e[i])&&void 0!==r?r:e)}),null!==(r=null==t?void 0:t[i])&&void 0!==r?r:t)}))}round(t){return this.new(t,(e=>Math.round(t[e])))}floor(t){return this.new(t,(e=>Math.floor(t[e])))}ceil(t){return this.new(t,(e=>Math.ceil(t[e])))}dist(t,i){if(t.length!=i.length)throw Error("Invalid arguments");return e.vec.length(e.vec.sub(t,i))}dot(t,e){if(t.length!=e.length)throw Error("Invalid arguments");return t.reduce(((t,i,r)=>t+i*e[r]),0)}length(t){return Math.hypot(...t)}resize(t,e){const i=this.length(t)/e;return this.new(t,(e=>t[e]/i))}normalize(t){const e=this.length(t);return this.new(t,(i=>t[i]/e))}},e.matrix=new class{new([t,e],i=1){const r=Array(t*e);if("number"==typeof i)for(let s=0;s<t;++s)for(let t=0;t<e;++t)r[t+s*e]=s==t?i:0;else for(let s=0;s<t;++s)for(let t=0;t<e;++t)r[t+s*e]=i([s,t]);return r}add(t,i){return t.length==i.length&&Array.isArray(t)&&Array.isArray(i)?e.vec.new(t.length,(e=>t[e]+i[e])):NaN}sub(t,i){return t.length==i.length&&Array.isArray(t)&&Array.isArray(i)?e.vec.new(t.length,(e=>t[e]-i[e])):NaN}mult(t,i){return t.length==i.length&&Array.isArray(t)&&Array.isArray(i)?e.vec.new(t.length,(e=>t[e]*i[e])):NaN}div(t,i){return t.length==i.length&&Array.isArray(t)&&Array.isArray(i)?e.vec.new(t.length,(e=>t[e]/i[e])):NaN}dot(t,e,i,r=1){if(!Array.isArray(t)||!Array.isArray(i)||!Number.isSafeInteger(e)||!Number.isSafeInteger(r)||e<0||r<0)return NaN;const s=t.length/e,n=i.length/r;return e<n?NaN:this.new([r,s],(([r,a])=>{let o=0;for(let h=0;h<e;++h)o+=t[a+h*s]*(h<n?i[h+r*n]:1);return o}))}invert4x4(t){const e=t[10]*t[15]-t[11]*t[14],i=t[9]*t[15]-t[11]*t[13],r=t[9]*t[14]-t[10]*t[13],s=t[8]*t[15]-t[11]*t[12],n=t[8]*t[14]-t[10]*t[12],a=t[8]*t[13]-t[9]*t[12],o=t[6]*t[15]-t[7]*t[14],h=t[5]*t[15]-t[7]*t[13],l=t[5]*t[14]-t[6]*t[13],c=t[6]*t[11]-t[7]*t[10],u=t[5]*t[11]-t[7]*t[9],d=t[5]*t[10]-t[6]*t[9],g=t[4]*t[15]-t[7]*t[12],f=t[4]*t[14]-t[6]*t[12],m=t[4]*t[11]-t[7]*t[8],p=t[4]*t[10]-t[6]*t[8],v=t[4]*t[13]-t[5]*t[12],x=t[4]*t[9]-t[5]*t[8];let b=t[0]*(t[5]*e-t[6]*i+t[7]*r)-t[1]*(t[4]*e-t[6]*s+t[7]*n)+t[2]*(t[4]*i-t[5]*s+t[7]*a)-t[3]*(t[4]*r-t[5]*n+t[6]*a);return b=1/b,[b*(t[5]*e-t[6]*i+t[7]*r),b*-(t[1]*e-t[2]*i+t[3]*r),b*(t[1]*o-t[2]*h+t[3]*l),b*-(t[1]*c-t[2]*u+t[3]*d),b*-(t[4]*e-t[6]*s+t[7]*n),b*(t[0]*e-t[2]*s+t[3]*n),b*-(t[0]*o-t[2]*g+t[3]*f),b*(t[0]*c-t[2]*m+t[3]*p),b*(t[4]*i-t[5]*s+t[7]*a),b*-(t[0]*i-t[1]*s+t[3]*a),b*(t[0]*h-t[1]*g+t[3]*v),b*-(t[0]*u-t[1]*m+t[3]*x),b*-(t[4]*r-t[5]*n+t[6]*a),b*(t[0]*r-t[1]*n+t[2]*a),b*-(t[0]*l-t[1]*f+t[2]*v),b*(t[0]*d-t[1]*p+t[2]*x)]}}}},e={};return function i(r){var s=e[r];if(void 0!==s)return s.exports;var n=e[r]={exports:{}};return t[r].call(n.exports,n,n.exports,i),n.exports}(989)})()}));