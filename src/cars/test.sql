SELECT *
FROM reservation
WHERE (
  '2023-12-11 10:05:43.129Z' < end
  AND
  '2023-12-22 10:05:43.129Z' > start
);