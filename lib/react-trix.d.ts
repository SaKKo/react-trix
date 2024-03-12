import * as React from "react";
export interface MergeTag {
    tag: string;
    name: string;
}
export interface MergeTags {
    trigger: string;
    tags: Array<MergeTag>;
}
export interface TrixEditorProps {
    className?: string;
    autoFocus?: boolean;
    placeholder?: string;
    toolbar?: string;
    value?: string;
    uploadURL?: string;
    uploadData?: {
        [key: string]: string;
    };
    fileParamName?: string;
    mergeTags: Array<MergeTags>;
    onEditorReady?: (editor: any) => void;
    onChange: (html: string, text: string) => void;
}
export interface TrixEditorState {
    showMergeTags: boolean;
    tags: Array<MergeTag>;
}
export interface Editor {
    getSelectedRange: () => Array<number>;
    setSelectedRange: (range: Array<number>) => void;
    getClientRectAtPosition: (pos: number) => Rect;
    expandSelectionInDirection: (direction: "forward" | "backward") => void;
    insertString: (s: string) => void;
}
export interface Rect {
    top: number;
    left: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
}
export class TrixEditor extends React.Component<TrixEditorProps, TrixEditorState> {
    constructor(props: TrixEditorProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}

//# sourceMappingURL=react-trix.d.ts.map
