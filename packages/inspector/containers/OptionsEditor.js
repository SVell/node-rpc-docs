"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_2 = __importDefault(require("@monaco-editor/react"));
var monaco = __importStar(require("monaco-editor"));
var window_size_1 = __importDefault(require("@rehooks/window-size"));
var monaco_add_json_schema_diagnostics_1 = require("@etclabscore/monaco-add-json-schema-diagnostics");
var useMonacoVimMode_1 = __importDefault(require("../hooks/useMonacoVimMode"));
var OptionsEditor = function (props) {
    var _a = (0, react_1.useState)(), editor = _a[0], setEditor = _a[1];
    (0, useMonacoVimMode_1.default)(editor);
    var windowSize = (0, window_size_1.default)();
    (0, react_1.useEffect)(function () {
        if (editor) {
            editor.layout();
        }
    }, [windowSize, editor]);
    (0, react_1.useEffect)(function () {
        if (!editor) {
            return;
        }
        var modelName = "inspector-transport-options";
        var modelUriString = "inmemory://".concat(modelName, "-").concat(Math.random(), ".json");
        var modelUri = monaco.Uri.parse(modelUriString);
        var model = monaco.editor.createModel(props.value || "", "json", modelUri);
        editor.setModel(model);
        (0, monaco_add_json_schema_diagnostics_1.addDiagnostics)(modelUri.toString(), props.schema, monaco);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.schema, editor]);
    function handleEditorDidMount(_, ed) {
        setEditor(ed);
    }
    var handleChange = function (ev, value) {
        if (props.onChange) {
            props.onChange(value);
        }
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { style: { marginTop: "5px", background: "black" } }),
        react_1.default.createElement(react_2.default, { height: "95%", width: "100%", value: props.value, onMount: handleEditorDidMount, options: {
                minimap: {
                    enabled: false,
                },
                lineNumbers: "off",
                glyphMargin: false,
                folding: false,
                automaticLayout: true,
                fixedOverflowWidgets: true,
            }, language: "json", onChange: handleChange })));
};
exports.default = OptionsEditor;
