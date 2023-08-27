const CreateDate = (date, days, weeks, months, years) => {
  let newDate = new Date(date)
  newDate.setDate(newDate.getDate() + days + 7 * weeks);
  newDate.setMonth(newDate.getMonth() + months);
  newDate.setFullYear(newDate.getFullYear() + years);
};

export default CreateDate
