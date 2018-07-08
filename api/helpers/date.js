/**
 * получить дату в текстовом представлении,
 * если без параметра, то текущую
 * 
 * @param {String} date | yyyy.mm.dd или yyyy-mm-dd
 * @return {String}
 */
export function getDate(date){
    const _date = date !== undefined
        ? new Date(date)
        : new Date()

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long"
    };

    return _date.toLocaleString("ru", options);
};