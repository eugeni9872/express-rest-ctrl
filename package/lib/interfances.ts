import { Express} from 'express'

export interface PathFile {
    name: string,
    path?: string
}
export enum HttpMethods {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
    CONNECT = 'connect',
    OPTIONS = 'options',
    TRACE = 'trace',
    PATH = 'path',
    HEAD = 'head'
}


export interface AllControllersParams {
    dir: string;
    fileList?: Array<PathFile> | []
}

export interface RouteType {
    path: string, 
    controller: string,
    method: string | HttpMethods
}

export interface ServerType extends Express{
    [key:string]: any; // Add index signature
}


