export class Utils {
  public addOneDay(date: Date): Date {
    date.setDate(date.getDate() + 1);
    return date;
  }

  public codeGenerator(text: string): string {
    const arrSplit: Array<string> = text.split(/\C|\-/);
    const arrDateData: Array<string> = [];
    arrSplit.forEach((v) => {
      if (v !== '') {
        arrDateData.push(v);
      }
    });

    const date = new Date().toISOString();
    const arrDate: Array<string> = date.split('T');
    const stringFullDate: string = arrDate[0].replace(/-/, '').replace(/-/, '');
    let code: string;
    if (arrDateData[0] === stringFullDate) {
      code = `C-${stringFullDate}-${parseInt(arrDateData[1]) + 1}`;
    } else {
      code = `C-${stringFullDate}-1}`;
    }
    return code;
  }
}
