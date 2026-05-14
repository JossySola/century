import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, Form, useFetcher, Link, NavLink, createCookieSessionStorage, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, UNSAFE_withHydrateFallbackProps, Links, ScrollRestoration, Scripts, data, useParams, useOutletContext } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { Analytics } from "@vercel/analytics/react";
import { Input, Button, Dropdown, DropdownTrigger, Badge, Avatar, DropdownMenu, DropdownItem, User, Navbar, NavbarContent, NavbarMenuToggle, NavbarBrand, NavbarItem, NavbarMenu, NavbarMenuItem, Divider, Spinner, HeroUIProvider, ToastProvider, Card, CardBody, useDisclosure, addToast, Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, CardHeader, CardFooter, Modal, ModalContent, ModalHeader, ModalBody, Image, ModalFooter } from "@heroui/react";
import { useState, useEffect, memo, useRef, useMemo } from "react";
import { motion } from "motion/react";
import { v4 } from "uuid";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
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
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const appStylesHref = "/assets/app-BR4Fubgf.css";
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
function Message({ height = 16, width = 16, color = "currentColor" }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      "data-testid": "geist-icon",
      height,
      strokeLinejoin: "round",
      viewBox: "0 0 16 16",
      width,
      style: { color },
      children: /* @__PURE__ */ jsx(
        "path",
        {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M2.8914 10.4028L2.98327 10.6318C3.22909 11.2445 3.5 12.1045 3.5 13C3.5 13.3588 3.4564 13.7131 3.38773 14.0495C3.69637 13.9446 4.01409 13.8159 4.32918 13.6584C4.87888 13.3835 5.33961 13.0611 5.70994 12.7521L6.22471 12.3226L6.88809 12.4196C7.24851 12.4724 7.61994 12.5 8 12.5C11.7843 12.5 14.5 9.85569 14.5 7C14.5 4.14431 11.7843 1.5 8 1.5C4.21574 1.5 1.5 4.14431 1.5 7C1.5 8.18175 1.94229 9.29322 2.73103 10.2153L2.8914 10.4028ZM2.8135 15.7653C1.76096 16 1 16 1 16C1 16 1.43322 15.3097 1.72937 14.4367C1.88317 13.9834 2 13.4808 2 13C2 12.3826 1.80733 11.7292 1.59114 11.1903C0.591845 10.0221 0 8.57152 0 7C0 3.13401 3.58172 0 8 0C12.4183 0 16 3.13401 16 7C16 10.866 12.4183 14 8 14C7.54721 14 7.10321 13.9671 6.67094 13.9038C6.22579 14.2753 5.66881 14.6656 5 15C4.23366 15.3832 3.46733 15.6195 2.8135 15.7653Z",
          fill: "currentColor"
        }
      )
    }
  );
}
function BookOpen({ height = 16, width = 16, color = "currentColor" }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      "data-testid": "geist-icon",
      height,
      strokeLinejoin: "round",
      viewBox: "0 0 16 16",
      width,
      style: { color },
      children: /* @__PURE__ */ jsx(
        "path",
        {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M0 1H0.75H5C6.2267 1 7.31583 1.58901 8 2.49963C8.68417 1.58901 9.7733 1 11 1H15.25H16V1.75V13V13.75H15.25H10.7426C10.1459 13.75 9.57361 13.9871 9.15165 14.409L8.53033 15.0303H7.46967L6.84835 14.409C6.42639 13.9871 5.8541 13.75 5.25736 13.75H0.75H0V13V1.75V1ZM7.25 4.75C7.25 3.50736 6.24264 2.5 5 2.5H1.5V12.25H5.25736C5.96786 12.25 6.65758 12.4516 7.25 12.8232V4.75ZM8.75 12.8232V4.75C8.75 3.50736 9.75736 2.5 11 2.5H14.5V12.25H10.7426C10.0321 12.25 9.34242 12.4516 8.75 12.8232Z",
          fill: "currentColor"
        }
      )
    }
  );
}
function TechnologyTopic() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      fill: "currentColor",
      height: "16",
      "icon-name": "topic-technology-outline",
      viewBox: "0 0 20 20",
      width: "16",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M11.875 7h-3.75A1.127 1.127 0 0 0 7 8.125v3.75A1.127 1.127 0 0 0 8.125 13h3.75A1.127 1.127 0 0 0 13 11.875v-3.75A1.127 1.127 0 0 0 11.875 7Zm-.125 4.75h-3.5v-3.5h3.5v3.5Z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M19 7.625v-1.25h-2v-1.75A1.627 1.627 0 0 0 15.375 3h-1.75V1h-1.25v2h-1.75V1h-1.25v2h-1.75V1h-1.25v2h-1.75A1.627 1.627 0 0 0 3 4.625v1.75H1v1.25h2v1.75H1v1.25h2v1.75H1v1.25h2v1.75A1.627 1.627 0 0 0 4.625 17h1.75v2h1.25v-2h1.75v2h1.25v-2h1.75v2h1.25v-2h1.75A1.627 1.627 0 0 0 17 15.375v-1.75h2v-1.25h-2v-1.75h2v-1.25h-2v-1.75h2Zm-3.25 7.75a.375.375 0 0 1-.375.375H4.625a.375.375 0 0 1-.375-.375V4.625a.375.375 0 0 1 .375-.375h10.75a.375.375 0 0 1 .375.375v10.75Z"
          }
        )
      ]
    }
  );
}
function GamesTopic() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      fill: "currentColor",
      height: "16",
      "icon-name": "topic-videogaming-outline",
      viewBox: "0 0 20 20",
      width: "16",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsx("path", { d: "M19.929 14.17 18.277 6.6a4.631 4.631 0 0 0-4.52-3.6H5.702a4.623 4.623 0 0 0-4.58 3.908L.034 14.387a3.134 3.134 0 0 0 .735 2.5 3.227 3.227 0 0 0 5.553-1.284l.39-1.635h5.794l.39 1.635A3.2 3.2 0 0 0 16.01 18h.782a3.211 3.211 0 0 0 3.123-2.444c.109-.455.114-.929.015-1.386Zm-1.6 1.85a1.964 1.964 0 0 1-1.54.73h-.781a1.947 1.947 0 0 1-1.9-1.453l-.63-2.476H5.74L5.11 15.3a1.947 1.947 0 0 1-1.9 1.453 1.974 1.974 0 0 1-1.5-.678 1.862 1.862 0 0 1-.443-1.506l1.09-7.481A3.366 3.366 0 0 1 5.7 4.25h8.062a3.373 3.373 0 0 1 3.3 2.614l1.65 7.573a1.877 1.877 0 0 1-.383 1.583h-.001Z" }),
        /* @__PURE__ */ jsx("path", { d: "M6.256 6.212h-1.25v1.776h-1.73v1.25h1.73v1.622h1.25V9.238h1.73v-1.25h-1.73V6.212Z" }),
        /* @__PURE__ */ jsx("path", { d: "M11.82 8.81a1 1 0 1 0 1.71.71 1.001 1.001 0 0 0-.3-.71 1.034 1.034 0 0 0-1.41 0Z" }),
        /* @__PURE__ */ jsx("path", { d: "M15.23 6.85a.875.875 0 0 0-.32-.22c-.246-.1-.522-.1-.77 0a.875.875 0 0 0-.32.22.975.975 0 0 0 0 1.41 1 1 0 0 0 1.41 0 1.03 1.03 0 0 0 .22-1.09.877.877 0 0 0-.22-.32Z" })
      ]
    }
  );
}
function SportsTopic() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      fill: "currentColor",
      height: "16",
      "icon-name": "topic-sports-outline",
      viewBox: "0 0 20 20",
      width: "16",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ jsx("path", { d: "M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0ZM4.124 16.465l1.259-3.007a9.906 9.906 0 0 0 .261-6.964l-1.186.4a8.656 8.656 0 0 1-.228 6.087l-1.046 2.5a8.75 8.75 0 1 1 13.632 0l-1.046-2.5a8.653 8.653 0 0 1-.228-6.086l-1.186-.4a9.906 9.906 0 0 0 .261 6.964l1.259 3.007a8.7 8.7 0 0 1-11.752-.001Z" })
    }
  );
}
function SciencesTopic() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      fill: "currentColor",
      height: "16",
      "icon-name": "topic-science-outline",
      viewBox: "0 0 20 20",
      width: "16",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ jsx("path", { d: "M18.757 18.392a2.555 2.555 0 0 1-2.345 1.522H3.587a2.555 2.555 0 0 1-2.345-1.523 2.628 2.628 0 0 1 .411-2.842l4.292-5.5L6 9.981V4.124h1.25V10.1a1.114 1.114 0 0 1-.332.732l-4.3 5.51a1.408 1.408 0 0 0-.237 1.529 1.3 1.3 0 0 0 1.207.79h12.825a1.3 1.3 0 0 0 1.208-.79 1.392 1.392 0 0 0-.215-1.5l-4.43-5.549a1.117 1.117 0 0 1-.276-.722V4.124h1.25V10.1l4.415 5.47a2.615 2.615 0 0 1 .392 2.822ZM13.974 1H6v1.25h7.974V1Z" })
    }
  );
}
function SpookyTopic() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      fill: "currentColor",
      height: "16",
      "icon-name": "topic-meta-outline",
      viewBox: "0 0 20 20",
      width: "16",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ jsx("path", { d: "M3.994 14.88c.423.08.85.145 1.278.2l-1.207 2.7-1.14-.51 1.069-2.39Zm10.53.23L16 17.806l1.1-.6-1.259-2.3a24.25 24.25 0 0 1-1.317.202Zm-5.149.26v3.38h1.25v-3.38c-.22 0-.432.005-.625.005s-.4-.002-.625-.005ZM20 11.02C20 13.376 13.459 14 10 14c-3.459 0-10-.623-10-2.98a4.82 4.82 0 0 1 3.5-3.7l.149-.035v-.04a6.355 6.355 0 0 1 12.708 0v.036l.149.034A4.82 4.82 0 0 1 20 11.02Zm-1.25 0a3.783 3.783 0 0 0-2.53-2.485l-.256-.06H15.1v-1.23a5.105 5.105 0 0 0-10.208 0v.527c.308.32 2.074.891 5.1.891 1.012.006 2.023-.07 3.023-.225l.618-.1.2 1.234-.616.1c-1.064.166-2.14.246-3.217.241-.57 0-5.018-.045-6.111-1.405l-.109.025a3.781 3.781 0 0 0-2.53 2.486c.082.475 2.9 1.731 8.75 1.731s8.668-1.256 8.75-1.733v.002Z" })
    }
  );
}
function Logout({ height = 16, width = 16, color = "currentColor" }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      "data-testid": "geist-icon",
      height,
      strokeLinejoin: "round",
      viewBox: "0 0 16 16",
      width,
      style: { color },
      children: /* @__PURE__ */ jsx(
        "path",
        {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M2.5 13.5H6.75V15H2C1.44772 15 1 14.5523 1 14V2C1 1.44771 1.44772 1 2 1H6.75V2.5L2.5 2.5L2.5 13.5ZM12.4393 7.24999L10.4697 5.28031L9.93934 4.74998L11 3.68932L11.5303 4.21965L14.6036 7.29288C14.9941 7.6834 14.9941 8.31657 14.6036 8.70709L11.5303 11.7803L11 12.3106L9.93934 11.25L10.4697 10.7197L12.4393 8.74999L5.75 8.74999H5V7.24999H5.75L12.4393 7.24999Z",
          fill: "currentColor"
        }
      )
    }
  );
}
const Logo = "/Reddit_Logo_Wordmark_OrangeRed.svg";
function Search() {
  const [value, setValue] = useState("");
  return /* @__PURE__ */ jsxs(Form, { action: "/", method: "post", className: "w-full flex flex-row gap-3 justify-center items-center", children: [
    /* @__PURE__ */ jsx(
      Input,
      {
        autoComplete: "off",
        label: "Search on Reddit",
        name: "query",
        variant: "underlined",
        value,
        onValueChange: setValue,
        classNames: {
          label: "text-sm font-sans",
          input: "h-full font-['Arial'] text-lg"
        }
      }
    ),
    /* @__PURE__ */ jsx(Button, { color: "primary", type: "submit", size: "sm", children: /* @__PURE__ */ jsx("span", { className: "text-lg", children: "Go" }) })
  ] });
}
function RedditSignDropdown() {
  const fetcher = useFetcher();
  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    fetcher.load("/api/me");
    console.log("Loading user info from /api/me", fetcher.data);
  }, []);
  useEffect(() => {
    if (fetcher.data) {
      console.log("Fetcher data for user info:", fetcher.data);
      setName(fetcher.data.user || "");
      setDisplayName(fetcher.data.displayName || "");
      setAvatar(fetcher.data.avatar || "");
    }
  }, [fetcher.data]);
  return /* @__PURE__ */ jsxs(Dropdown, { children: [
    /* @__PURE__ */ jsx(DropdownTrigger, { children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      Badge,
      {
        color: name ? "success" : "default",
        content: "",
        placement: "bottom-right",
        size: "sm",
        shape: "circle",
        children: /* @__PURE__ */ jsx(Avatar, { as: "button", className: "w-8 h-8", src: "Reddit_Icon_FullColor.webp" })
      }
    ) }) }),
    /* @__PURE__ */ jsx(
      DropdownMenu,
      {
        "aria-label": "Static Actions",
        children: name ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(DropdownItem, { className: "data-[hover=true]:bg-transparent", children: /* @__PURE__ */ jsx(
            User,
            {
              avatarProps: {
                src: avatar
              },
              description: displayName ?? "",
              name
            }
          ) }, "user-info"),
          /* @__PURE__ */ jsx(DropdownItem, { className: "data-[hover=true]:bg-transparent", children: /* @__PURE__ */ jsx(
            Button,
            {
              className: "w-full bg-[#FF4500] text-white hover:bg-[#e03d02] active:bg-[#B32D00] focus:ring-[#FF4500] font-medium",
              radius: "full",
              endContent: /* @__PURE__ */ jsx(Logout, {}),
              onPress: async () => {
                await fetch("/api/signout", { method: "POST" });
                window.location.reload();
              },
              children: "Sign out"
            }
          ) }, "sign-out")
        ] }) : /* @__PURE__ */ jsx(DropdownItem, { className: "data-[hover=true]:bg-transparent", children: /* @__PURE__ */ jsx(
          Button,
          {
            className: "w-full bg-[#D93900] text-white hover:bg-[#e03d02] active:bg-[#B32D00] focus:ring-[#FF4500] font-medium",
            radius: "full",
            onPress: async () => {
              const endpoint = await fetch("/api/authorize", { method: "POST" });
              const response = await endpoint.json();
              window.location.href = response.endpoint;
            },
            children: "Sign in with Reddit"
          }
        ) }, "sign-in")
      }
    )
  ] });
}
function HeaderMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return /* @__PURE__ */ jsxs(Navbar, { onMenuOpenChange: setIsMenuOpen, children: [
    /* @__PURE__ */ jsxs(NavbarContent, { justify: "end", children: [
      /* @__PURE__ */ jsx(
        NavbarMenuToggle,
        {
          "aria-label": isMenuOpen ? "Close menu" : "Open menu",
          className: "sm:hidden"
        }
      ),
      /* @__PURE__ */ jsx(NavbarBrand, { children: /* @__PURE__ */ jsx(Link, { to: "/", className: "w-full text-center", children: /* @__PURE__ */ jsx("h1", { className: "title text-[6.5vw] sm:text-[2.25rem]", children: "The 21st Century Times" }) }) }),
      /* @__PURE__ */ jsx(NavbarItem, { children: /* @__PURE__ */ jsx(RedditSignDropdown, {}) })
    ] }),
    /* @__PURE__ */ jsxs(NavbarMenu, { className: "pt-10 gap-3", children: [
      /* @__PURE__ */ jsx(Search, {}),
      /* @__PURE__ */ jsx(NavbarMenuItem, { children: /* @__PURE__ */ jsxs(Link, { to: "space", prefetch: "viewport", className: "w-full font-semibold text-2xl inline-flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(SpookyTopic, {}),
        " Space"
      ] }) }),
      /* @__PURE__ */ jsx(NavbarItem, { children: /* @__PURE__ */ jsxs(Link, { to: "gaming", prefetch: "viewport", className: "w-full font-semibold text-2xl inline-flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(GamesTopic, {}),
        " Gaming"
      ] }) }),
      /* @__PURE__ */ jsx(NavbarItem, { children: /* @__PURE__ */ jsxs(Link, { to: "science", prefetch: "viewport", className: "w-full font-semibold text-2xl inline-flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(SciencesTopic, {}),
        " Science"
      ] }) }),
      /* @__PURE__ */ jsx(NavbarItem, { children: /* @__PURE__ */ jsxs(Link, { to: "sports", prefetch: "viewport", className: "w-full font-semibold text-2xl inline-flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(SportsTopic, {}),
        " Sports"
      ] }) }),
      /* @__PURE__ */ jsx(NavbarItem, { children: /* @__PURE__ */ jsxs(Link, { to: "tech", prefetch: "viewport", className: "w-full font-semibold text-2xl inline-flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(TechnologyTopic, {}),
        " Tech"
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "w-full mt-5 inline-flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xl", children: "Powered with " }),
        /* @__PURE__ */ jsx("img", { src: Logo, width: 64, alt: "Reddit Wordmark" })
      ] })
    ] })
  ] });
}
function NavList() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 mt-3 mb-3 w-full items-center", children: [
      /* @__PURE__ */ jsx(Divider, {}),
      /* @__PURE__ */ jsx(Divider, {})
    ] }),
    /* @__PURE__ */ jsxs("ul", { className: "flex gap-5 justify-center items-center", children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        NavLink,
        {
          preventScrollReset: true,
          to: "space",
          prefetch: "intent",
          className: ({ isActive, isPending }) => isActive ? "pb-2 border-b-4 border-b-gray-700" : isPending ? "pb-2 border-b-4 transparent" : "",
          children: "Space"
        }
      ) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        NavLink,
        {
          preventScrollReset: true,
          to: "gaming",
          prefetch: "intent",
          className: ({ isActive, isPending }) => isActive ? "pb-2 border-b-4 border-b-gray-700" : isPending ? "pb-2 border-b-4 transparent" : "",
          children: "Gaming"
        }
      ) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        NavLink,
        {
          preventScrollReset: true,
          to: "science",
          prefetch: "intent",
          className: ({ isActive, isPending }) => isActive ? "pb-2 border-b-4 border-b-gray-700" : isPending ? "pb-2 border-b-4 transparent" : "",
          children: "Science"
        }
      ) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        NavLink,
        {
          preventScrollReset: true,
          to: "sports",
          prefetch: "intent",
          className: ({ isActive, isPending }) => isActive ? "pb-2 border-b-4 border-b-gray-700" : isPending ? "pb-2 border-b-4 transparent" : "",
          children: "Sports"
        }
      ) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        NavLink,
        {
          preventScrollReset: true,
          to: "tech",
          prefetch: "intent",
          className: ({ isActive, isPending }) => isActive ? "pb-2 border-b-4 border-b-gray-700" : isPending ? "pb-2 border-b-4 transparent" : "",
          children: "Tech"
        }
      ) })
    ] })
  ] });
}
const { getSession, commitSession, destroySession } = createCookieSessionStorage(
  {
    cookie: {
      name: "__session",
      httpOnly: true,
      maxAge: 86400,
      path: "/",
      secure: true,
      secrets: [process.env.SESSION_SECRET]
    }
  }
);
const links = () => [{
  rel: "stylesheet",
  href: appStylesHref
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("title", {
        children: "The 21st Century Times"
      }), /* @__PURE__ */ jsx("link", {
        rel: "icon",
        type: "image/svg+xml",
        href: "/century.svg"
      }), /* @__PURE__ */ jsx("meta", {
        charSet: "UTF-8"
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
      children: [/* @__PURE__ */ jsxs(HeroUIProvider, {
        children: [/* @__PURE__ */ jsx(ToastProvider, {
          placement: "bottom-center",
          toastProps: {
            classNames: {
              title: "font-['Arial']",
              description: "font-['Arial']"
            }
          }
        }), children]
      }), /* @__PURE__ */ jsx(Analytics, {}), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App({
  actionData
}) {
  return /* @__PURE__ */ jsxs("main", {
    className: "flex flex-col items-center gap-3 pb-10",
    children: [/* @__PURE__ */ jsx(HeaderMenu, {}), /* @__PURE__ */ jsxs("nav", {
      className: "sm:block hidden my-5",
      children: [/* @__PURE__ */ jsx(Search, {}), /* @__PURE__ */ jsx(NavList, {})]
    }), /* @__PURE__ */ jsx(Outlet, {
      context: actionData
    }), /* @__PURE__ */ jsxs("div", {
      className: "w-full mt-5 flex flex-row justify-center items-center gap-3",
      children: [/* @__PURE__ */ jsx("span", {
        className: "text-xl text-gray-600",
        children: "Powered with "
      }), /* @__PURE__ */ jsx("img", {
        src: Logo,
        width: 64,
        alt: "Reddit Wordmark"
      })]
    }), /* @__PURE__ */ jsx("footer", {
      className: "fixed bottom-0 p-y-5 w-full z-15 backdrop-blur-sm",
      children: /* @__PURE__ */ jsx("p", {
        className: "font-['Arial'] w-full text-center",
        children: "Made with ❤️ in Mexico"
      })
    })]
  });
});
async function loader$c({
  request
}) {
  const session = await getSession(request.headers.get("Cookie"));
  const access_token = session.has("access_token");
  const url = new URL(request.url);
  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");
  if (!access_token) {
    const client_id = process.env.REDDIT_CLIENT_ID;
    const client_secret = process.env.REDDIT_CLIENT_SECRET;
    const encode = Buffer.from(client_id + ":" + client_secret).toString("base64");
    const req = await fetch("https://www.reddit.com/api/v1/access_token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${encode}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "centurytimes/2.1.0"
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        scope: "vote identity read submit edit"
      })
    });
    if (req.status !== 200) {
      throw new Error("Failed at getting a token");
    }
    const res = await req.json();
    session.set("access_token", res.access_token);
    session.set("access_mode", "userless");
    session.set("access_expires_in", (Date.now() + res.expires_in * 1e3).toString());
    return data({
      error: session.get("error")
    }, {
      headers: {
        "Set-Cookie": await commitSession(session)
      }
    });
  }
  const access_mode = session.get("access_mode");
  if (code && access_mode !== "authorized" && state === "x") {
    const client_id = process.env.REDDIT_CLIENT_ID;
    const client_secret = process.env.REDDIT_CLIENT_SECRET;
    const encode = Buffer.from(client_id + ":" + client_secret).toString("base64");
    const req = await fetch("https://www.reddit.com/api/v1/access_token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${encode}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "centurytimes/2.1.0"
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: "http://localhost:5173"
      })
    });
    if (req.status !== 200) {
      throw new Error("Failed at getting a authorized token");
    }
    const res = await req.json();
    session.set("access_token", res.access_token);
    session.set("access_mode", "authorized");
    session.set("access_expires_in", res.expires_in);
    session.set("refresh_token", res.refresh_token);
    return data({
      error: session.get("error")
    }, {
      headers: {
        "Set-Cookie": await commitSession(session)
      }
    });
  }
  const expiry = session.get("access_expires_in");
  if (expiry && Date.now() >= parseInt(expiry)) {
    if (access_mode === "authorized") {
      const refresh_token = session.get("refresh_token");
      if (refresh_token) {
        const client_id = process.env.REDDIT_CLIENT_ID;
        const client_secret = process.env.REDDIT_CLIENT_SECRET;
        const encode = Buffer.from(client_id + ":" + client_secret).toString("base64");
        const req = await fetch("https://www.reddit.com/api/v1/access_token", {
          method: "POST",
          headers: {
            Authorization: `Basic ${encode}`,
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "centurytimes/2.1.0"
          },
          body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token
          })
        });
        if (req.status !== 200) {
          throw new Error("Failed at getting a refresh token");
        }
        const res = await req.json();
        session.set("access_token", res.access_token);
        session.set("access_mode", "authorized");
        session.set("access_expires_in", res.expires_in);
        session.set("refresh_token", res.refresh_token);
        return data({
          error: session.get("error")
        }, {
          headers: {
            "Set-Cookie": await commitSession(session)
          }
        });
      }
    } else {
      const token = session.get("access_token");
      const client_id = process.env.REDDIT_CLIENT_ID;
      const client_secret = process.env.REDDIT_CLIENT_SECRET;
      const encode = Buffer.from(client_id + ":" + client_secret).toString("base64");
      const req = await fetch("https://www.reddit.com/api/v1/access_token", {
        method: "POST",
        headers: {
          Authorization: `Basic ${encode}`,
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "centurytimes/2.1.0"
        },
        body: new URLSearchParams({
          grant_type: `refresh_token&refresh_token=${token}`,
          scope: "*"
        })
      });
      if (req.status !== 200) {
        throw new Error("Failed at getting a token");
      }
      const res = await req.json();
      session.set("access_token", res.access_token);
      session.set("access_mode", "userless");
      session.set("access_expires_in", (Date.now() + res.expires_in * 1e3).toString());
      return data({
        error: session.get("error")
      }, {
        headers: {
          "Set-Cookie": await commitSession(session)
        }
      });
    }
  }
}
async function action$3({
  request
}) {
  const formData = await request.formData();
  const query = formData.get("query");
  const session = await getSession(request.headers.get("Cookie"));
  const access_token = session.get("access_token");
  if (!query) {
    throw new Error("No query provided");
  }
  if (!access_token) {
    throw new Error("No token");
  }
  const endpoint = new URL("https://oauth.reddit.com/subreddits/search");
  const params = new URLSearchParams(endpoint.search);
  params.append("limit", "15");
  params.append("show", "all");
  params.append("show_users", "true");
  params.append("sort", "relevance");
  params.append("typeahead_active", "None");
  params.append("q", `${query.toString()}`);
  endpoint.search = params.toString();
  const req = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${access_token}`,
      "User-Agent": "centurytimes/2.1.0",
      "Content-Type": "application/json"
    }
  });
  if (req.status !== 200) {
    console.error(req.statusText);
    console.error(req.status);
    throw new Error("Error while searching query");
  }
  const response = await req.json();
  return response;
}
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  } else if (error && error instanceof Error) {
    details = error.message;
    error.stack;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "flex flex-col items-center gap-3 pb-10",
    children: [/* @__PURE__ */ jsx(HeaderMenu, {}), /* @__PURE__ */ jsxs("nav", {
      className: "sm:block hidden my-5",
      children: [/* @__PURE__ */ jsx(Search, {}), /* @__PURE__ */ jsx(NavList, {})]
    }), /* @__PURE__ */ jsxs("section", {
      className: "font-['Arial'] w-full h-[50vh] flex flex-col justify-center items-center text-2xl text-center gap-3",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "font-['Arial']",
        children: message
      }), /* @__PURE__ */ jsx("p", {
        children: "An error has occurred 😓"
      }), /* @__PURE__ */ jsx("p", {
        children: "Sometimes Reddit gets tired of sending data 😒"
      }), /* @__PURE__ */ jsx("p", {
        children: "Please give it some minutes and try again 🙏"
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "w-full mt-5 flex flex-row justify-center items-center gap-3 fixed bottom-10",
      children: [/* @__PURE__ */ jsx("span", {
        className: "text-xl text-gray-600",
        children: "Powered with "
      }), /* @__PURE__ */ jsx("img", {
        src: Logo,
        width: 64,
        alt: "Reddit Wordmark"
      })]
    }), /* @__PURE__ */ jsx("footer", {
      className: "fixed bottom-0 p-y-5 w-full z-15 backdrop-blur-sm",
      children: /* @__PURE__ */ jsx("p", {
        className: "font-['Arial'] w-full text-center",
        children: "Made with ❤️ in Mexico"
      })
    })]
  });
});
const HydrateFallback$8 = UNSAFE_withHydrateFallbackProps(function HydrateFallback() {
  return /* @__PURE__ */ jsx(Spinner, {
    size: "lg",
    color: "primary",
    label: "Loading..."
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  HydrateFallback: HydrateFallback$8,
  Layout,
  action: action$3,
  default: root,
  links,
  loader: loader$c
}, Symbol.toStringTag, { value: "Module" }));
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
const avatarCache = {};
const T1 = memo(({ comment, isOpen, index, fullname }) => {
  const [image, setImage] = useState("");
  const fetcher = useFetcher();
  useEffect(() => {
    if (!isOpen) return;
    if (comment.kind !== "t1") return;
    const author = comment.data.author;
    if (!author) return;
    if (author === "[deleted]") return;
    if (avatarCache[author]) {
      setImage(avatarCache[author]);
      return;
    }
    const timer = setTimeout(() => fetcher.load(`/api/author/${author}`), index * 500);
    return () => clearTimeout(timer);
  }, [isOpen, comment.data.author, comment.kind]);
  useEffect(() => {
    if (fetcher.data) {
      const data2 = fetcher.data;
      if (typeof data2 === "string") {
        return;
      }
      const author = comment.data.author;
      const url = data2.data.snoovatar_img.replace(/&amp;/g, "&");
      if (author && url) {
        avatarCache[author] = url;
        setImage(url);
      }
    }
  }, [fetcher.data, comment.data.author]);
  return /* @__PURE__ */ jsx(motion.div, { initial: { scale: 0.5 }, animate: { scale: 1 }, className: "w-full m-3", children: /* @__PURE__ */ jsx(Card, { className: "p-5", children: /* @__PURE__ */ jsx(CardBody, { children: /* @__PURE__ */ jsxs("div", { className: "grid grid-flow-row grid-rows-[auto_auto_auto] grid-cols-1 gap-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "col-span-1 row-start-1 row-span-1 flex flex-row gap-3", children: [
      /* @__PURE__ */ jsx(Avatar, { size: "sm", src: image ?? void 0 }),
      /* @__PURE__ */ jsx("span", { className: "font-semibold", children: comment.data.author })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "col-span-1 row-start-2 row-span-1 flex flex-row gap-3", children: /* @__PURE__ */ jsx("p", { className: "font-['Arial']", children: comment.data.body }) }),
    /* @__PURE__ */ jsxs("div", { className: "col-span-1 row-start-3 row-span-1 flex flex-row gap-3", children: [
      /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center justify-center gap-3", children: [
        /* @__PURE__ */ jsx(Heart, {}),
        " ",
        comment.data.ups,
        " "
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center justify-center gap-3", children: [
        /* @__PURE__ */ jsx(Message, {}),
        " ",
        comment.data.replies ? comment.data.replies.data.children.length : 0,
        " "
      ] })
    ] })
  ] }) }) }) });
});
function Comments({ num_comments, comments }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [feed, setFeed] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const children = comments && comments.data ? comments.data.children : [];
  const loadingRef = useRef(null);
  const scrollableRef = useRef(null);
  const scrollPositionRef = useRef(0);
  useEffect(() => {
    if (!isOpen) return;
    if (comments && children) {
      if (num_comments && children.length < num_comments) {
        addToast({
          title: "Some comments may not be displayed because the user or comment has been deleted.",
          color: "warning",
          size: "lg"
        });
      }
    }
  }, [isOpen]);
  useEffect(() => {
    if (!comments) return;
    if (feed.length > 0) return;
    loadComments();
  }, [children.length]);
  useEffect(() => {
    if (!isOpen) return;
    if (!scrollableRef.current || !loadingRef.current) return;
    const observer = new IntersectionObserver(
      ([entry2]) => {
        if (entry2.isIntersecting) {
          loadComments();
        }
      },
      {
        root: scrollableRef.current,
        threshold: 1
      }
    );
    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }
    return () => observer.disconnect();
  }, [isOpen, feed.length]);
  useEffect(() => {
    if (!isLoading) {
      requestAnimationFrame(() => {
        restoreScrollPosition();
      });
    }
  }, [feed, isLoading]);
  const loadComments = () => {
    setIsLoading(true);
    saveScrollPosition();
    setFeed((prev) => {
      const diff = children.length - prev.length;
      if (children.length && children.length <= 5 || diff < 5) {
        return children;
      }
      const count = prev.length + 5;
      return children.slice(0, count);
    });
    setIsLoading(false);
  };
  const saveScrollPosition = () => {
    if (scrollableRef.current) {
      scrollPositionRef.current = scrollableRef.current.scrollTop;
    }
  };
  const restoreScrollPosition = () => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop = scrollPositionRef.current;
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Button, { onPress: onOpen, isDisabled: num_comments === 0, size: "lg", className: "w-full flex flex-row p-2", color: "danger", children: [
      /* @__PURE__ */ jsx("span", { className: "text-lg", children: "Read comments " }),
      /* @__PURE__ */ jsx(BookOpen, { width: 20, height: 20 })
    ] }),
    /* @__PURE__ */ jsx(Drawer, { isOpen, onOpenChange, placement: "bottom", size: "lg", children: /* @__PURE__ */ jsx(DrawerContent, { children: (onClose) => /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(DrawerHeader, {}),
      /* @__PURE__ */ jsx(DrawerBody, { children: /* @__PURE__ */ jsxs("div", { ref: scrollableRef, className: "flex flex-col-reverse items-center overflow-y-auto h-full p-x-5 pb-5", children: [
        isLoading && /* @__PURE__ */ jsx(Spinner, { size: "lg", color: "primary" }),
        /* @__PURE__ */ jsx("section", { className: "w-5/6 max-w-[95%] flex flex-col-reverse justify-center items-center gap-2", children: feed ? feed.map((comment, index) => {
          if (comment.kind === "t1") {
            return /* @__PURE__ */ jsx(
              T1,
              {
                comment,
                isOpen,
                index,
                fullname: comment.data.name
              },
              comment.data.id
            );
          }
        }) : /* @__PURE__ */ jsx("span", { children: "No comments yet" }) }),
        comments && comments.data && comments.data.children && comments.data.children.length !== feed.length && /* @__PURE__ */ jsx("div", { ref: loadingRef, className: "flex flex-row justify-center items-center w-full h-fit mb-10", children: /* @__PURE__ */ jsx(Spinner, { variant: "wave", color: "primary", size: "lg" }) })
      ] }) }),
      /* @__PURE__ */ jsx(DrawerFooter, { children: /* @__PURE__ */ jsx(Button, { onPress: onClose, children: /* @__PURE__ */ jsx("span", { children: "Close" }) }) })
    ] }) }) })
  ] });
}
function HeartButton({ vote, setVote, id }) {
  useParams();
  const fetcher = useFetcher();
  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.endpoint) {
        window.sessionStorage.setItem("x-century-pending-action", JSON.stringify({
          action: "vote",
          id,
          payload: vote
        }));
        window.location.href = fetcher.data.endpoint;
      } else if (fetcher.data.error) {
        console.error("Error processing vote:", fetcher.data.error);
      } else {
        setVote((prev) => prev === "1" ? "0" : "1");
      }
    }
  }, [fetcher.data]);
  const handleClick = () => {
    fetcher.submit({}, {
      method: "post",
      action: `/api/upvote/${id}/${vote}`
    });
  };
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      onClick: handleClick,
      className: "cursor-pointer",
      whileTap: { scale: 1.5 },
      children: vote === "1" ? /* @__PURE__ */ jsx(HeartFill, { color: "oklch(57.7% 0.245 27.325)" }) : /* @__PURE__ */ jsx(Heart, {})
    }
  );
}
const T3 = memo(function T32({
  author,
  subreddit,
  id,
  permalink,
  num_comments,
  selftext = "",
  subreddit_id,
  thumbnail,
  thumbnail_height,
  thumbnail_width,
  title,
  ups,
  likes,
  fullname
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [moreData, setMoreData] = useState([]);
  const fetcher = useFetcher();
  const [preview, setPreview] = useState(void 0);
  const [vote, setVote] = useState(() => {
    if (likes !== null && likes !== void 0) {
      if (likes === true) {
        return "1";
      } else {
        return "0";
      }
    }
    return "0";
  });
  useEffect(() => {
    if (!thumbnail) return;
    if (preview) return;
    fetcher.load(`/api/subreddit/${permalink}`);
  }, [thumbnail, preview, permalink]);
  useEffect(() => {
    if (fetcher.data) {
      const data2 = fetcher.data;
      setMoreData(data2);
    }
  }, [fetcher.data]);
  useEffect(() => {
    if (moreData && moreData[0] && moreData[0].kind === "Listing") {
      const children = moreData[0].data.children;
      if (children && children.length > 0) {
        if (children[0].kind === "t3" && children[0].data.preview) {
          const preview2 = children[0].data.preview;
          if (preview2.images.length > 0) {
            const url = preview2.images[0].source.url.replace(/&amp;/g, "&");
            setPreview(url);
          }
        }
      }
    }
  }, [moreData]);
  const renderBody = () => {
    if (preview) {
      return /* @__PURE__ */ jsxs(CardBody, { className: "h-fit flex flex-col justify-center items-center text-center gap-3", children: [
        preview ? /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, children: /* @__PURE__ */ jsx(Image, { src: preview, alt: "cover image" }) }) : null,
        !preview && thumbnail ? /* @__PURE__ */ jsx(Image, { src: thumbnail, width: thumbnail_width, alt: "cover image" }) : null,
        /* @__PURE__ */ jsx("p", { className: "w-full line-clamp-3 overflow-hidden text-ellipsis", children: selftext })
      ] });
    } else {
      return /* @__PURE__ */ jsx(CardBody, { className: "h-fit flex flex-col justify-center items-center text-center gap-3", children: /* @__PURE__ */ jsx("p", { className: "w-full line-clamp-3 overflow-hidden text-ellipsis", children: selftext }) });
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(motion.button, { initial: { scale: 0.5, opacity: 0 }, animate: { scale: 1, opacity: 1 }, onClick: () => onOpen(), className: "cursor-pointer w-full max-w-[90vw] md:w-133", children: /* @__PURE__ */ jsxs(Card, { className: "p-5", children: [
      /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-col gap-3 text-center", children: [
        /* @__PURE__ */ jsx(User, { name: author, description: subreddit }),
        /* @__PURE__ */ jsx("h4", { className: "w-full", children: title })
      ] }),
      renderBody(),
      /* @__PURE__ */ jsx(Divider, {}),
      /* @__PURE__ */ jsx(CardFooter, { className: "flex flex-row text-gray-500", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-center items-center gap-3", children: [
        /* @__PURE__ */ jsx(HeartButton, { vote, setVote, id: fullname }),
        /* @__PURE__ */ jsx("span", { children: formatAmount(ups) }),
        /* @__PURE__ */ jsx(Message, {}),
        /* @__PURE__ */ jsx("span", { children: num_comments.toString() })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(
      Modal,
      {
        isOpen,
        placement: "center",
        size: "lg",
        scrollBehavior: "outside",
        backdrop: "blur",
        onOpenChange,
        children: /* @__PURE__ */ jsx(ModalContent, { children: (onClose) => /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs(ModalHeader, { className: "flex flex-col justify-center items-start gap-3", children: [
            /* @__PURE__ */ jsx(User, { name: author, description: subreddit }),
            /* @__PURE__ */ jsx("h5", { className: "w-full", children: title })
          ] }),
          /* @__PURE__ */ jsxs(ModalBody, { children: [
            /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center justify-center gap-3", children: [
              preview ? /* @__PURE__ */ jsx(Image, { src: preview, alt: "cover image" }) : null,
              !preview && thumbnail ? /* @__PURE__ */ jsx(Image, { src: thumbnail, width: thumbnail_width, alt: "cover image" }) : null
            ] }),
            /* @__PURE__ */ jsx("p", { className: "w-full overflow-clip my-10 font-geist text-center", children: selftext }),
            /* @__PURE__ */ jsx(Divider, {}),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-center items-center gap-3", children: [
              /* @__PURE__ */ jsx(HeartButton, { vote, setVote, id: fullname }),
              /* @__PURE__ */ jsx("span", { children: formatAmount(ups) }),
              /* @__PURE__ */ jsx(Message, {}),
              /* @__PURE__ */ jsx("span", { children: num_comments.toString() })
            ] }),
            /* @__PURE__ */ jsx(Comments, { num_comments, comments: moreData[1] ?? [] })
          ] }),
          /* @__PURE__ */ jsx(ModalFooter, { children: /* @__PURE__ */ jsx(Button, { color: "default", onPress: onClose, children: /* @__PURE__ */ jsx("span", { children: "Close" }) }) })
        ] }) })
      }
    )
  ] });
});
const T5 = memo(function T52({
  display_name_prefixed,
  subscribers,
  name,
  public_description,
  banner_img,
  icon_img,
  fullname
}) {
  return /* @__PURE__ */ jsx(motion.div, { initial: { scale: 0.5 }, animate: { scale: 1 }, className: "w-full sm:w-133", children: /* @__PURE__ */ jsx(Link, { to: `/${display_name_prefixed}`, children: /* @__PURE__ */ jsxs(Card, { className: "p-5", children: [
    banner_img ? /* @__PURE__ */ jsx(
      Image,
      {
        removeWrapper: true,
        alt: "Card background image",
        className: "z-0 w-full h-full object-cover",
        src: banner_img
      }
    ) : null,
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(
      User,
      {
        avatarProps: { src: icon_img },
        name: display_name_prefixed,
        description: `${formatAmount(subscribers)} members`
      }
    ) }),
    /* @__PURE__ */ jsx(CardBody, { children: /* @__PURE__ */ jsx("span", { children: public_description }) })
  ] }) }) });
});
function useInfiniteScroll(loaderData) {
  const action2 = useOutletContext();
  const scrollPositionRef = useRef(0);
  const loadingRef = useRef(null);
  const [feed, setFeed] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const render = useMemo(() => feed.map((element, index) => {
    if (element.kind === "t3") {
      return /* @__PURE__ */ jsx(
        T3,
        {
          author: element.data.author,
          id: element.data.id,
          permalink: element.data.permalink,
          num_comments: element.data.num_comments ?? 0,
          selftext: element.data.selftext ?? "",
          subreddit: element.data.subreddit ?? "",
          subreddit_id: element.data.subreddit_id,
          thumbnail: element.data.thumbnail ?? "",
          thumbnail_height: element.data.thumbnail_height ?? 0,
          thumbnail_width: element.data.thumbnail_width ?? 0,
          title: element.data.title ?? "",
          ups: element.data.ups,
          likes: element.data.likes ?? false,
          fullname: element.data.name ?? false
        },
        index
      );
    }
    if (element.kind === "t5") {
      return /* @__PURE__ */ jsx(
        T5,
        {
          display_name_prefixed: element.data.display_name_prefixed,
          subscribers: element.data.subscribers,
          name: element.data.name,
          public_description: element.data.public_description,
          banner_img: element.data.banner_img,
          icon_img: element.data.icon_img,
          fullname: element.data.name ?? false
        },
        index
      );
    }
  }), [feed]);
  useEffect(() => {
    if (feed.length > 0) {
      setFeed([]);
    }
    addToFeed();
  }, [action2]);
  useEffect(() => {
    if (feed.length > 0) return;
    addToFeed();
  }, []);
  useEffect(() => {
    if (!loadingRef.current) return;
    const observer = new IntersectionObserver(
      ([entry2]) => {
        if (entry2.isIntersecting) {
          addToFeed();
        }
      },
      {
        root: document,
        threshold: 1
      }
    );
    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }
    return () => observer.disconnect();
  }, [feed.length]);
  useEffect(() => {
    if (!isLoading) {
      requestAnimationFrame(() => {
        restoreScrollPosition();
      });
    }
  }, [feed, isLoading]);
  const addToFeed = () => {
    setIsLoading(true);
    saveScrollPosition();
    if (action2 && action2.data && action2.data.children) {
      setFeed((prev) => {
        const children = action2.data.children;
        if (prev.length === children.length) {
          return prev;
        }
        if (children.length <= 5) {
          return children;
        }
        const diff = children.length - prev.length;
        if (diff < 5) {
          return children;
        }
        const count = prev.length + 5;
        const newArray = children.slice(0, count);
        return newArray;
      });
      return;
    }
    if (loaderData) {
      setFeed((prev) => {
        if (prev.length === loaderData.length) {
          return prev;
        }
        if (loaderData.length <= 5) {
          return loaderData;
        }
        const diff = loaderData.length - prev.length;
        if (diff < 5) {
          return loaderData;
        }
        const count = prev.length + 5;
        const newArray = loaderData.slice(0, count);
        return newArray;
      });
      return;
    }
    setIsLoading(false);
    return;
  };
  const saveScrollPosition = () => {
    const scrollable = document.documentElement ?? document.body;
    if (scrollable) {
      scrollPositionRef.current = scrollable.scrollTop;
    }
  };
  const restoreScrollPosition = () => {
    const scrollable = document.documentElement ?? document.body;
    if (scrollable) {
      scrollable.scrollTop = scrollPositionRef.current;
    }
  };
  const renderLoadingDots = () => {
    if (loaderData) {
      if (loaderData.length !== feed.length) {
        return /* @__PURE__ */ jsx("div", { ref: loadingRef, className: "relative bottom-0 flex flex-row justify-center w-full h-fit p-y-10", children: /* @__PURE__ */ jsx(Spinner, { variant: "wave", color: "primary", size: "lg" }) });
      }
    } else if (action2 && action2.data) {
      if (action2.data.children && action2.data.children.length !== feed.length) {
        return /* @__PURE__ */ jsx("div", { ref: loadingRef, className: "relative bottom-0 flex flex-row justify-center w-full h-fit p-y-10", children: /* @__PURE__ */ jsx(Spinner, { variant: "wave", color: "primary", size: "lg" }) });
      }
    }
    return null;
  };
  return {
    render,
    renderLoadingDots
  };
}
async function getCategoryContent(category, cookie) {
  const endpoint = cookie ? `https://oauth.reddit.com/r/${category}` : `https://www.reddit.com/r/${category}.json?raw_json=1`;
  const req = cookie ? await fetch(endpoint, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${cookie}`,
      "Content-Type": "application/json",
      "User-Agent": "centurytimes/2.1.0"
    }
  }) : await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "centurytimes/2.1.0"
    }
  });
  if (req.status !== 200) {
    console.error(req.statusText);
    console.error(req.status);
    throw new Error("Failed at fetching subreddits");
  }
  const response = await req.json();
  return response.data.children;
}
async function loader$b({
  request
}) {
  const session = await getSession(request.headers.get("Cookie"));
  const data2 = await getCategoryContent("worldnews", session.get("access_token"));
  return {
    data: data2,
    url: request.url
  };
}
async function clientLoader({
  serverLoader,
  params
}) {
  const serverData = await serverLoader();
  const url = new URL(serverData.url);
  const pendingAction = window.sessionStorage.getItem("x-century-pending-action");
  if (pendingAction && !url.searchParams.get("error")) {
    const {
      action: action2,
      id,
      payload
    } = JSON.parse(pendingAction);
    if (action2 === "vote") {
      const dir = payload === "0" ? "1" : payload;
      const fetcher = await fetch(`/api/upvote/${id}/${dir}`, {
        method: "POST"
      });
      const fetcherData = await fetcher.json();
      if (fetcherData.error) {
        addToast({
          title: "Error",
          description: "There was an error processing your vote.",
          color: "danger"
        });
      } else {
        addToast({
          title: "Success",
          description: "Your vote was processed successfully.",
          color: "success"
        });
        window.sessionStorage.removeItem("x-century-pending-action");
      }
    }
  }
  return {
    ...serverData
  };
}
clientLoader.hydrate = true;
const HydrateFallback$7 = UNSAFE_withHydrateFallbackProps(function HydrateFallback2() {
  return /* @__PURE__ */ jsx("section", {
    className: "flex flex-col items-center gap-5 w-full mb-5",
    children: /* @__PURE__ */ jsx(Spinner, {
      variant: "wave",
      color: "primary",
      size: "lg"
    })
  });
});
const _index = UNSAFE_withComponentProps(function Index({
  loaderData
}) {
  const {
    render,
    renderLoadingDots
  } = useInfiniteScroll(loaderData.data);
  useEffect(() => {
    const url = new URL(loaderData.url);
    const error = url.searchParams.get("error");
    if (error && error.includes("access_denied")) {
      addToast({
        title: "Authorization Error",
        description: "You need to authorize the app to upvote and comment.",
        color: "danger"
      });
    }
  }, []);
  return /* @__PURE__ */ jsxs("section", {
    className: "flex flex-col items-center gap-5 w-full mb-5",
    children: [render ?? null, renderLoadingDots() ?? null]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HydrateFallback: HydrateFallback$7,
  clientLoader,
  default: _index,
  loader: loader$b
}, Symbol.toStringTag, { value: "Module" }));
async function loader$a() {
  return data({}, 404);
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$a
}, Symbol.toStringTag, { value: "Module" }));
async function loader$9({
  request
}) {
  const session = await getSession(request.headers.get("Cookie"));
  const tokenCookie = session.get("access_token");
  const req = await fetch("https://www.reddit.com/r/space.json?raw_json=1", {
    method: "GET",
    headers: {
      "Authorization": `Basic ${tokenCookie}`,
      "Content-Type": "application/json",
      "User-Agent": "centurytimes/2.1.0"
    }
  });
  if (req.status !== 200) {
    console.error(req.statusText);
    console.error(req.status);
    throw new Error("Failed at fetching subreddits");
  }
  const response = await req.json();
  return response.data.children;
}
const space = UNSAFE_withComponentProps(function Main({
  loaderData
}) {
  const {
    render,
    renderLoadingDots
  } = useInfiniteScroll(loaderData);
  return /* @__PURE__ */ jsxs("section", {
    className: "flex flex-col items-center gap-3 w-full",
    children: [/* @__PURE__ */ jsx("h3", {
      className: "reddit-header my-5",
      children: "Space"
    }), render, renderLoadingDots()]
  });
});
const HydrateFallback$6 = UNSAFE_withHydrateFallbackProps(function HydrateFallback3() {
  return /* @__PURE__ */ jsx(Spinner, {
    size: "lg",
    color: "primary",
    label: "Loading..."
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HydrateFallback: HydrateFallback$6,
  default: space,
  loader: loader$9
}, Symbol.toStringTag, { value: "Module" }));
async function loader$8({
  request
}) {
  const session = await getSession(request.headers.get("Cookie"));
  const tokenCookie = session.get("access_token");
  const req = await fetch("https://www.reddit.com/r/gaming.json?raw_json=1", {
    method: "GET",
    headers: {
      "Authorization": `Basic ${tokenCookie}`,
      "Content-Type": "application/json",
      "User-Agent": "centurytimes/2.1.0"
    }
  });
  if (req.status !== 200) {
    console.error(req.statusText);
    console.error(req.status);
    throw new Error("Failed at fetching subreddits");
  }
  const response = await req.json();
  return response.data.children;
}
const gaming = UNSAFE_withComponentProps(function Main2({
  loaderData
}) {
  const {
    render,
    renderLoadingDots
  } = useInfiniteScroll(loaderData);
  return /* @__PURE__ */ jsxs("section", {
    className: "flex flex-col items-center gap-3 w-full",
    children: [/* @__PURE__ */ jsx("h3", {
      className: "reddit-header my-5",
      children: "Gaming"
    }), render, renderLoadingDots()]
  });
});
const HydrateFallback$5 = UNSAFE_withHydrateFallbackProps(function HydrateFallback4() {
  return /* @__PURE__ */ jsx(Spinner, {
    size: "lg",
    color: "primary",
    label: "Loading..."
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HydrateFallback: HydrateFallback$5,
  default: gaming,
  loader: loader$8
}, Symbol.toStringTag, { value: "Module" }));
async function loader$7({
  request
}) {
  const session = await getSession(request.headers.get("Cookie"));
  const tokenCookie = session.get("access_token");
  const req = await fetch("https://www.reddit.com/r/science.json?raw_json=1", {
    method: "GET",
    headers: {
      "Authorization": `Basic ${tokenCookie}`,
      "Content-Type": "application/json",
      "User-Agent": "centurytimes/2.1.0"
    }
  });
  if (req.status !== 200) {
    console.error(req.statusText);
    console.error(req.status);
    throw new Error("Failed at fetching subreddits");
  }
  const response = await req.json();
  return response.data.children;
}
const science = UNSAFE_withComponentProps(function Main3({
  loaderData
}) {
  const {
    render,
    renderLoadingDots
  } = useInfiniteScroll(loaderData);
  return /* @__PURE__ */ jsxs("section", {
    className: "flex flex-col items-center gap-3 w-full",
    children: [/* @__PURE__ */ jsx("h3", {
      className: "reddit-header my-5",
      children: "Science"
    }), render, renderLoadingDots()]
  });
});
const HydrateFallback$4 = UNSAFE_withHydrateFallbackProps(function HydrateFallback5() {
  return /* @__PURE__ */ jsx(Spinner, {
    size: "lg",
    color: "primary",
    label: "Loading..."
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HydrateFallback: HydrateFallback$4,
  default: science,
  loader: loader$7
}, Symbol.toStringTag, { value: "Module" }));
async function loader$6({
  request
}) {
  const session = await getSession(request.headers.get("Cookie"));
  const tokenCookie = session.get("access_token");
  const req = await fetch("https://www.reddit.com/r/sports.json?raw_json=1", {
    method: "GET",
    headers: {
      "Authorization": `Basic ${tokenCookie}`,
      "Content-Type": "application/json",
      "User-Agent": "centurytimes/2.1.0"
    }
  });
  if (req.status !== 200) {
    console.error(req.statusText);
    console.error(req.status);
    throw new Error("Failed at fetching subreddits");
  }
  const response = await req.json();
  return response.data.children;
}
const sports = UNSAFE_withComponentProps(function Main4({
  loaderData
}) {
  const {
    render,
    renderLoadingDots
  } = useInfiniteScroll(loaderData);
  return /* @__PURE__ */ jsxs("section", {
    className: "flex flex-col items-center gap-3 w-full",
    children: [/* @__PURE__ */ jsx("h3", {
      className: "reddit-header my-5",
      children: "Sports"
    }), render, renderLoadingDots()]
  });
});
const HydrateFallback$3 = UNSAFE_withHydrateFallbackProps(function HydrateFallback6() {
  return /* @__PURE__ */ jsx(Spinner, {
    size: "lg",
    color: "primary",
    label: "Loading..."
  });
});
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HydrateFallback: HydrateFallback$3,
  default: sports,
  loader: loader$6
}, Symbol.toStringTag, { value: "Module" }));
async function loader$5({
  request
}) {
  const session = await getSession(request.headers.get("Cookie"));
  const tokenCookie = session.get("access_token");
  const req = await fetch("https://www.reddit.com/r/technology.json?raw_json=1", {
    method: "GET",
    headers: {
      "Authorization": `Basic ${tokenCookie}`,
      "Content-Type": "application/json",
      "User-Agent": "centurytimes/2.1.0"
    }
  });
  if (req.status !== 200) {
    console.error(req.statusText);
    console.error(req.status);
    throw new Error("Failed at fetching subreddits");
  }
  const response = await req.json();
  return response.data.children;
}
const tech = UNSAFE_withComponentProps(function Main5({
  loaderData
}) {
  const {
    render,
    renderLoadingDots
  } = useInfiniteScroll(loaderData);
  return /* @__PURE__ */ jsxs("section", {
    className: "flex flex-col items-center gap-3 w-full",
    children: [/* @__PURE__ */ jsx("h3", {
      className: "reddit-header my-5",
      children: "Tech"
    }), render, renderLoadingDots()]
  });
});
const HydrateFallback$2 = UNSAFE_withHydrateFallbackProps(function HydrateFallback7() {
  return /* @__PURE__ */ jsx(Spinner, {
    size: "lg",
    color: "primary",
    label: "Loading..."
  });
});
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HydrateFallback: HydrateFallback$2,
  default: tech,
  loader: loader$5
}, Symbol.toStringTag, { value: "Module" }));
async function loader$4({
  request
}) {
  const session = await getSession(request.headers.get("Cookie"));
  const tokenCookie = session.get("access_token");
  const req = await fetch("https://www.reddit.com/r/worldnews.json?raw_json=1", {
    method: "GET",
    headers: {
      "Authorization": `Basic ${tokenCookie}`,
      "Content-Type": "application/json",
      "User-Agent": "centurytimes/2.1.0"
    }
  });
  if (req.status !== 200) {
    console.error(req.statusText);
    console.error(req.status);
    throw new Error("Failed at fetching subreddits");
  }
  const response = await req.json();
  return response.data.children;
}
const news = UNSAFE_withComponentProps(function Main6({
  loaderData
}) {
  const {
    render,
    renderLoadingDots
  } = useInfiniteScroll(loaderData);
  return /* @__PURE__ */ jsxs("section", {
    className: "flex flex-col items-center gap-3 w-full",
    children: [/* @__PURE__ */ jsx("h3", {
      className: "reddit-header my-5",
      children: "News"
    }), render, renderLoadingDots()]
  });
});
const HydrateFallback$1 = UNSAFE_withHydrateFallbackProps(function HydrateFallback8() {
  return /* @__PURE__ */ jsx(Spinner, {
    size: "lg",
    color: "primary",
    label: "Loading..."
  });
});
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HydrateFallback: HydrateFallback$1,
  default: news,
  loader: loader$4
}, Symbol.toStringTag, { value: "Module" }));
async function loader$3({
  params,
  request
}) {
  const session = await getSession(request.headers.get("Cookie"));
  const access_token = session.get("access_token");
  const req = await fetch(`https://www.reddit.com/r/${params.subreddit}.json?raw_json=1`, {
    method: "GET",
    headers: {
      "Authorization": `Basic ${access_token}`,
      "Content-Type": "application/json",
      "User-Agent": "centurytimes/2.1.0"
    }
  });
  if (req.status !== 200) {
    console.error(req.statusText);
    console.error(req.status);
    throw new Error("Failed at fetching subreddits");
  }
  const response = await req.json();
  return response.data.children;
}
const r_$subreddit = UNSAFE_withComponentProps(function Main7({
  loaderData,
  params
}) {
  const {
    render,
    renderLoadingDots
  } = useInfiniteScroll(loaderData);
  return /* @__PURE__ */ jsxs("section", {
    className: "flex flex-col items-center gap-3 w-full",
    children: [/* @__PURE__ */ jsxs("h3", {
      className: "reddit-header my-5",
      children: ["r/", params.subreddit]
    }), render, renderLoadingDots()]
  });
});
const HydrateFallback9 = UNSAFE_withHydrateFallbackProps(function HydrateFallback10() {
  return /* @__PURE__ */ jsx(Spinner, {
    size: "lg",
    color: "primary",
    label: "Loading..."
  });
});
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HydrateFallback: HydrateFallback9,
  default: r_$subreddit,
  loader: loader$3
}, Symbol.toStringTag, { value: "Module" }));
async function loader$2({
  request,
  params
}) {
  const session = await getSession(request.headers.get("Cookie"));
  const tokenCookie = session.get("access_token");
  const req = await fetch(new URL(`${params["*"]}.json`, "https://www.reddit.com").toString(), {
    method: "GET",
    headers: {
      "Authorization": `Basic ${tokenCookie}`,
      "Content-Type": "application/json",
      "User-Agent": "centurytimes/2.1.0"
    }
  });
  if (req.status !== 200) {
    console.error(req.statusText);
    console.error(req.status);
    return [];
  }
  const data2 = await req.json();
  return data2;
}
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
async function loader$1({
  request,
  params
}) {
  const session = await getSession(request.headers.get("Cookie"));
  const tokenCookie = session.get("access_token");
  const req = await fetch(`https://www.reddit.com/user/${params.name}/about.json`, {
    method: "GET",
    headers: {
      "Authorization": `Basic ${tokenCookie}`,
      "Content-Type": "application/json",
      "User-Agent": "centurytimes/2.1.0"
    }
  });
  if (req.status !== 200) {
    console.error(req.status);
    console.error(req.statusText);
    return "";
  }
  const data2 = await req.json();
  return data2;
}
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
function getAuthorization() {
  const state = v4();
  const endpoint = new URL("https://www.reddit.com/api/v1/authorize.compact");
  const client_id = process.env.REDDIT_CLIENT_ID;
  const params = {
    client_id,
    response_type: "code",
    state,
    redirect_uri: "http://localhost:5173",
    duration: "permanent",
    scope: "edit identity read submit vote"
  };
  const q = new URLSearchParams(params);
  const qStr = q.toString();
  endpoint.search = qStr;
  return { endpoint: endpoint.toString(), state };
}
async function action$2({
  request,
  params
}) {
  const session = await getSession(request.headers.get("Cookie"));
  const tokenCookie = session.get("access_token");
  const payload = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tokenCookie}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "centurytimes/2.1.0"
    },
    body: new URLSearchParams({
      dir: "1",
      id: params.id,
      rank: "2"
    })
  };
  try {
    const req = await fetch("https://oauth.reddit.com/api/vote", payload);
    const response = await req.json();
    if (!req.ok || response.json.errors[0].length > 0) {
      if (response.success === false) throw new Error("Unsuccessful request from 'vote' function.");
      if (response.json && response.json.errors.length > 0) {
        console.error({
          error: response.json.errors[0][0],
          msg: response.json.errors[0][1]
        });
        throw new Error(`${response.json.errors[0][0]}: ${response.json.errors[0][1]}`);
      }
      console.error("Failed request from 'vote' function.", response);
      throw new Error("Failed request from 'vote' function.");
    }
    return {
      response
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      if (error.message.includes("USER_REQUIRED")) {
        return getAuthorization();
      }
    }
    return {
      error: "An error occurred during the voting process."
    };
  }
}
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$2
}, Symbol.toStringTag, { value: "Module" }));
async function loader({
  request
}) {
  const session = await getSession(request.headers.get("Cookie"));
  const tokenCookie = session.get("access_token");
  const req = await fetch("https://oauth.reddit.com/api/v1/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tokenCookie}`,
      "User-Agent": "centurytimes/2.1.0"
    }
  });
  const response = await req.json();
  if (response.name) {
    return data({
      user: response.name,
      avatar: response.icon_img || "",
      displayName: response.subreddit?.display_name || ""
    });
  }
  return data({
    user: null,
    avatar: ""
  }, {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  });
}
const route13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader
}, Symbol.toStringTag, { value: "Module" }));
async function action$1({
  request
}) {
  const state = "x";
  const endpoint = new URL("https://www.reddit.com/api/v1/authorize.compact");
  const client_id = process.env.REDDIT_CLIENT_ID;
  const params = {
    client_id,
    response_type: "code",
    state,
    redirect_uri: "http://localhost:5173",
    duration: "permanent",
    scope: "edit identity read submit vote"
  };
  const q = new URLSearchParams(params);
  const qStr = q.toString();
  endpoint.search = qStr;
  return {
    endpoint: endpoint.toString()
  };
}
const route14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1
}, Symbol.toStringTag, { value: "Module" }));
async function action({
  request
}) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("access_token");
  if (!token) {
    return {
      error: "No active session found."
    };
  }
  const client_id = process.env.REDDIT_CLIENT_ID;
  const client_secret = process.env.REDDIT_CLIENT_SECRET;
  const basicAuth = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
  const payload = {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "centurytimes/2.1.0"
    },
    body: new URLSearchParams({
      token,
      token_type_hint: "access_token"
    })
  };
  const req = await fetch("https://www.reddit.com/api/v1/revoke_token", payload);
  if (!req.ok) {
    return {
      error: "Failed to revoke token."
    };
  }
  session.unset("access_token");
  session.unset("refresh_token");
  const req2 = await fetch("https://www.reddit.com/api/v1/access_token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "centurytimes/2.1.0"
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      scope: "vote identity read submit edit"
    })
  });
  if (!req2.ok) {
    return {
      error: "Failed to obtain userless token."
    };
  }
  const res2 = await req2.json();
  session.set("access_token", res2.access_token);
  session.set("access_expires_in", res2.expires_in);
  session.set("access_mode", "userless");
  return data({
    message: "Successfully signed out."
  }, {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  });
}
const route15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-XABWC2_t.js", "imports": ["/assets/index-D7seX151.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-CEc1IOF-.js", "imports": ["/assets/index-D7seX151.js", "/assets/icons-CibqzyVO.js", "/assets/index-Dv9FDT3H.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": true, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/_index-fSXS8I1B.js", "imports": ["/assets/index-D7seX151.js", "/assets/custom-hooks-SAZS1hEF.js", "/assets/icons-CibqzyVO.js", "/assets/proxy-lUhTiADP.js", "/assets/gestures-D597FSm6.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/$": { "id": "routes/$", "parentId": "root", "path": "*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/_-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/space": { "id": "routes/space", "parentId": "root", "path": "space", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/space-C-IW_XA7.js", "imports": ["/assets/index-D7seX151.js", "/assets/custom-hooks-SAZS1hEF.js", "/assets/icons-CibqzyVO.js", "/assets/proxy-lUhTiADP.js", "/assets/gestures-D597FSm6.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/gaming": { "id": "routes/gaming", "parentId": "root", "path": "gaming", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/gaming-DTuHUf8K.js", "imports": ["/assets/index-D7seX151.js", "/assets/custom-hooks-SAZS1hEF.js", "/assets/icons-CibqzyVO.js", "/assets/proxy-lUhTiADP.js", "/assets/gestures-D597FSm6.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/science": { "id": "routes/science", "parentId": "root", "path": "science", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/science-BRK4DWUC.js", "imports": ["/assets/index-D7seX151.js", "/assets/custom-hooks-SAZS1hEF.js", "/assets/icons-CibqzyVO.js", "/assets/proxy-lUhTiADP.js", "/assets/gestures-D597FSm6.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/sports": { "id": "routes/sports", "parentId": "root", "path": "sports", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/sports-D0AkJOUa.js", "imports": ["/assets/index-D7seX151.js", "/assets/custom-hooks-SAZS1hEF.js", "/assets/icons-CibqzyVO.js", "/assets/proxy-lUhTiADP.js", "/assets/gestures-D597FSm6.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/tech": { "id": "routes/tech", "parentId": "root", "path": "tech", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/tech-it4lHiLe.js", "imports": ["/assets/index-D7seX151.js", "/assets/custom-hooks-SAZS1hEF.js", "/assets/icons-CibqzyVO.js", "/assets/proxy-lUhTiADP.js", "/assets/gestures-D597FSm6.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/news": { "id": "routes/news", "parentId": "root", "path": "news", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/news-ttgs4KpG.js", "imports": ["/assets/index-D7seX151.js", "/assets/custom-hooks-SAZS1hEF.js", "/assets/icons-CibqzyVO.js", "/assets/proxy-lUhTiADP.js", "/assets/gestures-D597FSm6.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/r.$subreddit": { "id": "routes/r.$subreddit", "parentId": "root", "path": "r/:subreddit", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/r._subreddit-Cpss7TnW.js", "imports": ["/assets/index-D7seX151.js", "/assets/custom-hooks-SAZS1hEF.js", "/assets/icons-CibqzyVO.js", "/assets/proxy-lUhTiADP.js", "/assets/gestures-D597FSm6.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "api/subreddit.$": { "id": "api/subreddit.$", "parentId": "root", "path": "api/subreddit/*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/subreddit._-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "api/author.$name": { "id": "api/author.$name", "parentId": "root", "path": "api/author/:name", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/author._name-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "api/upvote": { "id": "api/upvote", "parentId": "root", "path": "api/upvote/:id/:vote", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/upvote-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "api/me": { "id": "api/me", "parentId": "root", "path": "api/me", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/me-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "api/authorize": { "id": "api/authorize", "parentId": "root", "path": "api/authorize", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/authorize-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "api/signout": { "id": "api/signout", "parentId": "root", "path": "api/signout", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/signout-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-50cebed4.js", "version": "50cebed4", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_optimizeDeps": false, "unstable_subResourceIntegrity": false, "unstable_trailingSlashAwareDataRequests": false, "v8_middleware": false, "v8_splitRouteModules": false, "v8_viteEnvironmentApi": false };
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
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/$": {
    id: "routes/$",
    parentId: "root",
    path: "*",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/space": {
    id: "routes/space",
    parentId: "root",
    path: "space",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/gaming": {
    id: "routes/gaming",
    parentId: "root",
    path: "gaming",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/science": {
    id: "routes/science",
    parentId: "root",
    path: "science",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/sports": {
    id: "routes/sports",
    parentId: "root",
    path: "sports",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/tech": {
    id: "routes/tech",
    parentId: "root",
    path: "tech",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/news": {
    id: "routes/news",
    parentId: "root",
    path: "news",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/r.$subreddit": {
    id: "routes/r.$subreddit",
    parentId: "root",
    path: "r/:subreddit",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "api/subreddit.$": {
    id: "api/subreddit.$",
    parentId: "root",
    path: "api/subreddit/*",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "api/author.$name": {
    id: "api/author.$name",
    parentId: "root",
    path: "api/author/:name",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  },
  "api/upvote": {
    id: "api/upvote",
    parentId: "root",
    path: "api/upvote/:id/:vote",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "api/me": {
    id: "api/me",
    parentId: "root",
    path: "api/me",
    index: void 0,
    caseSensitive: void 0,
    module: route13
  },
  "api/authorize": {
    id: "api/authorize",
    parentId: "root",
    path: "api/authorize",
    index: void 0,
    caseSensitive: void 0,
    module: route14
  },
  "api/signout": {
    id: "api/signout",
    parentId: "root",
    path: "api/signout",
    index: void 0,
    caseSensitive: void 0,
    module: route15
  }
};
const allowedActionOrigins = false;
export {
  allowedActionOrigins,
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
