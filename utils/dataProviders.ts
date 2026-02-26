import fs from 'fs'
import {parse} from 'csv-parse/sync'

export class DataProvider{
    static getDataFromJson(filepath:string){
    let data= JSON.parse(fs.readFileSync(filepath,'utf-8'))
    return data
    }
    static getDataFromCSV(filepath:string){
     let data = parse(fs.readFileSync(filepath),{columns:true,skip_empty_lines:true})
     return data 
    }
}