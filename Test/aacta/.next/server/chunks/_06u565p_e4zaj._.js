module.exports=[51617,e=>{"use strict";var t=e.i(47909),r=e.i(74017),i=e.i(96250),o=e.i(59756),a=e.i(61916),n=e.i(74677),l=e.i(69741),s=e.i(16795),p=e.i(87718),c=e.i(95169),d=e.i(47587),u=e.i(66012),f=e.i(70101),g=e.i(26937),m=e.i(10372),h=e.i(93695),x=e.i(9580);e.i(52474);var A=e.i(220);let y=new t.AppRouteRouteModule({definition:{kind:r.f.APP_ROUTE,page:"/api/apply-membership-applications/route",pathname:"/api/apply-membership-applications",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/src/app/api/apply-membership-applications/route.ts",nextConfigOutput:"standalone",userland:()=>e.r(20246),...{}}),{workAsyncStorage:b,workUnitAsyncStorage:v,serverHooks:w}=y;async function R(e,t,r){r.requestMeta&&(0,o.R)(e,r.requestMeta),y.isDev&&(0,o.i)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let i="/api/apply-membership-applications/route";i=i.replace(/\/index$/,"")||"/";let{instrumentation:n}=await y.ensureInstrumentation(e,{deferSpans:!0});return y.traceRequest(e,{tracer:(0,a.v)(),spanName:`${e.method||"GET"} ${i}`,httpTarget:e.url,instrumentation:n},(o,a)=>C(e,t,r,i,!1,o,a))}async function C(e,t,i,b,v,w,R){let C=await y.prepare(e,t,{srcPage:b,multiZoneDraftMode:v});if(!C)return t.statusCode=400,t.end("Bad Request"),null==i.waitUntil||i.waitUntil.call(i,Promise.resolve()),null;let{buildId:E,deploymentId:S,params:T,nextConfig:N,parsedUrl:M,isDraftMode:I,prerenderManifest:k,routerServerContext:P,isOnDemandRevalidate:O,revalidateOnlyGenerated:$,resolvedPathname:U,clientReferenceManifest:D,serverActionsManifest:j,previewProps:F}=C,z=(0,l.f)(b),L=!!k.routes[U]&&(y.isDev||(0,x.f)(U,y.cacheOwner,k.routes[U])),_=!!(k.dynamicRoutes[z]||L),q=async()=>((null==P?void 0:P.render404)?await P.render404(e,t,M,!1):t.end("This page could not be found"),null);if(_&&!I){let e=k.dynamicRoutes[z];if(e&&!1===e.fallback&&!L){if(N.adapterPath)return await q();throw new h.NoFallbackError}}let B=null;!_||y.isDev||I||(B="/index"===(B=U)?"/":B),j&&D&&(0,n.f)({page:b,clientReferenceManifest:D,serverActionsManifest:j});let G=e.method||"GET",H=(0,a.v)(),Y=!!(null==P?void 0:P.isWrappedByNextServer),J=!!(0,o.w)(e,"minimalMode"),K=(0,o.w)(e,"incrementalCache")||await y.getIncrementalCache(e,N,F,k,J);null==K||K.resetRequestCache(),globalThis.__incrementalCache=K;let W={params:T,previewProps:F,renderOpts:{experimental:{authInterrupts:!!N.experimental.authInterrupts,useCacheTimeout:N.experimental.useCacheTimeout,durableUseCacheEntries:!!N.experimental.durableUseCacheEntries},cacheComponents:!!N.cacheComponents,validationLevel:N.experimental.instantInsights.validationLevel,isDraftMode:I,incrementalCache:K,hmrRefreshHash:(0,o.w)(e,"hmrRefreshHash"),cacheLifeProfiles:N.cacheLife,staticPageGenerationTimeout:N.staticPageGenerationTimeout,waitUntil:i.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0},sharedContext:{buildId:E,deploymentId:S}},Q=new s.x(e),V=new s.e(t),X=p.k.fromNodeNextRequest(Q,(0,p.t)(t)),Z=async({previousCacheEntry:r})=>{try{if(!J&&O&&$&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let o=null===B?await y.handle(X,W):await y.prerender(X,W);e.fetchMetrics=W.renderOpts.fetchMetrics;let a=W.renderOpts.pendingWaitUntil;a&&i.waitUntil&&(i.waitUntil(a),a=void 0);let n=W.renderOpts.collectedTags;if(!_)return await (0,u.f)(Q,V,o,a),null;{let e=await o.blob(),t=(0,f.S)(o.headers);n&&(t[m.M]=n),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==W.renderOpts.collectedRevalidate&&!(W.renderOpts.collectedRevalidate>=m.Q)&&W.renderOpts.collectedRevalidate,i=void 0===W.renderOpts.collectedExpire||W.renderOpts.collectedExpire>=m.Q?!1!==r&&r>0?N.expireTime:void 0:W.renderOpts.collectedExpire;return{value:{kind:A.x.APP_ROUTE,status:o.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:i}}}}catch(t){throw(null==r?void 0:r.isStale)&&await y.onRequestError(e,t,{routerKind:"App Router",routePath:b,routeType:"route",revalidateReason:(0,d.f)({isStaticGeneration:null!==B,isOnDemandRevalidate:O})},!1,P),t}},ee=async o=>{try{var n,l;let o=await y.handleResponse({req:e,nextConfig:N,cacheKey:B,routeKind:r.f.APP_ROUTE,isFallback:!1,previewProps:F,prerenderManifest:k,isRoutePPREnabled:!1,isOnDemandRevalidate:O,revalidateOnlyGenerated:$,responseGenerator:Z,waitUntil:i.waitUntil,isMinimalMode:J});if(null!==o&&"error"in o)throw o.error;if(!_)return;if((null==o||null==(n=o.value)?void 0:n.kind)!==A.x.APP_ROUTE)throw Error(`Invariant: app-route received invalid cache entry ${null==o||null==(l=o.value)?void 0:l.kind}`);J||t.setHeader("x-nextjs-cache",O?"REVALIDATED":o.isMiss?"MISS":o.isStale?"STALE":"HIT"),I&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let a=(0,f.G)(o.value.headers);J&&_||a.delete(m.M),!o.cacheControl||t.getHeader("Cache-Control")||a.get("Cache-Control")||a.set("Cache-Control",(0,g.f)(o.cacheControl)),await (0,u.f)(Q,V,new Response(o.value.body,{headers:a,status:o.value.status||200}));return}catch(r){if(r instanceof h.NoFallbackError||await y.onRequestError(e,r,{routerKind:"App Router",routePath:z,routeType:"route",revalidateReason:(0,d.f)({isStaticGeneration:null!==B,isOnDemandRevalidate:O})},!1,P),_)throw r;if(t.headersSent){if(o){let e=r instanceof Error?r:Error("Unknown app route error");o.recordException(e),o.setStatus({code:a.J.ERROR,message:e.message}),o.setAttribute("error.type",e.name)}t.writableEnded||t.destroyed||t.end()}else await (0,u.f)(Q,V,new Response(null,{status:500}));return}finally{(()=>{if(!o)return;let e=t.statusCode;o.setAttributes({"http.status_code":e,"next.rsc":!1}),e&&e>=500&&(o.setStatus({code:a.J.ERROR}),o.setAttribute("error.type",e.toString()));let r=H.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==c.q.handleRequest)return console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let i=r.get("next.route")||z,n=`${G} ${i}`;o.setAttributes({"next.route":i,"http.route":i,"next.span_name":n}),o.updateName(n),R&&R!==o&&(R.setAttribute("http.route",i),R.updateName(n))})()}};Y||void 0===e.url||null==w||w.setAttribute("http.target",e.url),await ee(w)}e.s(["handler",0,R,"patchFetch",0,function(){return(0,i.f)({workAsyncStorage:b,workUnitAsyncStorage:v})},"routeModule",0,y,"serverHooks",0,w,"workAsyncStorage",0,b,"workUnitAsyncStorage",0,v])},20246,e=>{"use strict";var t=e.i(89171),r=e.i(22734),i=e.i(14747);let o=new(e.i(46245)).f(process.env.RESEND_API_KEY),a=process.env.MEMBERSHIP_ADMIN_EMAIL,n=process.env.MEMBERSHIP_FROM_EMAIL||"ACCTA Membership <membership@acctasl.com>";function l(e){return"individual"===e?"Individual Membership Application":"Corporate Membership Application"}function s(e){return`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>ACCTA Membership</title>
      </head>

      <body
        style="
          margin: 0;
          padding: 0;
          background-color: #f3f4f6;
          font-family: Arial, Helvetica, sans-serif;
          color: #14293A;
        "
      >
        <div style="width: 100%; padding: 32px 12px; box-sizing: border-box;">
          <div
            style="
              max-width: 640px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            "
          >
            <!-- Header -->
            <div
              style="
                background-color: #14293A;
                padding: 28px 32px;
                text-align: center;
              "
            >
              <h1
                style="
                  margin: 0;
                  color: #ffffff;
                  font-size: 28px;
                  font-weight: 700;
                  letter-spacing: 1px;
                "
              >
                ACCTA Sri Lanka
              </h1>

              <p
                style="
                  margin: 8px 0 0;
                  color: #DCE9F1;
                  font-size: 14px;
                "
              >
                Association of Certified Chartered Tax Advisors
              </p>
            </div>

            <!-- Gold accent -->
            <div
              style="
                height: 5px;
                background-color: #B5985A;
              "
            ></div>

            <!-- Content -->
            <div style="padding: 36px 32px;">
              ${e}
            </div>

            <!-- Footer -->
            <div
              style="
                padding: 22px 32px;
                background-color: #f3f6f8;
                border-top: 1px solid #e5e7eb;
                text-align: center;
              "
            >
              <p
                style="
                  margin: 0;
                  color: #667085;
                  font-size: 12px;
                  line-height: 18px;
                "
              >
                \xa9 ${new Date().getFullYear()} ACCTA Sri Lanka. All rights reserved.
              </p>

              <p
                style="
                  margin: 6px 0 0;
                  color: #667085;
                  font-size: 12px;
                "
              >
                ACCTA Membership Team
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `}async function p({email:e,name:t,applicationType:r,registrationNumber:i,membershipCategory:a}){let c=l(r);console.log("Sending applicant confirmation to:",e),console.log("Registration number:",i);let d=`
    <h2
      style="
        margin: 0 0 20px;
        color: #14293A;
        font-size: 20px;
      "
    >
      Thank you for your application, ${t}
    </h2>

    <p
      style="
        margin: 0 0 16px;
        color: #475467;
        font-size: 14px;
        line-height: 26px;
      "
    >
      We have successfully received your
      <strong style="color: #14293A;">
        ${c}
      </strong>.
    </p>

    <!-- Registration number -->
    <div
      style="
        margin: 24px 0;
        padding: 20px;
        background-color: #fdf8f0;
        border-left: 4px solid #B5985A;
        border-radius: 4px;
      "
    >
      <p
        style="
          margin: 0 0 8px;
          color: #475467;
          font-size: 13px;
          font-weight: 600;
        "
      >
        YOUR APPLICATION REGISTRATION NUMBER
      </p>

      <p
        style="
          margin: 0;
          color: #14293A;
          font-size: 22px;
          font-weight: 700;
          letter-spacing: 1px;
        "
      >
        ${i}
      </p>

      <p
        style="
          margin: 10px 0 0;
          color: #475467;
          font-size: 13px;
          line-height: 20px;
        "
      >
        Membership Category: <strong>${a}</strong>
      </p>
    </div>

    <!-- Status -->
    <div
      style="
        margin: 24px 0;
        padding: 20px;
        background-color: #DCE9F1;
        border-left: 4px solid #214C69;
        border-radius: 4px;
      "
    >
      <p
        style="
          margin: 0 0 6px;
          color: #14293A;
          font-size: 15px;
          font-weight: 700;
        "
      >
        Application Received
      </p>

      <p
        style="
          margin: 0;
          color: #475467;
          font-size: 14px;
          line-height: 22px;
        "
      >
        Your application is now under review. Please keep your registration
        number for future reference. Our team will contact you regarding the
        next steps.
      </p>
    </div>

    <p
      style="
        margin: 24px 0 0;
        color: #475467;
        font-size: 14px;
        line-height: 26px;
      "
    >
      Thank you for your interest in becoming a member of ACCTA Sri Lanka.
    </p>

    <p
      style="
        margin: 28px 0 0;
        color: #14293A;
        font-size: 14px;
        line-height: 24px;
      "
    >
      Kind regards,<br />
      <strong>ACCTA Membership Team</strong>
    </p>
  `,{data:u,error:f}=await o.emails.send({from:n,to:[e],subject:`ACCTA Application Received - ${i}`,html:s(d)});if(f)throw console.error("Applicant email error:",f),Error(`Failed to send applicant confirmation: ${f.message}`);return console.log("Applicant confirmation sent successfully:",u),u}async function c({name:e,email:t,applicationType:r,registrationNumber:i,membershipCategory:p}){if(!a)throw Error("ADMIN_EMAIL is not configured.");let d=l(r);console.log("Sending admin notification to:",a),console.log("Registration number:",i);let u=`
    <h2
      style="
        margin: 0 0 20px;
        color: #14293A;
        font-size: 21px;
      "
    >
      New Membership Application
    </h2>

    <p
      style="
        margin: 0 0 24px;
        color: #475467;
        font-size: 16px;
        line-height: 26px;
      "
    >
      A new
      <strong style="color: #14293A;">
        ${d}
      </strong>
      has been submitted through the ACCTA website.
    </p>

    <!-- Registration number -->
    <div
      style="
        margin: 20px 0;
        padding: 20px;
        background-color: #fdf8f0;
        border-left: 4px solid #B5985A;
        border-radius: 4px;
      "
    >
      <p
        style="
          margin: 0 0 8px;
          color: #475467;
          font-size: 13px;
          font-weight: 600;
        "
      >
        REGISTRATION NUMBER
      </p>

      <p
        style="
          margin: 0;
          color: #14293A;
          font-size: 22px;
          font-weight: 700;
          letter-spacing: 1px;
        "
      >
        ${i}
      </p>
    </div>

    <!-- Application details -->
    <div
      style="
        margin: 20px 0;
        border: 1px solid #d0d5dd;
        border-radius: 6px;
        overflow: hidden;
      "
    >
      <div
        style="
          padding: 14px 18px;
          background-color: #14293A;
          color: #ffffff;
          font-size: 14px;
          font-weight: 700;
        "
      >
        Applicant Details
      </div>

      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        style="
          border-collapse: collapse;
          font-size: 14px;
        "
      >
        <tr>
          <td
            style="
              width: 38%;
              padding: 14px 18px;
              border-bottom: 1px solid #e5e7eb;
              background-color: #f8fafc;
              color: #475467;
              font-weight: 600;
            "
          >
            Name
          </td>

          <td
            style="
              padding: 14px 18px;
              border-bottom: 1px solid #e5e7eb;
              color: #14293A;
            "
          >
            ${e}
          </td>
        </tr>

        <tr>
          <td
            style="
              padding: 14px 18px;
              border-bottom: 1px solid #e5e7eb;
              background-color: #f8fafc;
              color: #475467;
              font-weight: 600;
            "
          >
            Email
          </td>

          <td
            style="
              padding: 14px 18px;
              border-bottom: 1px solid #e5e7eb;
              color: #14293A;
            "
          >
            ${t}
          </td>
        </tr>

        <tr>
          <td
            style="
              padding: 14px 18px;
              border-bottom: 1px solid #e5e7eb;
              background-color: #f8fafc;
              color: #475467;
              font-weight: 600;
            "
          >
            Membership Category
          </td>

          <td
            style="
              padding: 14px 18px;
              border-bottom: 1px solid #e5e7eb;
              color: #14293A;
            "
          >
            ${p}
          </td>
        </tr>

        <tr>
          <td
            style="
              padding: 14px 18px;
              background-color: #f8fafc;
              color: #475467;
              font-weight: 600;
            "
          >
            Application Type
          </td>

          <td
            style="
              padding: 14px 18px;
              color: #14293A;
            "
          >
            ${"individual"===r?"Individual":"Corporate"}
          </td>
        </tr>
      </table>
    </div>

    <!-- Action -->
    <div
      style="
        margin-top: 24px;
        padding: 18px 20px;
        background-color: #fdf8f0;
        border-left: 4px solid #B5985A;
        border-radius: 4px;
      "
    >
      <p
        style="
          margin: 0;
          color: #14293A;
          font-size: 14px;
          line-height: 22px;
        "
      >
        <strong>Action required:</strong>
        Please review the submitted application and supporting documents
        in the ACCTA administration system.
      </p>
    </div>
  `,{data:f,error:g}=await o.emails.send({from:n,to:[a],subject:`New Application - ${i}`,html:s(u)});if(g)throw console.error("Admin email error:",g),Error(`Failed to send admin notification: ${g.message}`);return console.log("Admin notification sent successfully:",f),f}let d=i.default.join(process.cwd(),"src","data"),u=i.default.join(d,"apply-membership-applications.json"),f={acta:"ASA",fcta:"FSA",aacta:"AAA",facta:"FAA",afcta:"AFA","corporate member":"CMA"};function g(){r.default.existsSync(d)||r.default.mkdirSync(d,{recursive:!0}),r.default.existsSync(u)||r.default.writeFileSync(u,JSON.stringify({individualApplications:[],corporateApplications:[]},null,2),"utf-8");let e=JSON.parse(r.default.readFileSync(u,"utf-8"));return{individualApplications:Array.isArray(e.individualApplications)?e.individualApplications:[],corporateApplications:Array.isArray(e.corporateApplications)?e.corporateApplications:[]}}async function m(){try{let e=g();return t.NextResponse.json(e)}catch(e){return console.error("Application read error:",e),t.NextResponse.json({error:"Unable to read applications."},{status:500})}}async function h(e){try{let{type:i,application:o}=await e.json();if("individual"!==i&&"corporate"!==i)return t.NextResponse.json({error:"Invalid application type."},{status:400});if(!o||"object"!=typeof o||Array.isArray(o))return t.NextResponse.json({error:"Application data is required."},{status:400});let a=g(),n="corporate"===i?"Corporate Member":o.membershipCategory;if("string"!=typeof n||!n.trim())return t.NextResponse.json({error:"Membership category is required."},{status:400});let l=n.trim().replace(/\s+/g," "),s=function(e,t){let r,i=f[r=e.trim().replace(/\s+/g," ").toLowerCase()]?f[r]:r.includes("facta")?"FAA":r.includes("aacta")?"AAA":r.includes("afcta")?"AFA":r.includes("fcta")?"FSA":r.includes("acta")?"ASA":r.includes("corporate")?"CMA":null;if(!i)return console.error("Invalid membership category received:",e),null;let o=new Date,a=String(o.getFullYear()).slice(-2),n=String(o.getMonth()+1).padStart(2,"0"),l=`${i}${a}${n}`,s=[...t.individualApplications,...t.corporateApplications],p=0;for(let e of s){let t=e.registrationNumber;if("string"==typeof t&&t.startsWith(l)){let e=Number(t.slice(l.length));!Number.isNaN(e)&&Number.isInteger(e)&&e>p&&(p=e)}}let c=String(p+1).padStart(6,"0");return`${l}${c}`}(l,a);if(!s)return t.NextResponse.json({error:`Unable to generate a registration number for membership category: ${l}`},{status:400});let d={...o,id:"string"==typeof o.id&&o.id?o.id:crypto.randomUUID(),submittedAt:new Date().toISOString(),membershipCategory:l,registrationNumber:s};"individual"===i?a.individualApplications.push(d):a.corporateApplications.push(d),r.default.writeFileSync(u,JSON.stringify(a,null,2),"utf-8"),console.log("===================================="),console.log("Application saved successfully."),console.log("Application ID:",d.id),console.log("Membership Category:",l),console.log("Registration Number:",s),console.log("====================================");let m="individual"===i?o.fullName:o.registeredName,h="individual"===i?o.personalEmail:o.officialEmail,x=!1,A=!1,y=null;if("string"==typeof m&&m.trim()&&"string"==typeof h&&h.trim())try{console.log("------------------------------------"),console.log("APPLICATION EMAIL PROCESS STARTED"),console.log("Applicant name:",m),console.log("Applicant email:",h),console.log("Application type:",i),console.log("Registration number:",s),await p({name:m.trim(),email:h.trim(),applicationType:i,registrationNumber:s,membershipCategory:l}),x=!0,await c({name:m.trim(),email:h.trim(),applicationType:i,registrationNumber:s,membershipCategory:l}),A=!0,console.log("EMAIL PROCESS COMPLETED"),console.log("------------------------------------")}catch(e){console.error("EMAIL SENDING ERROR:",e),y=e instanceof Error?e.message:"Unknown email error"}else console.warn("Application saved, but applicant name or email was not available."),y="Applicant name or email was not available.";return t.NextResponse.json({success:!0,message:"Application saved successfully.",application:d,registrationNumber:s,emailStatus:{applicantEmailSent:x,adminEmailSent:A,error:y}},{status:201})}catch(e){return console.error("Application save error:",e),t.NextResponse.json({error:"Unable to save application."},{status:500})}}e.s(["GET",0,m,"POST",0,h,"runtime",0,"nodejs"],20246)}];

//# sourceMappingURL=_06u565p_e4zaj._.js.map