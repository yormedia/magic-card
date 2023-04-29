export function capitalize(string) :string {
    console.log(string);
    console.log(string.charAt(0).toUpperCase() + string.slice(1));
    return string.charAt(0).toUpperCase() + string.slice(1);
}