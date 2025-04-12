export const generateDummyData = () => {
  const startDate = new Date("2022-11-30");
  const endDate = new Date();
  const result = [];

  while (startDate <= endDate) {
    const day = startDate.getDay(); // 0 = Sunday, 6 = Saturday

    // Weekday logic
    const isWeekend = day === 0 || day === 6;
    const total = isWeekend
      ? Math.floor(Math.random() * (40 - 10 + 1)) + 10
      : Math.floor(Math.random() * (800 - 500 + 1)) + 500;

    const failRate = Math.random() * 0.03;
    const failed = Math.floor(total * failRate);
    const successful = total - failed;

    result.push({
      date: startDate.toISOString().split("T")[0],
      total,
      successful,
      failed,
    });

    startDate.setDate(startDate.getDate() + 1);
  }

  return result;
};
