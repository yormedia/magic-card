export class ymString {
  /*
   *
   * @name capitalize
   * @param string 'string'
   * @returns string
   */
  capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  /*
   *
   * @name capitalizeAll      Capitalize each word in a sentence (after each space).
   * @param string 'string'
   * @returns string
   */
  capitalizeAll(string: string) {
    let stringObject = string.split(" ");
    let capitalizedText = "";

    stringObject.forEach((stringText) => {
      capitalizedText =
        capitalizedText +
        stringText.charAt(0).toUpperCase() +
        stringText.slice(1);
    });

    return capitalizedText;
  }
}
