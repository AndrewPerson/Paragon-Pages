import { Init } from "https://paragon.pages.dev/js/paragon.js"

Init();

import { EditorView, basicSetup } from "codemirror";
import { keymap } from "@codemirror/view";
import { indentWithTab } from "@codemirror/commands";
import { Compartment, EditorState } from "@codemirror/state";
import { css } from "@codemirror/lang-css";

let view = new EditorView({
    extensions: [
        basicSetup,
        keymap.of(indentWithTab),
        new Compartment().of(EditorState.tabSize.of(4)),
        css()
    ],
    parent: document.getElementById("editor")
});

document.getElementById("upload-css").addEventListener("click", e => {
    window.parent.postMessage({
        command: "Register Skin",
        data: {
            name: "Custom Skin",
            css: view.state.doc.toJSON().join("\n")
        }
    }, "*");
});
