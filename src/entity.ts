export interface ArtCodeEntity {
    id: string;
    codes: CodeEntity[];
}

export interface CodeEntity {
    id: string;
    type: CodeType;
    text: string;
}

export enum CodeType {
    VERTEX_SHADER = 1,
    FRAGMENT_SHADER = 2
}
