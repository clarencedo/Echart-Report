import data from "./data";
export default class DataProvider {
    getData() {
        const val = data;
        return val.map(it =>({...it, date: new Date(it.date)}));
    }
}
