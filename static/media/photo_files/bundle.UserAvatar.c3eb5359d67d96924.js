webpackJsonp(["bundle.UserAvatar"],{fYX4:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});r("SU+a"),r("VjuZ");var n=r("86MP"),a=r.n(n),o=r("M1I4"),c=r.n(o),i=r("fKPv"),l=r.n(i),s=r("GiK3"),u=(r("MfeA"),r("Z1LJ")),d=r("sLaq"),h=r("bndy"),p=r("zAiL"),f=r("qX3G"),m=r("Dica"),_=Object(m.f)([m.a]),g=function(e,t){return t.match.params.screenName||void 0},v=Object(h.createSelector)(function(e,t){var r=g(e,t);return r?_(e,r):p.a.LOADING},g,function(e,t){var r=g(e,t);return r?m.d.selectByScreenName(e,r):void 0},f.a,function(e,t,r,n){return{fetchStatus:e,screenName:t,user:r,canGoBack:n}}),b={createLocalApiErrorHandler:Object(d.b)("USER_AVATAR"),fetchOneUserByScreenNameIfNeeded:m.d.fetchOneByScreenNameIfNeeded},y=Object(u.e)(v,b),S=r("rZhZ"),A=r("Y2tT"),E=r("thTC"),x=r.n(E),N=r("MJph"),w=r("MjES"),B=r.n(w),C=r("fF1d"),j=r.n(C),O=r("kRIX"),k=r.n(O),G=r("Xwuh"),I=r.n(G),M=r("jYKd"),R=r.n(M),U=r("tQ79"),F=r.n(U);r.d(t,"UserAvatarScreen",function(){return L});var L=function(e){function t(){for(var t,r=arguments.length,n=new Array(r),a=0;a<r;a++)n[a]=arguments[a];return t=e.call.apply(e,[this].concat(n))||this,l()(c()(c()(t)),"_getBgColor",function(){var e=t.props.user;return e&&e.profile_image_extensions_media_color&&e.profile_image_extensions_media_color.palette&&k.a.getForGallery(e.profile_image_extensions_media_color.palette)}),l()(c()(c()(t)),"_renderResponsive",function(){return s.createElement(I.a,null,t._render)}),l()(c()(c()(t)),"_render",function(e){var r=e.windowWidth,n=e.windowHeight,a=t.props.user,o=t._getBgColor(),c=o?"rgb("+o.rgb.red+", "+o.rgb.green+", "+o.rgb.blue+")":R.a.theme.colors.black,i=Math.min(n,r);return a?s.createElement(B.a,{style:[W.root,{backgroundColor:c}]},s.createElement(B.a,{style:W.closeButtonWrapper},s.createElement(j.a,{icon:s.createElement(x.a,null),onPress:t._handleClose,type:"invertedText"})),s.createElement(B.a,{style:[W.container]},s.createElement(F.a,{backgroundColor:o?o.rgb:void 0,style:[W.userAvatar,{maxWidth:i,maxHeight:i}],uri:a.profile_image_url_https}))):null}),l()(c()(c()(t)),"_handleFetch",function(){var e=t.props,r=e.createLocalApiErrorHandler,n=e.fetchOneUserByScreenNameIfNeeded,a=e.screenName;a&&n(a).catch(r(S.a))}),l()(c()(c()(t)),"_handleClose",function(){var e=t.props,r=e.canGoBack,n=e.history,a=e.screenName;r?n.goBack():n.replace({pathname:a?"/"+a:"/"})}),t}a()(t,e);var r=t.prototype;return r.UNSAFE_componentWillMount=function(){this._handleFetch()},r.render=function(){var e=this.props.fetchStatus;return s.createElement(N.a.Configure,{headerless:!0},s.createElement(A.a,{fetchStatus:e,onRequestRetry:this._handleFetch,render:this._renderResponsive}))},t}(s.Component),W=R.a.create(function(e){return{root:{flexGrow:1},container:{flexGrow:1,alignItems:"center",justifyContent:"center",alignSelf:"center",width:400,height:400,maxHeight:"100vh",maxWidth:"100vw"},closeButtonWrapper:{position:"absolute",zIndex:1,padding:e.spaces.xxSmall},userAvatar:{width:"100%",height:"100%",justifyContent:"center",padding:e.spaces.small}}});t.default=y(L)}});
//# sourceMappingURL=https://ton.smf1.twitter.com/responsive-web-internal/sourcemaps/web/bundle.UserAvatar.c3eb5359d67d96924.js.map