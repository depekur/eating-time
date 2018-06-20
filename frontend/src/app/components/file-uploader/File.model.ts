export class File {
    name: string;
    size: number;
    sizeFormatted: string;
    type: string;
    nativeFile: any;

    progress: number = 0;
    loadingState: boolean = false;
    hash: string = "";
    fname: string;

    preview: any;

    constructor(data) {
        if (data) {
            this.name = data.name;
            this.size = data.size;
            this.sizeFormatted = getFormattedSize(data.size);
            this.type = data.type;
            this.hash = data.hash;
            this.loadingState = data.loadingState;
            this.progress = data.progress;

            this.nativeFile = data;
            this.fname = this.name;

            this.preview = data.preview;


        } else {
            throw new TypeError(`Can't create File model. Given [data] is empty`);
        }
    }

    compare(file: File): boolean {
        return this.name === file.name &&
            this.size === file.size;
    }
}

function getFormattedSize(size) {
    let formattedSize = '';

    if (size >= 1000000000) {
        formattedSize = (size / 1000000000).toFixed(2) + ' GB';
    } else if (size >= 1000000) {
        formattedSize = (size / 1000000).toFixed(2) + ' MB';
    } else if (size >= 1000) {
        formattedSize = (size / 1000).toFixed(2) + ' KB';
    } else if (size > 1) {
        formattedSize = size + ' bytes';
    } else if (size === 1) {
        formattedSize = size + ' byte';
    } else {
        formattedSize = '0 byte';
    }

    return formattedSize;
}
