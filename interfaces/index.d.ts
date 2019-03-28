declare namespace Nearley {
    interface SourceMap {
        line: number
        col: number
    }

    type TokenList = Array<string | any>

    interface Token extends SourceMap {
        type: string
        value: any
        text: string
        toString: () => string
    }
}
