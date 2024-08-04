// Interface for Data Transmission from DataBase via HTTP

export interface ItemDTO {
    id?: number ,
    done: boolean,
    task: string,
    due?: Date
}