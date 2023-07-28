!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("@blueprintjs/core"),require("classnames"),require("react"),require("react-popper"),require("ciblage-commercial/src/js/blueprintjs/tslib")):"function"==typeof define&&define.amd?define(["@blueprintjs/core","classnames","react","react-popper","ciblage-commercial/src/js/blueprintjs/tslib"],t):"object"==typeof exports?exports.Blueprint=t(require("@blueprintjs/core"),require("classnames"),require("react"),require("react-popper"),require("ciblage-commercial/src/js/blueprintjs/tslib")):(e.Blueprint=e.Blueprint||{},e.Blueprint.Popover2=t(e.Blueprint.Core,e.classNames,e.React,e.ReactPopper,e.window))}(self,(function(e,t,n,r,o){return function(){"use strict";var i={762:function(t){t.exports=e},905:function(e){e.exports=t},359:function(e){e.exports=n},635:function(e){e.exports=r},532:function(e){e.exports=o}},s={};function a(e){var t=s[e];if(void 0!==t)return t.exports;var n=s[e]={exports:{}};return i[e](n,n.exports,a),n.exports}a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,{a:t}),t},a.d=function(e,t){for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var c={};return function(){a.r(c),a.d(c,{Classes:function(){return e},ContextMenu2:function(){return je},ContextMenu2ChildrenProps:function(){return i.ContextMenu2ChildrenProps},ContextMenu2ContentProps:function(){return i.ContextMenu2ContentProps},ContextMenu2Props:function(){return i.ContextMenu2Props},ContextMenu2RenderProps:function(){return i.ContextMenu2RenderProps},Errors:function(){return t},IPopover2Props:function(){return o.IPopover2Props},IPopover2SharedProps:function(){return s.IPopover2SharedProps},IPopover2TargetProps:function(){return s.IPopover2TargetProps},ITooltip2Props:function(){return r.ITooltip2Props},Placement:function(){return u.Placement},PlacementOptions:function(){return Ze},Popover2:function(){return qe},Popover2InteractionKind:function(){return Xe},Popover2Props:function(){return o.Popover2Props},Popover2SharedProps:function(){return s.Popover2SharedProps},Popover2TargetProps:function(){return s.Popover2TargetProps},PopperBoundary:function(){return u.Boundary},PopupKind:function(){return Qe},ResizeSensor2:function(){return Ke},ResizeSensor2Props:function(){return n.ResizeSensor2Props},StrictModifierNames:function(){return s.StrictModifierNames},Tooltip2:function(){return We},Tooltip2Props:function(){return r.Tooltip2Props}});var e={};a.r(e),a.d(e,{CONTEXT_MENU2:function(){return d},CONTEXT_MENU2_BACKDROP:function(){return h},CONTEXT_MENU2_POPOVER2:function(){return v},CONTEXT_MENU2_VIRTUAL_TARGET:function(){return f},POPOVER2:function(){return E},POPOVER2_ARROW:function(){return g},POPOVER2_BACKDROP:function(){return m},POPOVER2_CAPTURING_DISMISS:function(){return P},POPOVER2_CONTENT:function(){return O},POPOVER2_CONTENT_PLACEMENT:function(){return T},POPOVER2_CONTENT_SIZING:function(){return b},POPOVER2_DISMISS:function(){return _},POPOVER2_DISMISS_OVERRIDE:function(){return R},POPOVER2_MATCH_TARGET_WIDTH:function(){return C},POPOVER2_OPEN:function(){return y},POPOVER2_POPPER_ESCAPED:function(){return S},POPOVER2_REFERENCE_HIDDEN:function(){return I},POPOVER2_TARGET:function(){return N},POPOVER2_TRANSITION_CONTAINER:function(){return w},TOOLTIP2:function(){return x},TOOLTIP2_INDICATOR:function(){return D}});var t={};a.r(t),a.d(t,{POPOVER2_HAS_BACKDROP_INTERACTION:function(){return B},POPOVER2_REQUIRES_TARGET:function(){return A},POPOVER2_WARN_DOUBLE_TARGET:function(){return k},POPOVER2_WARN_EMPTY_CONTENT:function(){return V},POPOVER2_WARN_HAS_BACKDROP_INLINE:function(){return z},POPOVER2_WARN_PLACEMENT_AND_POSITION_MUTEX:function(){return F},POPOVER2_WARN_TOO_MANY_CHILDREN:function(){return L},POPOVER2_WARN_UNCONTROLLED_ONINTERACTION:function(){return K}});var n={};a.r(n),a.d(n,{q:function(){return Ke}});var r={};a.r(r),a.d(r,{u:function(){return We}});var o={};a.r(o),a.d(o,{p:function(){return qe},k:function(){return Xe}});var i={};a.r(i),a.d(i,{F:function(){return je}});var s={};a.r(s);var u={};a.r(u);var p=a(762),l=p.Classes.getClassNamespace(),d="".concat(l,"-context-menu2"),f="".concat(d,"-virtual-target"),v="".concat(d,"-popover2"),h="".concat(d,"-backdrop"),E="".concat(l,"-popover2"),g="".concat(E,"-arrow"),m="".concat(E,"-backdrop"),P="".concat(E,"-capturing-dismiss"),O="".concat(E,"-content"),T="".concat(E,"-placement"),b="".concat(O,"-sizing"),_="".concat(E,"-dismiss"),R="".concat(_,"-override"),C="".concat(E,"-match-target-width"),y="".concat(E,"-open"),S="".concat(E,"-popper-escaped"),I="".concat(E,"-reference-hidden"),N="".concat(E,"-target"),w="".concat(E,"-transition-container"),x="".concat(l,"-tooltip2"),D="".concat(x,"-indicator"),M="[Blueprint]",A="".concat(M," <Popover2> requires renderTarget prop or a child element."),B="".concat(M,' <Popover2 hasBackdrop={true}> requires interactionKind="click".'),L="".concat(M," <Popover2> supports only one child which is rendered as its target; additional children are ignored."),k=M+" <Popover2> with children ignores renderTarget prop; use either prop or children.",V=M+" Disabling <Popover2> with empty/whitespace content...",z=M+" <Popover2 usePortal={false}> ignores hasBackdrop",F=M+" <Popover2> supports either placement or position prop, not both.",K=M+" <Popover2> onInteraction is ignored when uncontrolled.",H=a(532),U=a(905),G=a.n(U),W=a(359),X=a(635),q={enabled:!0,name:"matchReferenceWidth",phase:"beforeWrite",requires:["computeStyles"],fn:function(e){var t=e.state;t.styles.popper.width="".concat(t.rects.reference.width,"px")},effect:function(e){var t=e.state,n=t.elements.reference.getBoundingClientRect().width;t.elements.popper.style.width="".concat(n,"px")}};function Y(e){return e.split("-")[0]}function j(e){return-1!==["left","right"].indexOf(e)}function J(e){switch(e){case"top":return"bottom";case"left":return"right";case"bottom":return"top";default:return"left"}}function Q(e){switch(e.split("-")[1]){case"start":return"left";case"end":return"right";default:return"center"}}function Z(e,t){var n=Y(e);return void 0===t?j(n)?"".concat(J(n)," ").concat(Q(n)):"".concat(Q(n)," ").concat(J(n)):j(n)?"".concat(J(n)," ").concat(parseInt(t.top,10)+15,"px"):"".concat(parseInt(t.left,10)+15,"px ").concat(J(n))}function $(e){if(null==e)return 0;switch(Y(e)){case"top":return-90;case"left":return 180;case"bottom":return 90;default:return 0}}function ee(e){switch(Y(e)){case"top":return{bottom:-11};case"left":return{right:-11};case"bottom":return{top:-11};default:return{left:-11}}}var te=function(e){var t=e.arrowProps,n=t.ref,r=t.style,o=e.placement;return W.createElement("div",{"aria-hidden":!0,className:g,"data-popper-arrow":!0,ref:n,style:(0,H.__assign)((0,H.__assign)({},r),ee(o))},W.createElement("svg",{viewBox:"0 0 ".concat(30," ").concat(30),style:{transform:"rotate(".concat($(o),"deg)")}},W.createElement("path",{className:g+"-border",d:"M8.11 6.302c1.015-.936 1.887-2.922 1.887-4.297v26c0-1.378-.868-3.357-1.888-4.297L.925 17.09c-1.237-1.14-1.233-3.034 0-4.17L8.11 6.302z"}),W.createElement("path",{className:g+"-fill",d:"M8.787 7.036c1.22-1.125 2.21-3.376 2.21-5.03V0v30-2.005c0-1.654-.983-3.9-2.21-5.03l-7.183-6.616c-.81-.746-.802-1.96 0-2.7l7.183-6.614z"})))};function ne(e){switch(e){case p.PopoverPosition.TOP_LEFT:return"top-start";case p.PopoverPosition.TOP:return"top";case p.PopoverPosition.TOP_RIGHT:return"top-end";case p.PopoverPosition.RIGHT_TOP:return"right-start";case p.PopoverPosition.RIGHT:return"right";case p.PopoverPosition.RIGHT_BOTTOM:return"right-end";case p.PopoverPosition.BOTTOM_RIGHT:return"bottom-end";case p.PopoverPosition.BOTTOM:return"bottom";case p.PopoverPosition.BOTTOM_LEFT:return"bottom-start";case p.PopoverPosition.LEFT_BOTTOM:return"left-end";case p.PopoverPosition.LEFT:return"left";case p.PopoverPosition.LEFT_TOP:return"left-start";case"auto":case"auto-start":case"auto-end":return e;default:return function(e){throw new Error("Unexpected position: "+e)}(e)}}te.displayName="".concat(p.DISPLAYNAME_PREFIX,".Popover2Arrow");var re,oe=[],ie="ResizeObserver loop completed with undelivered notifications.";!function(e){e.BORDER_BOX="border-box",e.CONTENT_BOX="content-box",e.DEVICE_PIXEL_CONTENT_BOX="device-pixel-content-box"}(re||(re={}));var se,ae=function(e){return Object.freeze(e)},ce=function(e,t){this.inlineSize=e,this.blockSize=t,ae(this)},ue=function(){function e(e,t,n,r){return this.x=e,this.y=t,this.width=n,this.height=r,this.top=this.y,this.left=this.x,this.bottom=this.top+this.height,this.right=this.left+this.width,ae(this)}return e.prototype.toJSON=function(){var e=this;return{x:e.x,y:e.y,top:e.top,right:e.right,bottom:e.bottom,left:e.left,width:e.width,height:e.height}},e.fromRect=function(t){return new e(t.x,t.y,t.width,t.height)},e}(),pe=function(e){return e instanceof SVGElement&&"getBBox"in e},le=function(e){if(pe(e)){var t=e.getBBox(),n=t.width,r=t.height;return!n&&!r}var o=e,i=o.offsetWidth,s=o.offsetHeight;return!(i||s||e.getClientRects().length)},de=function(e){var t,n;if(e instanceof Element)return!0;var r=null===(n=null===(t=e)||void 0===t?void 0:t.ownerDocument)||void 0===n?void 0:n.defaultView;return!!(r&&e instanceof r.Element)},fe="undefined"!=typeof window?window:{},ve=new WeakMap,he=/auto|scroll/,Ee=/^tb|vertical/,ge=/msie|trident/i.test(fe.navigator&&fe.navigator.userAgent),me=function(e){return parseFloat(e||"0")},Pe=function(e,t,n){return void 0===e&&(e=0),void 0===t&&(t=0),void 0===n&&(n=!1),new ce((n?t:e)||0,(n?e:t)||0)},Oe=ae({devicePixelContentBoxSize:Pe(),borderBoxSize:Pe(),contentBoxSize:Pe(),contentRect:new ue(0,0,0,0)}),Te=function(e,t){if(void 0===t&&(t=!1),ve.has(e)&&!t)return ve.get(e);if(le(e))return ve.set(e,Oe),Oe;var n=getComputedStyle(e),r=pe(e)&&e.ownerSVGElement&&e.getBBox(),o=!ge&&"border-box"===n.boxSizing,i=Ee.test(n.writingMode||""),s=!r&&he.test(n.overflowY||""),a=!r&&he.test(n.overflowX||""),c=r?0:me(n.paddingTop),u=r?0:me(n.paddingRight),p=r?0:me(n.paddingBottom),l=r?0:me(n.paddingLeft),d=r?0:me(n.borderTopWidth),f=r?0:me(n.borderRightWidth),v=r?0:me(n.borderBottomWidth),h=l+u,E=c+p,g=(r?0:me(n.borderLeftWidth))+f,m=d+v,P=a?e.offsetHeight-m-e.clientHeight:0,O=s?e.offsetWidth-g-e.clientWidth:0,T=o?h+g:0,b=o?E+m:0,_=r?r.width:me(n.width)-T-O,R=r?r.height:me(n.height)-b-P,C=_+h+O+g,y=R+E+P+m,S=ae({devicePixelContentBoxSize:Pe(Math.round(_*devicePixelRatio),Math.round(R*devicePixelRatio),i),borderBoxSize:Pe(C,y,i),contentBoxSize:Pe(_,R,i),contentRect:new ue(l,c,_,R)});return ve.set(e,S),S},be=function(e,t,n){var r=Te(e,n),o=r.borderBoxSize,i=r.contentBoxSize,s=r.devicePixelContentBoxSize;switch(t){case re.DEVICE_PIXEL_CONTENT_BOX:return s;case re.BORDER_BOX:return o;default:return i}},_e=function(e){var t=Te(e);this.target=e,this.contentRect=t.contentRect,this.borderBoxSize=ae([t.borderBoxSize]),this.contentBoxSize=ae([t.contentBoxSize]),this.devicePixelContentBoxSize=ae([t.devicePixelContentBoxSize])},Re=function(e){if(le(e))return 1/0;for(var t=0,n=e.parentNode;n;)t+=1,n=n.parentNode;return t},Ce=function(){var e=1/0,t=[];oe.forEach((function(n){if(0!==n.activeTargets.length){var r=[];n.activeTargets.forEach((function(t){var n=new _e(t.target),o=Re(t.target);r.push(n),t.lastReportedSize=be(t.target,t.observedBox),o<e&&(e=o)})),t.push((function(){n.callback.call(n.observer,r,n.observer)})),n.activeTargets.splice(0,n.activeTargets.length)}}));for(var n=0,r=t;n<r.length;n++)(0,r[n])();return e},ye=function(e){oe.forEach((function(t){t.activeTargets.splice(0,t.activeTargets.length),t.skippedTargets.splice(0,t.skippedTargets.length),t.observationTargets.forEach((function(n){n.isActive()&&(Re(n.target)>e?t.activeTargets.push(n):t.skippedTargets.push(n))}))}))},Se=[],Ie=0,Ne={attributes:!0,characterData:!0,childList:!0,subtree:!0},we=["resize","load","transitionend","animationend","animationstart","animationiteration","keyup","keydown","mouseup","mousedown","mouseover","mouseout","blur","focus"],xe=function(e){return void 0===e&&(e=0),Date.now()+e},De=!1,Me=new(function(){function e(){var e=this;this.stopped=!0,this.listener=function(){return e.schedule()}}return e.prototype.run=function(e){var t=this;if(void 0===e&&(e=250),!De){De=!0;var n,r=xe(e);n=function(){var n=!1;try{n=function(){var e,t=0;for(ye(t);oe.some((function(e){return e.activeTargets.length>0}));)t=Ce(),ye(t);return oe.some((function(e){return e.skippedTargets.length>0}))&&("function"==typeof ErrorEvent?e=new ErrorEvent("error",{message:ie}):((e=document.createEvent("Event")).initEvent("error",!1,!1),e.message=ie),window.dispatchEvent(e)),t>0}()}finally{if(De=!1,e=r-xe(),!Ie)return;n?t.run(1e3):e>0?t.run(e):t.start()}},function(e){if(!se){var t=0,n=document.createTextNode("");new MutationObserver((function(){return Se.splice(0).forEach((function(e){return e()}))})).observe(n,{characterData:!0}),se=function(){n.textContent=""+(t?t--:t++)}}Se.push(e),se()}((function(){requestAnimationFrame(n)}))}},e.prototype.schedule=function(){this.stop(),this.run()},e.prototype.observe=function(){var e=this,t=function(){return e.observer&&e.observer.observe(document.body,Ne)};document.body?t():fe.addEventListener("DOMContentLoaded",t)},e.prototype.start=function(){var e=this;this.stopped&&(this.stopped=!1,this.observer=new MutationObserver(this.listener),this.observe(),we.forEach((function(t){return fe.addEventListener(t,e.listener,!0)})))},e.prototype.stop=function(){var e=this;this.stopped||(this.observer&&this.observer.disconnect(),we.forEach((function(t){return fe.removeEventListener(t,e.listener,!0)})),this.stopped=!0)},e}()),Ae=function(e){!Ie&&e>0&&Me.start(),!(Ie+=e)&&Me.stop()},Be=function(){function e(e,t){this.target=e,this.observedBox=t||re.CONTENT_BOX,this.lastReportedSize={inlineSize:0,blockSize:0}}return e.prototype.isActive=function(){var e,t=be(this.target,this.observedBox,!0);return e=this.target,pe(e)||function(e){switch(e.tagName){case"INPUT":if("image"!==e.type)break;case"VIDEO":case"AUDIO":case"EMBED":case"OBJECT":case"CANVAS":case"IFRAME":case"IMG":return!0}return!1}(e)||"inline"!==getComputedStyle(e).display||(this.lastReportedSize=t),this.lastReportedSize.inlineSize!==t.inlineSize||this.lastReportedSize.blockSize!==t.blockSize},e}(),Le=function(e,t){this.activeTargets=[],this.skippedTargets=[],this.observationTargets=[],this.observer=e,this.callback=t},ke=new WeakMap,Ve=function(e,t){for(var n=0;n<e.length;n+=1)if(e[n].target===t)return n;return-1},ze=function(){function e(){}return e.connect=function(e,t){var n=new Le(e,t);ke.set(e,n)},e.observe=function(e,t,n){var r=ke.get(e),o=0===r.observationTargets.length;Ve(r.observationTargets,t)<0&&(o&&oe.push(r),r.observationTargets.push(new Be(t,n&&n.box)),Ae(1),Me.schedule())},e.unobserve=function(e,t){var n=ke.get(e),r=Ve(n.observationTargets,t),o=1===n.observationTargets.length;r>=0&&(o&&oe.splice(oe.indexOf(n),1),n.observationTargets.splice(r,1),Ae(-1))},e.disconnect=function(e){var t=this,n=ke.get(e);n.observationTargets.slice().forEach((function(n){return t.unobserve(e,n.target)})),n.activeTargets.splice(0,n.activeTargets.length)},e}(),Fe=function(){function e(e){if(0===arguments.length)throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");if("function"!=typeof e)throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");ze.connect(this,e)}return e.prototype.observe=function(e,t){if(0===arguments.length)throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");if(!de(e))throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");ze.observe(this,e,t)},e.prototype.unobserve=function(e){if(0===arguments.length)throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");if(!de(e))throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");ze.unobserve(this,e)},e.prototype.disconnect=function(){ze.disconnect(this)},e.toString=function(){return"function ResizeObserver () { [polyfill code] }"},e}(),Ke=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.targetRef=W.createRef(),t.prevElement=void 0,t.observer=new Fe((function(e){var n,r;return null===(r=(n=t.props).onResize)||void 0===r?void 0:r.call(n,e)})),t}return(0,H.__extends)(t,e),t.prototype.render=function(){var e=W.Children.only(this.props.children);return void 0!==this.props.targetRef?e:W.cloneElement(e,{ref:this.targetRef})},t.prototype.componentDidMount=function(){this.observeElement()},t.prototype.componentDidUpdate=function(e){this.observeElement(this.props.observeParents!==e.observeParents)},t.prototype.componentWillUnmount=function(){this.observer.disconnect()},t.prototype.observeElement=function(e){if(void 0===e&&(e=!1),this.targetRef.current instanceof Element){if((this.targetRef.current!==this.prevElement||e)&&(this.observer.disconnect(),this.prevElement=this.targetRef.current,this.observer.observe(this.targetRef.current),this.props.observeParents))for(var t=this.targetRef.current.parentElement;null!=t;)this.observer.observe(t),t=t.parentElement}else this.observer.disconnect()},t.displayName="".concat(p.DISPLAYNAME_PREFIX,".ResizeSensor2"),t}(p.AbstractPureComponent2),He=W.createContext([{},function(){return null}]),Ue=function(e,t){switch(t.type){case"FORCE_DISABLED_STATE":return{forceDisabled:!0};case"RESET_DISABLED_STATE":return{};default:return e}},Ge=function(e){var t=e.children,n=e.forceDisable,r=W.useReducer(Ue,{}),o=r[0],i=r[1];return W.useEffect((function(){i(n?{type:"FORCE_DISABLED_STATE"}:{type:"RESET_DISABLED_STATE"})}),[n]),W.createElement(He.Provider,{value:[o,i]},"function"==typeof t?t(o):t)},We=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.popover=null,t.renderPopover=function(e){var n,r,o=t.props,i=o.children,s=o.disabled,a=o.intent,c=o.popoverClassName,u=(0,H.__rest)(o,["children","disabled","intent","popoverClassName"]),l=G()(x,((n={})[p.Classes.MINIMAL]=t.props.minimal,n),p.Classes.intentClass(a),c);return W.createElement(qe,(0,H.__assign)({interactionKind:Xe.HOVER_TARGET_ONLY,modifiers:{arrow:{enabled:!t.props.minimal},offset:{options:{offset:[0,11]}}}},u,{autoFocus:!1,canEscapeKeyClose:!1,disabled:null!==(r=e.forceDisabled)&&void 0!==r?r:s,enforceFocus:!1,lazy:!0,popoverClassName:l,portalContainer:t.props.portalContainer,ref:function(e){return t.popover=e}}),i)},t}return(0,H.__extends)(t,e),t.prototype.render=function(){var e=this;return W.createElement(He.Consumer,null,(function(t){var n=t[0];return W.createElement(Ge,(0,H.__assign)({},n),e.renderPopover)}))},t.prototype.reposition=function(){null!=this.popover&&this.popover.reposition()},t.displayName="".concat(p.DISPLAYNAME_PREFIX,".Tooltip2"),t.defaultProps={hoverCloseDelay:0,hoverOpenDelay:100,minimal:!1,transitionDuration:100},t}(W.PureComponent),Xe={CLICK:"click",CLICK_TARGET_ONLY:"click-target",HOVER:"hover",HOVER_TARGET_ONLY:"hover-target"},qe=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.state={hasDarkParent:!1,isOpen:t.getIsOpen(t.props)},t.popoverElement=null,t.targetElement=null,t.popoverRef=(0,p.refHandler)(t,"popoverElement",t.props.popoverRef),t.targetRef=function(e){return t.targetElement=e},t.isMouseInTargetOrPopover=!1,t.lostFocusOnSamePage=!0,t.isControlled=function(){return void 0!==t.props.isOpen},t.isArrowEnabled=function(){var e,n;return!t.props.minimal&&!1!==(null===(n=null===(e=t.props.modifiers)||void 0===e?void 0:e.arrow)||void 0===n?void 0:n.enabled)},t.isHoverInteractionKind=function(){return t.props.interactionKind===Xe.HOVER||t.props.interactionKind===Xe.HOVER_TARGET_ONLY},t.reposition=function(){var e;return null===(e=t.popperScheduleUpdate)||void 0===e?void 0:e.call(t)},t.renderTarget=function(e){var n,r,o,i,s=e.ref,a=t.props,c=a.children,u=a.className,l=a.fill,d=a.openOnTargetFocus,f=a.renderTarget,v=t.state.isOpen,h=t.isControlled(),E=t.isHoverInteractionKind(),g=t.props.targetTagName;l&&(g="div");var m,P=(0,p.mergeRefs)(s,t.targetRef),O=E?{onBlur:t.handleTargetBlur,onContextMenu:t.handleTargetContextMenu,onFocus:t.handleTargetFocus,onMouseEnter:t.handleMouseEnter,onMouseLeave:t.handleMouseLeave}:{onClick:t.handleTargetClick,onKeyDown:function(e){return p.Keys.isKeyboardClick(e.keyCode)&&t.handleTargetClick(e)}},T=d&&E?0:void 0,b=(0,H.__assign)({"aria-haspopup":null!==(o=t.props.popupKind)&&void 0!==o?o:t.props.interactionKind===Xe.HOVER_TARGET_ONLY?void 0:"true",className:G()(u,N,(n={},n[y]=v,n[p.Classes.ACTIVE]=!h&&v&&!E,n)),ref:P},O);if(void 0!==f)m=f((0,H.__assign)((0,H.__assign)({},b),{isOpen:v,tabIndex:T}));else{var _=p.Utils.ensureElement(W.Children.toArray(c)[0]);if(void 0===_)return null;var R=((r={})[p.Classes.ACTIVE]=v&&!h&&!E,r[p.Classes.FILL]=l,r),C=W.cloneElement(_,{className:G()(_.props.className,R),disabled:!(!v||!p.Utils.isElementOfType(_,We))||_.props.disabled,tabIndex:null!==(i=_.props.tabIndex)&&void 0!==i?i:T});m=W.createElement(g,b,C)}return W.createElement(Ke,{targetRef:P,onResize:t.reposition},m)},t.renderPopover=function(e){var n,r,o=t.props,i=o.interactionKind,s=o.shouldReturnFocusOnClose,a=o.usePortal,c=t.state.isOpen,u=Z(e.placement,t.isArrowEnabled()?e.arrowProps.style:void 0);t.popperScheduleUpdate=e.update;var l={onClick:t.handlePopoverClick,onKeyDown:function(e){return p.Keys.isKeyboardClick(e.keyCode)&&t.handlePopoverClick(e)}};(i===Xe.HOVER||!a&&i===Xe.HOVER_TARGET_ONLY)&&(l.onMouseEnter=t.handleMouseEnter,l.onMouseLeave=t.handleMouseLeave);var d=Y(e.placement),f=G()(E,((n={})[p.Classes.DARK]=t.props.inheritDarkTheme&&t.state.hasDarkParent,n[p.Classes.MINIMAL]=t.props.minimal,n[P]=t.props.captureDismiss,n[C]=t.props.matchTargetWidth,n[I]=!0===e.isReferenceHidden,n[S]=!0===e.hasPopperEscaped,n),"".concat(T,"-").concat(d),t.props.popoverClassName),v=!t.isHoverInteractionKind()&&void 0;return W.createElement(p.Overlay,{autoFocus:null!==(r=t.props.autoFocus)&&void 0!==r?r:v,backdropClassName:m,backdropProps:t.props.backdropProps,canEscapeKeyClose:t.props.canEscapeKeyClose,canOutsideClickClose:t.props.interactionKind===Xe.CLICK,enforceFocus:t.props.enforceFocus,hasBackdrop:t.props.hasBackdrop,isOpen:c,onClose:t.handleOverlayClose,onClosed:t.props.onClosed,onClosing:t.props.onClosing,onOpened:t.props.onOpened,onOpening:t.props.onOpening,transitionDuration:t.props.transitionDuration,transitionName:E,usePortal:t.props.usePortal,portalClassName:t.props.portalClassName,portalContainer:t.props.portalContainer,shouldReturnFocusOnClose:!t.isHoverInteractionKind()&&s},W.createElement("div",{className:w,ref:e.ref,style:e.style},W.createElement(Ke,{onResize:t.reposition},W.createElement("div",(0,H.__assign)({className:f,style:{transformOrigin:u},ref:t.popoverRef},l),t.isArrowEnabled()&&W.createElement(te,{arrowProps:e.arrowProps,placement:e.placement}),W.createElement("div",{className:O},t.props.content)))))},t.handleTargetFocus=function(e){if(t.props.openOnTargetFocus&&t.isHoverInteractionKind()){if(null==e.relatedTarget&&!t.lostFocusOnSamePage)return;t.handleMouseEnter(e)}},t.handleTargetBlur=function(e){t.props.openOnTargetFocus&&t.isHoverInteractionKind()&&(null!=e.relatedTarget&&(e.relatedTarget===t.popoverElement||t.isElementInPopover(e.relatedTarget))||t.handleMouseLeave(e)),t.lostFocusOnSamePage=null!=e.relatedTarget},t.handleTargetContextMenu=function(e){e.defaultPrevented&&t.setOpenState(!1,e)},t.handleMouseEnter=function(e){t.isMouseInTargetOrPopover=!0,t.props.usePortal||!t.isElementInPopover(e.target)||t.props.interactionKind!==Xe.HOVER_TARGET_ONLY||t.props.openOnTargetFocus?t.props.disabled||t.setOpenState(!0,e,t.props.hoverOpenDelay):t.handleMouseLeave(e)},t.handleMouseLeave=function(e){t.isMouseInTargetOrPopover=!1,t.setTimeout((function(){t.isMouseInTargetOrPopover||t.setOpenState(!1,e,t.props.hoverCloseDelay)}))},t.handlePopoverClick=function(e){var n,r,o,i,s=e.target,a=s.closest(".".concat(E)),c=s.closest(".".concat(p.Classes.POPOVER)),u=(null!=a?a:c)===t.getPopoverElement(),l=null!==(r=null!==(n=null==a?void 0:a.classList.contains(P))&&void 0!==n?n:null==c?void 0:c.classList.contains(p.Classes.POPOVER_CAPTURING_DISMISS))&&void 0!==r&&r,d=s.closest(".".concat(_,", .").concat(R)),f=s.closest(".".concat(p.Classes.POPOVER_DISMISS,", .").concat(p.Classes.POPOVER_DISMISS_OVERRIDE)),v=null!==(i=null!==(o=null==d?void 0:d.classList.contains(_))&&void 0!==o?o:null==f?void 0:f.classList.contains(p.Classes.POPOVER_DISMISS))&&void 0!==i&&i,h=null!=s.closest(":disabled, .".concat(p.Classes.DISABLED));!v||h||l&&!u||t.setOpenState(!1,e)},t.handleOverlayClose=function(e){if(null!==t.targetElement&&void 0!==e){var n=e.target;(!p.Utils.elementIsOrContains(t.targetElement,n)||e.nativeEvent instanceof KeyboardEvent)&&t.setOpenState(!1,e)}},t.handleTargetClick=function(e){t.props.disabled||t.isElementInPopover(e.target)||(null==t.props.isOpen?t.setState((function(e){return{isOpen:!e.isOpen}})):t.setOpenState(!t.props.isOpen,e))},t}return(0,H.__extends)(t,e),t.prototype.getPopoverElement=function(){var e;return null===(e=this.popoverElement)||void 0===e?void 0:e.querySelector(".".concat(E))},t.prototype.getIsOpen=function(e){var t;return!e.disabled&&(null!==(t=e.isOpen)&&void 0!==t?t:e.defaultIsOpen)},t.prototype.render=function(){var e=this.props,t=e.disabled,n=e.content,r=e.placement,o=e.position,i=void 0===o?"auto":o,s=e.positioningStrategy,a=this.state.isOpen;return null==n||"string"==typeof n&&""===n.trim()?(t||!1===a||p.Utils.isNodeEnv("production")||console.warn(V),this.renderTarget({ref:Ye})):W.createElement(X.Manager,null,W.createElement(X.Reference,null,this.renderTarget),W.createElement(X.Popper,{innerRef:this.popoverRef,placement:null!=r?r:ne(i),strategy:s,modifiers:this.getPopperModifiers()},this.renderPopover))},t.prototype.componentDidMount=function(){this.updateDarkParent()},t.prototype.componentDidUpdate=function(t,n){e.prototype.componentDidUpdate.call(this,t,n),this.updateDarkParent();var r=this.getIsOpen(this.props);null!=this.props.isOpen&&r!==this.state.isOpen?(this.setOpenState(r),this.setState({isOpen:r})):this.props.disabled&&this.state.isOpen&&null==this.props.isOpen&&this.setOpenState(!1)},t.prototype.validateProps=function(e){null==e.isOpen&&null!=e.onInteraction&&console.warn(K),e.hasBackdrop&&!e.usePortal&&console.warn(z),e.hasBackdrop&&e.interactionKind!==Xe.CLICK&&console.warn(B),void 0!==e.placement&&void 0!==e.position&&console.warn(F);var t=W.Children.count(e.children),n=void 0!==e.renderTarget;0!==t||n||console.warn(A),t>1&&console.warn(L),t>0&&n&&console.warn(k)},t.prototype.getPopperModifiers=function(){var e,t,n,r,o=this.props,i=o.matchTargetWidth,s=o.modifiers,a=o.modifiersCustom,c=[(0,H.__assign)({enabled:this.isArrowEnabled(),name:"arrow"},null==s?void 0:s.arrow),(0,H.__assign)((0,H.__assign)({name:"computeStyles"},null==s?void 0:s.computeStyles),{options:(0,H.__assign)({adaptive:!0,gpuAcceleration:!1},null===(e=null==s?void 0:s.computeStyles)||void 0===e?void 0:e.options)}),(0,H.__assign)((0,H.__assign)({enabled:this.isArrowEnabled(),name:"offset"},null==s?void 0:s.offset),{options:(0,H.__assign)({offset:[0,15]},null===(t=null==s?void 0:s.offset)||void 0===t?void 0:t.options)}),(0,H.__assign)((0,H.__assign)({name:"flip"},null==s?void 0:s.flip),{options:(0,H.__assign)({boundary:this.props.boundary,rootBoundary:this.props.rootBoundary},null===(n=null==s?void 0:s.flip)||void 0===n?void 0:n.options)}),(0,H.__assign)((0,H.__assign)({name:"preventOverflow"},null==s?void 0:s.preventOverflow),{options:(0,H.__assign)({boundary:this.props.boundary,rootBoundary:this.props.rootBoundary},null===(r=null==s?void 0:s.preventOverflow)||void 0===r?void 0:r.options)})];return i&&c.push(q),void 0!==a&&c.push.apply(c,a),c},t.prototype.setOpenState=function(e,t,n){var r,o,i,s,a,c=this;null===(r=this.cancelOpenTimeout)||void 0===r||r.call(this),void 0!==n&&n>0?this.cancelOpenTimeout=this.setTimeout((function(){return c.setOpenState(e,t)}),n):(null==this.props.isOpen?this.setState({isOpen:e}):null===(i=(o=this.props).onInteraction)||void 0===i||i.call(o,e,t),e||null===(a=(s=this.props).onClose)||void 0===a||a.call(s,t))},t.prototype.updateDarkParent=function(){if(this.props.usePortal&&this.state.isOpen){var e=null!=this.targetElement&&null!=this.targetElement.closest(".".concat(p.Classes.DARK));this.setState({hasDarkParent:e})}},t.prototype.isElementInPopover=function(e){var t,n;return null!==(n=null===(t=this.getPopoverElement())||void 0===t?void 0:t.contains(e))&&void 0!==n&&n},t.displayName="".concat(p.DISPLAYNAME_PREFIX,".Popover2"),t.defaultProps={boundary:"clippingParents",captureDismiss:!1,defaultIsOpen:!1,disabled:!1,fill:!1,hasBackdrop:!1,hoverCloseDelay:300,hoverOpenDelay:150,inheritDarkTheme:!0,interactionKind:Xe.CLICK,matchTargetWidth:!1,minimal:!1,openOnTargetFocus:!0,positioningStrategy:"absolute",renderTarget:void 0,shouldReturnFocusOnClose:!1,targetTagName:"span",transitionDuration:300,usePortal:!0},t}(p.AbstractPureComponent2);function Ye(){}var je=W.forwardRef((function(e,t){var n,r,o=e.className,i=e.children,s=e.content,a=e.disabled,c=void 0!==a&&a,u=e.onContextMenu,l=e.popoverProps,E=e.tagName,g=void 0===E?"div":E,m=(0,H.__rest)(e,["className","children","content","disabled","onContextMenu","popoverProps","tagName"]),P=W.useContext(He)[1],O=W.useState(void 0),T=O[0],b=O[1],_=W.useState(),R=_[0],C=_[1],y=W.useState(!1),S=y[0],I=y[1],N=W.useRef(null);W.useEffect((function(){I(!1),P({type:"RESET_DISABLED_STATE"})}),[c]);var w=W.useCallback((function(e){return e.preventDefault()}),[]),x=W.useCallback((function(e){e||(I(!1),C(void 0),P({type:"RESET_DISABLED_STATE"}))}),[]),D=W.useCallback((function(e){var t=e.ref;return W.createElement(p.Portal,null,W.createElement("div",{className:f,style:T,ref:t}))}),[T]),M=W.useMemo((function(){return p.Utils.isDarkTheme(N.current)}),[N,S]),A={isOpen:S,mouseEvent:R,targetOffset:T},B=c?void 0:p.Utils.isFunction(s)?s(A):s,L=void 0===B?void 0:W.createElement(qe,(0,H.__assign)({},l,{content:W.createElement("div",{onContextMenu:w},B),enforceFocus:!1,key:Je(T),hasBackdrop:!0,backdropProps:{className:h},isOpen:S,minimal:!0,onInteraction:x,popoverClassName:G()(v,null==l?void 0:l.popoverClassName,(n={},n[p.Classes.DARK]=M,n)),placement:"right-start",positioningStrategy:"fixed",rootBoundary:"viewport",renderTarget:D,transitionDuration:null!==(r=null==l?void 0:l.transitionDuration)&&void 0!==r?r:100})),k=W.useCallback((function(e){e.defaultPrevented||(!c&&(p.Utils.isFunction(i)||void 0!==L)&&(e.preventDefault(),e.persist(),C(e),b({left:e.clientX,top:e.clientY}),I(!0),P({type:"FORCE_DISABLED_STATE"})),null==u||u(e))}),[u,c]),V=G()(o,d),z=p.Utils.isFunction(i)?i({className:V,contentProps:A,onContextMenu:k,popover:L,ref:N}):W.createElement(W.Fragment,null,L,W.createElement(g,(0,H.__assign)({className:V,onContextMenu:k,ref:(0,p.mergeRefs)(N,t)},m),i));return W.createElement(Ge,{forceDisable:S},z)}));function Je(e){return void 0===e?"default":"".concat(e.left,"x").concat(e.top)}je.displayName="Blueprint.ContextMenu2";var Qe,Ze=[].concat(["top","bottom","right","left"],["auto"]).reduce((function(e,t){return e.concat([t,t+"-start",t+"-end"])}),[]);!function(e){e.MENU="menu",e.LISTBOX="listbox",e.TREE="tree",e.GRID="grid",e.DIALOG="dialog"}(Qe||(Qe={}))}(),c}()}));