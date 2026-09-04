export interface FilePath {
    id: number;
    name: string;
    files?: FilePath[];
}