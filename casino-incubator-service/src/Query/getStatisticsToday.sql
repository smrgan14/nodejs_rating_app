SELECT
    r.EmotionId,
    e.Name,
    HOUR(DATE_ADD(r.TimeRated, INTERVAL @tzOffset HOUR)) Hour,
    COUNT(r.RatingId) NumberOfRatings
FROM
    Ratings r
    INNER JOIN Emotions e
    ON r.EmotionId = e.EmotionId
WHERE
    DATE(DATE_ADD(r.TimeRated, INTERVAL @tzOffset HOUR)) = @date
GROUP BY
    r.EmotionId,
    e.Name,
    HOUR(DATE_ADD(r.TimeRated, INTERVAL @tzOffset HOUR));
