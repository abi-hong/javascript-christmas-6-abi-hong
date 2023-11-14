const Calendar = {
  numberDate (number) {
    const orderDate = new Date(`2023-12-${number}`);
    return orderDate.getDate();
  },
  numberDay (number) {
    const orderDate = new Date(`2023-12-${number}`);
    return orderDate.getDay();
  },
}

export default Calendar;