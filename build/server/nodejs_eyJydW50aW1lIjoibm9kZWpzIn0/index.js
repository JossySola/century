import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, Link, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, UNSAFE_withHydrateFallbackProps, Links, ScrollRestoration, Scripts, createCookieSessionStorage, useSubmit, useActionData, data } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { Analytics } from "@vercel/analytics/react";
import { Navbar, NavbarContent, NavbarMenuToggle, NavbarBrand, NavbarMenu, NavbarMenuItem, NavbarItem, useDisclosure, Card, CardHeader, User, CardBody, Image, Divider, CardFooter, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";
import { useState, useEffect, useMemo } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const appStylesHref = "/assets/app-BqWhL5zo.css";
function HeaderMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return /* @__PURE__ */ jsxs(Navbar, { onMenuOpenChange: setIsMenuOpen, children: [
    /* @__PURE__ */ jsx(NavbarContent, { children: /* @__PURE__ */ jsx(NavbarMenuToggle, { "aria-label": isMenuOpen ? "Close menu" : "Open menu", className: "sm:hidden" }) }),
    /* @__PURE__ */ jsx(NavbarContent, { justify: "center", children: /* @__PURE__ */ jsx(NavbarBrand, { children: /* @__PURE__ */ jsx("h1", { className: "title", children: "The 21st Century Times" }) }) }),
    /* @__PURE__ */ jsxs(NavbarMenu, { children: [
      /* @__PURE__ */ jsx(NavbarMenuItem, { children: /* @__PURE__ */ jsx(Link, { to: "#", className: "w-full", children: "Science" }) }),
      /* @__PURE__ */ jsx(NavbarItem, { children: /* @__PURE__ */ jsx(Link, { to: "#", className: "w-full", children: "Technology" }) }),
      /* @__PURE__ */ jsx(NavbarItem, { children: /* @__PURE__ */ jsx(Link, { to: "#", className: "w-full", children: "Sports" }) }),
      /* @__PURE__ */ jsx(NavbarItem, { children: /* @__PURE__ */ jsx(Link, { to: "#", className: "w-full", children: "Astronomy" }) }),
      /* @__PURE__ */ jsx(NavbarItem, { children: /* @__PURE__ */ jsx(Link, { to: "#", className: "w-full", children: "Gaming" }) })
    ] })
  ] });
}
const links = () => [{
  rel: "stylesheet",
  href: appStylesHref
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("link", {
        rel: "icon",
        type: "image/svg+xml",
        href: "/century.svg"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0"
      }), /* @__PURE__ */ jsx("meta", {
        name: "description",
        content: "Inspired by The New York Times, I present 'The 21st Century Times', working with the Reddit API, it features popular Subreddits dedicated to worldwide news, technology, sports, astronomy, science & gaming. The user is also able to search, upvote, downvote and comment on specific Subreddits."
      }), /* @__PURE__ */ jsx("meta", {
        property: "og:url",
        content: "https://www.centurytimes.jossysola.com/"
      }), /* @__PURE__ */ jsx("meta", {
        property: "og:type",
        content: "website"
      }), /* @__PURE__ */ jsx("meta", {
        property: "og:title",
        content: "The 21st Century Times"
      }), /* @__PURE__ */ jsx("meta", {
        property: "og:description",
        content: "Web Application using the Reddit API to display worldwide news and articles about technology, sports, astronomy, science and gaming. Searching subreddits is enabled."
      }), /* @__PURE__ */ jsx("meta", {
        property: "og:image",
        content: "https://centurytimes.jossysola.com/banner.png"
      }), /* @__PURE__ */ jsx("meta", {
        name: "twitter:card",
        content: "summary_large_image"
      }), /* @__PURE__ */ jsx("meta", {
        property: "twitter:domain",
        content: "centurytimes.jossysola.com"
      }), /* @__PURE__ */ jsx("meta", {
        property: "twitter:url",
        content: "https://www.centurytimes.jossysola.com/"
      }), /* @__PURE__ */ jsx("meta", {
        name: "twitter:title",
        content: "The 21st Century Times"
      }), /* @__PURE__ */ jsx("meta", {
        name: "twitter:description",
        content: "Web Application using the Reddit API to display worldwide news and articles about technology, sports, astronomy, science and gaming. Searching subreddits is enabled."
      }), /* @__PURE__ */ jsx("meta", {
        name: "twitter:image",
        content: "https://centurytimes.jossysola.com/banner.png"
      }), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      className: "flex flex-col items-center gap-3 p-3",
      children: [children, /* @__PURE__ */ jsx(Analytics, {}), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(HeaderMenu, {}), /* @__PURE__ */ jsx(Outlet, {})]
  });
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  } else if (error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack && /* @__PURE__ */ jsx("pre", {
      className: "w-full p-4 overflow-x-auto",
      children: /* @__PURE__ */ jsx("code", {
        children: stack
      })
    })]
  });
});
const HydrateFallback = UNSAFE_withHydrateFallbackProps(function HydrateFallback2() {
  return /* @__PURE__ */ jsx("p", {
    children: "Loading..."
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  HydrateFallback,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function Heart({ height = 16, width = 16, color = "currentColor" }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      "data-testid": "geist-icon",
      height,
      strokeLinejoin: "round",
      style: { color },
      viewBox: "0 0 16 16",
      width,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M7.06463 3.20474C5.79164 1.93175 3.72772 1.93175 2.45474 3.20474C1.18175 4.47773 1.18175 6.54166 2.45474 7.81465L8 13.3599L13.5453 7.81465C14.8182 6.54166 14.8182 4.47773 13.5453 3.20474C12.2723 1.93175 10.2084 1.93175 8.93537 3.20474L8.53033 3.60979L8 4.14012L7.46967 3.60979L7.06463 3.20474ZM8 2.02321C6.13348 0.286219 3.21165 0.326509 1.39408 2.14408C-0.464694 4.00286 -0.464691 7.01653 1.39408 8.87531L7.46967 14.9509L8 15.4812L8.53033 14.9509L14.6059 8.87531C16.4647 7.01653 16.4647 4.00286 14.6059 2.14408C12.7884 0.326509 9.86653 0.286221 8 2.02321Z",
          fill: "currentColor"
        }
      )
    }
  );
}
function HeartFill({ height = 16, width = 16, color = "currentColor" }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      "data-testid": "geist-icon",
      height,
      strokeLinejoin: "round",
      style: { color },
      viewBox: "0 0 16 16",
      width,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M1.39408 2.14408C3.21165 0.326509 6.13348 0.286219 8 2.02321C9.86652 0.286221 12.7884 0.326509 14.6059 2.14408C16.4647 4.00286 16.4647 7.01653 14.6059 8.87531L8 15.4812L1.39408 8.87531C-0.464691 7.01653 -0.464694 4.00286 1.39408 2.14408Z",
          fill: "currentColor"
        }
      )
    }
  );
}
function formatAmount(amount) {
  const amountAsString = amount !== null ? amount.toString() : "0";
  const length = amountAsString.length;
  let formatedAmount = "";
  if (length === 5) {
    formatedAmount += amountAsString[0];
    formatedAmount += amountAsString[1];
    formatedAmount += ".";
    formatedAmount += amountAsString[2];
    formatedAmount += "K";
    return formatedAmount;
  }
  if (length === 6) {
    formatedAmount += amountAsString[0];
    formatedAmount += amountAsString[1];
    formatedAmount += amountAsString[2];
    formatedAmount += ".";
    formatedAmount += amountAsString[3];
    formatedAmount += "K";
    return formatedAmount;
  }
  if (length > 6 && length < 10) {
    if (length === 7) {
      formatedAmount += amountAsString[0];
      formatedAmount += ".";
      formatedAmount += amountAsString[1];
      formatedAmount += "M";
      return formatedAmount;
    } else {
      let formatedString = amountAsString.slice(0, -5);
      formatedString += "M";
      return formatedString;
    }
  }
  if (length > 10) {
    let formatedString = amountAsString.slice(0, -9);
    formatedString += "B";
    return formatedString;
  }
  return amountAsString;
}
function PostCard({ author, subreddit, id, permalink, num_comments, selftext, subreddit_id, thumbnail, thumbnail_height, thumbnail_width, title, ups }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("button", { onClick: () => onOpen(), children: /* @__PURE__ */ jsxs(Card, { className: "w-full md:w-[532px] p-5", children: [
      /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-col gap-3 text-center", children: [
        /* @__PURE__ */ jsx(User, { name: author, description: subreddit }),
        /* @__PURE__ */ jsx("h4", { children: title })
      ] }),
      /* @__PURE__ */ jsxs(CardBody, { className: "flex flex-col justify-center items-center text-center", children: [
        thumbnail ? /* @__PURE__ */ jsx(Image, { src: thumbnail, width: thumbnail_width }) : null,
        /* @__PURE__ */ jsx("p", { children: selftext })
      ] }),
      /* @__PURE__ */ jsx(Divider, {}),
      /* @__PURE__ */ jsx(CardFooter, { className: "flex flex-row text-gray-500", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-center items-center gap-3", children: [
        ups > 0 ? /* @__PURE__ */ jsx(HeartFill, {}) : /* @__PURE__ */ jsx(Heart, {}),
        /* @__PURE__ */ jsx("span", { className: "", children: formatAmount(ups) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(
      Modal,
      {
        isOpen,
        placement: "top",
        size: "5xl",
        scrollBehavior: "inside",
        backdrop: "blur",
        onOpenChange,
        children: /* @__PURE__ */ jsx(ModalContent, { children: (onClose) => /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs(ModalHeader, { className: "flex flex-col justify-center items-start gap-3", children: [
            /* @__PURE__ */ jsx(User, { name: author, description: subreddit }),
            /* @__PURE__ */ jsx("h5", { children: title })
          ] }),
          /* @__PURE__ */ jsxs(ModalBody, { children: [
            thumbnail ? /* @__PURE__ */ jsx(Image, { src: thumbnail, width: thumbnail_width }) : null,
            /* @__PURE__ */ jsx("p", { children: selftext }),
            /* @__PURE__ */ jsx(Divider, {}),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-center items-center gap-3", children: [
              ups > 0 ? /* @__PURE__ */ jsx(HeartFill, {}) : /* @__PURE__ */ jsx(Heart, {}),
              /* @__PURE__ */ jsx("span", { className: "", children: formatAmount(ups) })
            ] })
          ] }),
          /* @__PURE__ */ jsx(ModalFooter, { children: /* @__PURE__ */ jsx(Button, { color: "primary", onPress: onClose, children: /* @__PURE__ */ jsx("span", { children: "Close" }) }) })
        ] }) })
      }
    )
  ] });
}
const { getSession, commitSession, destroySession } = createCookieSessionStorage(
  {
    cookie: {
      name: "__session",
      httpOnly: true,
      maxAge: 8400,
      path: "/",
      secure: true
    }
  }
);
async function loader({
  request
}) {
  const session = await getSession(request.headers.get("Cookie"));
  const access_token = session.has("access_token");
  if (!access_token) {
    const client_id = process.env.REDDIT_CLIENT_ID;
    const client_secret = process.env.REDDIT_CLIENT_SECRET;
    const encode = Buffer.from(client_id + ":" + client_secret).toString("base64");
    const req = await fetch("https://www.reddit.com/api/v1/access_token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${encode}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        scope: "*"
      })
    });
    if (req.status !== 200) {
      throw new Error("Failed at fetching subreddits");
    }
    const res = await req.json();
    session.set("access_token", res.access_token);
    return data({
      error: session.get("error")
    }, {
      headers: {
        "Set-Cookie": await commitSession(session)
      }
    });
  }
  return data({
    error: session.get("error")
  }, {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  });
}
const index = UNSAFE_withComponentProps(function Main({
  actionData
}) {
  const [data2, setData] = useState([]);
  const submit = useSubmit();
  const actionResult = useActionData();
  useEffect(() => {
    submit({}, {
      method: "POST"
    });
  }, [submit]);
  useEffect(() => {
    if (actionResult) {
      setData(actionResult);
    }
  }, [actionResult]);
  const posts = useMemo(() => data2 && data2.map((element, index2) => {
    return /* @__PURE__ */ jsx(PostCard, {
      author: element.data.author,
      id: element.data.id,
      permalink: element.data.permalink,
      num_comments: element.data.num_comments,
      selftext: element.data.selftext,
      subreddit: element.data.subreddit,
      subreddit_id: element.data.subreddit_id,
      thumbnail: element.data.thumbnail,
      thumbnail_height: element.data.thumbnail_height,
      thumbnail_width: element.data.thumbnail_width,
      title: element.data.title,
      ups: element.data.ups
    }, index2);
  }), data2);
  return posts;
});
async function action({
  request
}) {
  const session = await getSession(request.headers.get("Cookie"));
  const tokenCookie = session.get("access_token");
  const req = await fetch("https://www.reddit.com/r/worldnews.json?raw_json=1", {
    method: "GET",
    headers: {
      "Authorization": `${tokenCookie}`
    }
  });
  if (req.status !== 200) {
    throw new Error("Failed at fetching subreddits");
  }
  const response = await req.json();
  return response.data.children;
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  default: index,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CQub-_qe.js", "imports": ["/assets/index-CB8Hv3N3.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-C9_czZgo.js", "imports": ["/assets/index-CB8Hv3N3.js", "/assets/chunk-736YWA4T-DiDz-dEl.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/index": { "id": "routes/index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/index-cButzsxB.js", "imports": ["/assets/index-CB8Hv3N3.js", "/assets/chunk-736YWA4T-DiDz-dEl.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-ecddcb0a.js", "version": "ecddcb0a", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
