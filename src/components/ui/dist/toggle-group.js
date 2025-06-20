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
exports.ToggleGroupItem = exports.ToggleGroup = void 0;
var React = require("react");
var ToggleGroupPrimitive = require("@radix-ui/react-toggle-group");
var utils_1 = require("@/lib/utils");
var toggle_1 = require("@/components/ui/toggle");
var ToggleGroupContext = React.createContext({
    size: "default",
    variant: "default"
});
function ToggleGroup(_a) {
    var className = _a.className, variant = _a.variant, size = _a.size, children = _a.children, props = __rest(_a, ["className", "variant", "size", "children"]);
    return (React.createElement(ToggleGroupPrimitive.Root, __assign({ "data-slot": "toggle-group", "data-variant": variant, "data-size": size, className: utils_1.cn("group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs", className) }, props),
        React.createElement(ToggleGroupContext.Provider, { value: { variant: variant, size: size } }, children)));
}
exports.ToggleGroup = ToggleGroup;
function ToggleGroupItem(_a) {
    var className = _a.className, children = _a.children, variant = _a.variant, size = _a.size, props = __rest(_a, ["className", "children", "variant", "size"]);
    var context = React.useContext(ToggleGroupContext);
    return (React.createElement(ToggleGroupPrimitive.Item, __assign({ "data-slot": "toggle-group-item", "data-variant": context.variant || variant, "data-size": context.size || size, className: utils_1.cn(toggle_1.toggleVariants({
            variant: context.variant || variant,
            size: context.size || size
        }), "min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l", className) }, props), children));
}
exports.ToggleGroupItem = ToggleGroupItem;
