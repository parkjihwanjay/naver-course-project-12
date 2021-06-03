import fs from 'fs';

interface FileObject<T> {
  data: T;
  counter: number;
}
abstract class DataModel {
  static filePath = './data/CardList.json';

  static readFile(): Buffer {
    return fs.readFileSync(DataModel.filePath);
  }

  static writeFile<T>(params: FileObject<T>): void {
    fs.writeFileSync(DataModel.filePath, JSON.stringify(params));
  }

  static parseJson<T>(file: Buffer): FileObject<T> {
    return JSON.parse(file.toString());
  }

  static getObject<T>(): FileObject<T> {
    const file = DataModel.readFile();
    return this.parseJson<T>(file);
  }

  static readData<T>(): T {
    const { data } = this.getObject<T>();
    return data;
  }

  static writeData<T>(data: T): void {
    const { counter } = this.getObject<T>();
    this.writeFile({ data, counter: counter + 1 });
  }

  static readCounter(): number {
    const { counter } = this.getObject();
    return counter;
  }

  static writeCounter(counter: number): void {
    const { data } = this.getObject();
    this.writeFile({ data, counter });
  }
}

export default DataModel;
