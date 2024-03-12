var $aSSit$react = require("react");

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "TrixEditor", () => $a889f07634db0f77$export$ba1ea3784ea3400d);

class $a889f07634db0f77$export$ba1ea3784ea3400d extends $aSSit$react.Component {
    constructor(props){
        super(props);
        this.container = null;
        this.editor = null;
        this.d = null;
        this.id = this.generateId();
        this.state = {
            showMergeTags: false,
            tags: []
        };
    }
    generateId() {
        let dt = new Date().getTime();
        let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
            let r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == "x" ? r : r & 0x3 | 0x8).toString(16);
        });
        return "T" + uuid;
    }
    componentDidMount() {
        let props = this.props;
        this.container = document.getElementById(`editor-${this.id}`);
        //this.container = this.d && this.d.children && this.d.children.length >= 2 ? this.d.children[1] : null;
        //this.editor = this.d;
        if (this.container) {
            this.container.addEventListener("trix-initialize", ()=>{
                this.editor = this.container.editor;
                if (!this.editor) console.error("cannot  find trix editor");
                if (props.onEditorReady && typeof props.onEditorReady == "function") props.onEditorReady(this.editor);
            }, false);
            this.container.addEventListener("trix-change", this.handleChange.bind(this), false);
            if (props.uploadURL) this.container.addEventListener("trix-attachment-add", this.handleUpload.bind(this));
        } else console.error("editor not found");
    }
    componentWillUnmount() {
        this.container.removeEventListener("trix-initialize", this.handleChange);
        this.container.removeEventListener("trix-change", this.handleChange);
        if (this.props.uploadURL) this.container.removeEventListener("trix-attachment-add", this.handleUpload);
    }
    handleChange(e) {
        const props = this.props;
        let state = this.state;
        const text = e.target.innerText;
        if (props.onChange) props.onChange(e.target.innerHTML, text);
        const range = this.editor.getSelectedRange();
        // if we have a collapse selection
        if (text && range[0] == range[1]) // if we have a merge tag mergeTagTrigger
        {
            if (props.mergeTags) {
                // get the cursor position and compare the last character with our mergeTagTrigger
                const lastChar = range[0] - 1;
                if (lastChar >= 0 && lastChar < text.length) {
                    const trigger = text[lastChar];
                    for(let i = 0; i < props.mergeTags.length; i++)if (trigger == props.mergeTags[i].trigger) {
                        state.showMergeTags = true;
                        state.tags = props.mergeTags[i].tags;
                        this.setState(state);
                        break;
                    }
                }
            }
        }
    }
    handleUpload(e) {
        var attachment = e.attachment;
        if (attachment.file) return this.uploadAttachment(attachment);
    }
    uploadAttachment(attachment) {
        var file, form, xhr;
        file = attachment.file;
        form = new FormData();
        // add any custom data that were passed
        if (this.props.uploadData) for(var k in this.props.uploadData)form.append(k, this.props.uploadData[k]);
        //form.append("Content-Type", "multipart/form-data");
        form.append(this.props.fileParamName || "file", file);
        xhr = new XMLHttpRequest();
        xhr.open("POST", this.props.uploadURL, true);
        xhr.withCredentials = true;
        xhr.upload.onprogress = (event)=>{
            var progress = event.loaded / event.total * 100;
            return attachment.setUploadProgress(progress);
        };
        xhr.onload = ()=>{
            var href, url;
            if (xhr.status >= 200 && xhr.status < 300) {
                url = href = xhr.responseText;
                return attachment.setAttributes({
                    url: url,
                    href: href
                });
            }
        };
        return xhr.send(form);
    }
    handleTagSelected(t, e) {
        e.preventDefault();
        let state = this.state;
        state.showMergeTags = false;
        this.setState(state);
        this.editor.expandSelectionInDirection("backward");
        this.editor.insertString(t.tag);
    }
    renderTagSelector(tags) {
        if (!tags || !this.editor) return null;
        const editorPosition = document.getElementById("trix-editor-top-level-" + this.id).getBoundingClientRect();
        // current cursor position
        const rect = this.editor.getClientRectAtPosition(this.editor.getSelectedRange()[0]);
        const boxStyle = {
            "position": "absolute",
            "top": rect.top + 25 - editorPosition.top,
            "left": rect.left + 25 - editorPosition.left,
            "width": "250px",
            "boxSizing": "border-box",
            "padding": 0,
            "margin": ".2em 0 0",
            "backgroundColor": "hsla(0,0%,100%,.9)",
            "borderRadius": ".3em",
            "background": "linear-gradient(to bottom right, white, hsla(0,0%,100%,.8))",
            "border": "1px solid rgba(0,0,0,.3)",
            "boxShadow": ".05em .2em .6em rgba(0,0,0,.2)",
            "textShadow": "none"
        };
        const tagStyle = {
            "display": "block",
            "padding": ".2em .5em",
            "cursor": "pointer"
        };
        return /*#__PURE__*/ $aSSit$react.createElement("div", {
            style: boxStyle,
            className: "react-trix-suggestions"
        }, tags.map((t)=>{
            return /*#__PURE__*/ $aSSit$react.createElement("a", {
                key: t.name,
                style: tagStyle,
                href: "#",
                onClick: this.handleTagSelected.bind(this, t)
            }, t.name);
        }));
    }
    render() {
        let state = this.state;
        let props = this.props;
        var attributes = {
            "id": `editor-${this.id}`,
            "input": `input-${this.id}`
        };
        if (props.className) attributes["class"] = props.className;
        if (props.autoFocus) attributes["autofocus"] = props.autoFocus.toString();
        if (props.placeholder) attributes["placeholder"] = props.placeholder;
        if (props.toolbar) attributes["toolbar"] = props.toolbar;
        let mergetags = null;
        if (state.showMergeTags) mergetags = this.renderTagSelector(state.tags);
        return /*#__PURE__*/ $aSSit$react.createElement("div", {
            id: "trix-editor-top-level-" + this.id,
            ref: (d)=>this.d = d,
            style: {
                "position": "relative"
            }
        }, /*#__PURE__*/ $aSSit$react.createElement("trix-editor", attributes), /*#__PURE__*/ $aSSit$react.createElement("input", {
            type: "hidden",
            id: `input-${this.id}`,
            value: this.props.value
        }), mergetags);
    }
}


//# sourceMappingURL=main.js.map
