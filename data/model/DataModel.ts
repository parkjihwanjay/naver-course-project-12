import fs from 'fs';

abstract class DataModel {
  static filePath = './data/CardList.json';

  static readData<T>(): T {
    const data = fs.readFileSync(DataModel.filePath);
    return JSON.parse(data.toString());
  }

  static writeData<T>(data: T): void {
    fs.writeFileSync(DataModel.filePath, JSON.stringify(data));
  }
}

export default DataModel;
