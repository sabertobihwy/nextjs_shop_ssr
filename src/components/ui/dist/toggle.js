"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.toggleVariants = exports.Toggle = void 0;
var React = require("react");
var TogglePrimitive = require("@radix-ui/react-toggle");
var class_variance_authority_1 = require("class-variance-authority");
var utils_1 = require("@/lib/utils");
var toggleVariants = class_variance_authority_1.cva("data-[state=on]:bg-orange-400 data-[state=on]:text-white inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap", {
    variants: {
        variant: {
            "default": "p-1 bg-white text-black hover:bg-orange-200 hover:text-orange-50 hover:cursor-pointer",
            outline: "border border-input text-black bg-slate-100 shadow-xs hover:bg-orange-200 rounded-none"
        },
        size: {
            "default": "h-9 px-2 min-w-9",
            sm: "h-8 px-1.5 min-w-8",
            lg: "h-10 px-2.5 min-w-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
exports.toggleVariants = toggleVariants;
function Toggle(_a) {
    var className = _a.className, variant = _a.variant, size = _a.size, props = __rest(_a, ["className", "variant", "size"]);
    return (React.createElement(TogglePrimitive.Root, __assign({ "data-slot": "toggle", className: utils_1.cn(toggleVariants({ variant: variant, size: size, className: className })) }, props)));
}
exports.Toggle = Toggle;
