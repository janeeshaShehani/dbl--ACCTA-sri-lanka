module.exports=[86590,e=>{"use strict";var t=e.i(47909),r=e.i(74017),o=e.i(96250),n=e.i(59756),i=e.i(61916),a=e.i(74677),s=e.i(69741),l=e.i(16795),d=e.i(87718),c=e.i(95169),u=e.i(47587),p=e.i(66012),f=e.i(70101),m=e.i(26937),g=e.i(10372),h=e.i(93695),y=e.i(9580);e.i(52474);var x=e.i(220);let E=new t.AppRouteRouteModule({definition:{kind:r.f.APP_ROUTE,page:"/api/contact/route",pathname:"/api/contact",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/src/app/api/contact/route.ts",nextConfigOutput:"standalone",userland:()=>e.r(66122),...{}}),{workAsyncStorage:v,workUnitAsyncStorage:b,serverHooks:w}=E;async function A(e,t,r){r.requestMeta&&(0,n.R)(e,r.requestMeta),E.isDev&&(0,n.i)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let o="/api/contact/route";o=o.replace(/\/index$/,"")||"/";let{instrumentation:a}=await E.ensureInstrumentation(e,{deferSpans:!0});return E.traceRequest(e,{tracer:(0,i.v)(),spanName:`${e.method||"GET"} ${o}`,httpTarget:e.url,instrumentation:a},(n,i)=>R(e,t,r,o,!1,n,i))}async function R(e,t,o,v,b,w,A){let R=await E.prepare(e,t,{srcPage:v,multiZoneDraftMode:b});if(!R)return t.statusCode=400,t.end("Bad Request"),null==o.waitUntil||o.waitUntil.call(o,Promise.resolve()),null;let{buildId:C,deploymentId:F,params:S,nextConfig:T,parsedUrl:q,isDraftMode:N,prerenderManifest:P,routerServerContext:k,isOnDemandRevalidate:O,revalidateOnlyGenerated:I,resolvedPathname:U,clientReferenceManifest:_,serverActionsManifest:j,previewProps:D}=R,M=(0,s.f)(v),B=!!P.routes[U]&&(E.isDev||(0,y.f)(U,E.cacheOwner,P.routes[U])),$=!!(P.dynamicRoutes[M]||B),L=async()=>((null==k?void 0:k.render404)?await k.render404(e,t,q,!1):t.end("This page could not be found"),null);if($&&!N){let e=P.dynamicRoutes[M];if(e&&!1===e.fallback&&!B){if(T.adapterPath)return await L();throw new h.NoFallbackError}}let H=null;!$||E.isDev||N||(H="/index"===(H=U)?"/":H),j&&_&&(0,a.f)({page:v,clientReferenceManifest:_,serverActionsManifest:j});let z=e.method||"GET",G=(0,i.v)(),K=!!(null==k?void 0:k.isWrappedByNextServer),Y=!!(0,n.w)(e,"minimalMode"),J=(0,n.w)(e,"incrementalCache")||await E.getIncrementalCache(e,T,D,P,Y);null==J||J.resetRequestCache(),globalThis.__incrementalCache=J;let Q={params:S,previewProps:D,renderOpts:{experimental:{authInterrupts:!!T.experimental.authInterrupts,useCacheTimeout:T.experimental.useCacheTimeout,durableUseCacheEntries:!!T.experimental.durableUseCacheEntries},cacheComponents:!!T.cacheComponents,validationLevel:T.experimental.instantInsights.validationLevel,isDraftMode:N,incrementalCache:J,hmrRefreshHash:(0,n.w)(e,"hmrRefreshHash"),cacheLifeProfiles:T.cacheLife,staticPageGenerationTimeout:T.staticPageGenerationTimeout,waitUntil:o.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0},sharedContext:{buildId:C,deploymentId:F}},V=new l.x(e),W=new l.e(t),X=d.k.fromNodeNextRequest(V,(0,d.t)(t)),Z=async({previousCacheEntry:r})=>{try{if(!Y&&O&&I&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let n=null===H?await E.handle(X,Q):await E.prerender(X,Q);e.fetchMetrics=Q.renderOpts.fetchMetrics;let i=Q.renderOpts.pendingWaitUntil;i&&o.waitUntil&&(o.waitUntil(i),i=void 0);let a=Q.renderOpts.collectedTags;if(!$)return await (0,p.f)(V,W,n,i),null;{let e=await n.blob(),t=(0,f.S)(n.headers);a&&(t[g.M]=a),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==Q.renderOpts.collectedRevalidate&&!(Q.renderOpts.collectedRevalidate>=g.Q)&&Q.renderOpts.collectedRevalidate,o=void 0===Q.renderOpts.collectedExpire||Q.renderOpts.collectedExpire>=g.Q?!1!==r&&r>0?T.expireTime:void 0:Q.renderOpts.collectedExpire;return{value:{kind:x.x.APP_ROUTE,status:n.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:o}}}}catch(t){throw(null==r?void 0:r.isStale)&&await E.onRequestError(e,t,{routerKind:"App Router",routePath:v,routeType:"route",revalidateReason:(0,u.f)({isStaticGeneration:null!==H,isOnDemandRevalidate:O})},!1,k),t}},ee=async n=>{try{var a,s;let n=await E.handleResponse({req:e,nextConfig:T,cacheKey:H,routeKind:r.f.APP_ROUTE,isFallback:!1,previewProps:D,prerenderManifest:P,isRoutePPREnabled:!1,isOnDemandRevalidate:O,revalidateOnlyGenerated:I,responseGenerator:Z,waitUntil:o.waitUntil,isMinimalMode:Y});if(null!==n&&"error"in n)throw n.error;if(!$)return;if((null==n||null==(a=n.value)?void 0:a.kind)!==x.x.APP_ROUTE)throw Error(`Invariant: app-route received invalid cache entry ${null==n||null==(s=n.value)?void 0:s.kind}`);Y||t.setHeader("x-nextjs-cache",O?"REVALIDATED":n.isMiss?"MISS":n.isStale?"STALE":"HIT"),N&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let i=(0,f.G)(n.value.headers);Y&&$||i.delete(g.M),!n.cacheControl||t.getHeader("Cache-Control")||i.get("Cache-Control")||i.set("Cache-Control",(0,m.f)(n.cacheControl)),await (0,p.f)(V,W,new Response(n.value.body,{headers:i,status:n.value.status||200}));return}catch(r){if(r instanceof h.NoFallbackError||await E.onRequestError(e,r,{routerKind:"App Router",routePath:M,routeType:"route",revalidateReason:(0,u.f)({isStaticGeneration:null!==H,isOnDemandRevalidate:O})},!1,k),$)throw r;if(t.headersSent){if(n){let e=r instanceof Error?r:Error("Unknown app route error");n.recordException(e),n.setStatus({code:i.J.ERROR,message:e.message}),n.setAttribute("error.type",e.name)}t.writableEnded||t.destroyed||t.end()}else await (0,p.f)(V,W,new Response(null,{status:500}));return}finally{(()=>{if(!n)return;let e=t.statusCode;n.setAttributes({"http.status_code":e,"next.rsc":!1}),e&&e>=500&&(n.setStatus({code:i.J.ERROR}),n.setAttribute("error.type",e.toString()));let r=G.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==c.q.handleRequest)return console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let o=r.get("next.route")||M,a=`${z} ${o}`;n.setAttributes({"next.route":o,"http.route":o,"next.span_name":a}),n.updateName(a),A&&A!==n&&(A.setAttribute("http.route",o),A.updateName(a))})()}};K||void 0===e.url||null==w||w.setAttribute("http.target",e.url),await ee(w)}e.s(["handler",0,A,"patchFetch",0,function(){return(0,o.f)({workAsyncStorage:v,workUnitAsyncStorage:b})},"routeModule",0,E,"serverHooks",0,w,"workAsyncStorage",0,v,"workUnitAsyncStorage",0,b])},66122,e=>{"use strict";var t=e.i(89171),r=e.i(46245),o=e.i(22734),n=e.i(14747);let i=new r.f(process.env.RESEND_API_KEY),a=process.env.CONTACT_ADMIN_EMAIL,s=process.env.CONTACT_FROM_EMAIL||"ACCTA Sri Lanka <info@acctasl.com>",l=n.default.join(process.cwd(),"src","data"),d=n.default.join(l,"contact-enquiries.json");function c(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}async function u(e){try{if(!process.env.RESEND_API_KEY)return console.error("RESEND_API_KEY is not configured."),t.NextResponse.json({error:"Email service is not configured."},{status:500});let{name:r,email:n,phone:u,topic:p,message:f}=await e.json();if("string"!=typeof r||"string"!=typeof n||"string"!=typeof p||"string"!=typeof f||!r.trim()||!n.trim()||!p.trim()||!f.trim())return t.NextResponse.json({error:"Please complete all required fields."},{status:400});if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n.trim()))return t.NextResponse.json({error:"Please enter a valid email address."},{status:400});if(!a)return console.error("ADMIN_EMAIL is not configured."),t.NextResponse.json({error:"Administrator email is not configured."},{status:500});let m={id:crypto.randomUUID(),name:r.trim(),email:n.trim(),phone:"string"==typeof u&&u.trim()?u.trim():"",topic:p.trim(),message:f.trim(),submittedAt:new Date().toISOString()},g=(o.default.existsSync(l)||o.default.mkdirSync(l,{recursive:!0}),o.default.existsSync(d)||o.default.writeFileSync(d,JSON.stringify([],null,2),"utf-8"),JSON.parse(o.default.readFileSync(d,"utf-8")));g.push(m),o.default.writeFileSync(d,JSON.stringify(g,null,2),"utf-8"),console.log("===================================="),console.log("Contact enquiry saved successfully."),console.log("Enquiry ID:",m.id),console.log("====================================");let h=c(m.name),y=c(m.email),x=m.phone?c(m.phone):"Not provided",E=c(m.topic),v=c(m.message);console.log("Sending contact enquiry to:",a),console.log("Enquirer:",m.name),console.log("Enquiry type:",m.topic);let{data:b,error:w}=await i.emails.send({from:s,to:[a],replyTo:m.email,subject:`New ACCTA Enquiry: ${m.topic}`,html:`
        <div style="font-family: Arial, Helvetica, sans-serif; max-width: 650px; margin: 0 auto; color: #14293A; background-color: #FFFFFF;">

          <!-- Header -->
          <div style="background-color: #14293A; padding: 28px 30px;">
            <p style="margin: 0; color: #B5985A; font-size: 13px; font-weight: bold; letter-spacing: 1.5px;">
              ACCTA SRI LANKA
            </p>

            <h1 style="margin: 8px 0 0; color: #FFFFFF; font-size: 25px;">
              New Contact Enquiry
            </h1>

            <p style="margin: 8px 0 0; color: #DCE9F1; font-size: 14px;">
              A new enquiry has been submitted through the website.
            </p>
          </div>

          <!-- Content -->
          <div style="padding: 30px; border: 1px solid #E5E7EB;">

            <h2 style="margin-top: 0; color: #14293A; font-size: 19px;">
              Enquirer Details
            </h2>

            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">

              <tr>
                <td style="padding: 12px; background-color: #F3F6F8; font-weight: bold; width: 35%; border-bottom: 1px solid #E5E7EB;">
                  Full Name
                </td>
                <td style="padding: 12px; border-bottom: 1px solid #E5E7EB;">
                  ${h}
                </td>
              </tr>

              <tr>
                <td style="padding: 12px; background-color: #F3F6F8; font-weight: bold; border-bottom: 1px solid #E5E7EB;">
                  Email
                </td>
                <td style="padding: 12px; border-bottom: 1px solid #E5E7EB;">
                  ${y}
                </td>
              </tr>

              <tr>
                <td style="padding: 12px; background-color: #F3F6F8; font-weight: bold; border-bottom: 1px solid #E5E7EB;">
                  Phone
                </td>
                <td style="padding: 12px; border-bottom: 1px solid #E5E7EB;">
                  ${x}
                </td>
              </tr>

              <tr>
                <td style="padding: 12px; background-color: #F3F6F8; font-weight: bold;">
                  Enquiry Type
                </td>
                <td style="padding: 12px;">
                  ${E}
                </td>
              </tr>

            </table>

            <!-- Message -->
            <div style="margin-top: 28px;">
              <h2 style="margin-bottom: 12px; color: #14293A; font-size: 19px;">
                Message
              </h2>

              <div style="background-color: #F3F6F8; border-left: 4px solid #B5985A; padding: 18px; line-height: 1.7; white-space: pre-wrap; font-size: 14px;">
                ${v}
              </div>
            </div>

            <div style="margin-top: 28px; padding: 14px 16px; background-color: #FFF8E8; border-left: 4px solid #B5985A;">
              <p style="margin: 0; font-size: 13px; color: #14293A;">
                You can reply directly to this email to respond to the enquirer.
              </p>
            </div>

          </div>

          <!-- Footer -->
          <div style="padding: 20px 30px; background-color: #F3F6F8; text-align: center;">
            <p style="margin: 0; color: #6B7280; font-size: 12px;">
              This email was automatically generated from the ACCTA Sri Lanka website contact form.
            </p>
          </div>

        </div>
      `});if(w)return console.error("Contact email error:",w),t.NextResponse.json({success:!0,message:"Your enquiry was saved successfully, but the email notification could not be sent.",enquiry:m,emailError:w.message},{status:201});return console.log("Contact enquiry email sent successfully:",b),t.NextResponse.json({success:!0,message:"Your enquiry has been sent successfully.",enquiry:m},{status:200})}catch(e){return console.error("Contact form error:",e),t.NextResponse.json({error:"Unable to process your enquiry. Please try again later."},{status:500})}}e.s(["POST",0,u,"runtime",0,"nodejs"])}];

//# sourceMappingURL=_1fo4stllmmxsg._.js.map